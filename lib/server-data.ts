import { readFile } from "node:fs/promises"
import path from "node:path"
import type { AlertasPorEstado } from "@/data/alertas"
import type { EstadoResumo } from "@/data/estados"
import type { Foco } from "@/data/focos"
import type { Historico } from "@/data/historico"

const GENERATED_DIR = path.join(process.cwd(), "data", "generated")

async function readGeneratedJson<T>(fileName: string): Promise<T> {
  const filePath = path.join(GENERATED_DIR, fileName)

  try {
    const raw = await readFile(filePath, "utf-8")
    return JSON.parse(raw) as T
  } catch (error) {
    throw new Error(
      `Dados reais não encontrados ou inválidos em ${filePath}. Rode "python -m scripts.inpe_pipeline ingest --daily 20260601 --monthly 202605" antes de iniciar o app.`,
      { cause: error }
    )
  }
}

export async function loadFocos(): Promise<Foco[]> {
  return readGeneratedJson<Foco[]>("focos.json")
}

export async function loadEstados(): Promise<EstadoResumo[]> {
  return readGeneratedJson<EstadoResumo[]>("estados.json")
}

export async function loadHistorico(): Promise<Historico> {
  return readGeneratedJson<Historico>("historico.json")
}

export async function loadAlertas(): Promise<AlertasPorEstado> {
  return readGeneratedJson<AlertasPorEstado>("alertas.json")
}

export async function loadEstadoById(id: string): Promise<{ estado: EstadoResumo; focos: Foco[]; alerta?: string } | null> {
  const normalizedId = id.toUpperCase()
  const [estados, focos, alertas] = await Promise.all([loadEstados(), loadFocos(), loadAlertas()])
  const estado = estados.find((item) => item.id === normalizedId)

  if (!estado) return null

  return {
    estado,
    focos: focos.filter((foco) => foco.estado === estado.id),
    alerta: alertas[estado.id]?.resumo,
  }
}
