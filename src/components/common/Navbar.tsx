import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, User as UserIcon, LayoutDashboard, Shield, LogOut, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { getWhatsAppDirectUrl } from '../../lib/whatsapp';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  openBookingModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  openBookingModal
}) => {
  const { user, userProfile, isAdmin, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', view: 'home', hash: '#hero' },
    { label: 'About', view: 'home', hash: '#about' },
    { label: 'Services', view: 'home', hash: '#services' },
    { label: 'Projects', view: 'home', hash: '#projects' },
    { label: 'Solutions', view: 'home', hash: '#ai-solutions' },
    { label: 'Blog', view: 'blog', hash: '' },
    { label: 'Contact', view: 'home', hash: '#contact' },
  ];

  const handleNavClick = (link: { label: string; view: string; hash: string }) => {
    setMobileMenuOpen(false);
    if (link.view !== currentView) {
      setCurrentView(link.view);
    }
    if (link.hash && (link.view === 'home' || currentView === 'home')) {
      setTimeout(() => {
        const el = document.querySelector(link.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleWhatsAppClick = () => {
    window.open(getWhatsAppDirectUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <header 
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-amber-500/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with clear visibility */}
        <BrandLogo 
          size="md" 
          showTagline={true} 
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-md">
          {navLinks.map((item) => (
            <button
              key={item.label}
              id={`nav-link-${item.label.toLowerCase()}`}
              onClick={() => handleNavClick(item)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                currentView === item.view && (!item.hash || window.location.hash === item.hash)
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick WhatsApp CTA */}
          <button
            id="navbar-whatsapp-button"
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-600/30 text-xs font-medium transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </button>

          {/* User Account / Login State */}
          {user ? (
            <div className="relative">
              <button
                id="user-profile-menu-button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-800/80 border border-amber-500/30 hover:border-amber-400 text-xs text-white transition-all"
              >
                <img
                  src={userProfile?.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.uid}`}
                  alt={userProfile?.name || 'User'}
                  className="w-6 h-6 rounded-full object-cover border border-amber-400"
                />
                <span className="max-w-[100px] truncate font-medium">{userProfile?.name || 'Account'}</span>
                {isAdmin && (
                  <span className="px-1.5 py-0.2 text-[9px] font-bold bg-amber-500 text-slate-950 rounded uppercase">
                    Admin
                  </span>
                )}
              </button>

              {userDropdownOpen && (
                <div 
                  id="user-dropdown-menu"
                  className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 text-xs"
                >
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="font-semibold text-white truncate">{userProfile?.name || user.email}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>

                  <button
                    id="menu-client-dashboard"
                    onClick={() => {
                      setCurrentView('dashboard');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-800 hover:text-amber-400 text-left transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-400" />
                    <span>Client Dashboard</span>
                  </button>

                  {isAdmin && (
                    <button
                      id="menu-admin-dashboard"
                      onClick={() => {
                        setCurrentView('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-800 hover:text-amber-400 text-left transition-colors"
                    >
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span>Admin Command Center</span>
                    </button>
                  )}

                  <button
                    id="menu-logout-button"
                    onClick={async () => {
                      await logout();
                      setUserDropdownOpen(false);
                      setCurrentView('home');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 text-left transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              id="navbar-login-button"
              onClick={() => setCurrentView('login')}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <UserIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Login</span>
            </button>
          )}

          {/* Primary CTA: Start Your Project / Get Started */}
          <button
            id="navbar-get-started-button"
            onClick={() => {
              setCurrentView('home');
              setTimeout(() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="group relative px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-slate-950/98 backdrop-blur-2xl border-t border-slate-800 p-6 flex flex-col justify-between overflow-y-auto z-50 animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="space-y-3">
            <div className="pb-4 border-b border-slate-800">
              <BrandLogo size="lg" showTagline={true} />
            </div>

            <nav className="flex flex-col space-y-1 pt-2">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-900/80 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-800">
            <button
              onClick={() => {
                handleWhatsAppClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 px-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp (+91 86676 18925)</span>
            </button>

            <button
              onClick={() => {
                openBookingModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 px-4 rounded-xl bg-slate-800 text-white font-semibold text-sm border border-slate-700"
            >
              Book Free Consultation
            </button>

            {user ? (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCurrentView('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold text-sm"
                >
                  Dashboard
                </button>
                {isAdmin && (
                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-semibold text-sm"
                  >
                    Admin
                  </button>
                )}
                <button
                  onClick={async () => {
                    await logout();
                    setMobileMenuOpen(false);
                  }}
                  className="py-3 px-4 rounded-xl bg-red-500/20 text-red-400 font-semibold text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setCurrentView('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-sm shadow-lg flex items-center justify-center gap-2"
              >
                <span>Login / Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
