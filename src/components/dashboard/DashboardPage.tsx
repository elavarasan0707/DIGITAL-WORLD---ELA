import React, { useEffect, useState } from 'react';
import { 
  User, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck, 
  LogOut, 
  Clock, 
  CheckCircle, 
  ArrowLeft, 
  Phone, 
  Mail, 
  Sparkles,
  RefreshCw,
  Plus,
  CheckCircle2,
  Send,
  MessageCircle,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  X,
  Smartphone,
  BellRing,
  Award,
  FileText,
  BadgeCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { 
  db, 
  collection, 
  doc, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  addDoc, 
  serverTimestamp 
} from '../../lib/firebase';
import { ConsultationBooking, ContactRequest, ClientNotification } from '../../types';
import { 
  OFFICIAL_WHATSAPP_INTL, 
  OFFICIAL_WHATSAPP_CLEAN,
  getWhatsAppDirectUrl, 
  formatClientWhatsAppPhone, 
  getClientWhatsAppUrl, 
  getClientSmsUrl 
} from '../../lib/whatsapp';

interface DashboardPageProps {
  onBackToHome: () => void;
  onOpenBookingModal: () => void;
}

interface ReplyModalState {
  isOpen: boolean;
  targetId: string;
  type: 'project' | 'consultation';
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  service: string;
  replyText: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onBackToHome, onOpenBookingModal }) => {
  const { user, userProfile, isAdmin, logout } = useAuth();
  
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [clientNotifications, setClientNotifications] = useState<ClientNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'requests' | 'consultations' | 'notifications'>('requests');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Interactive Reply & Phone Dispatch Modal
  const [replyModal, setReplyModal] = useState<ReplyModalState>({
    isOpen: false,
    targetId: '',
    type: 'project',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    service: '',
    replyText: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      if (isAdmin) {
        // Owner/Admin: fetch all inquiries, consultations, and notifications
        const consRef = collection(db, 'consultations');
        const consSnap = await getDocs(query(consRef));
        const consList: ConsultationBooking[] = [];
        consSnap.forEach((d) => consList.push({ id: d.id, ...d.data() } as ConsultationBooking));
        setConsultations(consList);

        const reqsRef = collection(db, 'contact_requests');
        const reqsSnap = await getDocs(query(reqsRef));
        const reqsList: ContactRequest[] = [];
        reqsSnap.forEach((d) => reqsList.push({ id: d.id, ...d.data() } as ContactRequest));
        setContactRequests(reqsList);

        const notifRef = collection(db, 'client_notifications');
        const notifSnap = await getDocs(query(notifRef));
        const notifList: ClientNotification[] = [];
        notifSnap.forEach((d) => notifList.push({ id: d.id, ...d.data() } as ClientNotification));
        setClientNotifications(notifList);
      } else if (user?.email) {
        // Client: fetch only their own inquiries, bookings, and notifications
        const consRef = collection(db, 'consultations');
        const q = query(consRef, where('email', '==', user.email));
        const consSnap = await getDocs(q);
        const consList: ConsultationBooking[] = [];
        consSnap.forEach((d) => consList.push({ id: d.id, ...d.data() } as ConsultationBooking));
        setConsultations(consList);

        const reqsRef = collection(db, 'contact_requests');
        const q2 = query(reqsRef, where('email', '==', user.email));
        const reqsSnap = await getDocs(q2);
        const reqsList: ContactRequest[] = [];
        reqsSnap.forEach((d) => reqsList.push({ id: d.id, ...d.data() } as ContactRequest));
        setContactRequests(reqsList);

        const notifRef = collection(db, 'client_notifications');
        const q3 = query(notifRef, where('clientEmail', '==', user.email));
        const notifSnap = await getDocs(q3);
        const notifList: ClientNotification[] = [];
        notifSnap.forEach((d) => notifList.push({ id: d.id, ...d.data() } as ClientNotification));
        setClientNotifications(notifList);
      }
    } catch (err) {
      console.warn('Dashboard data fetch notice:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, isAdmin]);

  // Open Reply Modal for Project
  const openProjectReplyModal = (req: ContactRequest) => {
    const defaultReply = `🚀 *ELA DIGITAL WORLD - PROJECT ACCEPTED!*
Hello ${req.name},
Your project request for *${req.service}* has been reviewed and officially *ACCEPTED* by Executive Owner Elavarasan R.
Our senior engineering team is preparing your kickoff onboarding roadmap and milestone deliverables.

📋 *Details:*
• Service: ${req.service}
• Registered Mobile: ${req.phone}
• Executive Lead: Elavarasan R (Owner)

Direct Desk: ${OFFICIAL_WHATSAPP_INTL}`;

    setReplyModal({
      isOpen: true,
      targetId: req.id || '',
      type: 'project',
      clientName: req.name,
      clientPhone: req.phone,
      clientEmail: req.email,
      service: req.service,
      replyText: req.ownerReplyNote || defaultReply
    });
  };

  // Open Reply Modal for Consultation
  const openConsultationReplyModal = (cons: ConsultationBooking) => {
    const defaultReply = `🗓️ *ELA DIGITAL WORLD - CONSULTATION CONFIRMED!*
Hello ${cons.name},
Your strategy session for *${cons.service}* on *${cons.date}* at *${cons.time}* has been officially confirmed by Executive Owner Elavarasan R.

We look forward to reviewing your digital marketing and web infrastructure growth strategy.
Direct Desk: ${OFFICIAL_WHATSAPP_INTL}`;

    setReplyModal({
      isOpen: true,
      targetId: cons.id || '',
      type: 'consultation',
      clientName: cons.name,
      clientPhone: cons.phone,
      clientEmail: cons.email,
      service: cons.service,
      replyText: cons.ownerReplyNote || defaultReply
    });
  };

  // Save Owner Official Reply to Firestore and update status
  const handleSaveOfficialReply = async () => {
    if (!replyModal.targetId) return;
    setUpdatingId(replyModal.targetId);

    const replyTimestamp = new Date().toISOString();
    const ownerName = 'Elavarasan R (Executive Owner & Founder, ELA Digital World)';

    try {
      if (replyModal.type === 'project') {
        const docRef = doc(db, 'contact_requests', replyModal.targetId);
        await updateDoc(docRef, {
          status: 'Accepted',
          statusNote: 'Your project has been reviewed and accepted by Executive Owner Elavarasan R.',
          acceptedAt: replyTimestamp,
          ownerReplyNote: replyModal.replyText,
          ownerReplyBy: ownerName,
          ownerReplyAt: replyTimestamp,
          notifiedPhone: replyModal.clientPhone
        });

        // Add to client_notifications
        await addDoc(collection(db, 'client_notifications'), {
          clientEmail: replyModal.clientEmail,
          clientPhone: replyModal.clientPhone,
          title: '🎉 Your Project Has Been Accepted!',
          service: replyModal.service,
          status: 'Accepted',
          message: replyModal.replyText,
          whatsappUrl: getClientWhatsAppUrl(replyModal.clientPhone, replyModal.replyText),
          createdAt: replyTimestamp,
          timestamp: serverTimestamp()
        });

        // Update local state
        setContactRequests(prev => prev.map(item => item.id === replyModal.targetId ? {
          ...item,
          status: 'Accepted',
          statusNote: 'Your project has been reviewed and accepted by Executive Owner Elavarasan R.',
          acceptedAt: replyTimestamp,
          ownerReplyNote: replyModal.replyText,
          ownerReplyBy: ownerName,
          ownerReplyAt: replyTimestamp,
          notifiedPhone: replyModal.clientPhone
        } : item));

      } else {
        const docRef = doc(db, 'consultations', replyModal.targetId);
        await updateDoc(docRef, {
          status: 'Accepted',
          statusNote: 'Your consultation has been confirmed by Executive Owner Elavarasan R.',
          acceptedAt: replyTimestamp,
          ownerReplyNote: replyModal.replyText,
          ownerReplyBy: ownerName,
          ownerReplyAt: replyTimestamp,
          notifiedPhone: replyModal.clientPhone
        });

        // Add to client_notifications
        await addDoc(collection(db, 'client_notifications'), {
          clientEmail: replyModal.clientEmail,
          clientPhone: replyModal.clientPhone,
          title: '🗓️ Strategy Consultation Confirmed!',
          service: replyModal.service,
          status: 'Accepted',
          message: replyModal.replyText,
          whatsappUrl: getClientWhatsAppUrl(replyModal.clientPhone, replyModal.replyText),
          createdAt: replyTimestamp,
          timestamp: serverTimestamp()
        });

        // Update local state
        setConsultations(prev => prev.map(item => item.id === replyModal.targetId ? {
          ...item,
          status: 'Accepted',
          statusNote: 'Your consultation has been confirmed by Executive Owner Elavarasan R.',
          acceptedAt: replyTimestamp,
          ownerReplyNote: replyModal.replyText,
          ownerReplyBy: ownerName,
          ownerReplyAt: replyTimestamp,
          notifiedPhone: replyModal.clientPhone
        } : item));
      }

      setReplyModal(prev => ({ ...prev, isOpen: false }));
    } catch (err) {
      console.error('Error saving official reply:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Check if client has any accepted project
  const acceptedProjects = contactRequests.filter(r => r.status === 'Accepted');
  const acceptedConsultations = consultations.filter(c => c.status === 'Accepted');

  return (
    <div className="min-h-screen bg-transparent text-slate-100 pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Bar with high clearance from Navbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              id="dashboard-back-home-btn"
              onClick={onBackToHome}
              className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shadow-md"
              title="Return to Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-heading text-xl sm:text-2xl font-black text-white">
                  {isAdmin ? 'Executive Owner Command Center' : 'Client Project Portal'}
                </h1>
                {isAdmin ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    <span>Executive Owner (Elavarasan R)</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Client Portal
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <p className="text-xs text-slate-400">
                  Welcome, <strong className="text-slate-200">{userProfile?.name || user?.displayName || user?.email || 'Partner'}</strong>
                </p>
                <span className="text-slate-600">•</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                  <CheckCircle className="w-3 h-3" />
                  <span>Cloud Firestore Sync Active</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              id="dashboard-refresh-btn"
              onClick={fetchData}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              id="dashboard-new-consultation-btn"
              onClick={onOpenBookingModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-md hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Book Strategy Session</span>
            </button>

            <button
              id="dashboard-logout-btn"
              onClick={async () => {
                await logout();
                onBackToHome();
              }}
              className="p-2.5 rounded-xl bg-red-950/50 border border-red-500/30 text-red-400 hover:bg-red-900/50 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* CLIENT CELEBRATION BANNER: Shown to Client if their Project has been Accepted by Owner */}
        {!isAdmin && (acceptedProjects.length > 0 || acceptedConsultations.length > 0) && (
          <div className="mb-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-slate-950/90 to-amber-500/20 border-2 border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)] relative overflow-hidden backdrop-blur-xl animate-in fade-in">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/30 border border-emerald-500/50 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Project Officially Accepted & Handled by Owner</span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-black text-white">
                    Congratulations! Your Project Request Has Been Accepted
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    Executive Owner <strong className="text-amber-400">Elavarasan R</strong> has reviewed and approved your scope. An official acceptance alert has been dispatched directly to your registered phone number.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <a
                  href={getWhatsAppDirectUrl("Hello Elavarasan R, I am following up on my accepted project milestone at ELA Digital World!")}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat With Owner on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Project Inquiries</span>
              <MessageSquare className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-white font-heading">{contactRequests.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">
              {contactRequests.filter(r => r.status === 'Accepted').length} Accepted & Active
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Consultations</span>
              <Calendar className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-2xl font-black text-white font-heading">{consultations.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">
              {consultations.filter(c => c.status === 'Accepted').length} Confirmed Slots
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Phone Alerts Dispatched</span>
              <Smartphone className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-white font-heading">{clientNotifications.length}</p>
            <p className="text-[11px] text-emerald-400 mt-1">Direct to Client Mobile</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Executive Desk</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-sm font-bold text-white font-mono">{OFFICIAL_WHATSAPP_INTL}</p>
            <p className="text-[11px] text-slate-400 mt-1">Elavarasan R (Owner)</p>
          </div>
        </div>

        {/* MAIN TABS SWITCHER */}
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            id="tab-requests-btn"
            onClick={() => setActiveTab('requests')}
            className={`py-3 px-5 text-xs font-bold font-mono transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'requests'
                ? 'border-amber-400 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Project Inquiries ({contactRequests.length})</span>
          </button>

          <button
            id="tab-consultations-btn"
            onClick={() => setActiveTab('consultations')}
            className={`py-3 px-5 text-xs font-bold font-mono transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'consultations'
                ? 'border-amber-400 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Consultations ({consultations.length})</span>
          </button>

          <button
            id="tab-notifications-btn"
            onClick={() => setActiveTab('notifications')}
            className={`py-3 px-5 text-xs font-bold font-mono transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'notifications'
                ? 'border-amber-400 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <BellRing className="w-3.5 h-3.5" />
            <span>Dispatched Phone Alerts ({clientNotifications.length})</span>
          </button>
        </div>

        {/* TAB 1: PROJECT INQUIRIES & MESSAGES */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {loading ? (
              <div className="p-12 text-center text-xs text-slate-400">Loading inquiries...</div>
            ) : contactRequests.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-950/70 border border-slate-800">
                <MessageSquare className="w-10 h-10 text-sky-500/40 mx-auto mb-3" />
                <h4 className="font-heading text-lg font-bold text-white">No Project Inquiries Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                  {isAdmin 
                    ? 'Incoming client project requests will appear here with acceptance and direct mobile reply controls.' 
                    : 'Submit a project request from the home page to track it here.'}
                </p>
                <button
                  onClick={onBackToHome}
                  className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Return to Home Page
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactRequests.map((req) => {
                  const isAccepted = req.status === 'Accepted';
                  const isUpdating = updatingId === req.id;

                  return (
                    <div 
                      key={req.id} 
                      className={`p-6 rounded-2xl bg-slate-950/85 backdrop-blur-xl border transition-all ${
                        isAccepted 
                          ? 'border-emerald-500/50 bg-gradient-to-br from-emerald-950/20 via-slate-950/90 to-slate-950/90 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                          : 'border-slate-800 hover:border-amber-500/30'
                      }`}
                    >
                      {/* Top status bar */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-white font-heading">{req.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                            isAccepted 
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 flex items-center gap-1' 
                              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          }`}>
                            {isAccepted && <CheckCircle2 className="w-3 h-3" />}
                            <span>{isAccepted ? '✓ Project Accepted' : (req.status || 'Pending Review')}</span>
                          </span>
                        </div>
                      </div>

                      {/* Service & Budget Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-[11px] font-mono text-amber-300 px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                          {req.service}
                        </span>
                        {req.budget && (
                          <span className="text-[11px] font-mono text-slate-300 px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700">
                            Budget: {req.budget}
                          </span>
                        )}
                      </div>

                      {/* Client Details */}
                      <div className="text-xs text-slate-300 space-y-1.5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                        <p className="flex items-center justify-between">
                          <span className="text-slate-500 font-mono">Work Email:</span>
                          <span className="font-semibold text-slate-200">{req.email}</span>
                        </p>
                        <p className="flex items-center justify-between">
                          <span className="text-slate-500 font-mono">Client Phone:</span>
                          <span className="font-bold text-amber-400 font-mono flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{req.phone}</span>
                          </span>
                        </p>
                        {req.company && (
                          <p className="flex items-center justify-between">
                            <span className="text-slate-500 font-mono">Company:</span>
                            <span className="text-slate-200">{req.company}</span>
                          </p>
                        )}
                        {req.createdAt && (
                          <p className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                            <span className="text-slate-500">Submitted:</span>
                            <span className="text-slate-400">{new Date(req.createdAt).toLocaleDateString()}</span>
                          </p>
                        )}
                      </div>

                      {/* Project Message */}
                      {req.message && (
                        <div className="mt-3">
                          <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Client Inquired Scope:</span>
                          <p className="text-xs text-slate-300 italic bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                            "{req.message}"
                          </p>
                        </div>
                      )}

                      {/* OFFICIAL OWNER RESPONSE CARD: Shows client who reviewed and answered! */}
                      {req.ownerReplyNote && (
                        <div className="mt-3.5 p-3.5 rounded-xl bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-emerald-500/10 border border-amber-500/30 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                              <BadgeCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                              <span>{req.ownerReplyBy || 'Executive Owner Elavarasan R'}</span>
                            </div>
                            {req.ownerReplyAt && (
                              <span className="text-[10px] font-mono text-slate-400">
                                {new Date(req.ownerReplyAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                            {req.ownerReplyNote}
                          </p>
                          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                            <Smartphone className="w-3 h-3" />
                            <span>Alert routed directly to: {req.notifiedPhone || req.phone}</span>
                          </div>
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                        {/* If Admin / Owner: provide REPLY & ALERT CLIENT PHONE CONTROLS */}
                        {isAdmin ? (
                          <div className="flex flex-wrap items-center gap-2 w-full justify-between">
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() => openProjectReplyModal(req)}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-md transition-transform hover:scale-105 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{isAccepted ? 'Update Reply & Re-alert Client' : 'Accept Project & Alert Client'}</span>
                            </button>

                            {/* Quick Direct WhatsApp Client Action */}
                            <a
                              href={getClientWhatsAppUrl(req.phone, `Hello ${req.name}, regarding your project inquiry for ${req.service} at ELA Digital World...`)}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono font-semibold"
                            >
                              <Phone className="w-3 h-3" />
                              <span>WhatsApp Client Phone</span>
                            </a>
                          </div>
                        ) : (
                          /* If Client: view status details & reply back to Owner */
                          <div className="flex items-center justify-between w-full text-xs">
                            <span className="text-slate-400">
                              Alerts routed to: <strong className="text-amber-400 font-mono">{req.phone}</strong>
                            </span>
                            <a
                              href={getWhatsAppDirectUrl(`Hi Elavarasan, I am following up on my project request for ${req.service}...`)}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Chat with Owner</span>
                            </a>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CONSULTATION SESSIONS */}
        {activeTab === 'consultations' && (
          <div className="space-y-4">
            {loading ? (
              <div className="p-12 text-center text-xs text-slate-400">Loading consultations...</div>
            ) : consultations.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-950/70 border border-slate-800">
                <Calendar className="w-10 h-10 text-amber-500/40 mx-auto mb-3" />
                <h4 className="font-heading text-lg font-bold text-white">No Consultations Scheduled Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                  Schedule your free strategy session with senior ELA Digital World engineers.
                </p>
                <button
                  onClick={onOpenBookingModal}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs transition-transform hover:scale-105 cursor-pointer"
                >
                  Book Strategy Session Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {consultations.map((item) => {
                  const isAccepted = item.status === 'Accepted';

                  return (
                    <div 
                      key={item.id} 
                      className={`p-6 rounded-2xl bg-slate-950/85 backdrop-blur-xl border transition-all ${
                        isAccepted 
                          ? 'border-emerald-500/50 bg-gradient-to-br from-emerald-950/20 via-slate-950/90 to-slate-950/90 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                          : 'border-slate-800 hover:border-amber-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-white font-heading">{item.name}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                          isAccepted 
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                            : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        }`}>
                          {item.status || 'Pending Slot'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-3 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.time}</span>
                      </div>

                      <div className="text-xs text-slate-300 space-y-1.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                        <p className="flex justify-between">
                          <span className="text-slate-500 font-mono">Service:</span>
                          <span className="font-semibold text-slate-200">{item.service}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-slate-500 font-mono">Client Phone:</span>
                          <span className="font-bold text-amber-400 font-mono">{item.phone}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-slate-500 font-mono">Email:</span>
                          <span className="text-slate-300">{item.email}</span>
                        </p>
                      </div>

                      {item.message && (
                        <p className="text-xs text-slate-400 mt-2.5 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                          "{item.message}"
                        </p>
                      )}

                      {/* Official Owner Reply Note */}
                      {item.ownerReplyNote && (
                        <div className="mt-3.5 p-3 rounded-xl bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-emerald-500/10 border border-amber-500/30 space-y-1.5">
                          <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                            <span className="flex items-center gap-1">
                              <BadgeCheck className="w-4 h-4 text-amber-400" />
                              <span>{item.ownerReplyBy || 'Executive Owner Elavarasan R'}</span>
                            </span>
                          </div>
                          <p className="text-xs text-slate-200 bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                            {item.ownerReplyNote}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                        {isAdmin ? (
                          <div className="flex items-center justify-between w-full">
                            <button
                              type="button"
                              onClick={() => openConsultationReplyModal(item)}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-md transition-transform hover:scale-105 flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{isAccepted ? 'Update Reply & Re-alert Client' : 'Confirm Slot & Alert Client Phone'}</span>
                            </button>

                            <a
                              href={getClientWhatsAppUrl(item.phone, `Hello ${item.name}, Regarding our confirmed consultation on ${item.date} at ${item.time} for ${item.service}...`)}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <Phone className="w-3 h-3" />
                              <span>WhatsApp Client</span>
                            </a>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between w-full text-xs">
                            <span className="text-slate-400">Target Phone: <strong className="text-white">{item.phone}</strong></span>
                            <a
                              href={getWhatsAppDirectUrl(`Hi Elavarasan, regarding my consultation on ${item.date} for ${item.service}...`)}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <Phone className="w-3 h-3" />
                              <span>WhatsApp Owner</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DISPATCHED PHONE ALERTS */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            {clientNotifications.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-950/70 border border-slate-800">
                <BellRing className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h4 className="font-heading text-lg font-bold text-white">No Phone Alerts Dispatched Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  When the Owner accepts a project or consultation, the official SMS/WhatsApp dispatch record will be preserved here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {clientNotifications.map((notif) => (
                  <div key={notif.id} className="p-4 sm:p-5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading text-sm font-bold text-white">{notif.title}</h4>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                            {notif.service}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed whitespace-pre-wrap">
                          {notif.message}
                        </p>
                        <p className="text-[11px] text-amber-400 font-mono mt-1">
                          Dispatched Directly to Client Mobile: <strong>{notif.clientPhone}</strong>
                        </p>
                      </div>
                    </div>

                    {notif.whatsappUrl && (
                      <a
                        href={notif.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 flex-shrink-0 transition-colors shadow-md"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Direct WhatsApp Channel</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* OWNER ACTION MODAL: DEDICATED REPLY & DISPATCH TO SPECIFIC CLIENT'S PHONE NUMBER */}
      {replyModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-slate-950 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_70px_rgba(16,185,129,0.35)] text-slate-100">
            
            <button
              onClick={() => setReplyModal(prev => ({ ...prev, isOpen: false }))}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Executive Approval & Reply Control
                </span>
                <h3 className="font-heading text-xl font-black text-white">
                  Reply & Alert Client Mobile
                </h3>
              </div>
            </div>

            {/* Target Client Information Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono">Target Client:</span>
                <span className="font-bold text-white">{replyModal.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono">Client Phone (Alert Destination):</span>
                <span className="font-bold text-amber-400 font-mono flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{replyModal.clientPhone}</span>
                  <span className="ml-1.5 px-2 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-300 font-bold">Verified Target</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono">Inquired Service:</span>
                <span className="text-emerald-300 font-semibold">{replyModal.service}</span>
              </div>
            </div>

            {/* Quick Templates Selector */}
            <div className="mb-3">
              <span className="text-[11px] font-mono text-slate-400 block mb-1.5">Choose Professional Quick Note Template:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setReplyModal(prev => ({
                      ...prev,
                      replyText: `🚀 *ELA DIGITAL WORLD - PROJECT ACCEPTED!*
Hello ${prev.clientName},
Your project request for *${prev.service}* has been officially *ACCEPTED* by Executive Owner Elavarasan R. Our senior engineering team is preparing your kickoff brief and roadmap.

Direct Desk: ${OFFICIAL_WHATSAPP_INTL}`
                    }));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
                >
                  ✓ Project Accepted
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setReplyModal(prev => ({
                      ...prev,
                      replyText: `💼 *ELA DIGITAL WORLD - PROPOSAL READY!*
Hello ${prev.clientName},
We have reviewed your scope for *${prev.service}* and prepared your tailored growth proposal and quotation. Let us know when you would like to review it.

Direct Desk: ${OFFICIAL_WHATSAPP_INTL}`
                    }));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
                >
                  📄 Quote & Scope Ready
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setReplyModal(prev => ({
                      ...prev,
                      replyText: `📞 *ELA DIGITAL WORLD - CALL REQUEST*
Hello ${prev.clientName},
Regarding your requirement for *${prev.service}*, could we have a brief 5-minute phone discussion today to finalize kickoff details?

Direct Desk: ${OFFICIAL_WHATSAPP_INTL}`
                    }));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
                >
                  📞 Request 5-Min Call
                </button>
              </div>
            </div>

            {/* Custom Reply Message TextArea */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-mono text-slate-300">Message to Dispatched to Client Phone:</label>
                <button
                  type="button"
                  onClick={() => handleCopyText(replyModal.replyText)}
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-mono cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <textarea
                rows={5}
                value={replyModal.replyText}
                onChange={(e) => setReplyModal(prev => ({ ...prev, replyText: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            {/* Dispatch Action Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleSaveOfficialReply}
                disabled={updatingId === replyModal.targetId}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <BadgeCheck className="w-4 h-4" />
                <span>Save Official Reply & Mark Project Accepted</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getClientWhatsAppUrl(replyModal.clientPhone, replyModal.replyText)}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send to Client WhatsApp</span>
                </a>

                <a
                  href={getClientSmsUrl(replyModal.clientPhone, replyModal.replyText)}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
                >
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>Send Direct SMS</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
