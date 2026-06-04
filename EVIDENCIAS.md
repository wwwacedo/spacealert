# Evidências do Projeto SpaceAlert

Este documento resume as evidências de implementação das três fases do projeto.

## Parte 1 — IA e Automação

- Pipeline Python em `scripts/inpe_pipeline/`.
- Download de CSV público do INPE em `scripts/inpe_pipeline/downloader.py`.
- Ingestão via CLI:

```bash
python -m scripts.inpe_pipeline ingest --daily 20260601 --monthly 202605
```

- Classificação automática de risco `baixo`, `medio` e `alto` em `scripts/inpe_pipeline/processing.py`.
- Geração offline de resumo automático por estado em `build_alerts`.
- Saída gerada em `data/generated/alertas.json`.
- Testes TDD em `tests/test_inpe_pipeline.py`.

## Parte 2 — Big Data e Visualização

- Processamento com Pandas em `scripts/inpe_pipeline/processing.py`.
- Métricas geradas:
  - `data/generated/estados.json`: focos por estado e ranking de municípios.
  - `data/generated/historico.json`: evolução mensal, ranking de estados e regiões críticas.
  - `data/generated/focos.json`: focos normalizados para mapa.
- API de histórico em `app/api/historico/route.ts`.
- Dashboard histórico em `app/historico/page.tsx`.
- Dashboard geral integrado em `app/dashboard/page.tsx` e `components/DashboardClient.tsx`.

## Parte 3 — MVP Full Stack + IoT

- App Next.js com React.
- Mapa Leaflet em `components/LeafletMap.tsx`.
- Tela inicial em `app/page.tsx`.
- Tela de dashboard em `app/dashboard/page.tsx`.
- Tela de detalhe de região em `app/regiao/[id]/page.tsx`.
- Tela de histórico em `app/historico/page.tsx`.
- Integração com dados reais via `lib/server-data.ts`, usando apenas os arquivos gerados em `data/generated/`.
- IoT permanece como simulação separada no TinkerCad, conforme escopo original do vídeo.

## Evidências de Verificação

Comandos usados para validar:

```bash
python -m pytest
npm run lint
npm run build
```

Resultado verificado anteriormente:

- `pytest`: 4 testes passando.
- `eslint`: sem erros.
- `next build`: compilação e geração estática concluídas.
- Runtime HTTP: páginas e APIs principais responderam `200`.

Rotas verificadas:

- `/`
- `/dashboard`
- `/historico`
- `/regiao/TO`
- `/api/focos`
- `/api/estados`
- `/api/historico`

## Como Rodar

Execução simples:

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
