import React from 'react';
import { 
  TrendingUp, 
  Globe, 
  Share2, 
  Target, 
  Search, 
  Palette, 
  Cpu, 
  MessageSquare, 
  Zap, 
  Compass, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/mockData';
import { ServiceItem } from '../../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  // Map icon strings to Lucide components
  const getIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp': return TrendingUp;
      case 'Globe': return Globe;
      case 'Share2': return Share2;
      case 'Target': return Target;
      case 'Search': return Search;
      case 'Palette': return Palette;
      case 'Cpu': return Cpu;
      case 'MessageSquare': return MessageSquare;
      case 'Zap': return Zap;
      case 'Compass': return Compass;
      default: return Sparkles;
    }
  };

  return (
    <section 
      id="services" 
      className="py-24 bg-gradient-to-b from-[#030712] via-[#050a17] to-[#030712] relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Spectrum Capabilities</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white leading-tight">
            High-Impact Services <br />
            <span className="gold-gradient-text">Engineered For Global Dominance</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            From algorithmic Meta ads and bespoke 3D web platforms to autonomous AI systems and high-converting WhatsApp workflows.
          </p>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group relative p-7 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-amber-500/15 hover:border-amber-400/80 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Glowing top line accent */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:via-amber-400 transition-all"></div>

                <div>
                  {/* Card Header: Icon & Index */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 p-0.5 border border-amber-500/30 group-hover:border-amber-400 shadow-md transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-[14px] bg-slate-950/90 flex items-center justify-center text-amber-400 group-hover:text-amber-300 group-hover:scale-110 transition-all">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-500 font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Highlight Result */}
                  <div className="mt-4 py-1.5 px-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-amber-300/90 font-mono">
                    Target: {service.resultsTarget}
                  </div>
                </div>

                {/* Card Action Button: Learn More */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    id={`learn-more-${service.id}`}
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                    Full Spec
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
