export type Foco = {
  id: string
  lat: number
  lng: number
  municipio: string
  estado: string
  risco: "baixo" | "medio" | "alto"
  dataHora: string
  satelite: string
}
