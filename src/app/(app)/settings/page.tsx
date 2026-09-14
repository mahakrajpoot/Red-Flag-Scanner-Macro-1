"use client";

import { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Palette,
  CreditCard,
  Edit2,
  Check,
  Moon,
  Sun,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { userProfile } from "@/data/demo-data";
import { formatDate } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [defaultRiskFilter, setDefaultRiskFilter] = useState("all");
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Profile & Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your account preferences, security settings, and interface themes.
        </p>
      </div>

      {/* Main Split Layout: Left Tabs + Right Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Side: Navigation Tabs */}
        <div className="md:col-span-4">
          <GlassPanel className="p-3 space-y-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </GlassPanel>
        </div>

        {/* Right Side: Tab Contents */}
        <div className="md:col-span-8 space-y-6">
          {activeTab === "profile" && (
            <GlassPanel className="p-6 md:p-8 space-y-6">
              {/* Profile Header Block matching Reference 9 */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                    {userProfile.avatar}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{name}</h2>
                    <p className="text-xs text-gray-400">{email}</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] text-gray-200 border border-white/10 flex items-center gap-1.5 transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{isEditing ? "Save" : "Edit"}</span>
                </button>
              </div>

              {/* Profile Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-gray-500 block mb-1">Full Name</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="glass-input w-full p-2 text-xs"
                    />
                  ) : (
                    <span className="font-semibold text-white">{name}</span>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-gray-500 block mb-1">Email Address</span>
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="glass-input w-full p-2 text-xs"
                    />
                  ) : (
                    <span className="font-semibold text-white">{email}</span>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-gray-500 block mb-1">Member Since</span>
                  <span className="font-semibold text-white">
                    {formatDate(userProfile.memberSince)}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-gray-500 block mb-1">Plan Tier</span>
                  <span className="font-semibold text-red-400">Enterprise AI Pro</span>
                </div>
              </div>

              {/* Preferences Section */}
              <div className="pt-6 border-t border-white/[0.06] space-y-4">
                <h3 className="text-sm font-bold text-white">Preferences</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Theme Switcher */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] space-y-2">
                    <span className="text-xs text-gray-400 block font-medium">
                      Theme
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTheme("light")}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          theme === "light"
                            ? "bg-white text-gray-900"
                            : "bg-white/[0.04] text-gray-400"
                        }`}
                      >
                        <Sun className="w-3.5 h-3.5" />
                        <span>Light</span>
                      </button>

                      <button
                        onClick={() => setTheme("dark")}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          theme === "dark"
                            ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                            : "bg-white/[0.04] text-gray-400"
                        }`}
                      >
                        <Moon className="w-3.5 h-3.5" />
                        <span>Dark</span>
                      </button>
                    </div>
                  </div>

                  {/* Default Risk Filter */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] space-y-2">
                    <span className="text-xs text-gray-400 block font-medium">
                      Default Risk Filter
                    </span>
                    <select
                      value={defaultRiskFilter}
                      onChange={(e) => setDefaultRiskFilter(e.target.value)}
                      className="glass-input w-full p-2 text-xs bg-black/50 border-white/10 rounded-lg text-white"
                    >
                      <option value="all">All Levels</option>
                      <option value="high">High Risk Only</option>
                      <option value="medium">Medium Risk</option>
                      <option value="low">Low Risk</option>
                    </select>
                  </div>
                </div>
              </div>
            </GlassPanel>
          )}

          {activeTab !== "profile" && (
            <GlassPanel className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto text-gray-400">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white capitalize">
                {activeTab} Settings
              </h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Configured to enterprise policy. Two-factor authentication and notification channels are active.
              </p>
            </GlassPanel>
          )}
        </div>
      </div>
    </div>
  );
}
