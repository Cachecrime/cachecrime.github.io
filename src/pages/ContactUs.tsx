import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Terminal, 
  Lock, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Fingerprint
} from "lucide-react";

export default function ContactUs() {
  const [email, setEmail] = useState("");
  const [pgpKey, setPgpKey] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      alert("Encryption matrix requires at least Sender Identity and Transmission Payload.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail("");
      setPgpKey("");
      setMessage("");
      setTimeout(() => setSuccess(false), 5000);
    }, 2200);
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
            <span className="w-2 bg-[#FF4A1C] h-4" />
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">SECURE CHANNEL COMMUNICATION</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-none lowercase">
            contact us.
          </h2>
        </div>
        <p className="font-sans text-gray-500 max-w-sm text-xs md:text-sm leading-relaxed text-left md:text-right">
          Establish encrypted transmissions with the design lab. All inquiries are parsed through air-gapped terminal pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Interactive Contact Form (7 of 12) */}
        <div className="lg:col-span-7 bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 shadow-sm text-left">
          
          <div className="flex items-center gap-2 border-b border-black/5 pb-4 mb-6">
            <Terminal className="w-4.5 h-4.5 text-[#FF4A1C]" />
            <span className="font-mono text-xs text-black font-extrabold uppercase tracking-wider">
              secured transmission interface
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Sender Email */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                SENDER IDENTITY (EMAIL ADDRESS)
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="identity@domain.com"
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 font-sans text-xs focus:outline-none focus:border-[#FF4A1C] focus:bg-white transition-all"
              />
            </div>

            {/* Optional PGP Public Key */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                  PGP PUBLIC KEY LINK (OPTIONAL)
                </label>
                <span className="font-mono text-[8px] text-gray-400 font-semibold uppercase">For reply encryption</span>
              </div>
              <input
                type="text"
                value={pgpKey}
                onChange={(e) => setPgpKey(e.target.value)}
                placeholder="https://keyserver.ubuntu.com/pks/lookup?search=0x..."
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 font-sans text-xs focus:outline-none focus:border-[#FF4A1C] focus:bg-white transition-all"
              />
            </div>

            {/* Message payload */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                TRANSMISSION PAYLOAD (MESSAGE)
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your encrypted message packet..."
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 font-sans text-xs focus:outline-none focus:border-[#FF4A1C] focus:bg-white transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Dynamic Encrypted Text Stream Preview */}
            {message && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 font-mono text-[9px] text-[#FF4A1C] overflow-hidden leading-normal select-all break-all shadow-inner"
              >
                <div className="flex items-center gap-1.5 text-gray-400 uppercase font-bold text-[8px] mb-2 border-b border-white/10 pb-1.5">
                  <Lock className="w-3 h-3 text-[#FF4A1C]" /> REAL-TIME ENCRYPTION SHIELD ACTIVE
                </div>
                -----BEGIN PGP MESSAGE-----<br/>
                Version: CacheCrime Crypt-v4.11<br/>
                Payload-Checksum: {btoa(message).substring(0, 15)}...<br/>
                <span className="text-white">
                  {btoa(message + email).substring(0, 180)}
                </span><br/>
                -----END PGP MESSAGE-----
              </motion.div>
            )}

            {/* Submit Button */}
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-500/10"
                >
                  <CheckCircle className="w-4.5 h-4.5" /> TRANSMISSION COURIED SUCCESSFULLY
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                    loading 
                      ? "bg-black/25 text-gray-400 cursor-not-allowed" 
                      : "bg-[#FF4A1C] text-white hover:bg-[#e03a10] hover:shadow-[0_4px_15px_rgba(255,74,28,0.2)]"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>STAGING HANDSHAKE MATRICES...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>TRANSMIT ENCRYPTED ENVELOPE</span>
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>

          </form>

        </div>

        {/* Right Side: Traditional Secure Relays (5 of 12) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Node metadata box */}
          <div className="bg-black text-white p-6 rounded-[32px] border border-white/10 text-left flex flex-col gap-5 relative overflow-hidden shadow-md">
            
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4.5 h-4.5 text-[#FF4A1C]" />
              <span className="font-mono text-[9px] text-[#FF4A1C] font-black tracking-widest uppercase">
                physical relay contact points
              </span>
            </div>

            <div className="flex flex-col gap-4">
              
              {/* Point 1 */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-gray-400 font-bold uppercase">SECURE INBOX</span>
                  <span className="font-sans text-xs sm:text-sm font-semibold select-all text-white">inbox@cachecrime.labs</span>
                  <span className="font-sans text-[10px] text-gray-500">PGP Key ID: 0x98AF311E</span>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-gray-400 font-bold uppercase">PHYSICAL CELL</span>
                  <span className="font-sans text-xs sm:text-sm font-semibold text-white">Copenhagen, DK</span>
                  <span className="font-sans text-[10px] text-gray-400">Nørrebrogade 14B // Vault Annex</span>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-gray-400 font-bold uppercase">OPERATIONAL INTERVALS</span>
                  <span className="font-sans text-xs sm:text-sm font-semibold text-white">10:00 - 18:00 UTC</span>
                  <span className="font-sans text-[10px] text-gray-500">Response queue: under 240 mins</span>
                </div>
              </div>

            </div>
          </div>

          {/* Security Alert Caution banner */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200/60 text-left flex gap-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1 font-sans text-xs">
              <span className="font-bold text-amber-900">Communication Advisory</span>
              <p className="text-amber-700 leading-relaxed text-[11px]">
                Do not submit classified design blueprints, unencrypted database credentials, or critical personal information. Cachecrime will never solicit raw wallet recovery keys.
              </p>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
