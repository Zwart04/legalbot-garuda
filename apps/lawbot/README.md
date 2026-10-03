# lawbot

AI Indonesian Legal Q&A for UMKM

Source: https://github.com/Zwart04/lawbot

## Run locally

Requires Node.js 22+ and npm.

```sh
npm ci
npm run dev
```

## Reproducible validation

```sh
npm run typecheck
npm run build
```

TypeScript errors are not hidden by the production configuration. GitHub Actions repeats these checks for each change.

## Deployment

Cloudflare configuration: `wrangler.jsonc`. Intended free-hosting address: https://lawbot-app.zwart.qzz.io
This address is verified in the rebuild report only after a successful deployment and HTTP/browser checks.

Static output is generated in `out/`. After `npx wrangler login`, publish with `npx wrangler deploy`.

## Application routes

- `/`
- `/analytics`
- `/compliance`
- `/dashboard`
- `/finance-journal`
- `/login`
- `/questionnaire`
- `/register`
- `/risk-analysis`
- `/settings`
- `/template-generator`
- `/uu-database`

## Data and feature boundaries

Browser-local data is tied to this browser and origin. Export your data before clearing storage or moving between deployment URLs. Local/demo sign-in is not secure multi-user authentication. A deployed page does not prove that external AI, WhatsApp, GPS, telemetry, payments, or other provider integrations are connected. Any simulated dataset must be distinguished from live data in the UI.

The previous README is retained in `docs/README-before-rebuild.md` for historical reference; its feature claims are not validation evidence.
