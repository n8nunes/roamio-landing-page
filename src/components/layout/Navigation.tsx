"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Apple, ExternalLink, GitBranch, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const repositoryUrl = "https://github.com/n8nunes/roamio-landing-page";

const navItems = [
  { label: "HOME", href: "/", preview: "home" },
  { label: "APP OVERVIEW", href: "/app-overview", preview: "app" },
  { label: "ABOUT THE TEAM", href: "/about-the-team", preview: "team" },
] as const;

type PreviewKey = (typeof navItems)[number]["preview"];

const routePaths: Record<PreviewKey, string> = {
  home: "M4 24 C78 12 108 34 164 22 C226 8 284 36 396 18",
  app: "M4 20 C82 30 124 10 186 21 C244 32 310 13 396 25",
  team: "M4 26 C88 18 126 32 190 20 C266 4 314 30 396 16",
};

function previewFromPathname(pathname: string): PreviewKey {
  return navItems.find((item) => item.href === pathname)?.preview ?? "home";
}

function resolveHeaderThemeFromPoint(headerHeight: number): "light" | "dark" {
  const sampleX = Math.round(window.innerWidth / 2);
  // Sample just beneath the fixed header so we read the section background, not the chrome itself.
  const sampleY = Math.min(window.innerHeight - 1, Math.max(0, Math.round(headerHeight + 1)));
  const node = document.elementFromPoint(sampleX, sampleY);
  if (!node) return "light";

  const themed = node.closest<HTMLElement>("[data-header-theme]");
  if (themed?.dataset.headerTheme === "dark") return "dark";
  if (themed?.dataset.headerTheme === "light") return "light";
  return "light";
}

function ContourBackground({ mobile = false, reduced = false }: { mobile?: boolean; reduced?: boolean }) {
  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full opacity-80", mobile && "opacity-95")}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="1440" height="900" fill="#20271b" />
      <g fill="none" stroke="rgba(92,115,76,0.28)" strokeWidth="1.3">
        <path d="M-76 222 C124 84 272 224 456 126 C612 42 790 88 936 170 C1104 264 1232 110 1512 172" />
        <path d="M-80 594 C98 480 276 574 416 464 C594 326 724 448 870 360 C1066 242 1206 464 1516 308" />
        <path d="M168 -70 C218 110 160 260 246 410 C352 592 256 738 344 984" />
        <path d="M618 -78 C548 124 650 266 570 438 C486 620 606 736 512 984" />
        <path d="M1046 -60 C1006 136 1130 286 1026 478 C938 640 1028 782 922 980" />
        <path d="M244 242 L410 166 L550 250 L506 428 L312 462 L178 350 Z" />
        <path d="M744 178 L946 214 L1044 374 L914 522 L700 484 L638 306 Z" />
        <path d="M918 572 L1138 526 L1282 674 L1176 824 L952 802 L850 682 Z" />
        <circle cx="492" cy="610" r="120" />
        <circle cx="492" cy="610" r="188" opacity="0.55" />
        <circle cx="1080" cy="240" r="76" opacity="0.8" />
      </g>
      <motion.path
        d="M120 742 C278 642 380 700 514 562 C660 412 806 504 1018 344 C1156 240 1264 254 1378 170"
        fill="none"
        stroke="rgba(158,181,141,0.34)"
        strokeWidth="2"
        strokeDasharray="8 14"
        animate={reduced ? undefined : { strokeDashoffset: [0, -44] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function StoreSoon({ type }: { type: "apple" | "google" }) {
  const Icon = type === "apple" ? Apple : Play;
  const label = type === "apple" ? "Apple App Store coming soon" : "Google Play coming soon";
  const text = type === "apple" ? "APP STORE" : "GOOGLE PLAY";

  return (
    <span
      className="inline-flex cursor-not-allowed items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-roam-cream/42"
      aria-label={label}
      title={label}
      role="img"
    >
      <Icon aria-hidden="true" className="h-3.5 w-3.5" />
      {text}
      <span className="text-roam-dark-sage/70">COMING SOON</span>
    </span>
  );
}

function ProjectLinks({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <p className="text-xs font-black uppercase tracking-[0.26em] text-roam-dark-sage">Project Links</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="View Roam.io repository"
          className="group inline-flex cursor-pointer items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-roam-cream transition hover:text-roam-dark-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-dark-sage focus-visible:ring-offset-4 focus-visible:ring-offset-roam-ink"
        >
          <GitBranch aria-hidden="true" className="h-3.5 w-3.5" />
          Repository
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <StoreSoon type="apple" />
        <StoreSoon type="google" />
      </div>
    </div>
  );
}

function RouteLine({ preview, visible, reduced }: { preview: PreviewKey; visible: boolean; reduced: boolean }) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute left-0 top-1/2 h-[0.28em] w-full -translate-y-1/2 overflow-visible transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0"
      )}
      viewBox="0 0 400 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d={routePaths[preview]}
        fill="none"
        stroke="#9EB58D"
        strokeWidth="5"
        strokeLinecap="round"
        initial={false}
        animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
      {visible && !reduced && (
        <motion.circle
          r="5"
          fill="#F2EBDC"
          stroke="#9EB58D"
          strokeWidth="3"
          initial={{ offsetDistance: "8%" }}
          animate={{ offsetDistance: "92%" }}
          transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          style={{ offsetPath: `path("${routePaths[preview]}")` }}
        />
      )}
    </svg>
  );
}

