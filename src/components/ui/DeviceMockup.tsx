"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface DeviceMockupProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export function DeviceMockup({ children, className, interactive = true }: DeviceMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-[320px] aspect-[9/19.5] perspective-1000 mx-auto", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-[40px] p-2 bg-roam-dark-surface border-[4px] border-[#333] shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
          <div className="w-24 h-6 bg-black rounded-b-3xl"></div>
        </div>
        <div className="w-full h-full rounded-[32px] overflow-hidden bg-roam-dark-background">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
