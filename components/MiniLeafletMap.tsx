"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { Foco } from "@/data/focos"
import { getRiscoColor, getRiscoLabel } from "@/lib/utils"

type Props = { focos: Foco[]; center: [number, number] }

export default function MiniLeafletMap({ focos, center }: Props) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require("leaflet")
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    })
  }, [])

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ width: "100%", height: "100%", background: "#0A0A0A" }}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      {focos.map((foco) => {
        const color = getRiscoColor(foco.risco)
        const radius = foco.risco === "alto" ? 9 : foco.risco === "medio" ? 6 : 4
        return (
          <CircleMarker
            key={foco.id}
            center={[foco.lat, foco.lng]}
            radius={radius}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.85, weight: 1.5 }}
          >
            <Tooltip direction="top">
              <div style={{ fontFamily: "var(--font-inter, sans-serif)" }}>
                <div style={{ fontWeight: 700, color, marginBottom: 2 }}>{foco.municipio}</div>
                <div style={{ fontSize: 11, color: "#aaa" }}>Risco: <span style={{ color, fontWeight: 600 }}>{getRiscoLabel(foco.risco)}</span></div>
              </div>
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
