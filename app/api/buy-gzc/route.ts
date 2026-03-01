import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"

const ALGOD_SERVER = "https://testnet-api.algonode.cloud"
const ALGOD_PORT = 443
const ALGOD_TOKEN = ""

const GZC_APP_ID = Number(process.env.GZC_APP_ID || process.env.NEXT_PUBLIC_GZC_APP_ID)
const GZC_ASA_ID = Number(process.env.GZC_ASA_ID || process.env.NEXT_PUBLIC_GZC_ASA_ID)

export async function POST(request: NextRequest) {
  try {
    const { userAddress, algoAmount } = await request.json()

    if (!userAddress || typeof userAddress !== "string") {
      return NextResponse.json({ error: "User address is required" }, { status: 400 })
    }

    // Validate address
    try {
      algosdk.decodeAddress(userAddress)
    } catch {
      return NextResponse.json({ error: "Invalid Algorand address" }, { status: 400 })
    }

    const amount = Number(algoAmount) || 10_000 // default 0.01 ALGO
    if (amount < 1_000 || amount > 10_000) {
      return NextResponse.json({ error: "Amount must not exceed 0.01 ALGO" }, { status: 400 })
    }

    if (!GZC_APP_ID || !GZC_ASA_ID) {
      return NextResponse.json({ error: "GZC contract not configured" }, { status: 500 })
    }

    const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)
    const gzcAppAddress = algosdk.getApplicationAddress(GZC_APP_ID)
    const sp = await algod.getTransactionParams().do()

    // Transaction 1: Payment to GZCToken contract
    const payTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: userAddress,
      receiver: gzcAppAddress,
      amount: amount,
      suggestedParams: sp,
    })

    // Transaction 2: App call to buyGZC(pay)void
    const methodSelector = algosdk.ABIMethod.fromSignature("buyGZC(pay)void").getSelector()
    const appCallSp = { ...sp, fee: 2000, flatFee: true } // cover inner asset transfer fee
    const appCallTxn = algosdk.makeApplicationCallTxnFromObject({
      sender: userAddress,
      appIndex: GZC_APP_ID,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [methodSelector],
      foreignAssets: [GZC_ASA_ID],
      suggestedParams: appCallSp,
    })

    // Group the transactions
    const group = algosdk.assignGroupID([payTxn, appCallTxn])

    // Encode both as base64 for client-side signing
    const unsignedTxns = group.map((txn) =>
      Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64")
    )

    return NextResponse.json({
      unsignedTxns,
      gzcAmount: (amount / 1_000_000) * 1_000_000, // GZC amount (human-readable)
      algoAmount: amount / 1_000_000,
    })
  } catch (error: any) {
    console.error("Buy GZC error:", error)
    return NextResponse.json(
      { error: `Failed to create buy transaction: ${error.message}` },
      { status: 500 }
    )
  }
}
