import { createHash } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import type { AiAnalysis } from "@/data/ai-analysis"

const GENERATED_DIR = path.join(process.cwd(), "data", "generated")
const CACHE_DIR = path.join(process.cwd(), "data", "ai-analysis-cache")
const DATA_FILES = ["focos.json", "estados.json", "historico.json"]
const DEFAULT_MODEL = "gpt-4.1-mini"

type OpenAIResponse = {
  output_text?: string
  output?: Array<{
    content?: Array<{
      type?: string
      text?: string
    }>
  }>
}

export async function getAiAnalysis(): Promise<AiAnalysis> {
  const snapshot = await readDataSnapshot()
  const hash = createHash("sha256").update(snapshot).digest("hex").slice(0, 16)
  const cached = await readCachedAnalysis(hash)

  if (cached) {
    return { ...cached, cached: true }
  }

  const apiKey = process.env.OPENAI_API_KEY
  const model = process.env.OPENAI_MODEL || DEFAULT_MODEL
  const analysis = apiKey
    ? await createOpenAiAnalysis({ apiKey, model, hash, snapshot }).catch(() => createMockAnalysis(hash, model))
    : createMockAnalysis(hash, model)

  await writeCachedAnalysis(hash, analysis)
  return analysis
}

async function readDataSnapshot(): Promise<string> {
  const parts = await Promise.all(
    DATA_FILES.map(async (fileName) => {
      const filePath = path.join(GENERATED_DIR, fileName)
      return `${fileName}\n${await readFile(filePath, "utf-8")}`
    })
  )

  return parts.join("\n\n")
}

async function readCachedAnalysis(hash: string): Promise<AiAnalysis | null> {
  try {
    const raw = await readFile(path.join(CACHE_DIR, `${hash}.json`), "utf-8")
    return JSON.parse(raw) as AiAnalysis
  } catch {
    return null
  }
}

async function writeCachedAnalysis(hash: string, analysis: AiAnalysis): Promise<void> {
  await mkdir(CACHE_DIR, { recursive: true })
  await writeFile(path.join(CACHE_DIR, `${hash}.json`), JSON.stringify(analysis, null, 2) + "\n", "utf-8")
}

async function createOpenAiAnalysis({
  apiKey,
  model,
  hash,
  snapshot,
}: {
  apiKey: string
  model: string
  hash: string
  snapshot: string
}): Promise<AiAnalysis> {
  const compactSnapshot = snapshot.slice(0, 24000)
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      instructions:
        "Voce e um analista ambiental do SpaceAlert. Responda em portugues do Brasil, com tom objetivo e operacional.",
      input:
        "Analise os dados JSON do INPE abaixo e gere um insight curto para aparecer em um popup ao entrar no sistema. " +
        "Inclua: situacao principal, estados mais urgentes, motivo do risco e uma recomendacao pratica. " +
        "Use no maximo 75 palavras.\n\n" +
        compactSnapshot,
      max_output_tokens: 220,
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`OpenAI analysis failed: ${response.status} ${detail}`)
  }

  const data = (await response.json()) as OpenAIResponse
  return {
    hash,
    source: "openai",
    generatedAt: new Date().toISOString(),
    model,
    summary: extractText(data),
    cached: false,
  }
}

function createMockAnalysis(hash: string, model: string): AiAnalysis {
  return {
    hash,
    source: "mock",
    generatedAt: new Date().toISOString(),
    model,
    summary:
      "IA em modo demonstracao: os dados indicam concentracao de focos em estados criticos. Priorize as regioes com risco alto, monitore mudancas de tendencia e acione resposta preventiva nas areas com maior volume de ocorrencias.",
    cached: false,
  }
}

function extractText(data: OpenAIResponse): string {
  if (data.output_text) return data.output_text.trim()

  const text = data.output
    ?.flatMap((item) => item.content ?? [])
    .map((content) => content.text)
    .filter(Boolean)
    .join("\n")
    .trim()

  return text || "A IA concluiu a analise, mas nao retornou texto suficiente para exibicao."
}
