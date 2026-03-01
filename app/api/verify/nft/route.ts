import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"

const ALGOD_SERVER = "https://testnet-api.algonode.cloud"
const ALGOD_PORT = 443
const ALGOD_TOKEN = ""

// GET /api/verify/nft?address=WALLET&nftId=123 — check if wallet holds the NFT
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")
    const nftIdStr = searchParams.get("nftId")

    if (!address || !nftIdStr) {
      return NextResponse.json({ error: "address and nftId parameters required" }, { status: 400 })
    }

    const nftId = Number(nftIdStr)

    // Validate address
    try {
      algosdk.decodeAddress(address)
    } catch {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 })
    }

    const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)
    const accountInfo = await algod.accountInformation(address).do()

    // Check if account holds the NFT
    const assets = accountInfo.assets || []
    const nftAsset = assets.find((a: any) => Number(a["asset-id"]) === nftId)

    if (!nftAsset) {
      return NextResponse.json({ hasNFT: false, balance: 0 })
    }

    const balance = Number(nftAsset.amount)

    return NextResponse.json({
      hasNFT: balance > 0,
      balance,
      nftId,
    })
  } catch (error: any) {
    console.error("NFT verification error:", error)
    return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 })
  }
}
