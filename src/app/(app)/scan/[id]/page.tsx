"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  Download,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { demoAnalysis } from "@/data/demo-data";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";
import { formatDateTime } from "@/lib/utils";

export default function AnalysisResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const data = demoAnalysis;
  const { count: animatedScore } = useAnimatedCounter(data.overallScore, 1800);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header with Back button and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/dashboard"
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Analysis Results
          </h1>
        </div>

        <Link href={`/reports/${resolvedParams.id || "influencer-agreement"}`}>
          <button className="btn-secondary px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-white/10 hover:border-red-500/40 hover:text-white transition-all">
            <Download className="w-3.5 h-3.5" />
            <span>Download Report</span>
          </button>
        </Link>
      </div>

      {/* Document Information Strip */}
      <GlassPanel className="p-4 md:p-5 flex items-center justify-between border-white/10">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-red-400" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-white truncate">
              {data.documentName}
            </h2>
            <p className="text-xs text-gray-400">
              {data.fileSize} • Scanned on {formatDateTime(data.scannedAt)}
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
          High Risk Document
        </span>
      </GlassPanel>

      {/* Score and Risk Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Overall Risk Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-4"
        >
          <GlassPanel className="p-6 h-full flex flex-col items-center justify-center text-center relative overflow-hidden border-red-500/20">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-red-500" />

            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Overall Risk Score
            </span>

            {/* Circular Gauge Representation */}
            <div className="relative w-44 h-44 flex items-center justify-center my-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="72"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="88"
                  cy="88"
                  r="72"
                  stroke="#ef4444"
                  strokeWidth="12"
                  strokeDasharray="452.39"
                  strokeDashoffset={452.39 - (452.39 * animatedScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {animatedScore}
                  <span className="text-xl text-gray-400 font-normal">/100</span>
                </span>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                  Risk
                </span>
              </div>
            </div>

            <div className="mt-4 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-xs tracking-wider uppercase flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>High Risk</span>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Risk Breakdown Category Bars */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-8"
        >
          <GlassPanel className="p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Risk Breakdown
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Proportion of identified risks categorized by contract domain
              </p>

              <div className="space-y-4">
                {data.riskBreakdown.map((item) => (
                  <div key={item.category} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-300 font-medium">
                        {item.category}
                      </span>
                      <span className="font-semibold text-white">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400">
              <span>5 core legal domains evaluated</span>
              <span className="text-red-400 font-medium">
                Liability & Payment require immediate review
              </span>
            </div>
          </GlassPanel>
        </motion.div>
      </div>

      {/* Three Major Sections: Top Red Flags, Pros, Cons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Red Flags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassPanel className="p-5 h-full flex flex-col justify-between border-red-500/20 bg-red-950/10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
                <h4 className="text-sm font-bold text-white">Top Red Flags</h4>
              </div>

              <ul className="space-y-3">
                {data.redFlags.map((flag) => (
                  <li
                    key={flag.id}
                    className="flex items-start gap-2.5 text-xs text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                    <span>{flag.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="text-xs text-red-400 hover:text-red-300 font-semibold pt-4 flex items-center gap-1">
              <span>View all</span>
              <ArrowLeft className="w-3 h-3 rotate-180" />
            </button>
          </GlassPanel>
        </motion.div>

        {/* Pros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <GlassPanel className="p-5 h-full flex flex-col justify-between border-emerald-500/20 bg-emerald-950/10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-white">Pros</h4>
              </div>

              <ul className="space-y-3">
                {data.pros.slice(0, 3).map((pro) => (
                  <li
                    key={pro.id}
                    className="flex items-start gap-2.5 text-xs text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{pro.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold pt-4 flex items-center gap-1">
              <span>View all</span>
              <ArrowLeft className="w-3 h-3 rotate-180" />
            </button>
          </GlassPanel>
        </motion.div>

        {/* Cons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GlassPanel className="p-5 h-full flex flex-col justify-between border-amber-500/20 bg-amber-950/10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                </div>
                <h4 className="text-sm font-bold text-white">Cons</h4>
              </div>

              <ul className="space-y-3">
                {data.cons.slice(0, 3).map((con) => (
                  <li
                    key={con.id}
                    className="flex items-start gap-2.5 text-xs text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{con.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="text-xs text-amber-400 hover:text-amber-300 font-semibold pt-4 flex items-center gap-1">
              <span>View all</span>
              <ArrowLeft className="w-3 h-3 rotate-180" />
            </button>
          </GlassPanel>
        </motion.div>
      </div>

      {/* Suggested Counter-Clauses Card matching bottom of reference image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <GlassPanel className="p-6 bg-gradient-to-r from-violet-950/30 via-black/60 to-red-950/30 border border-violet-500/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Suggested Counter-Clauses
                </h4>
                <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
                  Add a liability cap (e.g., 12 months&apos; value), narrow non-compete to 6 months, and termination clause with 30-day notice.
                </p>
              </div>
            </div>

            <Link href={`/reports/${resolvedParams.id || "influencer-agreement"}`}>
              <button className="btn-primary px-5 py-2.5 text-xs font-semibold whitespace-nowrap shadow-lg shadow-red-600/30">
                View Full Details
              </button>
            </Link>
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
