/**
 * POST /api/shop/buy-gzc
 * Transfers GZC tokens from the escrow/deployer account to the student's wallet.
 * The student must have already opted in to the GZC ASA before calling this.
 */
import { NextRequest, NextResponse } from "next/server"
import algosdk from "algosdk"
import { getAlgod, getEscrowAccount } from "@/lib/algorand/escrow"

const GZC_ASA_ID = Number(process.env.NEXT_PUBLIC_GZC_ASA_ID ?? 756356387)
const MIN_GZC = 40_000

export async function POST(req: NextRequest) {
  const body = await req.json() as { student?: string; amount?: number }
  const { student, amount } = body

  if (!student || !algosdk.isValidAddress(student)) {
    return NextResponse.json({ ok: false, error: "Invalid student address" }, { status: 400 })
  }
  if (!amount || amount < MIN_GZC) {
    return NextResponse.json({ ok: false, error: `Minimum purchase is ${MIN_GZC.toLocaleString()} GZC` }, { status: 400 })
  }

  const secretKey = process.env.SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ ok: false, error: "Shop not available — deployer key not configured" }, { status: 503 })
  }

  try {
    const algod = getAlgod()
    const escrow = getEscrowAccount()

    // Verify escrow holds enough GZC
    const escrowInfo = await algod.accountInformation(escrow.addr).do()
    const gzcAsset = (escrowInfo.assets ?? []).find(
      (a: { assetId: bigint | number; amount: bigint | number }) =>
        Number(a.assetId) === GZC_ASA_ID
    )
    const available = gzcAsset ? Number(gzcAsset.amount) : 0
    if (available < amount) {
      return NextResponse.json(
        { ok: false, error: `Insufficient shop balance. Available: ${available.toLocaleString()} GZC` },
        { status: 409 }
      )
    }

    // Verify student has opted in to the GZC ASA
    const studentInfo = await algod.accountInformation(student).do()
    const studentHasAsset = (studentInfo.assets ?? []).some(
      (a: { assetId: bigint | number }) => Number(a.assetId) === GZC_ASA_ID
    )
    if (!studentHasAsset) {
      return NextResponse.json(
        { ok: false, error: "Wallet has not opted in to GZC ASA. Please opt in first." },
        { status: 409 }
      )
    }

    const sp = await algod.getTransactionParams().do()
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      sender: escrow.addr,
      receiver: student,
      assetIndex: GZC_ASA_ID,
      amount: BigInt(amount),
      suggestedParams: sp,
    })

    const signed = txn.signTxn(escrow.sk)
    await algod.sendRawTransaction(signed).do()
    const result = await algosdk.waitForConfirmation(algod, txn.txID(), 6)

    console.log(`[shop] Transferred ${amount} GZC to ${student} — txId=${txn.txID()} round=${result.confirmedRound}`)
    return NextResponse.json({ ok: true, txId: txn.txID(), amount })
  } catch (e) {
    console.error("[shop/buy-gzc]", e)
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
