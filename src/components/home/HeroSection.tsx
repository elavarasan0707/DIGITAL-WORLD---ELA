import React from 'react';
import { 
  ArrowRight, 
  Calendar, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Globe2, 
  Cpu, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';
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
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg">
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
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-[0_0_30px_rgba(245,158,11,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary: Explore Services */}
              <button
                id="hero-explore-services-button"
                onClick={onExploreServices}
                className="px-7 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-amber-500/50 text-sm font-semibold transition-all duration-300 backdrop-blur-md cursor-pointer"
              >
                Explore Our Services
              </button>

              {/* Tertiary: Book Free Consultation */}
              <button
                id="hero-book-consultation-button"
                onClick={onBookConsultation}
                className="px-6 py-4 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 text-sm font-semibold transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer"
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
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold bg-emerald-950/60 px-4 py-2 rounded-full border border-emerald-500/40 transition-colors shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp: {OFFICIAL_WHATSAPP_INTL}</span>
              </button>
              <div className="flex items-center gap-2 bg-slate-900/70 px-3.5 py-1.5 rounded-full border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Direct Phone Acceptance Alerts</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual: Floating Glass Telemetry HUD Framing the 3D Background */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-950/60 backdrop-blur-2xl border border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
              
              {/* Subtle accent header line */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    Autonomous 3D Grid Active
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  Global Telemetry
                </span>
              </div>

              {/* Central Key Highlight */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900/80 to-blue-500/10 border border-amber-500/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-300">Revenue Velocity</span>
                    <span className="text-xs font-mono font-bold text-amber-400">+340% Avg.</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full w-[88%]"></div>
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-2 text-sky-400 mb-1">
                      <Globe2 className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold">Global Presence</span>
                    </div>
                    <p className="text-lg font-black text-white font-mono">15+ Mkts</p>
                    <p className="text-[10px] text-slate-400">Asia & Overseas</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-2 text-amber-400 mb-1">
                      <Zap className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold">Client Success</span>
                    </div>
                    <p className="text-lg font-black text-white font-mono">99.4%</p>
                    <p className="text-[10px] text-slate-400">Onboarding SLA</p>
                  </div>
                </div>

                {/* Direct Phone Notification Protocol */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-emerald-300">Direct Client Mobile Sync</p>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                      Instant WhatsApp & SMS status alerts dispatched directly to your phone when the Owner approves your project.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="mt-5 pt-3 border-t border-slate-850 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>ELA Digital World</span>
                <span className="text-amber-400/90 font-semibold">Founder: Elavarasan R</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
