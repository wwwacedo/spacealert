from io import StringIO

import pandas as pd

from scripts.inpe_pipeline.processing import (
    aggregate_current,
    build_alerts,
    build_historico,
    classify_state_risk,
    normalize_focos,
)


CSV = """id,lat,lon,data_hora_gmt,satelite,municipio,estado,pais,municipio_id,estado_id,pais_id,numero_dias_sem_chuva,precipitacao,risco_fogo,bioma,frp
a1, -10.1, -55.2,2026-06-01 10:00:00,AQUA_M-T,SINOP,MATO GROSSO,Brasil,1,51,33,22,0,0.95,Cerrado,70
a2, -10.2, -55.3,2026-06-01 11:00:00,TERRA_M-T,SINOP,MATO GROSSO,Brasil,1,51,33,24,0,0.80,Cerrado,45
a3, -3.1, -48.2,2026-06-01 12:00:00,GOES-19,MARABA,PARA,Brasil,2,15,33,4,1,0.20,Amazônia,8
"""


def read_sample():
    return pd.read_csv(StringIO(CSV))


def test_normalize_focos_matches_next_contract():
    focos = normalize_focos(read_sample())

    assert focos[0] == {
        "id": "a1",
        "lat": -10.1,
        "lng": -55.2,
        "municipio": "Sinop",
        "estado": "MT",
        "risco": "alto",
        "dataHora": "2026-06-01T10:00:00Z",
        "satelite": "AQUA_M-T",
    }
    assert set(focos[0]) == {"id", "lat", "lng", "municipio", "estado", "risco", "dataHora", "satelite"}


def test_classify_state_risk_thresholds():
    assert classify_state_risk(focos=120, avg_risco_fogo=0.1, avg_frp=5) == "alto"
    assert classify_state_risk(focos=10, avg_risco_fogo=0.82, avg_frp=5) == "alto"
    assert classify_state_risk(focos=10, avg_risco_fogo=0.3, avg_frp=55) == "alto"
    assert classify_state_risk(focos=35, avg_risco_fogo=0.3, avg_frp=5) == "medio"
    assert classify_state_risk(focos=5, avg_risco_fogo=0.2, avg_frp=4) == "baixo"


def test_aggregate_current_builds_state_summaries_and_alerts():
    estados = aggregate_current(read_sample())
    mt = estados[0]

    assert mt["id"] == "MT"
    assert mt["nome"] == "Mato Grosso"
    assert mt["focos"] == 2
    assert mt["risco"] == "alto"
    assert mt["tendencia"] == "subindo"
    assert mt["diasSemChuva"] == 23
    assert mt["municipiosAfetados"] == [{"nome": "Sinop", "focos": 2}]

    alertas = build_alerts(estados)
    assert alertas["MT"]["risco"] == "alto"
    assert "Mato Grosso" in alertas["MT"]["resumo"]
    assert "2 focos" in alertas["MT"]["resumo"]


def test_build_historico_monthly_metrics():
    df = read_sample()
    df.loc[0, "data_hora_gmt"] = "2026-05-01 10:00:00"

    historico = build_historico(df)

    assert historico["evolucaoMensal"] == [
        {"mes": "2026-05", "focos": 1},
        {"mes": "2026-06", "focos": 2},
    ]
    assert historico["rankingEstados"][0]["id"] == "MT"
    assert historico["rankingRegioesCriticas"][0]["municipio"] == "Sinop"
    assert set(historico) == {"evolucaoMensal", "rankingEstados", "rankingRegioesCriticas"}
