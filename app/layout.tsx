import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AlgorandProvider } from "@/components/providers/AlgorandProvider"
import { CustomCursor } from "@/components/custom-cursor"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GradZCap",
  description: "Relieve students of financial strain and debt through blockchain-powered scholarships and Zero-Knowledge Proof eligibility verification.",
  generator: "GradZCap",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <CustomCursor />
        <AlgorandProvider>
          {children}
        </AlgorandProvider>
        <Analytics />
      </body>
    </html>
  )
}
