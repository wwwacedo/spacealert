from __future__ import annotations

import math
import unicodedata
from collections.abc import Iterable
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal

import pandas as pd

Risk = Literal["baixo", "medio", "alto"]

STATE_TO_UF = {
    "ACRE": "AC",
    "ALAGOAS": "AL",
    "AMAPA": "AP",
    "AMAPÁ": "AP",
    "AMAZONAS": "AM",
    "BAHIA": "BA",
    "CEARA": "CE",
    "CEARÁ": "CE",
    "DISTRITO FEDERAL": "DF",
    "ESPIRITO SANTO": "ES",
    "ESPÍRITO SANTO": "ES",
    "GOIAS": "GO",
    "GOIÁS": "GO",
    "MARANHAO": "MA",
    "MARANHÃO": "MA",
    "MATO GROSSO": "MT",
    "MATO GROSSO DO SUL": "MS",
    "MINAS GERAIS": "MG",
    "PARA": "PA",
    "PARÁ": "PA",
    "PARAIBA": "PB",
    "PARAÍBA": "PB",
    "PARANA": "PR",
    "PARANÁ": "PR",
    "PERNAMBUCO": "PE",
    "PIAUI": "PI",
    "PIAUÍ": "PI",
    "RIO DE JANEIRO": "RJ",
    "RIO GRANDE DO NORTE": "RN",
    "RIO GRANDE DO SUL": "RS",
    "RONDONIA": "RO",
    "RONDÔNIA": "RO",
    "RORAIMA": "RR",
    "SANTA CATARINA": "SC",
    "SAO PAULO": "SP",
    "SÃO PAULO": "SP",
    "SERGIPE": "SE",
    "TOCANTINS": "TO",
}

UF_TO_STATE = {
    "AC": "Acre",
    "AL": "Alagoas",
    "AP": "Amapá",
    "AM": "Amazonas",
    "BA": "Bahia",
    "CE": "Ceará",
    "DF": "Distrito Federal",
    "ES": "Espírito Santo",
    "GO": "Goiás",
    "MA": "Maranhão",
    "MT": "Mato Grosso",
    "MS": "Mato Grosso do Sul",
    "MG": "Minas Gerais",
    "PA": "Pará",
    "PB": "Paraíba",
    "PR": "Paraná",
    "PE": "Pernambuco",
    "PI": "Piauí",
    "RJ": "Rio de Janeiro",
    "RN": "Rio Grande do Norte",
    "RS": "Rio Grande do Sul",
    "RO": "Rondônia",
    "RR": "Roraima",
    "SC": "Santa Catarina",
    "SP": "São Paulo",
    "SE": "Sergipe",
    "TO": "Tocantins",
}


def _clean_text(value: object) -> str:
    if value is None or (isinstance(value, float) and math.isnan(value)):
        return ""
    text = str(value).strip()
    return " ".join(part.capitalize() for part in text.split())


def _state_to_uf(value: object) -> str:
    raw = str(value).strip().upper()
    normalized = unicodedata.normalize("NFD", raw)
    ascii_key = "".join(ch for ch in normalized if unicodedata.category(ch) != "Mn")
    return STATE_TO_UF.get(raw) or STATE_TO_UF.get(ascii_key) or raw[:2]


def _number(value: object, default: float = 0) -> float:
    parsed = pd.to_numeric(value, errors="coerce")
    if pd.isna(parsed):
        return default
    return float(parsed)


def _timestamp(value: object) -> str:
    parsed = pd.to_datetime(value, errors="coerce", utc=True)
    if pd.isna(parsed):
        return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    return parsed.isoformat().replace("+00:00", "Z")


def classify_state_risk(focos: int, avg_risco_fogo: float, avg_frp: float) -> Risk:
    if focos >= 80 or avg_risco_fogo >= 0.75 or avg_frp >= 50:
        return "alto"
    if focos >= 25 or avg_risco_fogo >= 0.45 or avg_frp >= 20:
        return "medio"
    return "baixo"


def classify_focus_risk(risco_fogo: float, frp: float) -> Risk:
    return classify_state_risk(1, risco_fogo, frp)


