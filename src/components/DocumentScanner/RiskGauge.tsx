import React from 'react';
import type { RiskLevel } from '../../types';
import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface RiskGaugeProps {
  score: number; // 0 - 100
  riskLevel: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, riskLevel, size = 'md' }) => {
  const getSeverityColors = (level: RiskLevel) => {
    switch (level) {
      case 'HIGH':
        return {
          stroke: '#EF4444',
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/30',
          text: 'text-rose-400',
          glow: 'shadow-glow-red',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          icon: ShieldAlert
        };
      case 'MEDIUM':
        return {
          stroke: '#F59E0B',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          glow: 'shadow-glow-amber',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          icon: AlertTriangle
        };
      case 'LOW':
        return {
          stroke: '#10B981',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          glow: 'shadow-glow-emerald',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          icon: CheckCircle2
        };
    }
  };

  const colors = getSeverityColors(riskLevel);
  const Icon = colors.icon;

  // SVG Gauge calculations
  const radius = size === 'lg' ? 52 : size === 'sm' ? 28 : 42;
  const strokeWidth = size === 'lg' ? 10 : size === 'sm' ? 6 : 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-2xl ${colors.bg} border ${colors.border} ${colors.glow} backdrop-blur-md relative`}>
      <div className="relative flex items-center justify-center">
        <svg
          className={`transform -rotate-90 ${
            size === 'lg' ? 'w-36 h-36' : size === 'sm' ? 'w-20 h-20' : 'w-28 h-28'
          }`}
        >
          {/* Background circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            className="stroke-slate-800"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated score arc */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center text display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-black tracking-tight ${colors.text} ${
            size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-lg' : 'text-2xl'
          }`}>
            {score}
          </span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Risk Index
          </span>
        </div>
      </div>

      {/* Severity Badge */}
      <div className={`mt-3 flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${colors.badge}`}>
        <Icon className="w-3.5 h-3.5" />
        <span>{riskLevel} RISK CONTRACT</span>
      </div>
    </div>
  );
};
