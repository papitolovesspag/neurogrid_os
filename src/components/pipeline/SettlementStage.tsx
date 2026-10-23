"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, CheckCircle2, DollarSign } from "lucide-react";

export function SettlementStage() {
  const [settledAmount, setSettledAmount] = useState(148290);
  const [frequencyValue, setFrequencyValue] = useState(60.00);

  // Live frequency jitter simulation around 60.00 Hz nominal lock
  useEffect(() => {
    const interval = setInterval(() => {
      // Nominal lock with micro-fluctuation within +/- 0.004 Hz
      const microJitter = 60.00 + (Math.random() * 0.008 - 0.004);
      setFrequencyValue(parseFloat(microJitter.toFixed(3)));
      setSettledAmount((prev) => prev + Math.floor(Math.random() * 15 + 5));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="font-mono text-xs text-amber-500 font-bold tracking-wider">STAGE 04 // GRID BALANCING &amp; SETTLEMENT</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Frequency Droop Control &amp; Ledger Settlement</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono text-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Droop Curve Governed</span>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        Sub-second primary frequency response stabilizes system disturbance from 59.84 Hz decay back to 60.00 Hz nominal lock. Automated M&amp;V cryptographic ledger computes baseline settlements and revenue shares instantaneously.
      </p>

      {/* Frequency Oscilloscope Visualizer */}
      <div className="relative p-6 rounded-2xl bg-obsidian-950 border border-slate-800 overflow-hidden text-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Live Frequency Oscilloscope</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold font-mono text-amber-400">{frequencyValue.toFixed(2)} Hz</span>
                <span className="text-xs font-mono text-emerald-400">NOMINAL LOCK</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="p-2 rounded-lg bg-obsidian-900 border border-slate-800">
              <span className="text-slate-500 text-[10px] block">Initial Disturbance</span>
              <span className="text-red-400 font-bold">59.84 Hz Droop</span>
            </div>
            <div className="p-2 rounded-lg bg-obsidian-900 border border-slate-800">
              <span className="text-slate-500 text-[10px] block">Settled Target</span>
              <span className="text-emerald-400 font-bold">60.00 Hz Locked</span>
            </div>
          </div>
        </div>

        {/* Dynamic Waveform Oscilloscope Graphic */}
        <div className="py-4 relative">
          <svg viewBox="0 0 600 130" className="w-full h-32">
            {/* Oscilloscope Center Line */}
            <line x1="0" y1="65" x2="600" y2="65" stroke="#334155" strokeDasharray="2 4" strokeWidth="1" />
            <line x1="0" y1="25" x2="600" y2="25" stroke="#1E293B" strokeDasharray="1 5" strokeWidth="0.5" />
            <line x1="0" y1="105" x2="600" y2="105" stroke="#1E293B" strokeDasharray="1 5" strokeWidth="0.5" />

            {/* Nominal Reference Line */}
            <text x="10" y="20" fill="#94A3B8" fontSize="10" fontFamily="monospace">60.05 Hz</text>
            <text x="10" y="62" fill="#F59E0B" fontSize="10" fontFamily="monospace">60.00 Hz (Nominal)</text>
            <text x="10" y="120" fill="#EF4444" fontSize="10" fontFamily="monospace">59.84 Hz (Decay)</text>

            {/* Stabilizing Oscilloscope Frequency Curve: 59.84 Hz drop damped to 60.00 Hz nominal lock */}
            <motion.path
              d="M 60 115 C 100 120, 130 110, 170 30 C 210 20, 240 90, 280 50 C 320 40, 360 80, 400 60 C 440 55, 480 70, 520 65 C 560 64, 580 65, 600 65"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            />

            {/* Glowing sweep dot on oscilloscope */}
            <motion.circle
              cx="600"
              cy="65"
              r="4"
              fill="#00FF9D"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.3, 0.9] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </svg>
        </div>

        {/* Real-Time Automated M&V Ledger Settlement Counter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="p-3 rounded-xl bg-obsidian-900/80 border border-slate-800">
            <div className="text-slate-400 text-[11px] font-mono flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Automated M&amp;V Settlement
            </div>
            <div className="text-emerald-400 font-bold font-mono text-base mt-1">
              ${settledAmount.toLocaleString()} USD
            </div>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-900/80 border border-slate-800">
            <div className="text-slate-400 text-[11px] font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              NERC BAL-001 Compliance
            </div>
            <div className="text-slate-100 font-bold font-mono text-base mt-1">
              99.98% Metric Lock
            </div>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-900/80 border border-slate-800">
            <div className="text-slate-400 text-[11px] font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Droop Response Time
            </div>
            <div className="text-amber-400 font-bold font-mono text-base mt-1">
              &lt; 85 ms Sub-Cycle
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
