"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Cpu, Activity } from "lucide-react";

export function ForecastStage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="font-mono text-xs text-emerald-500 font-bold tracking-wider">STAGE 02 // NEURAL FORECAST</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Deep Neural Grid Forecasting</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs">
          <Cpu className="w-3.5 h-3.5" />
          <span>99.2% Horizon Accuracy</span>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        Temporal transformer networks model hyperlocal solar irradiance, temperature gradients, wholesale LMP spikes, and microgrid loads across a 48-hour forward horizon.
      </p>

      {/* Synaptic Dual-Curve Forecast Visualizer */}
      <div className="relative p-6 rounded-2xl bg-obsidian-950 border border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between text-xs font-mono mb-4 text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
              Net Grid Demand (MW)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              Aggregated Flexibility (MW)
            </span>
          </div>
          <span className="text-cyan-400">T+0h to T+48h Ahead</span>
        </div>

        {/* Dual Curves SVG Visualizer */}
        <div className="relative h-32 w-full">
          <svg viewBox="0 0 600 120" className="w-full h-full">
            {/* Grid Lines */}
            <line x1="0" y1="30" x2="600" y2="30" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="0" y1="60" x2="600" y2="60" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="0" y1="90" x2="600" y2="90" stroke="#1E293B" strokeDasharray="3 3" />

            {/* Net Demand Curve */}
            <motion.path
              d="M 0 85 C 80 90, 140 25, 220 30 C 300 35, 360 95, 440 60 C 500 30, 560 40, 600 45"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Aggregated Flexibility Curve */}
            <motion.path
              d="M 0 50 C 70 40, 150 75, 230 65 C 310 55, 370 20, 450 40 C 510 60, 560 30, 600 35"
              fill="none"
              stroke="#00FF9D"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
            />
          </svg>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="font-mono">
            <div className="text-slate-500 uppercase text-[10px]">Predicted Peak</div>
            <div className="text-cyan-400 font-bold text-sm">386.4 MW</div>
          </div>
          <div className="font-mono">
            <div className="text-slate-500 uppercase text-[10px]">Flexibility Buffer</div>
            <div className="text-emerald-400 font-bold text-sm">+84.2 MW</div>
          </div>
          <div className="font-mono">
            <div className="text-slate-500 uppercase text-[10px]">Lookahead Horizon</div>
            <div className="text-slate-200 font-bold text-sm">48 Hours</div>
          </div>
          <div className="font-mono">
            <div className="text-slate-500 uppercase text-[10px]">Neural Inference</div>
            <div className="text-slate-200 font-bold text-sm">4.8 ms</div>
          </div>
        </div>
      </div>
    </div>
  );
}
