import { loadHistorico } from "@/lib/server-data"

export async function GET() {
  await new Promise((r) => setTimeout(r, 300))
  return Response.json(await loadHistorico())
}
