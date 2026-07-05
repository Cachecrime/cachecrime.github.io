#!/bin/bash
# One-command local CMS: starts the Decap git proxy + the dev server,
# opens the dashboard in the browser, and shuts everything down when
# this terminal window is closed (or Ctrl+C).

set -e
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Kill both background processes when the script exits
trap 'kill 0' EXIT

echo "==> Starting Cachecrime CMS (close this window to stop)"
npx decap-server &

# Give the servers a moment, then open the dashboard
(sleep 5 && open "http://localhost:3000/admin/") &

npm run dev
