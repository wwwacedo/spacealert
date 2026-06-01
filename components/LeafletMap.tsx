"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { Foco } from "@/data/focos"
import { getRiscoColor, getRiscoLabel, formatDate } from "@/lib/utils"

type Props = { focos: Foco[] }

export default function LeafletMap({ focos }: Props) {
  useEffect(() => {
    // Fix leaflet icon paths in Next.js
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
      center={[-10, -52]}
      zoom={4}
      style={{ width: "100%", height: "100%", background: "#0A0A0A" }}
      zoomControl={true}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {focos.map((foco) => {
        const color = getRiscoColor(foco.risco)
        const radius = foco.risco === "alto" ? 10 : foco.risco === "medio" ? 7 : 5

        return (
          <CircleMarker
            key={foco.id}
            center={[foco.lat, foco.lng]}
            radius={radius}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.85,
              weight: foco.risco === "alto" ? 2 : 1,
            }}
          >
            <Tooltip
              permanent={false}
              direction="top"
              className="leaflet-tooltip-custom"
            >
              <div style={{ minWidth: 160, fontFamily: "var(--font-inter, sans-serif)" }}>
                <div style={{ fontWeight: 700, color, marginBottom: 4 }}>
                  {foco.municipio} — {foco.estado}
                </div>
                <div style={{ color: "#ccc", fontSize: 12 }}>
                  Risco:{" "}
                  <span style={{ color, fontWeight: 600 }}>
                    {getRiscoLabel(foco.risco)}
                  </span>
                </div>
                <div style={{ color: "#888", fontSize: 11, marginTop: 2 }}>
                  {formatDate(foco.dataHora)}
                </div>
                <div style={{ color: "#666", fontSize: 10, marginTop: 1 }}>
                  📡 {foco.satelite}
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
