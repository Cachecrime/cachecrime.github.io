/**
 * CinematicHero — dark, framed home hero (CMS-protected file).
 *
 * Layout language: dark rounded card, numbered section rail on the left,
 * centered figure blended into the background, monumental headline right,
 * evidence strip along the bottom fed by the two latest CMS case files.
 *
 * NOTE: wired into src/App.tsx (AI Studio-owned). After an AI Studio sync the
 * one-line import + <CinematicHero /> render must be re-added — the sync
 * script prints a reminder.
 */
import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { stories } from "../cms/content";

const INK = "#131110"; // warm near-black card background

/* Staggered entrance for the text layers */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();
}

export default function CinematicHero({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  const latest = stories.slice(0, 2);

  return (
    <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col z-10 h-screen min-h-[640px] md:min-h-[700px] pt-[84px] md:pt-[100px] pb-4 md:pb-6">
      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex-1 min-h-0 rounded-[28px] md:rounded-[36px] overflow-hidden flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
        style={{ backgroundColor: INK }}
      >
        {/* ---- Figure, blended into the ink background (slow settle-in) ---- */}
        <motion.img
          src="/images/robert_park_hoodie_1783181706940.jpg"
          alt=""
          aria-hidden="true"
          initial={{ scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-[8%] md:left-[22%] h-full w-[92%] md:w-[46%] object-cover object-top opacity-90 -scale-x-100"
        />
        {/* Mobile: dim the figure so text stays legible over the bright hoodie */}
        <div className="absolute inset-0 md:hidden pointer-events-none" style={{ backgroundColor: "rgba(19,17,16,0.45)" }} />
        {/* Blend gradients: fold the photo's edges into the card */}
        <div
          className="absolute inset-y-0 left-0 w-[55%] pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${INK} 12%, transparent 65%)` }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[55%] pointer-events-none"
          style={{ background: `linear-gradient(270deg, ${INK} 26%, transparent 70%)` }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none"
          style={{ background: `linear-gradient(0deg, ${INK} 22%, transparent 85%)` }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[22%] pointer-events-none"
          style={{ background: `linear-gradient(180deg, ${INK} 0%, transparent 90%)` }}
        />
        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* ---- Content layers ---- */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 flex-1 flex flex-col px-5 sm:px-8 md:px-12 pt-6 md:pt-8 min-h-0"
        >
          {/* Top row */}
          <motion.div
            variants={rise}
            className="flex items-center justify-between font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-white/45 uppercase"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A1C] animate-pulse" />
              Open-source investigations
            </span>
            <span className="hidden sm:block">Nairobi — 01°17′S 36°49′E</span>
          </motion.div>

          {/* Middle: rail left, headline right */}
          <div className="flex-1 grid grid-cols-12 items-center gap-4 min-h-0">
            {/* Section rail */}
            <motion.div variants={rise} className="hidden md:flex col-span-3 flex-col gap-3 self-center">
              <span className="font-mono text-[11px] text-white/80 tracking-widest">/ 01</span>
              <span className="w-10 h-[2px] bg-[#FF4A1C]" />
              <div className="flex flex-col gap-1.5 mt-1">
                <button
                  onClick={() => onNavigate("investigations")}
                  className="text-left font-sans font-bold text-sm text-white hover:text-[#FF4A1C] transition-colors cursor-pointer w-fit"
                >
                  Investigations
                </button>
                <button
                  onClick={() => onNavigate("projects")}
                  className="text-left font-sans text-xs text-white/40 hover:text-white transition-colors cursor-pointer w-fit"
                >
                  Projects
                </button>
                <button
                  onClick={() => onNavigate("tools")}
                  className="text-left font-sans text-xs text-white/40 hover:text-white transition-colors cursor-pointer w-fit"
                >
                  Tools
                </button>
              </div>
            </motion.div>

            {/* Headline block */}
            <div className="col-span-12 md:col-span-9 md:col-start-6 lg:col-span-6 lg:col-start-7 flex flex-col gap-4 md:gap-5 text-left">
              {/* TODO (Mike): draft copy — rewrite freely */}
              <motion.h1
                variants={rise}
                className="font-display font-bold text-white text-5xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] leading-[0.95] tracking-tighter"
              >
                Verify
                <br />
                everything<span className="text-[#FF4A1C]">.</span>
              </motion.h1>
              <motion.p
                variants={rise}
                className="font-sans text-white/55 text-xs sm:text-sm leading-relaxed max-w-sm"
              >
                Open-source investigations from Nairobi. We trace footage, imagery and
                documents from across Africa back to their{" "}
                <button
                  onClick={() => onNavigate("investigations")}
                  className="text-white underline decoration-[#FF4A1C] decoration-2 underline-offset-4 hover:text-[#FF4A1C] transition-colors cursor-pointer"
                >
                  true time and place
                </button>
                .
              </motion.p>
            </div>
          </div>

          {/* Bottom evidence strip */}
          <motion.div
            variants={rise}
            className="border-t border-white/10 grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-4 py-5 md:py-6 items-center"
          >
            {/* Latest case files (live from the CMS) */}
            <div className="col-span-2 md:col-span-6 grid grid-cols-2 gap-6">
              {latest.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => onNavigate("investigations")}
                  className="text-left group cursor-pointer min-w-0"
                >
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[#FF4A1C] font-bold uppercase block mb-1.5">
                    {formatDate(s.date)}
                  </span>
                  <span className="font-sans font-bold text-xs text-white/90 leading-snug line-clamp-2 group-hover:text-[#FF4A1C] transition-colors block">
                    {s.title}
                  </span>
                  <span className="font-mono text-[9px] text-white/35 tracking-wider uppercase block mt-1.5">
                    {s.id}
                  </span>
                </button>
              ))}
            </div>

            {/* Thumb */}
            <div className="hidden md:block md:col-span-2">
              <img
                src="/images/protest_emotional_1783183067120.jpg"
                alt="Latest investigations"
                className="w-full h-20 object-cover rounded-xl border border-white/10 grayscale"
                loading="lazy"
              />
            </div>

            {/* Unit blurb */}
            <div className="col-span-2 md:col-span-4 flex flex-col gap-1.5 md:pl-4">
              <span className="font-mono text-[9px] tracking-[0.25em] text-white/45 font-bold uppercase">
                The unit
              </span>
              {/* TODO (Mike): draft copy — rewrite freely */}
              <p className="font-sans text-[11px] text-white/55 leading-relaxed">
                Digital forensics and visual storytelling, published with the
                verification trail attached.
              </p>
              <button
                onClick={() => onNavigate("who-we-are")}
                className="font-sans font-bold text-[11px] text-white flex items-center gap-1 hover:text-[#FF4A1C] transition-colors cursor-pointer w-fit mt-0.5"
              >
                <span className="underline underline-offset-4 decoration-white/30">Read more</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Vertical rail, right edge */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-10">
          <span className="h-10 w-[1px] bg-white/15" />
          <span
            className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Cachecrime — case files
          </span>
          <span className="h-10 w-[1px] bg-white/15" />
        </div>
      </motion.section>
    </div>
  );
}
