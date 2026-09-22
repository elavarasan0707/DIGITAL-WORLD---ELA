import React from 'react';
import { ArrowRight, Calendar, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { HeroGlobe } from '../3d/HeroGlobe';
import { OFFICIAL_WHATSAPP_INTL, getWhatsAppDirectUrl } from '../../lib/whatsapp';

interface HeroSectionProps {
  onStartProject: () => void;
  onExploreServices: () => void;
  onBookConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartProject,
  onExploreServices,
  onBookConsultation
}) => {
  const handleWhatsApp = () => {
    window.open(getWhatsAppDirectUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#02050e] via-[#060c1d] to-[#02050e]"
    >
      {/* Cinematic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Next-Gen Digital Marketing & Web Agency</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.08]">
              THINK DIGITAL. <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                THINK BIGGER.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Transform your ideas into powerful digital experiences with cutting-edge strategy, web technology, creativity, and AI. <strong className="text-white font-semibold">ELA Digital World</strong> helps businesses engineer exponential revenue growth and market authority.
            </p>

            {/* CTA Buttons Row */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {/* Primary: Start Your Project */}
              <button
                id="hero-start-project-button"
                onClick={onStartProject}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-[0_0_30px_rgba(245,158,11,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-2"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary: Explore Services */}
              <button
                id="hero-explore-services-button"
                onClick={onExploreServices}
                className="px-7 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-amber-500/50 text-sm font-semibold transition-all duration-300"
              >
                Explore Our Services
              </button>

              {/* Tertiary: Book Free Consultation */}
              <button
                id="hero-book-consultation-button"
                onClick={onBookConsultation}
                className="px-6 py-4 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Book a Free Consultation</span>
              </button>
            </div>

            {/* Direct WhatsApp Quick Connect Banner */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <button 
                id="hero-whatsapp-connect"
                onClick={handleWhatsApp}
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold bg-emerald-950/50 px-3.5 py-1.5 rounded-full border border-emerald-500/30 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp: {OFFICIAL_WHATSAPP_INTL}</span>
              </button>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Zero Risk • Guaranteed Measurable Growth</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual: 3D Interactive Globe */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HeroGlobe />
          </div>

        </div>
      </div>
    </section>
  );
};
