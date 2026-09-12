import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, DocumentAnalysisReport } from '../../types';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  FileText, 
  HelpCircle,
  Clock
} from 'lucide-react';

interface ChatViewProps {
  currentDoc: DocumentAnalysisReport;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  currentDoc,
  messages,
  onSendMessage
}) => {
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Explain clause 9.2 in simple terms.',
    'Is there any auto-renewal clause?',
    'What are my termination obligations?',
    'How does the non-compete impact my future jobs?',
    'Can I limit the indemnification clause?'
  ];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 flex-shrink-0">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Context-Aware AI Legal Chatbot
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              MULTI-TURN AI
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ask specific legal questions about your loaded contract. Get instant clause citations and plain-English answers.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
          <FileText className="w-4 h-4 text-rose-400" />
          <span className="text-slate-400">Active Document:</span>
          <strong className="text-slate-200">{currentDoc.fileName}</strong>
        </div>
      </div>

      {/* Suggested Questions Row */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 flex-shrink-0">
        <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1 whitespace-nowrap">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Prompts:</span>
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSendMessage(q)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium whitespace-nowrap transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-4 overflow-y-auto space-y-4 shadow-xl">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[75%] p-4 rounded-2xl leading-relaxed space-y-3 text-xs ${
                msg.sender === 'user'
                  ? 'bg-rose-600 text-white rounded-br-none shadow-lg'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>

              {/* Clause Citations */}
              {msg.clauseReferences && msg.clauseReferences.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Clause Citations:</span>
                  {msg.clauseReferences.map((clause, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    >
                      {clause}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-[10px] opacity-60 text-right font-mono flex items-center justify-end space-x-1">
                <Clock className="w-3 h-3" />
                <span>{msg.timestamp}</span>
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center flex-shrink-0 mt-1 border border-slate-700">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input Row */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-xl flex items-center space-x-3 flex-shrink-0">
        <input
          type="text"
          placeholder="Ask a question about your contract clauses..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
        />

        <button
          type="submit"
          disabled={!input.trim()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-md shadow-rose-950/50 disabled:opacity-40 transition flex items-center space-x-2"
        >
          <span>Send Question</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
