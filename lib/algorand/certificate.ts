/**
 * lib/algorand/certificate.ts
 * Core post-exam success workflow:
 *   1. Mint NFT certificate ASA (total=1, decimals=0), embedding metadata hash
 *   2. Attempt auto-transfer to student (no-op if not opted-in; claim available separately)
 *   3. Return immutable ExamReceipt
 * Also exposes verifyCertificate() for tamper-proof on-chain validation.
 */
import algosdk from "algosdk"
import { createHash } from "crypto"
import { getAlgod, getEscrowAccount, GZC_ASA_ID, EXAM_APP_ID, SCHOLARSHIP_GZC } from "./escrow"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CertMetadata {
  certId: string
  student: string
  examAppId: number
  gzcAsaId: number
  score: number
  timestamp: string
}

/** Immutable receipt stored by the backend and returned to the frontend. */
export interface ExamReceipt {
  certId: string
  nftAssetId: number
  mintTxId: string
  scholarshipTxId: string
  student: string
  score: number
  timestamp: string
  /** SHA-256 hex of CertMetadata JSON — stored as assetMetadataHash on-chain */
  metaHash: string
  gzcAmount: number
  /** true when the NFT was successfully transferred to the student's wallet */
  nftClaimed: boolean
}

export interface VerifyResult {
  valid: boolean
  nftHeld: boolean
  metaHashMatch: boolean
  examPassed: boolean
  details: {
    onChainHash: string
    providedHash?: string
    marks: number
    cheats: number
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildCertMetadata(student: string, score: number): CertMetadata {
  return {
    certId: `GZCERT-${Date.now()}-${student.slice(0, 6).toUpperCase()}`,
    student,
    examAppId: EXAM_APP_ID,
    gzcAsaId: GZC_ASA_ID,
    score,
    timestamp: new Date().toISOString(),
  }
}

function sha256Bytes(meta: CertMetadata): Uint8Array {
  const hex = createHash("sha256").update(JSON.stringify(meta)).digest("hex")
  return new Uint8Array(Buffer.from(hex, "hex")) // 32 bytes
}

function sha256Hex(meta: CertMetadata): string {
  return createHash("sha256").update(JSON.stringify(meta)).digest("hex")
}

// ---------------------------------------------------------------------------
// handleExamSuccess
// ---------------------------------------------------------------------------

/**
 * Called server-side after completeExam succeeds on-chain.
 * Mints one NFT certificate ASA and tries to transfer it to the student.
 */
export async function handleExamSuccess(
  student: string,
  score: number,
  scholarshipTxId: string,
  gzcAmount: number = SCHOLARSHIP_GZC
): Promise<ExamReceipt> {
  const algod = getAlgod()
  const escrow = getEscrowAccount()

  const meta = buildCertMetadata(student, score)
  const metaHashBytes = sha256Bytes(meta)
  const metaHash = Buffer.from(metaHashBytes).toString("hex")

  // Note field: full metadata JSON (max 1 KB — we're well under that)
  const noteBytes = new Uint8Array(
    Buffer.from(JSON.stringify({ ...meta, metaHash }), "utf8")
  )

  // --- Step 1: Mint NFT certificate ---
  const sp = await algod.getTransactionParams().do()
  const mintTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    sender: escrow.addr,
    total: 1n,
    decimals: 0,
    defaultFrozen: false,
    unitName: "GZCERT",
    assetName: `GradZCap ${meta.certId}`,
    assetURL: `https://gradzcap.app/cert/${encodeURIComponent(meta.certId)}`,
    assetMetadataHash: metaHashBytes,
    manager: escrow.addr,
    reserve: escrow.addr,
    freeze: escrow.addr,
    clawback: escrow.addr,
    suggestedParams: sp,
    note: noteBytes,
  })

  const signedMint = mintTxn.signTxn(escrow.sk)
  const { txid: mintTxId } = await algod.sendRawTransaction(signedMint).do()
  const mintResult = await algosdk.waitForConfirmation(algod, mintTxId, 4)
  const nftAssetId = Number(mintResult.assetIndex)

