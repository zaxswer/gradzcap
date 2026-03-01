import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"

const ALGOD_SERVER = "https://testnet-api.algonode.cloud"
const ALGOD_PORT = 443
const ALGOD_TOKEN = ""

export async function POST(request: NextRequest) {
  try {
    const { signedTxn } = await request.json()
    
    if (!signedTxn || typeof signedTxn !== 'string') {
      return NextResponse.json({ error: "Signed transaction is required" }, { status: 400 })
    }
    
    const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)
    
    // Decode the base64 signed transaction
    const signedTxnBytes = Buffer.from(signedTxn, 'base64')
    
    // Submit transaction to the network
    const { txid } = await algod.sendRawTransaction(signedTxnBytes).do()
    
    // Wait for confirmation
    await algosdk.waitForConfirmation(algod, txid, 4)
    
    return NextResponse.json({ 
      success: true,
      txid,
      message: "Transaction confirmed successfully"
    })
    
  } catch (error: any) {
    console.error("Error submitting transaction:", error)
    
    // Parse common Algorand errors
    let errorMessage = error.message || "Transaction submission failed"
    if (errorMessage.includes("err opcode")) {
      errorMessage = "Smart contract execution failed"
    } else if (errorMessage.includes("Already claimed")) {
      errorMessage = "Demo tokens already claimed for this address"
    } else if (errorMessage.includes("InsufficientFunds")) {
      errorMessage = "Insufficient funds for transaction fee"
    }
    
    return NextResponse.json({ 
      error: errorMessage 
    }, { status: 500 })
  }
}