import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Shield, 
  Eye, 
  EyeOff, 
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
    logout, 
    authError, 
    clearAuthError 
  } = useAuth();
  
  // Clean 2-Mode Authentication only: 'login' (Sign In) and 'signup' (Create Account)
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
        setSuccessMsg('✓ Authenticated successfully! Entering dashboard...');
        setTimeout(() => {
          onSuccessRedirect();
        }, 400);
      } else {
        if (!name.trim()) throw new Error('Please enter your full name');
        await signupWithEmail(name, email, password);
        setSuccessMsg('✓ Account created successfully! Entering dashboard...');
        setTimeout(() => {
          onSuccessRedirect();
        }, 400);
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
    setLoading(true);
    try {
      await loginWithGoogle();
      setSuccessMsg('✓ Connected with Google! Entering dashboard...');
      setTimeout(() => {
        onSuccessRedirect();
      }, 300);
    } catch (err: any) {
      console.warn('Google sign-in flow notice:', err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-center pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Back button with ample breathing room */}
      <div className="max-w-4xl mx-auto w-full mb-6">
        <button
          id="auth-back-to-home-btn"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to ELA Digital World</span>
        </button>
      </div>

      {/* Main Clean Luxury Auth Card */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-slate-950/85 backdrop-blur-2xl border border-amber-500/25 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Left Column: Brand & Trust */}
        <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <BrandLogo size="md" showTagline={true} />

            <div className="mt-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Gateway</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white leading-tight">
                Think Digital.<br />
                <span className="text-amber-400">Think Bigger.</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect your account to review active marketing campaigns, submit project inquiries, and receive direct phone notifications when the Owner accepts your milestones.
              </p>
            </div>
          </div>

          <div className="my-6 relative flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 rounded-full border border-amber-500/30 flex items-center justify-center bg-gradient-to-br from-blue-900/30 to-amber-950/30 shadow-[0_0_40px_rgba(245,158,11,0.2)]">
              <Shield className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <div className="relative z-10 text-[11px] text-slate-400 font-mono space-y-1">
            <p className="text-slate-300">Executive Desk: +91 86676 18925</p>
            <p className="text-emerald-400">Cloud Firestore Persistent Sync</p>
          </div>
        </div>

        {/* Right Column: Active Session OR Clean Auth Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          {/* Case 1: User is already signed in */}
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
                  Active verified session found.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left flex items-center gap-4 max-w-md mx-auto">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-bold font-heading text-lg">
                  {(userProfile?.name || user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white truncate">{userProfile?.name || user.displayName || 'Client'}</p>
                    {isAdmin && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-amber-500 text-slate-950 uppercase">
                        Owner
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
                  <span>Enter Command Center</span>
                </button>

                <button
                  id="auth-signout-btn"
                  onClick={async () => {
                    await logout();
                  }}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Case 2: Clean 2-Mode Auth Form (Sign In, Create Account, Connect with Google) */
            <div>
              {/* Clean 2-Tab Switcher */}
              <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800 mb-6">
                <button
                  id="tab-login-btn"
                  type="button"
                  onClick={() => { setMode('login'); clearAuthError(); }}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
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
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    mode === 'signup'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Title & Prompt */}
              <div className="mb-5">
                <h2 className="font-heading text-2xl font-black text-white">
                  {mode === 'login' ? 'Sign In to Your Account' : 'Create Your Account'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {mode === 'login' 
                    ? 'Enter your email and password to access your project dashboard.' 
                    : 'Register your details to submit inquiries and track accepted milestones.'}
                </p>
              </div>

              {/* Error Alert */}
              {authError && (
                <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Success Alert */}
              {successMsg && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Prominent Google OAuth Button */}
              <div className="mb-5">
                <button
                  id="auth-google-login-btn"
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-white font-bold text-xs transition-all flex items-center justify-center gap-3 shadow-md hover:bg-slate-850 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Connect with Google</span>
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-800"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-mono">
                    <span className="bg-slate-950 px-3 text-slate-500">Or continue with email</span>
                  </div>
                </div>
              </div>

              {/* Form for Email / Password */}
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Email Address</span>
                  </label>
                  <input
                    id="auth-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Password</span>
                  </label>
                  <div className="relative">
                    <input
                      id="auth-password-input"
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white pr-10 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  id="auth-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Processing...' : mode === 'login' ? 'Sign In to Dashboard' : 'Create Account'}
                </button>
              </form>

              {/* Bottom toggle between Sign In and Create Account */}
              <div className="mt-5 text-center text-xs text-slate-400">
                {mode === 'login' ? (
                  <p>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setMode('signup'); clearAuthError(); }}
                      className="text-amber-400 hover:underline font-bold"
                    >
                      Create Account
                    </button>
                  </p>
                ) : (
                  <p>
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => { setMode('login'); clearAuthError(); }}
                      className="text-amber-400 hover:underline font-bold"
                    >
                      Sign In
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
