"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  // Mouse positions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configuration for the trailing ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports hover/pointer
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsTouch(false);
    }

    const manageMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      
      // Check for interactive elements
      const target = e.target as HTMLElement;
      const interactable = target.closest(
        'a, button, input, textarea, [data-cursor-interactable="true"]'
      );
      
      if (interactable) {
        setIsHovering(true);
        const text = interactable.getAttribute("data-cursor-text");
        setCursorText(text || "");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    const manageMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("mouseleave", manageMouseLeave);
    window.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mouseleave", manageMouseLeave);
      window.removeEventListener("mouseenter", () => setIsVisible(true));
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Small Dot */}
      <motion.div
        className="fixed left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-roam-sage mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />
      {/* Trailing Ring */}
      <motion.div
        className={cn(
          "fixed left-0 top-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border border-roam-sage bg-transparent transition-all duration-300",
          isHovering ? "h-16 w-16 bg-roam-sage/10 backdrop-blur-sm" : "h-8 w-8"
        )}
        style={{
          x: ringX,
          y: ringY,
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-roam-sage">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}
