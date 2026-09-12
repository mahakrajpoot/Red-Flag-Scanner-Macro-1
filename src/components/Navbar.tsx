import React, { useState } from 'react';
import type { TabType, UserProfile, NotificationItem } from '../types';
import { 
  ShieldAlert, 
  Search, 
  Bell, 
  Check, 
  Plus
} from 'lucide-react';

interface NavbarProps {
  activeTab?: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenChat?: () => void;
  chatMessageCount?: number;
  userProfile: UserProfile;
  notifications: NotificationItem[];
  onMarkNotificationsRead?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  setActiveTab,
  userProfile,
  notifications,
  onMarkNotificationsRead,
  searchQuery = '',
  onSearchChange
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;


  return (
    <header className="sticky top-0 z-50 border-b border-[#1C2333] bg-[#070A12]/95 backdrop-blur-xl">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none min-w-max" 
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#0B0F19] border border-slate-700/60 flex items-center justify-center text-[#00F0FF] shadow-glow-cyan">
              <ShieldAlert className="w-5 h-5 text-[#00F0FF] fill-[#00F0FF]/10" />
            </div>

            <div>
              <h1 className="font-black text-base text-white tracking-tight leading-tight">
                Red Flag Scanner
              </h1>
              <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
                Legal & Web Security AI
              </p>
            </div>
          </div>

          {/* Central Search Bar (Exact Reference Image Styling) */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search documents, clauses, domains, or ask AI..."
                className="w-full bg-[#111625] border border-[#1C2333] focus:border-[#00F0FF] rounded-xl pl-10 pr-12 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition shadow-inner"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 bg-[#0B0F19] px-1.5 py-0.5 rounded border border-slate-800">
                ⌘K
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Quick Launch New Scan Button */}
            <button
              onClick={() => setActiveTab('scanner')}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#00F0FF] hover:bg-[#00D8E6] text-[#060913] font-black text-xs shadow-md shadow-cyan-950/40 transition transform active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>New Scan</span>
            </button>

            {/* Dynamic & Functional Bell Notification Drawer Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl bg-[#111625] border border-[#1C2333] hover:border-slate-700 text-slate-300 hover:text-white transition"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF2A5F] text-white text-[9px] font-black flex items-center justify-center border-2 border-[#070A12] animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Drawer */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0B0F19] border border-[#1C2333] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 bg-[#111625] border-b border-[#1C2333] flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-[#00F0FF]" />
                      <span className="font-extrabold text-white text-xs">Security Notifications</span>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={onMarkNotificationsRead}
                        className="text-[10px] text-[#00F0FF] hover:underline font-bold flex items-center space-x-1"
                      >
                        <Check className="w-3 h-3" />
                        <span>Mark read</span>
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-[#1C2333]">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-500">
                        No notifications currently available.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 text-xs space-y-1 transition ${
                            !n.read ? 'bg-[#161C2E]/60' : 'hover:bg-[#111625]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-white">{n.title}</span>
                            <span className="text-[9px] text-slate-500 font-mono">{n.timestamp}</span>
                          </div>
                          <p className="text-slate-400 text-[11px] leading-relaxed">
                            {n.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-2 bg-[#111625] border-t border-[#1C2333] text-center">
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-[10px] font-bold text-slate-400 hover:text-slate-200"
                    >
                      Close Panel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic User Profile Avatar Badge (Initial from Login, e.g., MR) */}
            <div 
              onClick={() => setActiveTab('login')}
              className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-[#111625] border border-transparent hover:border-[#1C2333] cursor-pointer transition select-none"
              title={`Logged in as ${userProfile.name}`}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-600 text-white font-black text-xs flex items-center justify-center border border-[#00F0FF]/30 shadow-md">
                {userProfile.initials || 'MR'}
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-black text-white leading-tight">
                  {userProfile.name || 'Mahak Rajpoot'}
                </div>
                <div className="text-[10px] font-medium text-slate-400">
                  {userProfile.role || 'Security Analyst'}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
