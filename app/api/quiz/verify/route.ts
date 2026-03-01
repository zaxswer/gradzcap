/**
 * GET /api/quiz/verify?student=ADDR&assetId=NFT_ASSET_ID&metaHash=SHA256_HEX
 *
 * Tamper-proof certificate verification:
 *   1. Checks student holds exactly 1 unit of the NFT ASA
 *   2. Matches the provided metaHash against the on-chain assetMetadataHash field
 *   3. Reads ExamIntegrity contract local state — confirms marks >= 80, cheats == 0
 */
import { NextRequest, NextResponse } from "next/server"
import { verifyCertificate } from "@/lib/algorand/certificate"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const student = searchParams.get("student")
  const assetIdStr = searchParams.get("assetId")
  const metaHash = searchParams.get("metaHash") ?? undefined

  if (!student || !assetIdStr) {
    return NextResponse.json({ error: "student and assetId query params are required" }, { status: 400 })
  }

  const nftAssetId = Number(assetIdStr)
  if (isNaN(nftAssetId) || nftAssetId <= 0) {
    return NextResponse.json({ error: "assetId must be a positive integer" }, { status: 400 })
  }

  try {
    const result = await verifyCertificate(student, nftAssetId, metaHash)
    return NextResponse.json(result)
  } catch (e) {
    console.error("[/api/quiz/verify]", e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
