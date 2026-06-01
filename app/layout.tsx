import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SpaceAlert — Alertas de Queimadas",
  description: "Sistema de monitoramento de focos de queimada baseado em dados de satélite",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        <Navbar />
        <main style={{ width: "100%" }}>{children}</main>
      </body>
    </html>
  )
}
