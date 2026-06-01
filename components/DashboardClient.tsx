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
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.375rem" }}>
          <span
            className="animate-pulse-live"
            style={{ width: "0.625rem", height: "0.625rem", borderRadius: "9999px", background: "var(--accent-live)", display: "inline-block" }}
          />
          <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-fire)" }}>
            Monitoramento ao vivo
          </span>
        </div>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "var(--text-primary)" }}>
          Dashboard de Alertas
        </h1>
        <p style={{ fontSize: "0.875rem", marginTop: "0.25rem", color: "var(--text-muted)" }}>
          Atualizado em 01/06/2026 às 12:00 · {totalFocos.toLocaleString("pt-BR")} focos ativos ·{" "}
          <span style={{ color: "var(--accent-alert)" }}>{estadosAlto} estados em alerta crítico</span>
        </p>
      </div>

      {/* Top 5 bar chart */}
      <div
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--bg-elevated)",
          borderRadius: "0.75rem",
          padding: "2rem",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.25rem", color: "var(--text-muted)" }}>
          Top 5 estados com mais focos
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {top5.map((estado, i) => {
            const pct = (estado.focos / maxFocos) * 100
            const color = getRiscoColor(estado.risco)
            return (
              <motion.div
                key={estado.id}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
              >
                <Link
                  href={`/regiao/${estado.id}`}
                  style={{ width: "7rem", flexShrink: 0, fontSize: "0.875rem", fontWeight: 500, textAlign: "right", color: "var(--text-primary)" }}
                >
                  {estado.nome}
                </Link>
                <div style={{ flex: 1, borderRadius: "9999px", overflow: "hidden", background: "var(--bg-elevated)", height: "0.625rem" }}>
                  <motion.div
                    style={{ height: "100%", borderRadius: "9999px", background: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: i * 0.07 + 0.2, duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <span style={{ width: "3rem", fontSize: "0.875rem", fontWeight: 700, textAlign: "right", flexShrink: 0, color }}>
                  {estado.focos}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
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
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
                background: active
                  ? value === "todos" ? "var(--bg-elevated)" : `${getRiscoColor(value as "alto" | "medio" | "baixo")}22`
                  : "var(--bg-surface)",
                color: active ? color : "var(--text-muted)",
                border: `1px solid ${active ? color : "var(--bg-elevated)"}`,
              }}
            >
              {label}
              {value !== "todos" && (
                <span style={{ marginLeft: "0.375rem", fontSize: "0.75rem", opacity: 0.7 }}>
                  {estados.filter((e) => e.risco === value).length}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Cards grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gap: "1rem" }}
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
                <Link href={`/regiao/${estado.id}`} style={{ display: "block" }} className="group">
                  <div
                    className="group-hover:-translate-y-0.5"
                    style={{
                      padding: "1.5rem",
                      borderRadius: "0.75rem",
                      height: "100%",
                      background: "var(--bg-surface)",
                      border: `1px solid ${riscoColor}44`,
                      transition: "transform 0.2s",
                    }}
                  >
                    {/* Card header */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                      <div>
                        <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.25rem", color: "var(--text-muted)" }}>
                          {estado.id}
                        </p>
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                          {estado.nome}
                        </h3>
                      </div>
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          background: `${riscoColor}22`,
                          color: riscoColor,
                          border: `1px solid ${riscoColor}44`,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {getRiscoLabel(estado.risco)}
                      </span>
                    </div>

                    {/* Focos count */}
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1, color: riscoColor }}>
                          {estado.focos.toLocaleString("pt-BR")}
                        </p>
                        <p style={{ fontSize: "0.75rem", marginTop: "0.25rem", color: "var(--text-muted)" }}>
                          focos ativos
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1, color: tendColor }}>
                          {tendIcon}
                        </p>
                        <p style={{ fontSize: "0.75rem", marginTop: "0.25rem", textTransform: "capitalize", color: tendColor }}>
                          {estado.tendencia}
                        </p>
                      </div>
                    </div>

                    {/* Footer info */}
                    <div style={{ marginTop: "1.25rem", paddingTop: "1rem", display: "flex", gap: "1.5rem", borderTop: "1px solid var(--bg-elevated)" }}>
                      <div>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Sem chuva</p>
                        <p style={{ fontSize: "0.875rem", fontWeight: 600, marginTop: "0.125rem", color: "var(--text-primary)" }}>
                          {estado.diasSemChuva}d
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Temperatura</p>
                        <p style={{ fontSize: "0.875rem", fontWeight: 600, marginTop: "0.125rem", color: "var(--text-primary)" }}>
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
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <p style={{ color: "var(--text-muted)" }}>Nenhum estado com esse nível de risco.</p>
        </div>
      )}
    </motion.div>
  )
}
