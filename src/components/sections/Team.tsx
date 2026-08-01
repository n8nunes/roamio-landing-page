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
    <section
      id="team"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-roam-cream px-6 py-16 md:px-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-5 text-5xl font-bold tracking-tighter text-roam-ink md:text-7xl">
            The people building
            <br className="hidden md:block" /> Roam.io
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-roam-text-muted md:text-xl">
            Built by a multidisciplinary student team exploring how software,
            maps and game mechanics can encourage people to experience the
            places around them.
          </p>

          <Link
            href="/about-the-team"
            className="group inline-flex items-center justify-center rounded-full bg-roam-ink px-8 py-4 font-semibold tracking-wide text-roam-cream transition-transform hover:-translate-y-1 hover:shadow-roam-dark"
          >
            Meet the Full Team

            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group relative flex aspect-[3/4] cursor-pointer flex-col justify-end overflow-hidden rounded-3xl border border-roam-border bg-roam-sand/20 p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
            >
              <div className="absolute inset-0 translate-y-full bg-roam-sage/10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />

              <div className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-4">
                <h3 className="text-xl font-bold text-roam-ink md:text-2xl">
                  {member.name}
                </h3>

                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-roam-text-muted opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
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