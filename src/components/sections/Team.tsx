"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const teamMembers = [
  { id: 1, name: "Nathan Nunes", role: "Product Manager" },
  { id: 2, name: "Alvin Liong", role: "Software Architect" },
  { id: 3, name: "Sanjevan Rajasegar", role: "Release Train Engineer" },
  { id: 4, name: "Jacob De La Paz", role: "Product Manager" },
];

export function Team() {
  return (
    <section className="relative w-full py-32 bg-roam-cream overflow-hidden px-6 md:px-12" id="team">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-roam-ink mb-6">
            The people building <br className="hidden md:block"/> Roam.io
          </h2>
          <p className="text-xl text-roam-text-muted max-w-2xl mx-auto leading-relaxed mb-12">
            Built by a multidisciplinary student team exploring how software, maps and game mechanics can encourage people to experience the places around them.
          </p>
          <Link 
            href="/about-the-team" 
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-roam-ink text-roam-cream font-semibold tracking-wide transition-transform hover:-translate-y-1 hover:shadow-roam-dark group"
          >
            Meet the Full Team
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {teamMembers.map((member, i) => (
            <motion.div 
              key={member.id}
              className="group relative bg-roam-sand/20 rounded-3xl overflow-hidden aspect-[3/4] flex flex-col justify-end p-6 border border-roam-border cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
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
