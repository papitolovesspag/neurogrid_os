"use client";

import React, { useState } from "react";
import { Check, ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const tiers = [
    {
      name: "Edge Microgrid",
      badge: "Local Aggregation",
      monthlyPrice: 290,
      annualPrice: 246,
      capacity: "Up to 500 kW capacity",
      description: "Ideal for commercial rooftops, community solar arrays, and municipal battery systems seeking autonomous peak arbitrage.",
      revenueShare: "12% arbitrage revenue share",
      features: [
        "Up to 500 kW capacity managed",
        "Sub-second IEEE 2030.5 edge gateway",
        "Automated day-ahead LMP price optimization",
        "Dynamic inverter curtailment mitigation",
        "Daily automated revenue settlement reports",
        "Standard SLA: 99.5% uptime guarantee",
      ],
      cta: "Select Tier",
      highlight: false,
    },
    {
      name: "Commercial Flexibility",
      badge: "Most Popular",
      monthlyPrice: 1490,
      annualPrice: 1266,
      capacity: "Up to 25 MW capacity",
      description: "Engineered for industrial facilities, microgrid parks, and multi-MW BESS operators monetizing wholesale market ancillary services.",
      revenueShare: "8% revenue share",
      features: [
        "Up to 25 MW aggregate capacity",
        "Sub-120ms MILP co-optimization engine",
        "Primary frequency droop response (BAL-001)",
        "Direct ISO wholesale market bidding gateway",
        "Bidirectional EV fleet smart charging orchestration",
        "Real-time cryptographic M&V audit ledger",
        "Dedicated Power Systems Engineer support",
      ],
      cta: "Deploy Fleet",
      highlight: true,
    },
    {
      name: "Utility Fleet Operator",
      badge: "Enterprise Grid Scale",
      monthlyPrice: 6500,
      annualPrice: 5525,
      capacity: "250+ MW capacity",
      description: "Full-scale autonomous virtual power plant software for regulated utilities, transmission operators, and gigawatt IPP portfolios.",
      revenueShare: "4% performance fee",
      features: [
        "250+ MW capacity (unlimited assets)",
        "Ultra-low latency (< 50ms) frequency support",
        "Multi-ISO simultaneous dispatch optimization",
        "Custom SCADA & EMS bidirectional telemetry bridge",
        "Black-start dynamic islanding orchestration",
        "Air-gapped on-premise neural engine deployment option",
        "24/7/365 Mission Control NOC hotline",
      ],
      cta: "Contact Enterprise",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 border-t border-slate-200 dark:border-slate-800/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <span>TRANSPARENT VPP CAPACITY TIERS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Predictable Software Economics
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Scalable capacity-based pricing designed for distributed asset aggregators, commercial campuses, and utility power operators.
          </p>

          {/* Interactive Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <span className={`text-sm font-medium ${!isAnnual ? "text-slate-900 dark:text-slate-100 font-bold" : "text-slate-500"}`}>
              Monthly
            </span>

            <button
              type="button"
              role="switch"
              aria-checked={isAnnual}
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                isAnnual ? "bg-cyan-500" : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-5 h-5 rounded-full bg-white shadow-md transform"
                style={{ x: isAnnual ? 28 : 0 }}
              />
            </button>

            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${isAnnual ? "text-slate-900 dark:text-slate-100 font-bold" : "text-slate-500"}`}>
                Annual
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                Save 15% on Annual Contracts
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => {
            const currentPrice = isAnnual ? tier.annualPrice : tier.monthlyPrice;

            return (
              <div
                key={tier.name}
                className={`p-8 rounded-3xl border flex flex-col justify-between transition-all relative ${
                  tier.highlight
                    ? "border-2 border-cyan-500 bg-white/90 dark:bg-obsidian-900/90 shadow-2xl shadow-cyan-500/15 md:-translate-y-2"
                    : "border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-obsidian-900/60"
                }`}
              >
                {/* Popular Badge */}
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 text-obsidian-950 uppercase tracking-wider shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-2xl text-slate-900 dark:text-slate-100">{tier.name}</h3>
                      {!tier.highlight && (
                        <span className="text-[11px] font-mono text-slate-400 uppercase">{tier.badge}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 min-h-[36px]">{tier.description}</p>
                  </div>

                  {/* Price display */}
                  <div className="pt-2 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
                        ${currentPrice.toLocaleString()}
                      </span>
                      <span className="text-sm font-medium text-slate-500">/mo</span>
                      {isAnnual && (
                        <span className="text-xs font-mono text-emerald-500 font-semibold">(15% discount)</span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mt-2 font-semibold">
                      {tier.capacity} &bull; {tier.revenueShare}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      Platform Features:
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-8 mt-6 border-t border-slate-200 dark:border-slate-800">
                  <a
                    href="#contact"
                    className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 uppercase tracking-wider transition-all ${
                      tier.highlight
                        ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-obsidian-950 hover:brightness-110 shadow-lg shadow-cyan-500/25"
                        : "border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-obsidian-950/50 hover:border-cyan-500 hover:text-cyan-500"
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
