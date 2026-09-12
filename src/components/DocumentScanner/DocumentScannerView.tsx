import React, { useState } from 'react';
import type { DocumentAnalysisReport } from '../../types';
import { 
  ArrowLeft, 
  ZoomIn, 
  ZoomOut, 
  ShieldAlert, 
  Lightbulb, 
  FileText,
  UploadCloud,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

interface DocumentScannerViewProps {
  currentDoc: DocumentAnalysisReport;
  allDocs: DocumentAnalysisReport[];
  onSelectDoc: (doc: DocumentAnalysisReport) => void;
  onBackToDashboard: () => void;
  onCustomUpload: (fileName: string, text: string) => void;
  onNavigateToChat: (doc: DocumentAnalysisReport) => void;
}

export const DocumentScannerView: React.FC<DocumentScannerViewProps> = ({
  currentDoc,
  allDocs,
  onSelectDoc,
  onBackToDashboard,
  onCustomUpload,
  onNavigateToChat
}) => {
  const [activeTab, setActiveTab] = useState<'FLAGS' | 'PROS' | 'CONS'>('FLAGS');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'ALL' | 'Liability' | 'Termination' | 'IP Rights'>('ALL');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [, setHighlightedClauseId] = useState<string | null>(null);
  const [copiedTipId, setCopiedTipId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const filteredRedFlags = currentDoc.redFlags.filter(f => {
    if (activeCategoryFilter === 'ALL') return true;
    return f.category === activeCategoryFilter;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onCustomUpload(file.name, content || 'Uploaded document text content.');
    };
    reader.readAsText(file);
  };

  const handleCopyTip = (id: string, tip: string) => {
    navigator.clipboard.writeText(tip);
    setCopiedTipId(id);
    setTimeout(() => setCopiedTipId(null), 2000);
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      
      {/* Breadcrumbs & Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <button onClick={onBackToDashboard} className="hover:text-white transition flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-[#00F0FF] font-semibold">Full Document Red Flag Scanner</span>
        </div>

        {/* Quick Sample Document Preset Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400">Load Preset Contract:</span>
          {allDocs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onSelectDoc(doc)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                currentDoc.id === doc.id
                  ? 'bg-[#00F0FF] text-[#060913] font-extrabold'
                  : 'bg-[#111625] hover:bg-slate-800 text-slate-300 border border-[#1C2333]'
              }`}
            >
              {doc.fileName.split('.')[0]}
            </button>
          ))}
        </div>

      </div>

      {/* Drag & Drop File Upload Header Section */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = (ev) => {
              onCustomUpload(file.name, (ev.target?.result as string) || 'Uploaded contract content.');
            };
            reader.readAsText(file);
          }
        }}
        className={`relative border-2 border-dashed rounded-2xl p-5 transition-all text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl ${
          dragActive
            ? 'border-[#00F0FF] bg-[#00F0FF]/10 shadow-glow-cyan'
            : 'border-slate-800 hover:border-slate-700 bg-[#111625]'
        }`}
      >
        <div className="flex items-center space-x-3 text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#0B0F19] border border-slate-800 flex items-center justify-center text-[#00F0FF]">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-sm">
              Upload Legal Contract for Instant AI Scan
            </h3>
            <p className="text-xs text-slate-400">
              Drag & Drop PDF or DOCX contract files here (or click browse) to extract liabilities & counter-clauses.
            </p>
          </div>
        </div>

        <div className="relative">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <button className="px-5 py-2.5 rounded-xl bg-[#00F0FF] hover:bg-[#00D8E6] text-[#060913] font-black text-xs shadow-lg shadow-cyan-950/40 transition">
            Browse Contract Files
          </button>
        </div>
      </div>

      {/* Two-Column Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Interactive Document Preview */}
        <div className="lg:col-span-7 bg-[#111625] border border-[#1C2333] rounded-2xl p-4 shadow-2xl space-y-3">
          
          {/* Document Preview Controls Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0B0F19] rounded-xl text-xs text-slate-300 border border-[#1C2333]">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#00F0FF]" />
              <span className="font-extrabold text-white">{currentDoc.fileName}</span>
              <span className="text-[10px] text-slate-500 font-mono">({currentDoc.contractType})</span>
            </div>

            <div className="flex items-center space-x-3 text-slate-400">
              <button onClick={() => setZoomLevel(Math.max(80, zoomLevel - 10))} className="hover:text-white p-1" title="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-white">{zoomLevel}%</span>
              <button onClick={() => setZoomLevel(Math.min(140, zoomLevel + 10))} className="hover:text-white p-1" title="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* White Paper Interactive Document Canvas */}
          <div 
            className="bg-white text-slate-900 rounded-xl p-8 shadow-inner space-y-6 overflow-y-auto max-h-[640px] font-sans leading-relaxed select-text"
            style={{ fontSize: `${(zoomLevel / 100) * 12.5}px` }}
          >
            <h2 className="text-center font-black text-slate-900 text-lg uppercase tracking-tight pb-3 border-b-2 border-slate-200">
              {currentDoc.fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}
            </h2>

            {currentDoc.documentSections.map((sec, idx) => {
              const isHigh = sec.severity === 'HIGH';
              const isMedium = sec.severity === 'MEDIUM';

              return (
                <div key={idx} className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    {sec.sectionTitle}
                  </h3>

                  {sec.isFlagged ? (
                    <div 
                      onMouseEnter={() => setHighlightedClauseId(sec.sectionTitle)}
                      onMouseLeave={() => setHighlightedClauseId(null)}
                      className={`p-3.5 rounded-xl transition-all border ${
                        isHigh
                          ? 'bg-rose-100/90 border-rose-400 text-rose-950 shadow-md ring-2 ring-rose-400/50'
                          : isMedium
                          ? 'bg-amber-100/90 border-amber-400 text-amber-950 shadow-md ring-2 ring-amber-400/50'
                          : 'bg-emerald-100/90 border-emerald-400 text-emerald-950'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                          isHigh ? 'bg-rose-600 text-white' : isMedium ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
                        }`}>
                          🚨 {sec.severity || 'FLAGGED'} EXPOSURE
                        </span>
                        <span className="text-[10px] font-mono font-bold opacity-75">Click details on right panel</span>
                      </div>
                      <p className="font-medium text-xs leading-relaxed whitespace-pre-line">
                        {sec.text}
                      </p>
                    </div>
                  ) : (
                    <p className="text-slate-700 text-xs whitespace-pre-line">
                      {sec.text}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column (5 cols): Executive Analysis Report */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Overall Risk Score Meter Card */}
          <div className="bg-[#111625] border border-[#1C2333] rounded-2xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  OVERALL RISK SCORE METER
                </span>
                
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className={`text-4xl font-black font-mono tracking-tight ${
                    currentDoc.riskLevel === 'HIGH' ? 'text-[#FF2A5F]' : currentDoc.riskLevel === 'MEDIUM' ? 'text-[#FFB300]' : 'text-[#00E676]'
                  }`}>
                    {currentDoc.overallRiskScore}
                  </span>
                  <span className="text-sm font-bold text-slate-500">/100</span>
                </div>

                <div className="mt-2">
                  {currentDoc.riskLevel === 'HIGH' && (
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#FF2A5F]/20 text-[#FF2A5F] border border-[#FF2A5F]/40 shadow-glow-red inline-flex items-center space-x-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>CRITICAL HIGH RISK</span>
                    </span>
                  )}
                  {currentDoc.riskLevel === 'MEDIUM' && (
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#FFB300]/20 text-[#FFB300] border border-[#FFB300]/40 shadow-glow-amber inline-flex items-center space-x-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>MODERATE RISK</span>
                    </span>
                  )}
                  {currentDoc.riskLevel === 'LOW' && (
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40 shadow-glow-emerald inline-flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>FAVORABLE LOW RISK</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Visual Ring Gauge */}
              <div className="w-16 h-16 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
                <div 
                  className={`w-full h-full rounded-full flex items-center justify-center ${
                    currentDoc.riskLevel === 'HIGH' ? 'bg-[#FF2A5F]/15 border-4 border-[#FF2A5F] text-[#FF2A5F]' : 'bg-[#FFB300]/15 border-4 border-[#FFB300] text-[#FFB300]'
                  }`}
                >
                  <ShieldAlert className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Executive Summary Box */}
            <p className="text-xs text-slate-300 leading-relaxed bg-[#0B0F19] p-3.5 rounded-xl border border-slate-800 font-medium">
              <strong className="text-white">Executive Summary: </strong>
              {currentDoc.summary}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-xl bg-[#FF2A5F]/10 border border-[#FF2A5F]/30">
                <div className="text-base font-black text-[#FF2A5F]">
                  {currentDoc.redFlags.filter(f => f.severity === 'HIGH').length}
                </div>
                <div className="text-[10px] text-[#FF2A5F] font-bold uppercase">Critical</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FFB300]/10 border border-[#FFB300]/30">
                <div className="text-base font-black text-[#FFB300]">
                  {currentDoc.redFlags.filter(f => f.severity === 'MEDIUM').length}
                </div>
                <div className="text-[10px] text-[#FFB300] font-bold uppercase">Moderate</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#00E676]/10 border border-[#00E676]/30">
                <div className="text-base font-black text-[#00E676]">
                  {currentDoc.proList.length}
                </div>
                <div className="text-[10px] text-[#00E676] font-bold uppercase">Pros</div>
              </div>
            </div>

          </div>

          {/* Tabbed Breakdown Panel: Red Flags / Pros / Cons */}
          <div className="bg-[#111625] border border-[#1C2333] rounded-2xl p-5 shadow-2xl space-y-4">
            
            {/* Main Tabs Header */}
            <div className="flex items-center space-x-1 border-b border-[#1C2333] pb-3">
              <button
                onClick={() => setActiveTab('FLAGS')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition ${
                  activeTab === 'FLAGS'
                    ? 'bg-[#FF2A5F] text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 bg-[#0B0F19]'
                }`}
              >
                🚨 Red Flags ({currentDoc.redFlags.length})
              </button>

              <button
                onClick={() => setActiveTab('PROS')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition ${
                  activeTab === 'PROS'
                    ? 'bg-[#00E676] text-[#060913] shadow-md'
                    : 'text-slate-400 hover:text-slate-200 bg-[#0B0F19]'
                }`}
              >
                💚 Pros ({currentDoc.proList.length})
              </button>

              <button
                onClick={() => setActiveTab('CONS')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition ${
                  activeTab === 'CONS'
                    ? 'bg-[#FFB300] text-[#060913] shadow-md'
                    : 'text-slate-400 hover:text-slate-200 bg-[#0B0F19]'
                }`}
              >
                ⚠️ Cons ({currentDoc.conList.length})
              </button>
            </div>

            {/* Sub-Category Filter Pills for Red Flags */}
            {activeTab === 'FLAGS' && (
              <div className="flex items-center space-x-1.5 pt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Category:</span>
                {(['ALL', 'Liability', 'Termination', 'IP Rights'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                      activeCategoryFilter === cat
                        ? 'bg-[#00F0FF] text-[#060913]'
                        : 'bg-[#0B0F19] text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* TAB CONTENT: RED FLAGS */}
            {activeTab === 'FLAGS' && (
              <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                {filteredRedFlags.map((flag) => (
                  <div
                    key={flag.id}
                    className="p-4 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-3 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                        flag.severity === 'HIGH' 
                          ? 'bg-[#FF2A5F]/20 text-[#FF2A5F] border border-[#FF2A5F]/40' 
                          : 'bg-[#FFB300]/20 text-[#FFB300] border border-[#FFB300]/40'
                      }`}>
                        {flag.severity} SEVERITY
                      </span>

                      <span className="text-[10px] font-mono text-slate-400 font-bold bg-[#111625] px-2 py-0.5 rounded border border-slate-800">
                        {flag.clauseNumber}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-xs text-white">
                      {flag.title}
                    </h4>

                    {/* Original Clause Quote */}
                    <div className="p-3 rounded-xl bg-[#111625] border border-slate-800 text-[11px] font-mono text-slate-300 leading-relaxed">
                      "{flag.originalText}"
                    </div>

                    {/* Plain English Translation */}
                    <div className="p-3 rounded-xl bg-[#FF2A5F]/10 border border-[#FF2A5F]/30 text-xs text-rose-200 leading-relaxed">
                      <strong className="text-[#FF2A5F]">Plain-English Meaning: </strong>
                      {flag.plainEnglish}
                    </div>

                    {/* Actionable Counter-Clause / Negotiation Tip */}
                    <div className="p-3.5 rounded-xl bg-[#00E676]/10 border border-[#00E676]/30 text-xs text-emerald-300 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 font-extrabold text-[#00E676]">
                          <Lightbulb className="w-4 h-4 text-[#00E676]" />
                          <span>Actionable Counter-Clause Tip</span>
                        </div>

                        <button
                          onClick={() => handleCopyTip(flag.id, flag.actionableTip)}
                          className="px-2.5 py-1 rounded bg-[#00E676]/20 hover:bg-[#00E676]/30 text-[#00E676] text-[10px] font-bold flex items-center space-x-1 transition"
                        >
                          {copiedTipId === flag.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedTipId === flag.id ? 'Copied' : 'Copy Tip'}</span>
                        </button>
                      </div>

                      <p className="leading-relaxed">
                        {flag.actionableTip}
                      </p>
                    </div>

                    {/* Ask AI Assistant About Clause Action Button */}
                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => onNavigateToChat(currentDoc)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 text-[#00F0FF] border border-[#00F0FF]/30 text-xs font-bold flex items-center space-x-1.5 transition"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
                        <span>Ask RAG AI about {flag.clauseNumber}</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: PROS */}
            {activeTab === 'PROS' && (
              <div className="space-y-3">
                {currentDoc.proList.map((pro) => (
                  <div key={pro.id} className="p-4 rounded-xl bg-[#0B0F19] border border-[#00E676]/40 space-y-1">
                    <div className="flex items-center space-x-2 text-xs font-extrabold text-[#00E676]">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{pro.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pro.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: CONS */}
            {activeTab === 'CONS' && (
              <div className="space-y-3">
                {currentDoc.conList.map((con) => (
                  <div key={con.id} className="p-4 rounded-xl bg-[#0B0F19] border border-[#FFB300]/40 space-y-1">
                    <div className="flex items-center space-x-2 text-xs font-extrabold text-[#FFB300]">
                      <ThumbsDown className="w-4 h-4" />
                      <span>{con.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {con.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
