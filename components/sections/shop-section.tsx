"use client"

import { useState, useCallback } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { useWallet } from "@txnlab/use-wallet-react"
import algosdk from "algosdk"

const GZC_ASA_ID = Number(process.env.NEXT_PUBLIC_GZC_ASA_ID ?? 756356387)
const ALGOD_API = process.env.NEXT_PUBLIC_ALGOD_SERVER ?? "https://testnet-api.algonode.cloud"
const MIN_GZC = 40_000
const GAS_PER_10K = 0.01 // ALGO

type BuyStatus = "idle" | "checking" | "opting-in" | "purchasing" | "done" | "error"

export function ShopSection() {
  const { ref, isVisible } = useReveal(0.3)
  const { activeAddress, signTransactions } = useWallet()

  const [amount, setAmount] = useState<string>("")
  const [buyStatus, setBuyStatus] = useState<BuyStatus>("idle")
  const [buyError, setBuyError] = useState("")
  const [buyTxId, setBuyTxId] = useState<string | null>(null)

  const algoCost = amount ? ((Number(amount) / 10_000) * GAS_PER_10K).toFixed(4) : "—"
  const isValidAmount = Number(amount) >= MIN_GZC && Number.isInteger(Number(amount))
  const isWorking = buyStatus === "checking" || buyStatus === "opting-in" || buyStatus === "purchasing"

  const handleBuy = useCallback(async () => {
    if (!activeAddress || !signTransactions || !isValidAmount) return
    setBuyStatus("checking")
    setBuyError("")
    setBuyTxId(null)

    try {
      const algod = new algosdk.Algodv2("", ALGOD_API, 443)

      // Check if user has opted in to GZC ASA
      const info = await algod.accountInformation(activeAddress).do()
      const optedIn = (info.assets ?? []).some(
        (a: { assetId: bigint | number }) => Number(a.assetId) === GZC_ASA_ID
      )

      if (!optedIn) {
        setBuyStatus("opting-in")
        const sp = await algod.getTransactionParams().do()
        const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          sender: activeAddress,
          receiver: activeAddress,
          assetIndex: GZC_ASA_ID,
          amount: 0,
          suggestedParams: sp,
        })
        const encoded = algosdk.encodeUnsignedTransaction(optInTxn)
        const signed = await signTransactions([[encoded]])
        const signedTxn = signed[0]
        if (!signedTxn) throw new Error("Wallet rejected opt-in")
        await algod.sendRawTransaction(signedTxn).do()
        await algosdk.waitForConfirmation(algod, optInTxn.txID(), 4)
      }

      setBuyStatus("purchasing")
      const res = await fetch("/api/shop/buy-gzc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student: activeAddress, amount: Number(amount) }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Purchase failed")

      setBuyTxId(data.txId)
      setBuyStatus("done")
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      setBuyError(msg.toLowerCase().includes("reject") ? "Rejected in wallet." : msg)
      setBuyStatus("error")
    }
  }, [activeAddress, signTransactions, amount, isValidAmount])

  const reset = () => {
    setBuyStatus("idle")
    setBuyError("")
    setBuyTxId(null)
    setAmount("")
  }

  const statusLabel = {
    idle: null,
    checking: "Checking wallet state...",
    "opting-in": "Approve opt-in in your wallet...",
    purchasing: "Sending GZC to your wallet...",
    done: null,
    error: null,
  }[buyStatus]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div
          className={`mb-10 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Shop GZC
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Acquire GZC tokens to participate in the protocol</p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">
          {/* Left — info */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="space-y-6">
              {[
                {
                  label: "Minimum Purchase",
                  value: `${MIN_GZC.toLocaleString()} GZC`,
                  sub: "Required to stake for the assessment",
                },
                {
                  label: "Gas Estimate",
                  value: "0.01 ALGO / 10,000 GZC",
                  sub: "Covered by your testnet ALGO balance",
                },
                {
                  label: "Token Standard",
                  value: "ASA — Algorand Standard Asset",
                  sub: `Asset ID: ${GZC_ASA_ID}`,
                },
                {
                  label: "Settlement",
                  value: "Instant (~4 sec)",
                  sub: "Confirmed on-chain once you approve",
                },
              ].map(({ label, value, sub }, i) => (
                <div
                  key={label}
                  className="flex items-start gap-4 border-b border-foreground/10 pb-4 last:border-0 last:pb-0"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
                  <div>
                    <p className="font-mono text-xs text-foreground/40 uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="font-sans text-base font-light text-foreground">{value}</p>
                    <p className="font-mono text-xs text-foreground/50">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — purchase form */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            {!activeAddress ? (
              <div className="flex h-full flex-col items-start justify-center">
                <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span className="font-mono text-xs text-amber-400/80 uppercase tracking-widest">Wallet Required</span>
                  </div>
                  <p className="font-sans text-sm text-foreground/60">
                    Connect your Algorand wallet using the button in the top-right to purchase GZC tokens.
                  </p>
                </div>
              </div>
            ) : buyStatus === "done" && buyTxId ? (
              <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.05] p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="font-mono text-xs text-emerald-400/80 uppercase tracking-widest">Purchase Complete</span>
                </div>
                <p className="mb-1 font-sans text-3xl font-light text-foreground">
                  {Number(amount).toLocaleString()} GZC
                </p>
                <p className="mb-5 font-mono text-xs text-foreground/50">delivered to your wallet</p>
                <div className="mb-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-foreground/40">Transaction</span>
                    <a
                      href={`https://testnet.explorer.perawallet.app/tx/${buyTxId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-emerald-400 hover:underline"
                    >
                      {buyTxId.slice(0, 12)}... ↗
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-foreground/40">Gas Paid (est.)</span>
                    <span className="font-mono text-xs text-foreground/70">{algoCost} ALGO</span>
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="w-full rounded-xl border border-foreground/15 py-2.5 font-sans text-sm text-foreground/50 transition-colors hover:text-foreground"
                >
                  Buy More
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Amount input */}
                <div>
                  <label className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-xs text-foreground/50 uppercase tracking-widest">GZC Amount</span>
                    <span className="font-mono text-xs text-foreground/30">min {MIN_GZC.toLocaleString()}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={MIN_GZC}
                      step="1000"
                      value={amount}
                      onChange={(e) => { setBuyStatus("idle"); setBuyError(""); setAmount(e.target.value) }}
                      placeholder={`${MIN_GZC.toLocaleString()}`}
                      disabled={isWorking}
                      className="w-full rounded-xl border border-foreground/15 bg-foreground/[0.03] px-4 py-3.5 font-sans text-lg text-foreground placeholder:text-foreground/20 focus:border-foreground/30 focus:outline-none focus:ring-0 disabled:opacity-50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm text-foreground/30">
                      GZC
                    </span>
                  </div>
                  {amount && !isValidAmount && (
                    <p className="mt-1.5 font-mono text-xs text-red-400">
                      {Number(amount) < MIN_GZC
                        ? `Minimum is ${MIN_GZC.toLocaleString()} GZC`
                        : "Enter a whole number"}
                    </p>
                  )}
                </div>

                {/* Cost summary */}
                <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-foreground/40">You receive</span>
                    <span className="font-sans text-sm text-foreground">
                      {amount && isValidAmount ? Number(amount).toLocaleString() : "—"} GZC
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-foreground/40">Est. gas fee</span>
                    <span className="font-mono text-xs text-foreground/60">{isValidAmount ? algoCost : "—"} ALGO</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-foreground/40">Network</span>
                    <span className="font-mono text-xs text-foreground/60">Algorand Testnet</span>
                  </div>
                </div>

                {/* Status / error */}
                {statusLabel && (
                  <div className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3">
                    <svg className="h-3.5 w-3.5 shrink-0 animate-spin text-foreground/50" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    <span className="font-mono text-xs text-foreground/60">{statusLabel}</span>
                  </div>
                )}
                {buyStatus === "error" && (
                  <p className="font-mono text-xs text-red-400">{buyError}</p>
                )}

                {/* Buy button */}
                <button
                  onClick={handleBuy}
                  disabled={!isValidAmount || isWorking}
                  className="w-full rounded-xl bg-foreground py-3.5 font-sans text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-default"
                >
                  {isWorking ? "Processing..." : `Purchase ${isValidAmount ? Number(amount).toLocaleString() : ""} GZC`}
                </button>

                <p className="font-mono text-[10px] text-foreground/30 text-center">
                  If not opted in to GZC ASA, your wallet will request approval first.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
