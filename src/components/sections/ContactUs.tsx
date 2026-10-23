"use client";

import React, { useState } from "react";
import { Mail, Phone, Send, CheckCircle2, ShieldCheck, Clock, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactUs() {
  const [formData, setFormData] = useState({
    organization: "",
    email: "",
    capacity: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate enterprise telemetry transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      organization: "",
      email: "",
      capacity: "",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-200 dark:border-slate-800/80 scroll-mt-24">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <span>ENTERPRISE DISPATCH ONBOARDING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Initiate Grid Connection
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Connect your battery energy storage, commercial solar, or microgrid fleet to the NeuroGrid OS autonomous dispatch matrix.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dispatch Email Card */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-obsidian-900/70 backdrop-blur-md flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Direct Executive &amp; Dispatch Email
              </div>
              <a
                href="mailto:ngozi@neurogridos.site"
                className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors mt-1 block"
              >
                ngozi@neurogridos.site
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Monitored for enterprise partnerships, grid integrations, and dispatch queries.
              </p>
            </div>
          </div>

          {/* Mission Control Phone Card */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-obsidian-900/70 backdrop-blur-md flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Mission Control Hotline
              </div>
              <a
                href="tel:+2347042556872"
                className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors mt-1 block"
              >
                +234 704 255 6872
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Direct executive line for utility dispatchers, real estate, and asset operators.
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise Demo Request Form Container */}
        <div className="p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-obsidian-900/80 backdrop-blur-xl shadow-2xl">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="inquiryForm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      Request Enterprise Telemetry Consultation
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Submit fleet specifications for a simulated dispatch and revenue yield assessment.
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-500">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>GATEWAY OPEN</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Organization Name Input */}
                  <div>
                    <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 uppercase mb-2">
                      Organization / Facility Name *
                    </label>
                    <input
                      type="text"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Pacific Renewable Energy Co-op"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-obsidian-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                  </div>

                  {/* Work Email Input */}
                  <div>
                    <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 uppercase mb-2">
                      Corporate Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="corporate.contact.domain.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-obsidian-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                  </div>
                </div>

                {/* Aggregate DER Capacity Input */}
                <div>
                  <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 uppercase mb-2">
                    Aggregate DER Fleet Capacity (MW) *
                  </label>
                  <input
                    type="text"
                    name="capacity"
                    required
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="e.g. 15.0 MW Fleet Capacity (Solar + BESS)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-obsidian-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 uppercase mb-2">
                    Fleet Architecture &amp; Target Wholesale Markets
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Details on inverter types, interconnection voltage, ISO territory (e.g. CAISO, ERCOT, PJM), and revenue objectives..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-obsidian-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                  />
                </div>

                {/* Form Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold uppercase tracking-wider text-sm bg-gradient-to-r from-cyan-500 to-emerald-500 text-obsidian-950 hover:brightness-110 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>Transmitting Telemetry Packet...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Telemetry Request</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* Confirmed Submission State */
              <motion.div
                key="submissionSuccess"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest block">
                    STATUS: SUBMITTED - SUCCESS // INQUIRY QUEUED
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Telemetry Transmission Confirmed
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                    Telemetry Transmission Confirmed - Our grid engineering team will contact you within 24 hours to review your fleet simulation parameters and schedule secure gateway onboarding.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-obsidian-950 border border-slate-200 dark:border-slate-800 max-w-md mx-auto text-left text-xs font-mono space-y-1.5">
                  <div className="text-slate-400">DISPATCH TICKET: #NG-{Math.floor(100000 + Math.random() * 900000)}</div>
                  <div className="text-slate-400">FACILITY: {formData.organization || "Enterprise Partner"}</div>
                  <div className="text-slate-400">CAPACITY REGISTERED: {formData.capacity || "15.0 MW"}</div>
                  <div className="text-emerald-400 flex items-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Cryptographic Handshake Verified</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-cyan-500 text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
