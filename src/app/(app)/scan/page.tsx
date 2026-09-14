"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCode2,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { useScanningAnimation } from "@/hooks/use-scanning-animation";

export default function ScanPage() {
  const router = useRouter();
  const [pastedText, setPastedText] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { steps, isScanning, currentStep, isComplete, startScan } =
    useScanningAnimation();

  const handleUseSample = () => {
    setSelectedFile("Influencer_Agreement.pdf (2.4 MB)");
    setPastedText(
      "THIS INFLUENCER MARKETING AGREEMENT is made between Brand Inc. and Creator. Section 4.2: The creator shall be liable for all damages arising from breach of this agreement without limitation. Section 5.3: The creator shall not work with any competing brands for 2 years following termination. Section 8.1: This agreement automatically renews for 12 months unless 90 days written notice is given..."
    );
  };

  const handleStartAnalysis = () => {
    startScan();
    // After animation completes, redirect to result page
    setTimeout(() => {
      router.push("/scan/influencer-agreement");
    }, 6200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Full Document Red Flag Scanner
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Upload a contract or PDF to analyze risks, get insights and suggestions.
        </p>
      </div>

      {/* Analysis Overlay Modal / Animated scanning state */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel-strong p-8 max-w-md w-full border border-red-500/30 shadow-2xl relative overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-violet-500 to-pink-500 animate-pulse" />

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/30 mx-auto flex items-center justify-center mb-3">
                  <Sparkles className="w-7 h-7 text-red-400 animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Scanning Document
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  AI is analyzing clauses, liability risks, and red flags...
                </p>
              </div>

              {/* Steps Progress */}
              <div className="space-y-3">
                {steps.map((step, idx) => {
                  const isDone = step.status === "complete";
                  const isActive = step.status === "active";

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                        isActive
                          ? "bg-red-500/10 border border-red-500/30"
                          : isDone
                          ? "bg-white/[0.04] border border-white/[0.05]"
                          : "opacity-40"
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : isActive ? (
                          <div className="w-4 h-4 rounded-full border-2 border-red-400 border-t-transparent animate-spin" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-gray-500" />
                        )}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          isActive
                            ? "text-red-300 font-semibold"
                            : isDone
                            ? "text-gray-200"
                            : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Split: Upload Area & Sample Contract Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Drag & Drop Area */}
        <div className="md:col-span-8">
          <GlassPanel className="p-8 border-dashed border-2 border-white/15 hover:border-red-500/40 transition-all text-center flex flex-col items-center justify-center min-h-[260px] group cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 group-hover:bg-red-500/20 border border-red-500/20 flex items-center justify-center mb-4 transition-all group-hover:scale-105">
              <UploadCloud className="w-8 h-8 text-red-400" />
            </div>

            <h3 className="text-base font-semibold text-white">
              Drag & drop your file here
            </h3>
            <p className="text-xs text-gray-400 mt-1 mb-4">
              or click to upload (PDF, DOCX, up to 10MB)
            </p>

            {selectedFile && (
              <div className="mb-4 px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                <span>{selectedFile}</span>
              </div>
            )}

            <button
              onClick={() => handleUseSample()}
              className="btn-primary px-5 py-2.5 text-xs font-semibold flex items-center gap-2"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload Document</span>
            </button>
          </GlassPanel>
        </div>

        {/* Sample Contract Quick Select */}
        <div className="md:col-span-4">
          <GlassPanel className="p-6 h-full flex flex-col justify-between border-white/10">
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Sample Contract
              </span>
              <div className="mt-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-red-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    Influencer_Agreement.pdf
                  </p>
                  <p className="text-xs text-gray-400">2.4 MB</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleUseSample}
              className="btn-secondary w-full py-2.5 text-xs font-semibold mt-4 hover:border-red-500/40 hover:text-white transition-all"
            >
              Use Sample
            </button>
          </GlassPanel>
        </div>
      </div>

      {/* Or Paste Document Text Section */}
      <GlassPanel className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-white flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-violet-400" />
              <span>Or paste document text</span>
            </label>
            <span className="text-xs text-gray-400">
              {pastedText.length} characters
            </span>
          </div>

          <textarea
            rows={6}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste your contract or legal clause text here..."
            className="glass-input w-full p-4 text-sm font-mono text-gray-200 resize-none bg-black/40 border-white/10 focus:border-red-500/50 rounded-xl"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                We support PDF, DOCX and TXT files. Max file size: 10MB.
              </span>
            </div>

            <button
              onClick={handleStartAnalysis}
              className="btn-primary w-full sm:w-auto px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Document</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
