#!/usr/bin/env node
/**
 * Normalises index.html's <head> so our customisations survive AI Studio
 * syncs (which overwrite index.html). Idempotent — safe to run every build.
 *
 * It (1) forces the browser-tab title, and (2) injects a managed block before
 * </head> containing RSS autodiscovery + the analytics snippet
 * (scripts/analytics-snippet.html).
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INDEX = path.join(ROOT, "index.html");
const SNIPPET = path.join(ROOT, "scripts/analytics-snippet.html");

const START = "<!-- cc:head:start -->";
const END = "<!-- cc:head:end -->";

let html;
try {
  html = await readFile(INDEX, "utf8");
} catch {
  console.warn("fix-index-head: no index.html; skipping");
  process.exit(0);
}

// 1) Force the title
html = html.replace(/<title>.*?<\/title>/s, "<title>Cache Crime</title>");

// 2) Build the managed head block
let analytics = "";
try {
  analytics = (await readFile(SNIPPET, "utf8")).trim();
} catch {
  /* no snippet file — fine */
}
const block = `${START}
    <link rel="alternate" type="application/rss+xml" title="Cachecrime — Investigations" href="/rss.xml" />
    <meta name="description" content="Open-source investigations from Cachecrime. Footage, imagery and documents traced back to their true time and place." />
    ${analytics}
    ${END}`;

// 3) Replace an existing managed block, or insert before </head>
const re = new RegExp(`${START}[\\s\\S]*?${END}`);
if (re.test(html)) {
  html = html.replace(re, block);
} else if (html.includes("</head>")) {
  html = html.replace("</head>", `  ${block}\n  </head>`);
}

await writeFile(INDEX, html);
console.log("fix-index-head: normalised index.html <head>");
