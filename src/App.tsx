import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowDown, 
  MoreVertical, 
  X, 
  Check, 
  ShieldCheck, 
  Cpu, 
  Layers,
  ArrowUpRight,
  Sparkles,
  Home,
  MessageSquare,
  Plus,
  Minus,
  CreditCard,
  Users,
  Compass,
  Archive,
  Heart,
  Folder,
  Code,
  ChevronDown,
  BookOpen,
  Award,
  Fingerprint,
  Instagram,
  Github,
  Search,
  ShieldAlert,
  Palette,
  Sun,
  Moon
} from "lucide-react";

import Investigations from "./pages/Investigations";
import WhoWeAre from "./pages/WhoWeAre";
import Projects from "./pages/Projects";
import ContactUs from "./pages/ContactUs";
import StandardPractices from "./pages/StandardPractices";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Tools from "./pages/Tools";
import Graphics from "./pages/Graphics";
import LetsCollaborate from "./pages/LetsCollaborate";

// Slide Data matching the exact aesthetic of the mockups with custom generated image assets
const SLIDES = [
  {
    id: 1,
    image: "/images/satellite_forensic_map_1783279004268.jpg",
    title: "map.",
    collection: "FORENSIC ARCHITECTURE // CASE 01",
    chinese: "地理调查",
    location: "COPENHAGEN, DENMARK",
    mfg: "SATELLITE INTEL",
    code: "MAP FORENSIC//2026",
    desc1: "TERRAIN RECONSTRUCTION AND BORDER TRACKING LOGS FOR REFUGEE ARRIVAL PHASES IN SCANDINAVIA.",
    desc2: "INTEGRATED INTEL.",
    desc3: "OPTIMIZED SPATIAL DATA VISUALIZATION SYSTEMS.",
    desc4: "ACTIVE INVESTIGATION PORTAL 01",
    badge: "MAPPED BORDERS DIVISION 2026",
    specs: {
      materials: "Orthorectified Sentinel-2 Multispectral Imagery, SAR Radar",
      protection: "High-resolution topographic vectors, GIS Layering",
      fit: "Georeferenced projection EPSG:3857 (Web Mercator)",
      serial: "MAP-LABS // SN-2026-DK"
    }
  },
  {
    id: 2,
    image: "/images/satellite_urban_grid_1783279049512.jpg",
    title: "grid.",
    collection: "SURVEILLANCE FORENSICS // CASE 02",
    chinese: "城市监控",
    location: "TOKYO, JAPAN",
    mfg: "AIRBORNE SENSORS",
    code: "GRID FORENSIC//2026",
    desc1: "CELLULAR TRIANGULATION AND THERMAL IMAGING ANOMALIES DETECTED IN HIGH-DENSITY URBAN ENVIRONMENTS.",
    desc2: "TACTICAL RECON.",
    desc3: "FOR INTUITIVE ADAPTIVE DENSE METRO SCAN.",
    desc4: "ACTIVE URBAN SCANNING PORTAL 02",
    badge: "URBAN PATTERNS DIVISION 2026",
    specs: {
      materials: "High-Altitude Reconnaissance, Thermal Infrared Sensors",
      protection: "Cell Tower Sector Triangulation, RF Heatmapping",
      fit: "3D Urban mesh overlays, sub-meter accuracy geo-registration",
      serial: "GRID-LABS // SN-2026-JP"
    }
  },
  {
    id: 3,
    image: "/images/satellite_maritime_radar_1783279065694.jpg",
    title: "nav.",
    collection: "MARITIME TRACING // CASE 03",
    chinese: "雷达搜寻",
    location: "BERLIN, GERMANY",
    mfg: "COASTAL TRACKING",
    code: "NAV FORENSIC//2026",
    desc1: "COASTAL RADAR ARRAY RETRIEVALS AND DEVIANT VESSEL ROUTE RECONSTRUCTION IN EXCLUSION ZONES.",
    desc2: "OCEAN SEARCH.",
    desc3: "TRACKING MARITIME BORDER FLOW & SHIP ID.",
    desc4: "ACTIVE MARITIME SCAN PORTAL 03",
    badge: "RADAR MARITIME INITIATIVE 2026",
    specs: {
      materials: "Synthetic Aperture Radar (SAR), Automatic Identification System (AIS)",
      protection: "Vessel track reconstruction, anomalous course detection",
      fit: "High-resolution marine navigation charts, bathymetric layers",
      serial: "NAV-LABS // SN-2026-EU"
    }
  }
];

