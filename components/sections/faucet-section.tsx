"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useWallet } from "@txnlab/use-wallet-react"

const LORA_URL = "https://lora.algokit.io/testnet/fund"

const STEPS = [
  {
    number: "01",
    title: "Connect Wallet",
    description: "Connect your Algorand wallet using the button in the top-right. Pera Wallet and Defly are supported on testnet.",
    tag: "Required",
    direction: "left",
  },
  {
    number: "02",
    title: "Register on Lora",
    description: "Paste your wallet address into the Algorand testnet faucet and request 10 ALGO — enough to cover all GZC gas fees.",
    tag: "External",
    href: LORA_URL,
    direction: "right",
  },
  {
    number: "03",
    title: "Receive Test ALGO",
    description: "The faucet transfers 10 ALGO directly to your wallet on testnet — enough to cover all gas fees for GZC token interactions.",
    tag: "~10 ALGO",
    direction: "left",
  },
  {
    number: "04",
    title: "Acquire GZC Tokens",
    description: "With ALGO in your wallet, opt-in to the GZC ASA and exchange. Gas per 10,000 GZC acquisition is approximately 0.01 ALGO.",
    tag: "0.01 ALGO / 10K GZC",
    direction: "right",
  },
]

export function FaucetSection() {
  const { ref, isVisible } = useReveal(0.3)
  const { activeAddress } = useWallet()

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div
          className={`mb-4 transition-all duration-700 md:mb-5 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Faucet
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Fund your wallet for on-chain participation</p>
        </div>

        {/* ── Lora hero CTA ── */}
        <div
          className={`mb-3 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <a
            href={LORA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-xl border border-foreground/20 bg-foreground/[0.04] p-3.5 transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/[0.07] md:flex-row md:items-center md:gap-5 md:p-4"
          >
            {/* Left: label + URL */}
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[10px] text-blue-400 uppercase tracking-widest">
                  Step 02 — Required
                </span>
              </div>
              <p className="font-sans text-sm font-light text-foreground md:text-base">
                Get free testnet ALGO from the official Algorand faucet
              </p>
              <p className="font-mono text-xs text-foreground/50 group-hover:text-foreground/80 transition-colors">
                lora.algokit.io/testnet/fund
              </p>
            </div>
            {/* Right: CTA button */}
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 rounded-lg border border-foreground/20 bg-foreground/[0.06] px-4 py-2 font-sans text-xs font-medium text-foreground transition-all duration-200 group-hover:border-foreground/40 group-hover:bg-foreground/10">
                Open Lora Faucet
                <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 13L13 3M13 3H7M13 3v6" />
                </svg>
              </span>
            </div>
          </a>
        </div>

        {/* Wallet status banner */}
        <div
          className={`mb-3 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          {activeAddress ? (
            <div className="inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-foreground/[0.04] px-4 py-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs text-foreground/60">
                Wallet connected —{" "}
                <span className="text-foreground/90">{activeAddress.slice(0, 8)}...{activeAddress.slice(-4)}</span>
              </span>
              <span className="font-mono text-xs text-foreground/40">Step 01 complete</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-3 rounded-full border border-amber-500/25 bg-amber-500/[0.06] px-4 py-2">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="font-mono text-xs text-amber-400/80">Connect your wallet to begin</span>
            </div>
          )}
        </div>

        {/* Steps grid */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-x-12 md:gap-y-5 lg:gap-x-20">
          {STEPS.map((step, i) => {
            const revealClass = isVisible
              ? "translate-x-0 translate-y-0 opacity-100"
              : step.direction === "left"
              ? "-translate-x-16 opacity-0"
              : "translate-x-16 opacity-0"

            const isConnectStep = i === 0
            const isDone = isConnectStep && !!activeAddress

            return (
              <div
                key={i}
                className={`group transition-all duration-700 ${revealClass}`}
                style={{ transitionDelay: `${150 + i * 120}ms` }}
              >
                <div className="mb-1.5 flex items-center gap-3">
                  <div
                    className={`h-px w-8 transition-all duration-300 group-hover:w-12 ${
                      isDone ? "bg-emerald-400/50 group-hover:bg-emerald-400/70" : "bg-foreground/30 group-hover:bg-foreground/50"
                    }`}
                  />
                  <span className={`font-mono text-xs ${isDone ? "text-emerald-400/70" : "text-foreground/60"}`}>
                    {step.number}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] ${
                      isDone
                        ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border border-foreground/15 bg-foreground/[0.04] text-foreground/50"
                    }`}
                  >
                    {isDone ? "Done" : step.tag}
                  </span>
                </div>

                <h3 className="mb-1 font-sans text-xl font-light text-foreground md:text-2xl">
                  {step.title}
                </h3>
                <p className="mb-2 max-w-sm text-xs leading-relaxed text-foreground/70 md:text-sm">
                  {step.description}
                </p>

                {step.href && (
                  <a
                    href={step.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-foreground/50 transition-colors hover:text-foreground/90"
                  >
                    <span className="h-px w-4 bg-current" />
                    lora.algokit.io/testnet/fund
                    <span className="text-foreground/30">↗</span>
                  </a>
                )}
              </div>
            )
          })}
        </div>

        {/* Gas fee note */}
        <div
          className={`mt-4 transition-all duration-700 md:mt-5 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-foreground/[0.04] px-5 py-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
            <p className="font-mono text-xs text-foreground/60">
              10 ALGO covers approx{" "}
              <span className="text-foreground/90">100,000+ GZC transactions</span>
              {" "}at current testnet gas rates.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
