"use client"

import { useReveal } from "@/hooks/use-reveal"

const MODULES = [
  {
    number: "01",
    title: "Blockchain Fundamentals",
    category: "Core Infrastructure Module",
    bullets: [
      "Decentralization principles",
      "Wallet architecture",
      "Consensus mechanisms",
      "Smart contract basics",
    ],
    positioning: "Build the technical foundation required to participate in stake-based, on-chain verification systems.",
    direction: "left",
  },
  {
    number: "02",
    title: "Linux Fundamentals",
    category: "System Control Module",
    bullets: [
      "Command-line proficiency",
      "File system management",
      "Process control",
      "Server-side logic execution",
    ],
    positioning: "Develop operational competence for secure system interaction and decentralized infrastructure deployment.",
    direction: "right",
  },
]

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-10 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Learn
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Foundational Infrastructure Layer</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">
          {MODULES.map((mod, i) => (
            <ModuleCard key={i} mod={mod} index={i} isVisible={isVisible} />
          ))}
        </div>

        {/* Pipeline bridging statement */}
        <div
          className={`mt-8 transition-all duration-700 md:mt-10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-foreground/[0.04] px-5 py-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
            <p className="font-mono text-xs text-foreground/60 md:text-sm">
              Completion of foundational modules qualifies learners to attempt the{" "}
              <span className="text-foreground/90">Proof-of-Knowledge Assessment Protocol</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ModuleCard({
  mod,
  index,
  isVisible,
}: {
  mod: typeof MODULES[number]
  index: number
  isVisible: boolean
}) {
  const revealClass = isVisible
    ? "translate-x-0 opacity-100"
    : mod.direction === "left"
    ? "-translate-x-16 opacity-0"
    : "translate-x-16 opacity-0"

  return (
    <div
      className={`group border-b border-foreground/10 pb-6 transition-all duration-700 hover:border-foreground/20 md:pb-8 ${revealClass}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-4 md:gap-8">
          <span className="mt-1 font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
            {mod.number}
          </span>
          <div>
            <h3 className="mb-0.5 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
              {mod.title}
            </h3>
            <p className="mb-3 font-mono text-xs text-foreground/50 md:text-sm">{mod.category}</p>
            <ul className="mb-3 space-y-1">
              {mod.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 font-mono text-xs text-foreground/55">
                  <span className="text-foreground/30">—</span>{b}
                </li>
              ))}
            </ul>
            <p className="max-w-sm font-sans text-xs italic text-foreground/45 md:text-sm">
              {mod.positioning}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
