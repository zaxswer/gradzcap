"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useWallet } from "@txnlab/use-wallet-react"
import { useRouter } from "next/navigation"
import algosdk from "algosdk"
import type { QuizQuestion } from "@/app/api/quiz/generate/route"
import type { ExamReceipt } from "@/lib/algorand/certificate"

const QUESTION_TIME = 60
const MIN_EXAM_TIME = 300
const STAKE_AMOUNT = 900
const MAX_CHEATS = 3
const PASS_SCORE = 80

type Phase = "loading" | "error" | "stake" | "confirm" | "exam" | "result"

interface ExamResult {
  score: number
  passed: boolean
  reasons: string[]
  cheatCount: number
  totalTime: number
  trapFailed: boolean
  tooFast: boolean
}

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, "0")}`
}

function pct(n: number, total: number) {
  return Math.round((n / total) * 100)
}

export default function QuizPage() {
  const router = useRouter()
  const { activeAddress, signTransactions } = useWallet()

  const [phase, setPhase] = useState<Phase>("stake")
  const [errorMsg, setErrorMsg] = useState("")
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [lockQuestion, setLockQuestion] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME)
  const [cheatCount, setCheatCount] = useState(0)
  const [result, setResult] = useState<ExamResult | null>(null)
  const [cheatWarning, setCheatWarning] = useState(false)
  const [staking, setStaking] = useState(false)
  const [examReceipt, setExamReceipt] = useState<ExamReceipt | null>(null)
  const [claimStatus, setClaimStatus] = useState<"idle" | "opting-in" | "claiming" | "claimed" | "error">("idle")
  const [claimError, setClaimError] = useState("")
  const [receiptTxId, setReceiptTxId] = useState<string | null>(null)
  const [receiptStatus, setReceiptStatus] = useState<"idle" | "signing" | "done" | "error">("idle")
  const [receiptError, setReceiptError] = useState("")

  const answersRef = useRef<(number | null)[]>([])
  const cheatCountRef = useRef(0)
  const questionsRef = useRef<QuizQuestion[]>([])
  const currentQRef = useRef(0)
  const startTimeRef = useRef(0)
  const finishingRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const phaseRef = useRef<Phase>("stake")
  const sessionIdRef = useRef<string>("")

  useEffect(() => { phaseRef.current = phase }, [phase])

  // Load questions -- sessionId scopes the server-side cache to one quiz attempt
  const loadQuestions = useCallback(async (sessionId: string) => {
    setPhase("loading")
    setErrorMsg("")
    finishingRef.current = false
    try {
      const res = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, address: activeAddress ?? undefined }),
      })
      const data = await res.json()
      if (!res.ok || !data.questions) throw new Error(data.error ?? "Failed to load questions")
      setQuestions(data.questions)
      questionsRef.current = data.questions
      setPhase("confirm")
    } catch (e) {
      setErrorMsg(String(e))
      setPhase("error")
    }
  }, [activeAddress])

  // Grade and finish exam
  const finishExam = useCallback(async (finalAnswers: (number | null)[], cheats: number) => {
    if (finishingRef.current) return
    finishingRef.current = true
    if (timerRef.current) clearInterval(timerRef.current)
    try { if (document.fullscreenElement) await document.exitFullscreen() } catch { /* ok */ }

    const qs = questionsRef.current
    const totalTime = Math.floor((Date.now() - startTimeRef.current) / 1000)

    let correct = 0
    let trapFailed = false

    qs.forEach((q, i) => {
      const userAns = finalAnswers[i]
      if (q.isTrap) {
        if (userAns === q.trapAnswer) trapFailed = true
      } else {
        if (userAns === q.answer) correct++
      }
    })

    const realQCount = qs.filter((q) => !q.isTrap).length
    const score = pct(correct, realQCount)
    const tooFast = totalTime < MIN_EXAM_TIME
    const reasons: string[] = []

    if (trapFailed) reasons.push("You answered an unsolvable question -- AI/pattern behaviour detected.")
    if (tooFast) reasons.push(`Exam completed in ${fmt(totalTime)} -- minimum ${fmt(MIN_EXAM_TIME)} required.`)
    if (cheats >= MAX_CHEATS) reasons.push("Exited fullscreen 3 times -- integrity violated. 50% stake slashed on-chain.")
    if (score < PASS_SCORE && !trapFailed) reasons.push(`Score ${score}% is below the 80% pass mark.`)

    const passed = score >= PASS_SCORE && !trapFailed && !tooFast && cheats < MAX_CHEATS
    setResult({ score, passed, reasons, cheatCount: cheats, totalTime, trapFailed, tooFast })
    setPhase("result")

    if (activeAddress) {
      fetch("/api/quiz/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student: activeAddress, marks: passed ? score : 0 }),
      })
        .then((r) => r.json())
        .then((data) => { if (data.receipt) setExamReceipt(data.receipt) })
        .catch(() => { /* non-fatal */ })
    }
  }, [activeAddress])

  // Fullscreen enforcement
  const handleFullscreenChange = useCallback(() => {
    if (phaseRef.current !== "exam") return
    if (!document.fullscreenElement) {
      const newCount = cheatCountRef.current + 1
      cheatCountRef.current = newCount
      setCheatCount(newCount)
      setCheatWarning(true)

      if (activeAddress) {
        fetch("/api/quiz/cheat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ student: activeAddress }),
        }).catch(() => {})
      }

      if (newCount >= MAX_CHEATS) {
        finishExam(answersRef.current, newCount)
      }
      // Warning stays visible until user clicks the button below (browser requires
      // a direct user gesture to call requestFullscreen).
    }
  }, [activeAddress, finishExam])

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [handleFullscreenChange])

  // Must be called from a click handler so the browser allows fullscreen
  const returnToFullscreen = useCallback(async () => {
    try {
      await document.documentElement.requestFullscreen()
    } catch { /* user may have denied */ }
    setCheatWarning(false)
  }, [])

  // Advance to the next question
  const advanceQuestion = useCallback((forcedAnswer?: number | null) => {
    const ans = forcedAnswer !== undefined ? forcedAnswer : selected
    const nextAnswers = [...answersRef.current]
    nextAnswers[currentQRef.current] = ans ?? null
    answersRef.current = nextAnswers
    setAnswers([...nextAnswers])
    setLockQuestion(true)
    setSelected(null)

    setTimeout(() => {
      const nextIdx = currentQRef.current + 1
      if (nextIdx >= questionsRef.current.length) {
        finishExam(answersRef.current, cheatCountRef.current)
      } else {
        currentQRef.current = nextIdx
        setCurrentQ(nextIdx)
        setTimeLeft(QUESTION_TIME)
        setLockQuestion(false)
      }
    }, 300)
  }, [selected, finishExam])

  // Per-question countdown timer
  useEffect(() => {
    if (phase !== "exam") return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          advanceQuestion(null)
          return QUESTION_TIME
        }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentQ])

  // Enter fullscreen and start exam
  const startExam = useCallback(async () => {
    answersRef.current = []
    cheatCountRef.current = 0
    currentQRef.current = 0
    finishingRef.current = false
    setAnswers([])
    setCheatCount(0)
    setCurrentQ(0)
    setSelected(null)
    setLockQuestion(false)
    setTimeLeft(QUESTION_TIME)
    startTimeRef.current = Date.now()
    setPhase("exam")
    try { await document.documentElement.requestFullscreen() } catch { /* ok */ }
  }, [])

  // Simulate stake then load questions -- fresh UUID per attempt prevents duplicate Gemini calls
  const handleStake = useCallback(async () => {
    if (!activeAddress) return
    setStaking(true)
    sessionIdRef.current = crypto.randomUUID()
    await new Promise((r) => setTimeout(r, 1200))
    await loadQuestions(sessionIdRef.current)
  }, [activeAddress, loadQuestions])

  const ALGOD_API = "https://testnet-api.4160.nodely.dev"

  const handleSignReceipt = useCallback(async () => {
    if (!activeAddress || !examReceipt || !signTransactions) return
    setReceiptStatus("signing")
    setReceiptError("")
    try {
      const algod = new algosdk.Algodv2("", ALGOD_API, 443)
      const sp = await algod.getTransactionParams().do()
      // Zero-ALGO self-payment — the note is the immutable on-chain receipt
      const note = new TextEncoder().encode(
        `GZCERT-RECEIPT|certId:${examReceipt.certId}` +
        `|nft:${examReceipt.nftAssetId}` +
        `|scholarship:${examReceipt.scholarshipTxId ?? "none"}` +
        `|score:${examReceipt.score}%` +
        `|ts:${examReceipt.timestamp}`
      )
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        sender: activeAddress,
        receiver: activeAddress,
        amount: 0,
        note,
        suggestedParams: sp,
      })
      const encoded = algosdk.encodeUnsignedTransaction(txn)
      const signed = await signTransactions([[encoded]])
      const signedTxn = signed[0]
      if (!signedTxn) throw new Error("Wallet rejected")
      await algod.sendRawTransaction(signedTxn).do()
      await algosdk.waitForConfirmation(algod, txn.txID(), 4)
      setReceiptTxId(txn.txID())
      setReceiptStatus("done")
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      setReceiptError(msg.toLowerCase().includes("reject") ? "Rejected in wallet." : msg)
      setReceiptStatus("error")
    }
  }, [activeAddress, examReceipt, signTransactions])

  const handleClaimCert = useCallback(async () => {
    if (!activeAddress || !examReceipt || !signTransactions) return
    setClaimStatus("opting-in")
    setClaimError("")
    try {
      const algod = new algosdk.Algodv2("", ALGOD_API, 443)
      const sp = await algod.getTransactionParams().do()
      const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        sender: activeAddress,
        receiver: activeAddress,
        assetIndex: examReceipt.nftAssetId,
        amount: 0,
        suggestedParams: sp,
      })
      const encoded = algosdk.encodeUnsignedTransaction(optInTxn)
      const signed = await signTransactions([[encoded]])
      const signedTxn = signed[0]
      if (!signedTxn) throw new Error("Wallet rejected opt-in")
      await algod.sendRawTransaction(signedTxn).do()
      await algosdk.waitForConfirmation(algod, optInTxn.txID(), 4)
      setClaimStatus("claiming")
      const res = await fetch("/api/quiz/claim-cert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student: activeAddress, nftAssetId: examReceipt.nftAssetId }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error ?? "Claim failed")
      }
      setClaimStatus("claimed")
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      setClaimError(msg.toLowerCase().includes("reject") ? "Rejected in wallet." : msg)
      setClaimStatus("error")
    }
  }, [activeAddress, examReceipt, signTransactions])

  const timerPct = (timeLeft / QUESTION_TIME) * 100
  const timerColor = timeLeft > 20 ? "#3b82f6" : timeLeft > 10 ? "#f59e0b" : "#ef4444"

  // LOADING
  if (phase === "loading") return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-white">
      <svg className="h-14 w-14 animate-spin" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="80 40" />
      </svg>
      <p className="font-mono text-sm text-white/40">Generating your exam via AI...</p>
    </div>
  )

  // ERROR
  if (phase === "error") return (
    <div className="flex min-h-screen items-center justify-center bg-black p-8 text-white">
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center max-w-md w-full">
        <p className="font-mono text-sm text-red-400 mb-5">{errorMsg}</p>
        <button onClick={() => {
          // Fresh session ID so the retry isn't served from the previous failed cache
          sessionIdRef.current = crypto.randomUUID()
          loadQuestions(sessionIdRef.current)
        }} className="rounded-full bg-blue-600 px-6 py-2 font-sans text-sm text-white hover:bg-blue-500 transition-colors">
          Retry
        </button>
      </div>
    </div>
  )

  // STAKE
  if (phase === "stake") return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-6 text-center">
          <span className="inline-block rounded-full bg-blue-600/20 px-4 py-1.5 font-mono text-xs text-blue-400 uppercase tracking-widest mb-3">
            Stake Required
          </span>
          <h1 className="text-2xl font-light">Before You Begin</h1>
        </div>
        <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-white/40">Required Stake</span>
            <span className="font-sans text-xl font-semibold text-blue-400">{STAKE_AMOUNT} GZC</span>
          </div>
          <ul className="space-y-2 font-sans text-xs text-white/60">
            <li className="flex items-start gap-2"><span className="text-blue-400">-&gt;</span>Stake held during exam; returned on pass</li>
            <li className="flex items-start gap-2"><span className="text-blue-400">-&gt;</span>Pass 80%+ with zero cheats to unlock scholarship</li>
            <li className="flex items-start gap-2"><span className="text-amber-400">!</span>Exit fullscreen 3x = 50% stake slashed on-chain</li>
            <li className="flex items-start gap-2"><span className="text-red-400">x</span>AI/bot pattern detected = immediate disqualification</li>
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center mb-5">
          <p className="font-sans text-xs text-white/50">
            10 AI-generated questions &middot; 1 min each &middot; Min 5 min total
            <br />Contains 2 unsolvable questions -- recognise them
          </p>
        </div>
        {!activeAddress ? (
          <p className="text-center font-mono text-xs text-amber-400 py-2">Connect your wallet to proceed</p>
        ) : (
          <button
            onClick={handleStake}
            disabled={staking}
            className="w-full rounded-xl bg-blue-600 py-3 font-sans text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
          >
            {staking ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
                Staking {STAKE_AMOUNT} GZC...
              </span>
            ) : `Stake ${STAKE_AMOUNT} GZC & Continue`}
          </button>
        )}
        <button
          onClick={() => router.push("/")}
          className="mt-3 w-full rounded-xl border border-white/10 py-2.5 font-sans text-sm text-white/40 hover:text-white transition-colors"
        >
          &larr; Home
        </button>
      </div>
    </div>
  )

  // CONFIRM
  if (phase === "confirm") return (
    <div className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8">
        <div className="mb-6 text-center">
          <div className="mb-3 text-4xl">!</div>
          <h1 className="text-xl font-semibold text-amber-400">Final Confirmation</h1>
          <p className="mt-1 font-sans text-sm text-white/50">Read carefully before starting the exam</p>
        </div>
        <ul className="mb-7 space-y-3">
          {[
            "Exam enters fullscreen immediately on start",
            "Exiting fullscreen = 1 cheat violation (max 3)",
            "3 violations: exam terminated + 50% stake slashed",
            "You must spend at least 5 minutes total",
            "2 questions have no correct answer -- leave them blank or pick wrong intentionally",
            "Answering an unsolvable question correctly = instant fail",
            "Required: score 80%+ AND zero cheat violations",
          ].map((r, i) => (
            <li key={i} className="flex items-start gap-3 font-sans text-sm text-white/70">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                {i + 1}
              </span>
              {r}
            </li>
          ))}
        </ul>
        <button
          onClick={startExam}
          className="w-full rounded-xl bg-blue-600 py-3 font-sans text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          I Understand -- Start Exam
        </button>
        <button
          onClick={() => setPhase("stake")}
          className="mt-3 w-full rounded-xl border border-white/10 py-2.5 font-sans text-sm text-white/40 hover:text-white transition-colors"
        >
          &larr; Back
        </button>
      </div>
    </div>
  )

  // EXAM
  if (phase === "exam") {
    const q = questions[currentQ]
    if (!q) return null
    return (
      <div className="relative flex min-h-screen flex-col bg-[#080808] text-white select-none">
        {/* Cheat violation overlay */}
        {cheatWarning && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-10 text-center">
              <div className="mb-3 text-5xl">!</div>
              <h2 className="text-xl font-bold text-red-400 mb-2">Fullscreen Exited!</h2>
              <p className="font-sans text-sm text-white/60 mb-1">
                Violation <span className="font-bold text-red-400">{cheatCount}</span> of {MAX_CHEATS}
              </p>
              {cheatCount < MAX_CHEATS ? (
                <button
                  onClick={returnToFullscreen}
                  className="mt-5 rounded-xl bg-red-600 px-6 py-2.5 font-sans text-sm font-semibold text-white hover:bg-red-500 transition-colors"
                >
                  Return to Fullscreen
                </button>
              ) : (
                <p className="font-mono text-xs text-white/30 mt-3">Exam terminated. Stake slashed.</p>
              )}
            </div>
          </div>
        )}

        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/5 px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">GradZCap</span>
            <span className="rounded-full bg-white/10 px-3 py-0.5 font-mono text-xs">
              {currentQ + 1}/{questions.length}
            </span>
          </div>

          {/* Violation indicators */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: MAX_CHEATS }).map((_, i) => (
              <div key={i} className={`h-2.5 w-2.5 rounded-full ${i < cheatCount ? "bg-red-500" : "bg-white/15"}`} />
            ))}
            <span className="ml-1 font-mono text-[10px] text-white/25">violations</span>
          </div>

          {/* Countdown ring */}
          <div className="flex items-center gap-2">
            <svg className="h-11 w-11 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2.5" />
              <circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke={timerColor} strokeWidth="2.5"
                strokeDasharray={`${timerPct} 100`}
                style={{ transition: "stroke-dasharray 1s linear, stroke 0.5s" }}
              />
            </svg>
            <span className="font-mono text-lg tabular-nums w-12" style={{ color: timerColor }}>
              {fmt(timeLeft)}
            </span>
          </div>
        </header>

        {/* Progress bar */}
        <div className="h-0.5 bg-white/5">
          <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${pct(currentQ + 1, questions.length)}%` }} />
        </div>

        {/* Question */}
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-10">
          <div className="w-full max-w-2xl">
            <p className="mb-3 font-mono text-xs text-white/25 uppercase tracking-widest">Question {currentQ + 1}</p>
            <h2 className="mb-8 font-sans text-xl font-light leading-relaxed text-white/90">{q.q}</h2>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => { if (!lockQuestion) setSelected(i) }}
                  disabled={lockQuestion}
                  className={`w-full rounded-xl border px-5 py-4 text-left font-sans text-sm transition-all duration-150 ${
                    selected === i
                      ? "border-blue-500 bg-blue-500/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:text-white"
                  } disabled:cursor-default`}
                >
                  <span className="mr-3 font-mono text-xs text-white/25">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex items-center justify-between border-t border-white/5 px-6 py-4">
          <p className="font-mono text-xs text-white/20">Do not exit fullscreen</p>
          <button
            onClick={() => advanceQuestion(selected)}
            disabled={lockQuestion}
            className={`rounded-full px-6 py-2.5 font-sans text-sm font-medium transition-colors ${
              selected !== null ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-white/10 text-white/30 cursor-default"
            }`}
          >
            {currentQ < questions.length - 1 ? "Next" : "Submit"}
          </button>
        </footer>
      </div>
    )
  }

  // RESULT
  if (phase === "result" && result) {
    const realQs = questions.filter((q) => !q.isTrap)
    const correct = realQs.filter((q) => answers[questions.indexOf(q)] === q.answer).length
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white">
        <div className="w-full max-w-lg">
          <div className={`rounded-2xl border p-8 mb-4 text-center ${result.passed ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"}`}>
            <h1 className={`text-3xl font-light mb-1 ${result.passed ? "text-emerald-400" : "text-red-400"}`}>
              {result.passed ? "Scholarship Granted" : "Exam Failed"}
            </h1>
            <p className="font-mono text-xs text-white/30 mb-6">
              Completed in {fmt(result.totalTime)} &middot; {result.cheatCount} violation{result.cheatCount !== 1 ? "s" : ""}
            </p>

            {/* Score ring */}
            <div className="flex justify-center mb-6">
              <div className="relative h-32 w-32">
                <svg className="-rotate-90 h-full w-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke={result.passed ? "#10b981" : "#ef4444"} strokeWidth="3"
                    strokeDasharray={`${result.score} 100`} strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-light">{result.score}%</span>
                  <span className="font-mono text-[10px] text-white/30">{correct}/{realQs.length} correct</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: "Score", value: `${result.score}%`, ok: result.score >= PASS_SCORE },
                { label: "Time", value: fmt(result.totalTime), ok: !result.tooFast },
                { label: "Integrity", value: `${result.cheatCount} cheat${result.cheatCount !== 1 ? "s" : ""}`, ok: result.cheatCount === 0 },
              ].map(({ label, value, ok }) => (
                <div key={label} className={`rounded-xl border p-3 ${ok ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"}`}>
                  <p className="font-mono text-[10px] text-white/30 uppercase mb-1">{label}</p>
                  <p className={`font-sans text-sm font-medium ${ok ? "text-emerald-400" : "text-red-400"}`}>{value}</p>
                </div>
              ))}
            </div>

            {result.reasons.length > 0 && (
              <ul className="space-y-2 text-left">
                {result.reasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-xs text-white/60">
                    <span className="text-red-400 mt-0.5 shrink-0">x</span>{r}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {result.passed && examReceipt && (
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 mb-4">
              <p className="font-mono text-xs text-blue-400 uppercase tracking-widest mb-3 text-center">
                NFT Certificate Minted On-Chain
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white/40">Cert ID</span>
                  <span className="font-mono text-xs text-white/80">{examReceipt.certId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white/40">NFT Asset</span>
                  <a
                    href={`https://testnet.explorer.perawallet.app/assets/${examReceipt.nftAssetId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-blue-400 hover:underline"
                  >
                    #{examReceipt.nftAssetId}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white/40">Meta Hash</span>
                  <span className="font-mono text-xs text-white/50 truncate max-w-[180px]">{examReceipt.metaHash.slice(0, 16)}...</span>
                </div>
                {examReceipt.scholarshipTxId && (
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white/40">Scholarship Tx</span>
                    <a
                      href={`https://testnet.explorer.perawallet.app/tx/${examReceipt.scholarshipTxId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-emerald-400 hover:underline"
                    >
                      view &rarr;
                    </a>
                  </div>
                )}
                {receiptTxId ? (
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white/40">Your Receipt Tx</span>
                    <a
                      href={`https://testnet.explorer.perawallet.app/tx/${receiptTxId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-emerald-400 hover:underline"
                    >
                      {receiptTxId.slice(0, 10)}... &rarr;
                    </a>
                  </div>
                ) : examReceipt.scholarshipTxId && (
                  <div className="pt-1">
                    <button
                      onClick={handleSignReceipt}
                      disabled={receiptStatus === "signing"}
                      className="w-full rounded-lg border border-emerald-500/30 bg-emerald-500/10 py-2 font-sans text-xs font-medium text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-50 transition-colors"
                    >
                      {receiptStatus === "signing" ? "Waiting for wallet..." : "Sign Scholarship Receipt"}
                    </button>
                    {receiptStatus === "error" && (
                      <p className="mt-1.5 text-center font-sans text-xs text-red-400">{receiptError}</p>
                    )}
                  </div>
                )}
              </div>
              {examReceipt.nftClaimed ? (
                <p className="text-center font-mono text-xs text-emerald-400">NFT delivered to your wallet</p>
              ) : claimStatus === "claimed" ? (
                <p className="text-center font-mono text-xs text-emerald-400">NFT claimed successfully!</p>
              ) : (
                <>
                  <button
                    onClick={handleClaimCert}
                    disabled={claimStatus === "opting-in" || claimStatus === "claiming"}
                    className="w-full rounded-xl bg-blue-600 py-2.5 font-sans text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
                  >
                    {claimStatus === "opting-in" ? "Approving opt-in..." : claimStatus === "claiming" ? "Transferring NFT..." : "Claim NFT Certificate"}
                  </button>
                  {claimStatus === "error" && (
                    <p className="mt-2 text-center font-sans text-xs text-red-400">{claimError}</p>
                  )}
                </>
              )}
            </div>
          )}
          {result.passed && !examReceipt && (
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 mb-4 text-center">
              <p className="font-mono text-xs text-blue-400 uppercase tracking-widest mb-1">On-Chain Verification</p>
              <p className="font-sans text-sm text-white/60">
                Scholarship disbursed to your connected wallet.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            {!result.passed && (
              <button
                onClick={() => setPhase("stake")}
                className="flex-1 rounded-xl bg-blue-600 py-3 font-sans text-sm font-medium text-white hover:bg-blue-500 transition-colors"
              >
                Try Again
              </button>
            )}
            <button
              onClick={() => router.push("/")}
              className="flex-1 rounded-xl border border-white/10 py-3 font-sans text-sm text-white/50 hover:text-white transition-colors"
            >
              &larr; Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}