function MapPanel({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-roam-inner">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="520" height="620" fill="#F2EBDC" />
        <g stroke="rgba(26,30,38,0.06)" strokeWidth="1">
          {Array.from({ length: 13 }, (_, i) => (
            <path key={`h-${i}`} d={`M0 ${48 + i * 48} H520`} />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <path key={`v-${i}`} d={`M${48 + i * 48} 0 V620`} />
          ))}
        </g>
        <g stroke="#B8C7D4" strokeWidth="7" strokeLinecap="round" opacity="0.55">
          <path d="M-40 180 C96 144 180 196 296 164 C386 138 438 104 562 120" />
          <path d="M-60 422 C96 360 190 434 318 360 C422 300 468 336 574 278" />
          <path d="M120 -36 C152 96 118 210 174 316 C234 430 190 520 246 662" />
          <path d="M378 -40 C330 110 410 224 340 368 C286 476 356 566 304 660" />
        </g>
        <path d="M248 120 L410 164 L446 328 L332 452 L152 412 L96 242 Z" fill="#5C734C" opacity="0.34" />
        <path d="M110 318 L224 248 L338 310 L302 434 L164 446 Z" fill="rgba(191,87,63,0.18)" />
        <path d="M74 82 V536" fill="none" stroke="#5C734C" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        <path
          d="M82 512 C 178 432 174 312 276 276 C 392 234 366 122 474 82"
          fill="none"
          stroke="#5C734C"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="10 14"
        />
        <circle cx="82" cy="512" r="8" fill="#5C734C" />
        <circle cx="276" cy="276" r="7" fill="#1A1E26" />
        <circle cx="474" cy="82" r="10" fill="#BF573F" />
        <circle cx="474" cy="82" r="22" fill="none" stroke="#BF573F" strokeWidth="2" opacity="0.35" />
        <text x="88" y="560" fill="#1A1E26" opacity="0.55" fontSize="26" fontWeight="800">
          CLAYTON
        </text>
        <text x="88" y="588" fill="#1A1E26" opacity="0.4" fontSize="14" fontFamily="monospace" letterSpacing="2">
          68% REVEALED
        </text>
      </svg>
      <div className={cn("absolute inset-0 bg-roam-sage/20 transition-opacity duration-500", active ? "opacity-0" : "opacity-45 grayscale")} />
    </div>
  );
}

function PhonePanel({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-roam-ink p-3">
      <div className="mx-auto h-full max-w-[210px] rounded-[30px] border-[6px] border-roam-dark-bg bg-roam-cream p-3">
        <div className="flex h-full flex-col overflow-hidden rounded-[22px] bg-roam-inner">
          <div className="relative h-[48%] overflow-hidden">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="200" height="180" fill="#EDE4D4" />
              <g fill="none" stroke="#5C734C" strokeWidth="1.2" opacity="0.28">
                <path d="M20 40 L70 18 L110 48 L96 110 L28 118 L8 72 Z" />
                <path d="M96 88 L150 72 L178 118 L138 158 L84 148 L66 112 Z" />
              </g>
              <path
                d="M28 150 C58 118 72 96 108 78 C138 62 148 42 178 22"
                fill="none"
                stroke="#5C734C"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="6 8"
              />
              <circle cx="108" cy="78" r="5" fill="#5C734C" />
              <circle cx="178" cy="22" r="7" fill="#BF573F" />
            </svg>
          </div>
          <div className="flex flex-1 flex-col justify-end p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-roam-sage">Region unlocked</p>
            <p className="mt-1.5 text-2xl font-black tracking-tighter text-roam-ink">North Grid</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-roam-ink/10">
              <div className="h-full w-[74%] rounded-full bg-roam-sage" />
            </div>
            <p className="mt-3 text-sm font-black text-roam-sage">+250 XP</p>
          </div>
        </div>
      </div>
      <div className={cn("absolute inset-0 bg-roam-ink/30 transition-opacity duration-500", active ? "opacity-0" : "opacity-55 grayscale")} />
    </div>
  );
}

