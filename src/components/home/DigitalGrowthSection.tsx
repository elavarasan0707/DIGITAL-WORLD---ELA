import React, { useState } from 'react';
import { Sparkles, TrendingUp, Users, Target, Zap, ArrowUpRight, Activity } from 'lucide-react';

export const DigitalGrowthSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'funnel' | 'telemetry'>('funnel');

  const funnelSteps = [
    { label: '01. Raw Idea', count: '100%', sub: 'Strategic Positioning & Brand Architecture' },
    { label: '02. Digital Presence', count: '94%', sub: 'High-speed 3D Web & Omni-channel Ecosystem' },
    { label: '03. Inbound Leads', count: '48%', sub: 'Psychographic Ads & SEO Search Domination' },
    { label: '04. Customers', count: '22%', sub: 'Instant WhatsApp Funnel & AI Conversions' },
    { label: '05. Exponential Growth', count: '4.8x', sub: 'LTV Compounding & Market Leadership' },
  ];

  const demoMetrics = [
    { label: 'Website Visitors', value: '482,900', change: '+342%', icon: Users, color: 'text-sky-400' },
    { label: 'Leads Generated', value: '18,450', change: '+215%', icon: Target, color: 'text-amber-400' },
    { label: 'Conversion Rate', value: '4.92%', change: '+88%', icon: Zap, color: 'text-emerald-400' },
    { label: 'Campaign Reach', value: '3.4M+', change: '+410%', icon: Activity, color: 'text-purple-400' },
    { label: 'Customer Growth', value: '6.4x', change: 'Quarterly', icon: TrendingUp, color: 'text-yellow-400' },
  ];

  // Monthly growth sample data for SVG sparkline
  const monthlyData = [20, 35, 42, 58, 70, 95, 120, 160, 210, 290, 380, 482];
  const maxVal = 500;

  return (
    <section 
      id="digital-growth" 
      className="py-24 bg-[#030712] relative overflow-hidden border-t border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Telemetry & Economics</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white leading-tight">
            Cinematic Business Growth <br />
            <span className="gold-gradient-text">From Concept To Dominance</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Witness how systemic omni-channel marketing and automated conversions translate top-of-funnel traffic into compounding revenue.
          </p>
        </div>

        {/* Growth Pipeline Flow */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              The Progression: Idea → Digital Presence → Leads → Customers → Growth
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
              Demo Pipeline Model
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {funnelSteps.map((step, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-slate-500 font-bold block mb-1">
                    Phase 0{idx + 1}
                  </span>
                  <h4 className="font-heading text-sm font-extrabold text-white">
                    {step.label.split('. ')[1]}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    {step.sub}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-slate-500">Efficiency</span>
                  <span className="text-sm font-black font-mono text-amber-400">{step.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Example Analytics Telemetry Dashboard */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          
          {/* Telemetry Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <h3 className="font-heading text-lg font-bold text-white">
                  Enterprise Client Growth Telemetry
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Aggregated omni-channel performance benchmarks across Meta, Web, and WhatsApp.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-400">
              <span>* Notice: Real-time demonstration telemetry</span>
            </div>
          </div>

          {/* 5 High-Level Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
            {demoMetrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div key={i} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-medium">{metric.label}</span>
                    <Icon className={`w-4 h-4 ${metric.color}`} />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white font-heading">
                    {metric.value}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>{metric.change}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sparkline Curve SVG */}
          <div className="mt-8 p-5 rounded-2xl bg-slate-950/90 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
              <span className="font-semibold text-slate-200">12-Month Inbound Revenue & Lead Curve</span>
              <span className="font-mono text-amber-400">Compounding Velocity: +380%</span>
            </div>

            <div className="w-full h-36 relative flex items-end">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="growthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area path */}
                <path
                  d="M 0 38 L 9 35 L 18 33 L 27 28 L 36 24 L 45 18 L 54 14 L 63 10 L 72 7 L 81 5 L 90 3 L 100 1 L 100 40 L 0 40 Z"
                  fill="url(#growthGrad)"
                />
                {/* Stroke line */}
                <path
                  d="M 0 38 L 9 35 L 18 33 L 27 28 L 36 24 L 45 18 L 54 14 L 63 10 L 72 7 L 81 5 L 90 3 L 100 1"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
            
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
              <span>Month 01 (Strategy Launch)</span>
              <span>Month 06 (Omni-Scale)</span>
              <span>Month 12 (Market Authority)</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
