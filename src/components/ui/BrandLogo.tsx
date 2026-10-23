import React from "react";

export function BrandLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`relative ${className} shrink-0`}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
          <defs>
            <linearGradient id="logoHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#00FF9D" />
            </linearGradient>
            <linearGradient id="logoWave1" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#00F0FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#00FF9D" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="logoBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0B1528" />
              <stop offset="100%" stopColor="#07090E" />
            </radialGradient>
          </defs>

          {/* Hexagonal Energy Cell Background */}
          <polygon
            points="32,5 57,19 57,45 32,59 7,45 7,19"
            fill="url(#logoBg)"
            stroke="url(#logoHexGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Inner Concentric Circuit Hex */}
          <polygon
            points="32,12 50,23 50,41 32,52 14,41 14,23"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="0.75"
            strokeOpacity="0.35"
            strokeDasharray="3,3"
          />

          {/* Primary Pulse Wave */}
          <path
            d="M12,32 C18,22 22,42 28,32 C32,24 36,39 42,32 C46,27 50,35 52,32"
            fill="none"
            stroke="url(#logoWave1)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Synaptic Node */}
          <circle cx="32" cy="32" r="2.5" fill="#00FF9D" />
          <circle cx="32" cy="32" r="1" fill="#FFFFFF" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-bold tracking-wider text-base uppercase bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 dark:from-cyan-400 dark:via-teal-300 dark:to-emerald-300 bg-clip-text text-transparent">
          NeuroGrid OS
        </span>
        <span className="text-[10px] tracking-widest uppercase font-mono text-slate-500 dark:text-slate-400">
          AI Virtual Power Plant
        </span>
      </div>
    </div>
  );
}