function VisitPanel({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-roam-inner p-5 text-roam-ink">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-roam-sage">Visit</p>
      <h3 className="mt-2 text-3xl font-black tracking-tighter">Market Lane</h3>
      <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-roam-text-muted">
        Corner bakery, late light, and a route you would not have taken twice.
      </p>
      <div className="mt-5 flex gap-2">
        <div className="h-16 flex-1 bg-roam-sand" />
        <div className="h-16 flex-1 bg-roam-sage/45" />
        <div className="h-16 flex-1 bg-roam-clay/40" />
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-roam-text-subtle">Saved · +120 XP</p>
      <div className={cn("absolute inset-0 bg-roam-ink/35 transition-opacity duration-500", active ? "opacity-0" : "opacity-55 grayscale")} />
    </div>
  );
}

function AnalyticsPanel({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-roam-dark-bg p-5 text-roam-cream">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-roam-dark-sage">This week</p>
      <div className="mt-6 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-roam-cream/45">XP earned</p>
          <p className="mt-1 text-4xl font-black tracking-tighter">12.4k</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.16em] text-roam-cream/45">Visits</p>
          <p className="mt-1 text-3xl font-black tracking-tighter">142</p>
        </div>
      </div>
      <svg className="mt-8 h-24 w-full" viewBox="0 0 260 100" aria-hidden="true">
        <path
          d="M8 82 C42 70 58 88 88 52 C118 18 142 64 176 36 C204 14 228 28 252 12"
          fill="none"
          stroke="#9EB58D"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="252" cy="12" r="6" fill="#BF573F" />
      </svg>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-roam-cream/40">Route momentum · rising</p>
      <div className={cn("absolute inset-0 bg-roam-ink/30 transition-opacity duration-500", active ? "opacity-0" : "opacity-55 grayscale")} />
    </div>
  );
}

function TeamPanel({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-roam-ink">
      <Image
        src="/photos/first_roam.jpg"
        alt=""
        fill
        sizes="(min-width: 1024px) 28vw, 0px"
        className="object-cover object-[center_35%]"
      />
      <div className={cn("absolute inset-0 bg-roam-ink/35 transition-opacity duration-500", active ? "opacity-0" : "opacity-55 grayscale")} />
    </div>
  );
}

