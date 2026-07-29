"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navItems = [
  { id: "01", label: "Home", desc: "Uncover what is around you", href: "#home", previewBg: "bg-roam-sage/20" },
  { id: "02", label: "How It Works", desc: "Move, unlock and discover", href: "#how-it-works", previewBg: "bg-roam-clay/20" },
  { id: "03", label: "Explore the App", desc: "See the real product experience", href: "#explore", previewBg: "bg-roam-sand/20" },
  { id: "04", label: "Features", desc: "Map, visits, XP and analytics", href: "#features", previewBg: "bg-roam-inner/20" },
  { id: "05", label: "About Roam.io", desc: "Why the product exists", href: "#about", previewBg: "bg-roam-ink/20" },
  { id: "06", label: "Roadmap", desc: "What comes next", href: "#roadmap", previewBg: "bg-roam-dark-soft/20" },
  { id: "07", label: "Meet the Team", desc: "The people building Roam.io", href: "#team", previewBg: "bg-roam-dark-surface/20" },
  { id: "08", label: "Repository", desc: "Explore the project", href: "#repo", previewBg: "bg-roam-dark-inner/20" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(navItems[0]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard shortcut to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-6 md:px-12 pointer-events-none mix-blend-difference text-white">
        <div className="pointer-events-auto cursor-pointer" data-cursor-interactable="true" onClick={() => window.scrollTo(0, 0)}>
          <span className="text-2xl font-bold tracking-tighter">Roam.io</span>
        </div>
        
        <div className="pointer-events-auto flex items-center gap-6">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:inline-flex mix-blend-normal bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Get the App
          </Button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 focus:outline-none overflow-hidden"
            data-cursor-interactable="true"
            data-cursor-text={isOpen ? "Close" : "Open"}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className="flex flex-col gap-[4px] items-center justify-center w-full h-full p-3 z-10 transition-transform duration-300">
              <span className={cn("block h-[2px] bg-white transition-all duration-300", isOpen ? "w-6 translate-y-[6px] rotate-45" : "w-5 group-hover:w-6")} />
              <span className={cn("block h-[2px] bg-white transition-all duration-300", isOpen ? "w-6 -translate-y-[0px] -rotate-45" : "w-5 group-hover:w-6")} />
            </div>
            <motion.div 
              className="absolute inset-0 bg-roam-sage origin-bottom"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isOpen ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </button>
        </div>
      </header>

      {/* Full-screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.4, duration: 0.4 } }}
            className="fixed inset-0 z-50 flex flex-col md:flex-row bg-roam-ink text-roam-cream"
          >
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-roam-ink origin-top"
            />
            
            {/* Left Side: Navigation Links */}
            <div className="relative z-10 w-full md:w-[60%] h-full flex flex-col justify-center px-8 md:px-24 pt-24 md:pt-0 overflow-y-auto">
              <ul className="flex flex-col gap-2 md:gap-4">
                {navItems.map((item, i) => (
                  <motion.li 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a 
                      href={item.href}
                      className={cn(
                        "group flex items-baseline gap-4 md:gap-8 py-2 md:py-4 transition-colors duration-300 focus:outline-none",
                        activeHover.id === item.id ? "text-roam-cream" : "text-roam-cream/40 hover:text-roam-cream"
                      )}
                      onMouseEnter={() => setActiveHover(item)}
                      onFocus={() => setActiveHover(item)}
                      onClick={() => setIsOpen(false)}
                      data-cursor-interactable="true"
                    >
                      <span className="text-xs md:text-sm font-mono tracking-widest">{item.id}</span>
                      <span className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-none">{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-12 text-sm text-roam-cream/50 flex gap-6 font-mono"
              >
                <a href="#" className="hover:text-roam-sage transition-colors">Twitter</a>
                <a href="#" className="hover:text-roam-sage transition-colors">Instagram</a>
                <a href="#" className="hover:text-roam-sage transition-colors">Contact</a>
              </motion.div>
            </div>

            {/* Right Side: Visual Preview */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative z-10 hidden md:flex w-[40%] h-full bg-roam-dark-bg border-l border-white/5 items-center justify-center p-12 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHover.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={cn("w-full h-full max-h-[600px] rounded-3xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden", activeHover.previewBg)}
                >
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-roam-cream/80 text-lg md:text-2xl font-light mb-4">
                      {activeHover.desc}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-8">{activeHover.label}</h3>
                    {/* Placeholder for dynamic visual/device frame */}
                    <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md">
                      <span className="text-xs tracking-widest text-white/50 uppercase">Preview</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
