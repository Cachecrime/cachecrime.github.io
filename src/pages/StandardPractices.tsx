import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  CheckCircle2, 
  Layers, 
  Sliders, 
  Cpu, 
  ShieldCheck, 
  Compass, 
  HelpCircle,
  Clock,
  ArrowRight
} from "lucide-react";

interface PracticeProtocol {
  id: string;
  phase: string;
  title: string;
  description: string;
  standard: string;
  items: string[];
}

const PROTOCOLS: PracticeProtocol[] = [
  {
    id: "STP-01",
    phase: "Material Acquisition Phase",
    title: "Hydrophobic & Tensile Integrity Verification",
    description: "Every fabric membrane undergoes hydrostatic head water pressure checks to secure a minimal IPX-5 rating (resisting streams from all angles).",
    standard: "ISO 811 // Hydrostatic Pressure Test",
    items: ["Water column threshold: 28,000mm minimum", "Kevlar tensile load-bearing: > 1400N", "Air permeability testing: < 0.5 cm³/cm²/s"]
  },
  {
    id: "STP-02",
    phase: "Component Integration Phase",
    title: "Magnetic Mechanical Hardware Lock Testing",
    description: "Fidlock buckles and auxiliary hardware attachments are subjected to simulated cold climates and repeat cycle tests to assure flawless detachment handshakes.",
    standard: "DIN EN 14619 Structural Security",
    items: ["Repetitive lock/unlock cycles: 10,000 runs", "Low temperature tensile limits: -25°C", "Salt spray corrosion defiance: 96 hours"]
  },
  {
    id: "STP-03",
    phase: "Signal Isolation Phase",
    title: "Faraday Pocket Electromagnetic Shielding Verification",
    description: "Integrated pockets designed to shield hardware and communication gadgets must fully block cellular, GPS, and RFID frequencies.",
    standard: "IEEE 299 Electromagnetic Shielding",
    items: ["RF shielding threshold: 10MHz to 10GHz", "Attenuation limit: > 85dB", "Zero-leakage signal handshakes"]
  },
  {
    id: "STP-04",
    phase: "Logistical Dispatch Phase",
    title: "Anonymized Delivery Channel Protocol",
    description: "Stealth packaging and discrete shipping methods are implemented to shield customer identities and prevent cargo sniffing across standard carrier pathways.",
    standard: "CacheCrime Secure Route Protocol",
    items: ["Double vacuum-sealed neutral outer packs", "Cryptographically signed shipment receipts", "Decentralized delivery coordinate routing"]
  }
];

export default function StandardPractices() {
  const [activeProto, setActiveProto] = useState<string>("STP-01");

  const currentProto = PROTOCOLS.find(p => p.id === activeProto) || PROTOCOLS[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col gap-10 pb-16"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/15 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 bg-black rounded-full" />
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">LAB QUALITY COMPLIANCE</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-none lowercase">
            standard practices.
          </h2>
        </div>
        <p className="font-sans text-gray-500 max-w-sm text-xs md:text-sm leading-relaxed text-left md:text-right">
          Standard operational guidelines, fabric resilience rules, and cryptographic manufacturing criteria utilized in our design cells.
        </p>
      </div>

      {/* Procedural grid splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Quick selector list (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="font-mono text-[9px] text-gray-400 font-extrabold tracking-widest uppercase block text-left mb-1">
            LAB COMPLIANCE PROTOCOLS
          </span>
          <div className="flex flex-col gap-3">
            {PROTOCOLS.map((p) => (
              <div
                key={p.id}
                onClick={() => setActiveProto(p.id)}
                className={`p-5 rounded-[24px] cursor-pointer text-left transition-all duration-200 border flex flex-col gap-1.5 ${
                  activeProto === p.id 
                    ? "bg-black text-white border-black shadow-md" 
                    : "bg-white border-black/5 text-black hover:bg-white/80"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-mono text-[9px] ${activeProto === p.id ? "text-[#FF4A1C]" : "text-[#FF4A1C]"}`}>
                    {p.id} // {p.phase}
                  </span>
                  <CheckCircle2 className={`w-4 h-4 ${activeProto === p.id ? "text-[#FF4A1C]" : "text-gray-300"}`} />
                </div>
                <h4 className="font-sans font-bold text-sm sm:text-base leading-tight tracking-tight">
                  {p.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Deep details (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 shadow-sm text-left flex flex-col gap-6 relative overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-black/5 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#FF4A1C]" />
              <span className="font-mono text-xs text-black font-extrabold uppercase tracking-wider">
                technical procedure file
              </span>
            </div>
            <span className="font-mono text-[10px] text-gray-400">{currentProto.id}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block font-bold">{currentProto.phase}</span>
            <h3 className="font-sans font-bold text-xl text-black tracking-tight leading-snug">
              {currentProto.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed mt-2">
              {currentProto.description}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl border border-black/5">
            <span className="font-mono text-[8px] text-gray-400 uppercase tracking-widest block font-bold mb-1">ACCORDING COMPLIANCE STANDARD</span>
            <span className="font-mono text-xs text-[#FF4A1C] font-bold">{currentProto.standard}</span>
          </div>

          {/* Sub check list */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block font-bold">PASSED VERIFICATION TARGETS</span>
            <div className="flex flex-col gap-2 font-sans text-xs">
              {currentProto.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-xl border border-black/5 text-gray-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dummy button */}
          <button
            onClick={() => alert(`Standard certification log requested for ${currentProto.id}. Signature verified.`)}
            className="w-full mt-2 py-3 bg-black hover:bg-[#FF4A1C] text-white rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200"
          >
            REQUEST FULL LAB PROTOCOL
          </button>

        </div>

      </div>
    </motion.div>
  );
}
