import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sliders, 
  Cpu, 
  QrCode, 
  Check, 
  AlertCircle, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  RefreshCw,
  Fingerprint
} from "lucide-react";

export default function Tools() {
  // Tool 1: Serial Hash Validator
  const [serialInput, setSerialInput] = useState("");
  const [validationResult, setValidationResult] = useState<{
    status: "valid" | "invalid" | null;
    model?: string;
    origin?: string;
    blockHash?: string;
  }>({ status: null });

  // Tool 2: Technical Sizing Calculator
  const [chest, setChest] = useState<number>(100);
  const [height, setHeight] = useState<number>(175);
  const [shoulder, setShoulder] = useState<number>(46);

  const handleValidateSerial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialInput) return;
    
    const parsed = serialInput.trim().toUpperCase();
    if (parsed.includes("SN-19819") || parsed.includes("SN-20320") || parsed.includes("SN-121120")) {
      let model = "LAB TECH // FIRST COLLECTION";
      let origin = "COPENHAGEN LAB, DK";
      let blockHash = "0x892E...F4A1";
      
      if (parsed.includes("SN-20320")) {
        model = "SYS TECH // SECOND COLLECTION";
        origin = "TOKYO CELL, JP";
        blockHash = "0x5C1D...3A2B";
      } else if (parsed.includes("SN-121120")) {
        model = "VDR TECH // THIRD COLLECTION";
        origin = "BERLIN CELL, DE";
        blockHash = "0x9E4C...120D";
      }

      setValidationResult({
        status: "valid",
        model,
        origin,
        blockHash
      });
    } else {
      setValidationResult({ status: "invalid" });
    }
  };

  const getRecommendedSize = () => {
    if (chest > 115 || height > 190 || shoulder > 52) return "XL";
    if (chest > 105 || height > 182 || shoulder > 49) return "L";
    if (chest > 95 || height > 172 || shoulder > 45) return "M";
    return "S";
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
            <span className="font-mono text-[10px] text-[#FF4A1C] uppercase tracking-widest font-bold">X-LAB INTERACTIVE TOOLS</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-none lowercase">
            lab tools.
          </h2>
        </div>
        <p className="font-sans text-gray-500 max-w-sm text-xs md:text-sm leading-relaxed text-left md:text-right">
          Practical interactive utilities for sizing calibration and cryptographic garment serial hash validation.
        </p>
      </div>

      {/* Two Column Grid containing both interactive tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Tool 1: Serial Hash Validator Card */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 shadow-sm text-left flex flex-col gap-5">
          <div className="flex items-center gap-2.5 border-b border-black/5 pb-4">
            <QrCode className="w-5 h-5 text-[#FF4A1C]" />
            <span className="font-mono text-xs text-black font-extrabold uppercase tracking-wider">
              garment cryptographic hash validator
            </span>
          </div>

          <p className="font-sans text-xs text-gray-500 leading-relaxed">
            Verify the authentic origin of cachecrime apparel specimens. Input your serial code to search the decentralized ledger.
          </p>

          <form onSubmit={handleValidateSerial} className="flex gap-2">
            <input
              type="text"
              required
              value={serialInput}
              onChange={(e) => setSerialInput(e.target.value)}
              placeholder="e.g. SN-19819-CPH or SN-20320-TYO"
              className="flex-1 bg-gray-50 border border-black/10 rounded-xl px-4 py-2.5 font-mono text-xs focus:outline-none focus:border-[#FF4A1C] transition-all"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-black hover:bg-[#FF4A1C] text-white rounded-xl font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
            >
              Verify
            </button>
          </form>

          {/* Quick instructions hints */}
          <div className="bg-gray-50 p-3 rounded-xl border border-black/5 font-mono text-[10px] text-gray-400 flex flex-col gap-1">
            <span className="font-bold text-gray-600 uppercase">Demo Valid Codes to Try:</span>
            <span>• SN-19819-CPH (First Collection)</span>
            <span>• SN-20320-TYO (Second Collection)</span>
            <span>• SN-121120-BER (Third Collection)</span>
          </div>

          {/* Validation Result UI */}
          <AnimatePresence mode="wait">
            {validationResult.status === "valid" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2 text-emerald-800 font-sans text-xs font-bold">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                  <span>Specimen Authenticity Verified</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 font-mono text-[10px]">
                  <div>
                    <span className="text-gray-400 block uppercase">MODEL IDENTITY</span>
                    <span className="text-emerald-950 font-bold">{validationResult.model}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block uppercase">ORIGIN NODE</span>
                    <span className="text-emerald-950 font-bold">{validationResult.origin}</span>
                  </div>
                  <div className="col-span-2 border-t border-emerald-200/50 pt-2">
                    <span className="text-gray-400 block uppercase">CRYPTO TRANSACTION LINK</span>
                    <span className="text-emerald-800 break-all select-all">{validationResult.blockHash}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {validationResult.status === "invalid" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 rounded-2xl p-5 border border-red-100 flex flex-col gap-1.5"
              >
                <div className="flex items-center gap-2 text-red-800 font-sans text-xs font-bold">
                  <AlertCircle className="w-4 h-4 text-red-500 stroke-[2.5]" />
                  <span>Verification Signature Unrecognized</span>
                </div>
                <p className="font-sans text-[11px] text-red-600 leading-relaxed">
                  The inputted serial number cannot be located inside the active ledger databases. This specimen could be counterfeit or an unregistered prototype.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Tool 2: Sizing Calculator Card */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 shadow-sm text-left flex flex-col gap-5">
          <div className="flex items-center gap-2.5 border-b border-black/5 pb-4">
            <Sliders className="w-5 h-5 text-[#FF4A1C]" />
            <span className="font-mono text-xs text-black font-extrabold uppercase tracking-wider">
              technical sizing & geometry calibrator
            </span>
          </div>

          <p className="font-sans text-xs text-gray-500 leading-relaxed">
            Techwear silhouettes depend heavily on body geometry. Adjust your coordinates below to calculate your ideal modular profile.
          </p>

          <div className="flex flex-col gap-4 font-sans text-xs">
            
            {/* Height Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center font-mono text-[10px] text-gray-500">
                <span>BODY HEIGHT</span>
                <span className="font-bold text-black">{height} cm</span>
              </div>
              <input
                type="range"
                min={160}
                max={205}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-[#FF4A1C] bg-gray-100 h-1 rounded"
              />
            </div>

            {/* Chest Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center font-mono text-[10px] text-gray-500">
                <span>CHEST CIRCUMFERENCE</span>
                <span className="font-bold text-black">{chest} cm</span>
              </div>
              <input
                type="range"
                min={85}
                max={130}
                value={chest}
                onChange={(e) => setChest(Number(e.target.value))}
                className="w-full accent-[#FF4A1C] bg-gray-100 h-1 rounded"
              />
            </div>

            {/* Shoulder Width */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center font-mono text-[10px] text-gray-500">
                <span>SHOULDER WIDTH</span>
                <span className="font-bold text-black">{shoulder} cm</span>
              </div>
              <input
                type="range"
                min={40}
                max={56}
                value={shoulder}
                onChange={(e) => setShoulder(Number(e.target.value))}
                className="w-full accent-[#FF4A1C] bg-gray-100 h-1 rounded"
              />
            </div>

          </div>

          {/* Sizing result */}
          <div className="bg-[#1A1A1A] text-white p-5 rounded-[24px] flex items-center justify-between shadow-inner">
            <div className="flex flex-col text-left">
              <span className="font-mono text-[9px] text-[#FF4A1C] font-bold tracking-widest uppercase">
                CALCULATED OPTION
              </span>
              <span className="font-sans text-xs text-gray-300 mt-1">Modular Relaxed Profile</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="font-display font-black text-4xl text-white">{getRecommendedSize()}</span>
              
              {/* Vertical divider */}
              <div className="w-[1px] h-8 bg-white/10" />
              
              <button
                onClick={() => alert(`Sizing configuration (${getRecommendedSize()}) successfully saved to local active session.`)}
                className="bg-white hover:bg-[#FF4A1C] hover:text-white text-black font-mono text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              >
                APPLY SIZING
              </button>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
