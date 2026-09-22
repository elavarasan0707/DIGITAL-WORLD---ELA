import React from 'react';
import { Layers, Share2, Filter, LineChart, ArrowRight, Sparkles } from 'lucide-react';

interface ClientAttractSectionProps {
  onSelectPillar: (pillar: string) => void;
}

export const ClientAttractSection: React.FC<ClientAttractSectionProps> = ({ onSelectPillar }) => {
  const cards = [
    {
      id: 'build',
      stage: '01 / STAGE',
      title: 'Build',
      subtitle: 'Websites & Digital Platforms',
      description: 'High-speed, futuristic web experiences with 3D interactions and robust architecture engineered for relentless conversion.',
      icon: Layers,
      accent: 'from-blue-500 to-indigo-600',
      border: 'hover:border-blue-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]',
      serviceQuery: 'Web Development'
    },
    {
      id: 'reach',
      stage: '02 / STAGE',
      title: 'Reach',
      subtitle: 'Digital Marketing & Social Media',
      description: 'Omni-channel campaigns, psychographic Meta ads, and viral short-form media targeting high-intent prospective buyers globally.',
      icon: Share2,
      accent: 'from-amber-500 to-yellow-500',
      border: 'hover:border-amber-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
      serviceQuery: 'Digital Marketing'
    },
    {
      id: 'convert',
      stage: '03 / STAGE',
      title: 'Convert',
      subtitle: 'Lead Generation & Automation',
      description: 'Automated WhatsApp funnels, conversational AI agents, and 24/7 lead qualification pipelines that close deals while you sleep.',
      icon: Filter,
      accent: 'from-emerald-500 to-teal-500',
      border: 'hover:border-emerald-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
      serviceQuery: 'WhatsApp Automation'
    },
    {
      id: 'grow',
      stage: '04 / STAGE',
      title: 'Grow',
      subtitle: 'Analytics & Business Strategy',
      description: 'Predictive attribution modeling, LTV optimization, and enterprise advisory roadmaps to turn traffic into lasting enterprise valuation.',
      icon: LineChart,
      accent: 'from-purple-500 to-pink-500',
      border: 'hover:border-purple-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]',
      serviceQuery: 'Business Growth Strategy'
    }
  ];

  return (
    <section 
      id="growth-framework" 
      className="py-24 bg-[#030712] relative border-t border-slate-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Growth Matrix</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white leading-tight">
            Your Business Has Potential. <br />
            <span className="gold-gradient-text">Let's Turn It Into Digital Growth.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            A cohesive 4-step engineering blueprint tested across multiple market sectors to systematically compound revenue and digital footprint.
          </p>
        </div>

        {/* 4 Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                id={`card-pillar-${card.id}`}
                className={`group relative p-6 sm:p-7 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 ${card.border} ${card.glow} transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between cursor-pointer`}
                onClick={() => onSelectPillar(card.serviceQuery)}
              >
                {/* 3D Holographic Accent Corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-tr-3xl pointer-events-none"></div>

                <div>
                  {/* Stage Label */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold">
                      {card.stage}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.accent} p-0.5 shadow-lg shadow-black/40 group-hover:scale-110 transition-transform`}>
                      <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center text-white">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-heading text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                    {card.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wide">
                    {card.subtitle}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-amber-400 transition-colors">
                  <span>Explore Blueprint</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
