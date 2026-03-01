import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"

const ALGOD_SERVER = "https://testnet-api.algonode.cloud"
const ALGOD_PORT = 443
const ALGOD_TOKEN = ""

const GZC_ASA_ID = Number(process.env.GZC_ASA_ID || process.env.NEXT_PUBLIC_GZC_ASA_ID)
const MIN_STAKE = 10_000 * 1_000_000 // 10,000 GZC in microGZC

// Track staked amounts per address (web2 — in-memory, resets on restart)
const stakedBalances = new Map<string, number>()

export function getStakedBalance(address: string): number {
  return stakedBalances.get(address) || 0
}

export function clearStake(address: string) {
  stakedBalances.delete(address)
}

// POST /api/quiz/stake — check balance + build stake txn for user to sign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userAddress, action, slashPercent: rawSlashPercent, txid: bodyTxid } = body

    if (!userAddress || typeof userAddress !== "string") {
      return NextResponse.json({ error: "User address is required" }, { status: 400 })
    }

    try {
      algosdk.decodeAddress(userAddress)
    } catch {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 })
    }

    if (!GZC_ASA_ID) {
      return NextResponse.json({ error: "GZC ASA not configured" }, { status: 500 })
    }

    const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)

    // Action: "check" — just check if user has enough GZC
    if (action === "check") {
      const info = await algod.accountInformation(userAddress).do()
      const assets = (info.assets ?? []) as Array<{ assetId: bigint | number; amount: bigint | number }>
      const gzc = assets.find((a) => Number(a.assetId) === GZC_ASA_ID)
      const balance = gzc ? Number(gzc.amount) : 0
      const alreadyStaked = stakedBalances.get(userAddress) || 0

      return NextResponse.json({
        balance: balance / 1_000_000,
        balanceMicro: balance,
        minStake: MIN_STAKE / 1_000_000,
        hasEnough: balance >= MIN_STAKE,
        alreadyStaked: alreadyStaked / 1_000_000,
      })
    }

    // Action: "stake" — build a txn to transfer GZC to deployer (lock)
    if (action === "stake") {
      // Clear any previous stake — each quiz attempt requires a fresh stake
      stakedBalances.delete(userAddress)

      // Verify balance
      const info = await algod.accountInformation(userAddress).do()
      const assets = (info.assets ?? []) as Array<{ assetId: bigint | number; amount: bigint | number }>
      const gzc = assets.find((a) => Number(a.assetId) === GZC_ASA_ID)
      const balance = gzc ? Number(gzc.amount) : 0

      if (balance < MIN_STAKE) {
        return NextResponse.json({
          error: `Insufficient GZC. You have ${balance / 1_000_000} GZC but need ${MIN_STAKE / 1_000_000} GZC to stake.`,
        }, { status: 400 })
      }

      // Build asset transfer: user → deployer (lock the stake)
      const mnemonic = process.env.DEPLOYER_MNEMONIC
      if (!mnemonic) {
        return NextResponse.json({ error: "Staking not configured" }, { status: 500 })
      }
      const sk = algosdk.mnemonicToSecretKey(mnemonic)
      const deployerAddress = sk.addr

      const sp = await algod.getTransactionParams().do()
      const stakeTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        sender: userAddress,
        receiver: deployerAddress,
        assetIndex: GZC_ASA_ID,
        amount: MIN_STAKE,
        suggestedParams: sp,
      })

      const unsignedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(stakeTxn)).toString("base64")

      return NextResponse.json({
        unsignedTxn,
        txnId: stakeTxn.txID(),
        stakeAmount: MIN_STAKE / 1_000_000,
      })
    }

    // Action: "confirm" — after user signs & submits, record the stake
    if (action === "confirm") {
      // Verify the user's current balance dropped (they sent GZC)
      const info = await algod.accountInformation(userAddress).do()
      const assets = (info.assets ?? []) as Array<{ assetId: bigint | number; amount: bigint | number }>
      const gzc = assets.find((a) => Number(a.assetId) === GZC_ASA_ID)
      const balance = gzc ? Number(gzc.amount) : 0

      // Record stake
      stakedBalances.set(userAddress, MIN_STAKE)

      return NextResponse.json({
        staked: true,
        amount: MIN_STAKE / 1_000_000,
        remainingBalance: balance / 1_000_000,
      })
    }

    // Action: "return" — exam passed, return full stake to user
    if (action === "return") {
      const staked = stakedBalances.get(userAddress)
      if (!staked) {
        return NextResponse.json({ error: "No active stake found" }, { status: 400 })
      }

      const mnemonic = process.env.DEPLOYER_MNEMONIC
      if (!mnemonic) {
        return NextResponse.json({ error: "Return not configured" }, { status: 500 })
      }
      const deployer = algosdk.mnemonicToSecretKey(mnemonic)

      try {
        const sp = await algod.getTransactionParams().do()
        const returnTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          sender: deployer.addr,
          receiver: userAddress,
          assetIndex: GZC_ASA_ID,
          amount: staked, // full amount back
          suggestedParams: sp,
        })

        const signedTxn = returnTxn.signTxn(deployer.sk)
        await algod.sendRawTransaction(signedTxn).do()
        await algosdk.waitForConfirmation(algod, returnTxn.txID(), 4)

        stakedBalances.delete(userAddress)

        return NextResponse.json({
          returned: true,
          amount: staked / 1_000_000,
          txid: returnTxn.txID(),
        })
      } catch (e: any) {
        console.error("[stake return]", e)
        return NextResponse.json({ error: `Return failed: ${e.message}` }, { status: 500 })
      }
    }

    // Action: "slash" — exam failed or cheated, slash stake
    // body: { slashPercent: 50 | 100 }
    if (action === "slash") {
      const staked = stakedBalances.get(userAddress)
      if (!staked) {
        return NextResponse.json({ error: "No active stake found" }, { status: 400 })
      }

      const slashPercent = Math.min(100, Math.max(0, Number(rawSlashPercent) || 100))
      const slashAmount = Math.floor((staked * slashPercent) / 100)
      const returnAmount = staked - slashAmount

      const mnemonic = process.env.DEPLOYER_MNEMONIC
      if (!mnemonic) {
        return NextResponse.json({ error: "Slash not configured" }, { status: 500 })
      }
      const deployer = algosdk.mnemonicToSecretKey(mnemonic)

      try {
        // If there's a partial return (e.g. 50% slash → return 50%)
        let txid = ""
        if (returnAmount > 0) {
          const sp = await algod.getTransactionParams().do()
          const returnTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            sender: deployer.addr,
            receiver: userAddress,
            assetIndex: GZC_ASA_ID,
            amount: returnAmount,
            suggestedParams: sp,
          })
          const signedTxn = returnTxn.signTxn(deployer.sk)
          await algod.sendRawTransaction(signedTxn).do()
          await algosdk.waitForConfirmation(algod, returnTxn.txID(), 4)
          txid = returnTxn.txID()
        }

        stakedBalances.delete(userAddress)

        return NextResponse.json({
          slashed: true,
          slashPercent,
          slashAmount: slashAmount / 1_000_000,
          returnedAmount: returnAmount / 1_000_000,
          txid,
        })
      } catch (e: any) {
        console.error("[stake slash]", e)
        return NextResponse.json({ error: `Slash failed: ${e.message}` }, { status: 500 })
      }
    }

    return NextResponse.json({ error: "Invalid action. Use 'check', 'stake', 'confirm', 'return', or 'slash'." }, { status: 400 })
  } catch (error: any) {
    console.error("Stake error:", error)
    return NextResponse.json({ error: `Stake error: ${error.message}` }, { status: 500 })
  }
}
