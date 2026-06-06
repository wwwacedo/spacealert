# Evidencias do Projeto SpaceAlert

Este documento resume as evidencias de implementacao das areas do projeto.

## Parte 1 - IA, Automacao e Sistemas Inteligentes

### IA real no frontend

- A pagina inicial exibe um popup de insight de IA ao entrar na aplicacao.
- O componente fica em `components/MapPageClient.tsx`.
- O popup consulta `/api/ai-analysis`.
- A rota fica em `app/api/ai-analysis/route.ts`.
- A logica da IA real fica em `lib/ai-analysis.ts`.
- A variavel `OPENAI_API_KEY` habilita a chamada real para a OpenAI Responses API.
- A variavel opcional `OPENAI_MODEL` define o modelo. Padrao: `gpt-4.1-mini`.
- Se `OPENAI_API_KEY` nao existir, o sistema usa um texto mockado identificado como `mock`.

### Cache por hash dos dados

- A analise usa os arquivos `data/generated/focos.json`, `data/generated/estados.json` e `data/generated/historico.json`.
- O sistema calcula um hash SHA-256 do conteudo desses arquivos.
- O resultado fica armazenado em `data/ai-analysis-cache/<hash>.json`.
- Quando os dados nao mudam, a rota reutiliza o cache e evita nova chamada de IA.
- Quando os dados mudam, o hash muda e uma nova analise e gerada.

### Automacao inteligente de risco

- Pipeline Python em `scripts/inpe_pipeline/`.
- Download de CSV publico do INPE em `scripts/inpe_pipeline/downloader.py`.
- Processamento com Pandas em `scripts/inpe_pipeline/processing.py`.
- Classificacao automatica de risco `baixo`, `medio` e `alto`.
- Teste automatizado em `tests/test_inpe_pipeline.py`.

### Logica aplicada e ganho da IA

- A IA real transforma os dados do INPE em um resumo operacional curto para o usuario.
- O fallback mockado mantem a demonstracao funcionando sem credenciais.
- O ganho principal e reduzir a leitura manual dos dados e destacar rapidamente onde agir primeiro.

### Como configurar a IA real

Crie `.env.local` a partir de `.env.example`:

```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

## Parte 2 - Big Data e Visualizacao

- Processamento com Pandas em `scripts/inpe_pipeline/processing.py`.
- Metricas geradas:
  - `data/generated/estados.json`: focos por estado e ranking de municipios.
  - `data/generated/historico.json`: evolucao mensal, ranking de estados e regioes criticas.
  - `data/generated/focos.json`: focos normalizados para mapa.
- API de historico em `app/api/historico/route.ts`.
- Dashboard historico em `app/historico/page.tsx`.
- Dashboard geral integrado em `app/dashboard/page.tsx` e `components/DashboardClient.tsx`.

## Parte 3 - MVP Full Stack e Experiencia Digital

- App Next.js com React.
- Mapa Leaflet em `components/LeafletMap.tsx`.
- Tela inicial em `app/page.tsx`.
- Tela de dashboard em `app/dashboard/page.tsx`.
- Tela de detalhe de regiao em `app/regiao/[id]/page.tsx`.
- Tela de historico em `app/historico/page.tsx`.
- Integracao com dados reais via `lib/server-data.ts`, usando apenas os arquivos gerados em `data/generated/`.
- IoT foi ignorado por decisao de escopo, portanto este requisito fica parcialmente atendido.

## Parte 4 - DevOps, Seguranca e Qualidade

- Esteira GitHub Actions em `.github/workflows/ci.yml`.
- A CI roda em `push` e `pull_request`.
- A instalacao Node usa `npm ci`.
- A instalacao Python usa `python -m pip install -r requirements.txt`.
- A CI executa lint, typecheck, testes Python, build de producao e auditoria npm de severidade alta ou critica.
- Cache configurado para npm, pip e `.next/cache`.
- Headers basicos de seguranca configurados em `next.config.ts`:
  - `X-Content-Type-Options`
  - `Referrer-Policy`
  - `X-Frame-Options`
  - `Permissions-Policy`

## Matriz de Atendimento dos Requisitos

| Area | Status | Evidencia |
| --- | --- | --- |
| IA, automacao e sistemas inteligentes | Atendido | `/api/ai-analysis`, OpenAI opcional, fallback mockado, cache por hash e classificacao automatica de risco. |
| Big Data, dados e visualizacao | Atendido | Pipeline Pandas, arquivos `data/generated/*.json`, dashboard geral e historico. |
| MVP full stack e experiencia digital | Parcial | Next.js, APIs, mapa e 4 telas funcionais. IoT fora do escopo. |
| DevOps, seguranca e qualidade | Atendido | GitHub Actions, scripts de verificacao, auditoria npm e headers de seguranca. |

## Evidencias de Verificacao

Comandos usados para validar:

```bash
python -m pytest
npm run lint
npm run typecheck
npm run build
npm run audit:high
npm run verify
```

Rotas verificadas:

- `/`
- `/dashboard`
- `/historico`
- `/regiao/TO`
- `/api/focos`
- `/api/estados`
- `/api/historico`
- `/api/ai-analysis`

## Como Rodar

Execucao simples:

```bash
./run.sh
```

No PowerShell:

```powershell
.\run.ps1
```

Regerar dados do INPE antes de iniciar:

```bash
./run.sh --ingest
```

```powershell
.\run.ps1 -Ingest
```

Rodar testes, lint e build antes de iniciar:

```bash
./run.sh --verify
```

```powershell
.\run.ps1 -Verify
```
