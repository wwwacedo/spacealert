import { estados } from "@/data/estados"

export async function GET() {
  await new Promise((r) => setTimeout(r, 300))
  return Response.json(estados)
}
