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
  Sparkles,
  CheckCircle2
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
      className="py-20 sm:py-28 bg-transparent relative overflow-hidden"
    >
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-md backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Full-Spectrum Capabilities</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            High-Impact Services <br />
            <span className="gold-gradient-text">Engineered For Exponential Growth</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Every service is engineered with custom media assets, high-converting copy, and real-time conversion infrastructure to maximize your ROI.
          </p>
        </div>

        {/* Responsive Services Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop/laptop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group relative rounded-3xl bg-slate-950/80 backdrop-blur-xl border border-slate-800 hover:border-amber-400/70 shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Visual Top Glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:via-amber-400 transition-all"></div>

                <div>
                  {/* Service Image with Dark Contrast Gradient Overlay */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

                    {/* Floating Service Badge: Index & Icon */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-950/90 border border-amber-500/40 p-2 text-amber-400 shadow-lg flex items-center justify-center backdrop-blur-md">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950/85 border border-slate-700 text-slate-300 text-xs font-mono font-bold backdrop-blur-md">
                        #{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Target Metric Pill floating bottom right */}
                    <div className="absolute bottom-3 right-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold backdrop-blur-md shadow-md">
                        <TrendingUp className="w-3 h-3 text-amber-400" />
                        <span>{service.resultsTarget.split(',')[0]}</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 sm:p-7">
                    {/* Title */}
                    <h3 className="font-heading text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>

                    {/* 2 Key Benefits Highlights */}
                    <div className="mt-4 pt-3 border-t border-slate-850 space-y-1.5">
                      {service.keyBenefits.slice(0, 2).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA Button */}
                <div className="p-6 sm:p-7 pt-0 border-t border-slate-850/60 mt-2">
                  <div className="flex items-center justify-between pt-4">
                    <button
                      id={`learn-more-${service.id}`}
                      onClick={() => onSelectService(service)}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 group-hover:text-amber-300 transition-all cursor-pointer"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </button>

                    <div className="flex items-center gap-1">
                      {service.technologies.slice(0, 2).map((tech, ti) => (
                        <span key={ti} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
