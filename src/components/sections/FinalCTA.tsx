"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";

const repositoryUrl = "https://github.com/n8nunes/roamio-landing-page";

export function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      data-header-theme="dark"
      className="relative overflow-hidden bg-roam-sage px-6 py-28 text-white md:px-12 md:py-36"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px] opacity-28" />
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-25" viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-80 380 C160 252 300 346 474 226 C664 94 822 204 1048 94 C1160 40 1260 48 1320 26" fill="none" stroke="#F2EBDC" strokeWidth="2" strokeLinecap="round" strokeDasharray="10 16" />
        <path d="M86 118 C236 54 350 130 506 80 C706 16 852 110 1030 54" fill="none" stroke="#F2EBDC" strokeWidth="1.2" opacity="0.65" />
      </svg>
      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="max-w-4xl text-5xl font-bold leading-[0.92] tracking-tighter md:text-7xl lg:text-[7.5rem]">
            See what's{" "}
            <span className="font-accent font-normal italic text-roam-cream">
              waiting
            </span>{" "}
            around you.
          </h2>
        </motion.div>

        <motion.div
          className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Link
            href="/app-overview"
            className="inline-flex h-14 w-full items-center justify-center rounded-[14px] bg-roam-ink px-6 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-roam-dark-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-roam-sage sm:w-auto"
          >
            Learn More
          </Link>
          <a
            href={repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-[14px] border border-white/20 bg-white/10 px-6 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/16 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-roam-sage sm:w-auto"
          >
            <GitBranch aria-hidden="true" className="h-4 w-4" />
            View Repository
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <Link
            href="/app-overview"
            className="inline-flex h-14 w-full items-center justify-center rounded-[14px] bg-roam-cream px-6 font-semibold text-roam-ink transition hover:-translate-y-0.5 hover:bg-roam-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-roam-sage sm:w-auto"
          >
            Visit App Overview
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
