import { getAiAnalysis } from "@/lib/ai-analysis"

export async function GET() {
  return Response.json(await getAiAnalysis())
}
