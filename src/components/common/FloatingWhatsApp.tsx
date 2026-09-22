import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { OFFICIAL_WHATSAPP_INTL, getWhatsAppDirectUrl } from '../../lib/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(
    'Hi ELA Digital World, I am interested in your digital marketing and technology services. I would like to discuss my project.'
  );

  const quickTopics = [
    'Digital Marketing & Meta Ads',
    'High-Converting Web Development',
    'WhatsApp Automation & AI Bots',
    'SEO & Organic Growth',
    'Book a Free Strategy Consultation'
  ];

  const handleSend = () => {
    const url = getWhatsAppDirectUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Interactive WhatsApp Quick Chat Drawer */}
      {isOpen && (
        <div 
          id="whatsapp-chat-modal"
          className="mb-3 w-[320px] sm:w-[360px] bg-slate-900/95 backdrop-blur-xl border border-emerald-500/40 rounded-2xl shadow-2xl p-4 text-slate-100 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-heading text-sm font-bold text-white">ELA Digital World</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-[11px] text-emerald-400/90 font-mono">{OFFICIAL_WHATSAPP_INTL} • Online</p>
              </div>
            </div>
            <button 
              id="close-whatsapp-modal-button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="py-3">
            <p className="text-xs text-slate-300 mb-2">
              Chat directly with our senior digital strategy team. We typically respond within <span className="text-amber-400 font-semibold">5 minutes</span>.
            </p>

            {/* Quick Topic Chips */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {quickTopics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => setMessage(`Hi ELA Digital World, I would like to discuss: ${topic}.`)}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-emerald-950/60 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/50 text-slate-300 transition-all text-left whitespace-nowrap"
                >
                  + {topic}
                </button>
              ))}
            </div>

            {/* Editable Message Box */}
            <div className="relative">
              <textarea
                id="whatsapp-message-textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Action */}
          <button
            id="send-whatsapp-direct-button"
            onClick={handleSend}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Open in WhatsApp</span>
          </button>
          <div className="mt-2 text-center">
            <span className="text-[10px] text-slate-500">Official Business API: +91 86676 18925</span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        id="floating-whatsapp-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with ELA Digital World on WhatsApp"
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.4)] border border-emerald-300/30 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-100"></span>
        </span>

        <MessageCircle className="w-5 h-5 text-white animate-pulse" />
        
        <div className="hidden sm:flex flex-col items-start text-left pr-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100">Direct WhatsApp</span>
          <span className="text-xs font-extrabold text-white font-mono">+91 86676 18925</span>
        </div>

        {/* Floating badge */}
        <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-black rounded-full shadow-md flex items-center gap-0.5">
          <Sparkles className="w-2.5 h-2.5 inline" /> VIP
        </span>
      </button>
    </div>
  );
};
