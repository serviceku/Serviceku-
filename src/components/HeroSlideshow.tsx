import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Wrench, 
  Clock, 
  MapPin, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles,
  Zap
} from 'lucide-react';
import { BannerSlide, BusinessConfig } from '../types';
import { ServicekuLogo } from './ServicekuLogo';

interface HeroSlideshowProps {
  banners: BannerSlide[];
  config: BusinessConfig;
  onSelectServiceTab?: (cat: string) => void;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  banners,
  config,
}) => {
  const activeBanners = banners.filter((b) => b.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto advance slide every 6 seconds if not paused
  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [activeBanners.length, isPaused]);

  if (activeBanners.length === 0) return null;

  const currentSlide = activeBanners[currentIndex] || activeBanners[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const handleWhatsAppOrder = (customText?: string) => {
    const rawNumber = config.whatsappRaw.replace(/\D/g, '');
    const message = encodeURIComponent(
      customText || `Halo Serviceku, saya tertarik dengan promo: "${currentSlide.title}". Mohon info jadwal kedatangan teknisi.`
    );
    window.open(`https://wa.me/${rawNumber}?text=${message}`, '_blank');
  };

  // Gradient themes matching aesthetic infografis flyer
  const gradientStyles: Record<string, { bg: string; badge: string; glow: string }> = {
    blue: {
      bg: 'from-blue-900 via-blue-800 to-indigo-950',
      badge: 'bg-amber-400 text-slate-950',
      glow: 'bg-blue-500/20',
    },
    cyan: {
      bg: 'from-cyan-900 via-sky-800 to-blue-950',
      badge: 'bg-cyan-300 text-slate-950',
      glow: 'bg-cyan-500/20',
    },
    indigo: {
      bg: 'from-indigo-950 via-slate-900 to-blue-900',
      badge: 'bg-yellow-400 text-slate-950',
      glow: 'bg-indigo-500/20',
    },
    amber: {
      bg: 'from-slate-900 via-amber-950 to-blue-950',
      badge: 'bg-amber-300 text-slate-950',
      glow: 'bg-amber-500/20',
    },
    emerald: {
      bg: 'from-emerald-950 via-slate-900 to-blue-950',
      badge: 'bg-emerald-300 text-slate-950',
      glow: 'bg-emerald-500/20',
    },
  };

  const theme = gradientStyles[currentSlide.gradientTheme] || gradientStyles.blue;

  return (
    <div className="relative w-full bg-slate-950 text-white overflow-hidden">
      {/* Slideshow main container */}
      <div 
        className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex items-center justify-center transition-colors duration-700"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Dynamic Gradient Background with ambient glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-95 transition-all duration-700`} />
        
        {/* Decorative Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" 
        />

        {/* Ambient glow orbs */}
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl ${theme.glow} pointer-events-none`} />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl bg-blue-600/15 pointer-events-none" />

        {/* Content Slider */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left animate-in fade-in slide-in-from-left-4 duration-500">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm transition-all">
                <span className={`px-2.5 py-0.5 rounded-full font-extrabold ${theme.badge}`}>
                  {currentSlide.badgeText || 'GARANSI 1 BULAN'}
                </span>
                <span className="text-blue-200 text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Serviceku Elektronik
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
                {currentSlide.title}
              </h1>

              {/* Highlight Subheading */}
              <div className="text-base sm:text-xl font-bold text-amber-300 tracking-wide">
                {currentSlide.highlightText}
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {currentSlide.description}
              </p>

              {/* Feature Chips */}
              <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs font-semibold text-blue-100">
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Teknisi Siap Datang
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                  <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" /> Garansi 1 Bulan
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> Indramayu - Cirebon - Majalengka
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <button
                  onClick={() => handleWhatsAppOrder(currentSlide.ctaTargetWhatsAppText)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-950/40 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                >
                  <PhoneCall className="w-5 h-5 animate-bounce" />
                  <span>{currentSlide.ctaText || 'Hubungi WhatsApp Sekarang'}</span>
                </button>

                <a
                  href="#katalog"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base text-center transition-all backdrop-blur-md"
                >
                  Lihat Daftar Harga Jasa
                </a>
              </div>
            </div>

            {/* Right Column: Visual Graphic / Appliance Banner Preview */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-4/3 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl group">
                {currentSlide.imageUrl ? (
                  <img
                    src={currentSlide.imageUrl}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-800 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
                    <ServicekuLogo variant="full" size="lg" lightMode={true} />
                  </div>
                )}

                {/* Overlay Badge Card */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-5">
                  <div className="bg-slate-900/90 backdrop-blur-md rounded-xl p-3 border border-white/15 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-300 font-medium">Spesialis Elektronik</p>
                        <p className="text-xs font-bold text-white">AC • Kulkas • Mesin Cuci</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-yellow-400 text-slate-950 rounded-md">
                      Panggilan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Navigation */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all focus:outline-none"
              aria-label="Slide Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all focus:outline-none"
              aria-label="Slide Selanjutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Indicator Dots */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex 
                    ? 'w-7 h-2 bg-amber-400' 
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Buka slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Trust Ribbon Underneath Slideshow */}
      <div className="relative z-10 bg-slate-900 border-t border-b border-slate-800 py-3.5 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-center sm:text-left">
          
          <div className="flex items-center justify-center sm:justify-start gap-3 p-2">
            <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Garansi 1 Bulan</p>
              <p className="text-[11px] text-slate-400">Kerusakan yang sama dijamin</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-2">
            <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 shrink-0">
              <Wrench className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Teknisi Berpengalaman</p>
              <p className="text-[11px] text-slate-400">Ramah, jujur & amanah</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-2">
            <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 shrink-0">
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Cepat & Tepat Waktu</p>
              <p className="text-[11px] text-slate-400">Datang tepat, kerja cepat</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-2">
            <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 shrink-0">
              <MapPin className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Workshop & Panggilan</p>
              <p className="text-[11px] text-slate-400 truncate">{config.workshopAddress}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
