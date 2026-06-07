export type HistoricoMensal = {
  mes: string
  focos: number
}

export type HistoricoEstado = {
  id: string
  nome: string
  focos: number
}

export type HistoricoRegiaoCritica = {
  estado: string
  municipio: string
  focos: number
}

export type Historico = {
  evolucaoMensal: HistoricoMensal[]
  rankingEstados: HistoricoEstado[]
  rankingRegioesCriticas: HistoricoRegiaoCritica[]
}
