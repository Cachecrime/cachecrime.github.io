import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Download, 
  Terminal, 
  Layers, 
  Sliders, 
  RefreshCw, 
  FileImage, 
  Eye, 
  QrCode, 
  Check, 
  Copy,
  Info
} from "lucide-react";

interface GraphicSpecimen {
  id: string;
  title: string;
  classification: string;
  description: string;
  hash: string;
  gridSize: string;
  tags: string[];
}

const SPECIMENS: GraphicSpecimen[] = [
  {
    id: "GR-20320-SYS",
    title: "MODULAR SYSTEM INTEGRITY VECTOR",
    classification: "SCHEMATIC BLUEPRINT",
    description: "Multi-layered CAD technical breakdown of the MOD.20320 modular storm hood articulation and tension systems.",
    hash: "sha256:f4a1c8...a0d1e2",
    gridSize: "1920 x 1080 PX",
    tags: ["vector", "blueprint", "cad", "articulation"]
  },
  {
    id: "GR-8919-DEC",
    title: "ROUGE NODE WARNING DECAL PROTOCOL",
    classification: "TACTICAL STICKER",
    description: "Warning indicator graphics standardly adhered to unauthorized decentralized consensus validation hardware.",
    hash: "sha256:7b2e10...f8d9c3",
    gridSize: "800 x 800 PX",
    tags: ["sticker", "warning", "hardware", "consensus"]
  },
  {
    id: "GR-12112-ID",
    title: "VDR ENCLAVE SIGNATURE PRINT",
    classification: "TYPOGRAPHIC WORK",
    description: "High-contrast Swiss style poster typography outlining biometric security protocol enclaves and geographic coordinate logs.",
    hash: "sha256:12c4d5...c8e9f0",
    gridSize: "2400 x 3600 PX",
    tags: ["poster", "typography", "swiss", "biometric"]
  },
  {
    id: "GR-4411-VAD",
    title: "DECENTRALIZED KEYRING VECTOR ASSET",
    classification: "INTERFACE ELEMENT",
    description: "Geometric structural array icons representing multi-signature key verification patterns and network locks.",
    hash: "sha256:e3f2a1...0b2c3d",
    gridSize: "512 x 512 PX",
    tags: ["svg", "icon", "lock", "cryptography"]
  }
];

