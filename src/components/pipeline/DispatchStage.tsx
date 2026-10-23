"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, CloudRain, ZapOff, CheckCircle2, Sliders, ArrowUpRight } from "lucide-react";

type ScenarioType = "heatwave" | "cloud" | "substation";

interface ScenarioConfig {
  id: ScenarioType;
  title: string;
  badge: string;
  icon: React.ElementType;
  description: string;
  setpoint: string;
  direction: "discharge" | "charge" | "emergency";
  responseMs: number;
  economicValue: string;
  activeAssets: string;
}

const scenarios: Record<ScenarioType, ScenarioConfig> = {
  heatwave: {
    id: "heatwave",
    title: "Heatwave Peak",
    badge: "Thermal Load Spike",
    icon: Flame,
    description: "Extreme cooling demand spikes LMP wholesale price to $1,850/MWh. Autonomous MILP solver dispatches BESS fleet to inject peak power.",
    setpoint: "+85.4 MW Dispatched",
    direction: "discharge",
    responseMs: 42,
    economicValue: "$14,820 Arbitrage Profit",
    activeAssets: "4,210 Batteries / 1,800 Smart EVSEs",
  },
  cloud: {
    id: "cloud",
    title: "Cloud Ramp",
    badge: "Sudden Solar Curtailment",
    icon: CloudRain,
    description: "Rapid cloud deck causes 65 MW instantaneous solar drop in 180 seconds. NeuroGrid OS dynamically modulates EV charging and BESS absorption.",
    setpoint: "-62.0 MW Ramp Absorbed",
    direction: "charge",
    responseMs: 68,
    economicValue: "$9,450 Curtailment Hedged",
    activeAssets: "3,150 Inverters / 2,400 Commercial Chargers",
  },
  substation: {
    id: "substation",
    title: "Substation Trip",
    badge: "Contingency Event",
    icon: ZapOff,
    description: "Bulk transmission feeder trips off-line, causing rapid frequency drop. NeuroGrid activates autonomous droop governor to inject sub-second spinning reserve.",
    setpoint: "+120.0 MW Emergency Injection",
    direction: "emergency",
    responseMs: 35,
    economicValue: "$28,500 NERC Reliability Yield",
    activeAssets: "6,800 Distributed Storage Nodes",
  },
};

export function DispatchStage() {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>("heatwave");
  const current = scenarios[activeScenario];
  const Icon = current.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="font-mono text-xs text-teal-500 font-bold tracking-wider">STAGE 03 // AUTONOMOUS DISPATCH</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">MILP Co-Optimization &amp; Scenario Triggers</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 font-mono text-xs">
          <Sliders className="w-3.5 h-3.5" />
          <span>Mixed-Integer Linear Programming</span>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        Select a real-world grid disturbance scenario below to trigger real-time AI dispatch optimization and evaluate dynamic setpoint calculation.
      </p>

      {/* Interactive Scenario Trigger Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(Object.keys(scenarios) as ScenarioType[]).map((key) => {
          const s = scenarios[key];
          const SIcon = s.icon;
          const isActive = activeScenario === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveScenario(key)}
              className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                isActive
                  ? "border-cyan-500 bg-cyan-500/10 dark:bg-cyan-950/40 shadow-lg shadow-cyan-500/15"
                  : "border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-obsidian-900/60 hover:border-slate-400 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`p-2 rounded-lg ${isActive ? "bg-cyan-500 text-obsidian-950" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
                  <SIcon className="w-4 h-4" />
                </span>
                {isActive && (
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-500 text-obsidian-950">
                    ACTIVE
                  </span>
                )}
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{s.title}</div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">{s.badge}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Scenario Reaction Visualizer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScenario}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="p-6 rounded-2xl bg-obsidian-950 border border-slate-800 relative overflow-hidden text-slate-100"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-obsidian-950">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Active Scenario Simulation</span>
                <h4 className="text-lg font-bold">{current.title}</h4>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="text-right">
                <div className="text-slate-500 uppercase text-[10px]">Response Time</div>
                <div className="text-emerald-400 font-bold">{current.responseMs} ms</div>
              </div>
              <div className="text-right">
                <div className="text-slate-500 uppercase text-[10px]">Calculated Setpoint</div>
                <div className="text-cyan-400 font-bold">{current.setpoint}</div>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-300 py-4 leading-relaxed">
            {current.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-obsidian-900/80 border border-slate-800 text-xs space-y-1">
              <div className="text-slate-400 font-mono text-[11px]">Mobilized DER Cohort</div>
              <div className="text-slate-200 font-semibold">{current.activeAssets}</div>
            </div>
            <div className="p-3 rounded-xl bg-obsidian-900/80 border border-slate-800 text-xs space-y-1">
              <div className="text-slate-400 font-mono text-[11px]">Monetization Yield</div>
              <div className="text-emerald-400 font-semibold font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {current.economicValue}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
