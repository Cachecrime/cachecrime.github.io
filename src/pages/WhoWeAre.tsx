import React from "react";
import { motion } from "motion/react";
import { 
  Compass, 
  Layers, 
  Award, 
  Terminal, 
  Heart, 
  Globe, 
  Fingerprint,
  ArrowRight
} from "lucide-react";

export default function WhoWeAre() {
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
            <span className="w-2 bg-[#FF4A1C] h-4" />
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">IDENTITY & ORIGINS</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-none lowercase">
            who we are.
          </h2>
        </div>
        <p className="font-sans text-gray-500 max-w-sm text-xs md:text-sm leading-relaxed text-left md:text-right">
          A decentralised network of designers, technologists, and security specialists crafting high-concept utility armor.
        </p>
      </div>

      {/* Brand Manifesto Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Main large text / Manifesto statement (7 of 12) */}
        <div className="md:col-span-7 bg-white rounded-[32px] p-8 md:p-10 border border-black/5 shadow-sm text-left flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[9px] text-[#FF4A1C] font-extrabold tracking-widest uppercase block">THE MANIFESTO</span>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight text-black tracking-tight">
              "we operate in the intersection of digital espionage and tangible survival wear."
            </h3>
            <p className="font-sans text-sm text-gray-500 leading-relaxed">
              Formed in 2019 in Copenhagen with cells now in Tokyo, Berlin, and Seoul, 
              <strong className="text-black font-semibold"> cachecrime </strong> was built on a singular realization: our data trails are visible, our physical coordinates are tracked, and the atmospheric parameters are degrading. 
            </p>
            <p className="font-sans text-sm text-gray-500 leading-relaxed">
              We construct dynamic outerwear systems tailored for survival in high-density corporate espionage hubs. Each piece balances 3-layer GORE-TEX waterproofing with integrated RF-blocking pockets, dynamic physical styling, and hidden cryptographic signatures.
            </p>
          </div>

          <div className="border-t border-black/5 pt-6 flex items-center justify-between">
            <span className="font-mono text-[10px] text-gray-400">ESTABLISHED // CODENAME: 19.8.19</span>
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-black">
              <span>Read the full Whitepaper</span>
              <ArrowRight className="w-4 h-4 text-[#FF4A1C]" />
            </div>
          </div>
        </div>

        {/* Highlight Image Mockup (5 of 12) */}
        <div className="md:col-span-5 relative group overflow-hidden rounded-[32px] aspect-[4/5] md:aspect-auto shadow-sm flex flex-col justify-end text-left">
          <img 
            src="/images/techwear_model_1783163010199.jpg" 
            alt="Cachecrime lead designer profile" 
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          
          <div className="relative z-10 p-6 text-white flex flex-col gap-1.5">
            <span className="font-mono text-[9px] text-[#FF4A1C] font-bold tracking-widest uppercase">FOUNDER & CHIEF SYSTEM DESIGNER</span>
            <h4 className="font-sans font-bold text-xl tracking-tight leading-tight">Victor Sterling</h4>
            <p className="font-mono text-[10px] text-white/70">FORMER CYBERWARFARE LIAISON // CPH LABS</p>
          </div>
        </div>

      </div>

      {/* Core Values / Three Column Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Value 1 */}
        <div className="bg-white/60 hover:bg-white transition-all duration-300 p-6 rounded-[28px] border border-black/5 text-left flex flex-col gap-4">
          <div className="w-10 h-10 rounded-2xl bg-[#FF4A1C]/10 flex items-center justify-center text-[#FF4A1C]">
            <Compass className="w-5 h-5 stroke-[2]" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="font-sans font-bold text-base text-black tracking-tight">Radical Adaptability</h4>
            <p className="font-sans text-xs text-gray-500 leading-relaxed">
              We design modular systems with detachable components, dynamic straps, and dual-layer configurations that adapt to sudden environmental or security shifts.
            </p>
          </div>
        </div>

        {/* Value 2 */}
        <div className="bg-white/60 hover:bg-white transition-all duration-300 p-6 rounded-[28px] border border-black/5 text-left flex flex-col gap-4">
          <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-black">
            <Fingerprint className="w-5 h-5 stroke-[2]" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="font-sans font-bold text-base text-black tracking-tight">Technical Honesty</h4>
            <p className="font-sans text-xs text-gray-500 leading-relaxed">
              No decorative lines, no fake features. Every tactical strap, Fidlock magnet, and heat-sealed zipper serves a precise, mechanically validated operational objective.
            </p>
          </div>
        </div>

        {/* Value 3 */}
        <div className="bg-white/60 hover:bg-white transition-all duration-300 p-6 rounded-[28px] border border-black/5 text-left flex flex-col gap-4">
          <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-black">
            <Layers className="w-5 h-5 stroke-[2]" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="font-sans font-bold text-base text-black tracking-tight">Material Superiority</h4>
            <p className="font-sans text-xs text-gray-500 leading-relaxed">
              We source directly from specialized suppliers in Italy, Japan, and South Korea, incorporating rare, heavy-weight technical membranes and bulletproof Kevlar ripstops.
            </p>
          </div>
        </div>

      </div>

      {/* Global Cells Network Map (Conceptual visual) */}
      <div className="bg-black text-white rounded-[32px] p-6 sm:p-10 text-left relative overflow-hidden shadow-md">
        
        {/* Background circuit grid graphic */}
        <div className="absolute inset-0 opacity-10 pointer-events-none font-mono text-[8px] leading-none select-none text-white p-4 break-all">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="mb-1">
              0x10FF5C... CPH_SERVER_ONLINE_NODE_VERIFIED_CONNECT_TRUE_0x9B41E_TOK_SYS_OK...
            </div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col gap-6 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF4A1C] rounded-full animate-pulse" />
            <span className="font-mono text-[9px] text-[#FF4A1C] font-bold tracking-widest uppercase">ACTIVE NODES COORDINATES</span>
          </div>
          
          <h3 className="font-sans font-bold text-xl sm:text-2xl tracking-tight leading-tight">
            Decentralized cells operating in high-density hubs.
          </h3>

          <p className="font-sans text-xs text-gray-400 leading-relaxed">
            We operate without centralized corporate overhead. Our design and production teams coordinate across isolated micro-studios to evade standard corporate monitoring registries.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
            <div>
              <span className="text-[#FF4A1C] font-bold block">NODE CPH</span>
              <span className="text-gray-400 text-[10px]">Copenhagen, DK</span>
            </div>
            <div>
              <span className="text-white font-bold block">NODE TYO</span>
              <span className="text-gray-400 text-[10px]">Tokyo, JP</span>
            </div>
            <div>
              <span className="text-white font-bold block">NODE BER</span>
              <span className="text-gray-400 text-[10px]">Berlin, DE</span>
            </div>
            <div>
              <span className="text-white font-bold block">NODE SEL</span>
              <span className="text-gray-400 text-[10px]">Seoul, KR</span>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
