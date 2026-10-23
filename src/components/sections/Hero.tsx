"use client";

import React from "react";
import { Zap, ArrowRight, ShieldCheck, Cpu, Activity } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="home" className="pt-24 pb-16 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto space-y-6"
      >
        {/* Status Beacon Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="tracking-wider">STATUS: 60.00 Hz SYNCHRONIZED // VIRTUAL POWER PLANT MATRIX ONLINE</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
          Eliminate Fossil Peakers with{" "}
          <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 dark:from-cyan-400 dark:via-teal-300 dark:to-emerald-300 bg-clip-text text-transparent">
            Neural Grid Control
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
          NeuroGrid OS coordinates distributed batteries, micro-inverters, and EV fleets into a sub-second dispatchable virtual power station. Stabilize grid frequency autonomously and monetize flexibility with mathematical certainty.
        </p>

        {/* Funnel Call to Actions */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
          <a
            href="#how-it-works"
            className="px-6 py-3.5 rounded-xl font-semibold bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 text-sm uppercase tracking-wider"
          >
            Explore Architecture
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#pricing"
            className="px-6 py-3.5 rounded-xl font-semibold border border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-obsidian-900/60 hover:bg-slate-100 dark:hover:bg-obsidian-800 transition-all text-sm uppercase tracking-wider"
          >
            View VPP Tiers
          </a>
          <a
            href="#contact"
            className="px-6 py-3.5 rounded-xl font-semibold border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 transition-all text-sm uppercase tracking-wider"
          >
            Request Dispatch Demo
          </a>
        </div>

        {/* Live Telemetry KPI Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-obsidian-900/50 backdrop-blur-md relative overflow-hidden group hover:border-cyan-500/40 transition-all">
            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono flex items-center justify-between mb-1">
              <span>Aggregated Capacity</span>
              <Zap className="w-3.5 h-3.5 text-cyan-500" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">412.8 MW</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Multi-ISO active reserve pool</div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-obsidian-900/50 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono flex items-center justify-between mb-1">
              <span>Connected DER Nodes</span>
              <Cpu className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">18,450</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Solar, BESS &amp; smart EVSEs</div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-obsidian-900/50 backdrop-blur-md relative overflow-hidden group hover:border-teal-500/40 transition-all">
            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono flex items-center justify-between mb-1">
              <span>Dispatch Latency</span>
              <Activity className="w-3.5 h-3.5 text-teal-500" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-teal-600 dark:text-teal-400">&lt; 120 ms</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Sub-cycle droop response</div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-obsidian-900/50 backdrop-blur-md relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono flex items-center justify-between mb-1">
              <span>Nominal Frequency Lock</span>
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-amber-500">60.00 Hz</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">IEEE 2030.5 synchronized</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
