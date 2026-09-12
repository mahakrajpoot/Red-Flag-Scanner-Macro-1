import React from 'react';
import type { TabType } from '../types';
import { 
  Shield, 
  Home, 
  FileText, 
  Code, 
  Bot, 
  Globe, 
  History,
  Lock
} from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onNewScan?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab
}) => {
  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'scanner', label: 'Document Scanner', icon: FileText },
    { id: 'snippet-scan', label: 'Micro-Snippet Scan', icon: Code },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'history', label: 'History & Reports', icon: History },
    { id: 'website-checker', label: 'Website Checker', icon: Globe },
  ];

  return (
    <aside className="w-64 bg-[#070A12] border-r border-[#1C2333] flex flex-col justify-between h-[calc(100vh-64px)] sticky top-16 z-40 select-none hidden md:flex">
      
      {/* Navigation Menu */}
      <div className="p-4 space-y-4">
        
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'scanner' && activeTab === 'doc-scanner');
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0055FF] text-white shadow-lg shadow-blue-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#111625]/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>

      {/* Bottom Glowing Shield Card (Exact Reference Image Design) */}
      <div className="p-4 space-y-3">
        
        <div className="relative rounded-2xl bg-gradient-to-b from-[#0B1528] to-[#070D1A] border border-[#1C2C4E] p-4 text-center overflow-hidden shadow-2xl group">
          {/* Visual Wave Background Glow */}
          <div className="absolute inset-0 bg-radial-gradient from-cyan-500/10 via-transparent to-transparent opacity-60 pointer-events-none"></div>

          {/* Animated Shield Graphic */}
          <div className="relative mx-auto w-12 h-12 rounded-2xl bg-[#0B172E] border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] shadow-glow-cyan mb-3">
            <Shield className="w-6 h-6 fill-[#00F0FF]/20 animate-pulse" />
          </div>

          <h3 className="font-extrabold text-white text-xs tracking-tight">
            Smarter Scans Safer Decisions
          </h3>

          <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
            AI-powered threat detection for your legal and digital world.
          </p>

          {/* Decorative Glow Wave Lines */}
          <div className="mt-3 flex items-center justify-center space-x-1 opacity-50">
            <span className="w-8 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent"></span>
          </div>
        </div>

        {/* Authentication Link */}
        <button
          onClick={() => setActiveTab('login')}
          className={`w-full flex items-center space-x-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'login' || activeTab === 'auth' ? 'text-[#00F0FF] bg-[#00F0FF]/10' : 'text-slate-400 hover:text-slate-200 hover:bg-[#111625]'
          }`}
        >
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>Account & Auth (`/login`)</span>
        </button>

      </div>

    </aside>
  );
};
