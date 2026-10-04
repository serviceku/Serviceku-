import React, { useState } from 'react';
import { ServicekuLogo } from './ServicekuLogo';
import { 
  Phone, 
  ShieldCheck, 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { BusinessConfig } from '../types';

interface NavbarProps {
  isAdmin: boolean;
  onOpenLogin: () => void;
  onOpenDashboard: () => void;
  onLogout: () => void;
  config: BusinessConfig;
  onScrollToSection: (sectionId: string) => void;
  currentView: 'home' | 'dashboard';
  setCurrentView: (view: 'home' | 'dashboard') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isAdmin,
  onOpenLogin,
  onOpenDashboard,
  onLogout,
  config,
  onScrollToSection,
  currentView,
  setCurrentView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        onScrollToSection(sectionId);
      }, 100);
    } else {
      onScrollToSection(sectionId);
    }
    setMobileMenuOpen(false);
  };

  const handleWhatsAppDirect = () => {
    const rawNumber = config.whatsappRaw.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Halo Serviceku, saya ingin bertanya tentang jasa service panggilan elektronik di alamat ${config.workshopAddress}. Terima kasih!`
    );
    window.open(`https://wa.me/${rawNumber}?text=${message}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-blue-700 via-sky-700 to-blue-800 text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="flex items-center gap-1 bg-yellow-400 text-slate-900 font-bold px-2 py-0.5 rounded text-[10px] shrink-0 uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" /> Garansi 1 Bulan
            </span>
            <span className="hidden sm:inline">Melayani Panggilan:</span>
            <span className="font-semibold truncate">
              {config.coverageAreas.join(' • ')} (Workshop: {config.workshopAddress})
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a 
              href={`tel:${config.whatsappNumber.replace(/[^0-9+]/g, '')}`} 
              className="flex items-center gap-1 hover:text-yellow-300 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span className="hidden xs:inline">{config.whatsappNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <button 
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1 -ml-1 transition-transform hover:scale-[1.01]"
          >
            <ServicekuLogo variant="horizontal" size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('katalog')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-xl transition-all"
            >
              Katalog Jasa & Harga
            </button>
            <button
              onClick={() => handleNavClick('keunggulan')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-xl transition-all"
            >
              Keunggulan & Garansi
            </button>
            <button
              onClick={() => handleNavClick('area')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-xl transition-all"
            >
              Area Layanan
            </button>
            <button
              onClick={() => handleNavClick('kontak')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-xl transition-all"
            >
              Kontak Workshop
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* WhatsApp Quick Chat */}
            <button
              onClick={handleWhatsAppDirect}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
              title="Hubungi WhatsApp Serviceku"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-200 animate-ping" />
              <span>Chat WA: {config.whatsappNumber}</span>
            </button>

            {/* Admin Login / Dashboard Button */}
            {!isAdmin ? (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 hover:border-blue-600 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold transition-all shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Admin Login</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    if (currentView === 'dashboard') {
                      setCurrentView('home');
                    } else {
                      onOpenDashboard();
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-xs transition-all shadow-xs ${
                    currentView === 'dashboard'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>{currentView === 'dashboard' ? 'Lihat Website' : 'Dashboard Admin'}</span>
                </button>
                <button
                  onClick={onLogout}
                  title="Logout Admin"
                  className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            {!isAdmin ? (
              <button
                onClick={onOpenLogin}
                className="px-2.5 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 rounded-lg border border-blue-200"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => setCurrentView(currentView === 'dashboard' ? 'home' : 'dashboard')}
                className="px-2.5 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg"
              >
                {currentView === 'dashboard' ? 'Web' : 'Admin'}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('katalog')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-blue-50 rounded-lg"
            >
              Katalog Jasa & Harga
            </button>
            <button
              onClick={() => handleNavClick('keunggulan')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-blue-50 rounded-lg"
            >
              Keunggulan & Garansi
            </button>
            <button
              onClick={() => handleNavClick('area')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-blue-50 rounded-lg"
            >
              Area Layanan Panggilan
            </button>
            <button
              onClick={() => handleNavClick('kontak')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-blue-50 rounded-lg"
            >
              Kontak & Workshop
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={handleWhatsAppDirect}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-center font-bold text-sm shadow-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Hubungi WA: {config.whatsappNumber}
            </button>

            {isAdmin ? (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCurrentView(currentView === 'dashboard' ? 'home' : 'dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-xl text-xs font-bold text-center"
                >
                  {currentView === 'dashboard' ? 'Kembali ke Web' : 'Buka Dashboard Admin'}
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 px-3 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold text-center hover:bg-slate-50 flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" /> Admin Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
