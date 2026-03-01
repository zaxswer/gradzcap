import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"

const ALGOD_SERVER = "https://testnet-api.algonode.cloud"
const ALGOD_PORT = 443
const ALGOD_TOKEN = ""

// Faucet gives 1,000 GZC per claim (1,000 * 1e6 = 1_000_000_000 microGZC)
const FAUCET_AMOUNT = 1_000_000_000

// Simple in-memory rate limit (resets on server restart)
const claimedAddresses = new Set<string>()

export async function POST(request: NextRequest) {
  try {
    const { userAddress } = await request.json()

    if (!userAddress || typeof userAddress !== "string") {
      return NextResponse.json({ error: "User address is required" }, { status: 400 })
    }

    // Validate address
    try {
      algosdk.decodeAddress(userAddress)
    } catch {
      return NextResponse.json({ error: "Invalid Algorand address" }, { status: 400 })
    }

    // Rate limit: one claim per address per server session
    if (claimedAddresses.has(userAddress)) {
      return NextResponse.json(
        { error: "You have already claimed from the faucet. Try again later." },
        { status: 429 }
      )
    }

    // Load deployer credentials from env
    const mnemonic = process.env.DEPLOYER_MNEMONIC
    if (!mnemonic) {
      return NextResponse.json({ error: "Faucet not configured" }, { status: 500 })
    }

    const GZC_ASA_ID = Number(process.env.GZC_ASA_ID || process.env.NEXT_PUBLIC_GZC_ASA_ID)
    if (!GZC_ASA_ID) {
      return NextResponse.json({ error: "GZC ASA ID not configured" }, { status: 500 })
    }

    const sk = algosdk.mnemonicToSecretKey(mnemonic)
    const deployerAddress = sk.addr

    const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)

    // Check deployer's GZC balance
    const deployerInfo = await algod.accountInformation(deployerAddress).do()
    const deployerGzc = deployerInfo.assets?.find(
      (a: any) => Number(a["asset-id"]) === GZC_ASA_ID
    )
    const deployerBalance = deployerGzc ? Number(deployerGzc.amount) : 0

    if (deployerBalance < FAUCET_AMOUNT) {
      return NextResponse.json(
        { error: "Faucet is empty. Please try again later." },
        { status: 503 }
      )
    }

    // Check if user is opted into GZC ASA
    const userInfo = await algod.accountInformation(userAddress).do()
    const userOptedIn = userInfo.assets?.some(
      (a: any) => Number(a["asset-id"]) === GZC_ASA_ID
    )
    if (!userOptedIn) {
      return NextResponse.json(
        { error: "You must opt into the GZC asset before claiming. The app will guide you." },
        { status: 400 }
      )
    }

    // Build & sign asset transfer from deployer to user
    const sp = await algod.getTransactionParams().do()
    const transferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      sender: deployerAddress,
      receiver: userAddress,
      assetIndex: GZC_ASA_ID,
      amount: FAUCET_AMOUNT,
      suggestedParams: sp,
    })

    const signedTxn = transferTxn.signTxn(sk.sk)
    const { txid } = await algod.sendRawTransaction(signedTxn).do()
    await algosdk.waitForConfirmation(algod, txid, 4)

    // Mark address as claimed
    claimedAddresses.add(userAddress)

    return NextResponse.json({
      success: true,
      txid,
      amount: FAUCET_AMOUNT / 1_000_000, // human-readable GZC
      message: `Successfully sent 1,000 GZC to ${userAddress}`,
    })
  } catch (error: any) {
    console.error("Faucet error:", error)
    return NextResponse.json(
      { error: `Faucet error: ${error.message}` },
      { status: 500 }
    )
  }
}
