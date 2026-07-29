"use client";

import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="relative w-full py-48 bg-roam-sage text-white overflow-hidden px-6 md:px-12">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.h2 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ready to see what <br/> is around you?
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/80 font-medium mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Roam.io is being prepared for wider release. Explore the project now and return soon for application availability.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-roam-ink text-white/50 px-8 py-4 rounded-2xl flex items-center justify-center font-semibold text-lg border border-white/10 cursor-not-allowed">
            App Store [Coming Soon]
          </div>
          <div className="bg-roam-ink text-white/50 px-8 py-4 rounded-2xl flex items-center justify-center font-semibold text-lg border border-white/10 cursor-not-allowed">
            Google Play [Coming Soon]
          </div>
        </motion.div>
      </div>
    </section>
  );
}
