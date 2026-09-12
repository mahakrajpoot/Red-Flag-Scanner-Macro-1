import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, DocumentAnalysisReport } from '../../types';
import { 
  Sparkles, 
  Send, 
  X, 
  Maximize2, 
  Bot, 
  User
} from 'lucide-react';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentDoc: DocumentAnalysisReport;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onMaximizeTab: () => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  isOpen,
  onClose,
  currentDoc,
  messages,
  onSendMessage,
  onMaximizeTab
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'What does clause 9.2 mean?',
    'Can I terminate this agreement early?',
    'Are there any IP transfer risks?',
    'How can I fix the liability clause?'
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] transition-all duration-300 backdrop-blur-xl">
      
      {/* Drawer Header */}
      <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-md">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-white flex items-center space-x-1.5">
              <span>Legal AI Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h3>
            <p className="text-[10px] text-slate-400 truncate max-w-[200px]" title={currentDoc.fileName}>
              Context: {currentDoc.fileName}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={onMaximizeTab}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Expand to Full Tab"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Close drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompt Pills */}
      <div className="p-2 bg-slate-950/60 border-b border-slate-800 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSendMessage(prompt)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-[10px] font-medium whitespace-nowrap border border-slate-700/60 transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message History List */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-950/40 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center flex-shrink-0 mt-0.5 border border-rose-500/30">
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>
            )}

            <div
              className={`max-w-[82%] p-3 rounded-2xl leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-rose-600 text-white rounded-br-none shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>

              {/* Clause references citation pill */}
              {msg.clauseReferences && msg.clauseReferences.length > 0 && (
                <div className="pt-1.5 border-t border-slate-800 flex flex-wrap gap-1">
                  {msg.clauseReferences.map((clause, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    >
                      Ref: {clause}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-[9px] opacity-60 text-right font-mono">
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5 border border-slate-700">
                <User className="w-3 h-3" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer Chat Input */}
      <form onSubmit={handleSubmit} className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
        <input
          type="text"
          placeholder={`Ask about ${currentDoc.fileName}...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white disabled:opacity-40 transition shadow-md"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