function TypewriterLogo({ text, delay = 350 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); // Start empty
    
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (prev.length < text.length) {
          return text.substring(0, prev.length + 1);
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <div className="flex items-center gap-1 font-display font-black text-4xl md:text-6xl tracking-tighter text-white lowercase">
      <span>{displayedText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        className="w-[4px] h-[1.1em] bg-[#FF4A1C] self-center"
      />
    </div>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail("");
    }, 1200);
  };

  return (
    <section className="w-full max-w-7xl mx-auto mt-24 mb-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="w-full rounded-3xl sm:rounded-[40px] bg-transparent sm:bg-[#F0F4F8] sm:dark:bg-[#15181F] p-0 sm:p-16 lg:p-20 flex flex-col items-center justify-center transition-colors duration-300">
        <div className="w-full max-w-md mx-auto rounded-3xl sm:rounded-[32px] bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[0_8px_20px_#d1d9e6,0_-8px_20px_#ffffff] dark:shadow-[0_8px_20px_#0d0e12,0_-8px_20px_#272c36] sm:shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff] sm:dark:shadow-[12px_12px_24px_#0d0e12,-12px_-12px_24px_#272c36] p-6 min-[375px]:p-8 sm:p-10 flex flex-col items-center border sm:border border-white/40 dark:border-white/5">
          {/* Neumorphic Decorative Social/Identity Icons resembling reference image */}
          <div className="flex justify-center gap-5 mb-8">
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#0d0e12,-5px_-5px_10px_#272c36] flex items-center justify-center text-[#8C6BE8] hover:scale-110 hover:rotate-6 active:scale-95 transition-all duration-200 cursor-pointer border border-white/50 dark:border-white/[0.02]"
            >
              <svg 
                viewBox="0 0 24 24" 
                aria-hidden="true" 
                className="w-4.5 h-4.5 fill-current"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#0d0e12,-5px_-5px_10px_#272c36] flex items-center justify-center text-[#8C6BE8] hover:scale-110 hover:-rotate-6 active:scale-95 transition-all duration-200 cursor-pointer border border-white/50 dark:border-white/[0.02]"
            >
              <Instagram className="w-5 h-5 stroke-[2]" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#0d0e12,-5px_-5px_10px_#272c36] flex items-center justify-center text-[#8C6BE8] hover:scale-110 hover:rotate-12 active:scale-95 transition-all duration-200 cursor-pointer border border-white/50 dark:border-white/[0.02]"
            >
              <Github className="w-5 h-5 stroke-[2]" />
            </a>
          </div>

          {/* Core message requested by the user */}
          <h3 className="font-mono text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400 tracking-tight text-center max-w-xs mb-8 leading-relaxed uppercase">
            Be the first to know about new investigations, projects and tools
          </h3>

          {/* Subscription Interaction Form */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center w-full"
                >
                  {/* Neumorphic Inset Input */}
                  <div className="w-full flex flex-col gap-2 mb-8">
                    <div className="w-full relative rounded-2xl bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0d0e12,inset_-4px_-4px_8px_#272c36] px-5 py-4 flex items-center border border-white/20 dark:border-black/5">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        disabled={isSubmitting}
                        className="w-full bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 font-mono text-xs tracking-wide focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Neumorphic Rounded Purple Submit Button (Identical to "Sign In" button color & style in image) */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-40 bg-[#8C6BE8] hover:bg-[#7D5CD7] disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-600 text-white font-mono text-xs font-semibold tracking-wider py-3.5 rounded-[18px] transition-all duration-300 cursor-pointer shadow-[0_8px_20px_rgba(140,103,235,0.4)] active:scale-95 hover:scale-[1.03] flex items-center justify-center gap-2 border border-white/20 dark:border-white/5"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#0d0e12,-5px_-5px_10px_#272c36] flex items-center justify-center text-emerald-500 mb-6 border border-white/50 dark:border-white/[0.02]">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <h4 className="font-mono font-bold text-emerald-500 text-xs tracking-wider uppercase mb-2">
                    ACCESS GRANTED
                  </h4>
                  <p className="font-mono text-[10px] text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed px-4">
                    Your email clearance has been registered. Welcome to cachecrime.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Neumorphic bottom caption links inspired by "New here? Create account" */}
          <div className="mt-8 flex flex-col items-center gap-1.5 font-mono text-[9px] text-gray-400 dark:text-gray-500">
            <a href="#practices" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors uppercase tracking-wider">
              New here? Read standard practices
            </a>
            <a href="#collaborate" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors uppercase tracking-wider">
              Want to collaborate?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("theme");
    return (stored as "light" | "dark") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const [currentPage, setCurrentPage] = useState<string>("home");
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [size, setSize] = useState("M");

  const activeSlide = SLIDES[activeIdx];

  // Navigate slides
  const nextSlide = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const setSlide = (idx: number) => {
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  };

  const scrollToContent = () => {
    const element = document.getElementById("editorial-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx]);

  // Automatic slideshow interval (advances every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIdx]);

  return (
    <div className={`min-h-screen w-full bg-[#E1E1E1] dark:bg-[#0B0B0C] text-black dark:text-white flex flex-col px-6 pb-6 pt-0 md:px-10 md:pb-10 md:pt-0 relative overflow-x-hidden font-sans ${isLoading ? "overflow-y-hidden h-screen" : "overflow-y-auto"}`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] bg-[#0B0B0C] flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-3">
              <TypewriterLogo text="cachecrime" />
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="font-mono text-[9px] text-gray-400 uppercase tracking-[0.2em] font-extrabold mt-3"
              >
                loading system integrity
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* FIXED HANGING TOP NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F0F4F8]/80 dark:bg-[#15181F]/80 backdrop-blur-md px-3 py-3 sm:px-4 md:px-10 md:py-6 border-b border-[#d1d9e6]/50 dark:border-black/20 flex justify-center transition-all">
        <div className="w-full max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-12">
            {/* Bold cachecrime logo placeholder - monogram on mobile, full text on desktop */}
            <span 
              onClick={() => {
                setCurrentPage("home");
                setIsMenuOpen(false);
              }}
              className="font-display font-black text-[13px] min-[360px]:text-sm sm:text-lg md:text-2xl tracking-tighter text-black dark:text-white cursor-pointer hover:text-[#FF4A1C] transition-colors duration-200 lowercase shrink-0"
            >
              cachecrime
            </span>
          </div>

          <nav className="flex items-center gap-1.5 sm:gap-3 md:gap-4 shrink-0">
            {/* Menu icon */}
            <div className="relative">
              
              {/* DESKTOP/TABLET/MOBILE BAR (Redesigned with beautiful, sleek Neumorphism matching the subscription card) */}
              <div className="flex items-center bg-[#F0F4F8] dark:bg-[#1A1D24] rounded-full px-2 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 border border-white/50 dark:border-white/5 shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0d0e12,-4px_-4px_8px_#272c36] sm:shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] sm:dark:shadow-[8px_8px_16px_#0d0e12,-8px_-8px_16px_#272c36] gap-1.5 sm:gap-3 md:gap-4 lg:gap-5 select-none text-black dark:text-white transition-colors duration-300">
                {/* Profile section with chevron - toggles dropdown */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-1 sm:gap-1.5 hover:opacity-85 transition-opacity cursor-pointer text-left text-black dark:text-white shrink-0"
                >
                  <span className="font-display font-black text-sm tracking-tight text-black dark:text-white lowercase mr-1 hidden xl:inline">
                    cachecrime
                  </span>
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120" 
                    alt="cachecrime avatar" 
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-lg sm:rounded-xl object-cover border border-white/40 dark:border-white/10 shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#0d0e12,-2px_-2px_4px_#272c36] shrink-0"
                  />
                  <span className="font-bold text-xs tracking-tight text-gray-700 dark:text-gray-200 font-sans hidden md:inline whitespace-nowrap">see our projects</span>
                  <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 dark:text-gray-400 transition-transform duration-200 shrink-0 ${isMenuOpen ? "rotate-180 text-[#8C6BE8]" : ""}`} />
                </button>

                {/* Divider */}
                <div className="hidden sm:block w-[1.5px] h-5 bg-[#d1d9e6] dark:bg-[#272c36] shrink-0" />

                {/* Neumorphic Inset "Lessons" Button */}
                <a 
                  href="#lessons"
                  className="hidden sm:flex bg-[#F0F4F8] dark:bg-[#1A1D24] hover:bg-[#F0F4F8] dark:hover:bg-[#1A1D24] shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0d0e12,inset_-2px_-2px_4px_#272c36] active:scale-95 transition-all px-2 py-1 md:px-3.5 md:py-1.5 rounded-xl flex items-center gap-1.5 sm:gap-2 shrink-0 border border-white/20 dark:border-black/10"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 font-bold text-[10px] sm:text-[11px] tracking-tight text-gray-600 dark:text-gray-300">
                    <BookOpen className="w-3.5 h-3.5 text-[#8C6BE8] dark:text-[#8C6BE8] stroke-[2.5]" />
                    <span className="hidden lg:inline">Lessons</span>
                  </div>
                </a>

                {/* Neumorphic Inset "Achievements" Button */}
                <a 
                  href="#achievements"
                  className="hidden sm:flex bg-[#F0F4F8] dark:bg-[#1A1D24] hover:bg-[#F0F4F8] dark:hover:bg-[#1A1D24] shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0d0e12,inset_-2px_-2px_4px_#272c36] active:scale-95 transition-all px-2 py-1 md:px-3.5 md:py-1.5 rounded-xl flex items-center gap-1.5 sm:gap-2 shrink-0 border border-white/20 dark:border-black/10"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 font-bold text-[10px] sm:text-[11px] tracking-tight text-gray-600 dark:text-gray-300">
                    <Award className="w-3.5 h-3.5 text-[#8C6BE8] dark:text-[#8C6BE8] stroke-[2.5]" />
                    <span className="hidden lg:inline">Achievements</span>
                  </div>
                </a>

                {/* Wallet Section */}
                <div className="flex items-center text-[10px] sm:text-[11px] font-semibold text-gray-400 dark:text-gray-500 gap-1 pl-1 shrink-0">
                  <span className="hidden lg:inline font-mono text-[9px] uppercase tracking-wider">Wallet</span>
                  <span className="text-[#8C6BE8] dark:text-[#8C6BE8] font-black text-[11px] sm:text-[12px]">$19.40</span>
                </div>

                {/* Fingerprint Button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] dark:shadow-[3px_3px_6px_#0d0e12,-3px_-3px_6px_#272c36] flex items-center justify-center text-[#8C6BE8] hover:scale-105 hover:text-[#7D5CD7] active:scale-95 transition-all duration-200 cursor-pointer border border-white/50 dark:border-white/[0.02] shrink-0"
                >
                  <Fingerprint className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[1.8]" />
                </button>
              </div>

              {/* HIGH FIDELITY DROPDOWN OVERLAY (Mimics Faizur / Candy box menu second image) */}
              <AnimatePresence>
                {isMenuOpen && (
                  <>
                    {/* Backdrop to close click outside */}
                    <div 
                      className="fixed inset-0 z-40 bg-transparent"
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 mt-3 w-[295px] sm:w-[500px] bg-[#EAEAEA] dark:bg-[#1A1A1E] rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.18)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-white/50 dark:border-white/10 p-6 md:p-8 z-50 flex flex-col gap-6 text-left text-black dark:text-white select-text"
                    >
                      {/* Menu title with Sparkle */}
                      <div className="flex items-center gap-2 text-black dark:text-white border-b border-black/5 dark:border-white/10 pb-4">
                        <Sparkles className="w-5 h-5 text-black dark:text-white fill-black/10 dark:fill-white/10" />
                        <span className="font-display font-black text-xl tracking-tight">Menu</span>
                      </div>

                      {/* Twin Column Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                        
                        {/* LEFT COLUMN: Main application links */}
                        <div className="flex flex-col gap-1.5">
                          <div className="font-mono text-[9px] text-gray-500 dark:text-gray-400 font-extrabold tracking-widest uppercase mb-1">
                            Core Lab Sections
                          </div>

                          {/* Home */}
                          <button 
                            onClick={() => {
                              setCurrentPage("home");
                              setIsMenuOpen(false);
                            }}
                            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold text-[13px] md:text-sm text-left cursor-pointer w-full ${
                              currentPage === "home" 
                                ? "bg-black text-white dark:bg-white dark:text-black" 
                                : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10"
                            }`}
                          >
                            <Home className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span>Home / Lab</span>
                          </button>

                          {/* Investigations */}
                          <button 
                            onClick={() => {
                              setCurrentPage("investigations");
                              setIsMenuOpen(false);
                            }}
                            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold text-[13px] md:text-sm text-left cursor-pointer w-full ${
                              currentPage === "investigations" 
                                ? "bg-black text-white dark:bg-white dark:text-black" 
                                : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10"
                            }`}
                          >
                            <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span>Investigations</span>
                          </button>

                          {/* Who we are */}
                          <button 
                            onClick={() => {
                              setCurrentPage("who-we-are");
                              setIsMenuOpen(false);
                            }}
                            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold text-[13px] md:text-sm text-left cursor-pointer w-full ${
                              currentPage === "who-we-are" 
                                ? "bg-black text-white dark:bg-white dark:text-black" 
                                : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10"
                            }`}
                          >
                            <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span>Who we are</span>
                          </button>

                          {/* Projects */}
                          <button 
                            onClick={() => {
                              setCurrentPage("projects");
                              setIsMenuOpen(false);
                            }}
                            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold text-[13px] md:text-sm text-left cursor-pointer w-full ${
                              currentPage === "projects" 
                                ? "bg-black text-white dark:bg-white dark:text-black" 
                                : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10"
                            }`}
                          >
                            <Folder className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span>Projects</span>
                          </button>

                          {/* Tools */}
                          <button 
                            onClick={() => {
                              setCurrentPage("tools");
                              setIsMenuOpen(false);
                            }}
                            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold text-[13px] md:text-sm text-left cursor-pointer w-full ${
                              currentPage === "tools" 
                                ? "bg-black text-white dark:bg-white dark:text-black" 
                                : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10"
                            }`}
                          >
                            <Cpu className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span>Lab Tools</span>
                          </button>

                          {/* Graphics */}
                          <button 
                            onClick={() => {
                              setCurrentPage("graphics");
                              setIsMenuOpen(false);
                            }}
                            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold text-[13px] md:text-sm text-left cursor-pointer w-full ${
                              currentPage === "graphics" 
                                ? "bg-black text-white dark:bg-white dark:text-black" 
                                : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10"
                            }`}
                          >
                            <Palette className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span>Graphics</span>
                          </button>
                        </div>

                        {/* RIGHT COLUMN: Nested lists and folders */}
                        <div className="flex flex-col gap-1.5">
                          <div className="font-mono text-[9px] text-gray-500 dark:text-gray-400 font-extrabold tracking-widest uppercase mb-1">
                            Compliance & Colabs
                          </div>

                          {/* Standard Practices */}
                          <button 
                            onClick={() => {
                              setCurrentPage("standard-practices");
                              setIsMenuOpen(false);
                            }}
                            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold text-[13px] md:text-sm text-left cursor-pointer w-full ${
                              currentPage === "standard-practices" 
                                ? "bg-black text-white dark:bg-white dark:text-black" 
                                : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10"
                            }`}
                          >
                            <Layers className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span>Standard practices</span>
                          </button>

                          {/* Privacy Policy */}
                          <button 
                            onClick={() => {
                              setCurrentPage("privacy-policy");
                              setIsMenuOpen(false);
                            }}
                            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold text-[13px] md:text-sm text-left cursor-pointer w-full ${
                              currentPage === "privacy-policy" 
                                ? "bg-black text-white dark:bg-white dark:text-black" 
                                : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10"
                            }`}
                          >
                            <ShieldCheck className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span>Privacy policy</span>
                          </button>

                          {/* Contact Us */}
                          <button 
                            onClick={() => {
                              setCurrentPage("contact-us");
                              setIsMenuOpen(false);
                            }}
                            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold text-[13px] md:text-sm text-left cursor-pointer w-full ${
                              currentPage === "contact-us" 
                                ? "bg-black text-white dark:bg-white dark:text-black" 
                                : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10"
                            }`}
                          >
                            <MessageSquare className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span>Contact us</span>
                          </button>

                          {/* Let's Collaborate */}
                          <button 
                            onClick={() => {
                              setCurrentPage("lets-collaborate");
                              setIsMenuOpen(false);
                            }}
                            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-150 font-semibold text-[13px] md:text-sm text-left cursor-pointer w-full ${
                              currentPage === "lets-collaborate" 
                                ? "bg-black text-white dark:bg-white dark:text-black" 
                                : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10"
                            }`}
                          >
                            <Plus className="w-4 h-4 text-[#FF4A1C] animate-pulse" />
                            <span className="text-[#FF4A1C] font-black">Let's collaborate</span>
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Moon/Sun Dark & Light mode toggle to the right of menu */}
            <button
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              className="w-11 h-11 rounded-[16px] bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#0d0e12,-5px_-5px_10px_#272c36] flex items-center justify-center text-[#8C6BE8] hover:text-[#7D5CD7] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/50 dark:border-white/[0.02] shrink-0"
              title={theme === "dark" ? "Activate Light Mode" : "Activate Dark Mode"}
              aria-label="Toggle dark/light theme"
              id="theme-toggle-btn"
            >
              {theme === "dark" ? (
                <Sun className="w-4.5 h-4.5" />
              ) : (
                <Moon className="w-4.5 h-4.5" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {currentPage === "home" ? (
        <>
          {/* EDITORIAL NEWSPAPER SECTION (INVESTIGATIONS & PROJECTS) */}
          <section id="editorial-section" className="w-full max-w-7xl mx-auto pb-16 pt-[110px] md:pb-24 md:pt-[140px] text-black dark:text-white z-10">
        <div className="w-full flex flex-col">
          
          {/* INVESTIGATIONS CATEGORY */}
          <div className="mb-20 md:mb-28">
            <div className="border-b-2 border-black pb-2 mb-8 flex justify-between items-end">
              <h3 
                onClick={() => setCurrentPage("investigations")}
                className="font-sans font-black text-xs md:text-sm uppercase tracking-[0.25em] text-black cursor-pointer hover:text-[#FF4A1C] transition-colors"
              >
                Investigations
              </h3>
              <button 
                onClick={() => setCurrentPage("investigations")}
                className="font-sans font-bold text-xs text-gray-500 hover:text-[#FF4A1C] hover:underline transition-all flex items-center gap-1 cursor-pointer"
              >
                all <span className="text-[10px]">→</span>
              </button>
            </div>

            {/* Three column responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Card 1 */}
              <div 
                onClick={() => setCurrentPage("investigations")}
                className="relative group overflow-hidden w-full aspect-[4/5] xs:aspect-[1.2] sm:aspect-[4/5] md:aspect-[3/4] rounded-[32px] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-end text-left"
              >
                <img 
                  src="/images/business_man_portrait_1783182974701.jpg" 
                  alt="Dexter's lab" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                <div className="relative z-10 p-5 xs:p-6 sm:p-6 md:p-5 lg:p-8 flex flex-col justify-end h-full text-white">
                  <h4 className="font-sans font-bold text-sm xs:text-base sm:text-lg md:text-base lg:text-lg xl:text-xl leading-tight mb-2 tracking-tight">
                    There's gloom and doom when things go boom in Dexter's lab
                  </h4>
                  <p className="font-sans text-white/80 text-[10px] xs:text-[11px] sm:text-xs md:text-[11px] lg:text-xs xl:text-sm leading-relaxed mb-4 line-clamp-2 xs:line-clamp-3 md:line-clamp-2 lg:line-clamp-3">
                    Ei mei scripta intellegat. Verear voluptaria eam at, consul putent eu vel. Pro saepe maluisset ne, audire maiorum forensibus eos et. Diceret detraxit vis
                  </p>
                  <span className="font-sans font-bold text-xs text-white flex items-center gap-1 group-hover:underline">
                    Explore <span className="text-[10px] group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div 
                onClick={() => setCurrentPage("investigations")}
                className="relative group overflow-hidden w-full aspect-[4/5] xs:aspect-[1.2] sm:aspect-[4/5] md:aspect-[3/4] rounded-[32px] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-end text-left"
              >
                <img 
                  src="/images/oranges_branch_1783182988575.jpg" 
                  alt="Entrance exam" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                <div className="relative z-10 p-5 xs:p-6 sm:p-6 md:p-5 lg:p-8 flex flex-col justify-end h-full text-white">
                  <h4 className="font-sans font-bold text-sm xs:text-base sm:text-lg md:text-base lg:text-lg xl:text-xl leading-tight mb-2 tracking-tight">
                    My entrance exam was on a book of matches
                  </h4>
                  <p className="font-sans text-white/80 text-[10px] xs:text-[11px] sm:text-xs md:text-[11px] lg:text-xs xl:text-sm leading-relaxed mb-4 line-clamp-2 xs:line-clamp-3 md:line-clamp-2 lg:line-clamp-3">
                    Ei mei scripta intellegat. Verear voluptaria eam at, consul putent eu vel. Pro saepe maluisset ne, audire maiorum forensibus eos et. Diceret detraxit vis
                  </p>
                  <span className="font-sans font-bold text-xs text-white flex items-center gap-1 group-hover:underline">
                    Explore <span className="text-[10px] group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div 
                onClick={() => setCurrentPage("investigations")}
                className="relative group overflow-hidden w-full aspect-[4/5] xs:aspect-[1.2] sm:col-span-2 sm:aspect-[1.8] md:col-span-1 md:aspect-[3/4] rounded-[32px] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-end text-left"
              >
                <img 
                  src="/images/kayaks_lake_1783183001508.jpg" 
                  alt="Tonight what heights" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                <div className="relative z-10 p-5 xs:p-6 sm:p-8 md:p-5 lg:p-8 flex flex-col justify-end h-full text-white">
                  <h4 className="font-sans font-bold text-sm xs:text-base sm:text-lg md:text-base lg:text-lg xl:text-xl leading-tight mb-2 tracking-tight">
                    Tonight what heights we'll hit, on with the show this is it
                  </h4>
                  <p className="font-sans text-white/80 text-[10px] xs:text-[11px] sm:text-xs md:text-[11px] lg:text-xs xl:text-sm leading-relaxed mb-4 line-clamp-2 xs:line-clamp-3 sm:line-clamp-2 md:line-clamp-2 lg:line-clamp-3">
                    Labores incorrupte vim an. Id augue populo alienum usu, has harum consectetuer ne, ne clita fuisset dignissim quo. Semper oportere assueverit cum cu. Ex
                  </p>
                  <span className="font-sans font-bold text-xs text-white flex items-center gap-1 group-hover:underline">
                    Explore <span className="text-[10px] group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                </div>
              </div>

            </div>
          </div>


          {/* PROJECTS CATEGORY */}
          <div>
            <div className="border-b-2 border-black pb-2 mb-8 flex justify-between items-end">
              <h3 
                onClick={() => setCurrentPage("projects")}
                className="font-sans font-black text-xs md:text-sm uppercase tracking-[0.25em] text-black cursor-pointer hover:text-[#FF4A1C] transition-colors"
              >
                Projects
              </h3>
              <button 
                onClick={() => setCurrentPage("projects")}
                className="font-sans font-bold text-xs text-gray-500 hover:text-[#FF4A1C] hover:underline transition-all flex items-center gap-1 cursor-pointer"
              >
                all <span className="text-[10px]">→</span>
              </button>
            </div>

            {/* Split layout: Large main article on left, sidebar with 4 list articles on right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              
              {/* Left Column - Main Featured Article (Spans 7 of 12 columns) */}
              <div 
                onClick={() => setCurrentPage("projects")}
                className="lg:col-span-7 relative group overflow-hidden aspect-[4/5] xs:aspect-[1.1] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[480px] min-h-[350px] xs:min-h-[380px] sm:min-h-[420px] rounded-[32px] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-end text-left"
              >
                <img 
                  src="/images/politics_man_curly_1783183012456.jpg" 
                  alt="Projects feature" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                <div className="relative z-10 p-5 xs:p-6 sm:p-8 md:p-10 flex flex-col justify-end h-full text-white">
                  <div className="font-sans text-[10px] md:text-xs text-white/80 font-bold tracking-wide uppercase mb-2 flex items-center gap-2">
                    <span>December 12</span>
                    <span className="text-white/40">•</span>
                    <span className="text-gray-300">Projects</span>
                  </div>
                  <h4 className="font-sans font-bold text-xl xs:text-2xl sm:text-3xl lg:text-[2.25rem] leading-tight mb-2 sm:mb-3 tracking-tight">
                    When you tell them the truth
                  </h4>
                  <p className="font-sans text-white/90 text-[11px] xs:text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-2xl line-clamp-2 xs:line-clamp-3 sm:line-clamp-none">
                    Ei mei scripta intellegat. Verear voluptaria eam at, consul putent eu vel. Pro saepe maluisset ne, audire maiorum forensibus eos et. Diceret detraxit vis at. Eum et idque tollit assentior, ullum soleat usu id.
                  </p>
                  <span className="font-sans font-bold text-xs md:text-sm text-white flex items-center gap-1 group-hover:underline">
                    Explore <span className="text-[10px] md:text-xs group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                </div>
              </div>

              {/* Right Column - Vertical Sidebar List (Spans 5 of 12 columns) */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                
                {/* Sidebar Item 1 */}
                <div 
                  onClick={() => setCurrentPage("projects")}
                  className="relative group overflow-hidden aspect-[16/10] xs:aspect-[16/9] sm:h-[218px] sm:aspect-auto min-h-[160px] xs:min-h-[180px] sm:min-h-0 rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-end text-left"
                >
                  <img 
                    src="/images/vintage_kids_1783183053309.jpg" 
                    alt="Overture" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                  <div className="relative z-10 p-4 xs:p-5 flex flex-col justify-end h-full text-white">
                    <div className="font-sans text-[9px] text-white/70 font-bold uppercase tracking-wider mb-0.5">
                      September 05
                    </div>
                    <h5 className="font-sans font-bold text-xs xs:text-sm md:text-base leading-tight mb-0.5 sm:mb-1">
                      Overture, curtains, lights
                    </h5>
                    <p className="font-sans text-white/80 text-[10px] xs:text-[11px] leading-snug line-clamp-1 mb-1.5 sm:mb-2">
                      Patrioque assentior ea vim. Volutpat salutandi ex his, cu sea soluta melius
                    </p>
                    <span className="font-sans font-bold text-[10px] xs:text-[11px] text-white flex items-center gap-1 group-hover:underline">
                      Explore <span className="text-[9px] group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </span>
                  </div>
                </div>

                {/* Sidebar Item 2 */}
                <div 
                  onClick={() => setCurrentPage("projects")}
                  className="relative group overflow-hidden aspect-[16/10] xs:aspect-[16/9] sm:h-[218px] sm:aspect-auto min-h-[160px] xs:min-h-[180px] sm:min-h-0 rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-end text-left"
                >
                  <img 
                    src="/images/protest_emotional_1783183067120.jpg" 
                    alt="New York" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                  <div className="relative z-10 p-4 xs:p-5 flex flex-col justify-end h-full text-white">
                    <div className="font-sans text-[9px] text-white/70 font-bold uppercase tracking-wider mb-0.5">
                      December 03
                    </div>
                    <h5 className="font-sans font-bold text-xs xs:text-sm md:text-base leading-tight mb-0.5 sm:mb-1">
                      New York, this is your last chance
                    </h5>
                    <p className="font-sans text-white/80 text-[10px] xs:text-[11px] leading-snug line-clamp-1 mb-1.5 sm:mb-2">
                      Quo natum nemore putant in, his te case habemus. Nulla detraxit explicari
                    </p>
                    <span className="font-sans font-bold text-[10px] xs:text-[11px] text-white flex items-center gap-1 group-hover:underline">
                      Explore <span className="text-[9px] group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* CACHECRIME FOOTER CARD */}
      <section className="w-full max-w-7xl mx-auto mt-24 mb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full bg-[#F0F4F8] dark:bg-[#1A1D24] rounded-3xl sm:rounded-[40px] shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff] dark:shadow-[12px_12px_24px_#0d0e12,-12px_-12px_24px_#272c36] border border-white/40 dark:border-white/5 p-8 md:p-12 transition-colors duration-300 flex flex-col justify-between relative">
          
          {/* Top Section: Four columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start w-full z-10">
            
            {/* Column 1: Slogan statement */}
            <div className="md:col-span-8 flex flex-col text-left">
              <h3 className="font-display font-bold text-xl md:text-2xl lg:text-[1.85rem] text-gray-800 dark:text-gray-100 leading-[1.3] tracking-tight max-w-lg">
                We combine digital forensics and visual storytelling to uncover hidden truths, expose wrongdoing, and advance accountability.
              </h3>
            </div>

            {/* Column 4: Call Action items */}
            <div className="md:col-span-4 flex flex-col gap-4 items-start md:items-end text-left md:text-right w-full">
              
              {/* Call cachecrime */}
              <button 
                onClick={() => setCurrentPage("lets-collaborate")}
                className="group w-full md:w-auto bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0d0e12,-4px_-4px_8px_#272c36] hover:shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] dark:hover:shadow-[2px_2px_4px_#0d0e12,-2px_-2px_4px_#272c36] active:scale-95 border border-white/20 dark:border-white/5 rounded-2xl p-4 flex items-center justify-between md:justify-end gap-3 cursor-pointer transition-all duration-200 text-left md:text-right"
              >
                <div className="flex flex-col items-start md:items-end">
                  <span className="font-display font-black text-base text-[#8C6BE8] dark:text-[#8C6BE8] transition-colors group-hover:text-[#7D5CD7]">Call cachecrime</span>
                  <span className="font-sans text-[10px] font-medium text-gray-400 dark:text-gray-500 mt-0.5">Let's work together</span>
                </div>
                <span className="w-8 h-8 rounded-full bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0d0e12,inset_-2px_-2px_4px_#272c36] text-[#FF4A1C] flex items-center justify-center group-hover:scale-105 transition-transform duration-150 flex-shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </button>

              {/* Courses & Tools */}
              <button 
                onClick={() => setCurrentPage("tools")}
                className="group w-full md:w-auto bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0d0e12,-4px_-4px_8px_#272c36] hover:shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] dark:hover:shadow-[2px_2px_4px_#0d0e12,-2px_-2px_4px_#272c36] active:scale-95 border border-white/20 dark:border-white/5 rounded-2xl p-4 flex items-center justify-between md:justify-end gap-3 cursor-pointer transition-all duration-200 text-left md:text-right"
              >
                <div className="flex flex-col items-start md:items-end">
                  <span className="font-display font-black text-base text-gray-800 dark:text-gray-200">Courses & Tools</span>
                  <span className="font-sans text-[10px] font-medium text-gray-400 dark:text-gray-500 mt-0.5">Creative tools</span>
                </div>
                <span className="w-8 h-8 rounded-full bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0d0e12,inset_-2px_-2px_4px_#272c36] text-black dark:text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-150 flex-shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </button>

            </div>

          </div>

          {/* Bottom Metadata bar */}
          <div className="w-full h-[1.5px] bg-[#d1d9e6]/70 dark:bg-[#272c36]/70 my-6 z-10" />

          <div className="w-full flex flex-col sm:flex-row items-center justify-between font-sans text-xs font-medium text-gray-400 gap-4 z-10">
            
            {/* Left copyright and legal */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-bold">cachecrime ©2026</span>
              <span className="text-gray-300">•</span>
              <button 
                onClick={() => setCurrentPage("privacy-policy")} 
                className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-150 cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>

            {/* Right: Relocated FOLLOW OUR SOCIALS */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <span className="font-sans font-bold text-xs text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                Follow our socials
              </span>
              <div className="flex flex-row items-center gap-3">
                {/* X / Twitter */}
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-7 h-7 rounded-full bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#0d0e12,-2px_-2px_4px_#272c36] flex items-center justify-center text-[#8C6BE8] hover:scale-110 hover:text-[#7D5CD7] active:scale-95 transition-all duration-200 cursor-pointer border border-white/50 dark:border-white/[0.02]"
                  aria-label="X (formerly Twitter)"
                >
                  <svg className="w-[11px] h-[11px] fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-7 h-7 rounded-full bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#0d0e12,-2px_-2px_4px_#272c36] flex items-center justify-center text-[#8C6BE8] hover:scale-110 hover:text-[#7D5CD7] active:scale-95 transition-all duration-200 cursor-pointer border border-white/50 dark:border-white/[0.02]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-[11px] h-[11px]" />
                </a>

                {/* GitHub */}
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-7 h-7 rounded-full bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#0d0e12,-2px_-2px_4px_#272c36] flex items-center justify-center text-[#8C6BE8] hover:scale-110 hover:text-[#7D5CD7] active:scale-95 transition-all duration-200 cursor-pointer border border-white/50 dark:border-white/[0.02]"
                  aria-label="Github"
                >
                  <Github className="w-[11px] h-[11px]" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  ) : (
    <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between z-10 gap-6 pt-[88px] md:pt-[110px]">
      {/* Active Subpage Component */}
      <div className="w-full flex-1 min-h-[60vh]">
        {currentPage === "investigations" && <Investigations />}
        {currentPage === "who-we-are" && <WhoWeAre />}
        {currentPage === "projects" && <Projects />}
        {currentPage === "contact-us" && <ContactUs />}
        {currentPage === "standard-practices" && <StandardPractices />}
        {currentPage === "privacy-policy" && <PrivacyPolicy />}
        {currentPage === "tools" && <Tools />}
        {currentPage === "graphics" && <Graphics />}
        {currentPage === "lets-collaborate" && <LetsCollaborate />}
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Elegant Simplified Subpage Footer */}
      <footer className="w-full bg-[#F0F4F8] dark:bg-[#1A1D24] rounded-2xl sm:rounded-3xl shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0d0e12,-6px_-6px_12px_#272c36] border border-white/40 dark:border-white/5 px-6 py-5 mt-12 mb-6 flex flex-col gap-6 transition-colors duration-300">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between font-sans text-xs font-medium text-gray-400 gap-4">
          {/* Left copyright and legal */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-bold">cachecrime ©2026</span>
            <span className="text-gray-300">•</span>
            <button 
              onClick={() => setCurrentPage("privacy-policy")} 
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-150 cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>

          {/* Right: Relocated FOLLOW OUR SOCIALS */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <span className="font-sans font-bold text-xs text-gray-500 dark:text-gray-400 tracking-wider uppercase">
              Follow our socials
            </span>
            <div className="flex flex-row items-center gap-3">
              {/* X / Twitter */}
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 rounded-full bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#0d0e12,-2px_-2px_4px_#272c36] flex items-center justify-center text-[#8C6BE8] hover:scale-110 hover:text-[#7D5CD7] active:scale-95 transition-all duration-200 cursor-pointer border border-white/50 dark:border-white/[0.02]"
                aria-label="X (formerly Twitter)"
              >
                <svg className="w-[11px] h-[11px] fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 rounded-full bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#0d0e12,-2px_-2px_4px_#272c36] flex items-center justify-center text-[#8C6BE8] hover:scale-110 hover:text-[#7D5CD7] active:scale-95 transition-all duration-200 cursor-pointer border border-white/50 dark:border-white/[0.02]"
                aria-label="Instagram"
              >
                <Instagram className="w-[11px] h-[11px]" />
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 rounded-full bg-[#F0F4F8] dark:bg-[#1A1D24] shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#0d0e12,-2px_-2px_4px_#272c36] flex items-center justify-center text-[#8C6BE8] hover:scale-110 hover:text-[#7D5CD7] active:scale-95 transition-all duration-200 cursor-pointer border border-white/50 dark:border-white/[0.02]"
                aria-label="Github"
              >
                <Github className="w-[11px] h-[11px]" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )}

      {/* DETAILED TECHNICAL SPECIFICATIONS DRAWER (Fulfilling craftsmanship without extra pages) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />

            {/* Spec Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-[#1A1A1A] text-white p-6 md:p-8 flex flex-col justify-between shadow-[rgba(0,_0,_0,_0.8)_0px_30px_90px] z-50 border-l border-white/10"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF4A1C] animate-pulse" />
                    <span className="font-mono text-xs text-gray-400 tracking-widest uppercase">SPECIFICATION PROTOCOL</span>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors duration-150 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main garment identity */}
                <h2 className="font-display font-bold text-4xl mt-8 text-white tracking-tight flex items-baseline gap-2">
                  {activeSlide.title} <span className="font-sans text-xl font-normal text-gray-400">/{activeSlide.chinese}</span>
                </h2>
                <p className="font-mono text-xs text-[#FF4A1C] tracking-widest uppercase mt-2">{activeSlide.collection}</p>
                
                <div className="h-[1px] w-full bg-white/10 my-6" />

                {/* Technical data blocks */}
                <div className="flex flex-col gap-6 font-mono text-xs">
                  {/* Serial Number */}
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-gray-500" /> SYSTEM ID
                    </span>
                    <span className="text-white text-sm font-bold tracking-wider">{activeSlide.specs.serial}</span>
                  </div>

                  {/* Fabrics */}
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-gray-500" /> MATERIAL COMPOSITION
                    </span>
                    <span className="text-gray-200 leading-relaxed text-sm">{activeSlide.specs.materials}</span>
                  </div>

                  {/* Protection Rating */}
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-gray-500" /> PROTECTION BARRIER
                    </span>
                    <span className="text-gray-200 leading-relaxed text-sm">{activeSlide.specs.protection}</span>
                  </div>

                  {/* Profile & Fit */}
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">GEOMETRIC SILHOUETTE</span>
                    <span className="text-gray-200 leading-relaxed text-sm">{activeSlide.specs.fit}</span>
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mt-8">
                  <span className="font-mono text-gray-500 text-[10px] uppercase tracking-wider block mb-2">SIZE OPTION</span>
                  <div className="flex gap-2">
                    {["S", "M", "L", "XL"].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSize(sz)}
                        className={`w-10 h-10 rounded border font-mono text-xs transition-all duration-200 cursor-pointer ${
                          size === sz 
                            ? "bg-[#FF4A1C] border-[#FF4A1C] text-white font-bold scale-105" 
                            : "border-white/20 text-gray-300 hover:border-white/50 hover:text-white"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order checkout CTA */}
              <div className="mt-8 flex flex-col gap-3">
                <div className="flex items-center justify-between font-mono text-sm border-t border-white/10 pt-4 mb-2">
                  <span className="text-gray-400">SPECIMEN VALUATION</span>
                  <span className="text-white font-bold text-lg">€ 285.00 EUR</span>
                </div>

                <AnimatePresence mode="wait">
                  {ordered ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full bg-[#10b981] text-white font-mono text-xs py-3.5 rounded flex items-center justify-center gap-2 font-bold"
                    >
                      <Check className="w-4 h-4" /> AUTHENTIC ORDER ENQUEUED
                    </motion.div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setOrdered(true);
                        setTimeout(() => setOrdered(false), 3500);
                      }}
                      className="w-full bg-[#FF4A1C] hover:bg-[#e03a10] text-white font-mono text-xs py-3.5 rounded font-bold tracking-widest uppercase transition-colors duration-200 cursor-pointer shadow-[0_4px_20px_rgba(255,74,28,0.25)]"
                    >
                      ACQUIRE SPECIMEN
                    </motion.button>
                  )}
                </AnimatePresence>
                
                <p className="font-mono text-[8px] text-gray-500 text-center uppercase tracking-wider">
                  Secure shipping worldwide. Each garment includes digital validation chip.
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
