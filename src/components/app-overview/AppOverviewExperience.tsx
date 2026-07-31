"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, useMotionValue } from "framer-motion";
import { DeviceMockup } from "@/components/ui/DeviceMockup";
import { Trophy, Camera, Sun, Moon, MapPin } from "lucide-react";

export function AppOverviewExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [manualTheme, setManualTheme] = useState<"dark" | "light" | null>(null);
  const [scrollTheme, setScrollTheme] = useState<"dark" | "light">("light");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress slightly for the drawing line and arrow
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Keep it light in hero, dark during mechanics, then back to light at the end (or whatever standard theme they want)
    // We'll keep it dark for features since there is no sky anymore
    if (latest >= 0.15 && latest <= 0.95) {
      setScrollTheme("dark");
    } else {
      setScrollTheme("light");
    }
  });

  const activeTheme = manualTheme || scrollTheme;

  // --- Angular Path & Dynamic Arrow Tracking ---
  // The path draws from 0 to 1 as we scroll
  const pathLength = useTransform(smoothScroll, [0, 0.95], [0, 1]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.02, 0.95, 0.98], [0, 1, 1, 0]);
  
  const arrowX = useMotionValue(500);
  const arrowY = useMotionValue(0);
  const arrowRotation = useMotionValue(0);

  // Update arrow position exactly along the angular SVG path
  useMotionValueEvent(smoothScroll, "change", (latest) => {
    if (pathRef.current) {
      // Map scroll range to path length
      const drawProgress = Math.min(Math.max(latest / 0.95, 0), 1);
      const totalLength = pathRef.current.getTotalLength();
      if (totalLength === 0) return;

      const currentLength = drawProgress * totalLength;
      const point = pathRef.current.getPointAtLength(currentLength);
      
      // Look slightly ahead to calculate rotation (snap to 90 deg corners)
      const nextPointLength = Math.min(currentLength + 2, totalLength);
      const nextPoint = pathRef.current.getPointAtLength(nextPointLength);
      
      // Calculate angle in degrees
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

      arrowX.set(point.x);
      arrowY.set(point.y);
      // Add 90 degrees because our icon points UP by default, we need it to point along the tangent
      arrowRotation.set(angle + 90);
    }
  });

  // Map SVG coordinates (0-1000) to percentage for the absolute container
  const arrowLeft = useTransform(arrowX, (x) => `${(x / 1000) * 100}%`);
  const arrowTop = useTransform(arrowY, (y) => `${(y / 1000) * 100}%`);

  // --- 1. HERO PHASE (0% to 15%) ---
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-10%"]);
  const heroDisplay = useTransform(scrollYProgress, (p) => p > 0.16 ? "none" : "flex");

  // --- 2. MECHANICS PHASE (15% to 75%) ---
  const deviceContainerY = useTransform(scrollYProgress, [0.15, 0.25, 0.65, 0.75], ["100%", "0%", "0%", "-100%"]);
  const deviceScale = useTransform(scrollYProgress, [0.15, 0.25, 0.65, 0.75], [0.8, 1, 1, 0.8]);
  const mechanicsOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.65, 0.7], [0, 1, 1, 0]);
  const mechanicsDisplay = useTransform(scrollYProgress, (p) => p < 0.14 || p > 0.76 ? "none" : "flex");

  const step1Opacity = useTransform(scrollYProgress, [0.25, 0.3, 0.4], [1, 1, 0]);
  const step1Display = useTransform(scrollYProgress, (p) => p > 0.41 ? "none" : "flex");
  const step2Opacity = useTransform(scrollYProgress, [0.4, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
  const step2Display = useTransform(scrollYProgress, (p) => p < 0.39 || p > 0.61 ? "none" : "flex");
  const step3Opacity = useTransform(scrollYProgress, [0.6, 0.65, 0.7], [0, 1, 1]);
  const step3Display = useTransform(scrollYProgress, (p) => p < 0.59 ? "none" : "flex");

  // --- 3. FEATURES PHASE (85% to 100%) ---
  const featuresOpacity = useTransform(scrollYProgress, [0.8, 0.85], [0, 1]);
  const featuresY = useTransform(scrollYProgress, [0.8, 0.85], ["50px", "0px"]);
  const featuresDisplay = useTransform(scrollYProgress, (p) => p < 0.79 ? "none" : "flex");

  return (
    <section 
      ref={containerRef}
      className={`relative w-full h-[1000vh] transition-colors duration-500 ease-in-out ${activeTheme === "dark" ? "bg-[#1A1E26] text-[#F2EBDC]" : "bg-[#F2EBDC] text-[#1A1E26]"}`}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center px-6 md:px-12">
        
        {/* =======================
            THE ANGULAR PATH (Z-0)
        ======================== */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            {/* The background faint track */}
            <path
              d="M 500,0 L 500,200 Q 500,250 450,250 L 250,250 Q 200,250 200,300 L 200,450 Q 200,500 250,500 L 750,500 Q 800,500 800,550 L 800,700 Q 800,750 750,750 L 550,750 Q 500,750 500,800 L 500,1000"
              fill="none"
              stroke="#5C734C"
              strokeWidth="4"
              strokeOpacity="0.15"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* The animated drawing green path */}
            <motion.path
              ref={pathRef}
              d="M 500,0 L 500,200 Q 500,250 450,250 L 250,250 Q 200,250 200,300 L 200,450 Q 200,500 250,500 L 750,500 Q 800,500 800,550 L 800,700 Q 800,750 750,750 L 550,750 Q 500,750 500,800 L 500,1000"
              fill="none"
              stroke="#5C734C"
              strokeWidth="12"
              strokeLinejoin="miter"
              vectorEffect="non-scaling-stroke"
              style={{
                pathLength,
                strokeDasharray: "1 1", // For Framer motion pathLength
              }}
            />
          </svg>
        </div>

        {/* =======================
            DYNAMIC NAVIGATION ARROW (Z-10)
        ======================== */}
        <motion.div 
           className="absolute pointer-events-none z-10"
           style={{ 
             left: arrowLeft, 
             top: arrowTop,
             x: "-50%", 
             y: "-50%",
             rotate: arrowRotation,
             opacity: arrowOpacity 
           }}
        >
           {/* A 3D styled arrow cursor, filled with Sage Green */}
           <div className="bg-white rounded-full p-2 shadow-2xl border border-black/10 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5C734C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 11 19-9-9 19-2-8-8-2z" fill="#5C734C" />
              </svg>
           </div>
        </motion.div>


        {/* =======================
            HERO PHASE (Z-20)
        ======================== */}
        <motion.div 
          className="absolute inset-0 flex-col items-center justify-center text-center px-6 z-20"
          style={{ opacity: heroOpacity, y: heroY, display: heroDisplay as any }}
        >
          {/* Subtle Topographic Lines strictly in the hero */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <svg className="h-full w-full" viewBox="0 0 2048 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g stroke="#5C734C" strokeWidth="2" fill="none">
                 <path d="M-40 110 C120 48 280 130 460 70 C640 12 820 96 1020 40 C1220 -16 1420 70 1620 24 C1800 -12 1960 40 2140 10" />
                 <path d="M-50 210 C140 150 300 230 490 170 C700 100 880 190 1080 130 C1280 70 1460 150 1680 100 C1860 60 1980 110 2140 80" />
              </g>
            </svg>
          </div>
          
          <div className="relative z-10 bg-[#F2EBDC] p-8 rounded-[32px] border border-black/5 shadow-2xl max-w-5xl mx-auto">
             <span className="font-sans text-roam-sage text-sm tracking-[0.2em] uppercase font-bold mb-6 block">
               App Overview
             </span>
             <h1 className="text-[3rem] font-bold leading-[0.9] tracking-tighter sm:text-[5rem] md:text-[6rem]">
               Turn passive navigation <br className="hidden md:block"/> into <span className="font-accent italic text-roam-sage font-normal">active exploration</span>.
             </h1>
             <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl opacity-70 leading-relaxed font-medium">
               Roam.io transforms your everyday environment into a living map. Uncover hidden regions, log your visits, and level up just by stepping outside.
             </p>
          </div>
        </motion.div>

        {/* =======================
            MECHANICS PHASE (Z-20)
        ======================== */}
        <motion.div 
          className="absolute inset-0 items-center justify-center pointer-events-none z-20"
          style={{ opacity: mechanicsOpacity, display: mechanicsDisplay as any }}
        >
           <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              
              {/* Left: Crossfading Story Text */}
              <div className="relative h-[300px] flex items-center">
                 {/* Step 1: Wander */}
                 <motion.div className="absolute inset-0 flex-col justify-center" style={{ opacity: step1Opacity, display: step1Display as any, zIndex: 30 }}>
                   <div className="bg-[#1A1E26] text-[#F2EBDC] p-8 rounded-[24px] border border-white/10 shadow-2xl inline-block max-w-md">
                     <span className="text-roam-sage font-bold uppercase tracking-widest text-sm mb-4 block">Phase 01</span>
                     <h2 className="text-4xl font-bold tracking-tighter mb-4">
                       <span className="font-accent italic text-roam-sage font-normal">Wander</span> into the fog.
                     </h2>
                     <p className="text-lg opacity-80 leading-relaxed font-medium">
                       Your map starts blank. As you move through the city, the digital fog clears, revealing the layout of your neighborhood.
                     </p>
                   </div>
                 </motion.div>
                 {/* Step 2: Log */}
                 <motion.div className="absolute inset-0 flex-col justify-center" style={{ opacity: step2Opacity, display: step2Display as any, zIndex: 20 }}>
                   <div className="bg-[#1A1E26] text-[#F2EBDC] p-8 rounded-[24px] border border-white/10 shadow-2xl inline-block max-w-md">
                     <span className="text-roam-clay font-bold uppercase tracking-widest text-sm mb-4 block">Phase 02</span>
                     <h2 className="text-4xl font-bold tracking-tighter mb-4">
                       <span className="font-accent italic text-roam-clay font-normal">Log</span> your visits.
                     </h2>
                     <p className="text-lg opacity-80 leading-relaxed font-medium">
                       When you uncover a place of interest, check in. Snap a photo, leave a note, and build a permanent record.
                     </p>
                   </div>
                 </motion.div>
                 {/* Step 3: Grow */}
                 <motion.div className="absolute inset-0 flex-col justify-center" style={{ opacity: step3Opacity, display: step3Display as any, zIndex: 10 }}>
                   <div className="bg-[#1A1E26] text-[#F2EBDC] p-8 rounded-[24px] border border-white/10 shadow-2xl inline-block max-w-md">
                     <span className="text-roam-sand font-bold uppercase tracking-widest text-sm mb-4 block">Phase 03</span>
                     <h2 className="text-4xl font-bold tracking-tighter mb-4">
                       <span className="font-accent italic text-roam-sand font-normal">Grow</span> your profile.
                     </h2>
                     <p className="text-lg opacity-80 leading-relaxed font-medium">
                       Exploration is rewarded. Earn XP based on the size and rarity of the regions you unlock. Level up and expand your territory.
                     </p>
                   </div>
                 </motion.div>
              </div>

              {/* Right: The Device Mockup */}
              <div className="relative flex justify-center lg:justify-end h-[500px] lg:h-[640px] pointer-events-auto w-full">
                 <motion.div className="w-full flex justify-center lg:justify-end" style={{ y: deviceContainerY, scale: deviceScale }}>
                   <DeviceMockup interactive={false} className="max-w-[300px] shadow-2xl shadow-black/20">
                     <div className={`relative h-full w-full overflow-hidden flex items-center justify-center transition-colors duration-500 ${activeTheme === "dark" ? "bg-[#1A1E26]" : "bg-[#F2EBDC]"}`}>
                        
                        {/* Scene 1: Map Fog (Wander) */}
                        <motion.div className="absolute inset-0 items-center justify-center" style={{ opacity: step1Opacity, display: step1Display as any }}>
                           <div className={`absolute inset-0 z-10 pointer-events-none ${activeTheme === "dark" ? "bg-[radial-gradient(circle_at_center,transparent_20%,#1A1E26_60%)]" : "bg-[radial-gradient(circle_at_center,transparent_20%,#F2EBDC_60%)]"}`} />
                           <div className="w-48 h-48 border-4 border-[#5C734C]/30 rounded-full flex items-center justify-center animate-pulse">
                              <MapPin className="text-[#5C734C] w-12 h-12" />
                           </div>
                        </motion.div>

                        {/* Scene 2: Check-in (Log) */}
                        <motion.div className="absolute inset-0 flex-col items-center justify-center p-6" style={{ opacity: step2Opacity, display: step2Display as any }}>
                           <div className={`w-full rounded-2xl p-6 border mb-4 ${activeTheme === "dark" ? "bg-[#242A35] border-white/20" : "bg-white border-black/10"}`}>
                              <div className="w-12 h-12 bg-roam-clay rounded-full flex items-center justify-center mb-4">
                                 <Camera className="w-6 h-6 text-white" />
                              </div>
                              <h4 className="text-xl font-bold mb-2">Market Lane</h4>
                              <p className="text-sm opacity-70">Checked in just now</p>
                           </div>
                        </motion.div>

                        {/* Scene 3: Level Up (Grow) & Dark Mode Toggle */}
                        <motion.div className="absolute inset-0 flex-col items-center justify-center p-6" style={{ opacity: step3Opacity, pointerEvents: "auto", display: step3Display as any }}>
                           <Trophy className="w-20 h-20 mb-4 text-[#5C734C]" />
                           <h3 className="text-3xl font-bold font-accent italic mb-2">Level 12</h3>
                           <div className={`w-full h-2 rounded-full mt-4 overflow-hidden mb-8 border ${activeTheme === "dark" ? "bg-white/10 border-white/10" : "bg-black/10 border-black/10"}`}>
                              <div className="w-[75%] h-full bg-[#5C734C] rounded-full" />
                           </div>
                           
                           {/* Dark Mode Toggle Switch */}
                           <div className={`w-full max-w-[200px] rounded-2xl p-4 flex flex-col items-center gap-3 border mt-4 cursor-pointer transition-colors ${activeTheme === "dark" ? "bg-[#242A35] border-white/10" : "bg-white border-black/10"}`}
                                onClick={() => setManualTheme(activeTheme === "dark" ? "light" : "dark")}
                           >
                              <span className="text-xs font-mono uppercase tracking-widest opacity-70">App Theme</span>
                              <div className="flex items-center gap-3">
                                 <Sun className={`w-4 h-4 ${activeTheme === "light" ? "opacity-100" : "opacity-30"}`} />
                                 <div className={`w-12 h-6 rounded-full relative p-1 transition-colors border ${activeTheme === "dark" ? "bg-white/20 border-white/10" : "bg-black/20 border-black/10"}`}>
                                    <div className={`w-4 h-4 bg-current rounded-full transition-transform duration-300 ${activeTheme === "light" ? "translate-x-0" : "translate-x-6"}`} />
                                 </div>
                                 <Moon className={`w-4 h-4 ${activeTheme !== "light" ? "opacity-100" : "opacity-30"}`} />
                              </div>
                           </div>
                        </motion.div>
                     </div>
                   </DeviceMockup>
                 </motion.div>
              </div>

           </div>
        </motion.div>

        {/* =======================
            FEATURES PHASE 
        ======================== */}
        <motion.div 
          className="absolute inset-0 items-center justify-center z-20"
          style={{ opacity: featuresOpacity, y: featuresY, display: featuresDisplay as any }}
        >
           <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pointer-events-auto px-6">
              
              {/* Features Heading */}
              <div className="lg:col-span-3 mb-8 text-center drop-shadow-xl">
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                   Systems designed to <br className="hidden md:block"/> pull you <span className="font-accent italic text-roam-sage font-normal">outside</span>.
                 </h2>
              </div>

              {/* Feature 1: Journeys */}
              <div className={`lg:col-span-2 border rounded-[24px] p-10 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl transition-colors ${activeTheme === "dark" ? "bg-[#1A1E26] border-white/20" : "bg-[#F2EBDC] border-black/10"}`}>
                 <div className="relative z-10 mb-12">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-70 mb-4 block">Archive System</span>
                    <h3 className="text-3xl font-bold mb-4">Relive your Journeys</h3>
                    <p className="opacity-90 text-lg max-w-md">
                      Every step is recorded. Access a complete history of your explorations, filter by recent activity, and review the exact routes you took.
                    </p>
                 </div>
                 <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {[
                     { title: "Clayton Loop", date: "Yesterday", xp: "32 XP" },
                     { title: "CBD Discovery", date: "Oct 05", xp: "84 XP" }
                   ].map((journey, i) => (
                     <div key={i} className={`p-5 rounded-[16px] border flex items-center justify-between transition-colors ${activeTheme === "dark" ? "bg-[#242A35] border-white/20" : "bg-white border-black/10"}`}>
                        <div>
                          <h4 className="font-bold">{journey.title}</h4>
                          <p className="text-sm opacity-70">{journey.date}</p>
                        </div>
                        <span className="font-bold text-roam-sage font-mono text-sm">+{journey.xp}</span>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Feature 2: Analytics */}
              <div className={`lg:col-span-1 border rounded-[24px] p-10 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl transition-colors ${activeTheme === "dark" ? "bg-[#1A1E26] border-white/20" : "bg-[#F2EBDC] border-black/10"}`}>
                 <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none ${activeTheme === "dark" ? "bg-white/10" : "bg-black/5"}`} />
                 <div className="relative z-10">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-70 mb-4 block">Insights</span>
                    <h3 className="text-3xl font-bold mb-4">Analytics Engine</h3>
                    <p className="opacity-90 text-lg">
                      Track your total area unlocked, monitor your leveling velocity, and visualize your most active heatmaps.
                    </p>
                 </div>
                 <div className={`relative z-10 mt-16 p-6 rounded-[16px] border transition-colors ${activeTheme === "dark" ? "bg-[#242A35] border-white/20" : "bg-white border-black/10"}`}>
                    <span className="block opacity-80 text-xs font-mono uppercase mb-2">Total Uncovered</span>
                    <span className="text-4xl font-bold font-accent italic">12,450 <span className="text-base font-sans not-italic font-medium opacity-70">sq m</span></span>
                 </div>
              </div>

           </div>
        </motion.div>

      </div>
    </section>
  );
}
