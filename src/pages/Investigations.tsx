/**
 * Investigations page — CMS-driven (CMS-owned file, excluded from AI Studio sync).
 * Stories come from /content/investigations/*.json, editable at /admin.
 */
import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Calendar,
  Terminal,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { stories, statusValues, type Story } from "../cms/content";

// Lazy: keeps Leaflet/marked out of the main bundle until a report is opened
const StoryReader = React.lazy(() => import("../cms/StoryReader"));

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function statusColor(status: string): string {
  const s = status.toUpperCase();
  if (s.includes("PUBLISH") || s.includes("RESOLVED") || s.includes("VERIFIED"))
    return "bg-green-500";
  if (s.includes("INVESTIGATION") || s.includes("ONGOING")) return "bg-amber-500";
  return "bg-blue-500";
}

function severityBadge(severity?: string): string {
  switch ((severity ?? "").toUpperCase()) {
    case "CRITICAL":
      return "bg-red-100 text-red-700";
    case "HIGH":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
}

export default function Investigations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCase, setSelectedCase] = useState<Story | null>(stories[0] ?? null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [readerStory, setReaderStory] = useState<Story | null>(null);

  const filteredCases = stories.filter((c) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      (c.tags ?? []).some((t) => t.toLowerCase().includes(q));
    const matchesFilter = filterStatus === "ALL" || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col gap-8 pb-12"
    >
      {/* Title Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/15 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4A1C] animate-pulse" />
            <span className="font-mono text-[10px] text-[#FF4A1C] uppercase tracking-widest font-black">
              OPEN-SOURCE INVESTIGATIONS
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-none lowercase">
            investigations.
          </h2>
        </div>
        <p className="font-sans text-gray-500 max-w-sm text-xs md:text-sm leading-relaxed text-left md:text-right">
          Verified visual investigations and OSINT case files — footage, imagery and
          documents traced back to their true time and place.
        </p>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Cases List and Search (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search case files, IDs, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/10 rounded-2xl font-sans text-xs focus:outline-none focus:border-[#FF4A1C]/50 transition-colors"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex gap-1.5 self-start sm:self-center overflow-x-auto pb-1 sm:pb-0">
              {["ALL", ...statusValues].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[9px] font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                    filterStatus === st
                      ? "bg-black text-white"
                      : "bg-white border border-black/5 text-gray-500 hover:text-black hover:bg-white/70"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Case files list */}
          <div className="flex flex-col gap-3">
            {filteredCases.length === 0 ? (
              <div className="bg-white/60 rounded-2xl p-8 text-center border border-dashed border-black/10">
                <Terminal className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <span className="font-mono text-xs text-gray-400 block uppercase">
                  NO CASE FILES FOUND FOR GIVEN QUERY
                </span>
              </div>
            ) : (
              filteredCases.map((c) => (
                <div
                  key={c.slug}
                  onClick={() => setSelectedCase(c)}
                  className={`p-5 rounded-[24px] transition-all duration-300 border cursor-pointer text-left flex flex-col gap-3 ${
                    selectedCase?.slug === c.slug
                      ? "bg-white border-[#FF4A1C] shadow-[0_12px_30px_rgba(0,0,0,0.05)] translate-x-1"
                      : "bg-white/70 hover:bg-white border-black/5 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] text-[#FF4A1C] font-extrabold tracking-widest">
                        {c.id}
                      </span>
                      <h4 className="font-sans font-bold text-sm sm:text-base text-black leading-snug tracking-tight">
                        {c.title}
                      </h4>
                    </div>

                    {c.severity && (
                      <span
                        className={`px-2 py-0.5 rounded font-mono text-[8px] font-extrabold tracking-wider ${severityBadge(c.severity)}`}
                      >
                        {c.severity}
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-[11px] leading-relaxed text-gray-500 line-clamp-2">
                    {c.summary}
                  </p>

                  <div className="flex items-center justify-between border-t border-black/5 pt-3 mt-1 text-[10px] font-mono text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span>{formatDate(c.date)}</span>
                      <span>•</span>
                      <span className="font-semibold text-gray-500 uppercase">{c.category}</span>
                    </div>

                    <div className="flex items-center gap-1 hover:text-[#FF4A1C] transition-colors">
                      <span className="font-bold">inspect details</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Selected Case Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-black/10 rounded-[32px] p-6 text-left relative overflow-hidden shadow-sm">
          {selectedCase ? (
            <div className="flex flex-col gap-6">
              {/* Metadata header */}
              <div className="bg-[#1A1A1A] text-white font-mono p-4 rounded-2xl flex flex-col gap-2 shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-[#FF4A1C]" /> CASE_FILE
                  </span>
                  <span className="text-[#10b981] font-bold">● {selectedCase.status}</span>
                </div>
                <div className="h-[1px] bg-white/10 my-1" />
                <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-300">
                  <div>
                    <span className="text-gray-500 block">CASE_ID</span>
                    <span className="font-bold text-[#FF4A1C]">{selectedCase.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">DATE</span>
                    <span className="font-bold">{formatDate(selectedCase.date)}</span>
                  </div>
                </div>
              </div>

              {selectedCase.coverImage && (
                <img
                  src={selectedCase.coverImage}
                  alt={selectedCase.title}
                  className="w-full rounded-2xl border border-black/5 object-cover max-h-48"
                />
              )}

              {/* Title & category */}
              <div>
                <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                  {selectedCase.category}
                </span>
                <h3 className="font-sans font-bold text-lg sm:text-xl text-black leading-snug tracking-tight">
                  {selectedCase.title}
                </h3>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-black/5 font-sans text-xs">
                <span className="text-gray-400">Status:</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${statusColor(selectedCase.status)}`} />
                  <span className="font-bold text-black text-[11px] uppercase tracking-wider font-mono">
                    {selectedCase.status}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                  SUMMARY
                </span>
                <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {selectedCase.summary}
                </p>
              </div>

              {/* Read full report */}
              {selectedCase.blocks && selectedCase.blocks.length > 0 && (
                <button
                  onClick={() => setReaderStory(selectedCase)}
                  className="w-full py-3 bg-[#FF4A1C] text-white hover:bg-[#e03a10] rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-sm hover:shadow-[0_4px_15px_rgba(255,74,28,0.2)] flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" /> READ FULL REPORT
                </button>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-20 text-center text-gray-400">
              <Terminal className="w-10 h-10 mb-2 stroke-[1.5]" />
              <span className="font-mono text-xs uppercase">
                NO INVESTIGATIONS PUBLISHED YET — ADD ONE VIA /ADMIN
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Full-screen reader overlay */}
      <AnimatePresence>
        {readerStory && (
          <Suspense fallback={null}>
            <StoryReader story={readerStory} onClose={() => setReaderStory(null)} />
          </Suspense>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
