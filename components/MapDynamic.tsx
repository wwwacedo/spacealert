"use client"

import dynamic from "next/dynamic"
import { focos } from "@/data/focos"

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="text-center">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-3"
          style={{ borderColor: "var(--accent-fire)", borderTopColor: "transparent" }}
        />
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Carregando mapa...
        </p>
      </div>
    </div>
  ),
})

export default function MapDynamic() {
  return <LeafletMap focos={focos} />
}
