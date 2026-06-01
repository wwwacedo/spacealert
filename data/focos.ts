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

export const focos: Foco[] = [
  { id: "f001", lat: -12.6, lng: -55.4, municipio: "Sinop", estado: "MT", risco: "alto", dataHora: "2026-06-01T08:30:00Z", satelite: "AQUA_M-T" },
  { id: "f002", lat: -14.1, lng: -52.2, municipio: "Nova Xavantina", estado: "MT", risco: "alto", dataHora: "2026-06-01T09:15:00Z", satelite: "TERRA_M-T" },
  { id: "f003", lat: -11.4, lng: -58.0, municipio: "Juara", estado: "MT", risco: "medio", dataHora: "2026-06-01T07:45:00Z", satelite: "AQUA_M-T" },
  { id: "f004", lat: -15.9, lng: -52.3, municipio: "Barra do Garças", estado: "MT", risco: "medio", dataHora: "2026-06-01T10:00:00Z", satelite: "TERRA_M-T" },
  { id: "f005", lat: -9.0, lng: -45.3, municipio: "Balsas", estado: "MA", risco: "alto", dataHora: "2026-06-01T08:00:00Z", satelite: "AQUA_M-T" },
  { id: "f006", lat: -7.2, lng: -44.8, municipio: "Colinas", estado: "MA", risco: "alto", dataHora: "2026-06-01T09:30:00Z", satelite: "TERRA_M-T" },
  { id: "f007", lat: -5.5, lng: -45.1, municipio: "Grajaú", estado: "MA", risco: "medio", dataHora: "2026-06-01T07:00:00Z", satelite: "AQUA_M-T" },
  { id: "f008", lat: -10.9, lng: -48.2, municipio: "Porto Nacional", estado: "TO", risco: "alto", dataHora: "2026-06-01T08:45:00Z", satelite: "TERRA_M-T" },
  { id: "f009", lat: -7.2, lng: -48.1, municipio: "Araguaína", estado: "TO", risco: "medio", dataHora: "2026-06-01T10:15:00Z", satelite: "AQUA_M-T" },
  { id: "f010", lat: -12.7, lng: -47.8, municipio: "Paranã", estado: "TO", risco: "baixo", dataHora: "2026-06-01T06:30:00Z", satelite: "TERRA_M-T" },
  { id: "f011", lat: -4.2, lng: -49.5, municipio: "Marabá", estado: "PA", risco: "alto", dataHora: "2026-06-01T09:00:00Z", satelite: "AQUA_M-T" },
  { id: "f012", lat: -6.0, lng: -50.0, municipio: "Redenção", estado: "PA", risco: "alto", dataHora: "2026-06-01T08:20:00Z", satelite: "TERRA_M-T" },
  { id: "f013", lat: -1.5, lng: -48.5, municipio: "Belém", estado: "PA", risco: "baixo", dataHora: "2026-06-01T11:00:00Z", satelite: "AQUA_M-T" },
  { id: "f014", lat: -8.8, lng: -63.9, municipio: "Porto Velho", estado: "RO", risco: "alto", dataHora: "2026-06-01T07:30:00Z", satelite: "TERRA_M-T" },
  { id: "f015", lat: -10.9, lng: -61.9, municipio: "Ji-Paraná", estado: "RO", risco: "alto", dataHora: "2026-06-01T08:10:00Z", satelite: "AQUA_M-T" },
  { id: "f016", lat: -12.5, lng: -60.5, municipio: "Vilhena", estado: "RO", risco: "medio", dataHora: "2026-06-01T09:45:00Z", satelite: "TERRA_M-T" },
  { id: "f017", lat: -20.5, lng: -54.6, municipio: "Campo Grande", estado: "MS", risco: "medio", dataHora: "2026-06-01T10:30:00Z", satelite: "AQUA_M-T" },
  { id: "f018", lat: -19.0, lng: -57.7, municipio: "Corumbá", estado: "MS", risco: "alto", dataHora: "2026-06-01T08:55:00Z", satelite: "TERRA_M-T" },
  { id: "f019", lat: -22.9, lng: -55.0, municipio: "Ponta Porã", estado: "MS", risco: "baixo", dataHora: "2026-06-01T07:15:00Z", satelite: "AQUA_M-T" },
  { id: "f020", lat: -15.6, lng: -56.1, municipio: "Cuiabá", estado: "MT", risco: "medio", dataHora: "2026-06-01T11:30:00Z", satelite: "TERRA_M-T" },
  { id: "f021", lat: -3.7, lng: -38.5, municipio: "Fortaleza", estado: "CE", risco: "baixo", dataHora: "2026-06-01T10:00:00Z", satelite: "AQUA_M-T" },
  { id: "f022", lat: -7.1, lng: -40.5, municipio: "Juazeiro do Norte", estado: "CE", risco: "medio", dataHora: "2026-06-01T09:20:00Z", satelite: "TERRA_M-T" },
  { id: "f023", lat: -16.4, lng: -39.1, municipio: "Porto Seguro", estado: "BA", risco: "medio", dataHora: "2026-06-01T08:40:00Z", satelite: "AQUA_M-T" },
  { id: "f024", lat: -12.9, lng: -38.4, municipio: "Salvador", estado: "BA", risco: "baixo", dataHora: "2026-06-01T11:00:00Z", satelite: "TERRA_M-T" },
  { id: "f025", lat: -10.9, lng: -37.1, municipio: "Aracaju", estado: "SE", risco: "baixo", dataHora: "2026-06-01T10:45:00Z", satelite: "AQUA_M-T" },
]
