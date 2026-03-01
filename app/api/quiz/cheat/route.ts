/**
 * POST /api/quiz/cheat
 * Server-side proctor: calls recordCheat on the ExamIntegrity contract.
 * Only the contract creator (SECRET_KEY) can submit this.
 */
import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"
import { getAlgod, getEscrowAccount, EXAM_APP_ID } from "@/lib/algorand/escrow"

export async function POST(req: NextRequest) {
  const { student } = await req.json() as { student: string }
  if (!student) return NextResponse.json({ error: "student required" }, { status: 400 })

  const secretKey = process.env.SECRET_KEY
  if (!secretKey || !EXAM_APP_ID) {
    // Gracefully no-op when contract is not deployed
    return NextResponse.json({ ok: true, simulated: true })
  }

  try {
    const algod = getAlgod()
    const escrow = getEscrowAccount()
    const sp = await algod.getTransactionParams().do()

    const atc = new algosdk.AtomicTransactionComposer()
    const abiMethod = new algosdk.ABIMethod({
      name: "recordCheat",
      args: [{ name: "student", type: "address" }],
      returns: { type: "void" },
    })

    atc.addMethodCall({
      appID: EXAM_APP_ID,
      method: abiMethod,
      methodArgs: [student],
      sender: escrow.addr,
      suggestedParams: sp,
      signer: algosdk.makeBasicAccountTransactionSigner({ addr: algosdk.Address.fromString(escrow.addr), sk: escrow.sk }),
    })

    await atc.execute(algod, 4)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[recordCheat]", e)
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}

