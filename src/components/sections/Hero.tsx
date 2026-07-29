"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, GitBranch } from "lucide-react";

const repositoryUrl = "https://github.com/n8nunes/roamio-landing-page";
const UNVEIL_STORAGE_KEY = "roamio-hero-unveil";
const UNVEIL_DURATION_MS = 1700;
const DISSOLVE_MS = 520;

function MapBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 2048 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="2048" height="900" fill="#F7F4EF" />

      <g opacity="0.72" fill="none" strokeLinecap="round">
        <g stroke="#C9D7E2" strokeWidth="4">
          <path d="M-90 128 C150 156 356 174 574 142 C820 106 1012 152 1260 126 C1494 100 1688 152 2140 118" />
          <path d="M-120 502 C214 468 394 544 638 476 C856 416 1068 502 1290 444 C1536 380 1718 424 2148 384" />
          <path d="M-80 766 C208 716 418 792 698 708 C960 630 1174 738 1456 650 C1664 584 1832 620 2112 574" />
          <path d="M116 -70 C186 72 146 258 222 412 C296 562 238 710 312 980" />
          <path d="M594 -72 C532 96 632 244 548 426 C472 590 570 722 496 982" />
          <path d="M1032 -82 C942 76 1072 274 976 452 C890 610 990 742 902 980" />
          <path d="M1386 -66 C1324 128 1434 278 1340 466 C1246 652 1344 736 1260 982" />
          <path d="M1848 -90 C1768 96 1874 278 1784 462 C1708 620 1810 734 1710 980" />
          <path d="M48 324 L418 386 L756 300 L1098 358 L1438 292 L1842 340 L2132 282" />
          <path d="M-64 618 L306 578 L646 626 L1014 562 L1334 614 L1706 532 L2120 586" />
        </g>

        <g stroke="#7E9BB6" strokeWidth="12" opacity="0.78">
          <path d="M-120 638 C220 588 438 654 694 576 C936 502 1142 608 1434 506 C1644 432 1832 472 2170 392" />
          <path d="M216 -96 C282 104 238 250 310 412 C400 614 330 758 420 990" />
          <path d="M1242 -96 C1170 98 1264 254 1202 438 C1136 636 1228 752 1136 990" />
        </g>

        <g stroke="#D6E1EA" strokeWidth="3" opacity="0.8">
          <path d="M166 172 L482 220 M240 248 L514 288 M374 126 L330 444 M474 112 L428 486" />
          <path d="M760 172 L1078 214 M812 250 L1120 286 M894 106 L850 480 M1030 136 L968 522" />
          <path d="M1428 160 L1768 232 M1466 272 L1836 316 M1588 104 L1536 502 M1734 138 L1668 524" />
          <path d="M126 698 L482 720 M728 690 L1088 728 M1320 686 L1766 700" />
        </g>

        <g className="hero-map-contours" stroke="#5C734C" strokeWidth="2" opacity="0.4">
          <path d="M-80 82 C148 18 254 92 438 38 C640 -20 806 52 968 8 C1170 -46 1328 42 1530 -8 C1710 -52 1852 -12 2140 -48" />
          <path d="M-70 164 C160 86 310 164 510 104 C708 44 894 110 1082 58 C1298 -2 1416 92 1640 36 C1846 -18 1936 26 2120 2" />
          <path d="M-64 244 C128 200 302 250 482 206 C704 152 844 232 1050 180 C1236 132 1398 200 1612 150 C1814 104 1924 142 2132 118" />
          <path d="M-54 336 C166 278 326 348 520 288 C726 224 868 318 1068 260 C1268 202 1406 288 1622 230 C1834 174 1940 222 2128 188" />
          <path d="M-54 438 C156 386 306 438 522 382 C742 324 872 404 1066 352 C1290 292 1428 374 1636 320 C1820 272 1956 314 2128 282" />
          <path d="M-48 548 C164 504 350 546 548 502 C760 454 936 510 1138 468 C1334 426 1498 482 1710 426 C1888 378 1992 418 2124 394" />
          <path d="M-42 650 C172 604 340 656 558 602 C780 546 930 622 1154 568 C1358 516 1510 586 1724 528 C1896 480 1990 522 2128 488" />
          <path d="M-42 832 C178 764 330 834 544 782 C772 728 928 806 1150 742 C1354 684 1506 778 1728 710 C1892 660 1996 700 2124 666" />
          <path d="M168 -70 C218 110 160 260 246 410 C352 592 256 738 344 984" />
          <path d="M618 -78 C548 124 650 266 570 438 C486 620 606 736 512 984" />
          <path d="M1046 -60 C1006 136 1130 286 1026 478 C938 640 1028 782 922 980" />
          <path d="M1520 -50 C1470 140 1580 300 1490 470 C1410 620 1510 760 1420 980" />
        </g>
      </g>

      {/* Topographic density under fog — single optimised layer */}
      <g
        className="hero-topo-layer"
        fill="none"
        stroke="rgba(92, 115, 76, 0.48)"
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="nonScalingStroke"
      >
        <path d="M-40 110 C120 48 280 130 460 70 C640 12 820 96 1020 40 C1220 -16 1420 70 1620 24 C1800 -12 1960 40 2140 10" />
        <path d="M-50 210 C140 150 300 230 490 170 C700 100 880 190 1080 130 C1280 70 1460 150 1680 100 C1860 60 1980 110 2140 80" />
        <path d="M-36 320 C150 270 320 340 520 280 C740 210 920 300 1130 250 C1340 200 1520 280 1740 230 C1920 190 2020 240 2140 210" />
        <path d="M-30 430 C160 380 340 450 540 390 C760 320 960 410 1180 360 C1400 300 1580 390 1800 340 C1960 300 2060 350 2140 320" />
        <path d="M-40 560 C150 510 360 560 560 510 C780 450 980 530 1200 480 C1420 430 1600 510 1820 460 C1980 420 2080 470 2140 440" />
        <path d="M-20 700 C170 640 360 710 580 650 C800 590 1000 680 1240 620 C1460 560 1640 650 1860 590 C2000 550 2080 600 2140 570" />
        <path d="M-30 390 C160 340 340 410 540 350 C760 280 940 370 1160 320 C1380 270 1560 350 1780 300 C1960 260 2060 310 2140 280" />
        <path d="M-25 620 C170 570 360 630 580 570 C800 510 1000 590 1220 540 C1440 490 1620 570 1840 520 C2000 480 2080 530 2140 500" />
        <path d="M200 -40 C250 120 180 280 260 430 C360 620 270 760 340 980" />
        <path d="M780 -50 C700 130 820 280 730 460 C640 640 760 780 680 980" />
        <path d="M1280 -30 C1210 140 1340 300 1240 480 C1150 640 1260 790 1160 980" />
        <path d="M1760 -40 C1700 150 1820 320 1720 500 C1640 660 1740 800 1660 980" />
        <path d="M480 -20 C430 160 540 320 460 500 C390 660 500 800 420 980" />
        <path d="M280 220 L460 150 L620 240 L570 420 L380 450 L240 330 Z" opacity="0.95" />
        <path d="M860 160 L1080 200 L1180 360 L1040 500 L820 460 L760 290 Z" opacity="0.9" />
        <path d="M1380 300 L1580 260 L1700 400 L1600 540 L1400 510 L1320 380 Z" opacity="0.9" />
        <path d="M480 560 L660 510 L760 640 L660 760 L480 720 L420 620 Z" opacity="0.88" />
        <path d="M1100 520 L1280 480 L1380 600 L1280 700 L1100 670 L1040 580 Z" opacity="0.85" />
        <circle cx="520" cy="340" r="54" opacity="0.85" />
        <circle cx="520" cy="340" r="92" opacity="0.55" />
        <circle cx="520" cy="340" r="130" opacity="0.32" />
        <circle cx="1180" cy="420" r="48" opacity="0.8" />
        <circle cx="1180" cy="420" r="86" opacity="0.5" />
        <circle cx="1640" cy="280" r="40" opacity="0.7" />
        <circle cx="1640" cy="280" r="72" opacity="0.4" />
        <path
          d="M160 640 C320 560 420 600 560 480 C720 340 860 420 1040 300 C1180 210 1320 240 1480 160"
          strokeDasharray="8 11"
          opacity="0.9"
        />
        <path
          d="M900 780 C1040 700 1160 740 1300 660 C1420 590 1540 620 1680 540"
          strokeDasharray="6 10"
          opacity="0.75"
        />
        <path d="M100 180 C180 140 260 170 340 130 M1100 80 C1200 40 1320 90 1440 50 M150 760 C250 720 340 750 440 710 M1700 700 C1800 660 1900 700 2000 650" opacity="0.7" />
      </g>

      <g opacity="0.7">
        <path d="M968 310 C1012 284 1046 314 1086 290 C1122 268 1168 286 1194 326 C1150 352 1110 346 1074 370 C1030 400 994 370 968 310Z" fill="#A8EAC0" />
        <path d="M1454 518 C1510 486 1592 504 1634 556 C1584 602 1518 612 1458 572Z" fill="#B6E7C8" />
        <path d="M382 708 C432 676 506 698 542 750 C486 792 430 782 382 708Z" fill="#EFD4CE" />
        <path d="M1128 470 C1186 430 1254 462 1260 528 C1194 570 1148 536 1128 470Z" fill="#A7EFD0" />
        <path d="M1104 236 L1134 212 L1162 236 L1132 264Z" fill="#77DCEB" />
      </g>

      <g fill="#607482" fontFamily="Arial, sans-serif" fontWeight="700" opacity="0.72">
        <text x="176" y="386" fontSize="22">CLAYTON NORTH</text>
        <text x="840" y="392" fontSize="30">Monash</text>
        <text x="842" y="426" fontSize="30">University</text>
        <text x="1280" y="470" fontSize="24">Australian Synchrotron</text>
        <text x="1530" y="320" fontSize="19" transform="rotate(-18 1530 320)">Duuerdin St</text>
        <text x="376" y="260" fontSize="18" transform="rotate(-84 376 260)">Koonawarra St</text>
        <text x="1194" y="610" fontSize="24">Wellington Rd</text>
      </g>

      <g fill="#E96C2C" fontFamily="Arial, sans-serif" fontWeight="800" opacity="0.92">
        <text x="190" y="520" fontSize="23">McDonald&apos;s Clayton II</text>
        <text x="632" y="438" fontSize="24">Guzman y Gomez</text>
        <text x="1220" y="704" fontSize="23">Guzman y Gomez</text>
        <text x="1818" y="768" fontSize="24">McDonald&apos;s Mulgrave</text>
      </g>

      <g fill="#80929A">
        {[
          [356, 98],
          [764, 142],
          [1428, 516],
          [1848, 420],
          [1322, 558],
          [716, 526],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="15" fill="white" opacity="0.9" />
            <circle cx={cx} cy={cy} r="8" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, t: 0 });
  const prevPointerRef = useRef({ x: 0, y: 0, t: 0 });
  const smoothRef = useRef({
    x: 0,
    y: 0,
    size: 640,
    ox: 0,
    oy: 0,
    morphA: 0,
    morphB: 0,
    morphC: 0,
  });
  const velocityRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);
  const unveilRef = useRef<{ active: boolean; start: number; fromSize: number; toSize: number }>({
    active: false,
    start: 0,
    fromSize: 180,
    toSize: 640,
  });
  const autoDriftRef = useRef({ angle: 0, touchOverrideUntil: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const supportsHoverPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const canAnimate = !prefersReducedMotion;

    // Always reset unveil flag on mount so a mid-navigation leave cannot stick.
    unveilRef.current.active = false;
    isVisibleRef.current = true;
    velocityRef.current = 0;
    prevPointerRef.current = { x: 0, y: 0, t: 0 };

    let alreadyUnveiled = false;
    try {
      alreadyUnveiled = sessionStorage.getItem(UNVEIL_STORAGE_KEY) === "1";
    } catch {
      alreadyUnveiled = false;
    }

    const resolveSizeRange = () => {
      const width = element.getBoundingClientRect().width;
      const min = Math.round(Math.min(520, Math.max(380, width * 0.48)));
      const max = Math.round(Math.min(920, Math.max(640, width * 0.78)));
      const rest = Math.round(min + (max - min) * 0.55);
      return { min, max, rest };
    };

    const writeReveal = (now = performance.now()) => {
      frameRef.current = null;

      const rect = element.getBoundingClientRect();
      // Treat as visible if any part of the hero is in view (IO can lag after client nav).
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!inView && !unveilRef.current.active) {
        isVisibleRef.current = false;
        return;
      }
      isVisibleRef.current = true;

      const { min, max, rest } = resolveSizeRange();
      const pointer = pointerRef.current;
      const previousPointer = prevPointerRef.current;
      const unveil = unveilRef.current;
      const smooth = smoothRef.current;

      let targetSize = rest;
      let targetOx = 0;
      let targetOy = 0;
      let localX = pointer.x - rect.left;
      let localY = pointer.y - rect.top;

      if (unveil.active) {
        const progress = Math.min(1, (now - unveil.start) / UNVEIL_DURATION_MS);
        const eased = 1 - Math.pow(1 - progress, 3);
        targetSize = unveil.fromSize + (unveil.toSize - unveil.fromSize) * eased;
        localX = rect.width * (0.5 + Math.sin(progress * Math.PI) * 0.05);
        localY = rect.height * (0.42 + progress * 0.05);
        element.style.setProperty("--fog-density", String(1 - eased * 0.12));
        if (progress >= 1) {
          unveil.active = false;
          try {
            sessionStorage.setItem(UNVEIL_STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
          element.style.setProperty("--fog-density", "0.92");
        }
      } else if (!supportsHoverPointer) {
        const touchActive = now < autoDriftRef.current.touchOverrideUntil;
        if (!touchActive && canAnimate) {
          autoDriftRef.current.angle += 0.0038;
          const a = autoDriftRef.current.angle;
          localX = rect.width * (0.5 + Math.sin(a) * 0.16 + Math.sin(a * 0.37) * 0.06);
          localY = rect.height * (0.44 + Math.cos(a * 0.82) * 0.12 + Math.sin(a * 0.51) * 0.05);
          pointerRef.current = {
            x: rect.left + localX,
            y: rect.top + localY,
            t: now,
          };
          targetSize = rest + Math.sin(a * 1.4) * ((max - rest) * 0.18);
        } else {
          const dt = Math.max(1, pointer.t - previousPointer.t || now - previousPointer.t);
          if (previousPointer.t > 0) {
            const dx = pointer.x - previousPointer.x;
            const dy = pointer.y - previousPointer.y;
            velocityRef.current += (Math.min(2.4, Math.hypot(dx, dy) / dt) - velocityRef.current) * 0.18;
          }
          const speed = velocityRef.current;
          targetSize = rest + (max - rest) * Math.min(1, speed / 1.05);
          if (speed < 0.04) targetSize = rest;
          const dirX = pointer.x - previousPointer.x;
          const dirY = pointer.y - previousPointer.y;
          const dirLen = Math.hypot(dirX, dirY) || 1;
          const lead = Math.min(28, 10 + speed * 14);
          targetOx = (dirX / dirLen) * lead * Math.min(1, speed * 1.5);
          targetOy = (dirY / dirLen) * lead * Math.min(1, speed * 1.5);
          localX = pointer.x - rect.left + smooth.ox;
          localY = pointer.y - rect.top + smooth.oy;
          velocityRef.current *= 0.92;
        }
      } else {
        const dt = Math.max(1, pointer.t - previousPointer.t || now - previousPointer.t);
        if (previousPointer.t > 0) {
          const dx = pointer.x - previousPointer.x;
          const dy = pointer.y - previousPointer.y;
          velocityRef.current += (Math.min(2.4, Math.hypot(dx, dy) / dt) - velocityRef.current) * 0.2;
        }
        const speed = velocityRef.current;
        targetSize = rest + (max - rest) * Math.min(1, speed / 0.95);
        if (speed < 0.04) targetSize = rest;
        else targetSize = Math.max(min, Math.min(max, targetSize));

        const dirX = pointer.x - previousPointer.x;
        const dirY = pointer.y - previousPointer.y;
        const dirLen = Math.hypot(dirX, dirY) || 1;
        const lead = Math.min(34, 12 + speed * 16);
        targetOx = (dirX / dirLen) * lead * Math.min(1, speed * 1.65);
        targetOy = (dirY / dirLen) * lead * Math.min(1, speed * 1.65);
        localX = pointer.x - rect.left + smooth.ox;
        localY = pointer.y - rect.top + smooth.oy;
        velocityRef.current *= 0.9;
      }

      targetSize = Math.max(min * 0.7, Math.min(max, targetSize));

      smooth.size += (targetSize - smooth.size) * (unveil.active ? 0.22 : 0.14);
      smooth.ox += (targetOx - smooth.ox) * 0.16;
      smooth.oy += (targetOy - smooth.oy) * 0.16;
      smooth.morphA += (Math.sin(now / 1400) * 48 + Math.cos(now / 1900) * 32 - smooth.morphA) * 0.1;
      smooth.morphB += (Math.cos(now / 1700) * 42 + Math.sin(now / 1200) * 28 - smooth.morphB) * 0.1;
      smooth.morphC += (Math.sin(now / 2100 + 1.2) * 38 + Math.cos(now / 1500) * 24 - smooth.morphC) * 0.09;

      localX = Math.max(0, Math.min(rect.width, localX));
      localY = Math.max(0, Math.min(rect.height, localY));
      smooth.x = localX;
      smooth.y = localY;

      element.style.setProperty("--reveal-x", `${localX}px`);
      element.style.setProperty("--reveal-y", `${localY}px`);
      element.style.setProperty("--reveal-size", `${smooth.size}px`);
      element.style.setProperty("--reveal-ox", `${smooth.ox}px`);
      element.style.setProperty("--reveal-oy", `${smooth.oy}px`);
      element.style.setProperty("--reveal-morph-a", `${smooth.morphA}px`);
      element.style.setProperty("--reveal-morph-b", `${smooth.morphB}px`);
      element.style.setProperty("--reveal-morph-c", `${smooth.morphC}px`);

      prevPointerRef.current = { ...pointerRef.current };

      const needsContinue =
        unveil.active ||
        !supportsHoverPointer ||
        velocityRef.current > 0.02 ||
        Math.abs(smooth.size - targetSize) > 0.5 ||
        Math.abs(smooth.ox - targetOx) > 0.3;

      if (needsContinue && canAnimate) {
        frameRef.current = window.requestAnimationFrame(writeReveal);
      }
    };

    const queueReveal = (clientX: number, clientY: number) => {
      pointerRef.current = { x: clientX, y: clientY, t: performance.now() };
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(writeReveal);
      }
    };

    const rect = element.getBoundingClientRect();
    const { rest, min } = resolveSizeRange();
    smoothRef.current.size = alreadyUnveiled || !canAnimate ? rest : min * 0.42;

    const startX = rect.left + rect.width * 0.5;
    const startY = rect.top + rect.height * 0.42;
    queueReveal(startX, startY);

    // Always run a short dissolve settle on mount (revisits included).
    element.setAttribute("data-dissolve-ready", "true");
    window.requestAnimationFrame(() => {
      element.setAttribute("data-dissolved", "true");
    });

    if (canAnimate && !alreadyUnveiled) {
      element.setAttribute("data-unveiling", "true");
      unveilRef.current = {
        active: true,
        start: performance.now(),
        fromSize: min * 0.35,
        toSize: rest,
      };
      element.style.setProperty("--fog-density", "1");
      frameRef.current = window.requestAnimationFrame(writeReveal);
      window.setTimeout(() => {
        unveilRef.current.active = false;
        element.removeAttribute("data-unveiling");
      }, UNVEIL_DURATION_MS + 80);
    } else {
      unveilRef.current.active = false;
      element.style.setProperty("--fog-density", "0.92");
      element.style.setProperty("--reveal-size", `${rest}px`);
      element.style.setProperty("--reveal-x", `${rect.width * 0.5}px`);
      element.style.setProperty("--reveal-y", `${rect.height * 0.42}px`);
      if (!canAnimate) {
        element.setAttribute("data-dissolved", "true");
      }
    }

    const dissolveTimer = window.setTimeout(() => {
      element.setAttribute("data-dissolved", "true");
    }, canAnimate ? DISSOLVE_MS : 180);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        element.toggleAttribute("data-fog-active", entry.isIntersecting && canAnimate);
        if (entry.isIntersecting && frameRef.current === null) {
          frameRef.current = window.requestAnimationFrame(writeReveal);
        }
      },
      { threshold: 0.04 }
    );
    observer.observe(element);
    element.toggleAttribute("data-fog-active", canAnimate);

    const handlePointerMove = (event: PointerEvent) => {
      if (!supportsHoverPointer) return;
      // Allow pointer steering even near the end of unveil so remounts feel responsive.
      if (unveilRef.current.active) {
        const elapsed = performance.now() - unveilRef.current.start;
        if (elapsed < UNVEIL_DURATION_MS * 0.85) return;
        unveilRef.current.active = false;
        element.removeAttribute("data-unveiling");
      }
      queueReveal(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (supportsHoverPointer) return;
      if (unveilRef.current.active) {
        const elapsed = performance.now() - unveilRef.current.start;
        if (elapsed < UNVEIL_DURATION_MS * 0.85) return;
        unveilRef.current.active = false;
        element.removeAttribute("data-unveiling");
      }
      const touch = event.touches[0];
      if (!touch) return;
      autoDriftRef.current.touchOverrideUntil = performance.now() + 2200;
      queueReveal(touch.clientX, touch.clientY);
    };

    const handleResize = () => {
      const next = element.getBoundingClientRect();
      queueReveal(next.left + next.width * 0.5, next.top + next.height * 0.42);
    };

    element.addEventListener("pointermove", handlePointerMove, { passive: true });
    element.addEventListener("touchstart", handleTouchMove, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.clearTimeout(dissolveTimer);
      unveilRef.current.active = false;
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      observer.disconnect();
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("touchstart", handleTouchMove);
      element.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [prefersReducedMotion]);

  const scrollToNext = () => {
    document.getElementById("editorial-intro")?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={containerRef}
      data-header-theme="light"
      data-dissolve-ready="false"
      className="hero-fog-scene relative w-full overflow-hidden bg-roam-cream px-6 pb-24 pt-[var(--header-height)] md:px-12"
    >
      <div className="absolute inset-0 z-0 opacity-95 saturate-[0.86] contrast-[0.96]">
        <MapBackdrop />
      </div>

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(242,235,220,0.22),rgba(92,115,76,0.05),rgba(242,235,220,0.12))]" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_72%_42%,rgba(92,115,76,0.12),transparent_36%),radial-gradient(ellipse_at_24%_72%,rgba(191,87,63,0.08),transparent_30%)]" />

      <div className="hero-fog-layer hero-fog-base" />
      <div className="hero-fog-layer hero-fog-texture" />
      <div className="hero-dissolve-veil" aria-hidden="true" />

      <div className="hero-content relative z-20 mx-auto flex min-h-[calc(100svh-var(--header-height)-6rem)] max-w-7xl items-center justify-center">
        <div className="mx-auto max-w-[18.25rem] text-center sm:max-w-5xl">
          <motion.div
            initial={false}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="max-w-5xl text-[2rem] font-bold leading-[1] tracking-tighter text-roam-ink sm:text-6xl sm:leading-[0.9] md:text-8xl md:leading-[0.86] lg:text-[9.6rem]">
              Unlock Your City Through Exploration.
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-relaxed text-roam-ink/72 md:text-xl">
              Reveal new regions, discover nearby places and build a personal
              map shaped by where you have been.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/app-overview"
                className="inline-flex h-16 items-center justify-center rounded-[18px] bg-roam-sage px-10 text-lg font-semibold text-roam-cream shadow-roam transition hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-[#4f6542] focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-sage focus-visible:ring-offset-2 focus-visible:ring-offset-roam-cream"
              >
                Learn More
              </Link>
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-16 items-center justify-center gap-3 rounded-[18px] border border-[rgba(92,115,76,0.45)] bg-roam-cream px-10 text-lg font-semibold text-roam-ink shadow-roam transition hover:-translate-y-0.5 hover:scale-[1.01] hover:border-roam-sage hover:bg-roam-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-sage focus-visible:ring-offset-2 focus-visible:ring-offset-roam-cream"
              >
                <GitBranch aria-hidden="true" className="h-5 w-5" />
                View the Project
                <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Scroll to explore"
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 z-30 flex h-14 w-14 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-roam-sage/35 bg-roam-cream/75 text-roam-ink shadow-roam transition hover:-translate-y-1 hover:bg-roam-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-sage focus-visible:ring-offset-4 focus-visible:ring-offset-roam-cream md:bottom-8"
      >
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.45, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown aria-hidden="true" className="h-6 w-6" />
        </motion.span>
      </button>
    </section>
  );
}
