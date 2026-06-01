"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Mapa" },
    { href: "/dashboard", label: "Dashboard" },
  ]

  return (
    <nav
      style={{
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--bg-elevated)",
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 group">
            <span style={{ color: "var(--accent-fire)" }} className="text-xl">🔥</span>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Space<span style={{ color: "var(--accent-fire)" }}>Alert</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
                  style={{
                    color: active ? "var(--accent-fire)" : "var(--text-muted)",
                    background: active ? "var(--bg-elevated)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <span
              className="animate-pulse-live w-2 h-2 rounded-full inline-block"
              style={{ background: "var(--accent-live)" }}
            />
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              AO VIVO
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
