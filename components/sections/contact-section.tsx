"use client"

import { useReveal } from "@/hooks/use-reveal"

const PILLARS = [
  { label: "Proof-of-Knowledge", desc: "AI-generated assessments with behavioral trap detection" },
  { label: "On-Chain Integrity", desc: "Every result, cheat, and certificate recorded on Algorand" },
  { label: "Trustless Disbursement", desc: "Smart contracts transfer scholarships with zero intermediaries" },
  { label: "NFT Credentials", desc: "Tamper-proof certificates with on-chain metadata hash" },
]

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div
          className={`mb-8 transition-all duration-700 md:mb-10 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            About
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ GradZCap — Decentralized Scholarship Protocol</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">
          {/* Left — what we are */}
          <div>
            <div
              className={`mb-6 transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <p className="text-sm leading-relaxed text-foreground/80 md:text-base">
                GradZCap is a merit-driven, blockchain-native scholarship protocol built on Algorand.
                Students stake GZC tokens, complete AI-generated assessments under behavioral-integrity
                monitoring, and — upon passing — receive tamper-proof NFT credentials and automatic
                scholarship disbursement via smart contract.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
                No intermediaries. No paperwork. No debt. Every result is immutable, every payout
                is trustless, and every credential is verifiable on-chain — permanently.
              </p>
            </div>

            {/* Pillars */}
            <div
              className={`space-y-3 transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
              style={{ transitionDelay: "250ms" }}
            >
              {PILLARS.map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 h-1 w-4 shrink-0 bg-foreground/30" />
                  <div>
                    <span className="font-sans text-xs font-medium text-foreground/90">{p.label}</span>
                    <span className="font-mono text-xs text-foreground/45"> — {p.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — built by */}
          <div
            className={`flex flex-col justify-between transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Team credit card */}
            <div className="rounded-2xl border border-foreground/15 bg-foreground/[0.03] p-6 md:p-8">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-foreground/40">Built by</p>
              <a
                href="https://expose.software"
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-4 block"
              >
                <h3 className="font-sans text-3xl font-light text-foreground transition-opacity group-hover:opacity-70 md:text-4xl">
                  Team EXPOSE
                </h3>
                <p className="font-mono text-xs text-foreground/40 transition-colors group-hover:text-foreground/70">
                  expose.software ↗
                </p>
              </a>

              <div className="mb-6 h-px w-full bg-foreground/10" />

              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-foreground/40">Presented at</p>
              <a
                href="https://diversion.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <h3 className="font-sans text-2xl font-light text-foreground transition-opacity group-hover:opacity-70 md:text-3xl">
                  Diversion 2026
                </h3>
                <p className="font-mono text-xs text-foreground/40 transition-colors group-hover:text-foreground/70">
                  diversion.tech ↗
                </p>
              </a>
            </div>

            {/* Stack note */}
            <div
              className={`mt-5 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "450ms" }}
            >
              <div className="inline-flex flex-wrap gap-2">
                {["Algorand", "AVM Smart Contracts", "AlgoKit", "Next.js 15", "Gemini AI", "GZC ASA"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-1 font-mono text-[10px] text-foreground/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
