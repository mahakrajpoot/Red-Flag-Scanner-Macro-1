import React, { useState } from 'react';
import type { UserProfile } from '../../types';
import { 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles,
  CheckCircle2,
  User
} from 'lucide-react';

interface AuthModalViewProps {
  onLoginSuccess: (user: UserProfile) => void;
  currentUserProfile?: UserProfile;
}

export const AuthModalView: React.FC<AuthModalViewProps> = ({ onLoginSuccess, currentUserProfile }) => {
  const [name, setName] = useState(currentUserProfile?.name || 'Mahak Rajpoot');
  const [email, setEmail] = useState(currentUserProfile?.email || 'mahak.rajpoot@security-ai.com');
  const [role, setRole] = useState(currentUserProfile?.role || 'Security Analyst');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return 'US';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: UserProfile = {
      name: name || 'Mahak Rajpoot',
      email: email || 'user@enterprise.com',
      role: role || 'Security Analyst',
      initials: getInitials(name || 'Mahak Rajpoot')
    };
    onLoginSuccess(updatedUser);
  };


  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-[#070A12]">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B0F19] border border-[#1C2333] rounded-3xl p-8 shadow-2xl overflow-hidden relative">
        
        {/* Left Side: Hero Branding & Value Props (7 cols) */}
        <div className="lg:col-span-7 space-y-8 pr-2">
          
          {/* Brand Logo Header */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0B0F19] border border-slate-700/60 flex items-center justify-center text-[#00F0FF] shadow-glow-cyan">
              <Shield className="w-6 h-6 text-[#00F0FF] fill-[#00F0FF]/20" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-xl tracking-tight">
                Red Flag Scanner
              </h2>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30 uppercase tracking-wider">
                AI LEGAL & SECURITY ADVISOR
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Instant Legal Contract Risk Analysis & Web Security Intelligence
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              Detect uncapped liabilities, non-compete traps, and phishing security threats with automated AI counter-clause suggestions.
            </p>
          </div>

          {/* Feature Highlights Cards */}
          <div className="space-y-3 pt-1">
            
            <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-[#111625] border border-[#1C2333]">
              <div className="p-2.5 rounded-xl bg-[#FF2A5F]/15 text-[#FF2A5F] border border-[#FF2A5F]/30 flex-shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-xs">Instant PDF Liability Detection</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Automatically flag dangerous indemnities, liability caps, and termination traps in seconds.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-[#111625] border border-[#1C2333]">
              <div className="p-2.5 rounded-xl bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-xs">Context-Aware RAG AI Chatbot</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Interrogate active contracts with inline citations and automated legal counter-offers.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-[#111625] border border-[#1C2333]">
              <div className="p-2.5 rounded-xl bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30 flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-xs">Negotiation AI Counter-Clauses</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Get safer alternative wording ready to copy into contract redlines.
                </p>
              </div>
            </div>

          </div>

          {/* Trust Badges */}
          <div className="pt-2 border-t border-[#1C2333] space-y-2">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
              ENTERPRISE SECURITY & SOC-2 CERTIFIED
            </span>
            <div className="flex items-center space-x-6 text-slate-400 font-bold text-xs">
              <span className="flex items-center space-x-1.5">⚖️ LawInsider Certified</span>
              <span className="flex items-center space-x-1.5">🔒 256-Bit TLS Encryption</span>
            </div>
          </div>

        </div>

        {/* Right Side: Modern Login Form Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#111625] border border-[#1C2333] rounded-3xl p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-white tracking-tight">
              Sign In to Red Flag
            </h2>
            <p className="text-xs text-slate-400">
              Access your security workspace & saved contract reports.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">User Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mahak Rajpoot"
                  className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:border-[#00F0FF]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Corporate Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:border-[#00F0FF]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Job Title / Role</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Security Analyst"
                  className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:border-[#00F0FF]"
                  required
                />
              </div>
            </div>



            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-slate-300 font-bold">Password</label>
                <a href="#forgot" className="text-[#00F0FF] hover:underline text-[11px] font-semibold">Forgot Password?</a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-slate-200 focus:outline-none focus:border-[#00F0FF]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500 hover:text-slate-300 absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                defaultChecked
                className="rounded bg-slate-900 border-slate-800 text-[#00F0FF] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="remember" className="text-slate-400 cursor-pointer text-xs">Remember session on this device</label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#00F0FF] hover:bg-[#00D8E6] text-[#060913] font-black text-xs shadow-lg shadow-cyan-950/40 flex items-center justify-center space-x-2 transition transform active:scale-98"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-3 text-slate-500 text-[10px] uppercase font-bold">Or continue with</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-[#0B0F19] hover:bg-slate-900 text-slate-200 font-bold text-xs border border-slate-800 flex items-center justify-center space-x-2 transition"
            >
              <span>🌐 Sign In with Google OAuth</span>
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};
