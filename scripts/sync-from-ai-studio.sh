#!/bin/bash
# Merges a fresh Google AI Studio export into this repo, fixes the recurring
# dev-only image path bug, verifies the build, then commits and pushes.
#
# Usage: scripts/sync-from-ai-studio.sh <path-to-export.zip-or-extracted-dir>

set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: $0 <path-to-export.zip-or-extracted-dir>" >&2
  exit 1
fi

SOURCE="$1"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKDIR=""

cleanup() {
  [ -n "$WORKDIR" ] && rm -rf "$WORKDIR"
}
trap cleanup EXIT

if [ -f "$SOURCE" ]; then
  case "$SOURCE" in
    *.zip)
      WORKDIR="$(mktemp -d)"
      unzip -q -o "$SOURCE" -d "$WORKDIR"
      SOURCE="$WORKDIR"
      ;;
    *)
      echo "Expected a .zip file or a directory: $SOURCE" >&2
      exit 1
      ;;
  esac
elif [ ! -d "$SOURCE" ]; then
  echo "Not found: $SOURCE" >&2
  exit 1
fi

echo "==> Syncing export from $SOURCE into $REPO_ROOT"
# CMS-owned paths (content/, public/admin, uploads, src/cms, Investigations page)
# are excluded so AI Studio exports never wipe CMS data or integration code.
# NOTE: if the Investigations page is redesigned in AI Studio, that redesign is
# intentionally NOT applied — it must be merged by hand into the CMS version.
rsync -a --delete \
  --exclude '.git' \
  --exclude '.github' \
  --exclude 'scripts' \
  --exclude 'README.md' \
  --exclude '.gitignore' \
  --exclude 'node_modules' \
  --exclude 'dist' \
  --exclude '.env' \
  --exclude '.env.local' \
  --exclude 'content' \
  --exclude 'public/admin' \
  --exclude 'public/images/uploads' \
  --exclude 'src/cms' \
  --exclude 'src/sections' \
  --exclude 'src/pages/Investigations.tsx' \
  "$SOURCE"/ "$REPO_ROOT"/

# The cinematic hero lives in src/sections/ (protected above) but is wired
# into src/App.tsx, which this sync just overwrote. Warn if the wiring is gone.
if ! grep -q "CinematicHero" "$REPO_ROOT/src/App.tsx"; then
  echo ""
  echo "!! WARNING: src/App.tsx no longer renders <CinematicHero />."
  echo "!! The AI Studio export replaced the home hero wiring — re-add the"
  echo "!! import and render (see src/sections/CinematicHero.tsx header note)."
  echo ""
fi

cd "$REPO_ROOT"

# AI Studio always exports images referenced as /src/assets/images/..., which
# only resolves in Vite's dev server, not in a production build. Move them to
# public/ and rewrite the references so the build actually finds them.
if [ -d src/assets/images ]; then
  echo "==> Fixing dev-only image paths"
  mkdir -p public/images
  cp -n src/assets/images/* public/images/ 2>/dev/null || true
  grep -rl '/src/assets/images' src/ | xargs -r sed -i '' 's#/src/assets/images/#/images/#g'
  rm -rf src/assets/images
  rmdir src/assets 2>/dev/null || true
fi

echo "==> Installing dependencies"
npm install --silent

# AI Studio exports overwrite package.json without the CMS renderer deps —
# re-ensure them (no-op when already present at a matching version)
npm install --silent leaflet marked dompurify
npm install --silent -D @types/leaflet

echo "==> Building to verify"
npm run build

if git diff --quiet && git diff --cached --quiet; then
  echo "==> No changes to commit."
  exit 0
fi

git add -A
git commit -m "Sync from AI Studio export ($(date '+%Y-%m-%d %H:%M'))"
git push origin main

echo "==> Done. GitHub Actions will build and publish to cachecrime.github.io."
