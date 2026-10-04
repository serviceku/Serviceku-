import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Check, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  Clock
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
  onWhatsAppDirect: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
  onWhatsAppDirect,
}) => {
  // Category color accents
  const categoryBadgeColors: Record<string, string> = {
    'AC': 'bg-sky-100 text-sky-800 border-sky-200',
    'Kulkas': 'bg-blue-100 text-blue-800 border-blue-200',
    'Mesin Cuci': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Showcase': 'bg-teal-100 text-teal-800 border-teal-200',
    'Freezer Box': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'Dispenser': 'bg-amber-100 text-amber-800 border-amber-200',
  };

  const badgeClass = categoryBadgeColors[service.category] || 'bg-slate-100 text-slate-800 border-slate-200';

  return (
    <div 
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Photo Header */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onSelect(service)}>
        <img
          src={service.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
          alt={service.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border backdrop-blur-md shadow-xs ${badgeClass}`}>
            {service.category}
          </span>

          {service.badge && (
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-slate-900" />
              {service.badge}
            </span>
          )}
        </div>

        {/* Bottom Photo Overlay Info */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />
            {service.warranty || 'Garansi 1 Bulan'}
          </span>
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md text-[11px] text-slate-200">
            <Clock className="w-3 h-3 text-sky-300" /> Panggilan Cepat
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Service Title */}
          <h3 
            onClick={() => onSelect(service)}
            className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 cursor-pointer"
            title={service.name}
          >
            {service.name}
          </h3>

          {/* Pricing Row */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-blue-700 tracking-tight">
              {service.price}
            </span>
            {service.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {service.originalPrice}
              </span>
            )}
          </div>

          {/* Short Description */}
          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {service.description}
          </p>

          {/* Feature Checklist */}
          {service.features && service.features.length > 0 && (
            <ul className="mt-3.5 space-y-1.5 border-t border-slate-100 pt-3">
              {service.features.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Card Footer: Location & Action Buttons */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{service.coverageArea}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(service)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/70 text-slate-700 hover:text-blue-700 text-xs font-bold transition-all flex items-center justify-center gap-1"
            >
              <span>Detail Info</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onWhatsAppDirect(service)}
              className="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5"
              title="Chat langsung di WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pesan WA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
