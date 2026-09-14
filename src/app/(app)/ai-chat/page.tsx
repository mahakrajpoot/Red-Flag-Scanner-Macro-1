"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Bot,
  User,
  Send,
  Sparkles,
  FileText,
  ChevronDown,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { TypingIndicator } from "@/components/animations/typing-indicator";
import { demoChatMessages, aiResponses, ChatMessage } from "@/data/demo-data";

export default function AiChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(demoChatMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState("Influencer_Agreement.pdf");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputText.toLowerCase();
    setInputText("");
    setIsTyping(true);

    // Simulate grounded retrieval and answer generation
    setTimeout(() => {
      let matchedResponse = aiResponses["default"];

      for (const [key, val] of Object.entries(aiResponses)) {
        if (query.includes(key)) {
          matchedResponse = val;
          break;
        }
      }

      if (query.includes("non-compete") || query.includes("compete")) {
        matchedResponse = {
          content:
            "Yes, Section 5.3 strictly prohibits the employee from working for or advising any competing entities within a nationwide territory for 2 years following termination. This has been flagged as a critical red flag.",
          citation: "Ref: Section 5.3",
        };
      } else if (query.includes("payment") || query.includes("pay") || query.includes("money")) {
        matchedResponse = aiResponses["what is the payment terms"];
      } else if (query.includes("terminate") || query.includes("notice") || query.includes("cancel")) {
        matchedResponse = {
          content:
            "Section 7.2 requires a written 30-day notice period for voluntary termination. For material breaches, Section 7.4 permits immediate termination if the default is not cured within 10 calendar days.",
          citation: "Ref: Section 7.2 & 7.4",
        };
      } else if (query.includes("ip") || query.includes("intellectual property") || query.includes("ownership")) {
        matchedResponse = aiResponses["who owns the intellectual property"];
      } else if (query.includes("liability") || query.includes("damages") || query.includes("cap")) {
        matchedResponse = {
          content:
            "Section 4.2 contains an uncapped indemnification and liability clause. Neither party has negotiated a ceiling, meaning you could theoretically face unlimited exposure.",
          citation: "Ref: Section 4.2 (Uncapped Liability)",
        };
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: matchedResponse.content,
        citation: matchedResponse.citation,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1100);
  };

  const samplePrompts = [
    "What is the notice period for termination?",
    "Are there any non-compete clauses?",
    "Who owns the intellectual property?",
    "Is liability capped or unlimited?",
  ];

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col max-w-5xl mx-auto">
      {/* Header bar matching reference */}
      <GlassPanel className="p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-violet-400" />
            <span>AI Contract Assistant</span>
          </h1>
          <p className="text-xs text-gray-400">
            Ask questions about your contract. Get accurate, grounded answers with clause citations.
          </p>
        </div>

        {/* Active Document Selector */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-gray-200 cursor-pointer hover:border-violet-500/40 transition-all">
          <FileText className="w-4 h-4 text-red-400" />
          <span className="font-medium">{selectedDoc}</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold ml-1">
            Active
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
        </div>
      </GlassPanel>

      {/* Chat Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4 scroll-smooth">
        {messages.map((msg) => {
          const isUser = msg.role === "user";

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-violet-400" />
                </div>
              )}

              <div
                className={`max-w-xl rounded-2xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-sm shadow-md"
                    : "glass-panel bg-[#121122]/80 border-white/10 text-gray-100 rounded-tl-sm shadow-lg"
                }`}
              >
                <p>{msg.content}</p>

                {msg.citation && (
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-1.5 text-xs text-violet-300 font-medium">
                    <Quote className="w-3.5 h-3.5 text-violet-400" />
                    <span>[{msg.citation}]</span>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-violet-400" />
            </div>
            <div className="glass-panel p-2 rounded-2xl bg-[#121122]/80 border-white/10">
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      <div className="flex items-center gap-2 overflow-x-auto py-2 mb-2 no-scrollbar">
        {samplePrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => setInputText(prompt)}
            className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/[0.08] whitespace-nowrap transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Field Form */}
      <form onSubmit={handleSendMessage} className="shrink-0">
        <GlassPanel className="p-2 flex items-center gap-2 border-white/10 focus-within:border-red-500/40 transition-all">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask a question about your contract..."
            className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="btn-primary p-2.5 rounded-xl text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-red-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </GlassPanel>
      </form>
    </div>
  );
}
