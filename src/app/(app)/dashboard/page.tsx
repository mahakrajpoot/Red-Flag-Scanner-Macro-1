"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  AlertTriangle,
  ShieldCheck,
  Clock,
  ArrowRight,
  Upload,
  FileSearch,
  ExternalLink,
  Plus,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { RiskBadge } from "@/components/ui/risk-badge";
import {
  scanRecords,
  dashboardStats,
  riskDistribution,
} from "@/data/demo-data";
import { getGreeting, formatDateTime } from "@/lib/utils";

export default function DashboardPage() {
  const greeting = getGreeting();

  const statCards = [
    {
      title: "Total Scans",
      value: dashboardStats.totalScans.toString(),
      icon: FileText,
      color: "text-violet-400",
      bg: "bg-violet-500/10 border-violet-500/20",
    },
    {
      title: "High Risk",
      value: dashboardStats.highRisk.toString(),
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
    },
    {
      title: "Avg. Risk Score",
      value: `${dashboardStats.avgRiskScore}/100`,
      icon: ShieldCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Time Saved",
      value: `${dashboardStats.timeSaved} hrs`,
      icon: Clock,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            {greeting}, Mahak! <span className="animate-pulse">👋</span>
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Your legal safety net, powered by AI.
          </p>
        </div>

        <Link href="/scan">
          <button className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2 shadow-md">
            <Plus className="w-4 h-4" />
            <span>New Scan</span>
          </button>
        </Link>
      </motion.div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <GlassPanel hover className="p-4 md:p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-400 tracking-wide uppercase">
                  {stat.title}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center border ${stat.bg}`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      {/* Center Section: Recent Scans & Risk Distribution Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Scans Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-8"
        >
          <GlassPanel className="p-5 md:p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Recent Scans</h2>
                  <p className="text-xs text-gray-400">
                    Latest analyzed contracts and documents
                  </p>
                </div>
                <Link
                  href="/history"
                  className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {scanRecords.slice(0, 4).map((scan) => (
                  <Link key={scan.id} href={`/scan/${scan.id}`}>
                    <div className="group p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] hover:border-white/10 transition-all flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                            scan.riskLevel === "high"
                              ? "bg-red-500/15 border-red-500/25 text-red-400"
                              : scan.riskLevel === "medium"
                              ? "bg-amber-500/15 border-amber-500/25 text-amber-400"
                              : "bg-emerald-500/15 border-emerald-500/25 text-emerald-400"
                          }`}
                        >
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate group-hover:text-red-300 transition-colors">
                            {scan.documentName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDateTime(scan.date)} • {scan.type}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <RiskBadge
                          level={scan.riskLevel}
                          score={scan.riskScore}
                        />
                        <span className="text-xs font-bold text-gray-300 hidden sm:block">
                          {scan.riskScore}/100
                        </span>
                        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Risk Distribution Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="lg:col-span-4"
        >
          <GlassPanel className="p-5 md:p-6 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Risk Distribution</h2>
              <p className="text-xs text-gray-400 mb-4">
                Summary of risk levels across all scans
              </p>

              <div className="relative h-48 w-full flex items-center justify-center">
                <svg viewBox="0 0 160 160" className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="58"
                    fill="transparent"
                    stroke="#1a1a2e"
                    strokeWidth="16"
                  />
                  {(() => {
                    const radius = 58;
                    const circumference = 2 * Math.PI * radius;
                    let accumulatedPercent = 0;
                    return riskDistribution.map((item) => {
                      const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
                      accumulatedPercent += item.percentage;
                      return (
                        <circle
                          key={item.name}
                          cx="80"
                          cy="80"
                          r={radius}
                          fill="transparent"
                          stroke={item.color}
                          strokeWidth="16"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-700 hover:opacity-80"
                        />
                      );
                    });
                  })()}
                </svg>

                {/* Center Badge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-extrabold text-white">
                    {dashboardStats.totalScans}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    Total Scans
                  </span>
                </div>
              </div>

              {/* Legend with percentages */}
              <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                {riskDistribution.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-300 font-medium">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">
                        {item.value} docs
                      </span>
                      <span className="font-semibold text-white">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>

      {/* Bottom Wide CTA Card: "Scan your first document now" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <GlassPanel className="p-6 md:p-8 bg-gradient-to-r from-red-950/40 via-violet-950/30 to-black/60 border border-red-500/20 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-red-600/10 to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
                <FileSearch className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Scan your first document now
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Upload a contract or PDF and get instant risk analysis with AI.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link href="/scan" className="w-full md:w-auto">
                <button className="btn-primary w-full md:w-auto px-6 py-3 text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30">
                  <Upload className="w-4 h-4" />
                  <span>Upload Document</span>
                </button>
              </Link>
            </div>
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