function ProductCollage({ activePreview, reduced }: { activePreview: PreviewKey; reduced: boolean }) {
  const itemClass = (key: PreviewKey, inactiveLayer: string) =>
    cn(
      "absolute overflow-hidden rounded-[10px] border border-roam-cream/10 shadow-roam-dark transition-[filter,opacity,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
      key === activePreview
        ? "z-40 scale-[1.035] opacity-100 grayscale-0"
        : cn(inactiveLayer, "scale-100 opacity-30 grayscale")
    );

  return (
    <div className="relative hidden min-h-[calc(100svh-var(--header-height))] overflow-hidden lg:block">
      {/*
       * Keep the original scattered collage direction, but treat the cards as
       * one connected stack. Every panel overlaps at least one neighbouring
       * panel so there are no isolated gaps between the visuals.
       */}
      <div className="absolute inset-x-[3%] inset-y-[3%]">
        {/* Home map — large foundation card */}
        <motion.div
          className={cn(
            itemClass("home", "z-10"),
            "left-0 top-[2%] h-[47%] w-[50%]"
          )}
          animate={
            reduced
              ? undefined
              : {
                  x: activePreview === "home" ? -5 : 0,
                  y: activePreview === "home" ? -8 : 0,
                }
          }
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <MapPanel active={activePreview === "home"} />
        </motion.div>

        {/* App phone — overlaps the right edge of the map */}
        <motion.div
          className={cn(
            itemClass("app", "z-20"),
            "left-[43%] top-0 h-[47%] w-[24%]"
          )}
          animate={
            reduced
              ? undefined
              : {
                  x: activePreview === "app" ? 7 : 0,
                  y: activePreview === "app" ? -5 : 0,
                }
          }
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <PhonePanel active={activePreview === "app"} />
        </motion.div>

        {/* Team image — overlaps the lower edge of the map */}
        <motion.div
          className={cn(
            itemClass("team", "z-20"),
            "bottom-0 left-[1%] h-[53%] w-[39%]"
          )}
          animate={
            reduced
              ? undefined
              : {
                  x: activePreview === "team" ? -5 : 0,
                  y: activePreview === "team" ? 6 : 0,
                }
          }
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <TeamPanel active={activePreview === "team"} />
        </motion.div>

        {/* Visit card — bridges the team image, map and phone */}
        <motion.div
          className={cn(
            itemClass("app", "z-30"),
            "left-[33%] top-[46%] h-[32%] w-[37%]"
          )}
          animate={
            reduced
              ? undefined
              : {
                  x: activePreview === "app" ? 8 : 0,
                  y: activePreview === "app" ? -5 : 0,
                }
          }
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <VisitPanel active={activePreview === "app"} />
        </motion.div>

        {/* Analytics — overlaps the visit card and closes the cluster */}
        <motion.div
          className={cn(
            itemClass("app", "z-20"),
            "bottom-[3%] left-[61%] h-[35%] w-[36%]"
          )}
          animate={
            reduced
              ? undefined
              : {
                  x: activePreview === "app" ? 6 : 0,
                  y: activePreview === "app" ? -8 : 0,
                }
          }
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnalyticsPanel active={activePreview === "app"} />
        </motion.div>
      </div>
    </div>
  );
}

