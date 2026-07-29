"use client";

import { ButtonHTMLAttributes, forwardRef, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "default", icon, children, ...props },
    ref
  ) => {
    const controls = useAnimation();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseEnter = () => {
      controls.start("hover");
    };

    const handleMouseLeave = () => {
      controls.start("initial");
    };

    const baseStyles =
      "relative inline-flex items-center justify-center overflow-hidden font-medium transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-roam-sage focus-visible:ring-offset-2";
    
    const sizeStyles = {
      default: "h-14 px-8 text-base rounded-[14px]",
      sm: "h-10 px-4 text-sm rounded-xl",
      lg: "h-16 px-10 text-lg rounded-[18px]",
    };

    const variantStyles = {
      primary: "bg-roam-sage text-white",
      secondary: "bg-roam-sand text-roam-ink hover:bg-roam-sand/90",
      outline: "border border-roam-sage text-roam-ink bg-transparent",
    };

    return (
      <button
        ref={ref || buttonRef}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-cursor-interactable="true"
        {...props}
      >
        {variant === "primary" && (
          <motion.div
            className="absolute inset-0 bg-white/20 origin-left"
            initial={{ scaleX: 0 }}
            variants={{
              initial: { scaleX: 0 },
              hover: { scaleX: 1 },
            }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon && (
            <motion.span
              variants={{
                initial: { x: 0 },
                hover: { x: 4 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {icon}
            </motion.span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
