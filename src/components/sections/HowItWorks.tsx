"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { DeviceMockup } from "@/components/ui/DeviceMockup";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Open the Map",
    desc: "Start your journey. Your current location is at the center of the world.",
  },
  {
    id: 2,
    title: "Enter a Region",
    desc: "Cross the boundary into supported areas to begin revealing the map.",
  },
  {
    id: 3,
    title: "Unlock & Earn",
    desc: "The region unlocks visually and you earn XP based on its scale.",
  },
  {
    id: 4,
    title: "Log Visits",
    desc: "Discover places of interest and check in when you are within 100 metres.",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 4 steps, divide progress into 4 chunks
    if (latest < 0.25) setActiveStep(0);
    else if (latest < 0.5) setActiveStep(1);
    else if (latest < 0.75) setActiveStep(2);
    else setActiveStep(3);
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const yOffset = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-roam-cream h-[400vh]"
      id="how-it-works"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center overflow-hidden px-6 md:px-12">
        
        {/* Left Side: Route and Map Visuals */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center pt-24 md:pt-0">
          <div className="w-full max-w-lg aspect-square border border-roam-sage/10 rounded-3xl relative overflow-hidden bg-roam-sand/10">
            {/* Map styling elements */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]" />
            
            {/* Region Polygons */}
            <motion.div 
              className={cn("absolute top-10 left-10 w-48 h-48 transition-colors duration-500 rounded-3xl mix-blend-multiply", activeStep >= 1 ? "bg-roam-sage/40" : "bg-roam-ink/10")} 
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            />
            <motion.div 
              className={cn("absolute bottom-10 right-10 w-56 h-40 transition-colors duration-500 rounded-xl mix-blend-multiply", activeStep >= 2 ? "bg-roam-sage/40" : "bg-roam-ink/10")}
              style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}
            />

            {/* Route SVG */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
              <path 
                d="M 50,50 C 150,50 200,200 300,300"
                fill="none"
                stroke="var(--color-roam-sage)"
                strokeWidth="4"
                strokeDasharray="4 8"
                className="opacity-30"
              />
              <motion.path 
                d="M 50,50 C 150,50 200,200 300,300"
                fill="none"
                stroke="var(--color-roam-sage)"
                strokeWidth="4"
                style={{ pathLength }}
              />
              <motion.circle
                r="6"
                fill="var(--color-roam-clay)"
                style={{
                  offsetPath: 'path("M 50,50 C 150,50 200,200 300,300")',
                  offsetDistance: useTransform(pathLength, (v) => `${v * 100}%`)
                }}
              />
            </svg>
            
            {/* XP Feedback */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: activeStep === 2 ? 1 : 0, scale: activeStep === 2 ? 1 : 0.5 }}
              className="absolute top-1/2 left-1/2 bg-white text-roam-sage font-bold px-3 py-1 rounded-full shadow-lg text-sm -translate-x-1/2 -translate-y-1/2"
            >
              +250 XP
            </motion.div>
          </div>
        </div>

        {/* Right Side: Device & Scroll Content */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center relative pb-12 md:pb-0">
          
          {/* Scrollable Text container masked */}
          <div className="absolute left-0 md:left-12 h-64 w-64 md:w-96 z-10 pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <motion.div 
              style={{ y: yOffset }} 
              className="absolute inset-x-0 top-1/2 flex flex-col gap-64"
            >
              {steps.map((step, i) => (
                <div key={step.id} className={cn("transition-opacity duration-300", activeStep === i ? "opacity-100" : "opacity-30")}>
                  <div className="text-roam-sage font-mono text-sm mb-2 tracking-widest">STEP 0{step.id}</div>
                  <h3 className="text-3xl md:text-5xl font-bold text-roam-ink mb-4">{step.title}</h3>
                  <p className="text-roam-text-muted">{step.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <DeviceMockup interactive={false} className="ml-auto opacity-50 md:opacity-100 scale-75 md:scale-100 translate-x-12 md:translate-x-0">
            <div className="w-full h-full flex items-center justify-center relative bg-roam-cream">
              {/* Fake UI changing based on step */}
              <motion.div 
                animate={{ opacity: activeStep === 0 ? 1 : 0 }}
                className="absolute inset-0 flex flex-col pt-12 px-4"
              >
                <div className="h-64 w-full bg-roam-sand/20 rounded-xl mb-4" />
                <div className="h-12 w-full bg-roam-ink/5 rounded-xl" />
              </motion.div>

              <motion.div 
                animate={{ opacity: activeStep === 1 ? 1 : 0 }}
                className="absolute inset-0 flex flex-col pt-12 px-4"
              >
                <div className="h-48 w-full bg-roam-sage/20 rounded-xl mb-4" />
                <div className="h-24 w-full bg-roam-ink/5 rounded-xl" />
              </motion.div>

              <motion.div 
                animate={{ opacity: activeStep === 2 ? 1 : 0 }}
                className="absolute inset-0 flex flex-col pt-12 px-4 items-center justify-center text-roam-sage"
              >
                <span className="text-4xl font-bold">LEVEL UP</span>
              </motion.div>

              <motion.div 
                animate={{ opacity: activeStep === 3 ? 1 : 0 }}
                className="absolute inset-0 flex flex-col justify-end pb-8 px-4"
              >
                <div className="h-64 w-full bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center border border-black/5">
                  <div className="w-12 h-12 bg-roam-sage rounded-full mb-4" />
                  <div className="h-4 w-32 bg-roam-ink/10 rounded mb-2" />
                  <div className="h-10 w-48 bg-roam-sage rounded-xl mt-4" />
                </div>
              </motion.div>
            </div>
          </DeviceMockup>
        </div>

      </div>
    </section>
  );
}
