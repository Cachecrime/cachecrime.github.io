import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Sparkles, 
  Send, 
  FolderGit, 
  MapPin, 
  CheckCircle,
  HelpCircle,
  Terminal,
  ArrowRight
} from "lucide-react";

export default function LetsCollaborate() {
  const [partnerType, setPartnerType] = useState<"DESIGNER" | "CONTRIBUTOR" | "DISTRIBUTOR">("DESIGNER");
  const [name, setName] = useState("");
  const [proposal, setProposal] = useState("");
  const [location, setLocation] = useState("CPH");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !proposal) {
      alert("Please fill in Name/Alias and Proposal description.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName("");
      setProposal("");
      setTimeout(() => setSubmitted(false), 5000);
    }, 1800);
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
            <span className="w-2.5 h-2.5 bg-black rounded-full" />
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">MUTUAL DECENTRALIZED COOPERATION</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-none lowercase">
            let's collaborate.
          </h2>
        </div>
        <p className="font-sans text-gray-500 max-w-sm text-xs md:text-sm leading-relaxed text-left md:text-right">
          Join active cachecrime operations. We co-develop conceptual garments, physical enclaves, and cryptographic software protocols.
        </p>
      </div>

      {/* Grid splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Collaboration Proposal Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 shadow-sm text-left">
          
          <div className="flex items-center gap-2 border-b border-black/5 pb-4 mb-6">
            <Sparkles className="w-4.5 h-4.5 text-[#FF4A1C]" />
            <span className="font-mono text-xs text-black font-extrabold uppercase tracking-wider">
              operation proposal intake
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Partnership type selector tab */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                OPERATION CLASSIFICATION
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "DESIGNER", label: "Creative Design" },
                  { value: "CONTRIBUTOR", label: "Dev/Protocol" },
                  { value: "DISTRIBUTOR", label: "Lab Courier" }
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setPartnerType(type.value as any)}
                    className={`p-3 rounded-xl border font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer leading-tight ${
                      partnerType === type.value
                        ? "bg-black border-black text-white shadow-sm"
                        : "bg-gray-50 border-black/5 text-gray-500 hover:text-black hover:bg-white"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name/Alias */}
            <div className="flex flex-col gap-1.5 mt-2">
              <label className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                CODENAME OR ALIAS
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Agent K or ZeroZero"
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 font-sans text-xs focus:outline-none focus:border-[#FF4A1C] focus:bg-white transition-all"
              />
            </div>

            {/* Preferred Target Cell */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                PREFERRED HUB CELL
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: "CPH", label: "Copenhagen" },
                  { value: "TYO", label: "Tokyo" },
                  { value: "BER", label: "Berlin" },
                  { value: "SEL", label: "Seoul" }
                ].map((hub) => (
                  <button
                    key={hub.value}
                    type="button"
                    onClick={() => setLocation(hub.value)}
                    className={`py-2 rounded-xl border font-mono text-[10px] font-bold uppercase transition-all cursor-pointer ${
                      location === hub.value
                        ? "bg-black border-black text-white"
                        : "bg-gray-50 border-black/5 text-gray-400 hover:text-black hover:bg-white"
                    }`}
                  >
                    {hub.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Proposal description */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                PROPOSAL BRIEFING (DEEP INTEGRATION CONCEPT)
              </label>
              <textarea
                required
                rows={5}
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                placeholder="Explain how you envision co-developing tech wear or digital systems with cachecrime cells..."
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 font-sans text-xs focus:outline-none focus:border-[#FF4A1C] focus:bg-white transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Submit button */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4.5 h-4.5" /> INTAKE PACKET SECURED
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    loading 
                      ? "bg-black/25 text-gray-400 cursor-not-allowed" 
                      : "bg-[#FF4A1C] text-white hover:bg-[#e03a10]"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>SIGNING DATA ENVELOPES...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>ENLIST PROPOSAL</span>
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>

          </form>

        </div>

        {/* Right column: Info & Open Source (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Partnership stats & cell */}
          <div className="bg-black text-white p-6 sm:p-8 rounded-[32px] border border-white/10 text-left flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <FolderGit className="w-4.5 h-4.5 text-[#FF4A1C]" />
              <span className="font-mono text-[9px] text-[#FF4A1C] font-black tracking-widest uppercase">
                open-source system contribution
              </span>
            </div>

            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              We host several open-source libraries focused on secure enclave cryptography, BLE handshake filters, and dynamic sizing matrices.
            </p>

            <div className="flex flex-col gap-3.5 border-t border-white/10 pt-4 font-mono text-[11px]">
              <a href="https://github.com/cachecrime" target="_blank" className="flex items-center justify-between text-gray-300 hover:text-white transition-colors group">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FF4A1C] rounded-full" />
                  <span>github.com/cachecrime</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a href="#discord" className="flex items-center justify-between text-gray-300 hover:text-white transition-colors group" onClick={() => alert("Secure discord bridge handshake completed.")}>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                  <span>secure-chat-server.onion</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Collaborative Callout Card */}
          <div className="bg-white rounded-2xl p-6 border border-black/5 text-left flex flex-col gap-3">
            <span className="font-mono text-[8px] text-gray-400 font-bold tracking-wider uppercase">
              CO-LAB STATEMENT
            </span>
            <p className="font-sans text-xs text-gray-500 leading-relaxed">
              We collaborate exclusively with creators who respect decentralized paradigms. All creative property developed under active lab operations remains cryptographically licensed to the designer cells.
            </p>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
