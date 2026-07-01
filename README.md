# Cachecrime.github.io

Landing page for **Cachecrime** — OSINT & visual investigations covering African affairs.

Plain HTML/CSS/JS, no build step. Fonts load from Google Fonts CDN at runtime.

## Before you go live

Replace these placeholders in `index.html`:
- `tips@cachecrime.org` and `hello@cachecrime.org` — real contact addresses
- `https://github.com/cachecrime` and the `X` link in the footer — real social links
- The two case files under `#work` — swap in/add investigations as they publish
- `© 2026 CACHECRIME` in the footer if the org name or year changes

## Local preview

Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

See the setup steps provided alongside this file, or:

1. Create a repo named exactly `Cachecrime.github.io` under your GitHub account/org.
2. Push this folder's contents to the `main` branch.
3. GitHub Pages serves it automatically at `https://cachecrime.github.io` — no extra config needed since the repo name matches the `<username>.github.io` pattern.
4. First deploy can take 1-2 minutes. Check the "Pages" tab in repo Settings for the live status.

## Custom domain (optional)

If you later point a real domain (e.g. `cachecrime.org`) at this:
1. Add a `CNAME` file to the repo root containing just the domain name.
2. Add the DNS records GitHub Pages requests in Settings → Pages → Custom domain.
