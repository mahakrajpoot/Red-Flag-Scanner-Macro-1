"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Search,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Lock,
  Unlock,
  Calendar,
  Server,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { sampleDomains, PhishingInspectionResult } from "@/data/demo-data";
import { cn } from "@/lib/utils";

export default function DomainInspectorPage() {
  const [query, setQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<PhishingInspectionResult>(
    sampleDomains[0]
  );
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (domainToScan?: PhishingInspectionResult) => {
    setIsScanning(true);
    setTimeout(() => {
      if (domainToScan) {
        setSelectedDomain(domainToScan);
        setQuery(domainToScan.url);
      } else if (query.trim()) {
        const found = sampleDomains.find(
          (d) =>
            d.hostname.toLowerCase().includes(query.toLowerCase()) ||
            d.url.toLowerCase().includes(query.toLowerCase())
        );
        if (found) {
          setSelectedDomain(found);
        } else {
          // Fallback simulation for custom query
          setSelectedDomain({
            url: query.startsWith("http") ? query : `https://${query}`,
            hostname: query.replace(/https?:\/\//, "").split("/")[0],
            trustScore: 45,
            status: "SUSPICIOUS",
            domainAgeDays: 19,
            domainCreatedDate: "2026-08-25",
            sslValid: true,
            sslIssuer: "Cloudflare Inc ECC CA-3",
            sslExpiresDays: 90,
            typosquattingDetected: false,
            targetBrandSpoofed: null,
            registrar: "GoDaddy LLC",
            ipAddress: "172.67.142.88",
            country: "United States",
            threatsFound: [
              {
                title: "Recently Registered Domain (< 30 Days)",
                severity: "MEDIUM",
                description:
                  "This domain was registered less than a month ago. Exercise caution when entering personal or financial details.",
              },
            ],
            recommendations: [
              "Verify domain origin before submitting credentials.",
              "Look for official multi-factor authentication triggers.",
            ],
          });
        }
      }
      setIsScanning(false);
    }, 600);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SAFE":
        return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
      case "SUSPICIOUS":
        return "text-amber-400 border-amber-500/30 bg-amber-500/10";
      case "DANGEROUS":
        return "text-rose-400 border-rose-500/30 bg-rose-500/10";
      default:
        return "text-gray-400 border-gray-500/30 bg-gray-500/10";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 40) return "text-amber-400";
    return "text-rose-400";
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs text-red-400 font-semibold tracking-wider uppercase">
          <Globe className="w-3.5 h-3.5" />
          <span>Security Threat Intelligence</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Domain & Phishing Inspector
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Detect deceptive websites, typosquatting brand spoof attacks, and malicious payment gateways in real-time.
        </p>
      </div>

      {/* URL Input & Scanner Bar */}
      <GlassPanel className="p-4 border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleScan();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Paste suspicious website URL or domain (e.g. paypa1-security.com)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-red-500/50"
            />
          </div>
          <button
            type="submit"
            disabled={isScanning}
            className="btn-primary px-5 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Inspecting...</span>
              </>
            ) : (
              <>
                <Globe className="w-4 h-4" />
                <span>Inspect URL</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Sample Presets */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/5 text-xs">
          <span className="text-gray-400 font-medium">Sample Inspections:</span>
          {sampleDomains.map((domain) => (
            <button
              key={domain.hostname}
              type="button"
              onClick={() => handleScan(domain)}
              className={cn(
                "px-2.5 py-1 rounded-lg border transition-all text-xs font-mono",
                selectedDomain.hostname === domain.hostname
                  ? "bg-white/10 border-red-500/50 text-white"
                  : "bg-white/[0.02] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.05]"
              )}
            >
              {domain.hostname}
            </button>
          ))}
        </div>
      </GlassPanel>

      {/* Main Inspection Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Trust Score & Infrastructure Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Trust Score Card */}
          <GlassPanel className="p-6 border-white/10 text-center space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Threat Analysis
              </span>
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wide",
                  getStatusColor(selectedDomain.status)
                )}
              >
                {selectedDomain.status}
              </span>
            </div>

            {/* Score Ring */}
            <div className="py-2">
              <div
                className={cn(
                  "text-6xl font-black font-mono tracking-tight",
                  getScoreColor(selectedDomain.trustScore)
                )}
              >
                {selectedDomain.trustScore}
                <span className="text-2xl text-gray-500 font-normal">/100</span>
              </div>
              <div className="text-xs text-gray-400 font-semibold uppercase mt-1 tracking-wider">
                Website Trust Index
              </div>
            </div>

            {/* Typosquatting Alert Box */}
            {selectedDomain.typosquattingDetected && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-left space-y-1.5"
              >
                <div className="font-bold flex items-center gap-1.5 text-rose-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Typosquatting Spoof Attack Detected</span>
                </div>
                <p className="leading-relaxed">
                  Impersonating official brand{" "}
                  <strong className="text-white font-semibold">
                    {selectedDomain.targetBrandSpoofed}
                  </strong>{" "}
                  with deceptive letter/character substitutions.
                </p>
              </motion.div>
            )}
          </GlassPanel>

          {/* Domain Infrastructure Metadata */}
          <GlassPanel className="p-5 border-white/10 space-y-4">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-white/10">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>Domain & Infrastructure Metadata</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Domain Age */}
              <div className="p-3 rounded-xl bg-obsidian border border-white/5 space-y-1">
                <span className="text-[10px] text-gray-500 uppercase font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>Domain Age</span>
                </span>
                <div
                  className={cn(
                    "font-bold font-mono text-sm",
                    selectedDomain.domainAgeDays < 14
                      ? "text-rose-400"
                      : "text-gray-200"
                  )}
                >
                  {selectedDomain.domainAgeDays} Days Old
                </div>
                <div className="text-[10px] text-gray-500">
                  Created: {selectedDomain.domainCreatedDate}
                </div>
              </div>

              {/* SSL Certificate */}
              <div className="p-3 rounded-xl bg-obsidian border border-white/5 space-y-1">
                <span className="text-[10px] text-gray-500 uppercase font-semibold flex items-center gap-1">
                  {selectedDomain.sslValid ? (
                    <Lock className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Unlock className="w-3 h-3 text-rose-400" />
                  )}
                  <span>SSL Status</span>
                </span>
                <div
                  className={cn(
                    "font-bold font-mono text-sm",
                    selectedDomain.sslValid ? "text-emerald-400" : "text-rose-400"
                  )}
                >
                  {selectedDomain.sslValid ? "Valid SSL" : "Untrusted / Invalid"}
                </div>
                <div
                  className="text-[10px] text-gray-500 truncate"
                  title={selectedDomain.sslIssuer}
                >
                  {selectedDomain.sslIssuer}
                </div>
              </div>

              {/* Registrar */}
              <div className="p-3 rounded-xl bg-obsidian border border-white/5 space-y-1">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">
                  Registrar
                </span>
                <div
                  className="font-semibold text-gray-200 truncate text-xs"
                  title={selectedDomain.registrar}
                >
                  {selectedDomain.registrar}
                </div>
              </div>

              {/* Host IP / Country */}
              <div className="p-3 rounded-xl bg-obsidian border border-white/5 space-y-1">
                <span className="text-[10px] text-gray-500 uppercase font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>Host IP</span>
                </span>
                <div className="font-mono text-gray-200 text-xs truncate">
                  {selectedDomain.ipAddress}
                </div>
                <div className="text-[10px] text-gray-400 truncate">
                  {selectedDomain.country}
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* Right Column: Threat Alerts & Action Checklist (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Threat Alerts List */}
          <GlassPanel className="p-6 border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Identified Security Threats & Vulnerabilities</span>
              </h3>
              <span className="text-[11px] font-semibold text-gray-400">
                {selectedDomain.threatsFound.length} Threat Signals
              </span>
            </div>

            {selectedDomain.threatsFound.length === 0 ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                <CheckCircle2 className="w-9 h-9 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-emerald-300 text-sm">
                  No Active Phishing Threats Detected
                </h4>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  Domain has an established registration history, valid SSL certificates, and no known typosquatting signatures.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDomain.threatsFound.map((threat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-obsidian border border-white/5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-xs text-white flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{threat.title}</span>
                      </h4>
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase border shrink-0",
                          threat.severity === "HIGH"
                            ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                            : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        )}
                      >
                        {threat.severity} RISK
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed pl-5.5">
                      {threat.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </GlassPanel>

          {/* Action Recommendations Checklist */}
          <GlassPanel className="p-6 border-white/10 space-y-4">
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-white/10">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Recommended Security Advisor Actions</span>
            </h3>

            <ul className="space-y-2.5 text-xs">
              {selectedDomain.recommendations.map((rec, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-obsidian border border-white/5 text-gray-300"
                >
                  <span className="font-bold text-cyan-400 mt-0.5">•</span>
                  <span className="leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
