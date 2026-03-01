import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import os from "os"

// ---- Toggle this to true to skip Gemini and use hardcoded questions ----
const MOCK_MODE = true
// -----------------------------------------------------------------------

export interface QuizQuestion {
  id: number
  q: string
  options: string[]
  answer: number
  isTrap: boolean
  trapAnswer?: number
}

// File-based cache so questions survive hot reloads in dev
const CACHE_FILE = path.join(os.tmpdir(), "gradzcap-quiz-cache.json")
const CACHE_TTL_MS = 15 * 60 * 1000 // 15 minutes

interface CacheEntry {
  questions: QuizQuestion[]
  savedAt: number
}

function readCache(): QuizQuestion[] | null {
  try {
    const raw = fs.readFileSync(CACHE_FILE, "utf8")
    const entry = JSON.parse(raw) as CacheEntry
    if (Date.now() - entry.savedAt < CACHE_TTL_MS) return entry.questions
  } catch {
    /* cache miss */
  }
  return null
}

function writeCache(questions: QuizQuestion[]) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify({ questions, savedAt: Date.now() }), "utf8")
  } catch {
    /* non-fatal */
  }
}

// Per-session in-memory cache: sessionId -> { questions, ts }
// Prevents duplicate Gemini calls on refresh within the same quiz attempt
const SESSION_STORE = new Map<string, { questions: QuizQuestion[]; ts: number }>()
const SESSION_TTL_MS = 30 * 60 * 1000 // 30 min

// Per-address throttle: prevents >1 fresh Gemini call per wallet per 5 min
const ADDRESS_THROTTLE = new Map<string, number>() // address -> last-call timestamp
const THROTTLE_WINDOW_MS = 5 * 60 * 1000 // 5 min

// Per-session inflight deduplication (replaces the old single global promise)
const inflightMap = new Map<string, Promise<QuizQuestion[]>>()

// Purge stale session entries to prevent memory leaks
function pruneSessionStore() {
  const now = Date.now()
  for (const [key, val] of SESSION_STORE) {
    if (now - val.ts > SESSION_TTL_MS) SESSION_STORE.delete(key)
  }
}

// Compact, low-token prompt (~150 tokens vs the original ~450)
const SYSTEM_PROMPT = `Generate 10 blockchain/Linux MCQ for a scholarship exam. Return ONLY valid JSON, no markdown.
8 real questions (Algorand PPoS, DeFi, ZK-proofs, Linux CLI/permissions/processes) — intermediate level, 4 options (A-D), one correct answer.
2 trap questions — look plausible but have NO correct answer (contradictory premise or invented tech). Include trapAnswer (0-3) for the most convincing wrong option. Shuffle traps into random positions.
Schema: {"questions":[{"id":1,"q":"...","options":["A...","B...","C...","D..."],"answer":2,"isTrap":false},{"id":2,"q":"...","options":["A...","B...","C...","D..."],"answer":-1,"isTrap":true,"trapAnswer":1}]}`

async function callGemini(apiKey: string): Promise<QuizQuestion[]> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`
  const reqBody = JSON.stringify({
    contents: [{ parts: [{ text: SYSTEM_PROMPT }] }],
    generationConfig: { temperature: 0.9, maxOutputTokens: 1800 },
  })

  const delays = [5000, 15000, 30000]

  for (let attempt = 0; attempt <= delays.length; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: reqBody,
    })

    if (res.status === 429) {
      if (attempt >= delays.length) throw new Error("Gemini rate limit - quota exhausted after retries.")
      const retryAfter = res.headers.get("Retry-After")
      const wait = retryAfter ? parseInt(retryAfter, 10) * 1000 : delays[attempt]
      await new Promise((r) => setTimeout(r, wait))
      continue
    }

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Gemini ${res.status}: ${body}`)
    }

    const data = await res.json()
    const raw: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ""
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim()
    const parsed = JSON.parse(cleaned) as { questions: QuizQuestion[] }
    if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
      throw new Error("Gemini returned empty or malformed questions array.")
    }
    return parsed.questions
  }

  throw new Error("Unexpected retry loop exit.")
}

