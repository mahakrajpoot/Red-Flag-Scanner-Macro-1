"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Shield,
  FileCheck2,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Calendar,
  Printer,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { demoAnalysis } from "@/data/demo-data";
import { exportToPDF } from "@/lib/pdf-export";
import { formatDate } from "@/lib/utils";

export default function ReportPage() {
  const [isExporting, setIsExporting] = useState(false);
  const data = demoAnalysis;

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    try {
      await exportToPDF("printable-report", `${data.documentName}_Risk_Report.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Navigation and Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/history"
          className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to History</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="btn-secondary px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 hidden sm:flex"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-2 shadow-lg shadow-red-600/30"
          >
            {isExporting ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>{isExporting ? "Generating..." : "Download PDF"}</span>
          </button>
        </div>
      </div>

      {/* Printable Document Container matching Reference 8 */}
      <div
        id="printable-report"
        className="rounded-2xl p-8 md:p-12 shadow-2xl border border-white/15 bg-white text-gray-900"
      >
        {/* Document Header with Logo */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-gray-900">
                Red Flag <span className="text-red-600">Scanner</span>
              </h2>
              <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
                AI Legal & Risk Audit
              </p>
            </div>
          </div>

          <div className="text-right">
            <h1 className="text-xl font-bold text-gray-900">
              Executive Summary Report
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {data.documentName} • {formatDate(data.scannedAt)}
            </p>
          </div>
        </div>

        {/* Top Split: Risk Score Card & Key Findings */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* Risk Score */}
          <div className="md:col-span-5 rounded-2xl bg-red-50 border border-red-200 p-6 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              Total Risk Score
            </span>
            <div className="my-2">
              <span className="text-5xl font-extrabold text-red-600">78</span>
              <span className="text-2xl text-gray-400 font-semibold">/100</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white uppercase tracking-wider">
              High Risk
            </span>
          </div>

          {/* Key Findings */}
          <div className="md:col-span-7 rounded-2xl bg-gray-50 border border-gray-200 p-6 flex flex-col justify-center">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Key Findings
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-red-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>3 Red Flags Identified (Immediate attention required)</span>
              </li>
              <li className="flex items-center gap-2 text-amber-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>2 Areas of Concern (Review terms before signing)</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>5 Positive Aspects (Favorable and clear provisions)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sections Grid: Top Red Flags & Suggested Counter-Clauses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Red Flags */}
          <div className="rounded-2xl border border-gray-200 p-5 bg-white">
            <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Top Red Flags</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-700">
              {data.redFlags.map((flag) => (
                <li key={flag.id} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-gray-900">{flag.title}:</strong>{" "}
                    {flag.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Counter-Clauses */}
          <div className="rounded-2xl border border-gray-200 p-5 bg-white">
            <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Suggested Counter-Clauses</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-700">
              {data.counterClauses.map((cc) => (
                <li key={cc.id} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-gray-900">Revision:</strong>{" "}
                    {cc.suggested}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500">
          <span>Generated by Red Flag Scanner • Confidential Audit</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
}
