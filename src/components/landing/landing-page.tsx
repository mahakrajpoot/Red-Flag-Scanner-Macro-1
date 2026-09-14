"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  FileCheck2,
  Sparkles,
  FileDown,
  ArrowRight,
  Lock,
  Zap,
  Bot,
  Gauge,
  History,
  ShieldCheck,
  UploadCloud,
  FileSearch,
  CheckCircle2,
  Play,
  Layers,
  ArrowUpRight,
  UserCheck,
} from "lucide-react";

export function LandingPage() {
  const features = [
    {
      title: "Full Document Scanner",
      description:
        "Upload PDF or DOCX files and get comprehensive AI-powered analysis with red flag detection and risk scoring.",
      badge: "PDF / DOCX Upload",
      icon: FileCheck2,
      accent: "from-purple-500/20 to-indigo-500/10",
      iconColor: "text-purple-400",
      badgeBorder: "border-purple-500/30 text-purple-300",
    },
    {
      title: "Fast Clause Scanner",
      description:
        "Scan specific clauses or sections instantly to find risky language, unusual terms and compliance issues.",
      badge: "Clause by Clause",
      icon: Zap,
      accent: "from-cyan-500/20 to-blue-500/10",
      iconColor: "text-cyan-400",
      badgeBorder: "border-cyan-500/30 text-cyan-300",
    },
    {
      title: "AI Contract Assistant (RAG)",
      description:
        "Ask questions, get plain-language explanations and receive guidance from our AI assistant using your document context (RAG).",
      badge: "Chat & Get Guidance",
      icon: Bot,
      accent: "from-pink-500/20 to-rose-500/10",
      iconColor: "text-pink-400",
      badgeBorder: "border-pink-500/30 text-pink-300",
    },
    {
      title: "Risk Score & Red Flag Detection",
      description:
        "Get an instant risk score with highlighted red flags, potential issues and impact levels for quick assessment.",
      badge: "High / Medium / Low",
      icon: Gauge,
      accent: "from-red-500/20 to-rose-500/10",
      iconColor: "text-red-400",
      badgeBorder: "border-red-500/30 text-red-300",
    },
    {
      title: "History & Reports",
      description:
        "Access your past analyses, compare results and export detailed reports in PDF format.",
      badge: "Save & Export",
      icon: History,
      accent: "from-violet-500/20 to-purple-500/10",
      iconColor: "text-violet-400",
      badgeBorder: "border-violet-500/30 text-violet-300",
    },
    {
      title: "Secure Analysis",
      description:
        "Your documents and data are encrypted and handled with top security practices for complete privacy and safety.",
      badge: "Your Data, Your Control",
      icon: ShieldCheck,
      accent: "from-emerald-500/20 to-teal-500/10",
      iconColor: "text-emerald-400",
      badgeBorder: "border-emerald-500/30 text-emerald-300",
    },
  ];

  const steps = [
    {
      number: "1",
      icon: UploadCloud,
      title: "Upload or paste contract",
      description:
        "Add your PDF/DOCX file or paste the text directly into the platform.",
      gradient: "from-pink-500 to-rose-500",
      bgBadge: "bg-pink-500/20 text-pink-400 border-pink-500/40",
      iconBg: "bg-purple-950/60 border-purple-500/30 text-purple-400",
    },
    {
      number: "2",
      icon: FileSearch,
      title: "AI analyzes risks and clauses",
      description:
        "Our AI scans for red flags, checks clauses, calculates risk scores and finds potential issues.",
      gradient: "from-cyan-500 to-blue-500",
      bgBadge: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
      iconBg: "bg-blue-950/60 border-blue-500/30 text-cyan-400",
    },
    {
      number: "3",
      icon: FileDown,
      title: "Get insights and export report",
      description:
        "View clear results, get AI guidance and export a detailed report in PDF format.",
      gradient: "from-emerald-500 to-teal-500",
      bgBadge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      iconBg: "bg-emerald-950/60 border-emerald-500/30 text-emerald-400",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#07070b] text-gray-100 selection:bg-pink-500/30 selection:text-pink-200 overflow-x-hidden">
      {/* Dynamic atmospheric ambient glows & background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[3px] opacity-25"
          style={{ backgroundImage: "url('/bg-workspace.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070b]/95 via-[#080812]/92 to-[#07070b]/98" />
        
        {/* Ambient colored glowing orbs */}
        <div className="absolute top-[5%] left-[10%] w-[550px] h-[550px] rounded-full bg-pink-600/10 blur-[150px]" />
        <div className="absolute top-[25%] right-[5%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[160px]" />
        <div className="absolute top-[55%] left-[25%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[150px]" />
        <div className="absolute bottom-[5%] right-[15%] w-[600px] h-[600px] rounded-full bg-pink-600/12 blur-[160px]" />
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#07070b]/75 border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 via-rose-500 to-pink-600 p-[1px] shadow-lg shadow-pink-500/20 group-hover:shadow-pink-500/40 transition-all">
              <div className="w-full h-full bg-[#0d0d18] rounded-[11px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-rose-500 fill-rose-500/20" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>Red Flag</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
                  Scanner
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a
              href="#features"
              className="hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors duration-200"
            >
              How It Works
            </a>
            <a
              href="#security"
              className="hover:text-white transition-colors duration-200"
            >
              Security
            </a>
          </nav>

          {/* Start / Login CTA Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:via-rose-500 hover:to-pink-500 shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Start / Login to Analyze</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 md:pt-20 pb-16 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-xs font-medium text-cyan-300">
              <span className="text-cyan-400">✦</span>
              <span>AI-Powered Legal Document & Web Security Advisor</span>
            </div>

            {/* Main Display Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Smarter Contracts. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400">
                  Safer Decisions.
                </span>
              </h1>
            </div>

            {/* Subtitle / Description */}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Red Flag Scanner uses advanced AI to analyze legal documents and
              web content, detect red flags, calculate risk scores, scan clauses,
              provide AI chat guidance, and help you export clear, actionable
              reports — all in one place.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:via-rose-500 hover:to-pink-500 shadow-xl shadow-rose-600/35 hover:shadow-rose-600/55 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Start / Login to Analyze</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-gray-200 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-gray-300 text-gray-300" />
                <span>Explore Features</span>
              </a>
            </div>

            {/* Visual Process Breadcrumb Card */}
            <div className="pt-3 max-w-md">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-300 mb-1.5">
                  <span className="flex items-center gap-1.5 text-pink-400">
                    <UserCheck className="w-3.5 h-3.5" /> Start
                  </span>
                  <span className="text-gray-500">→</span>
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Lock className="w-3.5 h-3.5" /> Login
                  </span>
                  <span className="text-gray-500">→</span>
                  <span className="flex items-center gap-1.5 text-purple-400">
                    <Layers className="w-3.5 h-3.5" /> Dashboard
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-normal">
                  Click &ldquo;Start / Login to Analyze&rdquo; to go to the Login
                  Page. After successful login, you&apos;ll reach the Dashboard.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase Mockup (Laptop & Legal Atmosphere matching reference image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 via-cyan-500/15 to-purple-600/20 rounded-3xl blur-3xl -z-10" />

            {/* Laptop & Workspace Showcase Container */}
            <div className="relative w-full max-w-lg lg:max-w-xl rounded-3xl p-4 sm:p-6 bg-gradient-to-b from-white/[0.09] to-white/[0.02] border border-white/[0.12] backdrop-blur-2xl shadow-2xl overflow-hidden">
              {/* Top ambient highlight line */}
              <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />

              {/* Mockup Screen Frame */}
              <div className="relative rounded-2xl bg-[#0b0c16] border border-white/[0.1] shadow-2xl overflow-hidden aspect-[16/10] flex flex-col">
                {/* Mockup Window Bar */}
                <div className="h-8 bg-[#090912] border-b border-white/[0.06] px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-[11px] text-gray-500 font-mono">
                    redflag-scanner.app
                  </span>
                  <div className="w-10" />
                </div>

                {/* Mockup Internal Screen Display */}
                <div className="flex-1 relative flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-radial from-[#131226] via-[#0b0c16] to-[#07070b]">
                  {/* Glowing subtle ring */}
                  <div className="absolute w-64 h-64 rounded-full border border-rose-500/20 animate-pulse-slow" />
                  <div className="absolute w-44 h-44 rounded-full bg-rose-500/10 blur-xl" />

                  {/* Brand Shield Logo */}
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 via-rose-500 to-pink-600 p-[1px] shadow-2xl shadow-rose-600/40">
                      <div className="w-full h-full bg-[#0e0e1a] rounded-[15px] flex items-center justify-center">
                        <Shield className="w-8 h-8 text-rose-500 fill-rose-500/20" />
                      </div>
                    </div>
                  </div>

                  {/* Red Flag Scanner text */}
                  <div className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                    Red Flag{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
                      Scanner
                    </span>
                  </div>

                  {/* Slogan */}
                  <p className="text-xs sm:text-sm text-gray-400 font-medium tracking-wide">
                    Analyze • Detect • Stay Safe
                  </p>

                  {/* Floating mini stats badges */}
                  <div className="mt-5 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 99.4% Accuracy
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-pink-500/15 border border-pink-500/30 text-pink-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI Powered
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom legal context bar inside showcase */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Legal AI Engine Active
                </span>
                <span className="font-mono text-gray-500">CONTRACT LAW • RESEARCH</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 py-16 md:py-24 border-t border-white/[0.06] bg-[#07070b]/60 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300">
              <span>★</span>
              <span>Powerful Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Everything You Need for Safer Contracts
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              From document analysis to AI guidance, Red Flag Scanner gives you
              the tools to spot risks, understand clauses and make confident
              decisions.
            </p>
          </div>

          {/* 6 Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.16] backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Subtle top gradient glow on hover */}
                <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-pink-500/40 transition-all duration-500" />

                <div>
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.accent} border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                {/* Card Bottom Pill Tag & Arrow */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <span
                    className={`text-xs px-3 py-1 rounded-full border bg-white/[0.02] font-medium ${feature.badgeBorder}`}
                  >
                    {feature.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] group-hover:bg-pink-600/20 group-hover:text-pink-400 flex items-center justify-center text-gray-400 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="relative z-10 py-16 md:py-24 border-t border-white/[0.06] bg-[#090912]/80 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
              <span>⚙</span>
              <span>Simple Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              How It Works
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Get from document to insights in just 3 simple steps.
            </p>
          </div>

          {/* 3 Step Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={step.title} className="relative flex flex-col">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl flex flex-col h-full hover:border-white/[0.18] transition-all">
                  {/* Step Header with Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border ${step.bgBadge}`}
                      >
                        {step.number}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center ${step.iconBg}`}
                      >
                        <step.icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step indicator arrow for desktop */}
                    {idx < 2 && (
                      <span className="hidden md:inline-block text-gray-600 text-lg font-bold">
                        →
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy Trust Row */}
      <section
        id="security"
        className="relative z-10 py-12 md:py-16 border-t border-white/[0.06] bg-[#07070b]/90 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Your Privacy Matters
                </h4>
                <p className="text-xs text-gray-400">
                  No data is shared with third parties.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Secure Document Handling
                </h4>
                <p className="text-xs text-gray-400">
                  Encrypted storage &amp; industry best practices.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Actionable Legal Insights
                </h4>
                <p className="text-xs text-gray-400">
                  Find risks, understand clauses, make better decisions. (Not legal advice.)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="relative z-10 py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-red-950/40 via-purple-950/30 to-blue-950/40 border border-white/[0.12] backdrop-blur-2xl shadow-2xl">
          {/* Ambient Glows inside Banner */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <Gauge className="w-5 h-5" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Ready to analyze your contract?
                </h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base">
                Start now and turn complex documents into clear, actionable
                insights.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:via-rose-500 hover:to-pink-500 shadow-xl shadow-rose-600/40 hover:shadow-rose-600/60 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Start / Login to Analyze</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-full bg-black/40 border border-white/10 text-xs text-gray-300">
                <span className="text-pink-400">Start</span>
                <span className="text-gray-600">→</span>
                <span className="text-cyan-400">Login</span>
                <span className="text-gray-600">→</span>
                <span className="text-purple-400">Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 border-t border-white/[0.06] bg-[#050508] text-gray-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-rose-500" />
            <span className="font-semibold text-gray-200">
              Red Flag Scanner
            </span>
            <span>— AI-powered legal document &amp; web security advisor.</span>
          </div>

          <div className="text-gray-500 text-center md:text-right">
            <span>
              Informational tool only. Does not constitute formal legal advice.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
