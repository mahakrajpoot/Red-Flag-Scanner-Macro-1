import React, { useState } from 'react';
import type { ChatMessage, DocumentAnalysisReport } from '../../types';
import { 
  Bot, 
  Send, 
  Plus, 
  Lock, 
  ThumbsUp, 
  ThumbsDown, 
  FileText, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface AiAssistantViewProps {
  documents: DocumentAnalysisReport[];
  currentDoc: DocumentAnalysisReport;
  onSelectDoc: (doc: DocumentAnalysisReport) => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({
  documents,
  currentDoc,
  onSelectDoc,
  messages,
  onSendMessage
}) => {
  const [inputText, setInputText] = useState('');

  const promptPills = [
    '📄 Summarize termination terms',
    '🚨 Is there a non-compete clause?',
    '⚡ Explain Section 3.2 liability cap',
    '🔍 What is the governing law jurisdiction?'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const getRiskBadge = (level: 'HIGH' | 'MEDIUM' | 'LOW') => {
    if (level === 'HIGH') {
      return <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#FF2A5F]/20 text-[#FF2A5F] border border-[#FF2A5F]/40">HIGH</span>;
    }
    if (level === 'MEDIUM') {
      return <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#FFB300]/20 text-[#FFB300] border border-[#FFB300]/40">MEDIUM</span>;
    }
    return <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40">LOW</span>;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4 min-h-[calc(100vh-80px)] flex flex-col">
      
      {/* Title & RAG System Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2333] pb-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <span>Context-Aware RAG AI Assistant</span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 tracking-wider uppercase">
              RAG ENGINE ACTIVE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Ask complex legal questions, audit indemnities, and extract inline clause citations directly from active contracts.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-400 bg-[#111625] px-3 py-1.5 rounded-xl border border-[#1C2333]">
          <BookOpen className="w-4 h-4 text-[#00F0FF]" />
          <span>Active Context Vector Store: <strong className="text-white font-mono">{currentDoc.fileName}</strong></span>
        </div>
      </div>

      {/* Main RAG Workspace Layout: Left Sidebar + Right Chat Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
        
        {/* Left Sidebar: Document Selector (4 cols) */}
        <div className="lg:col-span-4 bg-[#111625] border border-[#1C2333] rounded-2xl p-4 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1C2333]">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Active Contract
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {documents.length} Docs
              </span>
            </div>

            {/* Document Selector List */}
            <div className="space-y-2 mt-3 overflow-y-auto max-h-[480px]">
              {documents.map((doc) => {
                const isSelected = doc.id === currentDoc.id;

                return (
                  <div
                    key={doc.id}
                    onClick={() => onSelectDoc(doc)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#0B0F19] border-[#00F0FF] shadow-glow-cyan'
                        : 'bg-[#0B0F19]/50 border-slate-800/80 hover:bg-[#0B0F19] hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2.5">
                        <FileText className={`w-4 h-4 ${isSelected ? 'text-[#00F0FF]' : 'text-slate-400'}`} />
                        <div>
                          <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                            {doc.fileName}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-medium block">
                            {doc.contractType}
                          </span>
                        </div>
                      </div>

                      {getRiskBadge(doc.riskLevel)}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2.5 pt-2 border-t border-slate-800/60">
                      <span>Score: <strong className="text-white font-mono">{doc.overallRiskScore}/100</strong></span>
                      <span>{doc.redFlags.length} Flags Detected</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Context Summary Info Box */}
          <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center space-x-1.5 text-[#00F0FF] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Context Knowledge Base</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Currently indexing <strong className="text-white">{currentDoc.fileName}</strong> ({currentDoc.documentSections.length} sections analyzed).
            </p>
          </div>

        </div>

        {/* Right Main Chat Area (8 cols) */}
        <div className="lg:col-span-8 bg-[#111625] border border-[#1C2333] rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          
          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto space-y-5 pr-2 max-h-[520px]">
            
            {/* Pill Banner */}
            <div className="flex justify-center">
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#0B0F19] text-slate-300 border border-slate-800 flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>RAG analysis synced with <strong>{currentDoc.fileName}</strong></span>
              </span>
            </div>

            {/* Conversation Messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' ? (
                  <div className="flex items-start space-x-3 max-w-2xl">
                    <div className="w-8 h-8 rounded-xl bg-[#00F0FF]/15 text-[#00F0FF] flex items-center justify-center flex-shrink-0 mt-1 border border-[#00F0FF]/30 shadow-glow-cyan">
                      <Bot className="w-4 h-4" />
                    </div>

                    <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl p-5 space-y-3 text-xs text-slate-200 shadow-xl">
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-white">Red Flag RAG Legal AI</span>
                          <span className="text-[10px] text-[#00F0FF] font-bold flex items-center space-x-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Verified Source</span>
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{msg.timestamp}</span>
                      </div>

                      <p className="text-slate-300 leading-relaxed">
                        {msg.text}
                      </p>

                      {/* Quoted Section Quote Card (if provided) */}
                      {msg.sectionQuote && (
                        <div className="p-4 rounded-xl bg-[#00E676]/10 border border-[#00E676]/30 space-y-2">
                          <div className="flex items-center space-x-1.5 text-xs font-extrabold text-[#00E676]">
                            <Lock className="w-3.5 h-3.5" />
                            <span>{msg.sectionQuote.title}</span>
                          </div>
                          <p className="text-xs text-emerald-200 font-mono leading-relaxed bg-[#0B0F19]/60 p-2.5 rounded-lg border border-emerald-900/40">
                            {msg.sectionQuote.quote}
                          </p>
                        </div>
                      )}

                      {/* Clause Citations List */}
                      {msg.clauseReferences && msg.clauseReferences.length > 0 && (
                        <div className="flex items-center space-x-2 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Citation References:</span>
                          {msg.clauseReferences.map((ref, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono font-bold">
                              [Ref: {ref}]
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Feedback Row */}
                      <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] text-slate-400">
                        <div className="flex items-center space-x-3">
                          <button className="flex items-center space-x-1 hover:text-white transition">
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>Helpful</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-white transition">
                            <ThumbsDown className="w-3.5 h-3.5" />
                            <span>Inaccurate</span>
                          </button>
                        </div>

                        <span className="text-[10px] text-slate-500 font-mono">Doc: {currentDoc.fileName}</span>
                      </div>

                    </div>
                  </div>
                ) : (
                  <div className="bg-[#6366F1] text-white px-5 py-3.5 rounded-2xl rounded-tr-none text-xs font-semibold max-w-md shadow-lg">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}

          </div>

          {/* Bottom Chat Input Form & Preset Pills */}
          <div className="space-y-3 border-t border-[#1C2333] pt-3">
            
            {/* Quick Prompt Pills */}
            <div className="flex flex-wrap items-center gap-1.5 justify-center">
              {promptPills.map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => onSendMessage(pill.replace(/^[^\s]+\s/, ''))}
                  className="px-3 py-1.5 rounded-xl bg-[#0B0F19] hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Form Input */}
            <form onSubmit={handleSubmit} className="bg-[#0B0F19] border border-slate-800 rounded-2xl p-2 flex items-center space-x-3 shadow-xl">
              <button type="button" className="p-2 text-slate-400 hover:text-white">
                <Plus className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder={`Ask Red Flag AI about ${currentDoc.fileName}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-transparent text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-4 py-2 rounded-xl bg-[#00F0FF] hover:bg-[#00D8E6] text-[#060913] font-black text-xs disabled:opacity-40 flex items-center space-x-1.5 transition transform active:scale-95 shadow-md shadow-cyan-950/40"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <p className="text-center text-[10px] text-slate-500">
              Red Flag RAG AI provides security guidance, not binding legal counsel. Review output with qualified attorney.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};
