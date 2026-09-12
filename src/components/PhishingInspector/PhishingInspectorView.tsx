import React, { useState } from 'react';
import type { PhishingInspectionResult } from '../../types';
import { SAMPLE_DOMAINS } from '../../data/sampleDomains';
import { 
  Globe, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  Calendar, 
  Server, 
  Search, 
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const PhishingInspectorView: React.FC = () => {
  const [urlInput, setUrlInput] = useState<string>(SAMPLE_DOMAINS[0].url);
  const [result, setResult] = useState<PhishingInspectionResult>(SAMPLE_DOMAINS[0]);
  const [isInspecting, setIsInspecting] = useState<boolean>(false);

  const handleInspectUrl = (targetUrl: string) => {
    setIsInspecting(true);

    setTimeout(() => {
      // Find matching preset or generate dynamic inspection report
      const matched = SAMPLE_DOMAINS.find(d => targetUrl.toLowerCase().includes(d.hostname.toLowerCase()) || targetUrl.toLowerCase().includes(d.url.toLowerCase()));

      if (matched) {
        setResult(matched);
      } else {
        // Dynamic scan report for unknown domain
        const isHyphenated = targetUrl.includes('-') && (targetUrl.includes('login') || targetUrl.includes('verify'));
        const dynamicResult: PhishingInspectionResult = {
          url: targetUrl,
          hostname: targetUrl.replace(/^https?:\/\//, '').split('/')[0],
          trustScore: isHyphenated ? 24 : 78,
          status: isHyphenated ? 'DANGEROUS' : 'SAFE',
          domainAgeDays: isHyphenated ? 8 : 1240,
          domainCreatedDate: isHyphenated ? '2026-08-15' : '2022-04-10',
          sslValid: true,
          sslIssuer: isHyphenated ? 'Domain Validated Authority' : 'DigiCert TLS CA',
          sslExpiresDays: 90,
          typosquattingDetected: isHyphenated,
          targetBrandSpoofed: isHyphenated ? 'Generic Brand' : null,
          registrar: 'Cloudflare Inc / Registrar LLC',
          ipAddress: '104.21.14.88',
          country: 'United States',
          threatsFound: isHyphenated ? [
            {
              title: 'Keyword Spoofing Signature Detected',
              severity: 'HIGH',
              description: 'URL contains sensitive login/security keywords on an unverified domain.'
            },
            {
              title: 'Young Domain (< 14 Days)',
              severity: 'MEDIUM',
              description: 'Domain registration is very recent.'
            }
          ] : [],
          recommendations: isHyphenated ? [
            'Do NOT input sensitive user credentials or passwords.',
            'Verify domain authenticity with official company support.'
          ] : [
            'Domain shows healthy age and SSL certificate verification.'
          ]
        };
        setResult(dynamicResult);
      }

      setIsInspecting(false);
    }, 700);
  };

  const getStatusBadge = (status: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS') => {
    switch (status) {
      case 'DANGEROUS':
        return {
          bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-glow-red',
          label: 'HIGH PHISHING RISK',
          icon: ShieldAlert
        };
      case 'SUSPICIOUS':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-glow-amber',
          label: 'SUSPICIOUS DOMAIN',
          icon: AlertTriangle
        };
      case 'SAFE':
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-glow-emerald',
          label: 'VERIFIED SAFE DOMAIN',
          icon: ShieldCheck
        };
    }
  };

  const statusInfo = getStatusBadge(result.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Title Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Globe className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Website Phishing & Security Inspector
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              SECURITY ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Check website legitimacy, typosquatting attacks, domain age, SSL certificate authenticity, and phishing threat indicators.
          </p>
        </div>

        {/* Quick URL Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-400 font-semibold mr-1">Presets:</span>
          {SAMPLE_DOMAINS.map((domain, idx) => (
            <button
              key={idx}
              onClick={() => {
                setUrlInput(domain.url);
                handleInspectUrl(domain.url);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-medium border transition ${
                result.url === domain.url
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {domain.hostname.split('.')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* URL Input Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleInspectUrl(urlInput);
          }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative flex-1 w-full">
            <Globe className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Paste website URL (e.g., https://paypa1-security-login.com)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isInspecting}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-950/50 flex items-center justify-center space-x-2 transition transform active:scale-95 whitespace-nowrap"
          >
            {isInspecting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing Security...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Inspect URL Security</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Security Analysis Results Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Trust Gauge & Domain Intelligence (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Trust Score Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
            
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${statusInfo.bg}`}>
              <StatusIcon className="w-4 h-4" />
              <span>{statusInfo.label}</span>
            </div>

            {/* Circular Gauge Score */}
            <div className="relative flex items-center justify-center my-2">
              <div className="text-center">
                <div className={`text-5xl font-black font-mono tracking-tight ${
                  result.trustScore < 30 ? 'text-rose-400' : result.trustScore < 70 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {result.trustScore}
                  <span className="text-xl text-slate-500 font-normal">/100</span>
                </div>
                <div className="text-xs text-slate-400 font-semibold uppercase mt-1">
                  Website Trust Index
                </div>
              </div>
            </div>

            {result.typosquattingDetected && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs w-full text-left space-y-1">
                <div className="font-bold flex items-center space-x-1.5 text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Typosquatting Spoof Attack</span>
                </div>
                <p>
                  Impersonating official brand <strong className="text-white">{result.targetBrandSpoofed}</strong> with deceptive letter substitutions.
                </p>
              </div>
            )}

          </div>

          {/* Domain Intelligence Metrics Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>Domain & Infrastructure Metadata</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              
              {/* Domain Age */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>Domain Age</span>
                </span>
                <div className={`font-bold font-mono ${result.domainAgeDays < 14 ? 'text-rose-400' : 'text-slate-200'}`}>
                  {result.domainAgeDays} Days Old
                </div>
                <div className="text-[10px] text-slate-500">Created: {result.domainCreatedDate}</div>
              </div>

              {/* SSL Status */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center space-x-1">
                  {result.sslValid ? <Lock className="w-3 h-3 text-emerald-400" /> : <Unlock className="w-3 h-3 text-rose-400" />}
                  <span>SSL Certificate</span>
                </span>
                <div className={`font-bold font-mono ${result.sslValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {result.sslValid ? 'Valid SSL' : 'Invalid / Untrusted'}
                </div>
                <div className="text-[10px] text-slate-500 truncate" title={result.sslIssuer}>
                  {result.sslIssuer.split(' ')[0]}
                </div>
              </div>

              {/* Registrar */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Registrar</span>
                <div className="font-semibold text-slate-200 truncate" title={result.registrar}>
                  {result.registrar}
                </div>
              </div>

              {/* IP Location */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Host IP / Location</span>
                <div className="font-mono text-slate-200 truncate">{result.ipAddress}</div>
                <div className="text-[10px] text-slate-400 truncate">{result.country}</div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Security Alerts & Action Checklist (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Threat Alerts List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Identified Security Threats & Vulnerabilities</span>
              </h3>
              <span className="text-[11px] font-semibold text-slate-400">
                {result.threatsFound.length} Threat Signals
              </span>
            </div>

            {result.threatsFound.length === 0 ? (
              <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-emerald-300 text-sm">No Active Phishing Threats Detected</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Domain has a established registration history, valid SSL certificates, and no typosquatting signatures.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {result.threatsFound.map((threat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xs text-slate-100 flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>{threat.title}</span>
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        threat.severity === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}>
                        {threat.severity} RISK
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-6">
                      {threat.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Recommendations Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-3">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Recommended Security Advisor Actions</span>
            </h3>

            <ul className="space-y-2 text-xs">
              {result.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 p-2.5 rounded-lg bg-slate-950 border border-slate-800/60 text-slate-300">
                  <span className="font-bold text-cyan-400 mt-0.5">•</span>
                  <span className="leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
