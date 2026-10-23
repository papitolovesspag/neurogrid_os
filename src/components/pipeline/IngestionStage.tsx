"use client";

import React from "react";
import { motion } from "framer-motion";
import { Radio, Sun, BatteryCharging, Zap } from "lucide-react";

export function IngestionStage() {
  const telemetryNodes = [
    { name: "Distributed Solar Inverters", count: "9,240 nodes", icon: Sun, latency: "42 ms" },
    { name: "Commercial & Industrial BESS", count: "4,820 nodes", icon: BatteryCharging, latency: "28 ms" },
    { name: "Bidirectional EV Fleet Chargers", count: "4,390 nodes", icon: Zap, latency: "54 ms" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="font-mono text-xs text-cyan-500 font-bold tracking-wider">STAGE 01 // INGESTION</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Edge Telemetry Ingestion</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-xs">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>18,450 Nodes Live</span>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        High-throughput edge ingestion protocol polls distributed renewable assets every 100 milliseconds via secure IEEE 2030.5 / OpenADR 2.0b telemetry tunnels, maintaining zero packet loss.
      </p>

      {/* Circuit Stream Visualizer */}
      <div className="relative p-6 rounded-2xl bg-obsidian-950 border border-slate-800 overflow-hidden">
        <svg viewBox="0 0 600 120" className="w-full h-28 stroke-current text-cyan-500/30 fill-none">
          {/* Circuit Bus Lines */}
          <path d="M 50 30 L 250 30 L 300 60 L 550 60" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 50 60 L 200 60 L 250 90 L 550 90" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 50 90 L 150 90 L 200 60 L 550 30" strokeWidth="2" strokeDasharray="4 4" />

          {/* Animated Pulsing Particles */}
          <motion.circle
            cx="50"
            cy="30"
            r="4"
            fill="#00F0FF"
            animate={{ cx: [50, 250, 300, 550], cy: [30, 30, 60, 60] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="50"
            cy="60"
            r="4"
            fill="#00FF9D"
            animate={{ cx: [50, 200, 250, 550], cy: [60, 60, 90, 90] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 0.8 }}
          />
          <motion.circle
            cx="50"
            cy="90"
            r="4"
            fill="#38BDF8"
            animate={{ cx: [50, 150, 200, 550], cy: [90, 90, 60, 30] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: 1.4 }}
          />
        </svg>

        {/* Real-time Ingestion Stream Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {telemetryNodes.map((node) => {
            const Icon = node.icon;
            return (
              <div key={node.name} className="p-3 rounded-xl bg-obsidian-900/80 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    {node.name}
                  </span>
                </div>
                <div className="flex items-center justify-between font-mono pt-1">
                  <span className="text-slate-100 font-bold">{node.count}</span>
                  <span className="text-emerald-400 text-[11px]">{node.latency}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
