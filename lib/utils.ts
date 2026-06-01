export function getRiscoColor(risco: "baixo" | "medio" | "alto") {
  switch (risco) {
    case "alto": return "#FF2B2B"
    case "medio": return "#FF6B2B"
    case "baixo": return "#4CAF50"
  }
}

export function getRiscoLabel(risco: "baixo" | "medio" | "alto") {
  switch (risco) {
    case "alto": return "Alto"
    case "medio": return "Médio"
    case "baixo": return "Baixo"
  }
}

export function getTendenciaIcon(tendencia: "subindo" | "estavel" | "caindo") {
  switch (tendencia) {
    case "subindo": return "↑"
    case "estavel": return "→"
    case "caindo": return "↓"
  }
}

export function getTendenciaColor(tendencia: "subindo" | "estavel" | "caindo") {
  switch (tendencia) {
    case "subindo": return "#FF2B2B"
    case "estavel": return "#FF6B2B"
    case "caindo": return "#4CAF50"
  }
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
