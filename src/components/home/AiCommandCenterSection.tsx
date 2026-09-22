import React, { useState } from 'react';
import { Cpu, Bot, MessageSquare, Zap, BarChart3, Database, Sparkles, Terminal, CheckCircle } from 'lucide-react';
import { OFFICIAL_WHATSAPP_INTL, getWhatsAppDirectUrl } from '../../lib/whatsapp';

export const AiCommandCenterSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const features = [
    {
      title: 'WhatsApp Autonomous Chatbots',
      category: 'Conversational AI',
      icon: MessageSquare,
      desc: 'Qualifies inbound prospects, delivers product decks, checks calendar availability, and books meetings 24/7 on +91 86676 18925.',
      metrics: '0.4s response latency • 98.2% read rate',
      status: 'Active Live Stream',
      log: [
        'User [+91 98840...]: "Interested in 3D Web Dev package"',
        'AI Agent: "Welcome! Analyzing your industry sector..."',
        'AI Agent: "Recommended blueprint: Apex High-Growth Suite. 2 available strategy slots for tomorrow."',
        'User: "Confirm 4 PM slot please."',
        'AI Agent: "Reserved! Calendar invite & confirmation sent."'
      ]
    },
    {
      title: 'Predictive Meta Ads Budgeting',
      category: 'Programmatic AI',
      icon: Zap,
      desc: 'Real-time algorithm monitoring that shifts ad spend away from declining ad sets into top-converting hook angles before ad fatigue strikes.',
      metrics: '42% CAC reduction • Hourly reallocation',
      status: 'Autonomous Engine',
      log: [
        'Creative A: Hook retention 48% (Scaling budget +35%)',
        'Creative B: Frequency > 3.2 (Deprecating ad set)',
        'Lookalike Audience 2%: ROAS 4.9x detected',
        'Auto-reallocating $450 daily budget to Winning Angle'
      ]
    },
    {
      title: 'Full-Funnel CRM Lead Routing',
      category: 'Automation Logic',
      icon: Database,
      desc: 'Instantly synchronizes high-ticket inquiries into Firestore, triggers WhatsApp notification to founders, and creates custom quotation docs.',
      metrics: 'Instant webhook sync • Zero lead leakage',
      status: 'Pipeline Connected',
      log: [
        'Inbound Lead: Apex Capital (Budget $10,000+)',
        'Firestore write: /leads/lead_982a17 OK',
        'WhatsApp webhook alert dispatched to +91 86676 18925',
        'Executive NDA & Discovery briefing generated'
      ]
    }
  ];

  return (
    <section 
      id="ai-solutions" 
      className="py-24 bg-gradient-to-b from-[#030712] via-[#081026] to-[#030712] relative overflow-hidden border-t border-slate-900"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Autonomous Enterprise Infrastructure</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white leading-tight">
            Your Business. <br />
            <span className="gold-gradient-text">Powered By Digital Intelligence.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Replace chaotic manual operations with self-optimizing AI models, automated WhatsApp workflows, and predictive customer acquisition.
          </p>
        </div>

        {/* Command Center Interface */}
        <div className="rounded-3xl bg-slate-950/90 border border-amber-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* Top Terminal Bar */}
          <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pl-3 border-l border-slate-700">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>ELA AI COMMAND MATRIX v4.2 • ONLINE</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Cloud Engine Operational</span>
            </div>
          </div>

          {/* Body: Tabs & Live Holographic Log */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Feature Selector */}
            <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">
                Select Intelligent Subsystem
              </span>

              {features.map((feat, idx) => {
                const Icon = feat.icon;
                const active = activeTab === idx;
                return (
                  <div
                    key={idx}
                    id={`ai-tab-${idx}`}
                    onClick={() => setActiveTab(idx)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                      active
                        ? 'bg-slate-900 border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.15)]'
                        : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                        {feat.category}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                        {feat.status}
                      </span>
                    </div>

                    <h4 className="font-heading text-base font-bold text-white flex items-center gap-2">
                      <Icon className="w-4 h-4 text-amber-400" />
                      <span>{feat.title}</span>
                    </h4>

                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {feat.desc}
                    </p>

                    <div className="mt-3 text-[11px] font-mono text-slate-300">
                      ⚡ {feat.metrics}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Holographic Terminal Stream */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-slate-950/80">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Live Autonomous Telemetry Stream</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400">
                    Real-time Socket
                  </span>
                </div>

                {/* Simulated Log Output */}
                <div className="space-y-3 font-mono text-xs">
                  {features[activeTab].log.map((line, i) => (
                    <div 
                      key={i} 
                      className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-300 flex items-start gap-3 animate-in fade-in duration-300"
                    >
                      <span className="text-amber-400 font-bold select-none">&gt;</span>
                      <span className="leading-relaxed">{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Callout inside terminal */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="font-heading text-sm font-bold text-white">Deploy AI Automation For Your Brand</h5>
                  <p className="text-xs text-slate-400">Fully integrated with WhatsApp: {OFFICIAL_WHATSAPP_INTL}</p>
                </div>

                <button
                  id="ai-consultation-whatsapp-button"
                  onClick={() => {
                    const url = getWhatsAppDirectUrl(`Hi ELA Digital World, I am interested in deploying ${features[activeTab].title} for my company.`);
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Deploy Subsystem on WhatsApp</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
