"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { AiAnalysis } from "@/data/ai-analysis"

export default function AiAnalysisPopup({ analysis }: { analysis: AiAnalysis }) {
  const [open, setOpen] = useState(true)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="ai-analysis-title"
          style={{
            position: "fixed",
            top: "4.5rem",
            left: "1rem",
            zIndex: 1200,
            width: "min(24rem, calc(100vw - 2rem))",
            borderRadius: "0.5rem",
            border: "1px solid rgba(255,107,43,0.35)",
            background: "rgba(17,17,17,0.96)",
            boxShadow: "0 18px 48px rgba(0,0,0,0.45)",
            padding: "1rem",
            backdropFilter: "blur(10px)",
          }}
          initial={false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-fire)" }}>
                Insight de IA
              </p>
              <h2 id="ai-analysis-title" style={{ marginTop: "0.2rem", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Analise automatica dos focos
              </h2>
            </div>
            <button
              type="button"
              aria-label="Fechar insight de IA"
              onClick={() => setOpen(false)}
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "0.375rem",
                border: "1px solid var(--bg-elevated)",
                background: "var(--bg-primary)",
                color: "var(--text-muted)",
                cursor: "pointer",
                fontSize: "1rem",
                lineHeight: 1,
              }}
            >
              x
            </button>
          </div>

          <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", lineHeight: 1.55, color: "var(--text-primary)" }}>
            {analysis.summary}
          </p>

          <p style={{ marginTop: "0.75rem", fontSize: "0.72rem", color: "var(--text-muted)" }}>
            Fonte: {analysis.source === "mock" ? "mock sem OPENAI_API_KEY" : analysis.source}
            {analysis.cached ? " | cache" : ""} | hash {analysis.hash}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
