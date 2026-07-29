"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const copyBlocks = [
  {
    label: "Unlock",
    direction: { opacity: 0, x: -26, clipPath: "inset(0 100% 0 0)" },
    text: "Roam.io rewards curiosity by turning everyday movement into visible progress.",
  },
  {
    label: "Visit",
    direction: { opacity: 0, y: 28, clipPath: "inset(100% 0 0 0)" },
    text: "As you enter supported regions, the map begins to reveal itself. New areas unlock, nearby places appear and every visit becomes part of a personal record of where you have been.",
  },
  {
    label: "Remember",
    direction: { opacity: 0, x: 26, clipPath: "inset(0 0 0 100%)" },
    text: "Explore beyond the routes you already know, record meaningful places with notes and media, earn XP through real-world discovery and use your analytics to see how your map has grown over time.",
  },
];

export function Editorial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const regionOpacity = useTransform(scrollYProgress, [0.2, 0.55, 0.85], [0.18, 0.48, 0.28]);
  const y = useTransform(scrollYProgress, [0, 1], [70, -50]);

  return (
    <section
      id="editorial-intro"
      ref={containerRef}
      data-header-theme="light"
      className="relative overflow-hidden bg-roam-cream px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(460px,1.08fr)] lg:items-stretch">
        <div className="relative z-10">
          <motion.h2
            className="relative max-w-4xl text-5xl font-bold leading-[0.88] tracking-tighter text-roam-ink md:text-7xl lg:text-[7.6rem]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Your city is <span className="text-roam-sage">bigger</span> than
            the places you already know.
          </motion.h2>

          <div className="mt-14 grid gap-7 md:grid-cols-3 lg:mt-16 lg:max-w-4xl lg:gap-8">
            {copyBlocks.map((block, index) => (
              <motion.article
                key={block.label}
                className="border-t border-roam-border-dark pt-5"
                initial={prefersReducedMotion ? false : block.direction}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0, y: 0, clipPath: "inset(0 0 0 0)" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: 0.36 + index * 0.12, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-accent mb-3 text-3xl font-normal italic leading-none text-roam-sage md:text-4xl">
                  {block.label}
                </h3>
                <p className="text-base leading-relaxed text-roam-text-muted">
                  {block.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          style={prefersReducedMotion ? undefined : { y }}
          className="relative min-h-[620px] overflow-hidden rounded-[8px] border border-roam-border bg-roam-inner shadow-roam lg:min-h-full"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,30,38,0.06)_1px,transparent_1px),linear-gradient(rgba(26,30,38,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 620">
            <motion.path
              d="M74 82 V536"
              fill="none"
              stroke="#5C734C"
              strokeWidth="2"
              strokeLinecap="round"
              initial={prefersReducedMotion ? false : { pathLength: 0 }}
              whileInView={prefersReducedMotion ? undefined : { pathLength: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
              d="M82 512 C 178 432 174 312 276 276 C 392 234 366 122 474 82"
              fill="none"
              stroke="#5C734C"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="10 14"
              initial={prefersReducedMotion ? false : { pathLength: 0 }}
              whileInView={prefersReducedMotion ? undefined : { pathLength: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            />
            <motion.path
              d="M248 120 L410 164 L446 328 L332 452 L152 412 L96 242 Z"
              fill="#5C734C"
              style={prefersReducedMotion ? { opacity: 0.34 } : { opacity: regionOpacity }}
            />
            <path d="M110 318 L224 248 L338 310 L302 434 L164 446 Z" fill="rgba(191,87,63,0.18)" />
            <circle cx="474" cy="82" r="8" fill="#BF573F" />
            <circle cx="276" cy="276" r="7" fill="#1A1E26" />
            <circle cx="82" cy="512" r="8" fill="#5C734C" />
            {!prefersReducedMotion && (
              <motion.circle
                cx="474"
                cy="82"
                r="24"
                fill="none"
                stroke="#BF573F"
                strokeWidth="2"
                animate={{ r: [18, 30, 18], opacity: [0.38, 0.12, 0.38] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </svg>
          <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-roam-text-subtle">
                Personal Map
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tighter text-roam-ink">
                68% revealed
              </p>
            </div>
            <motion.div
              className="rounded-full border border-roam-border-dark bg-roam-cream px-4 py-2 text-sm font-semibold text-roam-sage"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.35, delay: 1.65 }}
            >
              +420 XP
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
