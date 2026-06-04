export type EstadoResumo = {
  id: string
  nome: string
  focos: number
  risco: "baixo" | "medio" | "alto"
  tendencia: "subindo" | "estavel" | "caindo"
  diasSemChuva: number
  areaAfetada: number
  temperatura: number
  municipiosAfetados: { nome: string; focos: number }[]
}
