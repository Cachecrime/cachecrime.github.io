import React from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Globe, 
  RefreshCw,
  FileText
} from "lucide-react";

export default function PrivacyPolicy() {
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
            <span className="w-2.5 h-2.5 bg-[#FF4A1C] rounded-full" />
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">DECENTRALIZED COMPLIANCE PROTOCOL</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-none lowercase">
            privacy policy.
          </h2>
        </div>
        <p className="font-sans text-gray-500 max-w-sm text-xs md:text-sm leading-relaxed text-left md:text-right">
          Effective Date: July 04, 2026. Cryptographically assured zero-tracking and localized state preservation.
        </p>
      </div>

      {/* Main Column Editorial layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Policy sections (8 of 12) */}
        <div className="lg:col-span-8 bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm text-left flex flex-col gap-8">
          
          {/* Section 1 */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sans font-bold text-lg sm:text-xl text-black tracking-tight flex items-center gap-2">
              <span className="font-mono text-xs text-[#FF4A1C] font-extrabold bg-gray-100 px-2.5 py-1 rounded-lg">1.0</span>
              Zero-Telemetry Architecture
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
              We do not track, log, aggregate, or profile user interactions, browser telemetry, or physical geographic coordinates. No external analytics SDKs (such as Google Analytics or Facebook Pixel) exist inside the <strong className="text-black font-semibold">cachecrime</strong> network environment.
            </p>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sans font-bold text-lg sm:text-xl text-black tracking-tight flex items-center gap-2">
              <span className="font-mono text-xs text-[#FF4A1C] font-extrabold bg-gray-100 px-2.5 py-1 rounded-lg">2.0</span>
              Air-Gapped Client State Persistence
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
              Any shopping, size parameters, wallet details, or local user inputs are kept strictly within your browser's local sandbox storage context. No background database servers collect or synchronize your active session settings unless you explicitly authorize a decentralized transaction handshake.
            </p>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sans font-bold text-lg sm:text-xl text-black tracking-tight flex items-center gap-2">
              <span className="font-mono text-xs text-[#FF4A1C] font-extrabold bg-gray-100 px-2.5 py-1 rounded-lg">3.0</span>
              Cryptographic Wallet Integration
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
              When verifying product serial numbers or engaging in decentralized payments, we do not require your email, name, or phone number. We utilize zero-knowledge proof protocols to validate transaction success without capturing secondary personal identities.
            </p>
          </div>

          {/* Section 4 */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sans font-bold text-lg sm:text-xl text-black tracking-tight flex items-center gap-2">
              <span className="font-mono text-xs text-[#FF4A1C] font-extrabold bg-gray-100 px-2.5 py-1 rounded-lg">4.0</span>
              Physical Parcel Privacy
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
              For material shipments, physical delivery data is cryptographically scrambled and shared exclusively with localized Swiss delivery hubs. Post-delivery, all courier trace indices are wiped cleanly from active servers within 14 operational days.
            </p>
          </div>

        </div>

        {/* Right Side: Security Seals (4 of 12) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Quick Stats list */}
          <div className="bg-black text-white p-6 sm:p-8 rounded-[32px] border border-white/10 text-left flex flex-col gap-6 relative overflow-hidden shadow-md">
            
            <div className="flex items-center gap-2">
              <Lock className="w-4.5 h-4.5 text-[#FF4A1C]" />
              <span className="font-mono text-[9px] text-[#FF4A1C] font-black tracking-widest uppercase">
                SECURITY SEAL SPECIFICATION
              </span>
            </div>

            <div className="flex flex-col gap-5 font-sans text-xs">
              
              <div className="flex flex-col border-b border-white/10 pb-3">
                <span className="text-gray-400 font-mono text-[9px]">COOKIES STORAGE</span>
                <span className="text-white font-bold text-sm mt-0.5">0% (NONE IN USE)</span>
              </div>

              <div className="flex flex-col border-b border-white/10 pb-3">
                <span className="text-gray-400 font-mono text-[9px]">ENCRYPTION BITRATE</span>
                <span className="text-white font-bold text-sm mt-0.5">AES-256-GCM SSL</span>
              </div>

              <div className="flex flex-col border-b border-white/10 pb-3">
                <span className="text-gray-400 font-mono text-[9px]">LOG RETENTION POLICY</span>
                <span className="text-white font-bold text-sm mt-0.5">14 DAYS AUTO-WIPE</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-400 font-mono text-[9px]">TRACKERS DETECTED</span>
                <span className="text-emerald-400 font-bold text-sm mt-0.5">ZERO // SHIELD VERIFIED</span>
              </div>

            </div>
          </div>

          {/* Privacy statement note */}
          <div className="bg-white rounded-2xl p-5 border border-black/5 text-left flex gap-3">
            <EyeOff className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <p className="font-sans text-[11px] text-gray-500 leading-relaxed">
              Our privacy policy is reviewed twice annually to meet evolving peer-to-peer data protection criteria.
            </p>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
