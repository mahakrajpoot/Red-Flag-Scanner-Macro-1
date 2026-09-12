import React, { useState } from 'react';
import type { DocumentAnalysisReport } from '../../types';
import { 
  FileText, 
  Upload, 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  ChevronDown
} from 'lucide-react';

interface DocumentViewerProps {
  currentDocument: DocumentAnalysisReport;
  sampleDocs: DocumentAnalysisReport[];
  onSelectSample: (doc: DocumentAnalysisReport) => void;
  onCustomUpload: (fileName: string, text: string) => void;
  highlightedClauseId?: string | null;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  currentDocument,
  sampleDocs,
  onSelectSample,
  onCustomUpload,
  highlightedClauseId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [customText, setCustomText] = useState('');
  const [customTitle, setCustomTitle] = useState('Custom_Contract_Draft.txt');

  const handleCopyText = () => {
    navigator.clipboard.writeText(currentDocument.documentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onCustomUpload(file.name, content || 'Empty uploaded file content.');
      setShowUploadModal(false);
    };
    reader.readAsText(file);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;
    onCustomUpload(customTitle || 'Custom_Contract.txt', customText);
    setShowUploadModal(false);
    setCustomText('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
      
      {/* Header bar with controls */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
        
        {/* Sample document selector dropdown */}
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-rose-400" />
          <div className="relative group">
            <select
              value={currentDocument.id}
              onChange={(e) => {
                const selected = sampleDocs.find((d) => d.id === e.target.value);
                if (selected) onSelectSample(selected);
              }}
              className="bg-slate-900 border border-slate-700 text-slate-100 font-semibold text-xs sm:text-sm rounded-xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-rose-500/50 appearance-none cursor-pointer hover:border-slate-600 transition"
            >
              {sampleDocs.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  📄 {doc.fileName} ({doc.riskLevel} Risk)
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Upload & Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Upload className="w-3.5 h-3.5 text-rose-400" />
            <span>Upload Contract</span>
          </button>

          <button
            onClick={handleCopyText}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition"
            title="Copy document text"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Contract Title & Meta Details */}
      <div className="px-5 py-3 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-200">{currentDocument.contractType}</span>
          <span className="text-slate-600">•</span>
          <span>{currentDocument.uploadDate}</span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">
          PDF / Text Viewer
        </span>
      </div>

      {/* Clause Search input */}
      <div className="p-3 bg-slate-950/20 border-b border-slate-800/50">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clause keywords in contract text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Document Text Content View */}
      <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed space-y-4 bg-slate-950/30">
        {currentDocument.documentText.split('\n\n').map((paragraph, index) => {
          const isHighlighted = highlightedClauseId && paragraph.toLowerCase().includes('clause');
          const isSearchMatch = searchTerm && paragraph.toLowerCase().includes(searchTerm.toLowerCase());

          return (
            <div
              key={index}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                isHighlighted
                  ? 'bg-rose-500/10 border-rose-500/50 text-rose-100 shadow-glow-red'
                  : isSearchMatch
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-100'
                  : 'bg-slate-900/40 border-slate-800/60 hover:border-slate-700/80'
              }`}
            >
              <div className="flex items-center justify-between mb-1 font-sans text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                <span>Section #{index + 1}</span>
                {isHighlighted && (
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono text-[10px]">
                    FLAGGED RISK CLAUSE
                  </span>
                )}
              </div>
              <p className="whitespace-pre-wrap">{paragraph}</p>
            </div>
          );
        })}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-rose-400" />
                <h3 className="font-bold text-slate-100">Upload / Paste Contract</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCustomSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Contract Title</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Drag Drop File Input */}
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-rose-500/50 transition cursor-pointer relative bg-slate-950/40">
                <input
                  type="file"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                <p className="font-semibold text-slate-200">Click to select PDF or Text document</p>
                <p className="text-slate-500 text-[11px] mt-1">Supports PDF, TXT, DOCX files</p>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-3 text-slate-500 text-[11px] font-bold uppercase">Or paste contract text</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <div>
                <textarea
                  rows={5}
                  placeholder="Paste contract clauses here..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-semibold shadow-md shadow-rose-950/50 hover:from-rose-500 hover:to-amber-500"
                >
                  Analyze Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
