# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cachecrime is an open-source investigations unit landing page built with Vite + React + TypeScript. The site is deployed to GitHub Pages at https://cachecrime.github.io via automated workflow on every push to `main`.

## Development Commands

### Local Development
```bash
npm install
npm run dev              # Starts dev server on http://localhost:3000
```

### Build & Deploy
```bash
npm run build           # Build to dist/
npm run preview         # Preview production build
npm run lint            # Type-check with TypeScript (no-emit mode)
npm run clean           # Remove build artifacts
```

### CMS (Decap) - Local Editing
```bash
# Option 1: Separate terminals
npx decap-server        # Terminal 1 — local git proxy (no login required)
npm run dev             # Terminal 2 — then open http://localhost:3000/admin/

# Option 2: Single command (auto-opens browser)
scripts/cms-local.sh    # Starts both services, Ctrl+C to stop
```

## Architecture

### Content Management System (CMS)

The site uses **Decap CMS** (formerly Netlify CMS) for managing investigative stories:

- **Stories**: JSON files in `content/investigations/` (one file per story)
- **CMS Dashboard**: Available at `/admin` route (config: `public/admin/config.yml`)
- **Authentication**:
  - **Local mode**: Run `npx decap-server` for no-login local editing
  - **Remote mode**: OAuth relay via Cloudflare Worker at `oauth-worker/` (see `oauth-worker/SETUP.md` for deployment)
- **Publishing flow**: Editorial workflow (Drafts → In Review → Ready → Publish)
  - Each publish commits to `main` and triggers GitHub Pages rebuild

### CMS-Owned Code Paths

These paths are **excluded from AI Studio sync** (see `scripts/sync-from-ai-studio.sh`):
- `content/` — investigation JSON files
- `public/admin/` — CMS dashboard config
- `public/images/uploads/` — media uploaded via CMS
- `src/cms/` — story rendering system
- `src/pages/Investigations.tsx` — investigation listing page

**Important**: If the Investigations page is redesigned in AI Studio, the redesign must be merged into `src/pages/Investigations.tsx` by hand.

### CMS Rendering System

Located in `src/cms/`:

- **`content.ts`**: Content layer that bundles JSON stories via `import.meta.glob` at build time
  - Exports `stories` array (sorted by date, excludes drafts)
  - Exports TypeScript interfaces for `Story`, `StoryBlock`, `TimelineEvent`, `MapMarker`

- **`blocks.tsx`**: Renderers for story block types
  - `text` — Markdown rendered with `marked` + `DOMPurify`
  - `image` — With optional caption and credit
  - `compare` — Before/after slider comparison
  - `timeline` — Vertical timeline with events
  - `map` — Interactive Leaflet map with OpenStreetMap tiles (no API key)
  - `document` — PDF viewer with embed
  - `video` — YouTube/Vimeo embed or direct video file
  - `quote` — Pull quote with attribution

- **`StoryReader.tsx`**: Full-screen overlay reader
  - Locks scroll when open
  - Portals to `<body>` to escape ancestor transforms
  - Renders story header + block stream
  - Transparency + reader features: byline/authors, publish + last-updated
    dates, reading time, reading-progress bar, content-warning banner,
    auto table of contents (from `##`/`###` headings), "How we verified this"
    methodology panel, numbered sources/evidence, corrections & updates log,
    share (Web Share API + copy-link), and related investigations (by tag)

### Story schema (content.ts)

Beyond the core fields, a story supports: `authors[]` (name/role/url),
`updated`, `featured` (pins to top of list), `contentWarning`, `methodology`
(markdown), `sources[]` ({title,url,note}), and `corrections[]` ({date,note}).
Helpers: `readingTimeMinutes`, `tableOfContents`, `relatedStories`, `allTags`,
`slugifyHeading`. All editable via the CMS at `/admin` (see `config.yml`).

### AI Studio Sync Workflow

The site is primarily designed in **Google AI Studio** and synced to this repo:

- **Script**: `scripts/sync-from-ai-studio.sh <export.zip-or-dir>`
- **Process**:
  1. Extracts/syncs AI Studio export (excluding CMS-owned paths)
  2. Fixes recurring dev-only image path bug (`/src/assets/images/` → `/images/`)
  3. Re-installs CMS renderer dependencies (leaflet, marked, dompurify)
  4. Runs build to verify
  5. Commits and pushes to `main`
- **Warning**: The script checks if `CinematicHero` import is removed from `src/App.tsx` and alerts if wiring needs restoration

### Routing & Navigation

Single-page app with client-side routing in `src/App.tsx`:

- **Pages**: `WhoWeAre`, `Investigations`, `Projects`, `ContactUs`, `StandardPractices`, `PrivacyPolicy`, `Tools`, `Graphics`, `LetsCollaborate`
- **Special components**: `CinematicHero` from `src/sections/` (cinematic home hero, wired into App.tsx)

### Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- Custom CMS styles in `src/cms/cms.css`
- Path alias `@/` resolves to project root (see `vite.config.ts`)

### Build Configuration

- **Vite config** (`vite.config.ts`):
  - React plugin with Motion (framer-motion) support
  - Tailwind CSS plugin
  - Path alias: `@/` → project root
  - HMR disabled when `DISABLE_HMR=true` (AI Studio compatibility)

