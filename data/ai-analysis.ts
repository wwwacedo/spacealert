export type AiAnalysisSource = "openai" | "mock"

export type AiAnalysis = {
  hash: string
  source: AiAnalysisSource
  generatedAt: string
  model: string
  summary: string
  cached: boolean
}
