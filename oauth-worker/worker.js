/**
 * Decap CMS ↔ GitHub OAuth relay (Cloudflare Worker).
 *
 * GitHub doesn't allow a purely client-side OAuth exchange, so this tiny
 * Worker performs the code→token handshake and hands the token back to the
 * CMS popup. It is the only "backend" the CMS needs.
 *
 * Routes:
 *   /auth       — starts the flow, redirects to GitHub's consent screen
 *   /callback   — GitHub returns here; we swap the code for a token and
 *                 postMessage it to the opener (the /admin window)
 *
 * Secrets (set via `wrangler secret put` or the Cloudflare dashboard):
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 */

const GITHUB_AUTHORIZE = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN = "https://github.com/login/oauth/access_token";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      const redirectUri = `${url.origin}/callback`;
      const authUrl = new URL(GITHUB_AUTHORIZE);
      authUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set("redirect_uri", redirectUri);
      authUrl.searchParams.set("scope", "repo,user");
      authUrl.searchParams.set("state", crypto.randomUUID());
      return Response.redirect(authUrl.toString(), 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) return new Response("Missing code", { status: 400 });

      const tokenRes = await fetch(GITHUB_TOKEN, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const data = await tokenRes.json();

      const status = data.access_token ? "success" : "error";
      const payload = data.access_token
        ? { token: data.access_token, provider: "github" }
        : { error: data.error_description || "OAuth failed" };

      // Hand the result back to the CMS window via postMessage, then close.
      const body = `<!doctype html><html><body><script>
        (function () {
          function send(e) {
            window.opener.postMessage(
              'authorization:github:${status}:' + JSON.stringify(${JSON.stringify(payload)}),
              e.origin
            );
          }
          window.addEventListener('message', send, false);
          window.opener.postMessage('authorizing:github', '*');
        })();
      </script>Logging you in…</body></html>`;

      return new Response(body, { headers: { "Content-Type": "text/html" } });
    }

    return new Response("Cachecrime CMS auth relay. Use /auth to begin.", {
      headers: { "Content-Type": "text/plain" },
    });
  },
};
