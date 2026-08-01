"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { DeviceMockup } from "@/components/ui/DeviceMockup";

const sequence = [
  { verb: "Move", rest: "through the city." },
  { verb: "Unlock", rest: "what's hidden." },
  { verb: "Discover", rest: "what's nearby." },
  { verb: "Remember", rest: "your journey." },
];

export function ProductMoment() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section data-header-theme="dark" className="relative bg-roam-ink px-6 py-24 text-roam-cream md:px-12 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-center">
        <div className="relative z-10 min-w-0 overflow-visible">
          <h2
            className="max-w-none text-[clamp(2.4rem,4.5vw,5.4rem)] font-bold leading-[1.08] tracking-tighter text-white text-balance"
            style={{ overflow: "visible", whiteSpace: "normal" }}
          >
            {sequence.map((line, index) => (
              <motion.span
                key={line.verb}
                className="mb-[0.12em] block overflow-visible"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.55, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline">
                  <span className="font-accent mr-[0.18em] inline font-normal italic text-roam-dark-sage">
                    {line.verb}
                  </span>
                  <span className="font-sans font-bold tracking-tighter text-white">
                    {line.rest}
                  </span>
                </span>
              </motion.span>
            ))}
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-roam-cream/68">
            One movement can change the map: a route crosses a boundary, a
            region clears, a place appears, and your progress becomes part of
            your history.
          </p>
        </div>

        <div className="relative mx-auto min-h-[520px] w-full max-w-[320px] lg:mx-0 lg:min-h-[640px] lg:max-w-[300px] lg:justify-self-end">
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-roam-dark-sage/40 to-transparent" />
          <DeviceMockup interactive={false} className="max-w-[300px]">
            <div className="relative h-full overflow-hidden bg-roam-cream text-roam-ink">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,30,38,0.07)_1px,transparent_1px),linear-gradient(rgba(26,30,38,0.07)_1px,transparent_1px)] bg-[size:34px_34px]" />
              <motion.div
                className="absolute left-8 top-28 h-40 w-44 rounded-[28px] bg-roam-sage/28"
                style={{ clipPath: "polygon(45% 0,100% 24%,88% 100%,8% 84%,0 22%)" }}
                initial={prefersReducedMotion ? false : { opacity: 0.16, scale: 0.92 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 0.46, scale: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.9, delay: 0.55 }}
              />
              <div
                className="absolute right-6 top-52 h-36 w-40 rounded-[24px] bg-roam-clay/16"
                style={{ clipPath: "polygon(18% 0,86% 12%,100% 78%,42% 100%,0 58%)" }}
              />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 694">
                <motion.path
                  d="M76 560 C 118 456 98 378 160 332 C 228 282 214 198 274 136"
                  fill="none"
                  stroke="#5C734C"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="8 12"
                  initial={prefersReducedMotion ? false : { pathLength: 0 }}
                  whileInView={prefersReducedMotion ? undefined : { pathLength: 1 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
                {!prefersReducedMotion && (
                  <motion.path
                    d="M76 560 C 118 456 98 378 160 332 C 228 282 214 198 274 136"
                    fill="none"
                    stroke="#BF573F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="2 18"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    animate={{ strokeDashoffset: [0, -40] }}
                    transition={{ pathLength: { duration: 2.2, ease: "easeInOut" }, strokeDashoffset: { duration: 2.8, repeat: Infinity, ease: "linear" } }}
                  />
                )}
              </svg>
              <motion.div
                className="absolute left-[248px] top-[126px] flex h-9 w-9 items-center justify-center rounded-full bg-roam-clay text-white shadow-roam"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.5 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <MapPin aria-hidden="true" className="h-4 w-4" />
              </motion.div>
              <motion.div
                className="absolute left-6 right-6 top-20 rounded-[8px] border border-roam-border bg-roam-inner/94 p-4 shadow-roam"
                initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.5, delay: 2.05 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-roam-sage">
                  New place nearby
                </p>
                <p className="mt-1 text-lg font-bold tracking-tight">Market Lane</p>
              </motion.div>
              <motion.div
                className="absolute bottom-8 left-6 right-6 rounded-[8px] bg-roam-ink p-5 text-roam-cream shadow-roam-dark"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.5, delay: 1.25 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-roam-dark-sage">
                  Region unlocked
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <p className="text-3xl font-bold tracking-tighter">North Grid</p>
                  <p className="rounded-full bg-roam-sage px-3 py-1 text-sm font-bold text-white">
                    +250 XP
                  </p>
                </div>
              </motion.div>
            </div>
          </DeviceMockup>
        </div>
      </div>
    </section>
  );
}
