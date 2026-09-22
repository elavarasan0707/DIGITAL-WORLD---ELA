import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Shield, 
  Eye, 
  EyeOff, 
  Zap, 
  Check, 
  ExternalLink,
  KeyRound,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../common/BrandLogo';

interface AuthPageProps {
  onBackToHome: () => void;
  onSuccessRedirect: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onBackToHome, onSuccessRedirect }) => {
  const { 
    user, 
    userProfile, 
    isAdmin, 
    loginWithGoogle, 
    loginWithEmail, 
    signupWithEmail, 
    loginAsDemo, 
    resetPassword, 
    logout, 
    authError, 
    clearAuthError 
  } = useAuth();
  
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setSuccessMsg(null);
    setPopupBlocked(false);
    setLoading(true);

    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
        setSuccessMsg('✓ Authenticated & Saved to Cloud Firestore! Entering dashboard...');
        setTimeout(() => {
          onSuccessRedirect();
        }, 400);
      } else if (mode === 'signup') {
        if (!name.trim()) throw new Error('Please enter your full name');
        await signupWithEmail(name, email, password);
        setSuccessMsg('✓ Account Created & Saved to Cloud Firestore! Entering dashboard...');
        setTimeout(() => {
          onSuccessRedirect();
        }, 400);
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setSuccessMsg('Password reset instructions have been sent to your email.');
      }
    } catch (err: any) {
      console.warn('Authentication attempt notice:', err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    clearAuthError();
    setSuccessMsg(null);
    setPopupBlocked(false);
    setLoading(true);
    try {
      await loginWithGoogle();
      setSuccessMsg('✓ Authenticated with Google & Synced to Firestore! Entering dashboard...');
      setTimeout(() => {
        onSuccessRedirect();
      }, 300);
    } catch (err: any) {
      console.warn('Google sign-in flow notice:', err?.message || err);
      if (err?.message?.includes('popup') || err?.code === 'auth/popup-blocked') {
        setPopupBlocked(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = (role: 'client' | 'admin') => {
    clearAuthError();
    setSuccessMsg(null);
    setLoading(true);
    try {
      loginAsDemo(role);
      setTimeout(() => {
        onSuccessRedirect();
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = (type: 'client' | 'admin') => {
    if (type === 'admin') {
      setEmail('elae2379@gmail.com');
      setPassword('AdminPass123!');
      if (mode === 'signup') setName('ELA Admin Owner');
    } else {
      setEmail('client@eladigitalworld.com');
      setPassword('ClientPass123!');
      if (mode === 'signup') setName('Karthik Raja');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow ambient */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Back button */}
      <div className="max-w-5xl mx-auto w-full mb-6">
        <button
          id="auth-back-to-home-btn"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to ELA Digital World Home</span>
        </button>
      </div>

      {/* Main 2-Column Luxury Auth Card */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-slate-900/80 border border-amber-500/25 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Left Column: Brand & Security Guarantee */}
        <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <BrandLogo size="lg" showTagline={true} />

            <div className="mt-8 sm:mt-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Client Command Center</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white leading-tight">
                Think Digital.<br />Think Bigger.
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Log in to review active marketing campaigns, download weekly performance telemetry, schedule VIP consultations, and manage ongoing project milestones.
              </p>
            </div>
          </div>

          {/* Graphic Sphere Hologram */}
          <div className="my-8 relative flex items-center justify-center pointer-events-none">
            <div className="w-40 h-40 rounded-full border border-amber-500/30 flex items-center justify-center bg-gradient-to-br from-blue-900/30 via-slate-950 to-amber-950/30 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
              <div className="w-28 h-28 rounded-full border border-sky-400/30 animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute w-48 h-16 border border-amber-400/50 rounded-full -rotate-45"></div>
              <Shield className="w-8 h-8 text-amber-400/80" />
            </div>
          </div>

          <div className="relative z-10 text-[11px] text-slate-500 font-mono space-y-1">
            <p>Direct Agency WhatsApp: +91 86676 18925</p>
            <p className="text-emerald-400/80">Secured with Cloud Firebase Auth</p>
          </div>
        </div>

        {/* Right Column: Active Session OR Auth Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          {/* Case 1: User is already logged in */}
          {user ? (
            <div className="space-y-6 text-center py-6">
              <div className="inline-flex p-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-white">
                  You are Signed In
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Active session found for this browser session.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left flex items-center gap-4 max-w-md mx-auto">
                <img
                  src={userProfile?.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.uid}`}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full border border-amber-400 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white truncate">{userProfile?.name || user.displayName || 'Client'}</p>
                    {isAdmin && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-amber-500 text-slate-950 uppercase">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  id="auth-go-to-dashboard-btn"
                  onClick={onSuccessRedirect}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Enter Command Center Dashboard</span>
                </button>

                <button
                  id="auth-signout-switch-btn"
                  onClick={async () => {
                    await logout();
                  }}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Switch Account / Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Case 2: User is not logged in -> Auth Form */
            <div>
              {/* Mode Switcher Tabs */}
              <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 mb-6">
                <button
                  id="tab-login-btn"
                  type="button"
                  onClick={() => { setMode('login'); clearAuthError(); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    mode === 'login'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  id="tab-signup-btn"
                  type="button"
                  onClick={() => { setMode('signup'); clearAuthError(); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    mode === 'signup'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
                <button
                  id="tab-forgot-btn"
                  type="button"
                  onClick={() => { setMode('forgot'); clearAuthError(); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    mode === 'forgot'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Reset
                </button>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <div className="mb-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Database: <strong>ai-studio-875793e0-7740-4842-8f2c-7203ba55ba9c</strong></span>
                </div>
                <h2 className="font-heading text-2xl font-black text-white">
                  {mode === 'login' && 'Welcome to ELA Digital World'}
                  {mode === 'signup' && 'Create Client Account'}
                  {mode === 'forgot' && 'Reset Your Password'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {mode === 'login' && 'Sign in with your email and password to access your growth dashboard.'}
                  {mode === 'signup' && 'Register your account — your profile will sync automatically to Firestore.'}
                  {mode === 'forgot' && 'Enter your email to receive recovery instructions.'}
                </p>
              </div>

              {/* Error Alert */}
              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Popup Blocked Hint */}
              {popupBlocked && (
                <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Google popup was restricted by browser iframe.</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => window.open(window.location.href, '_blank')}
                      className="px-3 py-1 rounded bg-amber-500 text-slate-950 font-bold text-[11px] flex items-center gap-1"
                    >
                      <span>Open in New Tab</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDemoAccess('client')}
                      className="px-3 py-1 rounded bg-slate-800 text-slate-200 font-medium text-[11px]"
                    >
                      Use Demo Login
                    </button>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {successMsg && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* 1-Click Fast Demo Login Buttons (Instant Verification) */}
              <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Instant 1-Click Demo Login</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">No password required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    id="demo-login-client-btn"
                    type="button"
                    onClick={() => handleDemoAccess('client')}
                    disabled={loading}
                    className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 hover:border-amber-400 text-left transition-colors flex items-center gap-2.5 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold font-mono">
                      C
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white group-hover:text-amber-400 truncate">
                        Demo Client
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        Karthik Raja (Nexus)
                      </p>
                    </div>
                  </button>

                  <button
                    id="demo-login-admin-btn"
                    type="button"
                    onClick={() => handleDemoAccess('admin')}
                    disabled={loading}
                    className="py-2.5 px-3 rounded-xl bg-slate-950 border border-amber-500/30 hover:border-amber-400 text-left transition-colors flex items-center gap-2.5 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold font-mono">
                      ★
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-amber-300 group-hover:text-amber-400 truncate">
                        Demo Admin (Owner)
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        elae2379@gmail.com
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Google OAuth Button */}
              {mode !== 'forgot' && (
                <div className="mb-5">
                  <button
                    id="auth-google-login-btn"
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 hover:border-amber-400 text-white font-semibold text-xs transition-all flex items-center justify-center gap-3 shadow-md hover:bg-slate-900 active:scale-[0.99] disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Sign in with Google</span>
                  </button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-800"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-mono">
                      <span className="bg-slate-900/90 px-3 text-slate-500">Or sign in with email</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Form for Email / Password */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>Full Name</span>
                    </label>
                    <input
                      id="auth-name-input"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Karthik Raja"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>Email Address</span>
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fillTestCredentials('client')}
                        className="text-[10px] text-slate-400 hover:text-amber-400 underline font-mono"
                      >
                        Autofill Client
                      </button>
                      <button
                        type="button"
                        onClick={() => fillTestCredentials('admin')}
                        className="text-[10px] text-amber-400 hover:underline font-mono font-bold"
                      >
                        Autofill Admin
                      </button>
                    </div>
                  </div>
                  <input
                    id="auth-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Password</span>
                      </label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => { setMode('forgot'); clearAuthError(); }}
                          className="text-[11px] text-amber-400 hover:underline"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        id="auth-password-input"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 pr-10 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  id="auth-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 mt-2"
                >
                  <span>
                    {loading
                      ? 'Authenticating...'
                      : mode === 'login'
                      ? 'Sign In to Dashboard'
                      : mode === 'signup'
                      ? 'Register Account'
                      : 'Send Reset Link'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Mode Toggle Footer */}
              <div className="mt-5 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
                {mode === 'login' ? (
                  <p>
                    Don't have an account yet?{' '}
                    <button
                      id="switch-to-signup-btn"
                      onClick={() => { setMode('signup'); clearAuthError(); }}
                      className="text-amber-400 font-bold hover:underline"
                    >
                      Create Account
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <button
                      id="switch-to-login-btn"
                      onClick={() => { setMode('login'); clearAuthError(); }}
                      className="text-amber-400 font-bold hover:underline"
                    >
                      Sign In Here
                    </button>
                  </p>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
