"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for fog reveal
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse movement for the mask
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      mouseX.set(e.touches[0].clientX);
      mouseY.set(e.touches[0].clientY);
    };

    // Center initially
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-roam-cream"
      id="home"
    >
      {/* Base Map Layer (Revealed) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-roam-cream bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] mix-blend-multiply opacity-30" />
        {/* Placeholder for map artwork */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] border border-roam-sage/20 rounded-full flex items-center justify-center relative">
            <div className="w-[400px] h-[400px] border border-roam-sage/30 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-roam-sage rounded-full" />
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-roam-clay rounded-full" />
            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-roam-sand rounded-full" />
            
            {/* Route line placeholder */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800">
              <path 
                d="M 250,550 Q 400,600 400,400 T 550,250" 
                fill="none" 
                stroke="var(--color-roam-sage)" 
                strokeWidth="4" 
                strokeDasharray="8 8"
                className="opacity-40"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Fog Layer */}
      <motion.div
        className="absolute inset-0 z-10 bg-white/90 backdrop-blur-md"
        style={{
          WebkitMaskImage: `radial-gradient(circle 300px at calc(${smoothX}px) calc(${smoothY}px), transparent 20%, black 100%)`,
          maskImage: `radial-gradient(circle 300px at calc(${smoothX}px) calc(${smoothY}px), transparent 20%, black 100%)`,
        }}
      >
        {/* Animated fog texture overlays to make it volumetric */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] pointer-events-none mix-blend-overlay" />
      </motion.div>

      {/* Content Layer (Always visible, above fog) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 md:px-12 text-center pointer-events-none">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl flex flex-col items-center pointer-events-auto"
        >
          <span className="text-sm md:text-base font-semibold tracking-widest text-roam-sage uppercase mb-6">
            A location-based exploration game
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-roam-ink mb-8 leading-[0.9]">
            Unlock the city <br/> by exploring it.
          </h1>
          <p className="text-lg md:text-xl text-roam-text-muted max-w-2xl mb-10 leading-relaxed font-medium">
            Roam.io turns the places around you into an exploration game. Unlock neighbourhoods, discover nearby locations, record your visits and watch your personal map grow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg">
              Get the App
            </Button>
            <Button variant="outline" size="lg">
              View the Project
            </Button>
          </div>
        </motion.div>

        {/* Interaction Prompt */}
        <motion.div 
          className="absolute bottom-12 flex flex-col items-center gap-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-xs tracking-widest text-roam-text-subtle uppercase">Move to uncover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-roam-text-subtle to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
