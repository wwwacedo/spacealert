import { getHistorico } from "@/lib/api"

export default async function HistoricoPage() {
  const historico = await getHistorico()
  const maxMensal = Math.max(...historico.evolucaoMensal.map((item) => item.focos), 1)
  const maxEstado = Math.max(...historico.rankingEstados.map((item) => item.focos), 1)
  const maxRegiao = Math.max(...historico.rankingRegioesCriticas.map((item) => item.focos), 1)
  const totalHistorico = historico.evolucaoMensal.reduce((sum, item) => sum + item.focos, 0)

  return (
    <div style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "2.5rem 2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.375rem" }}>
          <span
            className="animate-pulse-live"
            style={{ width: "0.625rem", height: "0.625rem", borderRadius: "9999px", background: "var(--accent-live)", display: "inline-block" }}
          />
          <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-fire)" }}>
            Dados históricos INPE
          </span>
        </div>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "var(--text-primary)" }}>
          Histórico de Queimadas
        </h1>
        <p style={{ fontSize: "0.875rem", marginTop: "0.25rem", color: "var(--text-muted)" }}>
          {totalHistorico.toLocaleString("pt-BR")} focos no período processado · rankings por estado e município crítico.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        <section style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-elevated)", borderRadius: "0.75rem", padding: "1.75rem" }}>
          <h2 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.25rem", color: "var(--text-muted)" }}>
            Evolução mensal
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {historico.evolucaoMensal.map((item) => (
              <MetricBar key={item.mes} label={item.mes} value={item.focos} max={maxMensal} color="var(--accent-fire)" />
            ))}
          </div>
        </section>

        <section style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-elevated)", borderRadius: "0.75rem", padding: "1.75rem" }}>
          <h2 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.25rem", color: "var(--text-muted)" }}>
            Ranking de estados
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {historico.rankingEstados.map((item) => (
              <MetricBar key={item.id} label={`${item.nome} (${item.id})`} value={item.focos} max={maxEstado} color="var(--accent-alert)" />
            ))}
          </div>
        </section>
      </div>

      <section style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-elevated)", borderRadius: "0.75rem", padding: "1.75rem" }}>
        <h2 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.25rem", color: "var(--text-muted)" }}>
          Regiões críticas
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {historico.rankingRegioesCriticas.map((item) => (
            <MetricBar
              key={`${item.estado}-${item.municipio}`}
              label={`${item.municipio} · ${item.estado}`}
              value={item.focos}
              max={maxRegiao}
              color="var(--accent-safe)"
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function MetricBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.max(4, (value / max) * 100)

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(8rem, 14rem) 1fr 4rem", alignItems: "center", gap: "0.75rem" }}>
      <span style={{ color: "var(--text-primary)", fontSize: "0.875rem", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {label}
      </span>
      <div style={{ height: "0.625rem", background: "var(--bg-elevated)", borderRadius: "9999px", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: "9999px" }} />
      </div>
      <span style={{ textAlign: "right", color, fontSize: "0.875rem", fontWeight: 700 }}>
        {value.toLocaleString("pt-BR")}
      </span>
    </div>
  )
}
