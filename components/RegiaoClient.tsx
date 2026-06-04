"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { EstadoResumo } from "@/data/estados"
import type { Foco } from "@/data/focos"
import { getRiscoColor, getRiscoLabel, getTendenciaIcon, getTendenciaColor } from "@/lib/utils"
import MiniMapDynamic from "./MiniMapDynamic"

const RECOMENDACOES: Record<"alto" | "medio" | "baixo", { icon: string; texto: string }[]> = {
  alto: [
    { icon: "🚨", texto: "Evite áreas de mata e campo aberto — risco de propagação rápida" },
    { icon: "📞", texto: "Reporte focos ativos ao Corpo de Bombeiros: ligue 193" },
    { icon: "🎒", texto: "Mantenha documentos e itens essenciais prontos para evacuação" },
  ],
  medio: [
    { icon: "📡", texto: "Fique atento a alertas oficiais de queimadas da sua região" },
    { icon: "🚫", texto: "Evite queimadas e descarte inadequado de resíduos em áreas verdes" },
    { icon: "🪟", texto: "Mantenha janelas fechadas em dias com fumaça intensa" },
  ],
  baixo: [
    { icon: "🌦️", texto: "Monitore as condições climáticas e a previsão de chuvas" },
    { icon: "🌿", texto: "Evite queimadas mesmo em períodos mais úmidos" },
    { icon: "👁️", texto: "Colabore reportando focos suspeitos às autoridades locais" },
  ],
}

const CENTROS: Record<string, [number, number]> = {
  MT: [-12.6, -55.4], PA: [-4.5, -52.0], RO: [-10.9, -62.0], MA: [-5.5, -45.5],
  MS: [-20.5, -55.0], TO: [-10.2, -48.3], BA: [-12.9, -41.7], AM: [-3.5, -65.0],
  CE: [-5.5, -39.5], GO: [-15.8, -49.5], MG: [-18.5, -44.5], SE: [-10.6, -37.4],
}

type Props = { estado: EstadoResumo; focosEstado: Foco[]; alerta?: string }

export default function RegiaoClient({ estado, focosEstado, alerta }: Props) {
  const riscoColor = getRiscoColor(estado.risco)
  const tendColor = getTendenciaColor(estado.tendencia)
  const recomendacoes = RECOMENDACOES[estado.risco]
  const center = CENTROS[estado.id] ?? [-10, -52]
  const maxFocosMunicipio = estado.municipiosAfetados[0]?.focos ?? 1

  return (
    <motion.div
      style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "2.5rem 2rem" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Back button */}
      <Link
        href="/dashboard"
        aria-label="Voltar ao Dashboard de Alertas"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          fontSize: "0.875rem",
          color: "var(--text-muted)",
          marginBottom: "2rem",
          transition: "color 0.15s",
        }}
      >
        ← Voltar ao Dashboard
      </Link>

      {/* Hero */}
      <div
        style={{
          background: "var(--bg-surface)",
          border: `1px solid ${riscoColor}44`,
          borderRadius: "1rem",
          padding: "2.5rem",
          marginBottom: "1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: "16rem", height: "16rem",
          borderRadius: "9999px", background: `${riscoColor}0A`,
          filter: "blur(3rem)", pointerEvents: "none",
        }} />

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "1.5rem", position: "relative" }}>
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
              {estado.id} · Detalhe de Região
            </p>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "1rem" }}>
              {estado.nome}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <span style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 700,
                background: `${riscoColor}22`,
                color: riscoColor,
                border: `1px solid ${riscoColor}55`,
              }}>
                🔥 Risco {getRiscoLabel(estado.risco)}
              </span>
              <span style={{ fontSize: "1rem", fontWeight: 600, color: tendColor }}>
                {getTendenciaIcon(estado.tendencia)} {estado.tendencia.charAt(0).toUpperCase() + estado.tendencia.slice(1)}
              </span>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "3.5rem", fontWeight: 700, lineHeight: 1, color: riscoColor }}>
              {estado.focos.toLocaleString("pt-BR")}
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>focos ativos</p>
          </div>
        </div>
      </div>

      {/* Metrics row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { label: "Área Afetada", value: `${estado.areaAfetada.toLocaleString("pt-BR")} ha`, icon: "🗺️" },
          { label: "Dias sem Chuva", value: `${estado.diasSemChuva} dias`, icon: "☀️" },
          { label: "Temperatura Média", value: `${estado.temperatura}°C`, icon: "🌡️" },
          { label: "Municípios Afetados", value: `${estado.municipiosAfetados.length}`, icon: "🏘️" },
        ].map(({ label, value, icon }, i) => (
          <motion.div
            key={label}
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--bg-elevated)",
              borderRadius: "0.75rem",
              padding: "1.5rem",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
          >
            <p style={{ fontSize: "1.375rem", marginBottom: "0.5rem" }}>{icon}</p>
            <p style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1 }}>{value}</p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.375rem" }}>{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="lg:two-col">
        <div style={{ display: "contents" }} className="lg-two-col-inner">

          {/* Left col: mini-map + municipalities */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {alerta && (
              <div style={{
                background: "var(--bg-surface)",
                border: `1px solid ${riscoColor}44`,
                borderRadius: "0.75rem",
                padding: "1.75rem",
              }}>
                <h2 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.875rem" }}>
                  Resumo automático
                </h2>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-primary)" }}>
                  {alerta}
                </p>
              </div>
            )}

            {/* Mini-map */}
            <div style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--bg-elevated)",
              borderRadius: "0.75rem",
              overflow: "hidden",
              height: "20rem",
            }}>
              <MiniMapDynamic focos={focosEstado} center={center} />
            </div>

            {/* Recommendations */}
            <div style={{
              background: "var(--bg-surface)",
              border: `1px solid ${riscoColor}33`,
              borderRadius: "0.75rem",
              padding: "1.75rem",
            }}>
              <h2 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                Recomendações
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {recomendacoes.map(({ icon, texto }, i) => (
                  <motion.div
                    key={i}
                    style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
                  >
                    <span style={{ fontSize: "1.25rem", flexShrink: 0, marginTop: "0.1rem" }}>{icon}</span>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-primary)", lineHeight: 1.5 }}>{texto}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right col: municipalities ranking */}
          <div style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--bg-elevated)",
            borderRadius: "0.75rem",
            padding: "1.75rem",
          }}>
            <h2 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Municípios mais afetados
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {estado.municipiosAfetados.map((mun, i) => {
                const pct = maxFocosMunicipio > 0 ? (mun.focos / maxFocosMunicipio) * 100 : 0
                return (
                  <motion.div
                    key={mun.nome}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.35 }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <span style={{
                          width: "1.5rem", height: "1.5rem", borderRadius: "9999px",
                          background: "var(--bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", flexShrink: 0,
                        }}>
                          {i + 1}
                        </span>
                        <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>{mun.nome}</span>
                      </div>
                      <span style={{ fontSize: "0.875rem", fontWeight: 700, color: riscoColor }}>{mun.focos} focos</span>
                    </div>
                    <div style={{ background: "var(--bg-elevated)", borderRadius: "9999px", height: "0.5rem", overflow: "hidden" }}>
                      <motion.div
                        style={{ height: "100%", borderRadius: "9999px", background: riscoColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Divider + summary */}
            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--bg-elevated)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Total de focos</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 700, color: riscoColor, marginTop: "0.25rem" }}>
                    {estado.focos.toLocaleString("pt-BR")}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Área afetada</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "0.25rem" }}>
                    {(estado.areaAfetada / 1000).toFixed(0)}k ha
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}
