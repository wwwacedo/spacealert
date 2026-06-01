import { estados } from "@/data/estados"
import { focos } from "@/data/focos"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await new Promise((r) => setTimeout(r, 300))
  const { id } = await params
  const estado = estados.find((e) => e.id === id.toUpperCase())

  if (!estado) {
    return Response.json({ error: "Estado não encontrado" }, { status: 404 })
  }

  const focosEstado = focos.filter((f) => f.estado === estado.id)
  return Response.json({ estado, focos: focosEstado })
}
