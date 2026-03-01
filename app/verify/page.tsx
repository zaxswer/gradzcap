"use client"

import { useState } from "react"
import algosdk from "algosdk"

const ALGOD_SERVER = "https://testnet-api.algonode.cloud"
const ALGOD_PORT = 443
const APP_ID = Number(process.env.NEXT_PUBLIC_CONTRACT_APP_ID || "756359161")

interface CertificateData {
  studentAddress: string
  finalMarks: number
  totalQuestions: number
  timestamp: number
  nftId: number
}

interface LocalCertificate {
  fileName: string
  walletAddress: string
  timestamp: number
  date: string
  finalMarks: number
  totalQuestions: number
  correctAnswers: number
  passed: boolean
  cheated: boolean
  timeSpent: number
  score: number
}

export default function VerifyPage() {
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [onChainCert, setOnChainCert] = useState<CertificateData | null>(null)
  const [localCerts, setLocalCerts] = useState<LocalCertificate[]>([])
  const [hasNFT, setHasNFT] = useState(false)
  const [nftId, setNftId] = useState<number | null>(null)

  const handleVerify = async () => {
    if (!address) return
    
    setLoading(true)
    setError("")
    setOnChainCert(null)
    setLocalCerts([])
    setHasNFT(false)
    setNftId(null)

    try {
      // Validate address
      algosdk.decodeAddress(address)

      // 1. Check on-chain certificate data from contract
      try {
        const certRes = await fetch(`/api/verify/certificate?address=${address}`)
        if (certRes.ok) {
          const certData = await certRes.json()
          if (certData.certificate) {
            setOnChainCert(certData.certificate)
            setNftId(certData.certificate.nftId)
          }
        }
      } catch (e) {
        console.log("No on-chain certificate found")
      }

      // 2. Check if wallet holds the NFT
      if (nftId) {
        const nftRes = await fetch(`/api/verify/nft?address=${address}&nftId=${nftId}`)
        if (nftRes.ok) {
          const nftData = await nftRes.json()
          setHasNFT(nftData.hasNFT)
        }
      }

      // 3. Get local certificate history
      const localRes = await fetch(`/api/quiz/complete?address=${address}`)
      if (localRes.ok) {
        const localData = await localRes.json()
        setLocalCerts(localData.certificates || [])
      }

    } catch (err: any) {
      setError(err.message || "Verification failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Verify Scholarship</h1>
          <p className="text-white/60">
            Check if a wallet address has earned a GradZCap scholarship certificate
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-8 flex gap-4">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Algorand wallet address..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleVerify}
            disabled={loading || !address}
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 disabled:text-white/40 font-semibold transition-colors"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            {error}
          </div>
        )}

        {/* On-Chain Certificate */}
        {onChainCert && (
          <div className="mb-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-emerald-400">
                ✓ Scholarship Verified
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-white/40 mb-1">Final Score</div>
                <div className="text-xl font-bold">{onChainCert.finalMarks}%</div>
              </div>
              <div>
                <div className="text-white/40 mb-1">Questions</div>
                <div className="text-xl font-bold">{onChainCert.totalQuestions}</div>
              </div>
              <div>
                <div className="text-white/40 mb-1">Issued</div>
                <div className="font-mono">{new Date(onChainCert.timestamp * 1000).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-white/40 mb-1">NFT ID</div>
                <div className="font-mono text-blue-400">{onChainCert.nftId}</div>
              </div>
            </div>

            {hasNFT && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                NFT is currently held by this wallet
              </div>
            )}
          </div>
        )}

        {/* Local Certificate History */}
        {localCerts.length > 0 && (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-4">Exam History</h3>
            <div className="text-sm text-white/60 mb-4">
              Total Attempts: {localCerts.length} | Passed: {localCerts.filter(c => c.passed).length}
            </div>

            <div className="space-y-3">
              {localCerts.map((cert, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${
                    cert.passed
                      ? "bg-emerald-500/5 border-emerald-500/30"
                      : "bg-red-500/5 border-red-500/30"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className={`font-semibold ${cert.passed ? "text-emerald-400" : "text-red-400"}`}>
                      {cert.passed ? "✓ PASSED" : "✗ FAILED"}
                    </div>
                    <div className="text-white/40 text-xs">
                      {new Date(cert.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-white/40">Score</div>
                      <div className="font-mono">{cert.score}%</div>
                    </div>
                    <div>
                      <div className="text-white/40">Correct</div>
                      <div className="font-mono">{cert.correctAnswers}/{cert.totalQuestions}</div>
                    </div>
                    <div>
                      <div className="text-white/40">Time</div>
                      <div className="font-mono">{Math.floor(cert.timeSpent / 60)}m {cert.timeSpent % 60}s</div>
                    </div>
                  </div>
                  {cert.cheated && (
                    <div className="mt-2 text-xs text-red-400">Integrity violation detected</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && !onChainCert && localCerts.length === 0 && address && (
          <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/10">
            <div className="text-white/40 mb-2">No scholarship found for this address</div>
            <div className="text-sm text-white/60">
              The wallet may not have completed the exam or did not pass.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
