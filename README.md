This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## INPE Pipeline

Install the Python dependencies and run the tests:

```bash
python -m pip install -r requirements.txt
python -m pytest
```

Generate the app data from INPE CSVs:

```bash
python -m scripts.inpe_pipeline ingest --daily 20260601 --monthly 202605
```

The command writes `data/generated/focos.json`, `estados.json`, `historico.json`, and `alertas.json`. The Next.js app uses only those generated INPE files, so run the pipeline before starting the app.

## Run Everything

On Git Bash, WSL, Linux, or macOS:

```bash
./run.sh
```

On Windows PowerShell:

```powershell
.\run.ps1
```

Useful options:

```bash
./run.sh --ingest
./run.sh --verify
```

```powershell
.\run.ps1 -Ingest
.\run.ps1 -Verify
```

See `EVIDENCIAS.md` for the implementation evidence by project phase.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
