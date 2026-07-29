"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function RepositoryCTA() {
  return (
    <section className="relative w-full py-32 bg-roam-dark-surface text-roam-cream overflow-hidden px-6 md:px-12" id="repo">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left Side: Abstract Code Window */}
        <motion.div 
          className="w-full md:w-1/2 relative h-96 bg-roam-dark-bg rounded-3xl border border-white/10 p-6 flex flex-col shadow-2xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Window Header */}
          <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          
          {/* Code Lines */}
          <div className="flex-1 font-mono text-sm leading-loose text-roam-cream/50 overflow-hidden relative">
            <motion.div
              animate={{ y: [0, -100, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0"
            >
              <div className="flex"><span className="w-8 text-white/20">1</span><span className="text-roam-sage">import</span> {'{'} Map, Marker {'}'} <span className="text-roam-sage">from</span> &apos;roam-core&apos;;</div>
              <div className="flex"><span className="w-8 text-white/20">2</span><span className="text-roam-sage">import</span> {'{'} checkIn {'}'} <span className="text-roam-sage">from</span> &apos;@/api/visits&apos;;</div>
              <div className="flex"><span className="w-8 text-white/20">3</span></div>
              <div className="flex"><span className="w-8 text-white/20">4</span><span className="text-roam-sage">export function</span> UnlockRegion() {'{'}</div>
              <div className="flex"><span className="w-8 text-white/20">5</span>  <span className="text-roam-sage">const</span> userLocation = useLocation();</div>
              <div className="flex"><span className="w-8 text-white/20">6</span>  <span className="text-roam-sage">const</span> region = getRegionAt(userLocation);</div>
              <div className="flex"><span className="w-8 text-white/20">7</span></div>
              <div className="flex"><span className="w-8 text-white/20">8</span>  <span className="text-roam-sage">if</span> (!region.isUnlocked) {'{'}</div>
              <div className="flex"><span className="w-8 text-white/20">9</span>    unlockRegion(region.id);</div>
              <div className="flex"><span className="w-8 text-white/20">10</span>    grantXP(region.area);</div>
              <div className="flex"><span className="w-8 text-white/20">11</span>  {'}'}</div>
              <div className="flex"><span className="w-8 text-white/20">12</span>{'}'}</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Copy & CTA */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col items-start"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-white">
            See how Roam.io is being built.
          </h2>
          <p className="text-lg md:text-xl text-roam-cream/70 mb-10 leading-relaxed font-light">
            Explore the application, backend services and development progress behind the project.
          </p>
          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" onClick={() => window.open("https://github.com/FIT3170-2026W2/2026W2-Roam.io", "_blank")}>
            View the Repository
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
