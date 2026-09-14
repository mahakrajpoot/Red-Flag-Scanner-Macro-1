"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileSearch,
  Zap,
  MessageSquareText,
  History,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { userProfile } from "@/data/demo-data";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/scan", label: "Scan Document", icon: FileSearch },
  { href: "/fast-scanner", label: "Fast Scanner", icon: Zap },
  { href: "/domain-inspector", label: "Domain Inspector", icon: Shield },
  { href: "/ai-chat", label: "AI Chat", icon: MessageSquareText },
  { href: "/history", label: "History", icon: History },
];

const bottomItems = [
  { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "glass-sidebar h-screen flex flex-col transition-all duration-300 relative z-20",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="p-4 pb-2 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col"
          >
            <span className="text-sm font-bold text-white leading-tight">
              Red Flag
            </span>
            <span className="text-[11px] text-gray-400 leading-tight">
              Scanner
            </span>
          </motion.div>
        )}
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-obsidian-lighter border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-30 hidden lg:flex"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-gray-400" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-gray-400" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group",
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
                )}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-gradient-to-r from-red-500/15 to-transparent border-l-2 border-red-500 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon
                  className={cn(
                    "w-5 h-5 shrink-0 relative z-10",
                    isActive ? "text-red-400" : "text-gray-500 group-hover:text-gray-300"
                  )}
                />
                {!collapsed && (
                  <span className="relative z-10 truncate">{item.label}</span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-3 space-y-1 border-t border-white/[0.06]">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-white bg-white/[0.06]"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </div>
            </Link>
          );
        })}

        {/* User profile */}
        <div className="flex items-center gap-3 px-3 py-2.5 mt-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {userProfile.avatar}
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-white truncate">
                {userProfile.name}
              </span>
              <span className="text-[11px] text-gray-500 truncate">
                {userProfile.email}
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
