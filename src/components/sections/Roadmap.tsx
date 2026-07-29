"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const roadmapItems = [
  { id: 1, title: "Quests & Challenges", status: "In Development", desc: "Complete specific objectives in the real world to earn unique badges and rewards." },
  { id: 2, title: "Journey History", status: "Planned", desc: "View a timeline of your past exploration sessions and routes." },
  { id: 3, title: "Social Connections", status: "Planned", desc: "Add friends, view their check-ins, and share your discoveries." },
  { id: 4, title: "Live Activities", status: "Planned", desc: "Lock-screen integration to see your exploration progress without opening the app." },
];

export function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const fogOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 0.4, 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-32 bg-roam-cream overflow-hidden px-6 md:px-12" 
      id="roadmap"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-roam-ink mb-6">
            What we are <br/> building next
          </h2>
          <p className="text-xl text-roam-text-muted">The map is always expanding.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          
          {roadmapItems.map((item, i) => (
            <motion.div 
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-roam-border shadow-sm flex flex-col justify-between h-64 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Fog overlay metaphor for future features */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[4px] z-10 transition-all duration-700 group-hover:backdrop-blur-[1px] group-hover:bg-white/10" />
              
              <div className="relative z-20 flex justify-between items-start mb-8">
                <span className={cn(
                  "text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                  item.status === "In Development" ? "bg-roam-clay/10 text-roam-clay" : "bg-roam-sage/10 text-roam-sage"
                )}>
                  {item.status}
                </span>
                <span className="text-roam-text-subtle font-mono">0{item.id}</span>
              </div>
              
              <div className="relative z-20">
                <h3 className="text-2xl font-bold text-roam-ink mb-2">{item.title}</h3>
                <p className="text-roam-text-muted">{item.desc}</p>
              </div>
            </motion.div>
          ))}
          
        </div>
      </div>

      {/* Atmospheric Fog over the entire section */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/dust.png')]"
        style={{ opacity: fogOpacity }}
      />
    </section>
  );
}
