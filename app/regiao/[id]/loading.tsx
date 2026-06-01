export default function LoadingRegiao() {
  return (
    <div style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "2.5rem 2rem" }}>
      {/* Back link skeleton */}
      <div style={{ height: "0.875rem", width: "10rem", borderRadius: "0.25rem", background: "var(--bg-elevated)", marginBottom: "2rem" }} className="skeleton-shimmer" />

      {/* Hero skeleton */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-elevated)", borderRadius: "1rem", padding: "2.5rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ height: "0.625rem", width: "8rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
            <div style={{ height: "2.5rem", width: "14rem", borderRadius: "0.5rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
            <div style={{ height: "2rem", width: "8rem", borderRadius: "9999px", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
            <div style={{ height: "3.5rem", width: "6rem", borderRadius: "0.5rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
            <div style={{ height: "0.875rem", width: "5rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
          </div>
        </div>
      </div>

      {/* Metrics skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-elevated)", borderRadius: "0.75rem", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            <div style={{ height: "1.375rem", width: "1.5rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
            <div style={{ height: "1.375rem", width: "5rem", borderRadius: "0.375rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
            <div style={{ height: "0.75rem", width: "4rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
          </div>
        ))}
      </div>

      {/* Two col skeleton */}
      <div style={{ display: "grid", gap: "1.5rem" }} className="lg-two-col-inner">
        {/* Map skeleton */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ height: "20rem", background: "var(--bg-surface)", border: "1px solid var(--bg-elevated)", borderRadius: "0.75rem" }} className="skeleton-shimmer" />
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-elevated)", borderRadius: "0.75rem", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ height: "0.75rem", width: "7rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ display: "flex", gap: "0.875rem" }}>
                <div style={{ width: "1.5rem", height: "1.5rem", borderRadius: "0.25rem", background: "var(--bg-elevated)", flexShrink: 0 }} className="skeleton-shimmer" />
                <div style={{ height: "1rem", flex: 1, borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
        {/* Rankings skeleton */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-elevated)", borderRadius: "0.75rem", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ height: "0.75rem", width: "10rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ height: "0.875rem", width: "8rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
                <div style={{ height: "0.875rem", width: "4rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
              </div>
              <div style={{ height: "0.5rem", borderRadius: "9999px", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
