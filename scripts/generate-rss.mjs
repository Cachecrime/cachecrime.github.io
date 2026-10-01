#!/usr/bin/env node
/**
 * Generates public/rss.xml from the published investigations.
 * Runs at build time (GitHub Actions + the AI Studio sync script) so the feed
 * always reflects what's live. public/rss.xml is gitignored (it's generated).
 *
 * NOTE: item links point at the site root for now — deep-linkable per-story
 * URLs need SPA routing changes (tracked separately). Headlines, summaries,
 * dates and categories are all present, which is what aggregators consume.
 */
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE = "https://cachecrime.github.io";
const CONTENT = path.join(ROOT, "content/investigations");
const OUT = path.join(ROOT, "public/rss.xml");

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

let files = [];
try {
  files = (await readdir(CONTENT)).filter((f) => f.endsWith(".json"));
} catch {
  console.warn("generate-rss: no content/investigations dir; skipping");
  process.exit(0);
}

const stories = [];
for (const f of files) {
  try {
    const s = JSON.parse(await readFile(path.join(CONTENT, f), "utf8"));
    if (s.draft) continue;
    s._slug = f.replace(/\.json$/, "");
    stories.push(s);
  } catch (e) {
    console.warn(`generate-rss: skipped ${f} (${e.message})`);
  }
}
stories.sort((a, b) => (a.date < b.date ? 1 : -1));

const items = stories
  .map((s) => {
    const d = new Date(s.date);
    const pub = isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString();
    return `    <item>
      <title>${esc(s.title)}</title>
      <link>${SITE}/</link>
      <guid isPermaLink="false">${esc(s.id || s._slug)}</guid>
      <pubDate>${pub}</pubDate>
      <category>${esc(s.category || "")}</category>
      <description>${esc(s.summary || "")}</description>
    </item>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cachecrime — Investigations</title>
    <link>${SITE}/</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Open-source investigations from Cachecrime. Footage, imagery and documents traced back to their true time and place.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, xml);
console.log(`generate-rss: wrote ${stories.length} item(s) to public/rss.xml`);
