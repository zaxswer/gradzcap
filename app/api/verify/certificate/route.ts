import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"

const ALGOD_SERVER = "https://testnet-api.algonode.cloud"
const ALGOD_PORT = 443
const ALGOD_TOKEN = ""
const APP_ID = Number(process.env.APP_ID || process.env.NEXT_PUBLIC_CONTRACT_APP_ID)

// GET /api/verify/certificate?address=WALLET — get on-chain certificate data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")

    if (!address) {
      return NextResponse.json({ error: "Address parameter required" }, { status: 400 })
    }

    // Validate address
    try {
      algosdk.decodeAddress(address)
    } catch {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 })
    }

    const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)

    // Get certificate box from contract
    const getCertBoxName = (addr: string): Uint8Array => {
      const prefix = new Uint8Array([0x63]) // "c" prefix
      const addrBytes = algosdk.decodeAddress(addr).publicKey
      return new Uint8Array([...prefix, ...addrBytes])
    }

    try {
      const boxName = getCertBoxName(address)
      const boxValue = await algod.getApplicationBoxByName(APP_ID, boxName).do()

      if (!boxValue || !boxValue.value) {
        return NextResponse.json({ hasCertificate: false })
      }

      // Decode CertificateData struct
      // (student_address: Address(32), final_marks: u64(8), total_questions: u64(8), timestamp: u64(8), nft_id: u64(8))
      const data = new Uint8Array(boxValue.value)
      const view = new DataView(data.buffer, data.byteOffset, data.byteLength)

      const studentAddress = algosdk.encodeAddress(new Uint8Array(data.slice(0, 32)))
      const finalMarks = Number(view.getBigUint64(32, false))
      const totalQuestions = Number(view.getBigUint64(40, false))
      const timestamp = Number(view.getBigUint64(48, false))
      const nftId = Number(view.getBigUint64(56, false))

      return NextResponse.json({
        hasCertificate: true,
        certificate: {
          studentAddress,
          finalMarks,
          totalQuestions,
          timestamp,
          nftId,
        },
      })
    } catch (e: any) {
      if (e.message && e.message.includes("box not found")) {
        return NextResponse.json({ hasCertificate: false })
      }
      throw e
    }
  } catch (error: any) {
    console.error("Certificate verification error:", error)
    return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 })
  }
}
