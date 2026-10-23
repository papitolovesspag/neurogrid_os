"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Compass, Zap, Award } from "lucide-react";

export function AboutUs() {
  return (
    <section id="about" className="py-20 border-t border-slate-200 dark:border-slate-800/80 scroll-mt-24">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <span>MISSION &amp; FOUNDING LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Engineering the Decentralized Grid
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Our mission is to permanently replace carbon-intensive fossil peaker plants with mathematically coordinated virtual power plants, establishing 100% renewable grid stability.
          </p>
        </div>

        {/* Founder Profile Card */}
        <div className="p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-obsidian-900/70 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          {/* Founder Image */}
          <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-xl shadow-cyan-500/10 shrink-0 group">
            <Image
              src="/founder.jpg"
              alt="Ngozi - Founder & CEO of NeuroGrid OS"
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded-md bg-obsidian-950/90 border border-cyan-500/30 text-cyan-400 backdrop-blur-sm">
                Executive Lead
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>
          </div>

          {/* Founder Bio */}
          <div className="space-y-4 text-center md:text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 mb-2">
                <Award className="w-3 h-3" />
                <span>Executive Leadership</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                Ngozi
              </h3>
              <p className="text-sm font-mono text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">
                Founder &amp; Chief Executive Officer
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Ngozi is a visionary clean-tech entrepreneur and systems architect dedicated to revolutionizing the global energy transition. Combining deep technical insight across distributed energy resources, real estate, and financial technology, she architected NeuroGrid OS to solve the bidirectional power crisis of the modern grid. Under her leadership, NeuroGrid OS orchestrates residential solar, smart batteries, and EV charging fleets into autonomous, yield-generating Virtual Power Plants—democratizing energy arbitrage for everyday homeowners while building a resilient, zero-carbon grid for tomorrow.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-obsidian-950 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 text-[10px] uppercase">Focus</div>
                <div className="text-slate-800 dark:text-slate-200 font-bold mt-0.5">AI Virtual Power Plants</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-obsidian-950 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 text-[10px] uppercase">Domain</div>
                <div className="text-slate-800 dark:text-slate-200 font-bold mt-0.5">Energy + Real Estate + FinTech</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-obsidian-950 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 text-[10px] uppercase">Vision</div>
                <div className="text-emerald-500 font-bold mt-0.5">Decentralized Grid Equity</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-obsidian-900/50">
            <Zap className="w-5 h-5 text-cyan-500 mb-2" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Zero Fossil Reliance</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Replacing gas turbines with millisecond-coordinated battery and renewable fleets.</p>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-obsidian-900/50">
            <ShieldCheck className="w-5 h-5 text-emerald-500 mb-2" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Mathematical Assurance</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Rigorous convex optimization guarantees system-wide stability across unexpected outages.</p>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-obsidian-900/50">
            <Compass className="w-5 h-5 text-teal-500 mb-2" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Open Standards</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Full interoperability through open protocols: IEEE 2030.5, OpenADR 2.0b, and IEC 61850.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
