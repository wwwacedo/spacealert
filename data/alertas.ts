import type { EstadoResumo } from "./estados"

export type AlertaEstado = {
  estado: string
  risco: EstadoResumo["risco"]
  resumo: string
}

export type AlertasPorEstado = Record<string, AlertaEstado>
