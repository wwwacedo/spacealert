"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import MapDynamic from "./MapDynamic"
import type { Foco } from "@/data/focos"

export default function MapPageClient({ focos }: { focos: Foco[] }) {
  const total = focos.length
  const altos = focos.filter((f) => f.risco === "alto").length
  const medios = focos.filter((f) => f.risco === "medio").length
  const baixos = focos.filter((f) => f.risco === "baixo").length
  const estadosCriticos = [...new Set(focos.filter((f) => f.risco === "alto").map((f) => f.estado))]

  return (
    <motion.div
      className="relative flex flex-col md:flex-row"
      style={{ height: "calc(100vh - 56px)" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Map area */}
      <div className="flex-1 relative" style={{ minHeight: "55vh" }}>
        <MapDynamic focos={focos} />

        {/* Floating button */}
        <motion.div
          style={{ position: "absolute", bottom: "1.5rem", right: "1rem", zIndex: 1000 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Link
            href="/dashboard"
            aria-label="Ir para o Dashboard de Alertas"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.625rem 1.25rem",
              borderRadius: "9999px",
              fontSize: "0.875rem",
              fontWeight: 600,
              background: "var(--accent-fire)",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(255,107,43,0.4)",
              transition: "transform 0.15s",
            }}
          >
            Ver Dashboard →
          </Link>
        </motion.div>
      </div>

      {/* Side panel */}
      <motion.aside
        className="w-full md:w-72 shrink-0 flex flex-col overflow-y-auto"
        style={{
          background: "var(--bg-surface)",
          borderLeft: "1px solid var(--bg-elevated)",
          borderTop: "1px solid var(--bg-elevated)",
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* Live header */}
        <div style={{ padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "1px solid var(--bg-elevated)" }}>
          <span
            className="animate-pulse-live"
            style={{ width: "0.625rem", height: "0.625rem", borderRadius: "9999px", background: "var(--accent-live)", display: "inline-block", flexShrink: 0 }}
          />
          <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-fire)" }}>
            Monitoramento ao vivo
          </span>
        </div>

        {/* Total counter */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--bg-elevated)" }}>
          <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem", color: "var(--text-muted)" }}>
            Total de focos ativos
          </p>
          <p style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1, color: "var(--text-primary)" }}>
            {total}
          </p>
          <p style={{ fontSize: "0.75rem", marginTop: "0.375rem", color: "var(--text-muted)" }}>
            Atualizado em 01/06/2026 às 12:00
          </p>
        </div>

        {/* Risk breakdown */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--bg-elevated)" }}>
          <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem", color: "var(--text-muted)" }}>
            Por nível de risco
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { label: "Alto risco", count: altos, color: "var(--accent-alert)" },
              { label: "Médio risco", count: medios, color: "var(--accent-fire)" },
              { label: "Baixo risco", count: baixos, color: "var(--accent-safe)" },
            ].map(({ label, count, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "9999px", background: color, display: "inline-block" }} />
                  <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{label}</span>
                </div>
                <span style={{ fontSize: "0.875rem", fontWeight: 700, color }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Critical states */}
        <div style={{ padding: "1.5rem" }}>
          <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem", color: "var(--text-muted)" }}>
            Estados em alerta crítico
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {estadosCriticos.map((uf) => (
              <Link
                key={uf}
                href={`/regiao/${uf}`}
                style={{
                  padding: "0.375rem 0.75rem",
                  borderRadius: "0.25rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  background: "rgba(255,43,43,0.15)",
                  color: "var(--accent-alert)",
                  border: "1px solid rgba(255,43,43,0.3)",
                  transition: "opacity 0.15s",
                }}
              >
                {uf}
              </Link>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{ padding: "1.5rem", marginTop: "auto", borderTop: "1px solid var(--bg-elevated)" }}>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Clique em qualquer foco no mapa para ver detalhes do município.
          </p>
          <p style={{ fontSize: "0.75rem", marginTop: "0.25rem", color: "var(--text-muted)" }}>
            Fonte: satélites NASA FIRMS / AQUA e TERRA.
          </p>
        </div>
      </motion.aside>
    </motion.div>
  )
}