- **TypeScript** (`tsconfig.json`):
  - Target: ES2022
  - JSX: react-jsx (React 19)
  - Module resolution: bundler
  - Path alias: `@/*` → `./*`
  - `noEmit: true` (type-checking only, Vite handles transpilation)

## Visual Storytelling Standard

Core principle: Cachecrime stories are scroll-driven disclosures of evidence, not articles with images attached. Scroll position paces the reveal of proof, scene by scene.

Reference bar: Reuters Graphics / Mariano Zafra's portfolio (marianozafra.com) is the floor, not the ceiling — award-caliber work (WAN-IFRA, Sigma, Malofiej, Information is Beautiful), not just animation for its own sake.

Default technical stack: React for structure; GSAP + ScrollTrigger for scroll-driven animation and pinned/sticky sections; Mapbox GL JS for geographic narrative; D3 and Recharts for data visualization that animates into view rather than sitting static; Three.js or Blender exports for 3D reconstructions; Lenis optionally for smooth-scroll feel.

Structural patterns: sticky-stage sections with annotated scroll-triggered call-outs (forensic evidence-examination aesthetic, our visual signature); chapter/scene structure with numbered stops rather than infinite scroll; full-bleed cinematic video or image backgrounds behind text; map-tied narrative beats where a location appears or moves as the reader reaches that scene.

Evidence-visual integration rule: every visual claim — a map pin, a 3D reconstruction, a chart — carries the same sourcing bar as prose. Visuals present evidence; they never decorate around a gap in it.

Guardrails: build a reduced-motion fallback so the story still conveys its evidence with animations off; test scroll performance on mid-range Android given Cachecrime's own African audience often on slower connections.

This standard will be refined over time as real stories test it — treat it as a living section, not fixed.

## Editorial & Verification Standards

Before finishing any draft, check that every claim has a source. Flag any weak or missing evidence explicitly instead of guessing. If I override a sourcing flag, keep a record of the override rather than removing it. Treat all output as evidence-first and accessible to a lay reader — no speculation.

## OSINT CLI Toolkit

Tools for investigative research work (not part of the web application):

### General-purpose CLI tools (Homebrew, globally available)

- **exiftool** (v13.55) — metadata extraction from images/videos/documents
- **ffmpeg** — video/audio processing and frame extraction
- **yt-dlp** (2026.08.19) — video download and archiving
- **gdal / gdalinfo** (v3.13.3) — geospatial data processing and reprojection
- **tesseract** (v5.5.3) — OCR on scanned documents/images
- **amass** (v5.1.1) — passive subdomain enumeration and network mapping
- **jq, curl, whois, dig** — standard data-pulling and lookup utilities

### Python-environment tools (deepsearch-env virtual environment)

- **csvkit** (v2.2.0) — CSV data cleaning, joining, querying. Run via `source ~/deepsearch-env/bin/activate` then use `csvstat`, `csvcut`, `csvjoin`, `csvsql`, etc., or use full paths like `~/deepsearch-env/bin/csvstat`.
- **ghunt** (v2.3.4) — Google account OSINT (email, Gaia ID, Drive files, geolocate BSSID, Digital Asset Links). Run via `source ~/deepsearch-env/bin/activate` then `ghunt <command>`, or the full path `~/deepsearch-env/bin/ghunt`.

**Standing rule for ghunt**: ghunt requires `ghunt login`, which authenticates against whatever Google account is used during that login. This must always be the dedicated OSINT throwaway account — never the personal Google account. This applies every time, not just first setup.

### Investigation-specific tools (installed separately, confirm location/status before first use)

- **Osintgram** — Instagram OSINT (~/Osintgram/)
- **sherlock** — username search across social networks (~/sherlock/)
- **twint** — Twitter/X intelligence, legacy scraper (~/twint/)
- **flowsint** — OSINT workflow automation (~/flowsint/)
- **whisper** — audio transcription, OpenAI Whisper (~/whisper/)
- **yesitsme** — profile search tool (~/yesitsme/)
- **deepsearch.py** — custom deep search script (~/deepsearch.py)
- **Malfrats toolkit** — (~/.malfrats/)

## Deployment

- **Platform**: GitHub Pages
- **Workflow**: `.github/workflows/deploy.yml`
  - Triggers on push to `main` or manual dispatch
  - Builds with Node 20, uploads `dist/` artifact, deploys to Pages
- **Live URL**: https://cachecrime.github.io

## Key Dependencies

- **UI**: React 19, Motion (framer-motion), Lucide icons
- **CMS Renderers**: Leaflet (maps), Marked (markdown), DOMPurify (sanitization)
- **Build**: Vite 6, TypeScript 5.8, Tailwind CSS 4
- **OAuth Relay**: Cloudflare Workers (see `oauth-worker/`)

## Development Notes

- **Image paths**: Always use `/images/` (public folder), never `/src/assets/images/` (dev-only, breaks production builds)
- **CMS editing**: When editing CMS-owned files, be aware they're excluded from AI Studio exports
- **Hero wiring**: After AI Studio sync, verify `CinematicHero` is still imported and rendered in `src/App.tsx`
- **Remote CMS login**: Requires OAuth worker deployment (see `oauth-worker/SETUP.md`)
