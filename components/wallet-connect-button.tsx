"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useWallet } from "@txnlab/use-wallet-react"
import algosdk from "algosdk"

const ALGOD_SERVER = "https://testnet-api.algonode.cloud"
const ALGOD_TOKEN = ""
const ALGOD_PORT = 443
const GZC_ASA_ID = Number(process.env.NEXT_PUBLIC_GZC_ASA_ID) || 756356387

function truncate(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

function formatGZC(microGZC: number) {
  return (microGZC / 1_000_000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function WalletConnectButton() {
  const { wallets, activeAddress, isReady, signTransactions } = useWallet()
  const [open, setOpen] = useState(false)
  const [showWallets, setShowWallets] = useState(false)
  const [gzcBalance, setGzcBalance] = useState<number | null>(null)
  const [algoBalance, setAlgoBalance] = useState<number | null>(null)
  const [isOptedIn, setIsOptedIn] = useState(false)
  const [loadingBalance, setLoadingBalance] = useState(false)
  const [resuming, setResuming] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isReady) setResuming(false)
  }, [isReady])

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setShowWallets(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const fetchBalance = useCallback(async (address: string) => {
    setLoadingBalance(true)
    try {
      const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)
      
      // Check network genesis hash to ensure it's TestNet
      const params = await algod.getTransactionParams().do()
      const TESTNET_GENESIS_HASH = "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI="
      
      // params.genesisHash is a Uint8Array, convert to base64 string for comparison
      const actualHash = Buffer.from(params.genesisHash).toString("base64")
      
      if (actualHash !== TESTNET_GENESIS_HASH) {
        console.error("Not connected to TestNet")
        return
      }

      const info = await algod.accountInformation(address).do()
      setAlgoBalance(Number(info.amount))

      const assets = (info.assets ?? []) as Array<{ assetId: bigint | number; amount: bigint | number }>
      const gzcHolding = assets.find((a) => Number(a.assetId) === GZC_ASA_ID)
      if (gzcHolding) {
        setIsOptedIn(true)
        setGzcBalance(Number(gzcHolding.amount))
      } else {
        setIsOptedIn(false)
        setGzcBalance(null)
      }
    } catch (e) {
      console.error("Balance fetch error:", e)
      setGzcBalance(null)
    } finally {
      setLoadingBalance(false)
    }
  }, [])

  useEffect(() => {
    if (activeAddress && open) fetchBalance(activeAddress)
  }, [activeAddress, open, fetchBalance])

  // Check opt-in status as soon as wallet connects
  useEffect(() => {
    if (activeAddress) fetchBalance(activeAddress)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAddress])

  // Re-fetch when staking or other components change the balance
  useEffect(() => {
    const handler = () => { if (activeAddress) fetchBalance(activeAddress) }
    window.addEventListener("gzc-balance-changed", handler)
    return () => window.removeEventListener("gzc-balance-changed", handler)
  }, [activeAddress, fetchBalance])

  const activeWallet = wallets.find((w) => w.isActive)

  const handleDisconnect = async () => {
    if (activeWallet) await activeWallet.disconnect()
    setOpen(false)
    setGzcBalance(null)
    setIsOptedIn(false)
  }

  const handleConnect = async (walletId: string) => {
    const wallet = wallets.find((w) => w.id === walletId)
    if (wallet) await wallet.connect()
    setShowWallets(false)
  }

  if (activeAddress) {
    const explorerBase = `https://testnet.algoexplorer.io/address/${activeAddress}`

    const menuItems = [
      {
        label: "Get GZC (Testnet Faucet)",
        href: "https://bank.testnet.algorand.network/",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        ),
      },
      {
        label: "Activity",
        href: explorerBase,
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        label: "View on Explorer",
        href: `https://testnet.explorer.perawallet.app/address/${activeAddress}`,
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        ),
      },
    ]

    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 font-mono text-xs text-foreground backdrop-blur-md transition-colors hover:bg-foreground/20"
        >
          <span className={`h-1.5 w-1.5 rounded-full ${isOptedIn ? "bg-emerald-400" : "bg-amber-400"}`} />
          {truncate(activeAddress)}
          <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 z-[100] w-64 rounded-2xl border border-foreground/10 bg-[#111] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/10">
              <div className="flex items-center gap-2">
                {activeWallet?.metadata.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={activeWallet.metadata.icon} alt={activeWallet.metadata.name} className="h-5 w-5 rounded-sm" />
                ) : (
                  <span className="h-5 w-5 rounded-full bg-foreground/20" />
                )}
                <span className="font-sans text-xs text-foreground/50">{activeWallet?.metadata.name ?? "Wallet"}</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-foreground/40 hover:text-foreground transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Avatar + GZC balance */}
            <div className="flex flex-col items-center gap-1 px-4 py-5">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 mb-1 shadow-lg" />
              <p className="font-mono text-xs text-foreground/50">{truncate(activeAddress)}</p>
              <p className="font-sans text-3xl font-light text-foreground mt-1">
                {loadingBalance ? (
                  <span className="text-lg text-foreground/30 animate-pulse">loading...</span>
                ) : isOptedIn && gzcBalance !== null ? (
                  <>{formatGZC(gzcBalance)} <span className="text-lg text-foreground/50">GZC</span></>
                ) : (
                  <span className="text-sm text-foreground/50">No GZC Balance</span>
                )}
              </p>
            </div>

            <div className="border-t border-foreground/10">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 text-foreground/80 hover:bg-foreground/5 transition-colors"
                >
                  <span className="text-foreground/50">{item.icon}</span>
                  <span className="font-sans text-sm">{item.label}</span>
                  <svg className="h-3.5 w-3.5 ml-auto text-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>

            <div className="border-t border-foreground/10">
              <button
                onClick={handleDisconnect}
                className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-sans text-sm">Disconnect</span>
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (resuming) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 font-sans text-sm text-foreground/50 backdrop-blur-md">
        <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        Connecting...
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setShowWallets((v) => !v)}
        className="rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 font-sans text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-foreground/20"
      >
        Connect Wallet
      </button>

      {showWallets && (
        <div className="absolute right-0 top-full mt-2 z-[100] w-52 rounded-xl border border-foreground/15 bg-black/80 p-2 shadow-xl backdrop-blur-xl">
          <p className="px-2 py-1 font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
            Select wallet
          </p>
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => handleConnect(wallet.id)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left font-sans text-sm text-foreground/80 transition-colors hover:bg-foreground/10"
            >
              {wallet.metadata.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={wallet.metadata.icon} alt={wallet.metadata.name} className="h-5 w-5 rounded-sm" />
              )}
              {wallet.metadata.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}