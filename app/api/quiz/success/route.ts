/**
 * POST /api/quiz/success
 * Standalone entrypoint for triggering the full certificate + scholarship flow.
 * Can also be called internally by /api/quiz/complete.
 *
 * Body: { student: string, score: number, scholarshipTxId?: string, gzcAmount?: number }
 */
import { NextRequest, NextResponse } from "next/server"
import { handleExamSuccess } from "@/lib/algorand/certificate"

export async function POST(req: NextRequest) {
  let body: { student?: string; score?: number; scholarshipTxId?: string; gzcAmount?: number }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { student, score, scholarshipTxId = "", gzcAmount } = body
  if (!student || score === undefined) {
    return NextResponse.json({ error: "student and score are required" }, { status: 400 })
  }

  if (!process.env.SECRET_KEY) {
    return NextResponse.json({ error: "Escrow wallet not configured (SECRET_KEY missing)" }, { status: 500 })
  }

  try {
    const receipt = await handleExamSuccess(student, score, scholarshipTxId, gzcAmount)
    return NextResponse.json({ ok: true, receipt })
  } catch (e) {
    console.error("[/api/quiz/success]", e)
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
