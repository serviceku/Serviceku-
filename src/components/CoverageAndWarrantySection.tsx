import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  HeartHandshake, 
  Sparkles, 
  PhoneCall, 
  Award, 
  CheckCircle,
  Wrench,
  BadgeCheck
} from 'lucide-react';
import { BusinessConfig } from '../types';

interface CoverageAndWarrantySectionProps {
  config: BusinessConfig;
}

export const CoverageAndWarrantySection: React.FC<CoverageAndWarrantySectionProps> = ({ config }) => {
  const handleWhatsApp = (text: string) => {
    const raw = config.whatsappRaw.replace(/\D/g, '');
    window.open(`https://wa.me/${raw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="keunggulan" className="py-16 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            Keunggulan Layanan Serviceku
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Mengapa Memilih Jasa Service Elektronik Kami?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Percayakan perbaikan peralatan elektronik Anda kepada teknisi spesialis berpengalaman. Kami menjamin kepuasan kerja dengan garansi 1 bulan penuh.
          </p>
        </div>

        {/* 4 Pillars Grid (matching flyer Image 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                <Wrench className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-extrabold text-slate-900">Teknisi Handal</h3>
                <p className="text-xs font-semibold text-amber-700">Ramah, Jujur & Amanah</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Semua teknisi kami berpengalaman dalam menangani sistem pendingin inverter, modul digital, dan mesin elektronik rumah tangga maupun usaha.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-amber-600">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Teknisi Teruji & Ahli</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <BadgeCheck className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-extrabold text-slate-900">Harga Bersahabat</h3>
                <p className="text-xs font-semibold text-emerald-700">Kualitas Terbaik, Tarif Transparan</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tanpa biaya tersembunyi. Biaya jasa & suku cadang dijelaskan terlebih dahulu sebelum teknisi melakukan tindakan perbaikan.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Jujur & Tanpa Mark-up</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-extrabold text-slate-900">Cepat & Tepat Waktu</h3>
                <p className="text-xs font-semibold text-sky-700">Datang Tepat, Kerja Cepat</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Layanan panggilan darurat siap berangkat ke rumah, kos, kantor, ruko, restoran, atau supermarket Anda tepat waktu.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-sky-600">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Respon WA Cepat Tanggap</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-extrabold text-slate-900">Kepuasan Pelanggan</h3>
                <p className="text-xs font-semibold text-blue-700">Prioritas Utama Serviceku</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Garansi service 1 bulan untuk kerusakan yang sama. Jika ada keluhan setelah servis, teknisi siap datang kembali tanpa biaya tambahan.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-blue-600">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Garansi 1 Bulan Penuh</span>
            </div>
          </div>

        </div>

        {/* Big Yellow & Dark Blue Highlight Guarantee Banner (Matching Image 2) */}
        <div 
          id="area" 
          className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 sm:p-10 border-2 border-yellow-400/40 shadow-2xl text-white relative overflow-hidden"
        >
          {/* Top Yellow Ribbon */}
          <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-slate-950 py-2.5 px-4 text-center font-black text-xs sm:text-sm tracking-wide uppercase shadow-md flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            GARANSI SERVICE UNTUK KERUSAKAN YANG SAMA 1 BULAN
          </div>

          <div className="pt-8 sm:pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info: Area Layanan & Workshop */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  Melayani Panggilan ke Lokasi Anda
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Wilayah Jangkauan Layanan Serviceku
                </h3>
              </div>

              {/* Area badges */}
              <div className="flex flex-wrap gap-2.5">
                {config.coverageAreas.map((area, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-extrabold text-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{area.toUpperCase()}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Alamat Workshop Resmi:</span>
                    <span>{config.workshopAddress}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-1">
                  <Clock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Jam Siap Panggilan:</span>
                    <span>{config.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Info: Big WA Call to Action Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900/60 to-emerald-950/80 p-6 sm:p-7 rounded-3xl border border-emerald-500/40 text-center space-y-4">
              <span className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider block">
                Panggilan Darurat & Konsultasi Cepat
              </span>

              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                <PhoneCall className="w-8 h-8 text-emerald-400 animate-pulse" />
                <span>{config.whatsappNumber}</span>
              </div>

              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Langsung terhubung dengan teknisi Serviceku. Kirim foto elektronik yang rusak untuk estimasi biaya awal dan jadwal kedatangan!
              </p>

              <button
                onClick={() => handleWhatsApp('Halo Serviceku, saya ingin memanggil teknisi ke rumah/toko saya. Mohon infonya!')}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-sm shadow-xl shadow-emerald-950/50 hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Chat WhatsApp Sekarang</span>
              </button>
            </div>

          </div>

          {/* Bottom Trust Tagline */}
          <div className="mt-8 pt-4 border-t border-white/10 text-center">
            <p className="text-xs sm:text-sm font-extrabold tracking-wide text-yellow-300 uppercase">
              ★ Percayakan Service Anda Kepada Kami, Kami Siap Memberikan Yang Terbaik! ★
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
