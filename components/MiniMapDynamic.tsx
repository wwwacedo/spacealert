"use client"

import dynamic from "next/dynamic"
import type { Foco } from "@/data/focos"

const MiniLeafletMap = dynamic(() => import("./MiniLeafletMap"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
      <div
        style={{ width: "2rem", height: "2rem", borderRadius: "9999px", border: "2px solid var(--accent-fire)", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }}
      />
    </div>
  ),
})

export default function MiniMapDynamic({ focos, center }: { focos: Foco[]; center: [number, number] }) {
  return <MiniLeafletMap focos={focos} center={center} />
}
