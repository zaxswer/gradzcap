"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useWallet } from "@txnlab/use-wallet-react"
import algosdk from "algosdk"

const ALGOD_SERVER = "https://testnet-api.4160.nodely.dev"
const ALGOD_TOKEN = ""
const ALGOD_PORT = 443

function truncate(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

function formatAlgo(microAlgos: number) {
  return (microAlgos / 1_000_000).toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })
}

export function WalletConnectButton() {
  const { wallets, activeAddress, isReady } = useWallet()
  const [open, setOpen] = useState(false)
  const [showWallets, setShowWallets] = useState(false)
  const [balance, setBalance] = useState<number | null>(null)
  const [loadingBalance, setLoadingBalance] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
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
      const info = await algod.accountInformation(address).do()
      setBalance(Number(info.amount))
    } catch {
      setBalance(null)
    } finally {
      setLoadingBalance(false)
    }
  }, [])

  useEffect(() => {
    if (activeAddress && open) fetchBalance(activeAddress)
  }, [activeAddress, open, fetchBalance])

  const activeWallet = wallets.find((w) => w.isActive)

  const handleDisconnect = async () => {
    if (activeWallet) await activeWallet.disconnect()
    setOpen(false)
    setBalance(null)
  }

  const handleConnect = async (walletId: string) => {
    const wallet = wallets.find((w) => w.id === walletId)
    if (wallet) await wallet.connect()
    setShowWallets(false)
  }

  // ── Connected state ───────────────────────────────────────────────────────
  if (activeAddress) {
    const explorerBase = `https://testnet.algoexplorer.io/address/${activeAddress}`

    const menuItems = [
      {
        label: "Fund Wallet",
        href: "https://bank.testnet.algorand.network/",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        ),
      },
      {
        label: "Swap",
        href: "https://app.tinyman.org/#/swap?asset_in=0",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        ),
      },
      {
        label: "Send",
        href: `https://testnet.algoexplorer.io/`,
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
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
    ]

    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 font-mono text-xs text-foreground backdrop-blur-md transition-colors hover:bg-foreground/20"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {truncate(activeAddress)}
          <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 z-[100] w-64 rounded-2xl border border-foreground/10 bg-[#111] shadow-2xl overflow-hidden">
            {/* Header */}
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

            {/* Avatar + balance */}
            <div className="flex flex-col items-center gap-1 px-4 py-5">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 mb-1 shadow-lg" />
              <p className="font-mono text-xs text-foreground/50">{truncate(activeAddress)}</p>
              <p className="font-sans text-3xl font-light text-foreground mt-1">
                {loadingBalance ? (
                  <span className="text-lg text-foreground/30 animate-pulse">loading…</span>
                ) : balance !== null ? (
                  <>{formatAlgo(balance)} <span className="text-lg text-foreground/50">ALGO</span></>
                ) : (
                  <span className="text-lg text-foreground/30">— ALGO</span>
                )}
              </p>
            </div>

            {/* Menu items */}
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

            {/* Disconnect */}
            <div className="border-t border-foreground/10">
              <button
                onClick={handleDisconnect}
                className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </span>
                <span className="font-sans text-sm">Disconnect</span>
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── Disconnected state ────────────────────────────────────────────────────
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setShowWallets((v) => !v)}
        disabled={!isReady}
        className="rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 font-sans text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-foreground/20 disabled:opacity-40"
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
