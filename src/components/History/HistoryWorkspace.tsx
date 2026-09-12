import React, { useState } from 'react';
import type { DocumentAnalysisReport, TabType } from '../../types';
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Trash2, 
  ExternalLink, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface HistoryWorkspaceProps {
  documents: DocumentAnalysisReport[];
  onSelectDocument: (doc: DocumentAnalysisReport) => void;
  onNavigate: (tab: TabType) => void;
  onDeleteDocument: (docId: string) => void;
}

export const HistoryWorkspace: React.FC<HistoryWorkspaceProps> = ({
  documents,
  onSelectDocument,
  onNavigate,
  onDeleteDocument
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [exportToast, setExportToast] = useState<string | null>(null);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.contractType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = selectedRiskFilter === 'ALL' || doc.riskLevel === selectedRiskFilter;
    return matchesSearch && matchesRisk;
  });

  const handleExportPDF = (doc: DocumentAnalysisReport) => {
    setExportToast(`Generating & downloading PDF Executive Report for "${doc.fileName}"...`);
    setTimeout(() => {
      setExportToast(null);
    }, 3500);
  };

  const getRiskBadge = (score: number, level: 'HIGH' | 'MEDIUM' | 'LOW') => {
    if (level === 'HIGH') {
      return (
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#FF2A5F]/15 text-[#FF2A5F] border border-[#FF2A5F]/40 shadow-glow-red">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>High Risk ({score}/100)</span>
        </span>
      );
    }
    if (level === 'MEDIUM') {
      return (
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#FFB300]/15 text-[#FFB300] border border-[#FFB300]/40 shadow-glow-amber">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Medium Risk ({score}/100)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/40 shadow-glow-emerald">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Low Risk ({score}/100)</span>
      </span>
    );
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      
      {/* Toast Notification Banner for Export */}
      {exportToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B0F19] border border-[#00F0FF]/60 text-slate-100 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 animate-in slide-in-from-bottom-4 duration-300">
          <div className="w-7 h-7 rounded-xl bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
          <div className="text-xs font-medium">{exportToast}</div>
        </div>
      )}

      {/* Breadcrumb Navigation Header */}
      <div className="flex items-center space-x-2 text-xs text-slate-400">
        <button onClick={() => onNavigate('dashboard')} className="hover:text-slate-200 transition">Dashboard</button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-[#00F0FF] font-semibold">Contract History & Saved Workspace</span>
      </div>

      {/* Top Header & Metrics Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1C2333] pb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
            <span>Saved Contract History</span>
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              {documents.length} Reports Archived
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Access previous legal scans, download PDF executive reports, and audit flagged clauses.
          </p>
        </div>

        <button
          onClick={() => onNavigate('scanner')}
          className="px-5 py-2.5 rounded-xl bg-[#00F0FF] hover:bg-[#00D8E6] text-[#060913] font-black text-xs shadow-lg shadow-cyan-950/40 flex items-center space-x-2 transition transform active:scale-95"
        >
          <FileText className="w-4 h-4" />
          <span>Scan New Document</span>
        </button>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#111625] border border-[#1C2333] p-4 rounded-2xl shadow-xl">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by contract name or document type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]"
          />
        </div>

        {/* Risk Filter Tag Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter:</span>
          </span>

          {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((filter) => {
            const isActive = selectedRiskFilter === filter;
            const count = filter === 'ALL' 
              ? documents.length 
              : documents.filter(d => d.riskLevel === filter).length;

            return (
              <button
                key={filter}
                onClick={() => setSelectedRiskFilter(filter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-[#00F0FF] text-[#060913] shadow-md shadow-cyan-950/40'
                    : 'bg-[#0B0F19] text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <span>{filter === 'ALL' ? 'All Contracts' : `${filter} Risk`}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? 'bg-[#060913]/30 text-[#060913]' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Data Table */}
      <div className="bg-[#111625] border border-[#1C2333] rounded-2xl overflow-hidden shadow-2xl">
        {filteredDocs.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">No contracts found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No legal documents match your search criteria or filter tags. Try resetting filters or uploading a new contract.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedRiskFilter('ALL'); }}
              className="mt-2 text-xs font-bold text-[#00F0FF] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B0F19] border-b border-[#1C2333] text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Document Name</th>
                  <th className="px-6 py-4">Contract Category</th>
                  <th className="px-6 py-4">Scan Date</th>
                  <th className="px-6 py-4">Overall Risk Score</th>
                  <th className="px-6 py-4">Red Flags</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C2333]">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#161C2E]/70 transition text-slate-300">
                    
                    {/* File Name & Icon */}
                    <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#00F0FF]">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs hover:text-[#00F0FF] cursor-pointer transition"
                               onClick={() => { onSelectDocument(doc); onNavigate('scanner'); }}>
                            {doc.fileName}
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase font-mono">
                            {doc.fileType.toUpperCase()} Format
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contract Category */}
                    <td className="px-6 py-4 text-slate-300 whitespace-nowrap font-medium">
                      {doc.contractType}
                    </td>

                    {/* Scan Date */}
                    <td className="px-6 py-4 text-slate-400 font-mono whitespace-nowrap">
                      {doc.uploadDate}
                    </td>

                    {/* Risk Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRiskBadge(doc.overallRiskScore, doc.riskLevel)}
                    </td>

                    {/* Flags Count */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center space-x-1 text-xs font-bold text-slate-200 bg-[#0B0F19] px-2.5 py-1 rounded-lg border border-slate-800">
                        <ShieldAlert className="w-3.5 h-3.5 text-[#FF2A5F]" />
                        <span>{doc.redFlags.length} Flags</span>
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        
                        {/* View Report */}
                        <button
                          onClick={() => {
                            onSelectDocument(doc);
                            onNavigate('scanner');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold border border-indigo-500/30 flex items-center space-x-1 transition"
                          title="View Split Screen Analysis"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View Report</span>
                        </button>

                        {/* Export PDF */}
                        <button
                          onClick={() => handleExportPDF(doc)}
                          className="px-3 py-1.5 rounded-lg bg-[#0B0F19] hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 flex items-center space-x-1 transition"
                          title="Download PDF Report"
                        >
                          <Download className="w-3.5 h-3.5 text-[#00F0FF]" />
                          <span>PDF</span>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => onDeleteDocument(doc.id)}
                          className="p-1.5 rounded-lg bg-[#0B0F19] hover:bg-rose-950/40 text-slate-500 hover:text-rose-400 border border-slate-800 hover:border-rose-900/60 transition"
                          title="Delete Contract"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
