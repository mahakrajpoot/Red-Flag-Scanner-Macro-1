import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type RiskLevel = "high" | "medium" | "low" | "safe";

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  if (score >= 20) return "low";
  return "safe";
}

export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case "high":
      return "text-red-400";
    case "medium":
      return "text-amber-400";
    case "low":
      return "text-emerald-400";
    case "safe":
      return "text-emerald-400";
  }
}

export function getRiskBgColor(level: RiskLevel): string {
  switch (level) {
    case "high":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "medium":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "low":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "safe":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  }
}

export function getRiskGradient(level: RiskLevel): string {
  switch (level) {
    case "high":
      return "from-red-500 to-rose-600";
    case "medium":
      return "from-amber-500 to-orange-600";
    case "low":
      return "from-emerald-500 to-green-600";
    case "safe":
      return "from-emerald-500 to-green-600";
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}
