"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IngestionStage } from "@/components/pipeline/IngestionStage";
import { ForecastStage } from "@/components/pipeline/ForecastStage";
import { DispatchStage } from "@/components/pipeline/DispatchStage";
import { SettlementStage } from "@/components/pipeline/SettlementStage";
import { Radio, Cpu, Sliders, ShieldCheck } from "lucide-react";

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const stages = [
    {
      id: "ingestion",
      step: "01",
      title: "Edge Ingestion",
      tagline: "Sub-Second DER Polling",
      icon: Radio,
      color: "text-cyan-500",
      activeBg: "bg-cyan-500/10 border-cyan-500",
      component: IngestionStage,
    },
    {
      id: "forecast",
      step: "02",
      title: "Neural Forecast",
      tagline: "48h Irradiance & LMP Model",
      icon: Cpu,
      color: "text-emerald-500",
      activeBg: "bg-emerald-500/10 border-emerald-500",
      component: ForecastStage,
    },
    {
      id: "dispatch",
      step: "03",
      title: "Autonomous Dispatch",
      tagline: "Sub-120ms MILP Optimization",
      icon: Sliders,
      color: "text-teal-500",
      activeBg: "bg-teal-500/10 border-teal-500",
      component: DispatchStage,
    },
    {
      id: "settlement",
      step: "04",
      title: "Grid Balancing",
      tagline: "60.00 Hz Lock & M&V Ledger",
      icon: ShieldCheck,
      color: "text-amber-500",
      activeBg: "bg-amber-500/10 border-amber-500",
      component: SettlementStage,
    },
  ];

  const CurrentStageComponent = stages[activeStep].component;

  return (
    <section id="how-it-works" className="py-20 border-t border-slate-200 dark:border-slate-800/80 scroll-mt-24">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <span>4-STAGE CONTINUOUS NEURAL PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            How NeuroGrid OS Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            From high-frequency edge telemetry ingestion to sub-cycle droop curve grid stabilization, our architecture operates continuously with zero human latency.
          </p>
        </div>

        {/* Interactive Pipeline Step Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStep === idx;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? `${stage.activeBg} shadow-lg shadow-cyan-500/10`
                    : "border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-obsidian-900/60 hover:border-slate-400 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={`font-mono text-xs font-bold ${stage.color}`}>
                    STAGE {stage.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? stage.color : "text-slate-400"}`} />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {stage.tagline}
                  </p>
                </div>

                {/* Animated active underline indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activePipelineIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Stage Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-obsidian-900/70 backdrop-blur-xl shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={stages[activeStep].id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStageComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