def normalize_focos(df: pd.DataFrame) -> list[dict]:
    focos = []
    for _, row in df.iterrows():
        risco_fogo = _number(row.get("risco_fogo"))
        frp = _number(row.get("frp"))
        focos.append(
            {
                "id": str(row.get("id", "")).strip(),
                "lat": _number(row.get("lat")),
                "lng": _number(row.get("lon")),
                "municipio": _clean_text(row.get("municipio")),
                "estado": _state_to_uf(row.get("estado")),
                "risco": classify_focus_risk(risco_fogo, frp),
                "dataHora": _timestamp(row.get("data_hora_gmt")),
                "satelite": str(row.get("satelite", "")).strip(),
            }
        )
    return focos


def aggregate_current(df: pd.DataFrame) -> list[dict]:
    work = df.copy()
    work["uf"] = work["estado"].map(_state_to_uf)
    work["municipio_limpo"] = work["municipio"].map(_clean_text)
    work["risco_fogo_num"] = pd.to_numeric(work.get("risco_fogo"), errors="coerce").fillna(0)
    work["frp_num"] = pd.to_numeric(work.get("frp"), errors="coerce").fillna(0)
    work["dias_sem_chuva_num"] = pd.to_numeric(work.get("numero_dias_sem_chuva"), errors="coerce").fillna(0)

    estados = []
    for uf, group in work.groupby("uf"):
        municipios = (
            group.groupby("municipio_limpo")
            .size()
            .sort_values(ascending=False)
            .head(5)
            .reset_index(name="focos")
        )
        focos = int(len(group))
        risco = classify_state_risk(focos, float(group["risco_fogo_num"].mean()), float(group["frp_num"].mean()))
        estados.append(
            {
                "id": uf,
                "nome": UF_TO_STATE.get(uf, uf),
                "focos": focos,
                "risco": risco,
                "tendencia": _trend_for_risk(risco),
                "diasSemChuva": int(round(float(group["dias_sem_chuva_num"].mean()))),
                "areaAfetada": int(round(focos * 420)),
                "temperatura": _temperature_estimate(risco),
                "municipiosAfetados": [
                    {"nome": row["municipio_limpo"], "focos": int(row["focos"])}
                    for _, row in municipios.iterrows()
                ],
            }
        )
    return sorted(estados, key=lambda item: item["focos"], reverse=True)


def build_alerts(estados: Iterable[dict]) -> dict[str, dict]:
    alerts = {}
    for estado in estados:
        municipio = estado["municipiosAfetados"][0]["nome"] if estado["municipiosAfetados"] else "sem município crítico"
        risco_label = {"alto": "alto", "medio": "médio", "baixo": "baixo"}[estado["risco"]]
        resumo = (
            f"{estado['nome']} registra {estado['focos']} focos ativos e risco {risco_label}. "
            f"A região mais crítica é {municipio}. Tendência {estado['tendencia']}."
        )
        alerts[estado["id"]] = {
            "estado": estado["id"],
            "risco": estado["risco"],
            "resumo": resumo,
        }
    return alerts


def build_historico(df: pd.DataFrame) -> dict:
    work = df.copy()
    work["data"] = pd.to_datetime(work["data_hora_gmt"], errors="coerce", utc=True)
    work = work.dropna(subset=["data"])
    work["mes"] = work["data"].dt.strftime("%Y-%m")
    work["uf"] = work["estado"].map(_state_to_uf)
    work["municipio_limpo"] = work["municipio"].map(_clean_text)

    evolucao = work.groupby("mes").size().sort_index().reset_index(name="focos")
    estados = work.groupby("uf").size().sort_values(ascending=False).head(10).reset_index(name="focos")
    regioes = (
        work.groupby(["uf", "municipio_limpo"])
        .size()
        .sort_values(ascending=False)
        .head(10)
        .reset_index(name="focos")
    )

    return {
        "evolucaoMensal": [{"mes": row["mes"], "focos": int(row["focos"])} for _, row in evolucao.iterrows()],
        "rankingEstados": [
            {"id": row["uf"], "nome": UF_TO_STATE.get(row["uf"], row["uf"]), "focos": int(row["focos"])}
            for _, row in estados.iterrows()
        ],
        "rankingRegioesCriticas": [
            {"estado": row["uf"], "municipio": row["municipio_limpo"], "focos": int(row["focos"])}
            for _, row in regioes.iterrows()
        ],
    }


def read_csv(path: Path) -> pd.DataFrame:
    return pd.read_csv(path)


def _trend_for_risk(risk: Risk) -> str:
    return {"alto": "subindo", "medio": "estavel", "baixo": "caindo"}[risk]


def _temperature_estimate(risk: Risk) -> int:
    return {"alto": 37, "medio": 32, "baixo": 28}[risk]