function MenuLink({
  item,
  isCurrent,
  isActive,
  reduced,
  onActivate,
  onNavigate,
}: {
  item: (typeof navItems)[number];
  isCurrent: boolean;
  isActive: boolean;
  reduced: boolean;
  onActivate: () => void;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={item.href}
      aria-current={isCurrent ? "page" : undefined}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onNavigate}
      className={cn(
        "group relative block w-fit cursor-pointer overflow-visible text-[clamp(3.2rem,14vw,5.5rem)] font-black uppercase leading-[0.9] tracking-[-0.055em] text-roam-cream transition-opacity duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-dark-sage focus-visible:ring-offset-4 focus-visible:ring-offset-roam-ink md:text-[clamp(3.5rem,6vw,7.5rem)] lg:leading-[0.88]",
        isActive ? "opacity-100" : "opacity-38 hover:opacity-75"
      )}
    >
      <span className="relative z-10 block transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-focus:-translate-y-1">
        {item.label === "APP OVERVIEW" ? (
          <>
            <span className="md:hidden">APP</span>
            <span className="hidden md:inline">APP OVERVIEW</span>
            <br className="md:hidden" />
            <span className="md:hidden">OVERVIEW</span>
          </>
        ) : item.label === "ABOUT THE TEAM" ? (
          <>
            <span className="md:hidden">ABOUT</span>
            <span className="hidden md:inline">ABOUT THE TEAM</span>
            <br className="md:hidden" />
            <span className="md:hidden">THE TEAM</span>
          </>
        ) : (
          item.label
        )}
      </span>
      <RouteLine preview={item.preview} visible={isActive} reduced={reduced} />
    </Link>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePreview, setActivePreview] = useState<PreviewKey>(() => previewFromPathname(pathname));
  const [headerTheme, setHeaderTheme] = useState<"light" | "dark">("light");
  const [menuContentReady, setMenuContentReady] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const themeFrameRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const closeMenuRef = useRef<() => void>(() => {});
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);
  const currentPreview = previewFromPathname(pathname);
  const useCreamHeader = isExpanded || headerTheme === "dark";
  const hideCenterLogoMark = pathname === "/app-overview";

  const applyMenuOrigin = (target: HTMLElement | null = menuRef.current) => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const originX = `${rect.left + rect.width / 2}px`;
    const originY = `${rect.top + rect.height / 2}px`;
    document.documentElement.style.setProperty("--menu-origin-x", originX);
    document.documentElement.style.setProperty("--menu-origin-y", originY);
    if (target) {
      target.style.setProperty("--menu-origin-x", originX);
      target.style.setProperty("--menu-origin-y", originY);
    }
  };

  const openMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    applyMenuOrigin();
    setActivePreview(currentPreview);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setMenuContentReady(false);
    applyMenuOrigin(menuRef.current);
    setIsExpanded(false);
    if (reduced) {
      setIsOpen(false);
      return;
    }
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
      closeTimerRef.current = null;
    }, 720);
  };

  useEffect(() => {
    closeMenuRef.current = closeMenu;
  });

  useEffect(() => {
    applyMenuOrigin();
    const handleResize = () => applyMenuOrigin(menuRef.current);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isExpanded) return;

    const readTheme = () => {
      themeFrameRef.current = null;
      const headerHeight =
        headerRef.current?.offsetHeight ||
        Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) ||
        80;
      setHeaderTheme(resolveHeaderThemeFromPoint(headerHeight));
    };

    const queueTheme = () => {
      if (themeFrameRef.current !== null) return;
      themeFrameRef.current = window.requestAnimationFrame(readTheme);
    };

    readTheme();
    window.addEventListener("scroll", queueTheme, { passive: true });
    window.addEventListener("resize", queueTheme, { passive: true });

    return () => {
      if (themeFrameRef.current !== null) window.cancelAnimationFrame(themeFrameRef.current);
      window.removeEventListener("scroll", queueTheme);
      window.removeEventListener("resize", queueTheme);
    };
  }, [isExpanded, pathname]);

  useEffect(() => {
    if (!isOpen) return;

    applyMenuOrigin(menuRef.current);
    const expandFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setIsExpanded(true));
    });
    const contentDelay = reduced ? 0 : 180;
    const contentTimer = window.setTimeout(() => setMenuContentReady(true), contentDelay);

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const previousCompensation = document.documentElement.style.getPropertyValue("--scrollbar-compensation");
    const root = document.querySelector<HTMLElement>("main");
    const previousAriaHidden = root?.getAttribute("aria-hidden");
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.setProperty("--scrollbar-compensation", `${scrollbarWidth}px`);
    }
    root?.setAttribute("aria-hidden", "true");

    const selector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => [
      ...Array.from(headerRef.current?.querySelectorAll<HTMLElement>(selector) ?? []),
      ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>(selector) ?? []),
    ].filter((node) => !node.hasAttribute("disabled") && node.offsetParent !== null);

    trigger?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenuRef.current();
        return;
      }

      const focusable = getFocusable();
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleResize = () => applyMenuOrigin(menuRef.current);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.cancelAnimationFrame(expandFrame);
      window.clearTimeout(contentTimer);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      if (previousCompensation) {
        document.documentElement.style.setProperty("--scrollbar-compensation", previousCompensation);
      } else {
        document.documentElement.style.removeProperty("--scrollbar-compensation");
      }
      if (previousAriaHidden === null) root?.removeAttribute("aria-hidden");
      else if (previousAriaHidden !== undefined) root?.setAttribute("aria-hidden", previousAriaHidden);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      trigger?.focus();
    };
  }, [isOpen, reduced]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed left-0 top-0 z-[100] h-[var(--header-height)] [right:var(--scrollbar-compensation)] text-roam-ink transition-colors duration-300",
        useCreamHeader && "text-roam-cream header-theme-cream"
      )}
    >
      <nav aria-label="Primary navigation" className="relative z-[120] grid h-full grid-cols-[minmax(0,1fr)_auto] items-center px-[var(--header-padding-mobile)] md:grid-cols-[1fr_auto_1fr] md:px-[var(--header-padding-desktop)]">
        <Link
          href="/"
          aria-label="Roam.io home"
          onClick={() => closeMenu()}
          className={cn(
            "flex min-w-0 max-w-[calc(100vw-96px)] cursor-pointer items-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-sage focus-visible:ring-offset-4 md:w-fit md:max-w-none",
            useCreamHeader ? "focus-visible:ring-offset-roam-ink" : "focus-visible:ring-offset-roam-cream"
          )}
        >
          <Image
            src="/logos/roam_io_logo_with_text.png"
            alt="Roam.io"
            width={320}
            height={96}
            priority
            className="header-logo-wordmark"
          />
        </Link>

        <Link
          href="/"
          aria-label="Roam.io home"
          onClick={() => closeMenu()}
          className={cn(
            "hidden cursor-pointer rounded-full p-2 transition hover:rotate-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-sage focus-visible:ring-offset-4 md:block motion-reduce:hover:rotate-0",
            hideCenterLogoMark && "md:invisible md:pointer-events-none",
            useCreamHeader ? "focus-visible:ring-offset-roam-ink" : "focus-visible:ring-offset-roam-cream"
          )}
          aria-hidden={hideCenterLogoMark}
          tabIndex={hideCenterLogoMark ? -1 : undefined}
        >
          <Image
            src="/logos/roam_io_logo.png"
            alt=""
            width={96}
            height={96}
            className="header-logo-mark"
          />
        </Link>

        <div className="justify-self-end">
          <div className="flex items-center gap-3 md:gap-3.5">
            <Link
              href="/app-overview"
              aria-label="Learn more about Roam.io"
              className={cn(
                "hidden h-14 items-center gap-3 rounded-[14px] px-6 text-sm font-extrabold uppercase tracking-wide transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-sage focus-visible:ring-offset-4 sm:inline-flex lg:h-16 lg:px-7 lg:text-base",
                useCreamHeader
                  ? "bg-roam-cream text-roam-ink focus-visible:ring-offset-roam-ink"
                  : "bg-roam-sage text-white focus-visible:ring-offset-roam-cream"
              )}
            >
              Learn More
            </Link>

            <button
              ref={triggerRef}
              type="button"
              aria-label={isExpanded ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isExpanded}
              aria-controls="site-navigation-menu"
              onClick={() => {
                if (isExpanded || isOpen) closeMenu();
                else openMenu();
              }}
              className={cn(
                "relative flex h-[var(--header-menu-size-mobile)] w-[var(--header-menu-size-mobile)] cursor-pointer items-center justify-center rounded-[14px] border-[3px] bg-transparent transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-sage focus-visible:ring-offset-4 md:h-[var(--header-menu-size-desktop)] md:w-[var(--header-menu-size-desktop)] md:rounded-[16px]",
                useCreamHeader
                  ? "border-roam-cream text-roam-cream hover:bg-roam-cream/10 focus-visible:ring-offset-roam-ink"
                  : "border-roam-ink text-roam-ink hover:bg-roam-inner/60 focus-visible:ring-offset-roam-cream"
              )}
            >
              <span className="relative h-5 w-7">
                <span className={cn("absolute left-0 top-1 h-[3px] w-7 rounded-full bg-current transition-transform duration-200", isExpanded && "translate-y-[7px] rotate-45")} />
                <span className={cn("absolute left-0 bottom-1 h-[3px] w-7 rounded-full bg-current transition-transform duration-200", isExpanded && "-translate-y-[7px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          id="site-navigation-menu"
          ref={(node) => {
            menuRef.current = node;
            if (node) applyMenuOrigin(node);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          data-open={isExpanded ? "true" : "false"}
          className="navigation-overlay fixed inset-0 z-[90] overflow-y-auto bg-[#20271b] pt-[var(--header-height)] text-roam-cream"
        >
          <ContourBackground mobile reduced={reduced} />

          <div
            className={cn(
              "relative z-10 grid min-h-[calc(100svh-var(--header-height))] transition-opacity duration-300 lg:grid-cols-[minmax(0,1fr)_minmax(520px,1fr)]",
              menuContentReady ? "opacity-100" : "opacity-0"
            )}
          >
            <ProductCollage activePreview={activePreview} reduced={reduced} />

            <div className="flex min-h-[calc(100svh-var(--header-height))] flex-col px-5 pb-5 sm:px-7 md:px-10 lg:px-12 lg:pb-8">
              <div className="flex flex-1 items-center justify-center py-12 lg:justify-start lg:py-6">
                <div className="flex w-full flex-col items-center gap-6 lg:items-start lg:gap-2">
                  {navItems.map((item, index) => {
                    const isCurrent = pathname === item.href;
                    const isActive = activePreview === item.preview;

                    return (
                      <motion.div
                        key={item.href}
                        initial={reduced || !menuContentReady ? false : { opacity: 0, y: 42 }}
                        animate={menuContentReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                        transition={{ delay: 0.08 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full lg:w-auto"
                      >
                        <MenuLink
                          item={item}
                          isCurrent={isCurrent}
                          isActive={isActive}
                          reduced={reduced}
                          onActivate={() => setActivePreview(item.preview)}
                          onNavigate={() => closeMenu()}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <motion.div
                initial={reduced || !menuContentReady ? false : { opacity: 0, y: 18 }}
                animate={menuContentReady ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ delay: 0.36, duration: 0.36 }}
                className="pb-3 lg:self-end lg:pb-0"
              >
                <ProjectLinks className="lg:text-right" />
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
