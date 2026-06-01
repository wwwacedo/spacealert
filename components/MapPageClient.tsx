"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import MapDynamic from "./MapDynamic"
import { focos } from "@/data/focos"

export default function MapPageClient() {
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
        <MapDynamic />

        {/* Floating button */}
        <motion.div
          className="absolute bottom-6 right-4 z-[1000]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            style={{
              background: "var(--accent-fire)",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(255,107,43,0.4)",
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
        <div
          className="px-6 py-5 flex items-center gap-2"
          style={{ borderBottom: "1px solid var(--bg-elevated)" }}
        >
          <span
            className="animate-pulse-live w-2.5 h-2.5 rounded-full inline-block"
            style={{ background: "var(--accent-live)" }}
          />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent-fire)" }}>
            Monitoramento ao vivo
          </span>
        </div>

        {/* Total counter */}
        <div className="px-6 py-6" style={{ borderBottom: "1px solid var(--bg-elevated)" }}>
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
            Total de focos ativos
          </p>
          <p className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
            {total}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Atualizado em 01/06/2026 às 12:00
          </p>
        </div>

        {/* Risk breakdown */}
        <div className="px-6 py-5" style={{ borderBottom: "1px solid var(--bg-elevated)" }}>
          <p className="text-xs uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
            Por nível de risco
          </p>
          <div className="flex flex-col gap-3">
            {[
              { label: "Alto risco", count: altos, color: "var(--accent-alert)" },
              { label: "Médio risco", count: medios, color: "var(--accent-fire)" },
              { label: "Baixo risco", count: baixos, color: "var(--accent-safe)" },
            ].map(({ label, count, color }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {label}
                  </span>
                </div>
                <span className="text-sm font-bold" style={{ color }}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Critical states */}
        <div className="px-6 py-5">
          <p className="text-xs uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
            Estados em alerta crítico
          </p>
          <div className="flex flex-wrap gap-2.5">
            {estadosCriticos.map((uf) => (
              <Link
                key={uf}
                href={`/regiao/${uf}`}
                className="px-3 py-1.5 rounded text-xs font-bold transition-all hover:opacity-80"
                style={{
                  background: "rgba(255,43,43,0.15)",
                  color: "var(--accent-alert)",
                  border: "1px solid rgba(255,43,43,0.3)",
                }}
              >
                {uf}
              </Link>
            ))}
          </div>
        </div>

        {/* Pulse legend */}
        <div
          className="px-6 py-6 mt-auto"
          style={{ borderTop: "1px solid var(--bg-elevated)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Clique em qualquer foco no mapa para ver detalhes do município.
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Fonte: satélites NASA FIRMS / AQUA e TERRA.
          </p>
        </div>
      </motion.aside>
    </motion.div>
  )
}
