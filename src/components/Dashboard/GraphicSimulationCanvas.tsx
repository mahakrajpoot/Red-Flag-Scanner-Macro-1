import React, { useEffect, useRef } from 'react';
import { Shield } from 'lucide-react';

interface GraphicSimulationCanvasProps {
  statusText?: string;
  className?: string;
}

export const GraphicSimulationCanvas: React.FC<GraphicSimulationCanvasProps> = ({
  statusText = 'Scanning for threats...',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    const particles: { x: number; y: number; opacity: number; size: number }[] = [];

    // Initialize decorative scanning particles
    for (let i = 0; i < 16; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 80,
        y: (Math.random() - 0.5) * 80,
        opacity: Math.random(),
        size: Math.random() * 2 + 1
      });
    }

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) - 8;

      ctx.clearRect(0, 0, width, height);

      // Outer glowing ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Middle grid ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.65, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Inner ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.35, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Radar rotating sweep beam (pure visual gradient)
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + Math.PI / 4);
      ctx.closePath();
      const sweepGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      sweepGradient.addColorStop(0, 'rgba(0, 240, 255, 0.35)');
      sweepGradient.addColorStop(1, 'rgba(0, 240, 255, 0.02)');
      ctx.fillStyle = sweepGradient;
      ctx.fill();

      // Radar line lead
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle + Math.PI / 4) * radius,
        centerY + Math.sin(angle + Math.PI / 4) * radius
      );
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw particles
      particles.forEach((p) => {
        p.opacity += (Math.random() - 0.5) * 0.05;
        if (p.opacity < 0.1) p.opacity = 0.1;
        if (p.opacity > 0.9) p.opacity = 0.9;

        ctx.beginPath();
        ctx.arc(centerX + p.x, centerY + p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity})`;
        ctx.fill();
      });

      angle += 0.03;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center p-3 ${className}`}>
      {/* Canvas Radar Visual Target */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={112}
          height={112}
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10 w-11 h-11 rounded-full bg-[#0B0F19] border border-[#00F0FF]/60 flex items-center justify-center text-[#00F0FF] shadow-glow-cyan">
          <Shield className="w-5 h-5 fill-[#00F0FF]/20" />
        </div>
      </div>

      {/* Visual Equalizer / Spectrum Bar Simulation (NO AUDIO) */}
      <div className="mt-2 text-center space-y-1">
        <p className="text-[10px] font-extrabold text-slate-300 tracking-tight">
          {statusText}
        </p>
        
        {/* Animated Bar Spectrum Visualizer */}
        <div className="flex items-end justify-center space-x-1 h-3.5 pt-0.5">
          <span className="w-1 bg-[#00F0FF] rounded-full animate-[pulse_0.8s_infinite] h-2"></span>
          <span className="w-1 bg-[#00F0FF] rounded-full animate-[pulse_1.2s_infinite] h-3.5"></span>
          <span className="w-1 bg-[#00F0FF] rounded-full animate-[pulse_0.6s_infinite] h-1.5"></span>
          <span className="w-1 bg-[#00F0FF] rounded-full animate-[pulse_1.0s_infinite] h-3"></span>
          <span className="w-1 bg-[#00F0FF] rounded-full animate-[pulse_0.7s_infinite] h-2"></span>
        </div>
      </div>
    </div>
  );
};
