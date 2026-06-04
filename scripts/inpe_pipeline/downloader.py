from pathlib import Path

import requests


BASE_URL = "https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv"


def daily_url(date_yyyymmdd: str) -> str:
    return f"{BASE_URL}/diario/Brasil/focos_diario_br_{date_yyyymmdd}.csv"


def monthly_url(month_yyyymm: str) -> str:
    return f"{BASE_URL}/mensal/Brasil/focos_mensal_br_{month_yyyymm}.csv"


def download_csv(url: str, destination: Path) -> Path:
    destination.parent.mkdir(parents=True, exist_ok=True)
    response = requests.get(url, timeout=60)
    response.raise_for_status()
    destination.write_bytes(response.content)
    return destination
