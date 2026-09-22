import React from 'react';
import { Lightbulb, Compass, Palette, Code, Megaphone, TrendingUp, Sparkles, Check } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export const AboutSection: React.FC = () => {
  const steps = [
    { name: 'Idea', icon: Lightbulb, color: 'from-amber-400 to-yellow-500', desc: 'Distill core value proposition' },
    { name: 'Strategy', icon: Compass, color: 'from-sky-400 to-blue-500', desc: 'Market analysis & growth roadmapping' },
    { name: 'Design', icon: Palette, color: 'from-pink-400 to-purple-500', desc: 'High-luxury visual identity & UI' },
    { name: 'Development', icon: Code, color: 'from-indigo-400 to-blue-600', desc: 'Ultra-fast 3D web platform engineering' },
    { name: 'Marketing', icon: Megaphone, color: 'from-amber-500 to-orange-500', desc: 'Hyper-targeted Meta & search traffic' },
    { name: 'Growth', icon: TrendingUp, color: 'from-emerald-400 to-teal-500', desc: 'Compound client acquisition & scale' },
  ];

  const pillars = [
    { title: 'Performance Marketing', desc: 'Attribution-first ad campaigns that yield positive cash-flow return.' },
    { title: 'Next-Gen Technology', desc: 'Sub-second web performance, 3D WebGL, and scalable cloud engines.' },
    { title: 'Haute Creativity', desc: 'Cinematic brand identities that demand premium price points.' },
    { title: 'Autonomous AI', desc: 'Predictive intelligence and 24/7 lead qualification agents.' },
    { title: 'WhatsApp Automation', desc: 'High-velocity 98% open-rate conversational pipelines.' },
    { title: 'Executive Strategy', desc: 'Unit economic audit, pricing strategy, and digital moat construction.' }
  ];

  return (
    <section 
      id="about" 
      className="py-24 bg-[#030712] relative border-t border-slate-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The ELA Digital World Philosophy</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white leading-tight">
            We Don't Just Build Digital Presence. <br />
            <span className="gold-gradient-text">We Build Digital Growth.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Traditional agencies deliver pretty websites that gather digital dust. ELA Digital World unites modern media engineering, bleeding-edge technology, AI automation, and boardroom strategy to drive undeniable business velocity.
          </p>
        </div>

        {/* Process Flow: Idea → Strategy → Design → Development → Marketing → Growth */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              The 6-Phase Engineering Lifecycle
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div 
                  key={step.name} 
                  className="group relative p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1 text-center flex flex-col items-center justify-center"
                >
                  {/* Step number badge */}
                  <span className="absolute top-2.5 right-2.5 text-[9px] font-mono text-slate-500 font-bold">
                    0{idx + 1}
                  </span>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} p-0.5 mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-black/40`}>
                    <div className="w-full h-full bg-slate-950/80 rounded-[10px] flex items-center justify-center text-white">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="font-heading text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    {step.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6 Integrated Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <div 
              key={i} 
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/30 transition-colors flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-heading">{pillar.title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
