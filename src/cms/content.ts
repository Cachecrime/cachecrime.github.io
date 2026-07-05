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
  status: string;
  severity?: string;
  summary: string;
  coverImage?: string;
  tags?: string[];
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
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/** Distinct status values present in the content, for filter buttons. */
export const statusValues: string[] = [
  ...new Set(stories.map((s) => s.status).filter(Boolean)),
];
