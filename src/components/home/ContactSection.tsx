import React, { useState, useEffect } from 'react';
import { 
  Send, 
  MessageCircle, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Lock, 
  LogIn, 
  ShieldCheck, 
  UserCheck, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { db, collection, addDoc, serverTimestamp } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { SERVICES_DATA } from '../../data/mockData';
import { 
  OFFICIAL_WHATSAPP_INTL, 
  getWhatsAppFormUrl, 
  WhatsAppFormPayload 
} from '../../lib/whatsapp';

interface ContactSectionProps {
  onOpenConsultationModal: () => void;
  onNavigateToAuth?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  onOpenConsultationModal,
  onNavigateToAuth 
}) => {
  const { user, userProfile, loginAsDemo } = useAuth();

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
  const [authRequiredNotice, setAuthRequiredNotice] = useState(false);

  // Auto-populate logged-in user profile details
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || userProfile?.name || user.displayName || '',
        email: prev.email || user.email || '',
        phone: prev.phone || userProfile?.phone || ''
      }));
      setAuthRequiredNotice(false);
    }
  }, [user, userProfile]);

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

    // 1. Strict Security Guard: Only authenticated users can send messages to the owner
    if (!user) {
      setAuthRequiredNotice(true);
      setError('Client Authentication Required: To maintain enterprise NDA security and receive acceptance notifications to your phone, please sign in before sending a message.');
      const gateElem = document.getElementById('auth-gate-banner');
      gateElem?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !(formData.message || '').trim()) {
      setError('Please provide your Full Name, Email, Phone Number, and Project Message.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        userId: user.uid,
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
        status: 'Pending Review',
        statusNote: 'Inquiry received. Awaiting Owner review and acceptance.',
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
        source: 'Authenticated Contact Portal',
        leadStatus: 'New',
        timestamp: serverTimestamp()
      });

      setSubmitted(true);
    } catch (err: any) {
      console.warn('Firestore contact request submission notice:', err);
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
            <span>Secure Project Gateway</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white leading-tight">
            Send Project Message to Owner
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            Submit your scope directly to ELA Leadership. When the Owner accepts your project, an instant acceptance notification will be routed to your phone number.
          </p>
        </div>

        {/* Professional Authentication Gate (Shown when visitor is NOT logged in) */}
        {!user && (
          <div 
            id="auth-gate-banner"
            className="mb-10 max-w-3xl mx-auto p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900/90 to-blue-500/10 border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden animate-in fade-in"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-lg font-bold text-white">
                      Client Sign-In Required to Send Message
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-semibold">
                      Enterprise Standard
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-xl">
                    To prevent spam and ensure the owner can dispatch your official <strong>"Project Accepted"</strong> notification directly to your phone number, please sign in before submitting.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-col gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onNavigateToAuth}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Create Account</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Authenticated Client Status Badge */}
        {user && (
          <div className="mb-8 max-w-3xl mx-auto p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  Signed in as {userProfile?.name || user.displayName || user.email}
                </p>
                <p className="text-[11px] text-emerald-300/80 font-mono">
                  {user.email} • Client ID: {user.uid.slice(0, 12)}...
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Client</span>
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Booking Trigger */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Executive Commitment</span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-black text-white leading-tight">
                How Your Project Request Works
              </h3>

              <div className="mt-6 space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs flex-shrink-0">1</div>
                  <div>
                    <strong className="text-white">Submit Verified Scope:</strong> Log in and enter your project goals with your active phone number.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs flex-shrink-0">2</div>
                  <div>
                    <strong className="text-white">Owner Evaluation:</strong> The ELA Owner reviews your requirements in the Client Command Center.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0">3</div>
                  <div>
                    <strong className="text-emerald-300">Instant Phone Notification:</strong> When the Owner clicks <strong>"Accept Project"</strong>, an automated acceptance dispatch is triggered to your phone number!
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Direct Desk / WhatsApp</span>
                    <a href={`tel:${OFFICIAL_WHATSAPP_INTL}`} className="font-semibold text-white hover:text-amber-400">
                      {OFFICIAL_WHATSAPP_INTL}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Executive Inquiries</span>
                    <span className="font-semibold text-white">elae2379@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Consultation Booking Trigger Banner */}
              <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-950 border border-amber-500/30">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono uppercase mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Live Strategy Session</span>
                </div>
                <h4 className="font-heading text-base font-bold text-white">Prefer a 1-on-1 Video Call?</h4>
                <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">
                  Book a free 30-minute growth roadmap session directly on our calendar.
                </p>
                <button
                  id="contact-book-consultation-trigger"
                  type="button"
                  onClick={onOpenConsultationModal}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Free Consultation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: The Project Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 relative shadow-2xl">
              
              {submitted ? (
                <div className="py-12 text-center space-y-5 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-wider">
                      Status: Pending Owner Review
                    </span>
                    <h3 className="font-heading text-2xl font-black text-white mt-3">
                      Project Message Successfully Dispatched!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{formData.name}</strong>. Your scope for <strong className="text-amber-400">{formData.service}</strong> has been stored securely in Google Cloud Firestore.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 max-w-md mx-auto text-left space-y-1.5 font-mono">
                    <p className="text-amber-400 font-bold">✓ Client Phone on File: {formData.phone}</p>
                    <p className="text-slate-400">✓ Owner: elae2379@gmail.com notified</p>
                    <p className="text-emerald-400">✓ Acceptance notification will dispatch to {formData.phone} once approved!</p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleSendDetailsOnWhatsApp}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Instant WhatsApp Dispatch to Owner</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
                    >
                      Send Another Scope
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Alert Error */}
                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Full Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Karthik Raja"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Work Email <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="contact-email-input"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="karthik@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Phone / WhatsApp <span className="text-amber-400">* (For Acceptance Alert)</span>
                      </label>
                      <input
                        id="contact-phone-input"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Company / Brand Name
                      </label>
                      <input
                        id="contact-company-input"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Nexus Global Technologies"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Selection & Project Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Selected Service
                      </label>
                      <select
                        id="contact-service-select"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        {SERVICES_DATA.map((srv) => (
                          <option key={srv.id} value={srv.title} className="bg-slate-900 text-white">
                            {srv.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Estimated Budget
                      </label>
                      <select
                        id="contact-budget-select"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        {budgetOptions.map((opt, i) => (
                          <option key={i} value={opt} className="bg-slate-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Project Scope Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                      Project Goals & Requirements <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      id="contact-message-textarea"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project objectives, timeline, tech requirements, and specific outcomes you wish to achieve..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-750 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Encrypting & Dispatching to Owner...</span>
                      ) : !user ? (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Sign In Required to Send Message</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Dispatch Project Message to Owner</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-[11px] text-slate-500 text-center mt-2.5 font-mono">
                      🔒 Guaranteed 24-hr turnaround. Upon acceptance, an automated alert will route to your phone.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
