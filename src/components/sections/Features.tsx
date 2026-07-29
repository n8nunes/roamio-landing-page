"use client";

import { motion } from "framer-motion";
import { DeviceMockup } from "@/components/ui/DeviceMockup";

export function Features() {
  return (
    <section className="relative w-full py-32 bg-roam-cream overflow-hidden px-6 md:px-12" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center md:text-left">
          <span className="text-sm font-semibold tracking-widest text-roam-sage uppercase mb-4 block">Capabilities</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-roam-ink">
            A new way to look <br className="hidden md:block"/> at the map.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          
          {/* Feature 1: Unlock Regions (Large Left) */}
          <motion.div 
            className="md:col-span-7 flex flex-col md:flex-row bg-roam-sand/30 rounded-[40px] p-8 md:p-12 items-center gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-roam-ink mb-4">Unlock Regions</h3>
              <p className="text-roam-text-muted text-lg">Move into a new region to reveal it on your map and earn XP based on its area.</p>
            </div>
            <div className="w-full md:w-64 h-64 relative bg-white/50 rounded-3xl overflow-hidden border border-white/20 flex items-center justify-center">
              <motion.div 
                className="absolute w-32 h-32 bg-roam-sage/40 mix-blend-multiply" 
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </motion.div>

          {/* Feature 2: Discover Places (Small Right) */}
          <motion.div 
            className="md:col-span-5 bg-roam-sage/10 rounded-[40px] p-8 md:p-12 flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-roam-ink mb-4">Discover Places</h3>
              <p className="text-roam-text-muted text-lg">Once an area is unlocked, nearby places of interest become part of the map.</p>
            </div>
            <div className="relative h-48 w-full">
              <motion.div 
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/0 via-white/80 to-white backdrop-blur-[2px]"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-roam-clay rounded-full shadow-lg" />
              <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-roam-sand rounded-full shadow-lg" />
            </div>
          </motion.div>

          {/* Feature 3: Log Visits (Vertical Device) */}
          <motion.div 
            className="md:col-span-4 bg-white rounded-[40px] p-8 flex flex-col items-center border border-roam-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <DeviceMockup interactive={false} className="scale-75 origin-top mb-[-100px]">
              <div className="flex flex-col items-center justify-center h-full bg-roam-cream relative">
                <div className="absolute w-48 h-48 border border-roam-sage/40 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 border border-roam-sage/60 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-roam-sage rounded-full" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6">
                  <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
                  <div className="h-6 w-3/4 bg-gray-100 rounded mb-4" />
                  <div className="h-4 w-1/2 bg-gray-100 rounded" />
                </div>
              </div>
            </DeviceMockup>
            <div className="mt-12 text-center relative z-10 bg-white pt-4">
              <h3 className="text-2xl font-bold text-roam-ink mb-2">Log Visits</h3>
              <p className="text-roam-text-muted">Check in when you are nearby, then add notes, photos or videos.</p>
            </div>
          </motion.div>

          {/* Feature 4: Earn XP */}
          <motion.div 
            className="md:col-span-8 bg-roam-ink rounded-[40px] p-8 md:p-12 text-roam-cream flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-4">Earn XP</h3>
                <p className="text-roam-cream/70 text-lg mb-8">Region unlocks and visits contribute to a personal progression system.</p>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-roam-sage"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "75%" }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
              <div className="w-48 h-48 shrink-0 flex items-center justify-center bg-roam-dark-surface rounded-full border border-white/10 relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-roam-sage/30"
                />
                <span className="text-5xl font-bold text-roam-sage">Lvl 8</span>
              </div>
            </div>
          </motion.div>

          {/* Feature 5: Analytics & Feature 6: Personalize */}
          <motion.div 
            className="md:col-span-6 bg-roam-inner rounded-[40px] p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-roam-ink mb-4">View Analytics</h3>
            <p className="text-roam-text-muted text-lg mb-12">Review visited tiles, total visits, XP, recent places, and activity heatmaps.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 p-6 rounded-2xl border border-white/50">
                <span className="block text-roam-text-muted text-sm mb-2">Total XP</span>
                <span className="text-4xl font-bold text-roam-ink">12,450</span>
              </div>
              <div className="bg-white/50 p-6 rounded-2xl border border-white/50">
                <span className="block text-roam-text-muted text-sm mb-2">Visits</span>
                <span className="text-4xl font-bold text-roam-ink">142</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="md:col-span-6 bg-roam-dark-bg text-roam-cream rounded-[40px] p-8 md:p-12 relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4 text-white">Personalise Roam.io</h3>
              <p className="text-roam-cream/70 text-lg">Manage your identity, profile image and visual preferences from one place.</p>
            </div>
            
            {/* Dark Mode toggle simulation */}
            <div className="absolute right-[-10%] bottom-[-20%] w-64 h-64 rounded-full bg-roam-cream/10 blur-3xl transition-transform duration-700 group-hover:scale-150 group-hover:bg-roam-sage/20" />
            <div className="mt-12 flex items-center justify-between bg-white/5 p-4 rounded-full border border-white/10 backdrop-blur-md max-w-sm relative z-10">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-roam-sage" />
                <span className="font-medium">Theme</span>
              </div>
              <div className="w-16 h-8 bg-white/20 rounded-full p-1 flex items-center justify-end">
                <motion.div className="w-6 h-6 bg-white rounded-full" layout />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
