import { connection } from "next/server"
import { getFocos } from "@/lib/api"
import { getAiAnalysis } from "@/lib/ai-analysis"
import AiAnalysisPopup from "@/components/AiAnalysisPopup"
import MapPageClient from "@/components/MapPageClient"

export default async function Home() {
  await connection()
  const [focos, analysis] = await Promise.all([getFocos(), getAiAnalysis()])
  return (
    <>
      <AiAnalysisPopup analysis={analysis} />
      <MapPageClient focos={focos} />
    </>
  )
}
