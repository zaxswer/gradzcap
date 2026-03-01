import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"

const ALGOD_SERVER = "https://testnet-api.algonode.cloud"
const ALGOD_PORT = 443
const ALGOD_TOKEN = ""

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { signedTxn, signedTxns } = body
    
    // Support both single and multiple transactions
    const txnsArray = signedTxns || (signedTxn ? [signedTxn] : null)
    
    if (!txnsArray || !Array.isArray(txnsArray) || txnsArray.length === 0) {
      return NextResponse.json({ error: "Signed transaction(s) required" }, { status: 400 })
    }
    
    const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)
    
    // Decode all signed transactions
    const signedTxnBytes = txnsArray.map((txn: string) => Buffer.from(txn, 'base64'))
    
    // Submit to the network (supports both single and atomic groups)
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