  console.log(`[certificate] Minted NFT assetId=${nftAssetId} txId=${mintTxId} certId=${meta.certId}`)

  // --- Step 2: Auto-transfer to student (no-op if not opted in yet) ---
  let nftClaimed = false
  try {
    const sp2 = await algod.getTransactionParams().do()
    const transferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      sender: escrow.addr,
      receiver: student,
      assetIndex: nftAssetId,
      amount: 1n,
      suggestedParams: sp2,
    })
    const signedTransfer = transferTxn.signTxn(escrow.sk)
    await algod.sendRawTransaction(signedTransfer).do()
    await algosdk.waitForConfirmation(algod, transferTxn.txID(), 4)
    nftClaimed = true
    console.log(`[certificate] Auto-transferred NFT #${nftAssetId} to ${student}`)
  } catch {
    // Student has not opted into this new ASA yet — NFT stays at escrow.
    // They can claim it via POST /api/quiz/claim-cert after opting in.
    console.log(`[certificate] Student not opted in for NFT #${nftAssetId} — held at escrow`)
  }

  return {
    certId: meta.certId,
    nftAssetId,
    mintTxId,
    scholarshipTxId,
    student,
    score,
    timestamp: meta.timestamp,
    metaHash,
    gzcAmount,
    nftClaimed,
  }
}

// ---------------------------------------------------------------------------
// verifyCertificate
// ---------------------------------------------------------------------------

/**
 * Tamper-proof verification:
 *   1. Student holds exactly 1 unit of the NFT ASA
 *   2. assetMetadataHash on-chain matches providedMetaHash
 *   3. Contract local state: marks >= 80 and cheats == 0
 */
export async function verifyCertificate(
  student: string,
  nftAssetId: number,
  providedMetaHash?: string
): Promise<VerifyResult> {
  const algod = getAlgod()

  // 1. NFT ownership
  let nftHeld = false
  try {
    const info = await algod.accountInformation(student).do()
    const assets = (info.assets ?? []) as Array<{ assetId: bigint | number; amount: bigint | number }>
    const holding = assets.find((a) => Number(a.assetId) === nftAssetId)
    nftHeld = holding ? Number(holding.amount) === 1 : false
  } catch { /* ok */ }

  // 2. On-chain metadata hash from ASA params (no indexer needed)
  let onChainHash = ""
  try {
    const assetInfo = await algod.getAssetByID(nftAssetId).do()
    const rawHash = assetInfo.params?.metadataHash
    if (rawHash) onChainHash = Buffer.from(rawHash).toString("hex")
  } catch { /* ok */ }

  const metaHashMatch = providedMetaHash
    ? providedMetaHash === onChainHash
    : onChainHash.length > 0

  // 3. Contract local state: marks and cheats
  let marks = 0
  let cheats = 0
  let examPassed = false
  try {
    const appState = await algod.accountApplicationInformation(student, EXAM_APP_ID).do()
    const kv = appState.appLocalState?.keyValue ?? []
    for (const entry of kv) {
      // algosdk v3: key is Uint8Array, value.uint is bigint
      const keyStr = Buffer.from(entry.key as Uint8Array).toString("utf8")
      const uint = typeof entry.value.uint === "bigint" ? Number(entry.value.uint) : Number(entry.value.uint)
      if (keyStr === "marks") marks = uint
      if (keyStr === "cheats") cheats = uint
    }
    examPassed = marks >= 80 && cheats === 0
  } catch { /* contract not deployed or student not opted in */ }

  return {
    valid: nftHeld && metaHashMatch && examPassed,
    nftHeld,
    metaHashMatch,
    examPassed,
    details: { onChainHash, providedHash: providedMetaHash, marks, cheats },
  }
}

// Re-export for use in routes
export { sha256Hex, buildCertMetadata }
