/**
 * Renderers for the investigative story blocks (CMS-owned file).
 * Each block type here has a matching editor widget in public/admin/config.yml.
 */
import React, { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./cms.css";
import type { StoryBlock, TimelineEvent, MapMarker } from "./content";

/* ---------- text (markdown) ---------- */

function TextBlock({ body }: { body: string }) {
  const html = DOMPurify.sanitize(marked.parse(body, { async: false }) as string);
  return <div className="story-prose font-sans" dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ---------- image ---------- */

function ImageBlock({
  src,
  alt,
  caption,
  credit,
}: {
  src: string;
  alt?: string;
  caption?: string;
  credit?: string;
}) {
  return (
    <figure className="flex flex-col gap-2">
      <img src={src} alt={alt ?? caption ?? ""} className="w-full rounded-2xl border border-black/10" loading="lazy" />
      {(caption || credit) && (
        <figcaption className="font-mono text-[10px] text-gray-500 flex justify-between gap-4 px-1">
          <span>{caption}</span>
          {credit && <span className="text-gray-400 shrink-0 uppercase">© {credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------- before/after comparison slider ---------- */

function CompareBlock({
  before,
  after,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  caption,
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="flex flex-col gap-2">
      <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 select-none">
        <img src={before} alt={beforeLabel} className="block w-full" draggable={false} />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img src={after} alt={afterLabel} className="block w-full" draggable={false} />
        </div>
        {/* divider line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_6px_rgba(0,0,0,0.5)] pointer-events-none"
          style={{ left: `${pos}%` }}
        />
        <span className="absolute top-3 right-3 px-2 py-1 rounded bg-black/70 text-white font-mono text-[9px] tracking-widest">
          {beforeLabel}
        </span>
        <span className="absolute top-3 left-3 px-2 py-1 rounded bg-black/70 text-white font-mono text-[9px] tracking-widest">
          {afterLabel}
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Comparison slider"
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>
      {caption && (
        <figcaption className="font-mono text-[10px] text-gray-500 px-1">{caption}</figcaption>
      )}
    </figure>
  );
}

/* ---------- timeline ---------- */

function TimelineBlock({ title, events }: { title?: string; events: TimelineEvent[] }) {
  return (
    <div className="flex flex-col gap-4">
      {title && (
        <span className="font-mono text-[10px] text-[#FF4A1C] font-extrabold tracking-widest uppercase">
          {title}
        </span>
      )}
      <ol className="relative border-l-2 border-black/10 ml-2 flex flex-col gap-6">
        {events.map((ev, i) => (
          <li key={i} className="pl-6 relative">
            <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-[#FF4A1C] border-2 border-white" />
            <span className="font-mono text-[10px] text-gray-400 tracking-wider block">{ev.date}</span>
            <span className="font-sans font-bold text-sm text-black block mt-0.5">{ev.title}</span>
            {ev.body && <p className="font-sans text-xs text-gray-600 leading-relaxed mt-1">{ev.body}</p>}
            {ev.image && (
              <img src={ev.image} alt={ev.title} className="mt-2 rounded-xl border border-black/10 max-w-sm w-full" loading="lazy" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- interactive map (Leaflet + OpenStreetMap, no API key) ---------- */

function MapBlock({
  title,
  center,
  zoom,
  markers,
  caption,
}: {
  title?: string;
  center: { lat: number; lng: number };
  zoom: number;
  markers?: MapMarker[];
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, { scrollWheelZoom: false }).setView(
      [center.lat, center.lng],
      zoom
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    (markers ?? []).forEach((m) => {
      const marker = L.circleMarker([m.lat, m.lng], {
        radius: 8,
        color: "#FF4A1C",
        weight: 2,
        fillColor: "#FF4A1C",
        fillOpacity: 0.5,
      }).addTo(map);
      marker.bindPopup(
        `<strong>${m.label}</strong>${m.body ? `<br/>${m.body}` : ""}`
      );
    });
    // The reader overlay animates in; recalc size once layout settles
    const t = setTimeout(() => map.invalidateSize(), 250);
    return () => {
      clearTimeout(t);
      map.remove();
    };
  }, [center.lat, center.lng, zoom, markers]);

  return (
    <figure className="flex flex-col gap-2">
      {title && (
        <span className="font-mono text-[10px] text-[#FF4A1C] font-extrabold tracking-widest uppercase">
          {title}
        </span>
      )}
      <div ref={ref} className="story-map border border-black/10" />
      {caption && (
        <figcaption className="font-mono text-[10px] text-gray-500 px-1">{caption}</figcaption>
      )}
    </figure>
  );
}

/* ---------- document viewer (PDF) ---------- */

function DocumentBlock({
  title,
  file,
  description,
}: {
  title: string;
  file: string;
  description?: string;
}) {
  // Verify the file actually exists before embedding: a missing path would
  // make the SPA's 404 fallback render the whole site inside the iframe.
  const [state, setState] = useState<"checking" | "ok" | "missing">("checking");
  useEffect(() => {
    let cancelled = false;
    fetch(file, { method: "HEAD" })
      .then((r) => {
        const type = r.headers.get("content-type") ?? "";
        if (!cancelled) setState(r.ok && !type.includes("text/html") ? "ok" : "missing");
      })
      .catch(() => !cancelled && setState("missing"));
    return () => {
      cancelled = true;
    };
  }, [file]);

  return (
    <div className="flex flex-col gap-2 bg-gray-50 border border-black/10 rounded-2xl p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-sans font-bold text-sm text-black">{title}</span>
        {state === "ok" && (
          <a
            href={file}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] font-bold text-[#FF4A1C] uppercase tracking-wider hover:underline shrink-0"
          >
            Open / Download ↗
          </a>
        )}
      </div>
      {description && <p className="font-sans text-xs text-gray-600">{description}</p>}
      {state === "ok" && (
        <iframe
          src={file}
          title={title}
          className="w-full h-[480px] rounded-xl border border-black/10 bg-white"
        />
      )}
      {state === "missing" && (
        <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wider border border-dashed border-black/10 rounded-xl p-6 text-center">
          Document not found at {file}
        </div>
      )}
    </div>
  );
}

/* ---------- video embed ---------- */

function videoEmbedSrc(url: string): string | null {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/
  );
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

function VideoBlock({ url, caption }: { url: string; caption?: string }) {
  const src = videoEmbedSrc(url);
  return (
    <figure className="flex flex-col gap-2">
      {src ? (
        <iframe
          src={src}
          title={caption ?? "Embedded video"}
          className="w-full aspect-video rounded-2xl border border-black/10"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : url.endsWith(".mp4") || url.endsWith(".webm") ? (
        <video src={url} controls className="w-full rounded-2xl border border-black/10" />
      ) : (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#FF4A1C] underline font-sans text-sm">
          {url}
        </a>
      )}
      {caption && (
        <figcaption className="font-mono text-[10px] text-gray-500 px-1">{caption}</figcaption>
      )}
    </figure>
  );
}

/* ---------- pull quote ---------- */

function QuoteBlock({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <blockquote className="border-l-4 border-[#FF4A1C] pl-5 py-1 my-2">
      <p className="font-display font-bold text-lg md:text-xl text-black leading-snug tracking-tight">
        “{text}”
      </p>
      {attribution && (
        <cite className="font-mono text-[10px] text-gray-500 uppercase tracking-wider not-italic block mt-2">
          — {attribution}
        </cite>
      )}
    </blockquote>
  );
}

/* ---------- dispatcher ---------- */

export function BlockRenderer({ block }: { block: StoryBlock }) {
  switch (block.type) {
    case "text":
      return <TextBlock {...block} />;
    case "image":
      return <ImageBlock {...block} />;
    case "compare":
      return <CompareBlock {...block} />;
    case "timeline":
      return <TimelineBlock {...block} />;
    case "map":
      return <MapBlock {...block} />;
    case "document":
      return <DocumentBlock {...block} />;
    case "video":
      return <VideoBlock {...block} />;
    case "quote":
      return <QuoteBlock {...block} />;
    default:
      return null;
  }
}
