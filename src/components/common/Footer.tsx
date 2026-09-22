import React from 'react';
import { MessageCircle, Mail, MapPin, ArrowUp, Instagram, Linkedin, Youtube, Facebook, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { OFFICIAL_WHATSAPP_INTL, getWhatsAppDirectUrl } from '../../lib/whatsapp';

interface FooterProps {
  setCurrentView: (view: string) => void;
  openBookingModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, openBookingModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const servicesLinks = [
    'Digital Marketing',
    'Web Development',
    'Social Media Marketing',
    'Meta Ads',
    'SEO Optimization',
    'Branding & Creative Design',
    'AI Solutions',
    'WhatsApp Automation',
    'Lead Generation',
    'Business Growth Strategy'
  ];

  return (
    <footer 
      id="main-footer"
      className="bg-[#02050e] border-t border-slate-900 pt-16 pb-12 relative overflow-hidden text-slate-400 text-xs"
    >
      {/* Background glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-850">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="lg" showTagline={true} />
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mt-3">
              ELA Digital World is a premier global digital technology and marketing agency. We engineer high-velocity digital experiences, bespoke 3D web systems, autonomous AI agents, and proven omni-channel acquisition funnels.
            </p>

            <div className="pt-2">
              <a
                id="footer-whatsapp-badge"
                href={getWhatsAppDirectUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-600/30 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Official WhatsApp: {OFFICIAL_WHATSAPP_INTL}</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setCurrentView('home'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }), 50);
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }), 50);
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }), 50);
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Projects & Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => document.querySelector('#ai-solutions')?.scrollIntoView({ behavior: 'smooth' }), 50);
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  AI Solutions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('blog')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Blog & Insights
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 50);
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Spectrum (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-white">
              Service Capabilities
            </h4>
            <div className="grid grid-cols-1 gap-1.5 text-[11px]">
              {servicesLinks.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }), 50);
                  }}
                  className="text-left text-slate-400 hover:text-amber-300 transition-colors"
                >
                  • {s}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Consultation & Office (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-white">
              Direct Contact & Strategy
            </h4>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <p className="text-white font-semibold text-xs">Ready to expand your digital moat?</p>
              <p className="text-[11px] text-slate-400">Schedule your complimentary growth blueprint review.</p>
              <button
                id="footer-consultation-btn"
                onClick={openBookingModal}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-[11px] shadow-md hover:opacity-90 transition-opacity"
              >
                Book Free Consultation
              </button>
            </div>

            <div className="text-[11px] space-y-1 text-slate-400">
              <p className="text-white font-medium">Headquarters:</p>
              <p>India • Global Serving Enterprise Clients Worldwide</p>
              <p className="text-emerald-400 font-mono font-semibold">WhatsApp: +91 86676 18925</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500/80" />
            <span>© 2026 ELA Digital World. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => alert('Privacy Policy: ELA Digital World respects client confidentiality and data security.')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => alert('Terms & Conditions: Standard agency terms apply to all digital services and deliverables.')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms & Conditions
            </button>
            
            {/* Scroll To Top */}
            <button
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
