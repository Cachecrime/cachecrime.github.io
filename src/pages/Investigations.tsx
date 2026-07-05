import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ShieldAlert, 
  Search, 
  FileText, 
  Activity, 
  Calendar, 
  ArrowUpRight, 
  Lock, 
  Terminal, 
  ExternalLink,
  ChevronRight,
  Filter
} from "lucide-react";

interface CaseFile {
  id: string;
  title: string;
  category: string;
  date: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "RESOLVED" | "UNDER INVESTIGATION" | "MONITORING";
  summary: string;
  hash: string;
}

const CASES: CaseFile[] = [
  {
    id: "CC-2026-891",
    title: "Infiltration of rogue decentralized protocol nodes",
    category: "Network Forensic",
    date: "June 28, 2026",
    severity: "CRITICAL",
    status: "RESOLVED",
    summary: "Discovered an ongoing memory-injection exploit across standard staking channels. Isolated nodes in cooperation with decentralized safety networks and successfully patched vector CVE-2026-4411.",
    hash: "sha256:8f4a1c...b099d2"
  },
  {
    id: "CC-2026-702",
    title: "Biometric firmware credential leakage tracking",
    category: "Hardware Integrity",
    date: "May 14, 2026",
    severity: "HIGH",
    status: "UNDER INVESTIGATION",
    summary: "Uncovered malicious supply chain modifications on secure enclave elements. Currently analyzing trace pathways to isolate assembly facilities in East Asia.",
    hash: "sha256:1a9c3e...c55d0f"
  },
  {
    id: "CC-2026-615",
    title: "Exploitation of smart lock dynamic address vectors",
    category: "IoT Exploitation",
    date: "April 02, 2026",
    severity: "MEDIUM",
    status: "MONITORING",
    summary: "Investigation on Bluetooth Low Energy handshake bypass vulnerabilities on luxury apartment locking modules. Coordinated disclosure with manufacturer underway.",
    hash: "sha256:4f1a2d...e98c0b"
  },
  {
    id: "CC-2025-994",
    title: "Ransomware footprint across municipal utility grid",
    category: "Critical Infrastructure",
    date: "December 18, 2025",
    severity: "CRITICAL",
    status: "RESOLVED",
    summary: "Intercepted lateral movement across SCADA telemetry servers. Neutralized the payload before structural disruption occurred. Traced origins to state-sponsored offensive units.",
    hash: "sha256:7c4b1e...f52d0a"
  }
];

