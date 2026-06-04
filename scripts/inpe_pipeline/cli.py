from __future__ import annotations

import argparse
import json
from pathlib import Path

from .downloader import daily_url, download_csv, monthly_url
from .processing import aggregate_current, build_alerts, build_historico, normalize_focos, read_csv


ROOT = Path(__file__).resolve().parents[2]
RAW_DIR = ROOT / "data" / "raw" / "inpe"
GENERATED_DIR = ROOT / "data" / "generated"


def ingest(daily: str, monthly: str, skip_download: bool = False) -> None:
    daily_path = RAW_DIR / f"focos_diario_br_{daily}.csv"
    monthly_path = RAW_DIR / f"focos_mensal_br_{monthly}.csv"

    if not skip_download:
        download_csv(daily_url(daily), daily_path)
        download_csv(monthly_url(monthly), monthly_path)

    daily_df = read_csv(daily_path)
    monthly_df = read_csv(monthly_path)

    focos = normalize_focos(daily_df)
    estados = aggregate_current(daily_df)
    historico = build_historico(monthly_df)
    alertas = build_alerts(estados)

    GENERATED_DIR.mkdir(parents=True, exist_ok=True)
    _write_json(GENERATED_DIR / "focos.json", focos)
    _write_json(GENERATED_DIR / "estados.json", estados)
    _write_json(GENERATED_DIR / "historico.json", historico)
    _write_json(GENERATED_DIR / "alertas.json", alertas)


def _write_json(path: Path, data: object) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Ingest INPE fire-focus CSVs for SpaceAlert.")
    subparsers = parser.add_subparsers(dest="command", required=True)
    ingest_parser = subparsers.add_parser("ingest", help="Download/process INPE CSVs and export app JSON.")
    ingest_parser.add_argument("--daily", required=True, help="Daily file date in YYYYMMDD, e.g. 20260601.")
    ingest_parser.add_argument("--monthly", required=True, help="Monthly file date in YYYYMM, e.g. 202605.")
    ingest_parser.add_argument("--skip-download", action="store_true", help="Use existing CSVs in data/raw/inpe.")

    args = parser.parse_args()
    if args.command == "ingest":
        ingest(args.daily, args.monthly, args.skip_download)


if __name__ == "__main__":
    main()
