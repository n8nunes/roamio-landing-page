"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Editorial() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-32 md:py-64 bg-roam-cream overflow-hidden px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        
        {/* Left Side: Oversized Typography */}
        <div className="w-full md:w-3/5 z-10">
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-[7.5rem] font-bold tracking-tighter text-roam-ink leading-[0.9] -ml-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Your city is <br />
            <span className="text-roam-sage">bigger</span> than <br />
            the places you <br />
            already know.
          </motion.h2>
          
          <motion.p 
            className="mt-12 text-lg md:text-xl lg:text-2xl text-roam-text-muted max-w-lg font-medium leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Roam.io rewards curiosity. Move through supported regions, reveal nearby places, record where you have been and build a map shaped by your own experiences.
          </motion.p>
        </div>

        {/* Right Side: Decorative Map/Abstract Elements */}
        <div className="w-full md:w-2/5 relative h-[500px] flex items-center justify-center">
          {/* Parallax abstract map shapes */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-10 right-10 w-64 h-64 border border-roam-sage/20 rounded-full"
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-10 left-0 w-48 h-48 bg-roam-sand/30 rounded-[40px] rotate-12"
          />
          
          {/* Animated Route Line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 500">
            <motion.path 
              d="M 50,450 C 100,300 200,400 300,200 C 350,100 250,50 350,-50"
              fill="none"
              stroke="var(--color-roam-sage)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {/* Moving marker */}
            <motion.circle 
              r="6" 
              fill="var(--color-roam-clay)"
              initial={{ offsetDistance: "0%" }}
              whileInView={{ offsetDistance: "100%" }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{
                offsetPath: 'path("M 50,450 C 100,300 200,400 300,200 C 350,100 250,50 350,-50")',
              }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
