"use client"

import { useState, useEffect, useRef } from "react"
import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { useRouter } from "next/navigation"

// ─── Quiz data ────────────────────────────────────────────────────────────────
const MODULES = [
  {
    id: 1,
    title: "Blockchain Fundamentals",
    tag: "Core Module",
    passMark: 70,
    questions: [
      {
        q: "What is a blockchain?",
        options: [
          "A centralised database managed by a single company",
          "A distributed, append-only ledger shared across a network of nodes",
          "A type of encryption algorithm",
          "A cloud storage protocol",
        ],
        answer: 1,
      },
      {
        q: "What ensures immutability in a blockchain?",
        options: [
          "Regular backups by the network admin",
          "Each block contains a cryptographic hash of the previous block",
          "Blocks are stored in RAM, not disk",
          "Nodes vote to approve changes",
        ],
        answer: 1,
      },
      {
        q: "What is a consensus mechanism?",
        options: [
          "A login protocol for blockchain nodes",
          "A marketing agreement between crypto exchanges",
          "A rule set by which nodes agree on the valid state of the ledger",
          "A method to compress block data",
        ],
        answer: 2,
      },
      {
        q: "Which of the following is a property of Proof-of-Work (PoW)?",
        options: [
          "Validators are chosen based on token stake",
          "Miners compete to solve a computationally expensive puzzle",
          "Block time is exactly one second",
          "It requires zero energy",
        ],
        answer: 1,
      },
      {
        q: "What is a Merkle tree used for in blockchain?",
        options: [
          "Encrypting wallet private keys",
          "Efficiently verifying the inclusion of a transaction in a block",
          "Generating wallet addresses",
          "Signing smart contracts",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 2,
    title: "DeFi & Smart Contracts",
    tag: "Advanced Module",
    passMark: 70,
    questions: [
      {
        q: "What is a smart contract?",
        options: [
          "A legal document signed digitally",
          "Self-executing code stored on a blockchain that runs when preset conditions are met",
          "A governance token for DeFi protocols",
          "An off-chain agreement enforced by arbitrators",
        ],
        answer: 1,
      },
      {
        q: "Which language is most commonly used to write Ethereum smart contracts?",
        options: ["Rust", "Go", "Solidity", "Python"],
        answer: 2,
      },
      {
        q: "What does DeFi stand for?",
        options: [
          "Decentralised Finance",
          "Defined Financial Infrastructure",
          "Digital File Format",
          "Distributed Fee Index",
        ],
        answer: 0,
      },
      {
        q: "What is a liquidity pool in DeFi?",
        options: [
          "A hardware wallet for storing tokens",
          "A fund locked in a smart contract that facilitates token swaps",
          "A staking reward distribution centre",
          "A bridge between Layer 1 and Layer 2 networks",
        ],
        answer: 1,
      },
      {
        q: "What is an oracle in the context of blockchain?",
        options: [
          "A consensus algorithm",
          "A privacy tool that hides transaction data",
          "A service that provides external real-world data to smart contracts",
          "A type of multi-sig wallet",
        ],
        answer: 2,
      },
    ],
  },
  {
    id: 3,
    title: "Zero-Knowledge Proofs",
    tag: "Expert Module",
    passMark: 70,
    questions: [
      {
        q: "What is a Zero-Knowledge Proof (ZKP)?",
        options: [
          "A proof with no cryptographic signatures",
          "A method to prove knowledge of a secret without revealing the secret itself",
          "An empty transaction payload",
          "A consensus mechanism that requires no computation",
        ],
        answer: 1,
      },
      {
        q: "Which property ensures a ZKP cannot be faked by a dishonest prover?",
        options: ["Completeness", "Soundness", "Zero-knowledge", "Succinctness"],
        answer: 1,
      },
      {
        q: "What does ZK-SNARK stand for?",
        options: [
          "Zero-Knowledge Shared Non-Arbitrary Recursive Key",
          "Zero-Knowledge Succinct Non-interactive ARgument of Knowledge",
          "Zero-Key Scalable Network Authentication and Relay Kernel",
          "Zero-Knowledge Secure Node Attestation and Relay Key",
        ],
        answer: 1,
      },
      {
        q: "How can ZKPs improve scholarship eligibility in GradZCap?",
        options: [
          "By publishing student marks publicly on-chain",
          "By allowing institutions to verify a student meets a GPA threshold without seeing the actual marks",
          "By letting students change their marks before submission",
          "By bypassing institution verification entirely",
        ],
        answer: 1,
      },
      {
        q: "Which of these is a real-world ZKP protocol?",
        options: ["SHA-256", "RSA-2048", "Groth16", "AES-128"],
        answer: 2,
      },
    ],
  },
]

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = "intro" | "module-intro" | "question" | "module-result" | "final"

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function QuizPage() {
  const router = useRouter()
  const shaderRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const [phase, setPhase] = useState<Phase>("intro")
  const [moduleIndex, setModuleIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [moduleScores, setModuleScores] = useState<{ correct: number; total: number }[]>([])
  const [currentCorrect, setCurrentCorrect] = useState(0)
  const [forfeitConfirm, setForfeitConfirm] = useState(false)

  // Fade-in timer for shader
  useEffect(() => {
    const check = () => {
      if (shaderRef.current) {
        const c = shaderRef.current.querySelector("canvas")
        if (c && c.width > 0) { setIsLoaded(true); return true }
      }
      return false
    }
    if (check()) return
    const iv = setInterval(() => { if (check()) clearInterval(iv) }, 100)
    const fb = setTimeout(() => setIsLoaded(true), 1500)
    return () => { clearInterval(iv); clearTimeout(fb) }
  }, [])

  const currentModule = MODULES[moduleIndex]
  const currentQuestion = currentModule?.questions[questionIndex]

  // ── Actions ──────────────────────────────────────────────────────────────
  const startModule = () => {
    setQuestionIndex(0)
    setSelected(null)
    setConfirmed(false)
    setCurrentCorrect(0)
    setForfeitConfirm(false)
    setPhase("question")
  }

  const confirmAnswer = () => {
    if (selected === null) return
    if (selected === currentQuestion.answer) {
      setCurrentCorrect((n) => n + 1)
    }
    setConfirmed(true)
  }

  const nextQuestion = () => {
    const isLast = questionIndex === currentModule.questions.length - 1
    if (isLast) {
      const correct = confirmed && selected === currentQuestion.answer
        ? currentCorrect + (selected === currentQuestion.answer && !confirmed ? 0 : 0) // already tracked in confirmAnswer
        : currentCorrect
      setModuleScores((prev) => [
        ...prev,
        { correct: currentCorrect, total: currentModule.questions.length },
      ])
      setPhase("module-result")
    } else {
      setQuestionIndex((i) => i + 1)
      setSelected(null)
      setConfirmed(false)
      setForfeitConfirm(false)
    }
  }

  const nextModule = () => {
    if (moduleIndex < MODULES.length - 1) {
      setModuleIndex((i) => i + 1)
      setPhase("module-intro")
    } else {
      setPhase("final")
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  const pct = (correct: number, total: number) => Math.round((correct / total) * 100)
  const passed = (correct: number, total: number, mod: (typeof MODULES)[0]) =>
    pct(correct, total) >= mod.passMark

  const allPassed = moduleScores.length === MODULES.length &&
    moduleScores.every((s, i) => passed(s.correct, s.total, MODULES[i]))

  const totalCorrect = moduleScores.reduce((a, s) => a + s.correct, 0)
  const totalQuestions = MODULES.reduce((a, m) => a + m.questions.length, 0)

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      {/* Shader background */}
      <div
        ref={shaderRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#0055ff"
            colorB="#000000"
            speed={0.5}
            detail={0.6}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#0044dd"
            upColor="#0044dd"
            downColor="#000000"
            leftColor="#000000"
            rightColor="#0033cc"
            intensity={0.7}
            radius={1.8}
            momentum={20}
            maskType="alpha"
            opacity={0.95}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navbar */}
      <nav className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <button onClick={() => router.push("/")} className="flex items-center gap-2 transition-transform hover:scale-105">
          <img src="/logo_bnw.png" alt="GradZCap" className="h-15 w-auto" />
        </button>
        <div className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 backdrop-blur-md">
          <p className="font-mono text-xs text-foreground/70">
            {phase === "intro" ? "Quiz Hub" : `Module ${moduleIndex + 1} / ${MODULES.length}`}
          </p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="font-mono text-xs text-foreground/50 transition-colors hover:text-foreground/90 flex items-center gap-1.5"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>
      </nav>

      {/* Content */}
      <div className={`relative z-10 flex h-screen items-center justify-center px-4 transition-opacity duration-700 md:px-12 ${isLoaded ? "opacity-100" : "opacity-0"}`}>

        {/* ── INTRO ─────────────────────────────────────────────────────── */}
        {phase === "intro" && (
          <div className="w-full max-w-2xl text-center">
            <div className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 backdrop-blur-md">
              <p className="font-mono text-xs text-foreground/80">Scholarship Qualification</p>
            </div>
            <h1 className="mb-6 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-7xl">
              The GradZCap
              <br />
              <span className="text-foreground/40">Quiz</span>
            </h1>
            <p className="mb-8 mx-auto max-w-md text-base leading-relaxed text-foreground/70 md:text-lg">
              Complete all 3 blockchain modules and score ≥ 70% in each to unlock your on-chain scholarship.
              No debt. No loans. Just knowledge.
            </p>
            <div className="mb-10 grid gap-3 md:grid-cols-3">
              {MODULES.map((m) => (
                <div key={m.id} className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-md text-left">
                  <p className="font-mono text-xs text-foreground/50 mb-1">0{m.id}</p>
                  <p className="font-sans text-sm font-medium text-foreground">{m.title}</p>
                  <p className="font-mono text-xs text-foreground/50 mt-1">{m.questions.length} questions · ≥{m.passMark}%</p>
                </div>
              ))}
            </div>
            <MagneticButton size="lg" variant="primary" onClick={() => { setModuleIndex(0); setModuleScores([]); setPhase("module-intro") }}>
              Begin Quiz
            </MagneticButton>
          </div>
        )}

        {/* ── MODULE INTRO ──────────────────────────────────────────────── */}
        {phase === "module-intro" && (
          <div className="w-full max-w-lg text-center">
            <div className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 backdrop-blur-md">
              <p className="font-mono text-xs text-foreground/80">{currentModule.tag}</p>
            </div>
            <p className="mb-2 font-mono text-sm text-foreground/50">Module {currentModule.id} of {MODULES.length}</p>
            <h2 className="mb-6 font-sans text-4xl font-light tracking-tight text-foreground md:text-6xl">
              {currentModule.title}
            </h2>
            <p className="mb-8 text-sm text-foreground/60 md:text-base">
              {currentModule.questions.length} questions &bull; Score ≥ {currentModule.passMark}% to pass
            </p>
            <div className="flex items-center justify-center gap-4">
              <MagneticButton size="lg" variant="secondary" onClick={() => router.push("/")}>
                Exit
              </MagneticButton>
              <MagneticButton size="lg" variant="primary" onClick={startModule}>
                Start Module
              </MagneticButton>
            </div>
          </div>
        )}

        {/* ── QUESTION ──────────────────────────────────────────────────── */}
        {phase === "question" && currentQuestion && (
          <div className="w-full max-w-2xl">
            {/* Progress */}
            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-mono text-xs text-foreground/50">{currentModule.title}</p>
                <p className="font-mono text-xs text-foreground/50">
                  {questionIndex + 1} / {currentModule.questions.length}
                </p>
              </div>
              <div className="h-px w-full bg-foreground/10">
                <div
                  className="h-px bg-foreground/50 transition-all duration-500"
                  style={{ width: `${((questionIndex + 1) / currentModule.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h3 className="mb-8 font-sans text-xl font-light leading-snug text-foreground md:text-2xl">
              {currentQuestion.q}
            </h3>

            {/* Options */}
            <div className="mb-8 space-y-3">
              {currentQuestion.options.map((opt, i) => {
                let borderClass = "border-foreground/10 bg-foreground/5 hover:border-foreground/30 hover:bg-foreground/10"
                if (selected === i && !confirmed) borderClass = "border-foreground/50 bg-foreground/15"
                if (confirmed) {
                  if (i === currentQuestion.answer) borderClass = "border-green-400/60 bg-green-400/10 text-green-300"
                  else if (selected === i) borderClass = "border-red-400/60 bg-red-400/10 text-red-300"
                  else borderClass = "border-foreground/5 bg-foreground/3 opacity-50"
                }
                return (
                  <button
                    key={i}
                    disabled={confirmed}
                    onClick={() => setSelected(i)}
                    className={`w-full rounded-xl border px-5 py-3.5 text-left text-sm leading-snug text-foreground backdrop-blur-md transition-all duration-200 md:text-base ${borderClass} ${confirmed ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <span className="mr-3 font-mono text-xs text-foreground/40">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* Feedback */}
            {confirmed && (
              <p className={`mb-6 font-mono text-sm ${selected === currentQuestion.answer ? "text-green-400" : "text-red-400"}`}>
                {selected === currentQuestion.answer ? "✓ Correct!" : `✗ The correct answer was ${String.fromCharCode(65 + currentQuestion.answer)}.`}
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {!confirmed ? (
                <MagneticButton
                  size="lg"
                  variant="primary"
                  onClick={confirmAnswer}
                  className={selected === null ? "opacity-40 pointer-events-none" : ""}
                >
                  Confirm Answer
                </MagneticButton>
              ) : (
                <MagneticButton size="lg" variant="primary" onClick={nextQuestion}>
                  {questionIndex === currentModule.questions.length - 1 ? "See Results" : "Next Question →"}
                </MagneticButton>
              )}

              {/* Forfeit */}
              {!forfeitConfirm ? (
                <button
                  onClick={() => setForfeitConfirm(true)}
                  className="font-mono text-xs text-foreground/40 transition-colors hover:text-red-400 underline underline-offset-4"
                >
                  Forfeit Quiz
                </button>
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-red-400/30 bg-red-400/5 px-4 py-2.5 backdrop-blur-md">
                  <p className="font-mono text-xs text-red-300">Forfeit and lose all progress?</p>
                  <button
                    onClick={() => { setForfeitConfirm(false); setModuleIndex(0); setModuleScores([]); setPhase("intro") }}
                    className="font-mono text-xs text-red-400 font-semibold transition-colors hover:text-red-300"
                  >
                    Yes, Forfeit
                  </button>
                  <button
                    onClick={() => setForfeitConfirm(false)}
                    className="font-mono text-xs text-foreground/50 transition-colors hover:text-foreground/90"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── MODULE RESULT ─────────────────────────────────────────────── */}
        {phase === "module-result" && (() => {
          const score = moduleScores[moduleScores.length - 1]
          const hasPassed = score && passed(score.correct, score.total, currentModule)
          return (
            <div className="w-full max-w-lg text-center">
              <div className={`mb-4 inline-block rounded-full border px-4 py-1.5 backdrop-blur-md ${hasPassed ? "border-green-400/40 bg-green-400/10" : "border-red-400/40 bg-red-400/10"}`}>
                <p className={`font-mono text-xs ${hasPassed ? "text-green-300" : "text-red-300"}`}>
                  {hasPassed ? "Module Passed" : "Module Failed"}
                </p>
              </div>
              <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground md:text-6xl">
                {score ? pct(score.correct, score.total) : 0}%
              </h2>
              <p className="mb-1 text-foreground/60 text-sm">
                {score?.correct} / {score?.total} correct · {currentModule.title}
              </p>
              <p className={`mb-8 font-mono text-xs ${hasPassed ? "text-green-400" : "text-red-400"}`}>
                {hasPassed ? "✓ You cleared the pass mark of " : "✗ Pass mark is "}{currentModule.passMark}%
              </p>

              {!hasPassed && (
                <p className="mb-8 text-sm text-foreground/60">
                  Don't worry — you can retake the entire quiz from the beginning to qualify for a scholarship.
                </p>
              )}

              <div className="flex items-center justify-center gap-4">
                {!hasPassed && (
                  <MagneticButton size="lg" variant="secondary" onClick={() => { setModuleIndex(0); setModuleScores([]); setPhase("module-intro") }}>
                    Restart Quiz
                  </MagneticButton>
                )}
                <MagneticButton size="lg" variant="primary" onClick={nextModule}>
                  {moduleIndex < MODULES.length - 1 ? "Next Module →" : "View Final Results"}
                </MagneticButton>
              </div>
            </div>
          )
        })()}

        {/* ── FINAL RESULTS ─────────────────────────────────────────────── */}
        {phase === "final" && (
          <div className="w-full max-w-2xl text-center">
            <div className={`mb-4 inline-block rounded-full border px-4 py-1.5 backdrop-blur-md ${allPassed ? "border-green-400/40 bg-green-400/10" : "border-red-400/40 bg-red-400/10"}`}>
              <p className={`font-mono text-xs ${allPassed ? "text-green-300" : "text-red-300"}`}>
                {allPassed ? "Scholarship Unlocked 🎓" : "Scholarship Not Qualified"}
              </p>
            </div>
            <h2 className="mb-6 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-7xl">
              {allPassed ? (
                <>You're<br /><span className="text-green-400/80">eligible</span></>
              ) : (
                <>Keep<br /><span className="text-foreground/40">learning</span></>
              )}
            </h2>
            <p className="mb-8 mx-auto max-w-md text-sm leading-relaxed text-foreground/70 md:text-base">
              {allPassed
                ? "You passed all 3 modules. Your eligibility will be verified via Zero-Knowledge Proof and the scholarship will be disbursed to your wallet on-chain."
                : `You scored ${totalCorrect}/${totalQuestions} overall. You need to pass all modules with ≥70% to qualify. Review the modules and try again.`}
            </p>

            {/* Module breakdown */}
            <div className="mb-8 grid gap-3 md:grid-cols-3">
              {MODULES.map((m, i) => {
                const s = moduleScores[i]
                const ok = s && passed(s.correct, s.total, m)
                return (
                  <div key={m.id} className={`rounded-xl border p-4 backdrop-blur-md text-left ${ok ? "border-green-400/30 bg-green-400/5" : "border-red-400/30 bg-red-400/5"}`}>
                    <p className={`font-mono text-xs mb-1 ${ok ? "text-green-400" : "text-red-400"}`}>
                      {ok ? "✓ Passed" : "✗ Failed"}
                    </p>
                    <p className="font-sans text-sm font-medium text-foreground">{m.title}</p>
                    <p className="font-mono text-xs text-foreground/50 mt-1">
                      {s ? pct(s.correct, s.total) : 0}% · {s?.correct ?? 0}/{s?.total ?? m.questions.length}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-center gap-4">
              <MagneticButton size="lg" variant="secondary" onClick={() => router.push("/")}>
                Back to Home
              </MagneticButton>
              {allPassed ? (
                <MagneticButton size="lg" variant="primary" onClick={() => alert("Wallet connection coming soon!")}>
                  Claim Scholarship
                </MagneticButton>
              ) : (
                <MagneticButton size="lg" variant="primary" onClick={() => { setModuleIndex(0); setModuleScores([]); setPhase("intro") }}>
                  Try Again
                </MagneticButton>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </main>
  )
}
