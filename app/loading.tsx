export default function LoadingHome() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 56px)" }} className="md:flex-row">
      {/* Map skeleton */}
      <div style={{ flex: 1, background: "var(--bg-surface)", position: "relative", minHeight: "55vh" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)" }} className="skeleton-shimmer" />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
          <div style={{ width: "3rem", height: "3rem", borderRadius: "9999px", border: "2px solid var(--accent-fire)", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto 0.75rem" }} />
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Carregando mapa...</p>
        </div>
      </div>
      {/* Panel skeleton */}
      <div style={{ width: "18rem", background: "var(--bg-surface)", borderLeft: "1px solid var(--bg-elevated)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }} className="hidden md:flex">
        {[40, 80, 120, 100, 60].map((w, i) => (
          <div key={i} style={{ height: "1rem", borderRadius: "0.25rem", background: "var(--bg-elevated)", width: `${w}%` }} className="skeleton-shimmer" />
        ))}
      </div>
    </div>
  )
}
