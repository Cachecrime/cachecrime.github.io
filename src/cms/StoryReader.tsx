/**
 * Full-screen long-form reader for a CMS story (CMS-owned file).
 *
 * Beyond the block stream it renders the transparency + reader-experience
 * features expected of a modern investigative outlet:
 *  - reading-progress bar + estimated reading time
 *  - byline, publish + last-updated dates
 *  - content-warning banner
 *  - table of contents (from headings)
 *  - "How we verified this" methodology panel
 *  - numbered sources / evidence trail
 *  - corrections & updates log
 *  - share (Web Share API + copy-link fallback)
 *  - related investigations
 */
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import {
  X,
  Calendar,
  Clock,
  RefreshCw,
  AlertTriangle,
  ListTree,
  ShieldCheck,
  Link2,
  Share2,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import {
  type Story,
  readingTimeMinutes,
  tableOfContents,
  relatedStories,
} from "./content";
import { BlockRenderer, Markdown } from "./blocks";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function StoryReader({
  story,
  onClose,
  onOpenStory,
}: {
  story: Story;
  onClose: () => void;
  onOpenStory?: (s: Story) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const toc = tableOfContents(story);
  const related = relatedStories(story);
  const minutes = readingTimeMinutes(story);

  // Lock background scroll + Escape-to-close while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Reading-progress bar driven by the overlay's own scroll position
  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
  };

  // Anchor-scroll to a heading within the overlay (native anchors can't reach
  // inside the scroll container)
  const scrollToHeading = (id: string) => {
    const el = scrollRef.current?.querySelector(`#${CSS.escape(id)}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const share = async () => {
    const url = window.location.href;
    const shareData = { title: `${story.title} — Cachecrime`, text: story.summary, url };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(`${story.title} — ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return createPortal(
    <motion.div
      ref={scrollRef}
      onScroll={onScroll}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex justify-center overflow-y-auto"
      onClick={onClose}
    >
      {/* Reading-progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#FF4A1C] z-[110] transition-[width] duration-75"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />

      <motion.article
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-[#E1E1E1] w-full max-w-3xl min-h-full shadow-2xl px-5 sm:px-10 py-10 sm:py-14 flex flex-col gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top action row: share + close */}
        <div className="sticky top-4 self-end -mb-12 z-10 flex items-center gap-2">
          <button
            onClick={share}
            aria-label="Share story"
            className="h-10 px-3 rounded-full bg-black text-white flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider hover:bg-[#FF4A1C] transition-colors"
          >
            {copied ? <Link2 className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {copied ? "Copied" : "Share"}
          </button>
          <button
            onClick={onClose}
            aria-label="Close story"
            className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#FF4A1C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story header */}
        <header className="flex flex-col gap-3 border-b border-black/15 pb-6">
          <span className="font-mono text-[10px] text-[#FF4A1C] font-extrabold tracking-widest uppercase">
            {story.id} — {story.category}
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-black tracking-tight leading-[1.05]">
            {story.title}
          </h1>
          <p className="font-sans text-sm text-gray-600 leading-relaxed max-w-xl">{story.summary}</p>

          {/* Byline */}
          {story.authors && story.authors.length > 0 && (
            <p className="font-sans text-xs text-gray-700">
              By{" "}
              {story.authors.map((a, i) => (
                <React.Fragment key={a.name}>
                  {i > 0 && (i === story.authors!.length - 1 ? " and " : ", ")}
                  {a.url ? (
                    <a href={a.url} target="_blank" rel="noopener noreferrer" className="font-bold text-black hover:text-[#FF4A1C]">
                      {a.name}
                    </a>
                  ) : (
                    <span className="font-bold text-black">{a.name}</span>
                  )}
                  {a.role && <span className="text-gray-500"> ({a.role})</span>}
                </React.Fragment>
              ))}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] text-gray-500 mt-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> {formatDate(story.date)}
            </span>
            {story.updated && (
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-3 h-3" /> Updated {formatDate(story.updated)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> {minutes} min read
            </span>
            <span className="uppercase font-bold">{story.status}</span>
            {story.tags?.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded bg-black/5 uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* Content warning */}
        {story.contentWarning && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-300 rounded-2xl p-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-0.5">
                Content warning
              </span>
              <p className="font-sans text-xs text-amber-900 leading-relaxed">{story.contentWarning}</p>
            </div>
          </div>
        )}

        {story.coverImage && (
          <img src={story.coverImage} alt={story.title} className="w-full rounded-2xl border border-black/10" />
        )}

        {/* Table of contents */}
        {toc.length > 1 && (
          <nav className="bg-white/60 border border-black/10 rounded-2xl p-5" aria-label="Table of contents">
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">
              <ListTree className="w-4 h-4" /> In this investigation
            </div>
            <ol className="flex flex-col gap-1.5">
              {toc.map((e, i) => (
                <li key={`${e.id}-${i}`} className={e.level === 3 ? "pl-4" : ""}>
                  <button
                    onClick={() => scrollToHeading(e.id)}
                    className="text-left font-sans text-xs text-gray-700 hover:text-[#FF4A1C] transition-colors"
                  >
                    {e.text}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Block stream */}
        <div className="flex flex-col gap-8">
          {(story.blocks ?? []).map((block, i) => (
            <React.Fragment key={i}>
              <BlockRenderer block={block} />
            </React.Fragment>
          ))}
        </div>

        {/* Methodology — "How we verified this" */}
        {story.methodology && (
          <section className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF4A1C]">
              <ShieldCheck className="w-4 h-4" /> How we verified this
            </div>
            <Markdown body={story.methodology} />
          </section>
        )}

        {/* Sources / evidence trail */}
        {story.sources && story.sources.length > 0 && (
          <section className="flex flex-col gap-3">
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Sources & evidence
            </div>
            <ol className="flex flex-col gap-2 list-decimal pl-5">
              {story.sources.map((s, i) => (
                <li key={i} className="font-sans text-xs text-gray-700 leading-relaxed">
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-black hover:text-[#FF4A1C] inline-flex items-center gap-1"
                    >
                      {s.title} <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="font-semibold text-black">{s.title}</span>
                  )}
                  {s.note && <span className="text-gray-500"> — {s.note}</span>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Corrections & updates log */}
        {story.corrections && story.corrections.length > 0 && (
          <section className="bg-gray-50 border border-black/10 rounded-2xl p-5 flex flex-col gap-3">
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Corrections & updates
            </div>
            <ul className="flex flex-col gap-2">
              {story.corrections.map((c, i) => (
                <li key={i} className="font-sans text-xs text-gray-700 leading-relaxed">
                  <span className="font-mono text-[10px] text-gray-500">{formatDate(c.date)} — </span>
                  {c.note}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related investigations */}
        {related.length > 0 && (
          <section className="border-t border-black/15 pt-6 flex flex-col gap-4">
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Related investigations
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <button
                  key={r.slug}
                  onClick={() => (onOpenStory ? onOpenStory(r) : undefined)}
                  disabled={!onOpenStory}
                  className="text-left bg-white border border-black/10 rounded-2xl p-4 hover:border-[#FF4A1C] hover:shadow-sm transition-all group disabled:cursor-default"
                >
                  <span className="font-mono text-[9px] text-[#FF4A1C] font-extrabold tracking-widest block mb-1">
                    {r.id}
                  </span>
                  <span className="font-sans font-bold text-sm text-black leading-snug flex items-start justify-between gap-2 group-hover:text-[#FF4A1C] transition-colors">
                    {r.title}
                    <ArrowUpRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}
      </motion.article>
    </motion.div>,
    document.body
  );
}
