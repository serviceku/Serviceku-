import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlideshow } from './components/HeroSlideshow';
import { ServiceCard } from './components/ServiceCard';
import { CoverageAndWarrantySection } from './components/CoverageAndWarrantySection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminLoginModal } from './components/AdminLoginModal';
import { BookingWhatsAppModal } from './components/BookingWhatsAppModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ServicekuLogo } from './components/ServicekuLogo';
import { 
  Search, 
  Sparkles, 
  Wrench, 
  MessageSquare, 
  SlidersHorizontal, 
  CheckCircle2, 
  ShieldCheck,
  PhoneCall,
  X
} from 'lucide-react';
import { ServiceItem, BannerSlide, BusinessConfig, ServiceCategory } from './types';
import { api } from './services/api';
import { DEFAULT_SERVICES, DEFAULT_BANNERS, DEFAULT_BUSINESS_CONFIG } from './data/defaultData';

export default function App() {
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [banners, setBanners] = useState<BannerSlide[]>(DEFAULT_BANNERS);
  const [config, setConfig] = useState<BusinessConfig>(DEFAULT_BUSINESS_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  // View state
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Booking modal state
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Initial Data Fetch
  const loadAllData = async () => {
    try {
      const [fetchedServices, fetchedBanners, fetchedConfig] = await Promise.all([
        api.getServices(),
        api.getBanners(),
        api.getConfig(),
      ]);

      setServices(fetchedServices);
      setBanners(fetchedBanners);
      setConfig(fetchedConfig);
      setIsAdmin(api.isAdminLoggedIn());
    } catch (e) {
      console.warn('Error loading app data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    api.logoutAdmin();
    setIsAdmin(false);
    setCurrentView('home');
  };

  const handleOpenBooking = (service: ServiceItem) => {
    setSelectedServiceForBooking(service);
    setIsBookingModalOpen(true);
  };

  const handleWhatsAppDirect = (service: ServiceItem) => {
    const rawNumber = config.whatsappRaw.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Halo Serviceku, saya ingin bertanya dan booking jasa service:\n` +
      `🛠️ Layanan: *${service.name}*\n` +
      `🏷️ Kategori: *${service.category}*\n` +
      `💰 Tarif: *${service.price}*\n` +
      `🛡️ Garansi: *${service.warranty}*\n\n` +
      `Mohon info teknisi panggilan ke lokasi saya. Terima kasih!`
    );
    window.open(`https://wa.me/${rawNumber}?text=${message}`, '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter and search computation
  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      // Must be active
      if (!item.isActive) return false;

      // Category matching
      if (selectedCategory !== 'Semua' && item.category !== selectedCategory) {
        return false;
      }

      // Search matching
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesBadge = item.badge?.toLowerCase().includes(query);
        const matchesFeatures = item.features?.some((f) => f.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesCat || matchesBadge || matchesFeatures;
      }

      return true;
    });
  }, [services, selectedCategory, searchQuery]);

  const categories: { label: string; value: string; count: number }[] = useMemo(() => {
    const counts: Record<string, number> = {};
    services.forEach((s) => {
      if (s.isActive) {
        counts[s.category] = (counts[s.category] || 0) + 1;
      }
    });

    return [
      { label: 'Semua Layanan', value: 'Semua', count: services.filter((s) => s.isActive).length },
      { label: 'AC Pendingin', value: 'AC', count: counts['AC'] || 0 },
      { label: 'Kulkas & Refrigerator', value: 'Kulkas', count: counts['Kulkas'] || 0 },
      { label: 'Mesin Cuci', value: 'Mesin Cuci', count: counts['Mesin Cuci'] || 0 },
      { label: 'Showcase Minuman', value: 'Showcase', count: counts['Showcase'] || 0 },
      { label: 'Freezer Box', value: 'Freezer Box', count: counts['Freezer Box'] || 0 },
      { label: 'Dispenser Air', value: 'Dispenser', count: counts['Dispenser'] || 0 },
    ];
  }, [services]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        isAdmin={isAdmin}
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenDashboard={() => setCurrentView('dashboard')}
        onLogout={handleLogout}
        config={config}
        onScrollToSection={scrollToSection}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main View Switching */}
      {currentView === 'dashboard' && isAdmin ? (
        <AdminDashboard
          services={services}
          banners={banners}
          config={config}
          onRefreshData={loadAllData}
          onClose={() => setCurrentView('home')}
        />
      ) : (
        <main className="flex-1">
          
          {/* Top Hero Infographics Slideshow with gradient styling */}
          <HeroSlideshow
            banners={banners}
            config={config}
          />

          {/* Quick Notice Badge */}
          <div className="bg-amber-400 text-slate-950 py-2.5 px-4 text-center font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>
              GARANSI 1 BULAN UNTUK KERUSAKAN YANG SAMA • MELAYANI PANGGILAN INDRAMAYU, CIREBON, MAJALENGKA
            </span>
          </div>

          {/* Catalog Section */}
          <section id="katalog" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  <Wrench className="w-3.5 h-3.5 text-blue-600" />
                  Katalog Jasa Service Serviceku
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Pilihan Jasa & Tarif Perbaikan
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                  Pilih jasa yang Anda butuhkan. Klik kartu jasa untuk melihat detail prosedur atau langsung pesan teknisi via WhatsApp dengan 1 kali klik.
                </p>
              </div>

              {/* Search Box */}
              <div className="w-full md:w-80 relative">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari: cuci ac, bocor, modul, kulkas..."
                  className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm shadow-xs focus:ring-2 focus:ring-blue-600 outline-none transition-all text-slate-900"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.value
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      selectedCategory === cat.value
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Services Grid */}
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onSelect={handleOpenBooking}
                    onWhatsAppDirect={handleWhatsAppDirect}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-4 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">Jasa tidak ditemukan</h3>
                  <p className="text-xs text-slate-500">
                    Tidak ada jasa dengan kata kunci "{searchQuery}". Coba kata kunci lain atau hubungi kami langsung via WhatsApp.
                  </p>
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Semua');
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    Reset Pencarian
                  </button>
                  <button
                    onClick={() => {
                      const raw = config.whatsappRaw.replace(/\D/g, '');
                      window.open(`https://wa.me/${raw}?text=${encodeURIComponent(`Halo Serviceku, saya mencari perbaikan untuk: ${searchQuery}. Apakah bisa dibantu?`)}`, '_blank');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Tanya via WhatsApp</span>
                  </button>
                </div>
              </div>
            )}

            {/* Callout Card: Elektronik Lainnya & Custom Service */}
            <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="px-3 py-1 rounded-full bg-yellow-400 text-slate-950 font-black text-[11px] uppercase tracking-wider inline-block">
                  Layanan Khusus & Konsultasi
                </span>
                <h3 className="text-xl sm:text-2xl font-black">
                  Peralatan Elektronik Anda Tidak Ada di Daftar Katalog?
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 max-w-2xl">
                  Kami melayani berbagai macam keluhan elektronik lainnya. Ceritakan kendala atau kirimkan foto peralatan elektronik Anda kepada teknisi kami melalui WhatsApp.
                </p>
              </div>

              <button
                onClick={() => {
                  const raw = config.whatsappRaw.replace(/\D/g, '');
                  window.open(`https://wa.me/${raw}?text=${encodeURIComponent('Halo Serviceku, saya ingin konsultasi kerusakan elektronik khusus. Mohon info teknisi.')}`, '_blank');
                }}
                className="shrink-0 px-6 py-3.5 rounded-2xl bg-white hover:bg-yellow-300 text-blue-900 font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Konsultasi Bebas via WA</span>
              </button>
            </div>

          </section>

          {/* Section Keunggulan, Area Coverage & Workshop matching flyer Image 2 */}
          <CoverageAndWarrantySection config={config} />

        </main>
      )}

      {/* Footer */}
      <Footer
        config={config}
        onOpenLogin={() => setLoginModalOpen(true)}
        isAdmin={isAdmin}
        onOpenDashboard={() => setCurrentView('dashboard')}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp config={config} />

      {/* Admin Login Dialog Modal */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Booking / Service Detail Dialog Modal */}
      <BookingWhatsAppModal
        service={selectedServiceForBooking}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        config={config}
      />

    </div>
  );
}
