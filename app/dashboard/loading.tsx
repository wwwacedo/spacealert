export default function LoadingDashboard() {
  return (
    <div style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "2.5rem 2rem" }}>
      {/* Header skeleton */}
      <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        <div style={{ height: "0.75rem", width: "10rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
        <div style={{ height: "2rem", width: "16rem", borderRadius: "0.375rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
        <div style={{ height: "0.75rem", width: "22rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
      </div>

      {/* Chart skeleton */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-elevated)", borderRadius: "0.75rem", padding: "2rem", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ height: "0.75rem", width: "12rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
        {[100, 88, 77, 62, 43].map((w, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "7rem", height: "0.75rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
            <div style={{ flex: 1, height: "0.625rem", borderRadius: "9999px", background: "var(--bg-elevated)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${w}%`, borderRadius: "9999px", background: "var(--bg-surface)" }} className="skeleton-shimmer" />
            </div>
            <div style={{ width: "2rem", height: "0.75rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
          </div>
        ))}
      </div>

      {/* Filter buttons skeleton */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {[5, 4, 5, 5].map((_, i) => (
          <div key={i} style={{ height: "2.125rem", width: `${4 + i * 0.5}rem`, borderRadius: "9999px", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
        ))}
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "1rem" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-elevated)", borderRadius: "0.75rem", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                <div style={{ height: "0.625rem", width: "2rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
                <div style={{ height: "1rem", width: "7rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
              </div>
              <div style={{ height: "1.5rem", width: "3.5rem", borderRadius: "9999px", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
            </div>
            <div style={{ height: "2.25rem", width: "4rem", borderRadius: "0.375rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
            <div style={{ height: "1px", background: "var(--bg-elevated)" }} />
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div style={{ height: "0.875rem", width: "3rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
              <div style={{ height: "0.875rem", width: "4rem", borderRadius: "0.25rem", background: "var(--bg-elevated)" }} className="skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
