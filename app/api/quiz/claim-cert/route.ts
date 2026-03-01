/**
 * POST /api/quiz/claim-cert
 * Transfers the NFT certificate from the escrow wallet to the student.
 * The student MUST have already opted into the NFT ASA before calling this
 * (i.e., signed and submitted a 0-amount self-asset-transfer on the frontend).
 *
 * Body: { student: string, nftAssetId: number }
 */
import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"
import { getAlgod, getEscrowAccount } from "@/lib/algorand/escrow"

export async function POST(req: NextRequest) {
  let body: { student?: string; nftAssetId?: number }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { student, nftAssetId } = body
  if (!student || !nftAssetId) {
    return NextResponse.json({ error: "student and nftAssetId are required" }, { status: 400 })
  }

  if (!process.env.SECRET_KEY) {
    return NextResponse.json({ error: "Escrow wallet not configured" }, { status: 500 })
  }

  try {
    const algod = getAlgod()
    const escrow = getEscrowAccount()

    // Confirm escrow actually holds the NFT before attempting transfer
    const escrowInfo = await algod.accountInformation(escrow.addr).do()
    const escrowAssets = (escrowInfo.assets ?? []) as Array<{ assetId: bigint | number; amount: bigint | number }>
    const holding = escrowAssets.find((a) => Number(a.assetId) === nftAssetId)
    if (!holding || Number(holding.amount) === 0) {
      // Already transferred or invalid asset
      return NextResponse.json({ ok: true, alreadyClaimed: true })
    }

    // Confirm student has opted in (their asset balance entry exists)
    const studentInfo = await algod.accountInformation(student).do()
    const studentAssets = (studentInfo.assets ?? []) as Array<{ assetId: bigint | number; amount: bigint | number }>
    const studentHolding = studentAssets.find((a) => Number(a.assetId) === nftAssetId)
    if (!studentHolding) {
      return NextResponse.json(
        { error: "Student has not opted into this ASA. Complete the opt-in transaction first." },
        { status: 409 }
      )
    }

    const sp = await algod.getTransactionParams().do()
    const transferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      sender: escrow.addr,
      receiver: student,
      assetIndex: nftAssetId,
      amount: 1n,
      suggestedParams: sp,
    })

    const signed = transferTxn.signTxn(escrow.sk)
    await algod.sendRawTransaction(signed).do()
    await algosdk.waitForConfirmation(algod, transferTxn.txID(), 4)

    console.log(`[claim-cert] Transferred NFT #${nftAssetId} to ${student}`)
    return NextResponse.json({ ok: true, txId: transferTxn.txID() })
  } catch (e) {
    console.error("[/api/quiz/claim-cert]", e)
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
