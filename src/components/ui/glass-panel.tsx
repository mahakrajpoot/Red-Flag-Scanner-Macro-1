"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "strong" | "subtle";
  hover?: boolean;
  glow?: "crimson" | "violet" | "none";
}

const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = "default", hover = false, glow = "none", children, ...props }, ref) => {
    const variantClasses = {
      default: "glass-panel",
      strong: "glass-panel-strong",
      subtle: "bg-white/[0.03] backdrop-blur-md border border-white/[0.05] rounded-2xl",
    };

    const glowClasses = {
      crimson: "glow-crimson",
      violet: "glow-violet",
      none: "",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          variantClasses[variant],
          glowClasses[glow],
          hover && "transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:shadow-lg hover:shadow-black/20",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";

export { GlassPanel };
