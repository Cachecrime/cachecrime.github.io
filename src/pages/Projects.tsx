import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Folder, 
  ArrowUpRight, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle,
  Code,
  ShieldAlert
} from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: "hardware" | "apparel" | "cryptography" | "software";
  year: string;
  status: "active" | "archived" | "concept";
  image: string;
  description: string;
  specs: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: "PRJ-X01",
    title: "first collection // x-labs gear",
    category: "apparel",
    year: "2019",
    status: "active",
    image: "/images/techwear_model_1783163010199.jpg",
    description: "Our inaugural modular apparel capsule built with 3-layer GORE-TEX Pro laminates, custom heat-sealed closures, and RFID Faraday signal blocking chambers.",
    specs: ["Waterproof rating IPX-5", "RFID block shielding 120dB", "Fidlock hardware buckles"]
  },
  {
    id: "PRJ-S02",
    title: "modular systems // sys-labs division",
    category: "apparel",
    year: "2020",
    status: "active",
    image: "/images/techwear_model_2_1783163045977.jpg",
    description: "Premium heavy-weight technical garments focusing on dynamic physical heat venting, magnetic auxiliary harnesses, and double adjustable neck drapes.",
    specs: ["DWR coated canvas", "Dual-stage mesh breathability", "Kevlar lining panels"]
  },
  {
    id: "PRJ-V03",
    title: "covert initiative // vdr-labs series",
    category: "apparel",
    year: "2021",
    status: "active",
    image: "/images/techwear_model_3_1783163058987.jpg",
    description: "Reinforced futuristic silhouettes optimized for covert operations, combining retroreflective glass-bead coating and a detachable technical mask interface.",
    specs: ["3M Retroreflective compound", "Snug dust-proof face seal", "Multi-point cord system"]
  },
  {
    id: "PRJ-H04",
    title: "hardware secure enclave wallet card",
    category: "hardware",
    year: "2023",
    status: "concept",
    image: "/images/oranges_branch_1783182988575.jpg",
    description: "A secure hardware wallet masquerading as a tactical nylon tag. Features offline biometric handshakes and secondary emergency memory wipe triggers.",
    specs: ["EAL6+ Security enclave chip", "NFC air-gapped transmissions", "Piezoelectric battery-free"]
  },
  {
    id: "PRJ-C05",
    title: "cryptographic tracking signature protocol",
    category: "cryptography",
    year: "2024",
    status: "active",
    image: "/images/business_man_portrait_1783182974701.jpg",
    description: "Decentralized garment metadata ledger allowing owners to verify serial hashes on-chain, proving origin and blocking downstream apparel counterfeit networks.",
    specs: ["Ethers.js integration", "Zero-Knowledge proofs", "Interplanetary File System"]
  },
  {
    id: "PRJ-S06",
    title: "tactical offline terminal core",
    category: "software",
    year: "2025",
    status: "archived",
    image: "/images/kayaks_lake_1783183001508.jpg",
    description: "Scythe-based headless command shell compiled for ARM microcontrollers, allowing completely encrypted mesh chat via sub-GHz radio frequencies.",
    specs: ["LoRa mesh protocols", "AES-256-GCM symmetric block", "Ultra-low power sleep states"]
  }
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const filtered = activeTab === "ALL" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.toUpperCase() === activeTab);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col gap-8 pb-16"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/15 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4A1C]" />
            <span className="font-mono text-[10px] text-[#FF4A1C] uppercase tracking-widest font-bold">RELEASE DOSSIERS & ARTIFACTS</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-none lowercase">
            projects.
          </h2>
        </div>
        <div className="flex flex-col items-start md:items-end gap-1 font-sans text-xs text-gray-500">
          <span>Active Operations: {PROJECTS.filter(p => p.status === "active").length}</span>
          <span>Archived Records: {PROJECTS.filter(p => p.status === "archived").length}</span>
        </div>
      </div>

      {/* Category Selection Filter Bar */}
      <div className="flex items-center gap-2 border-b border-black/5 pb-4 overflow-x-auto">
        {["ALL", "APPAREL", "HARDWARE", "CRYPTOGRAPHY", "SOFTWARE"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === tab 
                ? "bg-black text-white shadow-sm" 
                : "bg-white border border-black/5 text-gray-500 hover:text-black hover:bg-white/70"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filtered.map((p) => (
          <div 
            key={p.id}
            className="bg-white rounded-[32px] border border-black/5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
          >
            
            {/* Visual Header */}
            <div className="relative aspect-[16/10] overflow-hidden group">
              <img 
                src={p.image} 
                alt={p.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90" />
              
              {/* Category tag & Year */}
              <div className="absolute top-4 left-4 flex gap-1.5">
                <span className="bg-black/80 text-white font-mono text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-md backdrop-blur-sm">
                  {p.category}
                </span>
                <span className={`font-mono text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-md backdrop-blur-sm ${
                  p.status === "active" ? "bg-emerald-500 text-white" :
                  p.status === "concept" ? "bg-amber-500 text-white" : "bg-gray-500 text-white"
                }`}>
                  {p.status}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 text-white">
                <span className="font-mono text-[9px] text-white/60 block">{p.id} // {p.year}</span>
                <h4 className="font-sans font-bold text-base leading-tight tracking-tight lowercase">
                  {p.title}
                </h4>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-6 flex flex-col gap-5 justify-between flex-1">
              <p className="font-sans text-xs text-gray-500 leading-relaxed min-h-[50px]">
                {p.description}
              </p>

              {/* Specs items */}
              <div className="flex flex-col gap-1 border-t border-black/5 pt-4">
                <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                  CORE SPECIFICATIONS
                </span>
                <div className="flex flex-col gap-1 font-mono text-[10px] text-gray-600">
                  {p.specs.map((sp, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#FF4A1C]" />
                      <span>{sp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trigger details alert */}
              <button
                onClick={() => alert(`Redirecting to encrypted ledger for project ${p.id}. Handshake completed.`)}
                className="mt-2 w-full py-2.5 bg-gray-50 hover:bg-black hover:text-white border border-black/5 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>OPEN SECURE FILES</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </motion.div>
  );
}
