# SpaceAlert

SpaceAlert e um MVP full stack para monitoramento de focos de queimada com dados do INPE, dashboard analitico e insight automatizado de IA.

## Requisitos

- Node.js 20+
- Python 3.10+
- npm

## Como Rodar

Instale as dependencias:

```bash
npm install
python -m pip install -r requirements.txt
```

Inicie a aplicacao:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Tambem existem runners completos:

```bash
./run.sh
./run.sh --ingest
./run.sh --verify
```

No PowerShell:

```powershell
.\run.ps1
.\run.ps1 -Ingest
.\run.ps1 -Verify
```

## Pipeline de Dados INPE

O pipeline Python baixa CSVs publicos do INPE, processa com Pandas e gera os arquivos consumidos pelo app:

```bash
python -m scripts.inpe_pipeline ingest --daily 20260601 --monthly 202605
```

Saidas geradas:

- `data/generated/focos.json`
- `data/generated/estados.json`
- `data/generated/historico.json`
- `data/generated/alertas.json`

## Analise de IA

A pagina inicial exibe um popup de insight que consulta `/api/ai-analysis`.

Para usar IA real, crie `.env.local` a partir de `.env.example`:

```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

Sem `OPENAI_API_KEY`, a rota usa um fallback mockado para manter a demonstracao funcionando. O resultado e armazenado em `data/ai-analysis-cache/` com hash dos dados gerados.

## Qualidade e CI

Comandos locais:

```bash
npm run lint
npm run typecheck
npm run test:py
npm run build
npm run audit:high
npm run verify
```

A esteira de CI fica em `.github/workflows/ci.yml` e roda em `push` e `pull_request` com:

- Node.js 20 e `npm ci`
- Python 3.10 e `pip install -r requirements.txt`
- cache de npm, pip e `.next/cache`
- ESLint, TypeScript, pytest, build de producao e auditoria npm para severidade alta ou critica

## Revisao dos Requisitos

| Area | Status | Evidencia |
| --- | --- | --- |
| IA, automacao e sistemas inteligentes | Atendido | `/api/ai-analysis`, OpenAI opcional, fallback mock, cache por hash e classificacao automatica de risco no pipeline. |
| Big Data, dados e visualizacao | Atendido | Ingestao/processamento com Pandas, JSONs gerados, dashboard geral e tela historica. |
| MVP full stack e experiencia digital | Parcial | App Next.js com APIs, mapa e 4 telas funcionais. IoT foi ignorado por decisao de escopo. |
| DevOps, seguranca e qualidade | Atendido | GitHub Actions, scripts de verificacao, headers basicos de seguranca e auditoria de dependencias. |

## Rotas Principais

- `/`
- `/dashboard`
- `/historico`
- `/regiao/[id]`
- `/api/focos`
- `/api/estados`
- `/api/historico`
- `/api/ai-analysis`
