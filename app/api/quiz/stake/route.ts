import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"

const ALGOD_SERVER = "https://testnet-api.algonode.cloud"
const ALGOD_PORT = 443
const ALGOD_TOKEN = ""

const GZC_ASA_ID = Number(process.env.GZC_ASA_ID || process.env.NEXT_PUBLIC_GZC_ASA_ID)
const APP_ID = Number(process.env.APP_ID || process.env.NEXT_PUBLIC_CONTRACT_APP_ID)
const MIN_STAKE = 10_000 * 1_000_000 // 10,000 GZC in microGZC

// Helper to get box name for student record
function getStudentRecordBoxName(address: string): Uint8Array {
  const prefix = new Uint8Array([0x73]) // "s" prefix
  const addrBytes = algosdk.decodeAddress(address).publicKey
  return new Uint8Array([...prefix, ...addrBytes])
}

// Legacy exports for backward compatibility (no longer used)
export function getStakedBalance(address: string): number {
  return 0
}

export function clearStake(address: string) {
  // No-op
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

    if (!GZC_ASA_ID || !APP_ID) {
      return NextResponse.json({ error: "Contract not configured" }, { status: 500 })
    }

    const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)

    // Action: "check" — check if user has enough GZC and if already staked
    if (action === "check") {
      const info = await algod.accountInformation(userAddress).do()
      const assets = (info.assets ?? []) as Array<{ assetId: bigint | number; amount: bigint | number }>
      const gzc = assets.find((a) => Number(a.assetId) === GZC_ASA_ID)
      const balance = gzc ? Number(gzc.amount) : 0

      // Check if user already has an active exam in the contract
      let alreadyStaked = 0
      try {
        const boxName = getStudentRecordBoxName(userAddress)
        const boxValue = await algod.getApplicationBoxByName(APP_ID, boxName).do()
        if (boxValue && boxValue.value) {
          // Decode StudentData struct: (staked_amount: u64, marks: u64, cheat_count: u64, is_exam_active: u64)
          const data = new Uint8Array(boxValue.value)
          if (data.length >= 8) {
            // First 8 bytes = staked_amount (big-endian u64)
            const view = new DataView(data.buffer, data.byteOffset, data.byteLength)
            alreadyStaked = Number(view.getBigUint64(0, false)) // false = big-endian
          }
        }
      } catch {
        // Box doesn't exist = not staked
      }

      return NextResponse.json({
        balance: balance / 1_000_000,
        balanceMicro: balance,
        minStake: MIN_STAKE / 1_000_000,
        hasEnough: balance >= MIN_STAKE,
        alreadyStaked: alreadyStaked / 1_000_000,
      })
    }

    // Action: "stake" — build atomic group: AssetTransfer + AppCall to stake_and_start
    if (action === "stake") {
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

      // Check if already has active exam
      try {
        const boxName = getStudentRecordBoxName(userAddress)
        const boxValue = await algod.getApplicationBoxByName(APP_ID, boxName).do()
        if (boxValue && boxValue.value) {
          return NextResponse.json({ error: "You already have an active exam. Complete it first." }, { status: 400 })
        }
      } catch {
        // Box doesn't exist, good to stake
      }

      const sp = await algod.getTransactionParams().do()
      const appAddress = algosdk.getApplicationAddress(APP_ID)

      // Txn 0: AssetTransfer user → contract
      const assetXferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        sender: userAddress,
        receiver: appAddress,
        assetIndex: GZC_ASA_ID,
        amount: MIN_STAKE,
        suggestedParams: sp,
      })

      // Txn 1: AppCall stake_and_start(stake_pmt)
      const stakeMethod = new algosdk.ABIMethod({
        name: "stake_and_start",
        args: [{ type: "axfer", name: "stake_pmt" }],
        returns: { type: "void" },
      })

      const atc = new algosdk.AtomicTransactionComposer()
      atc.addMethodCall({
        appID: APP_ID,
        method: stakeMethod,
        methodArgs: [{ txn: assetXferTxn, signer: algosdk.makeEmptyTransactionSigner() }],
        sender: userAddress,
        signer: algosdk.makeEmptyTransactionSigner(),
        suggestedParams: sp,
        boxes: [{ appIndex: APP_ID, name: getStudentRecordBoxName(userAddress) }],
      })

      const txnGroup = atc.buildGroup()
      const unsignedTxns = txnGroup.map((t) => Buffer.from(algosdk.encodeUnsignedTransaction(t.txn)).toString("base64"))

      return NextResponse.json({
        unsignedTxns,
        stakeAmount: MIN_STAKE / 1_000_000,
      })
    }

    // Action: "confirm" — verify stake recorded in contract
    if (action === "confirm") {
      try {
        const boxName = getStudentRecordBoxName(userAddress)
        const boxValue = await algod.getApplicationBoxByName(APP_ID, boxName).do()
        
        if (!boxValue || !boxValue.value) {
          return NextResponse.json({ error: "Stake not found in contract" }, { status: 400 })
        }

        // Decode to verify stake amount
        const data = new Uint8Array(boxValue.value)
        const view = new DataView(data.buffer, data.byteOffset, data.byteLength)
        const stakedAmount = Number(view.getBigUint64(0, false))

        // Get remaining balance
        const info = await algod.accountInformation(userAddress).do()
        const assets = (info.assets ?? []) as Array<{ assetId: bigint | number; amount: bigint | number }>
        const gzc = assets.find((a) => Number(a.assetId) === GZC_ASA_ID)
        const balance = gzc ? Number(gzc.amount) : 0

        return NextResponse.json({
          staked: true,
          amount: stakedAmount / 1_000_000,
          remainingBalance: balance / 1_000_000,
        })
      } catch (e: any) {
        console.error("[confirm]", e)
        return NextResponse.json({ error: "Failed to verify stake" }, { status: 500 })
      }
    }

    // Action: "return" — DEPRECATED, now handled by /api/quiz/complete
    // Kept for backward compatibility, returns success without action
    if (action === "return") {
      return NextResponse.json({
        returned: true,
        amount: MIN_STAKE / 1_000_000,
        note: "Stake return is now handled on-chain by complete_exam",
      })
    }

    // Action: "slash" — DEPRECATED, now handled by /api/quiz/complete
    // Kept for backward compatibility, returns success without action
    if (action === "slash") {
      return NextResponse.json({
        slashed: true,
        slashPercent: 100,
        slashAmount: MIN_STAKE / 1_000_000,
        returnedAmount: 0,
        note: "Stake slashing is now handled on-chain by record_cheat + complete_exam",
      })
    }

    return NextResponse.json({ error: "Invalid action. Use 'check', 'stake', 'confirm', 'return', or 'slash'." }, { status: 400 })
  } catch (error: any) {
    console.error("Stake error:", error)
    return NextResponse.json({ error: `Stake error: ${error.message}` }, { status: 500 })
  }
}
