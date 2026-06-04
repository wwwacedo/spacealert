import { loadEstadoById } from "@/lib/server-data"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await new Promise((r) => setTimeout(r, 300))
  const { id } = await params
  const data = await loadEstadoById(id)

  if (!data) {
    return Response.json({ error: "Estado não encontrado" }, { status: 404 })
  }

  return Response.json(data)
}
