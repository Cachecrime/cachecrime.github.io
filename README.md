# Cachecrime

Landing page for Cachecrime, an open-source investigations unit based in Nairobi.

Built with Vite + React + TypeScript (exported from Google AI Studio). Deployed
to GitHub Pages at [cachecrime.github.io](https://cachecrime.github.io) via
the workflow in `.github/workflows/deploy.yml`, which runs on every push to
`main`.

## Run locally

**Prerequisites:** Node.js

```
npm install
npm run dev
```

## Build

```
npm run build
```

Output goes to `dist/`.

## CMS (Decap)

Stories live as JSON files in `content/investigations/` and are edited through
the dashboard at `/admin` (schema: `public/admin/config.yml`). Publishing
commits to `main`, which triggers the Pages rebuild.

Local editing (no login required):

```
npx decap-server     # terminal 1 — local git proxy
npm run dev          # terminal 2
# then open http://localhost:3000/admin/
```

Remote login from any browser requires the OAuth relay (see the commented
`base_url` in `public/admin/config.yml`) — not yet deployed.

**CMS-owned paths** (excluded from `scripts/sync-from-ai-studio.sh`; AI Studio
exports do not touch them): `content/`, `public/admin/`,
`public/images/uploads/`, `src/cms/`, `src/pages/Investigations.tsx`. If the
Investigations page is redesigned in AI Studio, that redesign must be merged
into `src/pages/Investigations.tsx` by hand.
