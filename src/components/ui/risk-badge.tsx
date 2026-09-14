"use client";

import { cn } from "@/lib/utils";
import { type RiskLevel } from "@/lib/utils";

interface RiskBadgeProps {
  level: RiskLevel | "high" | "medium" | "low";
  score?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function RiskBadge({ level, score, size = "sm", className }: RiskBadgeProps) {
  const badgeClass = {
    high: "risk-badge-high",
    medium: "risk-badge-medium",
    low: "risk-badge-low",
    safe: "risk-badge-low",
  };

  const sizeClass = {
    sm: "text-xs px-2.5 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  const label = level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <span className={cn(badgeClass[level], sizeClass[size], "inline-flex items-center gap-1.5 font-semibold", className)}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        level === "high" && "bg-red-400",
        level === "medium" && "bg-amber-400",
        (level === "low" || level === "safe") && "bg-emerald-400"
      )} />
      {label}
      {score !== undefined && <span className="opacity-70">{score}</span>}
    </span>
  );
}
