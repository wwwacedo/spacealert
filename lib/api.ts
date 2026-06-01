import type { Foco } from "@/data/focos"
import type { EstadoResumo } from "@/data/estados"

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"

export async function getFocos(): Promise<Foco[]> {
  const res = await fetch(`${BASE}/api/focos`, { cache: "no-store" })
  if (!res.ok) throw new Error("Falha ao buscar focos")
  return res.json()
}

export async function getEstados(): Promise<EstadoResumo[]> {
  const res = await fetch(`${BASE}/api/estados`, { cache: "no-store" })
  if (!res.ok) throw new Error("Falha ao buscar estados")
  return res.json()
}

export async function getEstadoById(id: string): Promise<{ estado: EstadoResumo; focos: Foco[] } | null> {
  const res = await fetch(`${BASE}/api/estados/${id}`, { cache: "no-store" })
  if (res.status === 404) return null
  if (!res.ok) throw new Error("Falha ao buscar estado")
  return res.json()
}
