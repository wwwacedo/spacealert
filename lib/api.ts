import type { Foco } from "@/data/focos"
import type { EstadoResumo } from "@/data/estados"
import type { Historico } from "@/data/historico"
import { loadEstadoById, loadEstados, loadFocos, loadHistorico } from "@/lib/server-data"

export async function getFocos(): Promise<Foco[]> {
  return loadFocos()
}

export async function getEstados(): Promise<EstadoResumo[]> {
  return loadEstados()
}

export async function getEstadoById(id: string): Promise<{ estado: EstadoResumo; focos: Foco[]; alerta?: string } | null> {
  return loadEstadoById(id)
}

export async function getHistorico(): Promise<Historico> {
  return loadHistorico()
}