export default function Investigations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCase, setSelectedCase] = useState<CaseFile | null>(CASES[0]);
  const [filterSeverity, setFilterSeverity] = useState<string>("ALL");

  const filteredCases = CASES.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSeverity === "ALL" || c.severity === filterSeverity;
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
            <span className="font-mono text-[10px] text-[#FF4A1C] uppercase tracking-widest font-black">X-LABS DEEP THREAT INTELLIGENCE</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-none lowercase">
            investigations.
          </h2>
        </div>
        <p className="font-sans text-gray-500 max-w-sm text-xs md:text-sm leading-relaxed text-left md:text-right">
          Cryptographically backed incident response logs, security research disclosures, and proactive cyber-forensic dossiers.
        </p>
      </div>

      {/* Main Forensic Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Cases List and Search (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search dossiers, system IDs, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/10 rounded-2xl font-sans text-xs focus:outline-none focus:border-[#FF4A1C]/50 transition-colors"
              />
            </div>
            
            {/* Filter buttons */}
            <div className="flex gap-1.5 self-start sm:self-center overflow-x-auto pb-1 sm:pb-0">
              {["ALL", "CRITICAL", "HIGH", "MEDIUM"].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setFilterSeverity(sev)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[9px] font-bold tracking-wider uppercase transition-all ${
                    filterSeverity === sev 
                      ? "bg-black text-white" 
                      : "bg-white border border-black/5 text-gray-500 hover:text-black hover:bg-white/70"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Dossiers list */}
          <div className="flex flex-col gap-3">
            {filteredCases.length === 0 ? (
              <div className="bg-white/60 rounded-2xl p-8 text-center border border-dashed border-black/10">
                <Terminal className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <span className="font-mono text-xs text-gray-400 block uppercase">NO CYBER DOSSIERS FOUND FOR GIVEN QUERY</span>
              </div>
            ) : (
              filteredCases.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-5 rounded-[24px] transition-all duration-300 border cursor-pointer text-left flex flex-col gap-3 ${
                    selectedCase?.id === c.id 
                      ? "bg-white border-[#FF4A1C] shadow-[0_12px_30px_rgba(0,0,0,0.05)] translate-x-1" 
                      : "bg-white/70 hover:bg-white border-black/5 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] text-[#FF4A1C] font-extrabold tracking-widest">{c.id}</span>
                      <h4 className="font-sans font-bold text-sm sm:text-base text-black leading-snug tracking-tight">
                        {c.title}
                      </h4>
                    </div>
                    
                    {/* Badges */}
                    <span className={`px-2 py-0.5 rounded font-mono text-[8px] font-extrabold tracking-wider ${
                      c.severity === "CRITICAL" ? "bg-red-100 text-red-700" :
                      c.severity === "HIGH" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {c.severity}
                    </span>
                  </div>

                  <p className="font-sans text-[11px] leading-relaxed text-gray-500 line-clamp-2">
                    {c.summary}
                  </p>

                  <div className="flex items-center justify-between border-t border-black/5 pt-3 mt-1 text-[10px] font-mono text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span>{c.date}</span>
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

        {/* Right Side: Selected Case Deep-dive Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-black/10 rounded-[32px] p-6 text-left relative overflow-hidden shadow-sm">
          {selectedCase ? (
            <div className="flex flex-col gap-6">
              
              {/* Terminal-like header metadata */}
              <div className="bg-[#1A1A1A] text-white font-mono p-4 rounded-2xl flex flex-col gap-2 shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-[#FF4A1C]" /> SECURITY_CORE_LOG
                  </span>
                  <span className="text-[#10b981] animate-pulse font-bold">● ONLINE</span>
                </div>
                <div className="h-[1px] bg-white/10 my-1" />
                <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-300">
                  <div>
                    <span className="text-gray-500 block">DASSIER_ID</span>
                    <span className="font-bold text-[#FF4A1C]">{selectedCase.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">PROTOCOL_VER</span>
                    <span className="font-bold">AES-256</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">STATUS_SIG</span>
                    <span className="font-bold text-gray-100">{selectedCase.status}</span>
                  </div>
                </div>
              </div>

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
                <span className="text-gray-400">Tactical Status:</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    selectedCase.status === "RESOLVED" ? "bg-green-500" :
                    selectedCase.status === "UNDER INVESTIGATION" ? "bg-amber-500" : "bg-blue-500"
                  }`} />
                  <span className="font-bold text-black text-[11px] uppercase tracking-wider font-mono">
                    {selectedCase.status}
                  </span>
                </div>
              </div>

              {/* Summary paragraph */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                  FORENSIC ANALYSIS & RESOLUTION
                </span>
                <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {selectedCase.summary}
                </p>
              </div>

              {/* Cryptographic verification signature */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-black/5 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5 text-gray-500" /> CRYPTOGRAPHIC HASH SIGNATURE
                </div>
                <div className="font-mono text-[10px] text-gray-500 bg-white p-2 rounded-lg border border-black/5 select-all break-all text-center">
                  {selectedCase.hash}
                </div>
                <p className="font-mono text-[8px] text-gray-400 leading-normal text-center uppercase">
                  VERIFIED BY DECENTRALIZED SWISS KEYRING AUTHORITY
                </p>
              </div>

              {/* Dummy interaction */}
              <button 
                onClick={() => alert(`Dossier payload request for ${selectedCase.id} initiated. Encryption handshake completed.`)}
                className="w-full py-3 bg-[#FF4A1C] text-white hover:bg-[#e03a10] rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-sm hover:shadow-[0_4px_15px_rgba(255,74,28,0.2)]"
              >
                REQUEST DECRYPTED SOURCE LOGS
              </button>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-20 text-center text-gray-400">
              <Terminal className="w-10 h-10 mb-2 stroke-[1.5]" />
              <span className="font-mono text-xs uppercase">SELECT A CASE FROM DOSSIERS TO INITIATE DRILLDOWN</span>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}
