import React, { useState } from 'react';
import type { SnippetAnalysis, TabType } from '../../types';
import { SAMPLE_SNIPPETS } from '../../data/sampleSnippets';
import { 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2,
  RefreshCw,
  Scissors,
  ArrowLeft,
  ChevronRight,
  Zap
} from 'lucide-react';

interface SnippetFastScanViewProps {
  onNavigate: (tab: TabType) => void;
}

export const SnippetFastScanView: React.FC<SnippetFastScanViewProps> = ({ onNavigate }) => {
  const [inputClause, setInputClause] = useState<string>('');
  const [currentAnalysis, setCurrentAnalysis] = useState<SnippetAnalysis | null>(SAMPLE_SNIPPETS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const samplePills = [
    { label: '📌 NDA Indemnification', snippet: SAMPLE_SNIPPETS[1].inputSnippet },
    { label: '📌 36-Month Non-Compete', snippet: 'Neither party shall solicit, recruit, or hire any employee or contractor of the other party during the term and for 36 months thereafter.' },
    { label: '📌 Pre-Existing IP Seizure', snippet: SAMPLE_SNIPPETS[0].inputSnippet },
    { label: '📌 Auto-Renewal 15% Escalation', snippet: SAMPLE_SNIPPETS[2].inputSnippet }
  ];

  const handleSelectPreset = (snippetText: string) => {
    setInputClause(snippetText);
  };

  const handleAnalyze = () => {
    if (!inputClause.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const lower = inputClause.toLowerCase();
      const matched = SAMPLE_SNIPPETS.find(s => lower.includes(s.category.toLowerCase()) || s.inputSnippet.toLowerCase().slice(0, 30) === lower.slice(0, 30));
      
      if (matched) {
        setCurrentAnalysis(matched);
      } else {
        const hasIndemn = lower.includes('indemn') || lower.includes('hold harmless');
        const hasNonCompete = lower.includes('non-compete') || lower.includes('solicit') || lower.includes('hire');
        const custom: SnippetAnalysis = {
          id: `snip-${Date.now()}`,
          inputSnippet: inputClause,
          severity: hasIndemn || hasNonCompete ? 'HIGH' : 'MEDIUM',
          riskScore: hasIndemn ? 88 : hasNonCompete ? 85 : 55,
          category: hasIndemn ? 'Uncapped Indemnification Burden' : hasNonCompete ? 'Restrictive Non-Solicitation Covenant' : 'Operational Contract Exposure',
          riskTags: hasIndemn ? ['Indemnity Burden', 'Uncapped Liability', 'Third-Party Claims'] : ['Restrictive Covenant', 'Hiring Restriction'],
          explanation: 'AI Scan detected restrictive legal phrasing shifting unilateral risk or imposing non-standard commercial restrictions.',
          saferAlternative: hasIndemn 
            ? 'Contractor liability under this clause shall be limited solely to direct damages capped at fees received under this SOW in the prior 6 months.'
            : 'Neither party shall directly solicit key employees of the other party during the term and for 12 months post-termination.'
        };
        setCurrentAnalysis(custom);
      }
      setIsAnalyzing(false);
    }, 600);
  };

  const handleCopy = () => {
    if (!currentAnalysis) return;
    navigator.clipboard.writeText(currentAnalysis.saferAlternative);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto">
      
      {/* Breadcrumb Navigation Header */}
      <div className="flex items-center space-x-2 text-xs text-slate-400">
        <button onClick={() => onNavigate('dashboard')} className="hover:text-slate-200 transition flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-[#FFB300] font-semibold">Micro-Snippet Fast-Scan</span>
      </div>

      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2333] pb-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
            <span>Micro-Snippet Fast-Scan</span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#FFB300]/15 text-[#FFB300] border border-[#FFB300]/30 tracking-wider uppercase">
              INSTANT PARSER
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Paste isolated contract clauses or email excerpts for sub-second AI risk analysis & revised counter-offer suggestions.
          </p>
        </div>
      </div>

      {/* Main Input Textarea Card */}
      <div className="bg-[#111625] border border-[#1C2333] rounded-2xl p-6 shadow-2xl space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
            <Scissors className="w-4 h-4 text-[#FFB300]" />
            <span>Paste Clause Text Below</span>
          </label>
        </div>

        {/* Quick Sample Prompt Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-bold text-slate-400">Try Preset Pill:</span>
          {samplePills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(pill.snippet)}
              className="px-3 py-1 rounded-xl bg-[#0B0F19] hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition"
            >
              {pill.label}
            </button>
          ))}
        </div>

        <textarea
          rows={6}
          placeholder="Paste short contract clause, NDA excerpt, or agreement snippet here..."
          value={inputClause}
          onChange={(e) => setInputClause(e.target.value)}
          className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl p-4 text-xs text-slate-200 font-mono leading-relaxed placeholder-slate-600 focus:outline-none focus:border-[#FFB300]"
        />

        <div className="flex justify-end pt-2">
          <button
            onClick={handleAnalyze}
            disabled={!inputClause.trim() || isAnalyzing}
            className="px-6 py-3 rounded-xl bg-[#FFB300] hover:bg-[#FFA000] text-[#060913] font-black text-xs shadow-lg shadow-amber-950/40 disabled:opacity-40 flex items-center space-x-2 transition transform active:scale-95"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Micro-Scan...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Instant Clause Micro-Scan</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Analysis Output Section Card */}
      {currentAnalysis && (
        <div className="bg-[#111625] border border-[#1C2333] rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in duration-300">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1C2333] pb-4 gap-3">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Risk Classification
              </span>
              <h3 className="text-lg font-black text-white mt-0.5">
                {currentAnalysis.category}
              </h3>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right font-mono">
                <div className="text-2xl font-black text-[#FF2A5F]">
                  {currentAnalysis.riskScore}/100
                </div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Risk Index</div>
              </div>

              <span className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase ${
                currentAnalysis.severity === 'HIGH' 
                  ? 'bg-[#FF2A5F]/20 text-[#FF2A5F] border border-[#FF2A5F]/40 shadow-glow-red' 
                  : 'bg-[#FFB300]/20 text-[#FFB300] border border-[#FFB300]/40'
              }`}>
                {currentAnalysis.severity} SEVERITY
              </span>
            </div>
          </div>

          {/* Risk Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-1">Risk Hashtags:</span>
            {currentAnalysis.riskTags.map((tag, idx) => (
              <span key={idx} className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#0B0F19] text-[#00F0FF] border border-slate-800">
                #{tag}
              </span>
            ))}
          </div>

          {/* Layperson Explanation */}
          <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-2">
            <div className="text-xs font-extrabold text-[#FFB300] uppercase tracking-wider flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-[#FFB300]" />
              <span>Layperson / Plain-English Explanation</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentAnalysis.explanation}
            </p>
          </div>

          {/* Revised Counter-Offer Revision Suggestion */}
          <div className="p-4 rounded-xl bg-[#00E676]/10 border border-[#00E676]/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-extrabold text-[#00E676] uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                <span>AI Safer Revised Counter-Offer Suggestion</span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#00E676]/20 hover:bg-[#00E676]/30 text-[#00E676] text-xs font-bold transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Clause'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B0F19] font-mono text-xs text-emerald-200 leading-relaxed border border-emerald-900/60 shadow-inner">
              "{currentAnalysis.saferAlternative}"
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
