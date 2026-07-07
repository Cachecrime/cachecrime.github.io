# Phase C — Remote CMS login (WordPress-style)

Goal: log in at `https://cachecrime.github.io/admin/` from any browser, no
terminal. This needs two free accounts wired together, once.

## Step 1 — GitHub OAuth App (as the Cachecrime account)

1. Go to https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**
2. Fill in:
   - **Application name:** `Cachecrime CMS`
   - **Homepage URL:** `https://cachecrime.github.io`
   - **Authorization callback URL:** `https://cachecrime-cms-auth.<your-subdomain>.workers.dev/callback`
     *(you'll get the real Worker URL in Step 2 — use a placeholder now, edit after)*
3. **Register application** → copy the **Client ID**, then **Generate a new client secret** → copy it.
   Keep both somewhere safe for Step 2.

## Step 2 — Deploy the Cloudflare Worker

1. Create a free account at https://dash.cloudflare.com/sign-up
2. In this folder:
   ```
   cd oauth-worker
   npx wrangler login          # opens the browser to authorise
   npx wrangler deploy         # prints your Worker URL
   npx wrangler secret put GITHUB_CLIENT_ID       # paste the Client ID
   npx wrangler secret put GITHUB_CLIENT_SECRET   # paste the secret
   ```
3. Copy the Worker URL it printed (e.g. `https://cachecrime-cms-auth.<sub>.workers.dev`).
4. Go back to the GitHub OAuth App (Step 1) and set the **Authorization callback URL**
   to `<that Worker URL>/callback`.

## Step 3 — Point the CMS at the Worker

In `public/admin/config.yml`, under `backend:`, uncomment and set:
```yaml
  base_url: https://cachecrime-cms-auth.<your-subdomain>.workers.dev
  auth_endpoint: /auth
```
Commit + push. Done — visit `https://cachecrime.github.io/admin/` and
"Login with GitHub" works from anywhere.
