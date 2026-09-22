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
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db, collection, query, where, getDocs, orderBy } from '../../lib/firebase';
import { ConsultationBooking, ContactRequest } from '../../types';
import { OFFICIAL_WHATSAPP_INTL, getWhatsAppDirectUrl } from '../../lib/whatsapp';

interface DashboardPageProps {
  onBackToHome: () => void;
  onOpenBookingModal: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onBackToHome, onOpenBookingModal }) => {
  const { user, userProfile, isAdmin, logout } = useAuth();
  
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'consultations' | 'requests' | 'telemetry'>('consultations');

  const fetchData = async () => {
    setLoading(true);
    try {
      if (isAdmin) {
        // Admins can see all consultations & inquiries
        const consRef = collection(db, 'consultations');
        const consSnap = await getDocs(query(consRef));
        const consList: ConsultationBooking[] = [];
        consSnap.forEach((doc) => consList.push({ id: doc.id, ...doc.data() } as ConsultationBooking));
        setConsultations(consList);

        const reqsRef = collection(db, 'contact_requests');
        const reqsSnap = await getDocs(query(reqsRef));
        const reqsList: ContactRequest[] = [];
        reqsSnap.forEach((doc) => reqsList.push({ id: doc.id, ...doc.data() } as ContactRequest));
        setContactRequests(reqsList);
      } else if (user?.email) {
        // Regular user: see their own bookings
        const consRef = collection(db, 'consultations');
        const q = query(consRef, where('email', '==', user.email));
        const consSnap = await getDocs(q);
        const consList: ConsultationBooking[] = [];
        consSnap.forEach((doc) => consList.push({ id: doc.id, ...doc.data() } as ConsultationBooking));
        setConsultations(consList);

        const reqsRef = collection(db, 'contact_requests');
        const q2 = query(reqsRef, where('email', '==', user.email));
        const reqsSnap = await getDocs(q2);
        const reqsList: ContactRequest[] = [];
        reqsSnap.forEach((doc) => reqsList.push({ id: doc.id, ...doc.data() } as ContactRequest));
        setContactRequests(reqsList);
      }
    } catch (err) {
      console.warn('Dashboard data fetch fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, isAdmin]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-4">
            <button
              id="dashboard-back-home-btn"
              onClick={onBackToHome}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Return to Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-xl sm:text-2xl font-black text-white">
                  Client Command Center
                </h1>
                {isAdmin && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Executive Admin
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <p className="text-xs text-slate-400">
                  Welcome, <strong className="text-slate-200">{userProfile?.name || user?.displayName || user?.email || 'Valued Partner'}</strong>
                </p>
                <span className="text-slate-600">•</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                  <CheckCircle className="w-3 h-3" />
                  <span>Firestore: ai-studio-875793e0-7740-4842-8f2c-7203ba55ba9c</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              id="dashboard-refresh-btn"
              onClick={fetchData}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              id="dashboard-new-consultation-btn"
              onClick={onOpenBookingModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-md hover:scale-105 transition-transform flex items-center gap-1.5"
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
              className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-900/40 text-xs flex items-center gap-1.5 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Reserved Consultations</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black font-heading text-white">{consultations.length}</div>
            <span className="text-[10px] text-emerald-400 font-mono">Confirmed with Strategist</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Active Inquiries</span>
              <MessageSquare className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black font-heading text-white">{contactRequests.length}</div>
            <span className="text-[10px] text-slate-400 font-mono">Pipeline In Review</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Dedicated Lead</span>
              <User className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-bold text-white font-heading truncate">ELA Growth Advisory</div>
            <span className="text-[10px] text-slate-400 font-mono">Senior Director Assigned</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-emerald-500/30">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Direct WhatsApp</span>
              <Phone className="w-4 h-4 text-emerald-400" />
            </div>
            <a
              href={getWhatsAppDirectUrl()}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-emerald-400 hover:underline block truncate font-mono"
            >
              {OFFICIAL_WHATSAPP_INTL}
            </a>
            <span className="text-[10px] text-emerald-400 font-mono">Priority 24/7 Channel</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 mb-6 gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('consultations')}
            className={`pb-3 transition-colors ${
              activeTab === 'consultations'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Strategy Consultations ({consultations.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-3 transition-colors ${
              activeTab === 'requests'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Project Inquiries ({contactRequests.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'consultations' && (
          <div className="space-y-4">
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">Loading your consultations...</div>
            ) : consultations.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800">
                <Calendar className="w-10 h-10 text-amber-500/40 mx-auto mb-3" />
                <h4 className="font-heading text-lg font-bold text-white">No Consultations Scheduled Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                  Schedule your free strategy session with senior ELA Digital World engineers.
                </p>
                <button
                  onClick={onOpenBookingModal}
                  className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg transition-all"
                >
                  Book Free Consultation
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {consultations.map((item) => (
                  <div key={item.id} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                        {item.status || 'Confirmed'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {item.date} • {item.time}
                      </span>
                    </div>

                    <h4 className="font-heading text-base font-bold text-white">
                      {item.service}
                    </h4>
                    <p className="text-xs text-amber-300 font-medium mt-0.5">
                      Focus: {item.topic}
                    </p>

                    {item.message && (
                      <p className="text-xs text-slate-400 mt-2 italic bg-slate-950/60 p-2.5 rounded-xl border border-slate-850">
                        "{item.message}"
                      </p>
                    )}

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span>{item.name} ({item.phone})</span>
                      <a
                        href={getWhatsAppDirectUrl(`Hi, regarding my scheduled consultation on ${item.date} for ${item.service}...`)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Phone className="w-3 h-3" />
                        <span>WhatsApp Strategist</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-4">
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">Loading inquiries...</div>
            ) : contactRequests.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800">
                <MessageSquare className="w-10 h-10 text-sky-500/40 mx-auto mb-3" />
                <h4 className="font-heading text-lg font-bold text-white">No Project Requests On File</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                  Submit a project request from the home page to start your customized proposal.
                </p>
                <button
                  onClick={onBackToHome}
                  className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                >
                  Return to Home Page
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactRequests.map((req) => (
                  <div key={req.id} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white font-heading">{req.name}</span>
                      <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {req.service}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 space-y-1 mt-2">
                      <p><span className="text-slate-500">Email:</span> {req.email}</p>
                      <p><span className="text-slate-500">Phone:</span> {req.phone}</p>
                      {req.company && <p><span className="text-slate-500">Company:</span> {req.company}</p>}
                      {req.budget && <p><span className="text-slate-500">Budget:</span> {req.budget}</p>}
                    </div>

                    {req.message && (
                      <p className="text-xs text-slate-300 mt-3 p-2 rounded-lg bg-slate-950/60 border border-slate-850">
                        {req.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
