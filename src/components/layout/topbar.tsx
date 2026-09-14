"use client";

import { Search, Bell, Menu } from "lucide-react";
import { userProfile } from "@/data/demo-data";

interface TopbarProps {
  onMenuToggle?: () => void;
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/[0.06] bg-black/20 backdrop-blur-md relative z-10">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-xl hover:bg-white/[0.06] transition-colors"
      >
        <Menu className="w-5 h-5 text-gray-400" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search contracts, clauses, or ask anything..."
            className="glass-input w-full pl-10 pr-4 py-2 text-sm"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-white/[0.06] transition-colors">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
            {userProfile.avatar}
          </div>
          <span className="text-sm font-medium text-gray-300 hidden sm:block">
            {userProfile.name}
          </span>
        </div>
      </div>
    </header>
  );
}
