/**
 * lib/algorand/escrow.ts
 * Shared server-side helpers: algod client + escrow signing account.
 * Derives ed25519 keypair from 64-char hex seed using Node.js built-in crypto
 * so no extra dependencies are required.
 */
import algosdk from "algosdk"
import { createPrivateKey, createPublicKey } from "crypto"

export const ALGOD_SERVER = "https://testnet-api.4160.nodely.dev"
export const ALGOD_PORT = 443

// GZC ASA deployed on testnet
export const GZC_ASA_ID = Number(process.env.NEXT_PUBLIC_GZC_ASA_ID ?? 756356387)
// ExamIntegrity contract App ID
export const EXAM_APP_ID = Number(process.env.EXAM_APP_ID ?? 756334236)
// Scholarship payout as defined in the contract (10,000 GZC with 6 decimals)
export const SCHOLARSHIP_GZC = 10_000

export interface EscrowAccount {
  addr: string
  sk: Uint8Array // 64-byte: [seed(32) || pubkey(32)], compatible with algosdk signTxn
}

/**
 * Derive the escrow Algorand account from the SECRET_KEY hex seed.
 * Uses the standard Ed25519 PKCS#8 encoding so Node.js crypto can handle it
 * without any third-party crypto library.
 */
export function getEscrowAccount(): EscrowAccount {
  const hex = (process.env.SECRET_KEY ?? "").replace(/\s/g, "")
  if (hex.length !== 64) throw new Error("SECRET_KEY must be exactly 64 hex characters (32-byte seed)")

  const seed = Buffer.from(hex, "hex") // 32 bytes

  // PKCS#8 DER structure for a raw Ed25519 private key:
  // 3 bytes: SEQUENCE header (0x30 0x2e)
  // 4 bytes: INTEGER 0
  // 7 bytes: AlgorithmIdentifier { OID 1.3.101.112 }
  // 4 bytes: OCTET STRING wrapper
  // 32 bytes: raw seed
  const PKCS8_PREFIX = Buffer.from("302e020100300506032b657004220420", "hex")
  const pkcs8Der = Buffer.concat([PKCS8_PREFIX, seed])

  const privKey = createPrivateKey({ key: pkcs8Der, format: "der", type: "pkcs8" })
  const pubKey = createPublicKey(privKey)
  // SubjectPublicKeyInfo (SPKI) DER for Ed25519 = 12-byte header + 32-byte key
  const spkiDer = pubKey.export({ type: "spki", format: "der" }) as Buffer
  const pubBytes = spkiDer.slice(12) // 32-byte raw public key

  // algosdk's txn.signTxn(sk) internally calls nacl.sign.detached(msg, sk)
  // where sk is expected as [seed(32) || pubkey(32)]
  const sk = new Uint8Array(64)
  sk.set(seed)
  sk.set(pubBytes, 32)

  return { addr: algosdk.encodeAddress(new Uint8Array(pubBytes)), sk }
}

export function getAlgod(): algosdk.Algodv2 {
  return new algosdk.Algodv2("", ALGOD_SERVER, ALGOD_PORT)
}
