"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const teamMembers = [
  { id: 1, name: "Amarprit Singh", role: "[Team role required]" },
  { id: 2, name: "Kevin Phan", role: "[Team role required]" },
  { id: 3, name: "Nathan Nunes", role: "[Team role required]" },
  { id: 4, name: "Sanjevan Rajasegar", role: "[Team role required]" },
  { id: 5, name: "Alvin Liong", role: "[Team role required]" },
  { id: 6, name: "Jacob de la Paz", role: "[Team role required]" },
  { id: 7, name: "Sam Sutherland", role: "[Team role required]" },
  { id: 8, name: "Rushil Patel", role: "[Team role required]" },
];

export function Team() {
  return (
    <section className="relative w-full py-32 bg-roam-cream overflow-hidden px-6 md:px-12" id="team">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-roam-ink mb-6">
            The people building <br className="hidden md:block"/> Roam.io
          </h2>
          <p className="text-xl text-roam-text-muted max-w-2xl mx-auto leading-relaxed">
            Built by a multidisciplinary student team exploring how software, maps and game mechanics can encourage people to experience the places around them.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {teamMembers.map((member, i) => (
            <motion.div 
              key={member.id}
              className="group relative bg-roam-sand/20 rounded-3xl overflow-hidden aspect-[3/4] flex flex-col justify-end p-6 border border-roam-border cursor-crosshair"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              data-cursor-interactable="true"
              data-cursor-text="View"
            >
              {/* Background hover reveal layer */}
              <div className="absolute inset-0 bg-roam-sage/10 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
              
              <div className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-roam-ink">{member.name}</h3>
                <p className="text-roam-text-muted mt-1 font-mono text-xs uppercase tracking-wider opacity-0 transition-opacity duration-300 group-hover:opacity-100 delay-100">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
