import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Phone, ArrowRight } from 'lucide-react';
import { BusinessConfig } from '../types';

interface FloatingWhatsAppProps {
  config: BusinessConfig;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenWA = (customMessage?: string) => {
    const rawNumber = config.whatsappRaw.replace(/\D/g, '');
    const text = encodeURIComponent(
      customMessage || `Halo Serviceku, saya ingin bertanya tentang jasa service elektronik panggilan. Terima kasih!`
    );
    window.open(`https://wa.me/${rawNumber}?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      
      {/* Pop-up Quick Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-300 border-2 border-emerald-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">Teknisi Serviceku</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
                  Online Siap Panggilan
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick options */}
          <div className="p-4 space-y-2.5 text-xs">
            <p className="text-slate-600 text-xs">
              Halo! Ada yang bisa kami bantu perbaiki hari ini? Pilih pesan cepat di bawah:
            </p>

            <button
              onClick={() => handleOpenWA('Halo Serviceku, saya mau booking Cuci AC Promo Rp 75.000 ke alamat saya.')}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 transition-colors flex items-center justify-between group"
            >
              <span>Cuci AC Promo Rp 75.000</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => handleOpenWA('Halo Serviceku, kulkas/showcase saya bermasalah tidak dingin. Kapan teknisi bisa datang?')}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 transition-colors flex items-center justify-between group"
            >
              <span>Service Kulkas / Freezer Tidak Dingin</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => handleOpenWA('Halo Serviceku, mesin cuci saya rusak / eror. Mau tanya estimasi biaya dan servis.')}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 transition-colors flex items-center justify-between group"
            >
              <span>Service Mesin Cuci Bermasalah</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => handleOpenWA()}
              className="w-full py-2 px-3 mt-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Buka Chat Bebas di WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-xl shadow-emerald-950/30 hover:shadow-2xl transition-all duration-300 focus:outline-none"
        aria-label="Chat WhatsApp Serviceku"
      >
        <span className="relative flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
        </span>

        <MessageCircle className="w-5 h-5 text-white" />
        <span className="hidden sm:inline">Tanya Teknisi (WA)</span>

        {/* Unread badge indicator */}
        <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
          1
        </span>
      </button>

    </div>
  );
};
