"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Download,
  ExternalLink,
  Filter,
  History as HistoryIcon,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { RiskBadge } from "@/components/ui/risk-badge";
import { scanRecords, ScanRecord } from "@/data/demo-data";
import { formatDate } from "@/lib/utils";

export default function HistoryPage() {
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecords = scanRecords.filter((record) => {
    const matchesRisk =
      filterRisk === "all" || record.riskLevel === filterRisk.toLowerCase();
    const matchesQuery = record.documentName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesRisk && matchesQuery;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <HistoryIcon className="w-7 h-7 text-red-500" />
          <span>Scan History & Reports</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          View your past scans, filter by risk level, and download executive summaries.
        </p>
      </div>

      {/* Filter and Search Bar matching reference image */}
      <GlassPanel className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Risk Level Filter Chips */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {["All", "High", "Medium", "Low"].map((level) => {
            const isActive = filterRisk.toLowerCase() === level.toLowerCase();
            return (
              <button
                key={level}
                onClick={() => setFilterRisk(level.toLowerCase())}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? level === "High"
                      ? "bg-red-500/25 text-red-300 border border-red-500/40"
                      : level === "Medium"
                      ? "bg-amber-500/25 text-amber-300 border border-amber-500/40"
                      : level === "Low"
                      ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40"
                      : "bg-white/20 text-white border border-white/30"
                    : "bg-white/[0.04] text-gray-400 hover:text-white border border-white/[0.06]"
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="glass-input w-full pl-9 pr-4 py-1.5 text-xs bg-black/40 border-white/10 rounded-xl text-white placeholder:text-gray-500"
          />
        </div>
      </GlassPanel>

      {/* Main Data Table matching Reference Image 7 */}
      <GlassPanel className="overflow-hidden border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] text-gray-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-5">Document Name</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Risk Level</th>
                <th className="py-3.5 px-4">Scan Date</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              <AnimatePresence>
                {filteredRecords.map((record) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                            record.riskLevel === "high"
                              ? "bg-red-500/15 border-red-500/30 text-red-400"
                              : record.riskLevel === "medium"
                              ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                              : "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-red-300 transition-colors">
                          {record.documentName}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-gray-400 font-medium">
                      {record.type}
                    </td>

                    <td className="py-4 px-4">
                      <RiskBadge
                        level={record.riskLevel}
                        score={record.riskScore}
                      />
                    </td>

                    <td className="py-4 px-4 text-gray-400">
                      {formatDate(record.date)}
                    </td>

                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/scan/${record.id}`}>
                          <button
                            title="View Analysis"
                            className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] text-gray-300 hover:text-white border border-white/[0.08] transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                        <Link href={`/reports/${record.id}`}>
                          <button
                            title="Download Report"
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredRecords.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No scanned contracts found matching your filters.
            </div>
          )}
        </div>
      </GlassPanel>
    </div>
  );
}
