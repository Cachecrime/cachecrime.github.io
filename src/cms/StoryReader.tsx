/**
 * Full-screen long-form reader for a CMS story (CMS-owned file).
 * Renders the story header + its block stream via BlockRenderer.
 */
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { X, Calendar } from "lucide-react";
import type { Story } from "./content";
import { BlockRenderer } from "./blocks";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function StoryReader({ story, onClose }: { story: Story; onClose: () => void }) {
  // Lock background scroll while the reader is open
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

  // Portal to <body>: ancestor transforms (page animations) otherwise trap the
  // fixed overlay in their stacking context, letting the site nav sit on top.
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex justify-center overflow-y-auto"
      onClick={onClose}
    >
      <motion.article
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-[#E1E1E1] w-full max-w-3xl min-h-full shadow-2xl px-5 sm:px-10 py-10 sm:py-14 flex flex-col gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close story"
          className="sticky top-4 self-end -mb-12 z-10 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#FF4A1C] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Story header */}
        <header className="flex flex-col gap-3 border-b border-black/15 pb-6">
          <span className="font-mono text-[10px] text-[#FF4A1C] font-extrabold tracking-widest uppercase">
            {story.id} — {story.category}
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-black tracking-tight leading-[1.05]">
            {story.title}
          </h1>
          <p className="font-sans text-sm text-gray-600 leading-relaxed max-w-xl">{story.summary}</p>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-gray-500 mt-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> {formatDate(story.date)}
            </span>
            <span>•</span>
            <span className="uppercase font-bold">{story.status}</span>
            {story.tags?.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded bg-black/5 uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>
        </header>

        {story.coverImage && (
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full rounded-2xl border border-black/10"
          />
        )}

        {/* Block stream */}
        <div className="flex flex-col gap-8 pb-10">
          {(story.blocks ?? []).map((block, i) => (
            <React.Fragment key={i}>
              <BlockRenderer block={block} />
            </React.Fragment>
          ))}
        </div>
      </motion.article>
    </motion.div>,
    document.body
  );
}
