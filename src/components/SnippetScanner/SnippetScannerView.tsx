import React, { useState } from 'react';
import type { SnippetAnalysis } from '../../types';
import { SAMPLE_SNIPPETS } from '../../data/sampleSnippets';
import { 
  Zap, 
  Sparkles, 
  Copy, 
  Check, 
  AlertTriangle, 
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

export const SnippetScannerView: React.FC = () => {
  const [activeSnippetIndex, setActiveSnippetIndex] = useState<number>(0);
  const [customInput, setCustomInput] = useState<string>('');
  const [currentAnalysis, setCurrentAnalysis] = useState<SnippetAnalysis>(SAMPLE_SNIPPETS[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSelectPreset = (index: number) => {
    setActiveSnippetIndex(index);
    setCustomInput('');
    setCurrentAnalysis(SAMPLE_SNIPPETS[index]);
  };

  const handleScanCustom = () => {
    if (!customInput.trim()) return;

    setIsScanning(true);

    setTimeout(() => {
      // Simulate real-time micro-analysis calculation
      const hasIndemn = customInput.toLowerCase().includes('indemn') || customInput.toLowerCase().includes('hold harmless');
      const hasIp = customInput.toLowerCase().includes('ip') || customInput.toLowerCase().includes('invention') || customInput.toLowerCase().includes('assign');
      const hasRenew = customInput.toLowerCase().includes('renew') || customInput.toLowerCase().includes('notice');

      const customAnalysis: SnippetAnalysis = {
        id: `custom-snip-${Date.now()}`,
        inputSnippet: customInput,
        severity: hasIndemn || hasIp ? 'HIGH' : hasRenew ? 'MEDIUM' : 'LOW',
        riskScore: hasIndemn ? 88 : hasIp ? 91 : hasRenew ? 64 : 35,
        category: hasIndemn ? 'Uncapped Liability Risk' : hasIp ? 'Intellectual Property Grab' : 'General Contract Term',
        riskTags: hasIndemn 
          ? ['Indemnification', 'Legal Cost Burden', 'Uncapped Risk'] 
          : hasIp 
          ? ['IP Transfer', 'Pre-Existing Ownership', 'Work-For-Hire'] 
          : ['Notice Period', 'Term Commitment'],
        explanation: 'AI Scan detected restrictive language that shifts liability and rights disproportionately onto your party.',
        saferAlternative: customInput.replace(/irrevocably assigns|hold harmless/gi, 'grants non-exclusive license to Work Product') + ' (Liability capped at fees paid).'
      };

      setCurrentAnalysis(customAnalysis);
      setIsScanning(false);
    }, 600);
  };

  const handleCopyAlternative = () => {
    navigator.clipboard.writeText(currentAnalysis.saferAlternative);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Title Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Micro-Snippet Scanner
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              INSTANT CLAUSE AUDIT
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Paste any single contract clause or legal snippet for immediate micro-analysis, risk tagging, and AI safer re-writing.
          </p>
        </div>

        {/* Preset Sample Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-400 font-semibold mr-1">Presets:</span>
          {SAMPLE_SNIPPETS.map((snip, idx) => (
            <button
              key={snip.id}
              onClick={() => handleSelectPreset(idx)}
              className={`px-3 py-1 rounded-xl text-xs font-medium border transition ${
                activeSnippetIndex === idx && !customInput
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {snip.category.split(' ')[0]} Clause
            </button>
          ))}
        </div>
      </div>

      {/* Main Input & Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Input Clause Area (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Clause Text Input</span>
              </label>
              <span className="text-[10px] text-slate-500">Paste 1-3 sentences</span>
            </div>

            <textarea
              rows={8}
              placeholder="Paste indemnification, non-compete, IP assignment, or termination clause here..."
              value={customInput || currentAnalysis.inputSnippet}
              onChange={(e) => {
                setCustomInput(e.target.value);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 font-mono leading-relaxed placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => {
                  setCustomInput('');
                  setCurrentAnalysis(SAMPLE_SNIPPETS[0]);
                }}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                Clear input
              </button>

              <button
                onClick={handleScanCustom}
                disabled={isScanning}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-amber-950/50 transition transform active:scale-95"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Scanning Clause...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Run Micro-Scan</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: AI Analysis & Safe Rewrite Card (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            
            {/* Top Score & Risk Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Clause Risk Assessment
                </span>
                <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                  <span>{currentAnalysis.category}</span>
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                {/* Score badge */}
                <div className="text-right">
                  <div className="text-xl font-extrabold text-amber-400 font-mono">
                    {currentAnalysis.riskScore}/100
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Risk Score</div>
                </div>

                <span className={`px-3 py-1 rounded-xl text-xs font-bold border uppercase tracking-wider ${
                  currentAnalysis.severity === 'HIGH' 
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : currentAnalysis.severity === 'MEDIUM'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {currentAnalysis.severity} SEVERITY
                </span>
              </div>
            </div>

            {/* Risk Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 font-semibold mr-1">Risk Tags:</span>
              {currentAnalysis.riskTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-950 text-slate-300 border border-slate-800"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Plain-English Explanation */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>What This Means For You</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentAnalysis.explanation}
              </p>
            </div>

            {/* AI Recommended Safer Alternative Clause */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>AI Recommended Safer Clause Counter-Offer</span>
                </div>

                <button
                  onClick={handleCopyAlternative}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Safer Clause</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-emerald-900/60 font-mono text-xs text-emerald-200 leading-relaxed">
                "{currentAnalysis.saferAlternative}"
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
