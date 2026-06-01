"use client"

import dynamic from "next/dynamic"
import type { Foco } from "@/data/focos"

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)", gap: "0.75rem" }}>
      <div style={{ width: "2rem", height: "2rem", borderRadius: "9999px", border: "2px solid var(--accent-fire)", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
      <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Carregando mapa...</p>
    </div>
  ),
})

export default function MapDynamic({ focos }: { focos: Foco[] }) {
  return <LeafletMap focos={focos} />
}
