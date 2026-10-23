import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { AboutUs } from "@/components/sections/AboutUs";
import { ContactUs } from "@/components/sections/ContactUs";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-slate-100 bg-cyber-grid bg-cyber-radial transition-colors duration-200">
      {/* Fixed Glassmorphic Navigation Header */}
      <Navbar />

      {/* Main Sections in Exact Sequential Order */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Hero />
        <HowItWorks />
        <Pricing />
        <AboutUs />
        <ContactUs />
      </main>

      {/* SCADA Telemetry Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/60 py-10 bg-white/40 dark:bg-obsidian-950/40 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono font-medium">GRID TELEMETRY ONLINE // IEEE 2030.5 / OpenADR 2.0b / IEC 61850</span>
          </div>

          <div className="flex items-center gap-6 text-slate-500 font-mono">
            <span>60.00 Hz SYNCHRONIZED</span>
            <span>412.8 MW POOL</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} NeuroGrid OS. Autonomous Virtual Power Plant.
          </div>
        </div>
      </footer>
    </div>
  );
}
