"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section className="relative w-full py-32 bg-roam-dark-bg text-roam-cream px-6 md:px-12" id="about">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 w-24 h-24 border border-roam-sage/30 rounded-full flex items-center justify-center relative"
        >
          {/* Roam.io star placeholder */}
          <div className="w-8 h-8 bg-roam-sage rotate-45 transform" />
        </motion.div>

        <motion.h2 
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Why Roam.io exists
        </motion.h2>

        <motion.p 
          className="text-xl md:text-3xl text-roam-cream/80 font-light leading-relaxed mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Roam.io is a location-based exploration app that turns movement through supported areas into visible progress. As users physically enter new regions, those areas unlock on their map. Places of interest then become available to discover, visit and record through notes and media. XP, levels and analytics create a personal view of how much of the world the user has explored.
        </motion.p>

        <motion.div 
          className="max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 className="text-roam-sage font-bold uppercase tracking-widest text-sm mb-4">Safety & Guidelines</h4>
          <p className="text-roam-cream/60 text-sm leading-relaxed">
            Roam.io is designed for personal exploration and is not a navigation or emergency-response service. Users should remain aware of their surroundings and follow local access rules.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
