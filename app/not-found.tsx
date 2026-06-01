import Link from "next/link"

export default function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 56px)", padding: "2rem", textAlign: "center" }}>
      {/* Animated fire */}
      <div style={{ fontSize: "5rem", lineHeight: 1, marginBottom: "1.5rem", animation: "pulse-live 2s ease-in-out infinite" }}>
        🔥
      </div>

      <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent-fire)", marginBottom: "0.75rem" }}>
        Erro 404
      </p>

      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.2 }}>
        Região não encontrada
      </h1>

      <p style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: "24rem", lineHeight: 1.6, marginBottom: "2.5rem" }}>
        O alerta que você procura não existe ou o estado informado é inválido. Verifique a URL ou volte ao mapa.
      </p>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            padding: "0.625rem 1.5rem",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            fontWeight: 600,
            background: "var(--accent-fire)",
            color: "#fff",
            boxShadow: "0 4px 20px rgba(255,107,43,0.35)",
            transition: "opacity 0.15s",
          }}
        >
          Ver Mapa
        </Link>
        <Link
          href="/dashboard"
          style={{
            padding: "0.625rem 1.5rem",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            fontWeight: 600,
            background: "var(--bg-surface)",
            color: "var(--text-primary)",
            border: "1px solid var(--bg-elevated)",
            transition: "opacity 0.15s",
          }}
        >
          Dashboard
        </Link>
      </div>
    </div>
  )
}
