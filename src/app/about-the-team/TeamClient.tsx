"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Mountain, Route } from "lucide-react";
import clsx from "clsx";

const teamGroups = [
  {
    role: "Product Managers",
    description: "Guiding the vision and ensuring we deliver an exceptional experience for every user.",
    icon: Compass,
    members: [
      { id: "pm-1", name: "Nathan Nunes" },
      { id: "pm-2", name: "Jacob De La Paz" },
      { id: "pm-3", name: "Kevin Pham" },
    ],
  },
  {
    role: "Software Architects",
    description: "Designing the robust technical foundation that makes Roam.io fast, scalable, and reliable.",
    icon: Route,
    members: [
      { id: "sa-1", name: "Alvin Liong" },
      { id: "sa-2", name: "Rushil Patel" },
    ],
  },
  {
    role: "Release Train Engineers",
    description: "Orchestrating our delivery process to keep the team moving forward smoothly and safely.",
    icon: Mountain,
    members: [
      { id: "rte-1", name: "Sanjevan Rajasegar" },
      { id: "rte-2", name: "Amarprit Singh" },
      { id: "rte-3", name: "Samuel Sutherland" },
    ],
  },
];

// Flattened for the sticky timeline
const allMembers = teamGroups.flatMap(group => 
  group.members.map(member => ({
    ...member,
    groupName: group.role,
    groupDescription: group.description
  }))
);

