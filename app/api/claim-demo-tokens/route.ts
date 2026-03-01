import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"

const ALGOD_SERVER = "https://testnet-api.algonode.cloud"
const ALGOD_PORT = 443
const ALGOD_TOKEN = ""

export async function POST(request: NextRequest) {
  try {
    const { userAddress } = await request.json()
    
    if (!userAddress || typeof userAddress !== 'string') {
      return NextResponse.json({ error: "User address is required" }, { status: 400 })
    }
    
    // Validate address format
    let addrBytes: Uint8Array
    try {
      addrBytes = algosdk.decodeAddress(userAddress).publicKey
    } catch {
      return NextResponse.json({ error: "Invalid address format" }, { status: 400 })
    }
    
    const CONTRACT_APP_ID = Number(process.env.NEXT_PUBLIC_APP_ID)
    const GZC_ASA_ID = Number(process.env.NEXT_PUBLIC_GZC_ASA_ID)
    
    if (!CONTRACT_APP_ID || !GZC_ASA_ID) {
      return NextResponse.json({ error: "Contract configuration missing" }, { status: 500 })
    }
    
    const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)
    const sp = await algod.getTransactionParams().do()
    
    // ARC4 method selector via ABIMethod
    const methodSelector = algosdk.ABIMethod.fromSignature('claim_demo_tokens()void').getSelector()
    
    // Box key = prefix "d" (0x64) + 32-byte raw address
    const boxKey = new Uint8Array([0x64, ...addrBytes])
    
    // Create the application call transaction with box references
    const appCallTxn = algosdk.makeApplicationCallTxnFromObject({
      sender: userAddress,
      appIndex: CONTRACT_APP_ID,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [methodSelector],
      foreignAssets: [GZC_ASA_ID],
      boxes: [
        { appIndex: CONTRACT_APP_ID, name: boxKey },
      ],
      suggestedParams: { ...sp, fee: 2000, flatFee: true },
    })
    
    // Return the unsigned transaction as base64 for client-side signing
    const unsignedTxnBase64 = Buffer.from(algosdk.encodeUnsignedTransaction(appCallTxn)).toString('base64')
    
    return NextResponse.json({ 
      unsignedTxn: unsignedTxnBase64,
      txnId: appCallTxn.txID()
    })
    
  } catch (error: any) {
    console.error("Error creating claim transaction:", error)
    return NextResponse.json({ 
      error: `Failed to create transaction: ${error.message}` 
    }, { status: 500 })
  }
}