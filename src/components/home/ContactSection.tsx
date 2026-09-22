import React, { useState } from 'react';
import { Send, MessageCircle, Calendar, CheckCircle2, Sparkles, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import { db, collection, addDoc, serverTimestamp } from '../../lib/firebase';
import { SERVICES_DATA } from '../../data/mockData';
import { 
  OFFICIAL_WHATSAPP_INTL, 
  OFFICIAL_WHATSAPP_NUMBER, 
  getWhatsAppFormUrl, 
  WhatsAppFormPayload 
} from '../../lib/whatsapp';

interface ContactSectionProps {
  onOpenConsultationModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenConsultationModal }) => {
  const [formData, setFormData] = useState<WhatsAppFormPayload>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: SERVICES_DATA[0].title,
    topic: '',
    budget: '$5,000 - $15,000',
    preferredDate: '',
    preferredTime: 'Morning (10 AM - 1 PM)',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const budgetOptions = [
    '< $2,500 (Growth Starter)',
    '$2,500 - $5,000 (Scale Package)',
    '$5,000 - $15,000 (Enterprise Accelerator)',
    '$15,000+ (Full Omni-Channel Suite)',
    'Custom Scope / Advisory'
  ];

  const timeOptions = [
    'Morning (10:00 AM - 01:00 PM IST)',
    'Afternoon (02:00 PM - 05:00 PM IST)',
    'Evening (06:00 PM - 09:00 PM IST)',
    'Flexible'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please provide at least your Full Name, Email, and Phone Number.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company?.trim() || 'N/A',
        service: formData.service || 'General Inquiry',
        topic: formData.topic?.trim() || 'Digital Growth',
        budget: formData.budget || 'Unspecified',
        preferredDate: formData.preferredDate || 'Flexible',
        preferredTime: formData.preferredTime || 'Flexible',
        message: formData.message?.trim() || '',
        status: 'New',
        createdAt: new Date().toISOString()
      };

      // 1. Save to Firestore 'contact_requests'
      await addDoc(collection(db, 'contact_requests'), {
        ...payload,
        timestamp: serverTimestamp()
      });

      // 2. Also register in 'leads' collection
      await addDoc(collection(db, 'leads'), {
        ...payload,
        source: 'Contact Form',
        leadStatus: 'New',
        timestamp: serverTimestamp()
      });

      setSubmitted(true);
    } catch (err: any) {
      console.warn('Firestore contact request fallback:', err);
      // Still allow continuation and WhatsApp button
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSendDetailsOnWhatsApp = () => {
    const url = getWhatsAppFormUrl(formData);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      id="contact" 
      className="py-24 bg-gradient-to-b from-[#030712] via-[#050b1a] to-[#030712] relative overflow-hidden border-t border-slate-900"
    >
      {/* Background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Engagement</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white leading-tight">
            Start Your Project Request <br />
            <span className="gold-gradient-text">Directly With ELA Digital World</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Tell us about your objectives. We prepare a bespoke strategy audit and respond within hours via email and official WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Official Contact Card & Direct WhatsApp */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* WhatsApp VIP Card */}
            <div className="p-6 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 shadow-xl backdrop-blur-xl">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white">Direct WhatsApp Desk</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Need immediate answers? Connect with our senior strategy team directly on WhatsApp for instantaneous project feasibility reviews.
              </p>
              
              <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 font-mono text-sm font-bold text-emerald-300">
                {OFFICIAL_WHATSAPP_INTL}
              </div>

              <button
                id="contact-instant-whatsapp-btn"
                onClick={handleSendDetailsOnWhatsApp}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Now</span>
              </button>
            </div>

            {/* Global Agency Coordinates */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4 text-xs">
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-amber-400">
                Global Operations
              </h4>

              <div className="flex items-start gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Official WhatsApp & Voice</span>
                  <span className="font-mono text-slate-400">{OFFICIAL_WHATSAPP_INTL} ({OFFICIAL_WHATSAPP_NUMBER})</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Enterprise Inquiries</span>
                  <span className="text-slate-400">growth@eladigitalworld.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Global Headquarters</span>
                  <span className="text-slate-400">India • Global Remote Services Worldwide</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation Trigger */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-amber-500/25 backdrop-blur-xl">
              <h4 className="font-heading text-sm font-bold text-white mb-2">Prefer A Video Consultation?</h4>
              <p className="text-xs text-slate-400 mb-4">
                Pick a 45-minute calendar slot to walk through your business metrics and conversion bottlenecks.
              </p>
              <button
                id="contact-side-book-btn"
                onClick={onOpenConsultationModal}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Consultation</span>
              </button>
            </div>

          </div>

          {/* Right Column: High-Converting Project Request Form */}
          <div className="lg:col-span-8">
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-amber-500/30 backdrop-blur-xl shadow-2xl">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="font-heading text-xl font-bold text-white">Project Request Application</h3>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">* Required Fields</span>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="contact-fullname"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rajesh@company.com"
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Phone Number / WhatsApp *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Company Name
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Global Tech"
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Required & Topic */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Service Required *
                      </label>
                      <select
                        id="contact-service-select"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.title} className="bg-slate-900 text-white">
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Project Topic
                      </label>
                      <input
                        id="contact-topic"
                        type="text"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        placeholder="e.g. Brand Redesign, Meta Ad Scaling, 3D Web"
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 4: Budget & Preferred Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Budget Range
                      </label>
                      <select
                        id="contact-budget-select"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b} className="bg-slate-900 text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        id="contact-preferred-date"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Preferred Time
                      </label>
                      <select
                        id="contact-preferred-time-select"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        {timeOptions.map((t) => (
                          <option key={t} value={t} className="bg-slate-900 text-white">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Message / Project Details */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Message / Project Details
                    </label>
                    <textarea
                      id="contact-message-details"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your current business stage, current monthly revenue, growth goals, and timeline..."
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Actions & Submit Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      id="submit-contact-form-btn"
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? 'Submitting Request...' : 'Send Project Request'}</span>
                    </button>

                    <button
                      id="direct-whatsapp-form-btn"
                      type="button"
                      onClick={handleSendDetailsOnWhatsApp}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 hover:bg-emerald-600/30 text-emerald-300 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Send Details on WhatsApp (+91 86676 18925)</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Post-Submission Success Screen with WhatsApp & Consultation Options */
                <div id="contact-success-state" className="py-8 text-center animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-white">
                    Your project request has been received successfully.
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                    Our strategy team will get back to you shortly. You can expedite your onboarding right now with either of these options:
                  </p>

                  {/* Summary Box */}
                  <div className="my-6 max-w-md mx-auto p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left text-xs space-y-1.5">
                    <p><span className="text-slate-400">Name:</span> <span className="text-white font-semibold">{formData.name}</span></p>
                    <p><span className="text-slate-400">Email:</span> <span className="text-white font-semibold">{formData.email}</span></p>
                    <p><span className="text-slate-400">Target Service:</span> <span className="text-amber-400 font-semibold">{formData.service}</span></p>
                  </div>

                  {/* Two Main Next Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {/* Continue on WhatsApp */}
                    <button
                      id="success-continue-whatsapp-btn"
                      onClick={handleSendDetailsOnWhatsApp}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Continue on WhatsApp ({OFFICIAL_WHATSAPP_INTL})</span>
                    </button>

                    {/* Book a Consultation */}
                    <button
                      id="success-book-consultation-btn"
                      onClick={onOpenConsultationModal}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book a Consultation</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        service: SERVICES_DATA[0].title,
                        topic: '',
                        budget: '$5,000 - $15,000',
                        preferredDate: '',
                        preferredTime: 'Morning (10 AM - 1 PM)',
                        message: ''
                      });
                    }}
                    className="mt-6 text-xs text-slate-400 hover:text-white underline"
                  >
                    Submit Another Request
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
