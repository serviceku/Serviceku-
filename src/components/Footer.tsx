import React from 'react';
import { ServicekuLogo } from './ServicekuLogo';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  ArrowUp,
  MessageCircle
} from 'lucide-react';
import { BusinessConfig } from '../types';

interface FooterProps {
  config: BusinessConfig;
  onOpenLogin: () => void;
  isAdmin: boolean;
  onOpenDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenLogin,
  isAdmin,
  onOpenDashboard,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const raw = config.whatsappRaw.replace(/\D/g, '');
    window.open(`https://wa.me/${raw}?text=${encodeURIComponent('Halo Serviceku, saya ingin bertanya jasa service elektronik...')}`, '_blank');
  };

  return (
    <footer id="kontak" className="bg-slate-950 text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 inline-block">
              <ServicekuLogo variant="horizontal" size="md" lightMode={true} />
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Jasa service dan perbaikan spesialis pendingin & mesin elektronik rumah tangga maupun tempat usaha. Dikerjakan oleh teknisi handal, ramah, jujur dan bergaransi 1 bulan.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Garansi 1 Bulan Kerusakan Sama</span>
            </div>
          </div>

          {/* Core Services Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Layanan Populer
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Cuci AC Berkala (Rp 75.000)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Bongkar / Pasang AC (Rp 350.000)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Las Bocor Freon & Vakum AC</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Service Kulkas 2 Pintu & Side By Side</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Service Mesin Cuci Front & Top Loading</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Service Showcase & Freezer Box Toko</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Perbaikan Modul / PCB Elektronik</span>
              </li>
            </ul>
          </div>

          {/* Area Layanan Panggilan */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Area Panggilan Teknisi
            </h4>
            <p className="text-xs text-slate-400">
              Teknisi kami siap meluncur ke lokasi Anda di wilayah:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {config.coverageAreas.map((area, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-800 text-sky-300 text-xs font-bold"
                >
                  📍 {area}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-2">
              Melayani panggilan rumah, kost, kontrakan, kantor, ruko, restoran, minimarket, dan pabrik.
            </p>
          </div>

          {/* Workshop Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Workshop & Kontak
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{config.workshopAddress}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>WhatsApp: {config.whatsappNumber}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{config.workingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleWhatsApp}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Langsung WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & admin portal trigger */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} <b>{config.companyName}</b> - {config.tagline}. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            {isAdmin ? (
              <button
                onClick={onOpenDashboard}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 underline"
              >
                Buka Panel Admin
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors"
              >
                Portal Admin Login
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
              title="Kembali ke Atas"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