// 8 real questions + 2 traps (positions 4 and 8)
const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    q: "Which consensus mechanism does Algorand use to achieve immediate transaction finality?",
    options: [
      "A. Proof of Work",
      "B. Delegated Proof of Stake",
      "C. Pure Proof of Stake (PPoS)",
      "D. Proof of Authority",
    ],
    answer: 2,
    isTrap: false,
  },
  {
    id: 2,
    q: "In Linux, which command shows real-time CPU and memory usage of running processes?",
    options: ["A. ps aux", "B. top", "C. lsof", "D. netstat"],
    answer: 1,
    isTrap: false,
  },
  {
    id: 3,
    q: "What does a Zero-Knowledge Proof allow a prover to demonstrate?",
    options: [
      "A. The full contents of a secret message",
      "B. Knowledge of a value without revealing the value itself",
      "C. That a transaction is double-spent",
      "D. The private key of a wallet",
    ],
    answer: 1,
    isTrap: false,
  },
  {
    id: 4,
    q: "Which Linux permission octal value grants the owner read+write+execute, group read+execute, others read only?",
    options: ["A. 754", "B. 644", "C. 775", "D. 700"],
    answer: 0,
    isTrap: false,
  },
  {
    // TRAP 1 - unsolvable: contradictory premise
    id: 5,
    q: "In Algorand's consensus protocol, a block proposer is selected using VRF. What is the exact VRF seed value used in mainnet block 1 to ensure deterministic selection across all validator nodes simultaneously?",
    options: [
      "A. 0x0000000000000001",
      "B. SHA256 of the genesis hash XORed with the block timestamp",
      "C. The SHAKE-128 hash of the first account balance trie root",
      "D. Derived from the distributed randomness beacon seeded at genesis",
    ],
    answer: -1,
    isTrap: true,
    trapAnswer: 3,
  },
  {
    id: 6,
    q: "What is the primary purpose of an Algorand Standard Asset (ASA)?",
    options: [
      "A. To replace ALGO as the network fee token",
      "B. To represent any custom token or asset on the Algorand blockchain",
      "C. To store smart contract state on-chain",
      "D. To sign transactions without a private key",
    ],
    answer: 1,
    isTrap: false,
  },
  {
    id: 7,
    q: "In Linux, which signal number does 'kill -9' send to a process?",
    options: ["A. SIGTERM (15)", "B. SIGHUP (1)", "C. SIGKILL (9)", "D. SIGINT (2)"],
    answer: 2,
    isTrap: false,
  },
  {
    id: 8,
    q: "What problem does a blockchain smart contract's 'reentrancy attack' exploit?",
    options: [
      "A. Reading stale state from an oracle",
      "B. A contract calling itself recursively before the first execution finishes",
      "C. Overflowing a 256-bit integer in a loop",
      "D. Sending ETH to a contract with no fallback function",
    ],
    answer: 1,
    isTrap: false,
  },
  {
    // TRAP 2 - unsolvable: non-existent technology
    id: 9,
    q: "Using Algorand's built-in Quantum Entanglement Commit (QEC) extension introduced in AVM 9.1, how many qubits are required to sign a standard payment transaction?",
    options: ["A. 256 qubits", "B. 512 qubits", "C. 1024 qubits", "D. 128 qubits"],
    answer: -1,
    isTrap: true,
    trapAnswer: 0,
  },
  {
    id: 10,
    q: "In Linux, the /proc filesystem is best described as:",
    options: [
      "A. A permanent disk partition storing process logs",
      "B. A virtual filesystem exposing kernel and process information at runtime",
      "C. A swap partition for out-of-memory processes",
      "D. A FUSE mount for containerised workloads",
    ],
    answer: 1,
    isTrap: false,
  },
]

export async function POST(req: NextRequest) {
  // --- MOCK MODE: bypass Gemini entirely ---
  if (MOCK_MODE) {
    return NextResponse.json({ questions: MOCK_QUESTIONS })
  }
  // -----------------------------------------

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY not configured." }, { status: 500 })
  }

  // Parse session/address from request body
  let sessionId = ""
  let address = ""
  try {
    const body = await req.json()
    sessionId = String(body.sessionId ?? "")
    address = String(body.address ?? "")
  } catch { /* empty body is fine */ }

  pruneSessionStore()

  // 1. Session cache hit -- same quiz attempt refreshed the page
  if (sessionId) {
    const hit = SESSION_STORE.get(sessionId)
    if (hit && Date.now() - hit.ts < SESSION_TTL_MS) {
      return NextResponse.json({ questions: hit.questions, cached: true })
    }
  }

  // 2. Per-address throttle -- max 1 fresh Gemini call per wallet per 5 min
  if (address) {
    const lastCall = ADDRESS_THROTTLE.get(address) ?? 0
    const elapsed = Date.now() - lastCall
    if (elapsed < THROTTLE_WINDOW_MS) {
      const retryIn = Math.ceil((THROTTLE_WINDOW_MS - elapsed) / 1000)
      return NextResponse.json(
        { error: `Rate limited. Please wait ${retryIn}s before generating new questions.`, retryIn },
        { status: 429 }
      )
    }
  }

  // 3. Global file cache (survives hot reloads in dev)
  const fileCached = readCache()
  if (fileCached) {
    if (sessionId) SESSION_STORE.set(sessionId, { questions: fileCached, ts: Date.now() })
    return NextResponse.json({ questions: fileCached, cached: true })
  }

  // 4. Call Gemini -- deduplicated per sessionId so concurrent requests share one inflight
  const inflightKey = sessionId || "global"
  if (!inflightMap.has(inflightKey)) {
    const promise = callGemini(apiKey)
      .then((questions) => { writeCache(questions); return questions })
      .finally(() => inflightMap.delete(inflightKey))
    inflightMap.set(inflightKey, promise)
  }

  try {
    const questions = await inflightMap.get(inflightKey)!
    if (sessionId) SESSION_STORE.set(sessionId, { questions, ts: Date.now() })
    if (address) ADDRESS_THROTTLE.set(address, Date.now())
    return NextResponse.json({ questions })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: msg }, { status: 502 })
  }
}
