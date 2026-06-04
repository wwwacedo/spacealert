param(
  [switch]$Ingest,
  [switch]$Verify,
  [switch]$SkipInstall,
  [string]$DailyDate = $(if ($env:DAILY_DATE) { $env:DAILY_DATE } else { "20260601" }),
  [string]$MonthlyDate = $(if ($env:MONTHLY_DATE) { $env:MONTHLY_DATE } else { "202605" }),
  [int]$Port = $(if ($env:PORT) { [int]$env:PORT } else { 3000 })
)

$ErrorActionPreference = "Stop"

function Test-Command {
  param([string]$Name)
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

if (-not (Test-Command "npm")) {
  Write-Error "npm is required. Install Node.js first."
}

$PythonBin = $null
if (Test-Command "python") {
  $PythonBin = "python"
} elseif (Test-Command "py") {
  $PythonBin = "py"
} elseif (Test-Command "python3") {
  $PythonBin = "python3"
} else {
  Write-Error "Python is required. Install Python 3 first."
}

if (-not $SkipInstall) {
  if (-not (Test-Path -LiteralPath "node_modules")) {
    Write-Host "Installing Node dependencies..."
    npm install
  }

  Write-Host "Installing Python dependencies..."
  & $PythonBin -m pip install -r requirements.txt
}

$GeneratedFiles = @(
  "data/generated/focos.json",
  "data/generated/estados.json",
  "data/generated/historico.json",
  "data/generated/alertas.json"
)

$MissingGeneratedData = $false
foreach ($File in $GeneratedFiles) {
  if (-not (Test-Path -LiteralPath $File)) {
    $MissingGeneratedData = $true
    break
  }
}

if ($Ingest -or $MissingGeneratedData) {
  Write-Host "Generating INPE data..."
  & $PythonBin -m scripts.inpe_pipeline ingest --daily $DailyDate --monthly $MonthlyDate
} else {
  Write-Host "Using existing data/generated/*.json files."
}

if ($Verify) {
  Write-Host "Running Python tests..."
  & $PythonBin -m pytest

  Write-Host "Running ESLint..."
  npm run lint

  Write-Host "Running production build..."
  npm run build
}

Write-Host "Starting SpaceAlert on http://localhost:$Port"
$env:PORT = [string]$Port
npm run dev
