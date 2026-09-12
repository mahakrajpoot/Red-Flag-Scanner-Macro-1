import React, { useState } from 'react';
import type { DocumentAnalysisReport, RedFlagItem } from '../../types';
import { RiskGauge } from './RiskGauge';
import { 
  ShieldAlert, 
  ThumbsUp, 
  ThumbsDown, 
  AlertTriangle, 
  Lightbulb, 
  BookOpen, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface AnalysisReportProps {
  report: DocumentAnalysisReport;
  onHoverClause?: (clauseId: string | null) => void;
  onOpenChatWithClause?: (clause: RedFlagItem) => void;
}

export const AnalysisReport: React.FC<AnalysisReportProps> = ({
  report,
  onHoverClause,
  onOpenChatWithClause
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [expandedFlagId, setExpandedFlagId] = useState<string | null>(report.redFlags[0]?.id || null);

  const filteredFlags = report.redFlags.filter((flag) => {
    if (activeFilter === 'ALL') return true;
    return flag.severity === activeFilter;
  });

  const getSeverityBadge = (severity: 'HIGH' | 'MEDIUM' | 'LOW') => {
    switch (severity) {
      case 'HIGH':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'MEDIUM':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'LOW':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
      
      {/* Header with Risk Overview */}
      <div className="p-5 border-b border-slate-800 bg-slate-950/70">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left: Overall Risk Score Gauge */}
          <RiskGauge score={report.overallRiskScore} riskLevel={report.riskLevel} size="md" />

          {/* Right: Summary & Stats */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Executive Summary</span>
              </span>
              <span className="text-[11px] text-slate-400">
                {report.redFlags.length} Red Flags Detected
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              {report.summary}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <div className="text-sm font-bold text-rose-400">
                  {report.redFlags.filter(f => f.severity === 'HIGH').length}
                </div>
                <div className="text-[10px] text-rose-300/80 font-medium">Critical Risk</div>
              </div>

              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="text-sm font-bold text-amber-400">
                  {report.redFlags.filter(f => f.severity === 'MEDIUM').length}
                </div>
                <div className="text-[10px] text-amber-300/80 font-medium">Moderate Risk</div>
              </div>

              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-sm font-bold text-emerald-400">
                  {report.proList.length}
                </div>
                <div className="text-[10px] text-emerald-300/80 font-medium">Favorable Terms</div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Pros & Cons Split Section */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          
          {/* Favorable Pros */}
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Favorable Terms (Pros)</span>
            </div>
            <div className="space-y-1.5">
              {report.proList.map((pro) => (
                <div key={pro.id} className="text-xs p-2 rounded-lg bg-slate-900/60 border border-emerald-800/30">
                  <span className="font-semibold text-emerald-300">{pro.title}: </span>
                  <span className="text-slate-300">{pro.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Restrictive Cons */}
          <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Restrictive Terms (Cons)</span>
            </div>
            <div className="space-y-1.5">
              {report.conList.map((con) => (
                <div key={con.id} className="text-xs p-2 rounded-lg bg-slate-900/60 border border-rose-800/30">
                  <span className="font-semibold text-rose-300">{con.title}: </span>
                  <span className="text-slate-300">{con.description}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Red Flags Section Header & Filter */}
      <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <h3 className="font-bold text-xs text-slate-200 uppercase tracking-wider">
            Flagged Legal Clauses & Actionable Tips
          </h3>
        </div>

        {/* Severity Filter pills */}
        <div className="flex items-center space-x-1">
          {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setActiveFilter(lvl)}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition ${
                activeFilter === lvl
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Red Flags List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/20">
        {filteredFlags.map((flag) => {
          const isExpanded = expandedFlagId === flag.id;

          return (
            <div
              key={flag.id}
              onMouseEnter={() => onHoverClause && onHoverClause(flag.id)}
              onMouseLeave={() => onHoverClause && onHoverClause(null)}
              className={`rounded-xl border transition-all duration-200 ${
                isExpanded
                  ? 'bg-slate-900 border-slate-700 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Card Header Bar */}
              <div
                onClick={() => setExpandedFlagId(isExpanded ? null : flag.id)}
                className="p-3.5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${getSeverityBadge(flag.severity)}`}>
                    {flag.severity}
                  </span>

                  <div>
                    <h4 className="font-semibold text-xs text-slate-100 flex items-center space-x-2">
                      <span>{flag.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({flag.clauseNumber})</span>
                    </h4>
                    <span className="text-[10px] text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded mt-1 inline-block">
                      {flag.category}
                    </span>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90 text-rose-400' : ''}`} />
              </div>

              {/* Expanded Card Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-3 text-xs">
                  
                  {/* Original Legal Clause Text */}
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-300 leading-relaxed">
                    <div className="text-[10px] text-slate-500 font-sans font-bold uppercase mb-1 flex items-center space-x-1">
                      <BookOpen className="w-3 h-3 text-rose-400" />
                      <span>Original Clause Quote</span>
                    </div>
                    "{flag.originalText}"
                  </div>

                  {/* Plain English Breakdown */}
                  <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-rose-200">
                    <div className="text-[10px] text-rose-400 font-bold uppercase mb-1 flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Plain-English Translation</span>
                    </div>
                    {flag.plainEnglish}
                  </div>

                  {/* Actionable Negotiation Tip */}
                  <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-900/40 text-amber-200">
                    <div className="text-[10px] text-amber-400 font-bold uppercase mb-1 flex items-center space-x-1">
                      <Lightbulb className="w-3 h-3 text-amber-300" />
                      <span>Actionable Negotiation Tip</span>
                    </div>
                    {flag.actionableTip}
                  </div>

                  {/* Quick Action: Ask AI Assistant about this clause */}
                  {onOpenChatWithClause && (
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => onOpenChatWithClause(flag)}
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-[11px] font-semibold transition"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Ask AI Chat about {flag.clauseNumber}</span>
                      </button>
                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
