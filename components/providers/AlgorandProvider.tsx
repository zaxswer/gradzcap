"use client"

import React, { useMemo } from "react"
import { WalletManager, WalletProvider, NetworkId, WalletId } from "@txnlab/use-wallet-react"

interface AlgorandProviderProps {
  children: React.ReactNode
}

export function AlgorandProvider({ children }: AlgorandProviderProps) {
  // Initialise inside useMemo so the manager is never recreated on re-renders
  // and is never constructed during SSR (this component is "use client")
  const walletManager = useMemo(() => {
    const wcProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

    return new WalletManager({
      wallets: [
        WalletId.KIBISIS,
        WalletId.EXODUS,
        WalletId.PERA,
        WalletId.DEFLY,
        ...(wcProjectId
          ? ([{ id: WalletId.WALLETCONNECT, options: { projectId: wcProjectId } }] as const)
          : []),
      ],
      networks: {
        [NetworkId.TESTNET]: {
          algod: {
            token: "",
            baseServer: "https://testnet-api.algonode.cloud",
            port: 443,
          },
        },
      },
      defaultNetwork: NetworkId.TESTNET,
    })
  }, [])

  return <WalletProvider manager={walletManager}>{children}</WalletProvider>
}
