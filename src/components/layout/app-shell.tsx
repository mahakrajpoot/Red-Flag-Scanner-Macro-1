"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex bg-obsidian text-gray-100 overflow-hidden">
      {/* Ambient background photograph with moody dark overlays matching user reference image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-[1px] opacity-25"
          style={{ backgroundImage: "url('/bg-workspace.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#07070b]/95 via-[#0b0a14]/90 to-[#07070b]/98" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[15%] w-[450px] h-[450px] rounded-full bg-violet-600/10 blur-[130px]" />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block relative z-20 shrink-0">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 w-[260px] h-full shadow-2xl">
            <Sidebar collapsed={false} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 h-screen overflow-hidden">
        <Topbar onMenuToggle={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
