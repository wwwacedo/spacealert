"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { estados } from "@/data/estados"
import { getRiscoColor, getRiscoLabel, getTendenciaIcon, getTendenciaColor } from "@/lib/utils"

type Filtro = "todos" | "alto" | "medio" | "baixo"

const FILTROS: { label: string; value: Filtro }[] = [
  { label: "Todos", value: "todos" },
  { label: "Alto", value: "alto" },
  { label: "Médio", value: "medio" },
  { label: "Baixo", value: "baixo" },
]

const top5 = [...estados].sort((a, b) => b.focos - a.focos).slice(0, 5)
const maxFocos = top5[0]?.focos ?? 1
const totalFocos = estados.reduce((s, e) => s + e.focos, 0)
const estadosAlto = estados.filter((e) => e.risco === "alto").length

export default function DashboardClient() {
  const [filtro, setFiltro] = useState<Filtro>("todos")

  const estadosFiltrados = filtro === "todos"
    ? estados
    : estados.filter((e) => e.risco === filtro)

  return (
    <motion.div
      style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "2.5rem 2rem" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span
            className="animate-pulse-live w-2.5 h-2.5 rounded-full inline-block"
            style={{ background: "var(--accent-live)" }}
          />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent-fire)" }}>
            Monitoramento ao vivo
          </span>
        </div>
        <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
          Dashboard de Alertas
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Atualizado em 01/06/2026 às 12:00 · {totalFocos.toLocaleString("pt-BR")} focos ativos ·{" "}
          <span style={{ color: "var(--accent-alert)" }}>{estadosAlto} estados em alerta crítico</span>
        </p>
      </div>

      {/* Top 5 bar chart */}
      <div
        className="rounded-xl p-8 mb-8"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-elevated)" }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: "var(--text-muted)" }}>
          Top 5 estados com mais focos
        </h2>
        <div className="flex flex-col gap-3">
          {top5.map((estado, i) => {
            const pct = (estado.focos / maxFocos) * 100
            const color = getRiscoColor(estado.risco)
            return (
              <motion.div
                key={estado.id}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
              >
                <Link
                  href={`/regiao/${estado.id}`}
                  className="w-28 shrink-0 text-sm font-medium text-right hover:underline"
                  style={{ color: "var(--text-primary)" }}
                >
                  {estado.nome}
                </Link>
                <div
                  className="flex-1 rounded-full overflow-hidden"
                  style={{ background: "var(--bg-elevated)", height: 10 }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: i * 0.07 + 0.2, duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <span className="w-12 text-sm font-bold text-right shrink-0" style={{ color }}>
                  {estado.focos}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTROS.map(({ label, value }) => {
          const active = filtro === value
          const color = value === "alto"
            ? "var(--accent-alert)"
            : value === "medio"
            ? "var(--accent-fire)"
            : value === "baixo"
            ? "var(--accent-safe)"
            : "var(--text-primary)"
          return (
            <button
              key={value}
              onClick={() => setFiltro(value)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                background: active
                  ? value === "todos"
                    ? "var(--bg-elevated)"
                    : `${getRiscoColor(value as "alto" | "medio" | "baixo")}22`
                  : "var(--bg-surface)",
                color: active ? color : "var(--text-muted)",
                border: `1px solid ${active ? color : "var(--bg-elevated)"}`,
              }}
            >
              {label}
              {value !== "todos" && (
                <span className="ml-1.5 text-xs opacity-70">
                  {estados.filter((e) => e.risco === value).length}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Cards grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        <AnimatePresence mode="popLayout">
          {estadosFiltrados.map((estado, i) => {
            const riscoColor = getRiscoColor(estado.risco)
            const tendIcon = getTendenciaIcon(estado.tendencia)
            const tendColor = getTendenciaColor(estado.tendencia)
            return (
              <motion.div
                key={estado.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <Link href={`/regiao/${estado.id}`} className="block group">
                  <div
                    className="rounded-xl p-6 h-full transition-all duration-200 group-hover:translate-y-[-2px]"
                    style={{
                      background: "var(--bg-surface)",
                      border: `1px solid ${riscoColor}44`,
                      boxShadow: `0 0 0 0 ${riscoColor}`,
                    }}
                  >
                    {/* Card header */}
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <p className="text-xs font-semibold tracking-wider uppercase mb-0.5" style={{ color: "var(--text-muted)" }}>
                          {estado.id}
                        </p>
                        <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                          {estado.nome}
                        </h3>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          background: `${riscoColor}22`,
                          color: riscoColor,
                          border: `1px solid ${riscoColor}44`,
                        }}
                      >
                        {getRiscoLabel(estado.risco)}
                      </span>
                    </div>

                    {/* Focos count */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold" style={{ color: riscoColor }}>
                          {estado.focos.toLocaleString("pt-BR")}
                        </p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                          focos ativos
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className="text-2xl font-bold"
                          style={{ color: tendColor }}
                        >
                          {tendIcon}
                        </p>
                        <p className="text-xs capitalize" style={{ color: tendColor }}>
                          {estado.tendencia}
                        </p>
                      </div>
                    </div>

                    {/* Footer info */}
                    <div
                      className="mt-5 pt-4 flex gap-6"
                      style={{ borderTop: "1px solid var(--bg-elevated)" }}
                    >
                      <div>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Sem chuva</p>
                        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          {estado.diasSemChuva}d
                        </p>
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Temperatura</p>
                        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          {estado.temperatura}°C
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {estadosFiltrados.length === 0 && (
        <div className="text-center py-16">
          <p style={{ color: "var(--text-muted)" }}>Nenhum estado com esse nível de risco.</p>
        </div>
      )}
    </motion.div>
  )
}
