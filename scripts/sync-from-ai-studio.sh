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
  "$SOURCE"/ "$REPO_ROOT"/

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
