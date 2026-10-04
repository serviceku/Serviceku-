import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  ShieldCheck, 
  MapPin, 
  Check, 
  Calendar, 
  User, 
  Phone, 
  FileText, 
  Zap,
  Sparkles
} from 'lucide-react';
import { ServiceItem, BusinessConfig } from '../types';

interface BookingWhatsAppModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  config: BusinessConfig;
}

export const BookingWhatsAppModal: React.FC<BookingWhatsAppModalProps> = ({
  service,
  isOpen,
  onClose,
  config,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('Hari ini (Cepat)');
  const [notes, setNotes] = useState('');

  if (!isOpen || !service) return null;

  const handleSendBooking = (isQuickDirect = false) => {
    const rawNumber = config.whatsappRaw.replace(/\D/g, '');

    let text = '';
    if (isQuickDirect) {
      text = `Halo Serviceku Elektronik, saya ingin konsultasi dan pesan layanan service:\n` +
             `🛠️ *Layanan:* ${service.name}\n` +
             `🏷️ *Kategori:* ${service.category}\n` +
             `💰 *Estimasi Biaya:* ${service.price}\n` +
             `🛡️ *Garansi:* ${service.warranty}\n\n` +
             `Mohon informasi ketersediaan jadwal teknisi panggilan ke lokasi saya. Terima kasih!`;
    } else {
      text = `Halo *Serviceku Elektronik* 👋\nSaya ingin memesan jasa service panggilan dengan data berikut:\n\n` +
             `📌 *Layanan:* ${service.name}\n` +
             `🏷️ *Kategori:* ${service.category}\n` +
             `💰 *Biaya / Tarif:* ${service.price}\n` +
             `🛡️ *Garansi:* ${service.warranty}\n\n` +
             `👤 *Nama Pemesan:* ${customerName.trim() || 'Pelanggan'}\n` +
             (customerPhone.trim() ? `📱 *No. HP/WA:* ${customerPhone.trim()}\n` : '') +
             `📍 *Alamat Lengkap:* ${customerAddress.trim() || 'Sesuai koordinat'}\n` +
             `📅 *Jadwal Diinginkan:* ${preferredDate}\n` +
             (notes.trim() ? `📝 *Keluhan Kerusakan:* ${notes.trim()}\n\n` : '\n') +
             `Mohon konfirmasi teknisi yang akan datang ke lokasi. Terima kasih!`;
    }

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${rawNumber}?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">Detail Layanan & Booking WA</h3>
              <p className="text-xs text-blue-100">Serviceku Elektronik Terbaik • {config.whatsappNumber}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* Service Snapshot Card */}
          <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="sm:w-44 aspect-16/10 sm:aspect-square rounded-xl overflow-hidden shrink-0 bg-slate-200">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-blue-800">
                  {service.category}
                </span>
                {service.badge && (
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-300 text-slate-900 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {service.badge}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> {service.warranty}
                </span>
              </div>

              <h4 className="text-lg font-extrabold text-slate-900 leading-snug">
                {service.name}
              </h4>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-blue-700">
                  {service.price}
                </span>
                {service.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {service.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {service.description}
              </p>

              <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Area Layanan: {service.coverageArea}</span>
              </div>
            </div>
          </div>

          {/* Features Included */}
          {service.features && service.features.length > 0 && (
            <div className="space-y-2.5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Lingkup Pengerjaan & Manfaat:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Booking Form to personalize WhatsApp message */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Lengkapi Data Pemesanan (Otomatis ke WhatsApp)
              </h5>
              <span className="text-[11px] text-slate-400">Opsional / Langsung chat juga bisa</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Anda
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Bpk. Hendra"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  No. WhatsApp Aktif
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alamat Lengkap & Kota / Kecamatan
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Contoh: Jl. Sudirman No 12, Indramayu"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rencana Kunjungan
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <select
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                  >
                    <option value="Hari ini (Panggilan Cepat/Segera)">Hari ini (Panggilan Cepat/Segera)</option>
                    <option value="Besok Pagi (08:00 - 12:00)">Besok Pagi (08:00 - 12:00)</option>
                    <option value="Besok Siang / Sore (13:00 - 17:00)">Besok Siang / Sore (13:00 - 17:00)</option>
                    <option value="Weekend / Akhir Pekan">Weekend / Akhir Pekan</option>
                    <option value="Jadwalkan kemudian via chat">Jadwalkan kemudian via chat</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Catatan Keluhan Kerusakan
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: AC kurang dingin dan air netes di dalam kamar..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleSendBooking(false)}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Kirim Booking ke WhatsApp (+62 878-7441-7978)</span>
            </button>

            <button
              onClick={() => handleSendBooking(true)}
              className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Chat Langsung Tanpa Form</span>
            </button>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <b>Garansi Service Serviceku:</b> Untuk setiap perbaikan atau penggantian komponen dengan jenis kerusakan yang sama bergaransi 1 bulan penuh tanpa biaya tambahan.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
