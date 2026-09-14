"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Shield,
  FileCheck2,
  AlertTriangle,
  Sparkles,
  FileDown,
  ArrowRight,
  Lock,
  Mail,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("mahak.rajpoot@example.com");
  const [password, setPassword] = useState("••••••••••••");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  const featureHighlights = [
    { icon: FileCheck2, text: "Scan Contracts & PDFs" },
    { icon: AlertTriangle, text: "Find Risky Clauses" },
    { icon: Sparkles, text: "Get AI Guidance" },
    { icon: FileDown, text: "Export Reports" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8 bg-obsidian text-gray-100 overflow-hidden">
      {/* Background image & deep atmospheric lighting */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[2px] opacity-35"
          style={{ backgroundImage: "url('/bg-workspace.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#07070b]/95 via-[#0c0a17]/90 to-[#07070b]/98" />
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[15%] w-[450px] h-[450px] rounded-full bg-violet-600/12 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Brand presentation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pr-6"
        >
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/25">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Red Flag <span className="text-red-400">Scanner</span>
              </span>
              <span className="text-xs text-gray-400 tracking-wider uppercase font-medium">
                Legal Document & Web Security Advisor
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Smarter Contracts. <br />
              <span className="text-gradient-crimson">Safer Decisions.</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-xl leading-relaxed pt-2">
              AI-powered legal document & web security advisor. Detect risks, understand your rights, and move forward with confidence.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 max-w-lg">
            {featureHighlights.map((item, idx) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-sm font-medium text-gray-200">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Footer note matching reference */}
          <div className="pt-4 text-xs italic text-gray-400 flex items-center gap-2">
            <span className="text-red-400">★</span>
            <span>Your contracts, Our AI. A safer tomorrow.</span>
          </div>
        </motion.div>

        {/* Right Side: Elegant Glass Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <div className="glass-panel p-8 md:p-10 shadow-2xl relative overflow-hidden border border-white/[0.12] bg-[#0f0e1a]/80 backdrop-blur-2xl">
            {/* Top subtle glow edge */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

            <div className="space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-400">
                Sign in to continue to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@example.com"
                    className="glass-input w-full pl-10 pr-4 py-2.5 text-sm bg-white/[0.04] border-white/10 focus:border-red-500/50 text-white placeholder:text-gray-500 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="glass-input w-full pl-10 pr-4 py-2.5 text-sm bg-white/[0.04] border-white/10 focus:border-red-500/50 text-white placeholder:text-gray-500 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-white/20 bg-white/5 text-red-500 focus:ring-red-500/30"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 transition-all shadow-lg shadow-red-600/30 hover:shadow-red-600/50 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="relative my-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/[0.08]" />
                </div>
                <span className="relative px-3 text-xs uppercase bg-[#0e0d18] text-gray-500">
                  OR
                </span>
              </div>

              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-medium text-gray-200 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 transition-colors flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <p className="text-center text-xs text-gray-400 pt-2">
                Don&apos;t have an account?{" "}
                <Link
                  href="/dashboard"
                  className="text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
