/**
 * POST /api/quiz/complete
 * Server-side proctor:
 *   1. Calls completeExam on the ExamIntegrity contract (handles GZC scholarship + refund)
 *   2. If the student passed (marks >= 80), mints the NFT certificate and returns receipt
 */
import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"
import { getAlgod, getEscrowAccount, EXAM_APP_ID } from "@/lib/algorand/escrow"
import { handleExamSuccess } from "@/lib/algorand/certificate"
import type { ExamReceipt } from "@/lib/algorand/certificate"

const PASS_SCORE = 80

export async function POST(req: NextRequest) {
  const { student, marks } = await req.json() as { student: string; marks: number }
  if (!student || marks === undefined) {
    return NextResponse.json({ error: "student and marks required" }, { status: 400 })
  }

  // When the escrow key or contract is not configured, simulate gracefully
  if (!process.env.SECRET_KEY || !EXAM_APP_ID) {
    // Still attempt certificate minting if key exists
    if (process.env.SECRET_KEY && marks >= PASS_SCORE) {
      try {
        const receipt = await handleExamSuccess(student, marks, "simulated", 10_000)
        return NextResponse.json({ ok: true, simulated: true, receipt })
      } catch { /* non-fatal */ }
    }
    return NextResponse.json({ ok: true, simulated: true })
  }

  let scholarshipTxId = ""

  try {
    const algod = getAlgod()
    const escrow = getEscrowAccount()
    const sp = await algod.getTransactionParams().do()

    const atc = new algosdk.AtomicTransactionComposer()
    const abiMethod = new algosdk.ABIMethod({
      name: "completeExam",
      args: [
        { name: "student", type: "address" },
        { name: "finalMarks", type: "uint64" },
      ],
      returns: { type: "void" },
    })

    atc.addMethodCall({
      appID: EXAM_APP_ID,
      method: abiMethod,
      methodArgs: [student, BigInt(marks)],
      sender: escrow.addr,
      suggestedParams: sp,
      signer: algosdk.makeBasicAccountTransactionSigner({ addr: algosdk.Address.fromString(escrow.addr), sk: escrow.sk }),
    })

    const execResult = await atc.execute(algod, 4)
    scholarshipTxId = execResult.txIDs[0] ?? ""
    console.log(`[completeExam] student=${student} marks=${marks} txId=${scholarshipTxId}`)
  } catch (e) {
    console.error("[completeExam]", e)
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }

  // --- Certificate minting (only on pass) ---
  let receipt: ExamReceipt | null = null
  if (marks >= PASS_SCORE) {
    try {
      receipt = await handleExamSuccess(student, marks, scholarshipTxId, 10_000)
    } catch (e) {
      // Non-fatal: scholarship was already sent on-chain; log and continue
      console.error("[completeExam] certificate minting failed (non-fatal):", e)
    }
  }

  return NextResponse.json({ ok: true, scholarshipTxId, receipt })
}
