/**
 * POST /api/quiz/complete
 * Server-side proctor: calls completeExam on the ExamIntegrity contract.
 */
import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"

const ALGOD_SERVER = "https://testnet-api.4160.nodely.dev"
const ALGOD_PORT = 443
const APP_ID = Number(process.env.NEXT_PUBLIC_EXAM_CONTRACT_APP_ID ?? "0")

export async function POST(req: NextRequest) {
  const { student, marks } = await req.json() as { student: string; marks: number }
  if (!student || marks === undefined) {
    return NextResponse.json({ error: "student and marks required" }, { status: 400 })
  }

  const secretKey = process.env.SECRET_KEY
  if (!secretKey || !APP_ID) {
    return NextResponse.json({ ok: true, simulated: true })
  }

  try {
    const algod = new algosdk.Algodv2("", ALGOD_SERVER, ALGOD_PORT)
    const sp = await algod.getTransactionParams().do()
    const proctorAccount = algosdk.mnemonicToSecretKey(secretKey)

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
      appID: APP_ID,
      method: abiMethod,
      methodArgs: [student, BigInt(marks)],
      sender: proctorAccount.addr,
      suggestedParams: sp,
      signer: algosdk.makeBasicAccountTransactionSigner(proctorAccount),
    })

    await atc.execute(algod, 4)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[completeExam]", e)
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
