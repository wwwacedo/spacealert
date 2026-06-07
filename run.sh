#!/usr/bin/env bash
set -euo pipefail

DAILY_DATE="${DAILY_DATE:-20260601}"
MONTHLY_DATE="${MONTHLY_DATE:-202605}"
PORT="${PORT:-3000}"
INGEST=false
VERIFY=false
SKIP_INSTALL=false

for arg in "$@"; do
  case "$arg" in
    --ingest)
      INGEST=true
      ;;
    --verify)
      VERIFY=true
      ;;
    --skip-install)
      SKIP_INSTALL=true
      ;;
    -h|--help)
      cat <<'HELP'
SpaceAlert runner

Usage:
  ./run.sh [--ingest] [--verify] [--skip-install]

Options:
  --ingest        Re-download/process INPE CSVs before starting the app.
  --verify        Run pytest, lint, and Next build before starting the app.
  --skip-install  Skip npm and Python dependency installation.

Environment:
  DAILY_DATE=20260601    INPE daily CSV date.
  MONTHLY_DATE=202605    INPE monthly CSV date.
  PORT=3000              Next.js dev server port.
HELP
      exit 0
      ;;
    *)
      echo "Unknown option: $arg"
      echo "Run ./run.sh --help for usage."
      exit 1
      ;;
  esac
done

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required. Install Node.js first."
  exit 1
fi

PYTHON_BIN=""
if command -v python >/dev/null 2>&1; then
  PYTHON_BIN="python"
elif command -v python3 >/dev/null 2>&1; then
  PYTHON_BIN="python3"
else
  echo "Python is required. Install Python 3 first."
  exit 1
fi

if [ "$SKIP_INSTALL" = false ]; then
  if [ ! -d node_modules ]; then
    echo "Installing Node dependencies..."
    npm install
  fi

  echo "Installing Python dependencies..."
  "$PYTHON_BIN" -m pip install -r requirements.txt
fi

if [ "$INGEST" = true ] || [ ! -f data/generated/focos.json ] || [ ! -f data/generated/estados.json ] || [ ! -f data/generated/historico.json ] || [ ! -f data/generated/alertas.json ]; then
  echo "Generating INPE data..."
  "$PYTHON_BIN" -m scripts.inpe_pipeline ingest --daily "$DAILY_DATE" --monthly "$MONTHLY_DATE"
else
  echo "Using existing data/generated/*.json files."
fi

if [ "$VERIFY" = true ]; then
  echo "Running Python tests..."
  "$PYTHON_BIN" -m pytest

  echo "Running ESLint..."
  npm run lint

  echo "Running production build..."
  npm run build
fi

echo "Starting SpaceAlert on http://localhost:$PORT"
PORT="$PORT" npm run dev
