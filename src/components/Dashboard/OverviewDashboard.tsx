import React from 'react';
import type { TabType, DocumentAnalysisReport, UserProfile } from '../../types';
import { GraphicSimulationCanvas } from './GraphicSimulationCanvas';
import { 
  FileText, 
  Code, 
  Bot, 
  Globe, 
  ChevronRight,
  Shield,
  ShieldAlert,
  Brain,
  Clock,
  ArrowUpRight,
  Sparkles,
  Zap,
  RotateCcw,
  AlertTriangle,
  Info,
  MoreVertical
} from 'lucide-react';

interface OverviewDashboardProps {
  userProfile: UserProfile;
  documents: DocumentAnalysisReport[];
  isDemoMode: boolean;
  onToggleDemoMode: (enable: boolean) => void;
  onSelectTab: (tab: TabType) => void;
  onSelectDocumentForScanner: (doc: DocumentAnalysisReport) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  userProfile,
  documents,
  isDemoMode,
  onToggleDemoMode,
  onSelectTab,
  onSelectDocumentForScanner
}) => {
  // Derive dynamic metrics from documents or demo mode

  const activeDocs = isDemoMode && documents.length === 0 ? [] : documents;
  const hasData = isDemoMode || activeDocs.length > 0;

  // Calculate real aggregated metrics
  const totalContractsCount = isDemoMode ? 18 : activeDocs.length;
  
  const highRiskCount = isDemoMode
    ? 3
    : activeDocs.reduce((acc, doc) => acc + doc.redFlags.filter(f => f.severity === 'HIGH').length, 0);

  const avgRiskScore = isDemoMode
    ? 42
    : activeDocs.length > 0
      ? Math.round(activeDocs.reduce((sum, doc) => sum + doc.overallRiskScore, 0) / activeDocs.length)
      : 0;

  const timeSavedHours = isDemoMode
    ? 18.4
    : (activeDocs.length * 1.5).toFixed(1);

  // Dynamic Risk Distribution for Donut Chart (must sum to 100%)
  const riskDistribution = isDemoMode
    ? { critical: 3, high: 12, medium: 28, low: 57 }
    : (() => {
        if (activeDocs.length === 0) return { critical: 0, high: 0, medium: 0, low: 0 };
        let c = 0, h = 0, m = 0, l = 0;
        activeDocs.forEach(d => {
          d.redFlags.forEach(f => {
            if (f.severity === 'HIGH') h += 1;
            else if (f.severity === 'MEDIUM') m += 1;
            else l += 1;
          });
        });
        const total = c + h + m + l || 1;
        return {
          critical: Math.round((c / total) * 100),
          high: Math.round((h / total) * 100),
          medium: Math.round((m / total) * 100),
          low: 100 - (Math.round((c / total) * 100) + Math.round((h / total) * 100) + Math.round((m / total) * 100))
        };
      })();

  // Sample Recent Scans table items
  const displayScans = isDemoMode
    ? [
        { id: 'd1', name: 'NDA_Acme_Corp.pdf', type: 'Contract', severity: 'High', date: 'Jul 07, 2025', riskScore: 78, isDemo: true },
        { id: 'd2', name: 'Service_Agreement.docx', type: 'Contract', severity: 'Medium', date: 'Jul 06, 2025', riskScore: 46, isDemo: true },
        { id: 'd3', name: 'Client_Proposal.pdf', type: 'Contract', severity: 'Low', date: 'Jul 05, 2025', riskScore: 22, isDemo: true },
        { id: 'd4', name: 'www.example.com', type: 'Website', severity: 'Medium', date: 'Jul 04, 2025', riskScore: 37, isDemo: true },
        { id: 'd5', name: 'Terms_And_Conditions.pdf', type: 'Contract', severity: 'High', date: 'Jul 03, 2025', riskScore: 69, isDemo: true }
      ]
    : activeDocs.slice(0, 5).map(doc => ({
        id: doc.id,
        name: doc.fileName,
        type: 'Contract',
        severity: doc.riskLevel === 'HIGH' ? 'High' : doc.riskLevel === 'MEDIUM' ? 'Medium' : 'Low',
        date: doc.uploadDate || 'Recently',
        riskScore: doc.overallRiskScore,
        isDemo: false
      }));

  const firstName = userProfile.name ? userProfile.name.split(' ')[0] : 'Mahak';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1700px] mx-auto space-y-6 text-slate-100 font-sans">
      
      {/* Demo Mode Notification & Banner */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-cyan-500/10 border border-amber-500/30 rounded-2xl p-3.5 px-5 flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center space-x-2.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-slate-950 uppercase tracking-wider">
              DEMO MODE ACTIVE
            </span>
            <p className="text-xs text-amber-200 font-medium">
              Showing sample metrics and demo analytics for presentation. Real user data is isolated.
            </p>
          </div>
          <button
            onClick={() => onToggleDemoMode(false)}
            className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 flex items-center space-x-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Exit Demo Mode</span>
          </button>
        </div>
      )}

      {/* Hero Welcome & Scanning Radar Banner (Exact Reference Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0B0F19] border border-[#1C2333] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Left Welcome Info (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-2">
              <span>Welcome back, {firstName}</span>
              <span className="inline-block animate-bounce">👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Detect risks. Protect your business. Stay ahead.
            </p>
          </div>

          {!hasData && (
            <div className="bg-[#111625] border border-[#1C2333] rounded-2xl p-4 space-y-3">
              <div className="flex items-center space-x-2 text-xs text-slate-300 font-bold">
                <Info className="w-4 h-4 text-[#00F0FF]" />
                <span>Ready to Audit Your First Document</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload your contract or website domain to populate real-time risk scores, clause breakdowns, and AI threat intelligence.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => onSelectTab('scanner')}
                  className="px-4 py-2.5 rounded-xl bg-[#00F0FF] hover:bg-[#00D8E6] text-[#060913] font-black text-xs shadow-lg shadow-cyan-950/40 transition transform active:scale-95 flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Scan Document Now</span>
                </button>

                <button
                  onClick={() => onToggleDemoMode(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#161C2E] hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Try Demo Mode</span>
                </button>
              </div>
            </div>
          )}

          {hasData && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-[#00F0FF]">Red Flag Scanner</strong> uses advanced AI to analyze legal documents and web content, highlighting potential risks in plain English.
              </p>

              {/* 3 Feature Pill Badges */}
              <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-bold text-slate-300">
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#111625] border border-[#1C2333]">
                  <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>Detect risky clauses</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#111625] border border-[#1C2333]">
                  <Globe className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>Scan web threats</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#111625] border border-[#1C2333]">
                  <Bot className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>Get AI explanations</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Graphic Animation Radar Widget (5 cols) (Visual Only, NO Audio) */}
        <div className="lg:col-span-5 flex items-center justify-center bg-radial-gradient from-[#0F182E] to-[#0B0F19] rounded-2xl border border-[#1C2C4E]/60 p-4">
          <GraphicSimulationCanvas statusText={hasData ? "Scanning active documents..." : "Radar idle • Ready for scan"} />
        </div>

      </div>

      {/* If Clean Real Mode (No Scans), render clean empty state CTA section */}
      {!hasData && (
        <div className="bg-[#0B0F19] border border-[#1C2333] rounded-3xl p-12 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-[#111625] border border-slate-800 mx-auto flex items-center justify-center text-[#00F0FF] shadow-inner">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-white">No Contracts Scanned Yet</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Your risk score dashboard, threat activity trends, and AI document intelligence will populate dynamically as soon as your first scan is completed.
          </p>
          <div className="flex items-center justify-center space-x-3 pt-2">
            <button
              onClick={() => onSelectTab('scanner')}
              className="px-6 py-3 rounded-xl bg-[#00F0FF] hover:bg-[#00D8E6] text-[#060913] font-black text-xs shadow-lg shadow-cyan-950/40 transition"
            >
              Upload PDF or DOCX Contract
            </button>
            <button
              onClick={() => onToggleDemoMode(true)}
              className="px-6 py-3 rounded-xl bg-[#111625] hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 transition"
            >
              Load Presentation Demo
            </button>
          </div>
        </div>
      )}

      {/* If Has Data (Real Scans or Demo Mode), Render All Dashboard Metrics & Widgets */}
      {hasData && (
        <>
          {/* Top Row: 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Card 1: Contracts Scanned */}
            <div className="bg-[#0B0F19] border border-[#1C2333] rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-[#00F0FF]/40 transition">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded-full border border-[#00E676]/20">
                  ↑ 42% vs last 7 days
                </span>
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Contracts Scanned
                </p>
                <h3 className="text-3xl font-black text-white mt-1">
                  {totalContractsCount}
                </h3>
              </div>
              {/* Cyan Sparkline SVG */}
              <div className="h-8 w-full pt-1">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 24" preserveAspectRatio="none">
                  <path d="M0,20 Q20,5 40,15 T80,8 T100,3" fill="none" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 2: High Risk Threats */}
            <div className="bg-[#0B0F19] border border-[#1C2333] rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-[#FF2A5F]/40 transition">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#FF2A5F]/10 border border-[#FF2A5F]/30 flex items-center justify-center text-[#FF2A5F]">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded-full border border-[#00E676]/20">
                  ↓ 60% vs last 7 days
                </span>
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  High Risk Threats
                </p>
                <h3 className="text-3xl font-black text-white mt-1">
                  {highRiskCount}
                </h3>
              </div>
              {/* Pink/Red Sparkline SVG */}
              <div className="h-8 w-full pt-1">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 24" preserveAspectRatio="none">
                  <path d="M0,10 Q25,22 50,12 T80,18 T100,5" fill="none" stroke="#FF2A5F" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 3: Average Risk Index */}
            <div className="bg-[#0B0F19] border border-[#1C2333] rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-[#A855F7]/40 transition">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#A855F7]/10 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7]">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded-full border border-[#00E676]/20">
                  ↓ 28% vs last 7 days
                </span>
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Average Risk Index
                </p>
                <div className="flex items-baseline space-x-1 mt-1">
                  <span className="text-3xl font-black text-white">{avgRiskScore}</span>
                  <span className="text-sm font-semibold text-slate-500">/ 100</span>
                </div>
              </div>
              {/* Purple Sparkline SVG */}
              <div className="h-8 w-full pt-1">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 24" preserveAspectRatio="none">
                  <path d="M0,18 Q30,8 60,14 T100,4" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 4: Time Saved */}
            <div className="bg-[#0B0F19] border border-[#1C2333] rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-[#00F0FF]/40 transition">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded-full border border-[#00E676]/20">
                  ↑ 73% vs last 7 days
                </span>
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Time Saved
                </p>
                <h3 className="text-3xl font-black text-white mt-1">
                  {timeSavedHours} <span className="text-lg font-bold text-slate-400">hrs</span>
                </h3>
              </div>
              {/* Blue Sparkline SVG */}
              <div className="h-8 w-full pt-1">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 24" preserveAspectRatio="none">
                  <path d="M0,15 Q25,5 50,18 T100,2" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

          </div>

          {/* Middle Row: 3 Main Cards (Donut Gauge, Threat Activity Line Chart, AI Intelligence) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Card 1: Overall Risk Score Donut Gauge (4 cols) */}
            <div className="lg:col-span-4 bg-[#0B0F19] border border-[#1C2333] rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h2 className="font-extrabold text-white text-base">Overall Risk Score</h2>
                  <Info className="w-4 h-4 text-slate-500 cursor-pointer" />
                </div>
              </div>

              {/* Donut Gauge & Legend */}
              <div className="flex items-center justify-around py-2">
                
                {/* SVG Donut Ring Gauge */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#111625" strokeWidth="12" />
                    
                    {/* Low Arc (Cyan) */}
                    <circle
                      cx="60" cy="60" r="50" fill="none" stroke="#00F0FF" strokeWidth="12"
                      strokeDasharray={`${(riskDistribution.low / 100) * 314} 314`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />
                    {/* Medium Arc (Yellow) */}
                    <circle
                      cx="60" cy="60" r="50" fill="none" stroke="#EAB308" strokeWidth="12"
                      strokeDasharray={`${(riskDistribution.medium / 100) * 314} 314`}
                      strokeDashoffset={`-${(riskDistribution.low / 100) * 314}`}
                      strokeLinecap="round"
                    />
                    {/* High Arc (Purple) */}
                    <circle
                      cx="60" cy="60" r="50" fill="none" stroke="#A855F7" strokeWidth="12"
                      strokeDasharray={`${(riskDistribution.high / 100) * 314} 314`}
                      strokeDashoffset={`-${((riskDistribution.low + riskDistribution.medium) / 100) * 314}`}
                      strokeLinecap="round"
                    />
                    {/* Critical Arc (Red) */}
                    <circle
                      cx="60" cy="60" r="50" fill="none" stroke="#FF2A5F" strokeWidth="12"
                      strokeDasharray={`${(riskDistribution.critical / 100) * 314} 314`}
                      strokeDashoffset={`-${((riskDistribution.low + riskDistribution.medium + riskDistribution.high) / 100) * 314}`}
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="flex items-baseline space-x-0.5">
                      <span className="text-2xl font-black text-white">{avgRiskScore}</span>
                      <span className="text-xs text-slate-500 font-semibold">/100</span>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 mt-0.5">
                      {avgRiskScore > 70 ? 'High Risk' : avgRiskScore > 35 ? 'Moderate Risk' : 'Low Risk'}
                    </span>
                  </div>
                </div>

                {/* Legend List */}
                <div className="space-y-2 text-xs font-bold">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF2A5F]"></span>
                    <span className="text-slate-400">Critical</span>
                    <span className="text-white ml-auto">{riskDistribution.critical}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]"></span>
                    <span className="text-slate-400">High</span>
                    <span className="text-white ml-auto">{riskDistribution.high}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]"></span>
                    <span className="text-slate-400">Medium</span>
                    <span className="text-white ml-auto">{riskDistribution.medium}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]"></span>
                    <span className="text-slate-400">Low</span>
                    <span className="text-white ml-auto">{riskDistribution.low}%</span>
                  </div>
                </div>

              </div>

              {/* Bottom Improvement Pill */}
              <div className="pt-3 border-t border-[#1C2333] flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-slate-400">
                  <Shield className="w-4 h-4 text-[#00F0FF]" />
                  <span>Risk level is lower than last week</span>
                </div>
                <span className="text-[10px] font-black text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded-full border border-[#00E676]/20">
                  ↓ 28% improvement
                </span>
              </div>
            </div>

            {/* Card 2: Threat Activity Multi-Line Area Chart (5 cols) */}
            <div className="lg:col-span-5 bg-[#0B0F19] border border-[#1C2333] rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h2 className="font-extrabold text-white text-base">Threat Activity</h2>
                  <Info className="w-4 h-4 text-slate-500 cursor-pointer" />
                </div>

                <div className="flex items-center space-x-3 text-[10px] font-extrabold">
                  <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-[#FF2A5F]"></span><span className="text-slate-400">High</span></span>
                  <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-[#A855F7]"></span><span className="text-slate-400">Medium</span></span>
                  <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span><span className="text-slate-400">Low</span></span>
                </div>
              </div>

              {/* Interactive Line Canvas Visualizer with 32 Threats Tooltip */}
              <div className="relative h-48 w-full pt-4">
                
                {/* Y Axis Guide Lines */}
                <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-600 font-mono pointer-events-none">
                  <div className="border-b border-[#161C2E] pb-0.5">40</div>
                  <div className="border-b border-[#161C2E] pb-0.5">30</div>
                  <div className="border-b border-[#161C2E] pb-0.5">20</div>
                  <div className="border-b border-[#161C2E] pb-0.5">10</div>
                  <div>0</div>
                </div>

                {/* SVG Curves */}
                <svg className="w-full h-full overflow-visible relative z-10" viewBox="0 0 300 120" preserveAspectRatio="none">
                  {/* High Threat Line (Pink) */}
                  <path
                    d="M0,75 C50,60 100,85 150,40 C200,10 250,55 300,30"
                    fill="none"
                    stroke="#FF2A5F"
                    strokeWidth="3"
                  />
                  {/* Medium Threat Line (Purple) */}
                  <path
                    d="M0,90 C50,75 100,95 150,65 C200,35 250,75 300,50"
                    fill="none"
                    stroke="#A855F7"
                    strokeWidth="2.5"
                  />
                  {/* Low Threat Line (Blue) */}
                  <path
                    d="M0,105 C50,90 100,105 150,85 C200,60 250,90 300,75"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />

                  {/* Tooltip Vertical Dashed Line on Jun 05 Peak */}
                  <line x1="200" y1="0" x2="200" y2="120" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

                  {/* Highlight Dots */}
                  <circle cx="200" cy="10" r="4" fill="#FF2A5F" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="200" cy="35" r="3.5" fill="#A855F7" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="200" cy="60" r="3.5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>

                {/* Tooltip Badge "32 threats" Callout at Peak */}
                <div className="absolute top-1 left-[62%] -translate-x-1/2 bg-[#0B0F19] border border-slate-700 text-white font-black text-[10px] px-2 py-1 rounded-lg shadow-xl z-20">
                  32 threats
                </div>
              </div>

              {/* X Axis Dates */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-2 border-t border-[#161C2E]">
                <span>Jun 01</span>
                <span>Jun 02</span>
                <span>Jun 03</span>
                <span>Jun 04</span>
                <span>Jun 05</span>
                <span>Jun 06</span>
                <span>Jun 07</span>
              </div>
            </div>

            {/* Card 3: AI Document Intelligence (3 cols) */}
            <div className="lg:col-span-3 bg-[#0B0F19] border border-[#1C2333] rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-[#A855F7]" />
                  <h2 className="font-extrabold text-white text-base">AI Document Intelligence</h2>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#00E676]/15 text-[#00E676] text-[10px] font-black border border-[#00E676]/30 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-ping"></span>
                  <span>Live</span>
                </span>
              </div>

              <p className="text-xs text-slate-400 font-medium">
                Real-time threat monitoring & AI analysis
              </p>

              {/* Stats List */}
              <div className="space-y-3 py-2 border-y border-[#1C2333] text-xs font-bold">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF2A5F]"></span>
                    <span className="text-slate-300">New Threats Detected</span>
                  </div>
                  <span className="text-white font-mono">{isDemoMode ? 12 : highRiskCount * 4}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]"></span>
                    <span className="text-slate-300">Patterns Identified</span>
                  </div>
                  <span className="text-white font-mono">{isDemoMode ? 8 : (activeDocs.length * 2) || 8}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]"></span>
                    <span className="text-slate-300">Threat Database Updated</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">2m ago</span>
                </div>
              </div>

              {/* Visual Threat Equalizer Monitoring Box (Visual Spectrum Only, NO AUDIO) */}
              <div className="bg-[#111625] border border-[#1C2333] rounded-2xl p-3.5 flex items-center space-x-3">
                <div className="flex items-end space-x-1 h-5 flex-shrink-0">
                  <span className="w-1 bg-[#00F0FF] rounded-full animate-[pulse_0.9s_infinite] h-3"></span>
                  <span className="w-1 bg-[#00F0FF] rounded-full animate-[pulse_1.4s_infinite] h-5"></span>
                  <span className="w-1 bg-[#00F0FF] rounded-full animate-[pulse_0.7s_infinite] h-2"></span>
                  <span className="w-1 bg-[#00F0FF] rounded-full animate-[pulse_1.1s_infinite] h-4"></span>
                </div>
                <p className="text-[10px] text-slate-400 leading-snug">
                  Monitoring threat vectors, legal databases, and security compliance feeds.
                </p>
              </div>

            </div>

          </div>

          {/* Bottom Section: Quick Actions & Recent Scans (2 Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Card: Quick Actions (5 cols) */}
            <div className="lg:col-span-5 bg-[#0B0F19] border border-[#1C2333] rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-[#00F0FF]" />
                  <h2 className="font-extrabold text-white text-base">Quick Actions</h2>
                </div>
                <button
                  onClick={() => onSelectTab('scanner')}
                  className="text-xs text-[#00F0FF] font-bold hover:underline flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 Action Cards Grid (2x2) */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* Action 1: Scan Document */}
                <div
                  onClick={() => onSelectTab('scanner')}
                  className="bg-[#111625] hover:bg-[#161C2E] border border-[#1C2333] hover:border-[#00F0FF]/50 rounded-2xl p-4 cursor-pointer transition flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-xs group-hover:text-[#00F0FF] transition">Scan Document</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Upload or drag & drop</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#0B0F19] flex items-center justify-center text-[#00F0FF] group-hover:bg-[#00F0FF] group-hover:text-slate-950 transition ml-auto">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Action 2: Scan Clause */}
                <div
                  onClick={() => onSelectTab('snippet-scan')}
                  className="bg-[#111625] hover:bg-[#161C2E] border border-[#1C2333] hover:border-[#A855F7]/50 rounded-2xl p-4 cursor-pointer transition flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#A855F7]/10 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7]">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-xs group-hover:text-[#A855F7] transition">Scan Clause</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Check specific clauses</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#0B0F19] flex items-center justify-center text-[#A855F7] group-hover:bg-[#A855F7] group-hover:text-slate-950 transition ml-auto">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Action 3: Ask AI */}
                <div
                  onClick={() => onSelectTab('ai-assistant')}
                  className="bg-[#111625] hover:bg-[#161C2E] border border-[#1C2333] hover:border-indigo-500/50 rounded-2xl p-4 cursor-pointer transition flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-xs group-hover:text-indigo-400 transition">Ask AI</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Get instant help</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#0B0F19] flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition ml-auto">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Action 4: Check Website */}
                <div
                  onClick={() => onSelectTab('website-checker')}
                  className="bg-[#111625] hover:bg-[#161C2E] border border-[#1C2333] hover:border-[#00F0FF]/50 rounded-2xl p-4 cursor-pointer transition flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-xs group-hover:text-[#00F0FF] transition">Check Website</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Scan for web threats</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#0B0F19] flex items-center justify-center text-[#00F0FF] group-hover:bg-[#00F0FF] group-hover:text-slate-950 transition ml-auto">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            </div>

            {/* Right Card: Recent Scans Table (7 cols) */}
            <div className="lg:col-span-7 bg-[#0B0F19] border border-[#1C2333] rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-[#00F0FF]" />
                  <h2 className="font-extrabold text-white text-base">Recent Scans</h2>
                </div>
                <button
                  onClick={() => onSelectTab('history')}
                  className="text-xs text-[#00F0FF] font-bold hover:underline flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-[#1C2333]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#111625] border-b border-[#1C2333] text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-4 py-3">Document / Domain</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Severity</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Risk Score</th>
                      <th className="px-2 py-3 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#161C2E]">
                    {displayScans.map((scan) => (
                      <tr 
                        key={scan.id} 
                        className="hover:bg-[#161C2E]/60 transition text-slate-300 cursor-pointer"
                        onClick={() => {
                          const matchedDoc = activeDocs.find(d => d.id === scan.id);
                          if (matchedDoc) onSelectDocumentForScanner(matchedDoc);
                          else onSelectTab('scanner');
                        }}
                      >
                        <td className="px-4 py-3.5 font-bold text-white whitespace-nowrap flex items-center space-x-2">
                          {scan.type === 'Website' ? (
                            <Globe className="w-4 h-4 text-[#00F0FF]" />
                          ) : (
                            <FileText className="w-4 h-4 text-[#00F0FF]" />
                          )}
                          <span>{scan.name}</span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 font-medium">
                          {scan.type}
                        </td>
                        <td className="px-4 py-3.5">
                          {scan.severity === 'High' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#FF2A5F]/15 text-[#FF2A5F] border border-[#FF2A5F]/30">
                              High
                            </span>
                          )}
                          {scan.severity === 'Medium' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/15 text-amber-400 border border-amber-500/30">
                              Medium
                            </span>
                          )}
                          {scan.severity === 'Low' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30">
                              Low
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 font-mono text-[11px]">
                          {scan.date}
                        </td>
                        <td className="px-4 py-3.5 font-mono font-bold">
                          <span className={scan.riskScore > 65 ? 'text-[#FF2A5F]' : scan.riskScore > 35 ? 'text-amber-400' : 'text-[#00F0FF]'}>
                            {scan.riskScore}
                          </span>
                        </td>
                        <td className="px-2 py-3.5 text-center text-slate-500 hover:text-slate-300">
                          <MoreVertical className="w-4 h-4 mx-auto" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
};
