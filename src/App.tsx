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
  Palette
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
    image: "/images/techwear_model_1783163010199.jpg",
    title: "lab.",
    collection: "First Collection // 19.8.19",
    chinese: "该死的",
    location: "COPENHAGEN, DENMARK",
    mfg: "BOLOGNA ITALY",
    code: "LAB TECH//2019",
    desc1: "FOR AUTHENTICATION OF X-LABS GEAR. SPRING/SUMMER COLLECTION AND PROTECTION.",
    desc2: "KEEP UNSEEN.",
    desc3: "FOR AUTHENTICATION OF X-LABS GEAR.",
    desc4: "SPRING/SUMMER COLLECTION A",
    badge: "X-LABS MATERIALS OF CREATION 2019",
    specs: {
      materials: "3-Layer GORE-TEX Pro, Ripstop Nylon, Fidlock Magnetic Closures",
      protection: "IPX-5 Waterproofing, Windproof laminate, UV Block 50+",
      fit: "Modular relaxed profile, adjustable neck drape, utility harness",
      serial: "X-LABS // SN-19819-CPH"
    }
  },
  {
    id: 2,
    image: "/images/techwear_model_2_1783163045977.jpg",
    title: "mod.",
    collection: "Second Collection // 20.3.20",
    chinese: "系统化",
    location: "TOKYO, JAPAN",
    mfg: "MILAN ITALY",
    code: "SYS TECH//2020",
    desc1: "PREMIUM MODULAR APPAREL SYSTEMS. INTEGRATED WEATHERPROOF COATING AND HIGH VENTILATION.",
    desc2: "TACTICAL STABILITY.",
    desc3: "FOR INTUITIVE ADAPTIVE LAYER FLOW.",
    desc4: "AUTUMN/WINTER SPECIFICATION B",
    badge: "SYS-LABS MODULAR DIVISION 2020",
    specs: {
      materials: "DWR Coated Heavyweight Cotton-Poly Blend, YKK Aquaguard Zippers",
      protection: "Extreme Cold Insulation, Breathable mesh panels, Water resistant shell",
      fit: "Ergonomic curved sleeves, modular hood detachment, double straps",
      serial: "SYS-LABS // SN-20320-TYO"
    }
  },
  {
    id: 3,
    image: "/images/techwear_model_3_1783163058987.jpg",
    title: "vdr.",
    collection: "Third Collection // 12.11.20",
    chinese: "未来派",
    location: "BERLIN, GERMANY",
    mfg: "SEOUL SOUTH KOREA",
    code: "VDR TECH//2020",
    desc1: "REINFORCED SILHOUETTES WITH REFLECTIVE LAYER VISORS AND MODULAR ACCESSORIES.",
    desc2: "COVERT ENCLOSURES.",
    desc3: "OPTIMIZED FOR LIGHTWEIGHT ADAPTIVE FLOW.",
    desc4: "SPRING/SUMMER SPECIFICATION C",
    badge: "VDR-LABS COVERT INITIATIVE 2020",
    specs: {
      materials: "Reflective Glass-beaded Polyurethane, Magnetic quick-release harness",
      protection: "3M Retroreflective coating, Anti-microbial face liner, dust-proof seal",
      fit: "Snug modular face mask interface, quick-cinch back cords",
      serial: "VDR-LABS // SN-121120-BER"
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

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
    <div className={`min-h-screen w-full bg-[#E1E1E1] flex flex-col px-6 pb-6 pt-0 md:px-10 md:pb-10 md:pt-0 relative overflow-x-hidden font-sans ${isLoading ? "overflow-y-hidden h-screen" : "overflow-y-auto"}`}>
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#E1E1E1]/95 backdrop-blur-md px-6 py-4 md:px-10 md:py-6 border-b border-black/10 flex justify-center transition-all">
        <div className="w-full max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* Bold cachecrime logo placeholder */}
            <span 
              onClick={() => {
                setCurrentPage("home");
                setIsMenuOpen(false);
              }}
              className="font-display font-black text-xl md:text-2xl tracking-tighter text-black cursor-pointer hover:text-[#FF4A1C] transition-colors duration-200 lowercase"
            >
              cachecrime
            </span>
          </div>

          <nav className="flex items-center gap-6 md:gap-10">
            {/* Menu icon */}
            <div className="relative">
              
              {/* DESKTOP BAR (Exactly like the screenshot) */}
              <div className="hidden lg:flex items-center bg-white/95 backdrop-blur-md rounded-full px-5 py-2 border border-white/80 shadow-[0_15px_40px_rgba(0,0,0,0.06)] gap-5 select-none text-black">
                {/* Profile section with chevron - toggles dropdown */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2.5 hover:opacity-85 transition-opacity cursor-pointer text-left"
                >
                  <span className="font-display font-black text-sm tracking-tight text-black lowercase mr-1">
                    cachecrime
                  </span>
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120" 
                    alt="cachecrime avatar" 
                    className="w-7 h-7 rounded-xl object-cover border border-black/5"
                  />
                  <span className="font-bold text-xs tracking-tight text-black font-sans">see our projects</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Divider */}
                <div className="w-[1px] h-4 bg-black/10" />

                {/* Slanted "Lessons" Button */}
                <a 
                  href="#lessons"
                  className="bg-[#F3F3F5] hover:bg-[#EAEAEA] active:scale-95 transition-all px-4 py-1.5 rounded-[10px] -skew-x-[12deg] flex items-center gap-2"
                >
                  <div className="skew-x-[12deg] flex items-center gap-1.5 font-bold text-[11px] tracking-tight text-gray-600">
                    <BookOpen className="w-3.5 h-3.5 text-gray-400 stroke-[2.5]" />
                    <span>Lessons</span>
                  </div>
                </a>

                {/* Slanted "Achievements" Button */}
                <a 
                  href="#achievements"
                  className="bg-[#F3F3F5] hover:bg-[#EAEAEA] active:scale-95 transition-all px-4 py-1.5 rounded-[10px] -skew-x-[12deg] flex items-center gap-2"
                >
                  <div className="skew-x-[12deg] flex items-center gap-1.5 font-bold text-[11px] tracking-tight text-gray-600">
                    <Award className="w-3.5 h-3.5 text-gray-400 stroke-[2.5]" />
                    <span>Achievements</span>
                  </div>
                </a>

                {/* Wallet Section */}
                <div className="flex items-center text-[11px] font-semibold text-gray-400 gap-1 pl-1">
                  <span>Wallet</span>
                  <span className="text-black font-extrabold text-[12px]">$19.40</span>
                </div>

                {/* Fingerprint Button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-300 hover:text-black hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  <Fingerprint className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* TABLET TRIGGER: Candy box style (3x3 dots) */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`hidden md:flex lg:hidden items-center justify-center p-2 rounded-xl transition-all duration-300 cursor-pointer ${
                  isMenuOpen ? "bg-white text-[#FF4A1C] shadow-sm scale-110" : "text-black hover:text-[#FF4A1C] hover:bg-white/50"
                }`}
                aria-label="Toggle menu (Tablet)"
              >
                <div className="grid grid-cols-3 gap-1 w-4 h-4 md:w-5 md:h-5 items-center justify-items-center">
                  <div className="w-1.5 h-1.5 bg-current rounded-full transition-all duration-300" />
                  <div className="w-1.5 h-1.5 bg-current rounded-full transition-all duration-300" />
                  <div className="w-1.5 h-1.5 bg-current rounded-full transition-all duration-300" />
                  <div className="w-1.5 h-1.5 bg-current rounded-full transition-all duration-300" />
                  <div className="w-1.5 h-1.5 bg-current rounded-full transition-all duration-300" />
                  <div className="w-1.5 h-1.5 bg-current rounded-full transition-all duration-300" />
                  <div className="w-1.5 h-1.5 bg-current rounded-full transition-all duration-300" />
                  <div className="w-1.5 h-1.5 bg-current rounded-full transition-all duration-300" />
                  <div className="w-1.5 h-1.5 bg-current rounded-full transition-all duration-300" />
                </div>
              </button>

              {/* MOBILE TRIGGER: Kebab style (3 vertical dots) */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex md:hidden items-center justify-center p-2 rounded-xl transition-all duration-300 cursor-pointer ${
                  isMenuOpen ? "bg-white text-[#FF4A1C] shadow-sm scale-110" : "text-black hover:text-[#FF4A1C] hover:bg-white/50"
                }`}
                aria-label="Toggle menu (Mobile)"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

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
                      className="absolute right-0 mt-3 w-[295px] sm:w-[500px] bg-[#EAEAEA] rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-white/50 p-6 md:p-8 z-50 flex flex-col gap-6 text-left text-black select-text"
                    >
                      {/* Menu title with Sparkle */}
                      <div className="flex items-center gap-2 text-black border-b border-black/5 pb-4">
                        <Sparkles className="w-5 h-5 text-black fill-black/10" />
                        <span className="font-display font-black text-xl tracking-tight">Menu</span>
                      </div>

                      {/* Twin Column Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                        
                        {/* LEFT COLUMN: Main application links */}
                        <div className="flex flex-col gap-1.5">
                          <div className="font-mono text-[9px] text-gray-400 font-extrabold tracking-widest uppercase mb-1">
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
                                ? "bg-black text-white" 
                                : "text-gray-700 hover:text-black hover:bg-white/70"
                            }`}
                          >
                            <Home className="w-4 h-4 text-gray-500" />
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
                                ? "bg-black text-white" 
                                : "text-gray-700 hover:text-black hover:bg-white/70"
                            }`}
                          >
                            <Search className="w-4 h-4 text-gray-500" />
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
                                ? "bg-black text-white" 
                                : "text-gray-700 hover:text-black hover:bg-white/70"
                            }`}
                          >
                            <Users className="w-4 h-4 text-gray-500" />
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
                                ? "bg-black text-white" 
                                : "text-gray-700 hover:text-black hover:bg-white/70"
                            }`}
                          >
                            <Folder className="w-4 h-4 text-gray-500" />
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
                                ? "bg-black text-white" 
                                : "text-gray-700 hover:text-black hover:bg-white/70"
                            }`}
                          >
                            <Cpu className="w-4 h-4 text-gray-500" />
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
                                ? "bg-black text-white" 
                                : "text-gray-700 hover:text-black hover:bg-white/70"
                            }`}
                          >
                            <Palette className="w-4 h-4 text-gray-500" />
                            <span>Graphics</span>
                          </button>
                        </div>

                        {/* RIGHT COLUMN: Nested lists and folders */}
                        <div className="flex flex-col gap-1.5">
                          <div className="font-mono text-[9px] text-gray-400 font-extrabold tracking-widest uppercase mb-1">
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
                                ? "bg-black text-white" 
                                : "text-gray-700 hover:text-black hover:bg-white/70"
                            }`}
                          >
                            <Layers className="w-4 h-4 text-gray-500" />
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
                                ? "bg-black text-white" 
                                : "text-gray-700 hover:text-black hover:bg-white/70"
                            }`}
                          >
                            <ShieldCheck className="w-4 h-4 text-gray-500" />
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
                                ? "bg-black text-white" 
                                : "text-gray-700 hover:text-black hover:bg-white/70"
                            }`}
                          >
                            <MessageSquare className="w-4 h-4 text-gray-500" />
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
                                ? "bg-black text-white" 
                                : "text-gray-700 hover:text-black hover:bg-white/70"
                            }`}
                          >
                            <Plus className="w-4 h-4 text-gray-500 animate-pulse text-[#FF4A1C]" />
                            <span className="text-[#FF4A1C] font-black">Let's collaborate</span>
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>
      </header>

      {currentPage === "home" ? (
        <>
          {/* INNER ALIGNED CONTAINER FOR BALANCED CONTENT LAYOUT */}
          <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between z-10 gap-6 h-screen min-h-[600px] md:min-h-[680px] pt-[88px] md:pt-[110px]">

        {/* MIDDLE CONTENT LAYER (Layout exact replica) */}
        <section className="relative flex-1 grid grid-cols-12 items-center z-10 my-4 gap-4 md:gap-6 min-h-0">
          
          {/* LEFT PANEL: Headline / Chinese Graphic / Pagination */}
          <div className="col-span-12 md:col-span-5 flex flex-col justify-center h-full relative z-20 min-h-0">
            {/* Huge bold title "lab." with letter stagger animation */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1 
                  key={activeSlide.id}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-bold text-[12vw] md:text-[14vh] lg:text-[16vh] xl:text-[18vh] leading-none tracking-tighter text-black cursor-default select-none max-h-[25vh] md:max-h-none"
                >
                  {activeSlide.title}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Collection date subtitle */}
            <div className="mt-2 md:mt-4">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={activeSlide.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.4 }}
                  className="font-mono text-[10px] md:text-xs text-gray-500 tracking-wide font-medium"
                >
                  {activeSlide.collection}
                </motion.p>
              </AnimatePresence>

              {/* Bold stylised Chinese typography */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeSlide.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="font-sans font-black text-lg md:text-xl xl:text-2xl text-black tracking-widest mt-1 uppercase"
                >
                  {activeSlide.chinese}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* PAGER DOTS (Interactive indicator) */}
            <div className="flex items-center gap-2 mt-4 md:mt-6 pl-0.5">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setSlide(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === activeIdx 
                      ? "w-2 md:w-2.5 h-2 md:h-2.5 bg-[#FF4A1C]" 
                      : "w-1.5 h-1.5 bg-gray-400 hover:bg-black"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
              {/* Additional dummy static aesthetic dots to match the 6 dots in mockup */}
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            </div>
          </div>

          {/* CENTER PANEL: Model Photo with blending background */}
          <div className="absolute inset-y-0 right-0 left-12 md:left-0 md:relative md:col-span-4 h-full flex items-end justify-center pointer-events-none md:pointer-events-auto z-10 min-h-0">
            <div className="relative w-full h-[100%] md:h-[110%] flex items-end justify-center">
              
              {/* Smooth image transition with AnimatePresence */}
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={activeSlide.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 60 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 w-[95%] md:w-full h-[85vh] md:h-full max-h-[85vh] md:max-h-[110%] flex items-end justify-center overflow-hidden"
                >
                  {/* Model Image with referrer policy */}
                  <img 
                    src={activeSlide.image} 
                    alt="Techwear model profile" 
                    referrerPolicy="no-referrer"
                    className="w-full h-[95%] md:h-full object-cover object-bottom rounded-[24px] md:rounded-none select-none pointer-events-none mix-blend-darken"
                  />
                </motion.div>
              </AnimatePresence>

              {/* OVERLAY: Red/Orange Trademark Circle Graphics (Center left on model hat) */}
              <div className="absolute top-[32%] md:top-[38%] left-[-15%] md:left-[-18%] w-[16vh] h-[16vh] min-w-[80px] min-h-[80px] max-w-[170px] max-h-[170px] z-20 pointer-events-auto">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ scale: 0.8, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.8, rotate: 20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full text-[#FF4A1C] flex items-center justify-center cursor-help"
                    title="Authentic X-Labs Series"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(255,74,28,0.2)]">
                      <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="6" />
                      <text 
                        x="50" 
                        y="66" 
                        fontFamily="Space Grotesk, sans-serif" 
                        fontSize="46" 
                        fontWeight="bold" 
                        textAnchor="middle" 
                        fill="currentColor"
                      >
                        R
                      </text>
                    </svg>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* RIGHT PANEL: Tech Specs blocks & Slide Arrow Selectors */}
          <div className="col-span-12 md:col-span-3 h-full flex flex-col justify-end md:justify-center items-end text-right relative z-20 mt-2 md:mt-0 min-h-0">
            
            {/* Tech Details Column blocks */}
            <div className="flex flex-col gap-4 md:gap-8 items-end max-w-[260px]">
              
              {/* Decorative small logo / category */}
              <div className="flex items-center gap-1">
                <span className="h-1 w-5 bg-[#FF4A1C]" />
                <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-[#FF4A1C] font-bold">X/LABS</span>
              </div>

              {/* Specification description columns */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 text-left">
                {/* Text Col 1 */}
                <div className="flex flex-col gap-1.5">
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={activeSlide.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="font-mono text-[8px] leading-relaxed text-gray-500 tracking-wider uppercase"
                    >
                      {activeSlide.desc1}
                    </motion.p>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={activeSlide.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="font-mono text-[8px] font-bold text-black tracking-wider uppercase"
                    >
                      {activeSlide.desc2}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Text Col 2 */}
                <div className="flex flex-col gap-1.5">
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={activeSlide.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                      className="font-mono text-[8px] leading-relaxed text-gray-500 tracking-wider uppercase"
                    >
                      {activeSlide.desc3}
                    </motion.p>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={activeSlide.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="font-mono text-[8px] leading-relaxed text-gray-500 tracking-wider uppercase font-semibold"
                    >
                      {activeSlide.desc4}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* NAVIGATION ARROWS BUTTONS (Exact replica placement) */}
              <div className="flex items-center gap-4 mt-1 md:mt-2">
                {/* Left Arrow Button */}
                <button 
                  onClick={prevSlide}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all duration-200 cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                </button>

                {/* Right Arrow Button (Orange highlight) */}
                <button 
                  onClick={nextSlide}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#FF4A1C] flex items-center justify-center text-white hover:bg-[#e03a10] hover:scale-105 transition-all duration-200 cursor-pointer shadow-[0_4px_12px_rgba(255,74,28,0.3)] group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </div>

            </div>
          </div>

        </section>

        {/* BOTTOM SECTION */}
        <footer className="w-full flex items-end justify-between z-20 mt-auto pt-2 gap-4">
          
          {/* BOTTOM LEFT: System location coordinates and details */}
          <div className="flex flex-col text-left max-w-[60%] sm:max-w-none">
            <AnimatePresence mode="wait">
              <motion.span 
                key={activeSlide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono text-[9px] md:text-[10px] font-bold text-gray-700 tracking-widest uppercase"
              >
                {activeSlide.code}
              </motion.span>
            </AnimatePresence>
            
            {/* Horizontal spacer dashes */}
            <span className="font-mono text-gray-400 text-xs tracking-tighter leading-none my-0.5">---</span>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeSlide.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex flex-col gap-0.5"
              >
                <span className="font-mono text-[8px] md:text-[9px] text-gray-500 tracking-widest font-medium">
                  // CRAFTED IN {activeSlide.location}
                </span>
                <span className="font-mono text-[8px] md:text-[9px] text-gray-500 tracking-widest font-medium">
                  MANUFACTURED IN {activeSlide.mfg}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* VERTICAL BADGE (Rotated 90deg on right edge of card) */}
          <div className="absolute right-0 top-[40%] origin-bottom-right rotate-90 translate-y-12 translate-x-12 hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeSlide.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="font-mono text-[10px] font-bold tracking-[0.3em] text-black/80 uppercase select-none flex items-center gap-3 whitespace-nowrap"
              >
                <span className="h-[2px] w-8 bg-black/60" />
                {activeSlide.badge}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* BOTTOM RIGHT CORNER ACTION KEY (Downward orange tab) */}
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="absolute bottom-0 right-0 w-12 h-16 md:w-14 md:h-18 bg-[#FF4A1C] hover:bg-[#e03a10] hover:h-20 transition-all duration-300 flex items-center justify-center text-white cursor-pointer rounded-tl-[16px] shadow-[-4px_-4px_16px_rgba(0,0,0,0.05)] z-30 group"
            title="Inspect Specifications"
          >
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
          </button>

        </footer>

      </div>


      {/* EDITORIAL NEWSPAPER SECTION (INVESTIGATIONS & PROJECTS) */}
      <section className="w-full max-w-7xl mx-auto py-16 md:py-24 border-t border-black/15 text-black z-10 mt-16">
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


      {/* CACHECRIME FOOTER CARD */}
      <section className="w-full max-w-7xl mx-auto py-12 md:py-16 mt-20 border-t border-black/15 flex flex-col justify-between relative z-10">
        
        {/* Top Section: Four columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start w-full z-10">
          
          {/* Column 1: Slogan statement */}
          <div className="md:col-span-7 flex flex-col text-left">
            <h3 className="font-display font-bold text-xl md:text-2xl lg:text-[1.85rem] text-gray-950 leading-[1.25] tracking-tight max-w-lg">
              We combine digital forensics and visual storytelling to uncover hidden truths, expose wrongdoing, and advance accountability.
            </h3>
          </div>

          {/* Column 3: Follow me pill buttons */}
          <div className="md:col-span-3 flex flex-col items-start text-left">
            <span className="font-sans font-bold text-[10px] md:text-xs text-black tracking-wider uppercase mb-4">
              Follow our socials
            </span>
            <div className="flex flex-row items-center gap-4">
              
              {/* X / Twitter */}
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-black hover:text-[#FF4A1C] transition-colors duration-150 p-1 -m-1"
                aria-label="X (formerly Twitter)"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-black hover:text-[#FF4A1C] transition-colors duration-150 p-1 -m-1"
                aria-label="Instagram"
              >
                <Instagram className="w-[18px] h-[18px]" />
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-black hover:text-[#FF4A1C] transition-colors duration-150 p-1 -m-1"
                aria-label="Github"
              >
                <Github className="w-[18px] h-[18px]" />
              </a>

            </div>
          </div>

          {/* Column 4: Call Action items */}
          <div className="md:col-span-2 flex flex-col gap-6 items-start md:items-end text-left md:text-right">
            
            {/* Call cachecrime */}
            <button 
              onClick={() => setCurrentPage("lets-collaborate")}
              className="group flex flex-col items-start md:items-end text-left md:text-right cursor-pointer"
            >
              <div className="flex items-center gap-2 font-display font-bold text-xl text-[#FF4A1C] hover:text-[#e03a10] transition-colors duration-150">
                <span>Call cachecrime</span>
                <span className="w-5.5 h-5.5 rounded-full bg-[#FF4A1C] text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-150 flex-shrink-0 shadow-[0_3px_10px_rgba(255,74,28,0.2)]">
                  <ArrowUpRight className="w-3 h-3 stroke-[3]" />
                </span>
              </div>
              <span className="font-sans text-xs font-medium text-gray-400 mt-1">Let's work together</span>
            </button>

            {/* Courses & Tools */}
            <button 
              onClick={() => setCurrentPage("tools")}
              className="group flex flex-col items-start md:items-end text-left md:text-right cursor-pointer"
            >
              <div className="flex items-center gap-2 font-display font-bold text-xl text-black hover:text-[#FF4A1C] transition-colors duration-150">
                <span>Courses & Tools</span>
                <span className="w-5.5 h-5.5 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-150 flex-shrink-0">
                  <ArrowUpRight className="w-3 h-3 stroke-[3]" />
                </span>
              </div>
              <span className="font-sans text-xs font-medium text-gray-400 mt-1">Creative tools</span>
            </button>

          </div>

        </div>



        {/* Bottom Metadata bar */}
        <div className="w-full h-[1px] bg-black/10 my-6 z-10" />

        <div className="w-full flex flex-col sm:flex-row items-center justify-between font-sans text-xs font-medium text-gray-400 gap-3 z-10">
          
          {/* Left copyright and legal */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-bold">cachecrime ©2026</span>
            <span className="text-gray-300">•</span>
            <button 
              onClick={() => setCurrentPage("privacy-policy")} 
              className="hover:text-gray-700 transition-colors duration-150 cursor-pointer"
            >
              Privacy Policy
            </button>
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

      {/* Elegant Simplified Subpage Footer */}
      <footer className="w-full border-t border-black/15 pt-8 pb-4 mt-12 flex flex-col gap-6">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between font-sans text-xs font-medium text-gray-400 gap-3">
          {/* Left copyright and legal */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-bold">cachecrime ©2026</span>
            <span className="text-gray-300">•</span>
            <button 
              onClick={() => setCurrentPage("privacy-policy")} 
              className="hover:text-gray-700 transition-colors duration-150 cursor-pointer"
            >
              Privacy Policy
            </button>
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
