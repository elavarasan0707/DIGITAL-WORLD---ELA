import React from 'react';
import { X, CheckCircle2, MessageCircle, Calendar, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { ServiceItem } from '../../types';
import { getWhatsAppDirectUrl } from '../../lib/whatsapp';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookConsultation: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookConsultation
}) => {
  if (!service) return null;

  const handleWhatsAppInquiry = () => {
    const text = `Hi ELA Digital World, I am interested in your ${service.title} service. I would like to explore your deliverables and discuss pricing for my business.`;
    window.open(getWhatsAppDirectUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="service-detail-modal"
        className="relative w-full max-w-3xl bg-slate-900/95 border border-amber-500/30 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden p-6 sm:p-8 my-8 text-slate-100"
      >
        {/* Close Button */}
        <button
          id="close-service-modal-button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-amber-400 mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-widest font-semibold">Service Blueprint</span>
        </div>

        <h3 className="font-heading text-2xl sm:text-3xl font-black text-white">
          {service.title}
        </h3>
        
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          {service.fullDescription}
        </p>

        {/* Results Target Badge */}
        <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">Target Benchmark</span>
            <p className="text-xs font-bold text-white">{service.resultsTarget}</p>
          </div>
        </div>

        {/* Key Pillars & Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Key Advantages */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Core Advantages</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {service.keyBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0"></span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Concrete Deliverables</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {service.deliverables.map((deliv, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0"></span>
                  <span>{deliv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">Technologies & Tooling</span>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech) => (
              <span key={tech} className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            id="service-modal-whatsapp-cta"
            onClick={handleWhatsAppInquiry}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 hover:bg-emerald-600/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp (+91 86676 18925)</span>
          </button>

          <button
            id="service-modal-book-cta"
            onClick={() => {
              onClose();
              onBookConsultation(service.title);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Strategy Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
