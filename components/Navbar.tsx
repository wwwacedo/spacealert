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
      className="sticky top-0 z-50 w-full"
      style={{
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--bg-elevated)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.5rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--accent-fire)", fontSize: "1.25rem" }}>🔥</span>
            <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Space<span style={{ color: "var(--accent-fire)" }}>Alert</span>
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {links.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: "0.375rem 1rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: active ? "var(--accent-fire)" : "var(--text-muted)",
                    background: active ? "var(--bg-elevated)" : "transparent",
                    transition: "color 0.15s",
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              className="animate-pulse-live"
              style={{ width: "0.5rem", height: "0.5rem", borderRadius: "9999px", background: "var(--accent-live)", display: "inline-block" }}
            />
            <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-muted)" }}>
              AO VIVO
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
