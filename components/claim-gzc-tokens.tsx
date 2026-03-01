"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@txnlab/use-wallet-react"
import algosdk from "algosdk"

const ALGOD_SERVER = process.env.NEXT_PUBLIC_ALGOD_SERVER || "https://testnet-api.algonode.cloud"
const ALGOD_PORT = 443
const ALGOD_TOKEN = ""
const GZC_ASA_ID = Number(process.env.NEXT_PUBLIC_GZC_ASA_ID)

export function ClaimGzcTokens() {
  const { activeAddress, signTransactions, wallets } = useWallet()

  // Wrapper: if signTransactions fails with "not been authorized", reconnect and retry
  const signWithRetry = async (txns: Uint8Array[]) => {
    try {
      return await signTransactions(txns)
    } catch (err: any) {
      if (err?.message?.includes("not been authorized")) {
        const wallet = wallets.find((w: any) => w.isActive) || wallets.find((w: any) => w.isConnected)
        if (wallet) {
          await wallet.connect()
          return await signTransactions(txns)
        }
      }
      throw err
    }
  }
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [gzcBalance, setGzcBalance] = useState<number | null>(null)
  const [step, setStep] = useState<"idle" | "opt-in" | "buying">("idle")

  useEffect(() => {
    if (activeAddress) {
      checkBalance()
    } else {
      setGzcBalance(null)
      setMessage("")
    }
  }, [activeAddress])

  const checkBalance = async () => {
    if (!activeAddress) return
    try {
      const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)
      const info = await algod.accountInformation(activeAddress).do()
      const gzc = info.assets?.find((a: any) => Number(a["asset-id"]) === GZC_ASA_ID)
      setGzcBalance(gzc ? Number(gzc.amount) / 1_000_000 : null)
    } catch {
      setGzcBalance(null)
    }
  }

  /** Opt user into GZC ASA */
  const optInToGzc = async (): Promise<void> => {
    if (!activeAddress) throw new Error("No wallet connected")

    const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)
    const info = await algod.accountInformation(activeAddress).do()
    const alreadyOptedIn = info.assets?.some((a: any) => Number(a["asset-id"]) === GZC_ASA_ID)
    if (alreadyOptedIn) return

    setStep("opt-in")
    setMessage("Sign the opt-in transaction in your wallet...")

    const sp = await algod.getTransactionParams().do()
    const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      sender: activeAddress,
      receiver: activeAddress,
      assetIndex: GZC_ASA_ID,
      amount: 0,
      suggestedParams: sp,
    })

    const encoded = algosdk.encodeUnsignedTransaction(optInTxn)
    const signed = await signWithRetry([encoded])
    if (!signed || !signed[0]) throw new Error("Opt-in transaction was rejected")

    await algod.sendRawTransaction(signed[0]).do()
    await algosdk.waitForConfirmation(algod, optInTxn.txID(), 4)
    setMessage("Opted in to GZC!")
  }

  /** Buy GZC with 1 ALGO via GZCToken contract */
  const handleBuyGzc = async () => {
    if (!activeAddress) {
      setMessage("Please connect your wallet first.")
      return
    }
    setLoading(true)
    setMessage("")
    try {
      await optInToGzc()

      setStep("buying")
      setMessage("Building buy transaction...")

      const res = await fetch("/api/buy-gzc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAddress: activeAddress, algoAmount: 10_000 }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to build transaction")

      setMessage("Sign the transaction in your wallet...")
      const txnBytes = data.unsignedTxns.map(
        (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
      )

      const signed = await signWithRetry(txnBytes)
      if (!signed || signed.length < 2 || !signed[0] || !signed[1]) {
        throw new Error("Transaction was rejected by wallet")
      }

      setMessage("Submitting transaction...")
      const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)
      const { txid } = await algod.sendRawTransaction([signed[0], signed[1]]).do()
      await algosdk.waitForConfirmation(algod, txid, 4)

      setMessage(`Success! Bought 10,000 GZC for 0.01 ALGO. Tx: ${txid.substring(0, 8)}...`)
      await checkBalance()
    } catch (err: any) {
      console.error("Buy error:", err)
      const msg = err.message || ""
      if (msg.includes("rejected")) {
        setMessage("Transaction rejected by wallet.")
      } else if (msg.includes("overspend") || msg.includes("InsufficientFunds")) {
        setMessage("Not enough ALGO. Get testnet ALGO from the faucet first.")
      } else {
        setMessage(`Error: ${msg}`)
      }
    } finally {
      setLoading(false)
      setStep("idle")
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 border border-foreground/10 rounded-2xl bg-foreground/5 backdrop-blur-sm w-full max-w-sm">
      <div className="text-center">
        <h3 className="font-sans text-lg font-bold">Get GZC Tokens</h3>
        <p className="font-mono text-[10px] text-foreground/50">
          Buy GZC with ALGO — no GZC needed to start
        </p>
      </div>

      {activeAddress && gzcBalance !== null && (
        <p className="font-mono text-xs text-foreground/70">
          Balance: <span className="font-bold text-emerald-400">{gzcBalance.toLocaleString()}</span> GZC
        </p>
      )}

      <div className="flex flex-col items-center gap-3 w-full">
        <p className="font-mono text-[10px] text-foreground/40 text-center">
          Buy <span className="text-blue-400 font-bold">10,000 GZC</span> for{" "}
          <span className="text-blue-400 font-bold">0.01 ALGO</span>
        </p>
        <p className="font-mono text-[9px] text-foreground/30 text-center">
          Need testnet ALGO?{" "}
          <a
            href="https://bank.testnet.algorand.network/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400 hover:text-blue-300"
          >
            Get from Algorand faucet →
          </a>
        </p>
        <button
          onClick={handleBuyGzc}
          disabled={loading || !activeAddress}
          className="w-full rounded-full bg-blue-500 px-6 py-2 font-sans text-sm font-bold text-black transition-all hover:bg-blue-400 disabled:opacity-50 active:scale-95"
        >
          {loading
            ? step === "opt-in" ? "Opting in..." : step === "buying" ? "Buying..." : "Processing..."
            : "Buy 10,000 GZC"}
        </button>
      </div>

      {message && (
        <p
          className={`font-mono text-[10px] text-center ${
            message.startsWith("Error") || message.includes("rejected") || message.includes("Not enough")
              ? "text-red-400"
              : message.startsWith("Success")
                ? "text-emerald-400"
                : "text-foreground/60"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  )
}
