"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  FileCheck2,
  Copy,
  Check,
  RotateCcw,
  Clock,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { RiskBadge } from "@/components/ui/risk-badge";
import {
  clauseExamples,
  clauseScanResults,
  ClauseScanResult,
} from "@/data/demo-data";

export default function FastScannerPage() {
  const [clauseText, setClauseText] = useState(clauseExamples["Non-Compete"]);
  const [selectedExample, setSelectedExample] = useState<string>("Non-Compete");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ClauseScanResult | null>(
    clauseScanResults["Non-Compete"]
  );
  const [copied, setCopied] = useState(false);

  const handleSelectExample = (category: string) => {
    setSelectedExample(category);
    setClauseText(clauseExamples[category] || "");
    if (clauseScanResults[category]) {
      setResult(clauseScanResults[category]);
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Find matching result or create dynamic result
      const found = clauseScanResults[selectedExample] || {
        riskLevel: "medium",
        plainEnglish:
          "This clause outlines operational obligations and liability scopes between the involved parties.",
        whyItMatters:
          "Without clear limits or symmetric definitions, obligations can create unexpected costs or lock you into one-sided terms.",
        saferRevision:
          "Consider inserting reasonable monetary caps, bilateral remedy periods of 30 days, and mutual definitions.",
      };
      setResult(found);
      setIsScanning(false);
    }, 800);
  };

  const handleCopyRevision = () => {
    if (result) {
      navigator.clipboard.writeText(result.saferRevision);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const recentScans = [
    {
      title: "Non-Compete Clause",
      date: "Jun 10, 2025 • 2:17 PM",
      risk: "high" as const,
      category: "Non-Compete",
    },
    {
      title: "Indemnification Clause",
      date: "Jun 8, 2025 • 10:24 AM",
      risk: "medium" as const,
      category: "Indemnification",
    },
    {
      title: "Termination Clause",
      date: "Jun 5, 2025 • 11:25 AM",
      risk: "low" as const,
      category: "Termination",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Zap className="w-7 h-7 text-red-500" />
          <span>Micro-Snippet Fast Scanner</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Paste a single clause (e.g. Non-Compete, Indemnification) for instant translation and safer revision.
        </p>
      </div>

      {/* Main Clause Input Area */}
      <GlassPanel className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Paste Clause Here...
            </span>
            <span className="text-xs text-gray-500">
              {clauseText.length}/2000
            </span>
          </div>

          <textarea
            rows={5}
            maxLength={2000}
            value={clauseText}
            onChange={(e) => setClauseText(e.target.value)}
            placeholder="Example: Non-Compete Clause&#10;The employee shall not work for any competing business for a period of 2 years after termination."
            className="glass-input w-full p-4 text-sm font-sans text-gray-100 bg-black/40 border-white/10 focus:border-red-500/50 rounded-xl resize-none"
          />

          {/* Example Chips & Scan Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <div className="space-y-2">
              <span className="text-xs text-gray-400 block font-medium">
                Example Scans:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {Object.keys(clauseExamples).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSelectExample(key)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedExample === key
                        ? "bg-red-500/20 text-red-300 border border-red-500/40"
                        : "bg-white/[0.05] text-gray-400 hover:text-white border border-white/[0.08]"
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleScan}
              disabled={isScanning || !clauseText.trim()}
              className="btn-primary w-full sm:w-auto px-6 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 shrink-0"
            >
              {isScanning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <span>Scan Clause</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </GlassPanel>

      {/* Analysis Output Section */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.plainEnglish}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <GlassPanel className="p-6 md:p-8 space-y-6 border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Instant Clause Analysis
                    </h3>
                    <p className="text-xs text-gray-400">
                      AI Legal Intelligence breakdown
                    </p>
                  </div>
                </div>

                <RiskBadge level={result.riskLevel} size="md" />
              </div>

              {/* 3 Result Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Plain English */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Plain-English Explanation
                  </span>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {result.plainEnglish}
                  </p>
                </div>

                {/* Why It Matters */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Why It Matters
                  </span>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {result.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Safer Revision Box */}
              <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4" />
                    <span>Safer Revision (Recommended Counter-Clause)</span>
                  </span>

                  <button
                    onClick={handleCopyRevision}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Revision</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-sm text-gray-100 font-mono italic leading-relaxed bg-black/40 p-3.5 rounded-lg border border-emerald-500/20">
                  {result.saferRevision}
                </p>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Clause Scans Strip */}
      <GlassPanel className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>Recent Clause Scans</span>
            </h3>
          </div>

          <div className="space-y-2">
            {recentScans.map((scan) => (
              <div
                key={scan.title}
                onClick={() => handleSelectExample(scan.category)}
                className="group p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] flex items-center justify-between cursor-pointer transition-all"
              >
                <div>
                  <p className="text-xs font-semibold text-white group-hover:text-red-300 transition-colors">
                    {scan.title}
                  </p>
                  <p className="text-[11px] text-gray-500">{scan.date}</p>
                </div>

                <div className="flex items-center gap-3">
                  <RiskBadge level={scan.risk} />
                  <span className="text-xs text-gray-400 group-hover:text-white flex items-center gap-1">
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