export function TeamClient() {
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll only within the 800vh timeline section
  const { scrollYProgress } = useScroll({
    target: stickyContainerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Map scroll progress to an index between 0 and (total - 1)
  const mappedIndex = useTransform(scrollYProgress, [0, 1], [0, allMembers.length - 1]);

  useMotionValueEvent(mappedIndex, "change", (latest) => {
    setActiveIndex(Math.round(latest));
  });

  const activeMember = allMembers[activeIndex];

  return (
    <div className="bg-roam-cream">
      
      {/* ========================================================= */}
      {/* PART 1: TOP HERO & GROUPED GRID */}
      {/* ========================================================= */}
      <div className="relative min-h-screen pb-32">
        {/* Background Topo */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
          <svg className="w-full h-full text-roam-sage" xmlns="http://www.w3.org/2000/svg">
            <pattern id="topo-team-hero" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M100,50 Q150,0 200,50 T300,50" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.6" />
              <path d="M0,150 Q50,100 100,150 T200,150" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.6" />
              <path d="M-50,100 Q0,50 50,100 T150,100 T250,100" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#topo-team-hero)" />
          </svg>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/" className="inline-flex items-center text-sm font-semibold tracking-widest text-roam-sage uppercase mb-8 hover:text-roam-ink transition-colors group">
              <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to Basecamp
            </Link>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-roam-ink mb-8 leading-[0.9]">
              The builders behind <br />
              <span className="text-roam-sage font-accent italic font-normal tracking-normal">Roam.io</span>
            </h1>
            <p className="text-xl md:text-2xl text-roam-text-muted max-w-2xl leading-relaxed">
              We are a multidisciplinary team of explorers, designers, and engineers dedicated to transforming how you experience the places around you.
            </p>
          </motion.div>
        </section>

        {/* Grouped Grid */}
        <section className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto space-y-32">
          {teamGroups.map((roleGroup, groupIndex) => (
            <div key={roleGroup.role} className="relative">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-roam-border pb-8">
                <div className="max-w-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-roam-sage/10 flex items-center justify-center text-roam-sage">
                      <roleGroup.icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-roam-ink tracking-tight">
                      {roleGroup.role}
                    </h2>
                  </div>
                </div>
                <div className="text-roam-sage font-mono text-sm tracking-widest uppercase">
                  {roleGroup.members.length} Members
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {roleGroup.members.map((member, i) => (
                  <motion.div
                    key={member.id}
                    className="group relative bg-roam-sand/20 rounded-3xl overflow-hidden aspect-[4/5] flex flex-col justify-end p-6 border border-roam-border cursor-crosshair"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    {/* Placeholder Grid Photo */}
                    <svg width="100%" height="100%" className="absolute inset-0 text-roam-sage/10" xmlns="http://www.w3.org/2000/svg">
                        <pattern id={`grid-dots-${member.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="2" r="1.5" fill="currentColor"/>
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#grid-dots-${member.id})`} />
                    </svg>

                    <div className="absolute inset-0 bg-roam-sage/10 translate-y-[101%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                    
                    <div className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
                      <h3 className="text-lg md:text-xl font-bold text-roam-ink">{member.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </section>
        
        {/* Scroll Indicator Prompt */}
        <div className="relative z-10 mt-32 text-center pb-12">
           <p className="text-roam-sage font-mono text-sm uppercase tracking-widest mb-4">Scroll for deep dive</p>
           <div className="w-[1px] h-16 bg-gradient-to-b from-roam-sage to-transparent mx-auto"></div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* PART 2: STICKY SCROLL TIMELINE */}
      {/* ========================================================= */}
      <div 
        ref={stickyContainerRef} 
        className="relative bg-roam-ink" 
        style={{ height: `${allMembers.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row">
          
          {/* Navigation / Header for Sticky Section */}
          <div className="absolute top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between items-center text-roam-cream">
            <div className="font-mono text-xs tracking-widest uppercase opacity-50">
              Deep Dive
            </div>
            <div className="font-mono text-xs tracking-widest uppercase bg-roam-sage/20 px-3 py-1 rounded-full text-roam-sage">
              {String(activeIndex + 1).padStart(2, '0')} / {String(allMembers.length).padStart(2, '0')}
            </div>
          </div>

          {/* Left Panel - Photo/Visual */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-roam-dark-bg flex items-center justify-center p-6 md:p-12 pt-24 md:pt-12">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeMember.id + "-visual"}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-sm aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden bg-roam-sage flex items-center justify-center"
              >
                {/* Placeholder texture/pattern for photo */}
                <svg width="100%" height="100%" className="absolute inset-0 text-roam-cream/20" xmlns="http://www.w3.org/2000/svg">
                  <pattern id={`topo-${activeMember.id}`} width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M50,25 Q75,0 100,25 T150,25" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
                    <path d="M0,75 Q25,50 50,75 T100,75" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
                  </pattern>
                  <rect width="100%" height="100%" fill={`url(#topo-${activeMember.id})`} />
                </svg>
                
                <div className="absolute inset-0 bg-gradient-to-t from-roam-ink/80 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-roam-cream/10 flex items-center justify-center text-roam-cream backdrop-blur-md">
                     {activeMember.groupName.includes("Product") && <Compass className="w-4 h-4" />}
                     {activeMember.groupName.includes("Architect") && <Route className="w-4 h-4" />}
                     {activeMember.groupName.includes("Engineer") && <Mountain className="w-4 h-4" />}
                  </div>
                  <span className="text-roam-cream/70 text-xs font-mono tracking-widest uppercase backdrop-blur-md">
                    Portrait Space
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Panel - Info/Text */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-roam-dark-surface flex items-center p-8 md:p-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id + "-text"}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-xl w-full"
              >
                <h2 className="text-roam-sage text-sm md:text-base font-semibold uppercase tracking-[0.2em] mb-4">
                  {activeMember.groupName}
                </h2>
                
                <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-roam-dark-text mb-8 leading-[0.9]">
                  {activeMember.name}
                </h3>
                
                <p className="text-lg md:text-2xl text-roam-dark-muted leading-relaxed">
                  {activeMember.groupDescription}
                </p>

                {/* Progress Indicator Dots */}
                <div className="mt-16 flex gap-2 flex-wrap">
                  {allMembers.map((_, idx) => (
                    <div 
                      key={idx}
                      className={clsx(
                        "h-1 rounded-full transition-all duration-500",
                        idx === activeIndex ? "w-8 bg-roam-sage" : "w-2 bg-roam-dark-inner"
                      )}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
