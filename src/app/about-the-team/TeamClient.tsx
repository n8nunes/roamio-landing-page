"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teamGroups = [
  {
    role: "Product Managers",
    description:
      "Product Managers shape the Roam.io vision, translate user needs into a focused roadmap, and keep discovery, prioritisation, and delivery aligned around the experience we want explorers to have together.",
    members: [
      { id: "pm-1", name: "Nathan Nunes" },
      { id: "pm-2", name: "Jacob De La Paz" },
      { id: "pm-3", name: "Kevin Pham" },
    ],
  },
  {
    role: "Release Train Engineers",
    description:
      "Release Train Engineers coordinate delivery across Roam.io, keep work moving between disciplines, remove blockers, and maintain shared visibility so planning, development, and releases stay aligned with delivery goals together.",
    members: [
      { id: "rte-1", name: "Sanjevan Rajasegar" },
      { id: "rte-2", name: "Amarprit Singh" },
      { id: "rte-3", name: "Samuel Sutherland" },
    ],
  },
  {
    role: "Software Architects",
    description:
      "Software Architects define Roam.io’s technical foundation, connect product direction to implementation choices, and guide development so the platform stays reliable, scalable, maintainable, and aligned with shared delivery goals together.",
    members: [
      { id: "sa-1", name: "Alvin Liong" },
      { id: "sa-2", name: "Rushil Patel" },
    ],
  },
];

export function TeamClient() {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const activeGroup = teamGroups[activeGroupIndex];

  const showPreviousGroup = () => {
    setActiveGroupIndex((current) =>
      current === 0 ? teamGroups.length - 1 : current - 1,
    );
  };

  const showNextGroup = () => {
    setActiveGroupIndex((current) =>
      current === teamGroups.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-roam-cream">
      {/* Background topographical pattern */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.15]">
        <svg
          className="h-full w-full text-roam-sage"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <pattern
            id="topo-team-hero"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M100,50 Q150,0 200,50 T300,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeOpacity="0.6"
            />

            <path
              d="M0,150 Q50,100 100,150 T200,150"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeOpacity="0.6"
            />

            <path
              d="M-50,100 Q0,50 50,100 T150,100 T250,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
          </pattern>

          <rect
            width="100%"
            height="100%"
            fill="url(#topo-team-hero)"
          />
        </svg>
      </div>

      {/* Page content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-[clamp(1.5rem,4vh,3rem)] pt-[calc(var(--header-height)+clamp(1rem,3vh,2rem))] md:px-12">
        {/* Hero */}
        <motion.header
          className="mx-auto w-full max-w-4xl shrink-0 text-center"
          initial={false}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h1 className="text-[clamp(2.75rem,7vh,6.5rem)] font-bold leading-[0.9] tracking-tighter text-roam-ink">
            The builders of{" "}
            <span className="font-accent font-normal italic tracking-normal text-roam-sage">
              Roam.io
            </span>
          </h1>

          <p className="mx-auto mt-[clamp(0.85rem,2vh,1.65rem)] max-w-4xl text-[clamp(1rem,2vh,1.4rem)] leading-relaxed text-roam-text-muted">
            We are a multidisciplinary team of explorers, designers and
            engineers dedicated to transforming how you experience the places
            around you.
          </p>
        </motion.header>

        {/* Leadership carousel */}
        <section className="mt-[clamp(3.25rem,7vh,5rem)] flex w-full max-w-7xl flex-col items-center">
          {/* Role navigation */}
          <div className="grid w-full grid-cols-[4.25rem_minmax(0,1fr)_4.25rem] items-center gap-4 md:grid-cols-[6rem_minmax(0,1fr)_6rem] md:gap-8">
            {/* Previous */}
            <button
              type="button"
              onClick={showPreviousGroup}
              className="flex h-16 w-16 items-center justify-center justify-self-start rounded-full border-2 border-roam-ink bg-roam-cream text-roam-ink shadow-roam transition-all duration-300 hover:scale-105 hover:border-roam-sage hover:bg-roam-sage hover:text-roam-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-sage focus-visible:ring-offset-4 focus-visible:ring-offset-roam-cream md:h-24 md:w-24"
              aria-label="Show previous leadership group"
            >
              <ChevronLeft
                className="h-9 w-9 stroke-[2.5] md:h-12 md:w-12"
                aria-hidden="true"
              />
            </button>

            {/* Current group */}
            <AnimatePresence mode="wait">
              <motion.article
                key={activeGroup.role}
                className="mx-auto w-full max-w-4xl text-center"
                initial={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 14,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: -14,
                      }
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h2 className="text-[clamp(2.1rem,4.8vh,4.5rem)] font-bold leading-none tracking-tight text-roam-ink">
                  {activeGroup.role}
                </h2>

                {/* Fixed three-line description area */}
                <div className="mx-auto mt-[clamp(0.65rem,1.7vh,1.35rem)] h-[4.5em] max-w-4xl">
                  <p className="text-[clamp(0.95rem,1.9vh,1.3rem)] leading-[1.5] text-roam-text-muted">
                    {activeGroup.description}
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>

            {/* Next */}
            <button
              type="button"
              onClick={showNextGroup}
              className="flex h-16 w-16 items-center justify-center justify-self-end rounded-full border-2 border-roam-sage bg-roam-sage text-roam-cream shadow-roam transition-all duration-300 hover:scale-105 hover:border-roam-ink hover:bg-roam-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-sage focus-visible:ring-offset-4 focus-visible:ring-offset-roam-cream md:h-24 md:w-24"
              aria-label="Show next leadership group"
            >
              <ChevronRight
                className="h-9 w-9 stroke-[2.5] md:h-12 md:w-12"
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Members */}
          <div className="mt-[clamp(1.25rem,2.5vh,2rem)] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup.role}
                className="flex w-full flex-wrap items-stretch justify-center gap-[clamp(1.25rem,2.2vw,1.8rem)]"
                initial={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 25,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: 0,
                        x: -25,
                      }
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {activeGroup.members.map((member, index) => (
                  <motion.figure
                    key={member.id}
                    className="
                      flex
                      h-[clamp(19rem,40vh,27rem)]
                      w-[clamp(14rem,22vw,20rem)]
                      shrink-0
                      flex-col
                      overflow-hidden
                      border
                      border-roam-border
                      bg-roam-cream
                      shadow-roam
                    "
                    initial={
                      prefersReducedMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 16,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.4,
                      delay: prefersReducedMotion ? 0 : index * 0.07,
                    }}
                  >
                    {/* Portrait */}
                    <div className="relative min-h-0 flex-1 overflow-hidden bg-roam-sand/20">
                      <svg
                        className="h-full w-full text-roam-sage/10"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        preserveAspectRatio="xMidYMid slice"
                        viewBox="0 0 400 500"
                      >
                        <rect
                          width="400"
                          height="500"
                          fill="currentColor"
                          opacity="0.18"
                        />

                        <pattern
                          id={`portrait-${member.id}`}
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <circle
                            cx="2"
                            cy="2"
                            r="1.5"
                            fill="currentColor"
                          />
                        </pattern>

                        <rect
                          width="400"
                          height="500"
                          fill={`url(#portrait-${member.id})`}
                        />
                      </svg>
                    </div>

                    {/* Name */}
                    <figcaption className="flex min-h-[4.5rem] shrink-0 items-center justify-center border-t border-roam-border bg-roam-cream px-5 py-2 text-center md:min-h-[5rem]">
                      <h3 className="text-[clamp(1rem,1.8vw,1.35rem)] font-bold leading-tight text-roam-ink">
                        {member.name}
                      </h3>
                    </figcaption>
                  </motion.figure>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}
