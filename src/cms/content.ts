/// <reference types="vite/client" />
/**
 * Content layer for CMS-managed stories.
 *
 * Stories live as JSON files in /content/investigations/ (one file per story),
 * authored either by hand or through the Decap CMS dashboard at /admin.
 * They are bundled at build time via import.meta.glob, so every CMS publish
 * (= git commit) triggers the GitHub Actions rebuild and goes live.
 *
 * This file is CMS-owned: it is excluded from the AI Studio sync script.
 */

export interface TimelineEvent {
  date: string;
  title: string;
  body?: string;
  image?: string;
}

export interface MapMarker {
  lat: number;
  lng: number;
  label: string;
  body?: string;
}

export interface Author {
  name: string;
  role?: string;
  url?: string;
}

/** A cited source / piece of evidence backing the investigation. */
export interface Source {
  title: string;
  url?: string;
  note?: string;
}

/** A transparency-log entry for post-publication corrections or updates. */
export interface Correction {
  date: string;
  note: string;
}

export type StoryBlock =
  | { type: "text"; body: string }
  | { type: "image"; src: string; alt?: string; caption?: string; credit?: string }
  | {
      type: "compare";
      before: string;
      after: string;
      beforeLabel?: string;
      afterLabel?: string;
      caption?: string;
    }
  | { type: "timeline"; title?: string; events: TimelineEvent[] }
  | {
      type: "map";
      title?: string;
      center: { lat: number; lng: number };
      zoom: number;
      markers?: MapMarker[];
      caption?: string;
    }
  | { type: "document"; title: string; file: string; description?: string }
  | { type: "video"; url: string; caption?: string }
  | { type: "quote"; text: string; attribution?: string };

export interface Story {
  slug: string;
  id: string;
  title: string;
  category: string;
  date: string;
  /** Last-updated date, shown when a story has been revised post-publication. */
  updated?: string;
  status: string;
  severity?: string;
  summary: string;
  coverImage?: string;
  tags?: string[];
  authors?: Author[];
  /** Pins the story to the top of the list and marks it as featured. */
  featured?: boolean;
  /** Optional sensitive-content note shown as a banner before the story. */
  contentWarning?: string;
  /** Markdown — "How we verified this": methods, tools, limitations. */
  methodology?: string;
  /** Cited sources / evidence trail. */
  sources?: Source[];
  /** Transparency log of post-publication corrections & updates. */
  corrections?: Correction[];
  draft?: boolean;
  blocks?: StoryBlock[];
}

const modules = import.meta.glob<{ default: Omit<Story, "slug"> }>(
  "../../content/investigations/*.json",
  { eager: true }
);

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.json$/, "");
}

export const stories: Story[] = Object.entries(modules)
  .map(([path, mod]) => ({ ...mod.default, slug: slugFromPath(path) }))
  .filter((s) => !s.draft)
  // Featured first, then newest date
  .sort((a, b) => {
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    return a.date < b.date ? 1 : -1;
  });

/** Distinct status values present in the content, for filter buttons. */
export const statusValues: string[] = [
  ...new Set(stories.map((s) => s.status).filter(Boolean)),
];

/** Distinct tags across all stories, for the tag filter. */
export const allTags: string[] = [
  ...new Set(stories.flatMap((s) => s.tags ?? [])),
].sort((a, b) => a.localeCompare(b));

/* ---------- derived helpers ---------- */

/** Slug for a heading, shared by the ToC and the in-prose heading ids. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function wordCount(s?: string): number {
  if (!s) return 0;
  return s.trim().split(/\s+/).filter(Boolean).length;
}

/** Estimated reading time in minutes (~200 wpm), floor of 1. */
export function readingTimeMinutes(story: Story): number {
  let words = wordCount(story.summary) + wordCount(story.methodology);
  for (const b of story.blocks ?? []) {
    if (b.type === "text") words += wordCount(b.body);
    else if (b.type === "quote") words += wordCount(b.text);
    else if (b.type === "timeline")
      words += b.events.reduce((n, e) => n + wordCount(e.title) + wordCount(e.body), 0);
  }
  return Math.max(1, Math.round(words / 200));
}

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Table of contents built from `##`/`###` headings in the story's text blocks. */
export function tableOfContents(story: Story): TocEntry[] {
  const entries: TocEntry[] = [];
  for (const b of story.blocks ?? []) {
    if (b.type !== "text") continue;
    const re = /^(#{2,3})\s+(.+)$/gm;
    let m: RegExpExecArray | null;
    while ((m = re.exec(b.body)) !== null) {
      const text = m[2].replace(/[#*`]/g, "").trim();
      entries.push({ id: slugifyHeading(text), text, level: m[1].length as 2 | 3 });
    }
  }
  return entries;
}

/** Other published stories sharing at least one tag, ranked by overlap then date. */
export function relatedStories(story: Story, limit = 3): Story[] {
  const tags = new Set(story.tags ?? []);
  if (tags.size === 0) return [];
  return stories
    .filter((s) => s.slug !== story.slug)
    .map((s) => ({ s, overlap: (s.tags ?? []).filter((t) => tags.has(t)).length }))
    .filter((x) => x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || (a.s.date < b.s.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.s);
}