export default function Graphics() {
  const [selectedSpecimen, setSelectedSpecimen] = useState<GraphicSpecimen | null>(SPECIMENS[0]);
  
  // Interactive Custom Sticker Generator State
  const [labelTitle, setLabelTitle] = useState("TACTICAL DISCLOSURE");
  const [serialCode, setSerialCode] = useState("X-LAB.9819");
  const [warningType, setWarningType] = useState("CRITICAL VULNERABILITY");
  const [accentColor, setAccentColor] = useState("#FF4A1C");
  const [isCopied, setIsCopied] = useState(false);
  const [isSimulatingDownload, setIsSimulatingDownload] = useState(false);

  const handleCopyHash = () => {
    if (!selectedSpecimen) return;
    navigator.clipboard.writeText(selectedSpecimen.hash);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSimulateDownload = () => {
    setIsSimulatingDownload(true);
    setTimeout(() => {
      setIsSimulatingDownload(false);
      alert(`Download handshake established for ${selectedSpecimen?.id || "Custom-Decal"}. SVG source successfully compiled.`);
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col gap-10 pb-16"
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/15 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 bg-[#FF4A1C] rounded-full animate-ping" />
            <span className="font-mono text-[10px] text-[#FF4A1C] uppercase tracking-widest font-bold">X-LAB GRAPHICS & SPECIMENS</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-none lowercase">
            graphics.
          </h2>
        </div>
          <p className="font-sans text-gray-500 max-w-sm text-xs md:text-sm leading-relaxed text-left md:text-right">
            Technical schematics, high-contrast typography posters, and vector identity decals for local print and hardware customization.
          </p>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Specimen Index list & details (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <span className="font-mono text-xs font-bold text-black uppercase tracking-wider">ARCHIVED SPECIEMENS INDEX</span>
            <span className="font-mono text-[10px] text-gray-400 font-bold">{SPECIMENS.length} ITEMS DETECTED</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SPECIMENS.map((specimen) => (
              <div 
                key={specimen.id}
                onClick={() => setSelectedSpecimen(specimen)}
                className={`p-5 rounded-[24px] border cursor-pointer text-left flex flex-col justify-between h-[180px] transition-all duration-300 ${
                  selectedSpecimen?.id === specimen.id
                    ? "bg-white border-[#FF4A1C] shadow-[0_12px_30px_rgba(0,0,0,0.05)] translate-y-[-2px]"
                    : "bg-white/70 hover:bg-white border-black/5 hover:shadow-sm"
                }`}
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[#FF4A1C] font-extrabold tracking-widest">{specimen.id}</span>
                    <span className="font-mono text-[8px] bg-black text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">{specimen.classification}</span>
                  </div>
                  <h4 className="font-sans font-bold text-sm text-black tracking-tight leading-snug mt-1">
                    {specimen.title}
                  </h4>
                </div>

                <div className="flex items-center justify-between border-t border-black/5 pt-3 text-[10px] font-mono text-gray-400">
                  <span>{specimen.gridSize}</span>
                  <div className="flex items-center gap-1 text-[#FF4A1C] font-bold">
                    <span>Inspect</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Deep dive details card */}
          {selectedSpecimen && (
            <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 text-left flex flex-col gap-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-4">
                <div>
                  <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    SPECIMEN CLASSIFICATION: {selectedSpecimen.classification}
                  </span>
                  <h3 className="font-sans font-black text-lg md:text-xl text-black tracking-tight">
                    {selectedSpecimen.title}
                  </h3>
                </div>
                
                <button
                  onClick={handleSimulateDownload}
                  disabled={isSimulatingDownload}
                  className="px-4 py-2 bg-black hover:bg-[#FF4A1C] text-white rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 self-start cursor-pointer"
                >
                  {isSimulatingDownload ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>COMPILING...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>DOWNLOAD SVG</span>
                    </>
                  )}
                </button>
              </div>

              <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
                {selectedSpecimen.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-[10px]">
                <div className="bg-gray-50 p-3 rounded-xl border border-black/5">
                  <span className="text-gray-400 block mb-0.5">DIMENSIONS</span>
                  <span className="font-bold text-gray-700">{selectedSpecimen.gridSize}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-black/5">
                  <span className="text-gray-400 block mb-0.5">FORMAT TYPE</span>
                  <span className="font-bold text-gray-700">VECTOR (.SVG)</span>
                </div>
                <div className="col-span-2 sm:col-span-1 bg-gray-50 p-3 rounded-xl border border-black/5 flex flex-col justify-between">
                  <div>
                    <span className="text-gray-400 block mb-0.5">TAGS</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedSpecimen.tags.map((t) => (
                        <span key={t} className="bg-black/5 px-1.5 py-0.5 rounded text-[8px] text-gray-600 uppercase font-semibold">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cryptography section */}
              <div className="bg-[#1A1A1A] p-4 rounded-2xl border border-white/5 flex items-center justify-between text-white font-mono text-[10px] gap-4">
                <div className="flex items-center gap-2 min-w-0">
                  <Terminal className="w-4 h-4 text-[#FF4A1C] shrink-0" />
                  <span className="text-gray-400 shrink-0">LEDGER HASH:</span>
                  <span className="text-gray-300 truncate select-all">{selectedSpecimen.hash}</span>
                </div>
                <button
                  onClick={handleCopyHash}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors shrink-0 cursor-pointer flex items-center gap-1"
                  title="Copy Hash"
                >
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right column: Interactive Sticker Generator (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-black/10 rounded-[32px] p-6 text-left flex flex-col gap-6 shadow-sm">
          <div className="flex items-center gap-2.5 border-b border-black/5 pb-4">
            <Sliders className="w-5 h-5 text-[#FF4A1C]" />
            <span className="font-mono text-xs text-black font-extrabold uppercase tracking-wider">
              interactive sticker calibration
            </span>
          </div>

          <p className="font-sans text-xs text-gray-500 leading-relaxed">
            Customize typographic assets and safety decal specifications. Dynamic compilation updates barcode modules in real-time.
          </p>

          {/* Form Controls */}
          <div className="flex flex-col gap-4 font-sans text-xs text-left">
            {/* Label Title */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-gray-600 uppercase font-mono text-[9px] tracking-wider">LABEL PROTOCOL TITLE</label>
              <input 
                type="text" 
                value={labelTitle}
                onChange={(e) => setLabelTitle(e.target.value.toUpperCase())}
                maxLength={26}
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-3 py-2 font-mono text-xs focus:outline-none focus:border-[#FF4A1C] transition-all"
              />
            </div>

            {/* Serial Code */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-gray-600 uppercase font-mono text-[9px] tracking-wider">SERIAL SPECIFICATION CODE</label>
              <input 
                type="text" 
                value={serialCode}
                onChange={(e) => setSerialCode(e.target.value.toUpperCase())}
                maxLength={14}
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-3 py-2 font-mono text-xs focus:outline-none focus:border-[#FF4A1C] transition-all"
              />
            </div>

            {/* Warning Message */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-gray-600 uppercase font-mono text-[9px] tracking-wider">WARNING/STATUS PHRASE</label>
              <input 
                type="text" 
                value={warningType}
                onChange={(e) => setWarningType(e.target.value.toUpperCase())}
                maxLength={32}
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-3 py-2 font-mono text-xs focus:outline-none focus:border-[#FF4A1C] transition-all"
              />
            </div>

            {/* Accent Color Pickers */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-gray-600 uppercase font-mono text-[9px] tracking-wider">SPECTRUM ACCENT COLOR</label>
              <div className="flex items-center gap-2">
                {[
                  { name: "Neon Orange", hex: "#FF4A1C" },
                  { name: "Swiss Red", hex: "#dc2626" },
                  { name: "Cyber Green", hex: "#10b981" },
                  { name: "Ledger Blue", hex: "#2563eb" },
                  { name: "Stealth Gray", hex: "#374151" }
                ].map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setAccentColor(color.hex)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-6 h-6 rounded-full cursor-pointer transition-transform duration-150 relative ${
                      accentColor === color.hex ? "scale-125 ring-2 ring-black/20" : "hover:scale-110"
                    }`}
                    title={color.name}
                  >
                    {accentColor === color.hex && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-[8px] font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DYNAMIC SVG PREVIEW CONTAINER */}
          <div className="flex flex-col gap-2 mt-2">
            <span className="font-mono text-[9px] text-gray-400 font-extrabold tracking-wider uppercase">DYNAMIC VECTOR PREVIEW:</span>
            
            <div className="w-full bg-[#EAEAEA] rounded-2xl p-6 border border-black/5 flex items-center justify-center aspect-[16/10] relative overflow-hidden select-none">
              
              {/* Custom SVG sticker */}
              <div className="bg-white border-2 border-black p-4 w-full max-w-[280px] shadow-sm flex flex-col justify-between aspect-[1.5] relative">
                {/* Diagonal strip background accent */}
                <div 
                  className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-10"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, ${accentColor}, ${accentColor} 4px, transparent 4px, transparent 8px)`
                  }}
                />

                {/* Header Row */}
                <div className="flex items-start justify-between border-b border-black pb-1.5 gap-2">
                  <div className="flex flex-col">
                    <span className="font-mono text-[7px] text-gray-400 font-black tracking-widest leading-none">ORIGIN_X_LAB</span>
                    <span className="font-sans font-black text-[11px] text-black tracking-tighter leading-none mt-0.5">{labelTitle || "LABEL_SPEC"}</span>
                  </div>
                  <div 
                    style={{ backgroundColor: accentColor }}
                    className="w-2.5 h-2.5 rounded-full"
                  />
                </div>

                {/* Sub Metadata Row */}
                <div className="grid grid-cols-2 gap-1 font-mono text-[6px] text-gray-500 mt-2">
                  <div>
                    <span className="block text-gray-400 leading-none">SYS_SERIAL:</span>
                    <span className="font-extrabold text-black leading-none">{serialCode || "X-LAB.9819"}</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 leading-none">CLASS_CODE:</span>
                    <span className="font-extrabold text-black leading-none">VDR_TACT_991</span>
                  </div>
                </div>

                {/* Warning Row */}
                <div className="border border-black/10 bg-gray-50 px-2 py-1.5 rounded mt-2.5 flex items-center gap-1.5">
                  <Info className="w-3 h-3 text-black shrink-0" style={{ color: accentColor }} />
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[5px] text-gray-400 leading-none uppercase">TACTICAL STATUS SIGNAL</span>
                    <span className="font-mono font-extrabold text-[7px] text-black leading-tight truncate" style={{ color: accentColor }}>
                      {warningType || "SYSTEM COMPLIANT"}
                    </span>
                  </div>
                </div>

                {/* Barcode & signature row */}
                <div className="flex items-end justify-between mt-3 gap-2">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex gap-[1px]">
                      {[2, 4, 1, 3, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4].map((width, idx) => (
                        <div 
                          key={idx} 
                          style={{ width: `${width}px` }} 
                          className="h-4 bg-black" 
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[5px] text-gray-400 tracking-wider">*[17831829]*</span>
                  </div>

                  <span className="font-display font-black text-[9px] tracking-tight text-black lowercase select-none">
                    cachecrime
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Export Action */}
          <button 
            onClick={handleSimulateDownload}
            className="w-full py-3 bg-black hover:bg-[#FF4A1C] text-white rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg"
          >
            COMPILE & EXPORT CALIBRATED DECAL
          </button>
        </div>

      </div>
    </motion.div>
  );
}
