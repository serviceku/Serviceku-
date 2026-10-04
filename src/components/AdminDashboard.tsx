import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  Image as ImageIcon, 
  ShieldCheck, 
  Save, 
  RefreshCw, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Sliders, 
  Phone, 
  MapPin, 
  Clock, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { ServiceItem, BannerSlide, BusinessConfig, ServiceCategory } from '../types';
import { api } from '../services/api';

interface AdminDashboardProps {
  services: ServiceItem[];
  banners: BannerSlide[];
  config: BusinessConfig;
  onRefreshData: () => Promise<void>;
  onClose: () => void;
}

// Preset photo options for quick pick
const PRESET_PHOTOS: { label: string; url: string; category: ServiceCategory }[] = [
  {
    label: 'AC Split Indoor & Outdoor',
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    category: 'AC',
  },
  {
    label: 'Teknisi Cuci / Pasang AC',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    category: 'AC',
  },
  {
    label: 'Isi Freon & Las Pipa AC',
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    category: 'AC',
  },
  {
    label: 'PCB & Komponen Elektronik',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    category: 'AC',
  },
  {
    label: 'Kulkas Side By Side Modern',
    url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    category: 'Kulkas',
  },
  {
    label: 'Kulkas 2 Pintu No-Frost',
    url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    category: 'Kulkas',
  },
  {
    label: 'Mesin Cuci Front Loading',
    url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    category: 'Mesin Cuci',
  },
  {
    label: 'Mesin Cuci Top Loading',
    url: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
    category: 'Mesin Cuci',
  },
  {
    label: 'Showcase Pendingin Minuman',
    url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80',
    category: 'Showcase',
  },
  {
    label: 'Freezer Box Daging / Es',
    url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    category: 'Freezer Box',
  },
  {
    label: 'Dispenser Air Galon',
    url: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80',
    category: 'Dispenser',
  },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  services,
  banners,
  config,
  onRefreshData,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'banners' | 'config' | 'security'>('services');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Service form state
  const [isEditingService, setIsEditingService] = useState(false);
  const [serviceIdToEdit, setServiceIdToEdit] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<{
    name: string;
    category: ServiceCategory;
    price: string;
    originalPrice: string;
    description: string;
    featuresText: string;
    warranty: string;
    imageUrl: string;
    coverageArea: string;
    address: string;
    badge: string;
    isPopular: boolean;
    isActive: boolean;
  }>({
    name: '',
    category: 'AC',
    price: 'Rp 75.000',
    originalPrice: '',
    description: '',
    featuresText: 'Pembersihan mendalam\nCek freon dan arus listrik\nGaransi pengerjaan 1 bulan',
    warranty: '1 Bulan Garansi',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    coverageArea: 'Indramayu, Cirebon, Majalengka',
    address: config.workshopAddress,
    badge: 'Baru',
    isPopular: false,
    isActive: true,
  });

  // Banner form state
  const [isEditingBanner, setIsEditingBanner] = useState(false);
  const [bannerIdToEdit, setBannerIdToEdit] = useState<string | null>(null);
  const [bannerForm, setBannerForm] = useState<{
    title: string;
    highlightText: string;
    description: string;
    badgeText: string;
    gradientTheme: 'blue' | 'indigo' | 'amber' | 'emerald' | 'cyan';
    imageUrl: string;
    ctaText: string;
    ctaTargetWhatsAppText: string;
    isActive: boolean;
  }>({
    title: 'PROMO SERVICE ELEKTRONIK TERBAIK',
    highlightText: 'AC • Kulkas • Mesin Cuci Bergaransi 1 Bulan',
    description: 'Teknisi handal langsung datang ke rumah Anda di Indramayu, Cirebon, Majalengka.',
    badgeText: 'GARANSI SERVICE 1 BULAN',
    gradientTheme: 'blue',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Pesan Teknisi Sekarang',
    ctaTargetWhatsAppText: 'Halo Serviceku, saya ingin memanggil teknisi ke rumah...',
    isActive: true,
  });

  // Business Config state
  const [configForm, setConfigForm] = useState<BusinessConfig>({ ...config });

  // Security credentials state
  const [adminUsername, setAdminUsername] = useState(config.adminUsername);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // File upload input refs
  const serviceFileInputRef = useRef<HTMLInputElement>(null);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4500);
  };

  // Image Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'service' | 'banner') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 12 * 1024 * 1024) {
      showNotification('error', 'Ukuran foto maksimal 12MB. Pilih foto yang lebih kecil.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      try {
        setIsProcessing(true);
        // Save to backend /uploads
        const uploadedUrl = await api.uploadImage(base64Data, file.name);
        if (target === 'service') {
          setServiceForm((prev) => ({ ...prev, imageUrl: uploadedUrl }));
        } else {
          setBannerForm((prev) => ({ ...prev, imageUrl: uploadedUrl }));
        }
        showNotification('success', 'Foto berhasil diunggah dan siap ditampilkan langsung!');
      } catch (err) {
        showNotification('error', 'Gagal mengunggah foto.');
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Service Save
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.name.trim() || !serviceForm.price.trim()) {
      showNotification('error', 'Nama jasa dan harga wajib diisi!');
      return;
    }

    setIsProcessing(true);
    try {
      const featuresArray = serviceForm.featuresText
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const payload: Partial<ServiceItem> = {
        name: serviceForm.name.trim(),
        category: serviceForm.category,
        price: serviceForm.price.trim(),
        originalPrice: serviceForm.originalPrice.trim() || undefined,
        description: serviceForm.description.trim(),
        features: featuresArray,
        warranty: serviceForm.warranty.trim() || '1 Bulan Garansi',
        imageUrl: serviceForm.imageUrl.trim(),
        coverageArea: serviceForm.coverageArea.trim() || config.coverageAreas.join(', '),
        address: serviceForm.address.trim() || config.workshopAddress,
        badge: serviceForm.badge.trim() || undefined,
        isPopular: serviceForm.isPopular,
        isActive: serviceForm.isActive,
      };

      if (isEditingService && serviceIdToEdit) {
        await api.updateService(serviceIdToEdit, payload);
        showNotification('success', `Jasa "${payload.name}" berhasil diperbarui secara permanen!`);
      } else {
        await api.createService(payload);
        showNotification('success', `Jasa baru "${payload.name}" berhasil dipublikasikan secara permanen!`);
      }

      await onRefreshData();
      resetServiceForm();
    } catch {
      showNotification('error', 'Terjadi kesalahan saat menyimpan data jasa.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditServiceClick = (item: ServiceItem) => {
    setIsEditingService(true);
    setServiceIdToEdit(item.id);
    setServiceForm({
      name: item.name,
      category: item.category,
      price: item.price,
      originalPrice: item.originalPrice || '',
      description: item.description,
      featuresText: item.features ? item.features.join('\n') : '',
      warranty: item.warranty,
      imageUrl: item.imageUrl,
      coverageArea: item.coverageArea,
      address: item.address,
      badge: item.badge || '',
      isPopular: item.isPopular ?? false,
      isActive: item.isActive,
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteService = async (item: ServiceItem) => {
    if (!window.confirm(`Hapus jasa "${item.name}" dari katalog website?`)) return;

    setIsProcessing(true);
    try {
      await api.deleteService(item.id);
      await onRefreshData();
      showNotification('success', `Jasa "${item.name}" berhasil dihapus.`);
    } catch {
      showNotification('error', 'Gagal menghapus jasa.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetServiceForm = () => {
    setIsEditingService(false);
    setServiceIdToEdit(null);
    setServiceForm({
      name: '',
      category: 'AC',
      price: 'Rp 75.000',
      originalPrice: '',
      description: '',
      featuresText: 'Pembersihan mendalam unit\nCek tekanan freon & arus listrik\nGaransi pengerjaan 1 bulan',
      warranty: '1 Bulan Garansi',
      imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      coverageArea: 'Indramayu, Cirebon, Majalengka',
      address: config.workshopAddress,
      badge: '',
      isPopular: false,
      isActive: true,
    });
  };

  // Banner Save
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerForm.title.trim()) {
      showNotification('error', 'Judul banner wajib diisi!');
      return;
    }

    setIsProcessing(true);
    try {
      const payload: Partial<BannerSlide> = {
        title: bannerForm.title.trim(),
        highlightText: bannerForm.highlightText.trim(),
        description: bannerForm.description.trim(),
        badgeText: bannerForm.badgeText.trim(),
        gradientTheme: bannerForm.gradientTheme,
        imageUrl: bannerForm.imageUrl.trim(),
        ctaText: bannerForm.ctaText.trim(),
        ctaTargetWhatsAppText: bannerForm.ctaTargetWhatsAppText.trim(),
        isActive: bannerForm.isActive,
      };

      if (isEditingBanner && bannerIdToEdit) {
        await api.updateBanner(bannerIdToEdit, payload);
        showNotification('success', 'Banner infografis berhasil diperbarui!');
      } else {
        await api.createBanner({ ...payload, order: banners.length + 1 });
        showNotification('success', 'Banner baru berhasil ditambahkan ke slideshow!');
      }

      await onRefreshData();
      resetBannerForm();
    } catch {
      showNotification('error', 'Gagal menyimpan slide banner.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditBannerClick = (b: BannerSlide) => {
    setIsEditingBanner(true);
    setBannerIdToEdit(b.id);
    setBannerForm({
      title: b.title,
      highlightText: b.highlightText,
      description: b.description,
      badgeText: b.badgeText,
      gradientTheme: b.gradientTheme,
      imageUrl: b.imageUrl || '',
      ctaText: b.ctaText,
      ctaTargetWhatsAppText: b.ctaTargetWhatsAppText || '',
      isActive: b.isActive,
    });
  };

  const handleDeleteBanner = async (b: BannerSlide) => {
    if (banners.length <= 1) {
      showNotification('error', 'Minimal harus tersisa 1 banner slideshow!');
      return;
    }
    if (!window.confirm(`Hapus slide banner "${b.title}"?`)) return;

    setIsProcessing(true);
    try {
      await api.deleteBanner(b.id);
      await onRefreshData();
      showNotification('success', 'Banner berhasil dihapus dari slideshow.');
    } catch {
      showNotification('error', 'Gagal menghapus banner.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetBannerForm = () => {
    setIsEditingBanner(false);
    setBannerIdToEdit(null);
    setBannerForm({
      title: '',
      highlightText: '',
      description: '',
      badgeText: 'GARANSI SERVICE 1 BULAN',
      gradientTheme: 'blue',
      imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      ctaText: 'Hubungi WhatsApp Sekarang',
      ctaTargetWhatsAppText: 'Halo Serviceku...',
      isActive: true,
    });
  };

  // Save Business Config
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await api.updateConfig(configForm);
      await onRefreshData();
      showNotification('success', 'Informasi bisnis & kontak workshop berhasil diperbarui!');
    } catch {
      showNotification('error', 'Gagal memperbarui konfigurasi bisnis.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Save Admin Credentials
  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUsername.trim()) {
      showNotification('error', 'Username tidak boleh kosong!');
      return;
    }

    setIsProcessing(true);
    try {
      const updates: Partial<BusinessConfig> = {
        adminUsername: adminUsername.trim(),
      };
      if (newPassword.trim()) {
        updates.adminPassword = newPassword.trim();
      }

      await api.updateConfig(updates);
      await onRefreshData();
      setNewPassword('');
      showNotification('success', 'Username & password admin berhasil diperbarui!');
    } catch {
      showNotification('error', 'Gagal memperbarui akun keamanan admin.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset to default seed
  const handleResetToDefaults = async () => {
    if (!window.confirm('PERINGATAN: Kembalikan semua data jasa dan banner ke data brosur awal resmi Serviceku?')) return;
    setIsProcessing(true);
    try {
      await api.resetToDefaults();
      await onRefreshData();
      showNotification('success', 'Semua data telah dikembalikan ke standar awal brosur Serviceku.');
    } catch {
      showNotification('error', 'Gagal mereset data.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Mode Admin Aktif
              </span>
              <span className="text-xs text-blue-200">Perubahan tersimpan permanen untuk semua pengunjung</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Dashboard Admin Serviceku
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Publikasikan nama jasa, harga, deskripsi, foto elektronik, dan kelola slideshow banner.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-blue-900 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4 text-blue-600" />
              <span>Lihat Website</span>
            </button>
            <button
              onClick={handleResetToDefaults}
              className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs transition-all flex items-center gap-1"
              title="Reset ke data brosur awal"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Brosur</span>
            </button>
          </div>
        </div>

        {/* Status Toast Alert */}
        {statusMessage && (
          <div 
            className={`p-4 rounded-2xl flex items-center justify-between text-sm font-semibold shadow-md animate-in slide-in-from-top-2 ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' 
                : 'bg-rose-50 border border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {statusMessage.type === 'success' ? (
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button 
              onClick={() => setStatusMessage(null)} 
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'services'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Kelola Jasa Service ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('banners')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'banners'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Banner Slideshow ({banners.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'config'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Kontak & Workshop</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'security'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Akun & Password Admin</span>
          </button>
        </div>

        {/* ===================== TAB 1: KELOLA JASA SERVICE ===================== */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            
            {/* Form Tambah / Edit Jasa */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    {isEditingService ? <Edit3 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-emerald-600" />}
                    {isEditingService ? 'Edit Jasa Service' : 'Tambah & Publikasikan Jasa Service Baru'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Masukkan nama jasa, tarif, deskripsi, foto langsung, dan alamat layanan.
                  </p>
                </div>

                {isEditingService && (
                  <button
                    onClick={resetServiceForm}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
                  >
                    Batal Edit (Buat Baru)
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveService} className="space-y-6">
                
                {/* Row 1: Nama, Kategori, Harga */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nama Jasa Service <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={serviceForm.name}
                      onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                      placeholder="Contoh: Cuci AC Berkala, Ganti Kompresor..."
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Kategori Elektronik
                    </label>
                    <select
                      value={serviceForm.category}
                      onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value as ServiceCategory })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    >
                      <option value="AC">AC (Air Conditioner)</option>
                      <option value="Kulkas">Kulkas (1 Pintu / 2 Pintu / Side by Side)</option>
                      <option value="Mesin Cuci">Mesin Cuci (Front / Top Loading)</option>
                      <option value="Showcase">Showcase Chiller Minuman</option>
                      <option value="Freezer Box">Freezer Box</option>
                      <option value="Dispenser">Dispenser Air Galon</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Harga (Rp) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceForm.price}
                        onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                        placeholder="Contoh: Rp 75.000"
                        className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none font-bold text-blue-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Harga Coret (Opsional)
                      </label>
                      <input
                        type="text"
                        value={serviceForm.originalPrice}
                        onChange={(e) => setServiceForm({ ...serviceForm, originalPrice: e.target.value })}
                        placeholder="Contoh: Rp 100.000"
                        className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Foto Jasa (Direct Upload & Live Preview) */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-blue-600" />
                        Foto Jasa Elektronik (Langsung Tampil di Kartu Katalog)
                      </label>
                      <p className="text-xs text-slate-500">
                        Unggah foto dari HP/Laptop, pilih dari galeri elektronik, atau masukkan URL foto.
                      </p>
                    </div>

                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Live Preview
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    
                    {/* Live Preview Box */}
                    <div className="md:col-span-4 flex flex-col items-center">
                      <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border-2 border-dashed border-blue-300 bg-white shadow-xs group">
                        {serviceForm.imageUrl ? (
                          <img
                            src={serviceForm.imageUrl}
                            alt="Preview Jasa"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                            <ImageIcon className="w-8 h-8 mb-1" />
                            <span className="text-xs font-medium">Belum ada foto terpilih</span>
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded text-center truncate">
                          Tampilan Foto di Katalog
                        </div>
                      </div>
                    </div>

                    {/* Upload Controls */}
                    <div className="md:col-span-8 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {/* Hidden file input */}
                        <input
                          type="file"
                          ref={serviceFileInputRef}
                          onChange={(e) => handleFileUpload(e, 'service')}
                          accept="image/*"
                          className="hidden"
                        />
                        
                        <button
                          type="button"
                          onClick={() => serviceFileInputRef.current?.click()}
                          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Pilih & Unggah Foto dari Perangkat</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const match = PRESET_PHOTOS.find((p) => p.category === serviceForm.category);
                            if (match) setServiceForm({ ...serviceForm, imageUrl: match.url });
                          }}
                          className="px-3.5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-xl transition-all"
                        >
                          Gunakan Foto Rekomendasi Kategori
                        </button>
                      </div>

                      {/* Direct URL input */}
                      <div>
                        <input
                          type="url"
                          value={serviceForm.imageUrl}
                          onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                          placeholder="Atau tempel URL gambar (https://...)"
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-slate-700"
                        />
                      </div>

                      {/* Quick preset thumbnail pills */}
                      <div>
                        <p className="text-[11px] font-semibold text-slate-500 mb-1.5">
                          Atau klik foto cepat di bawah:
                        </p>
                        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-white rounded-xl border border-slate-200">
                          {PRESET_PHOTOS.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setServiceForm({ ...serviceForm, imageUrl: preset.url })}
                              className={`text-[10px] px-2 py-1 rounded-md border flex items-center gap-1 transition-all ${
                                serviceForm.imageUrl === preset.url
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              <span>{preset.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Row 3: Deskripsi & Fitur */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Deskripsi Jasa Service
                    </label>
                    <textarea
                      rows={4}
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      placeholder="Jelaskan proses pengerjaan, masalah yang diatasi, dsb..."
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Poin Keunggulan / Checklist Pengerjaan (1 Baris = 1 Poin)
                    </label>
                    <textarea
                      rows={4}
                      value={serviceForm.featuresText}
                      onChange={(e) => setServiceForm({ ...serviceForm, featuresText: e.target.value })}
                      placeholder="Contoh:&#10;Cuci evaporator & kondensor&#10;Cek tekanan freon&#10;Garansi 1 bulan"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none resize-none font-mono"
                    />
                  </div>
                </div>

                {/* Row 4: Garansi, Alamat & Area Layanan, Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Masa Garansi
                    </label>
                    <input
                      type="text"
                      value={serviceForm.warranty}
                      onChange={(e) => setServiceForm({ ...serviceForm, warranty: e.target.value })}
                      placeholder="Contoh: 1 Bulan Garansi"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Area Layanan
                    </label>
                    <input
                      type="text"
                      value={serviceForm.coverageArea}
                      onChange={(e) => setServiceForm({ ...serviceForm, coverageArea: e.target.value })}
                      placeholder="Contoh: Indramayu, Cirebon, Majalengka"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Alamat / Workshop
                    </label>
                    <input
                      type="text"
                      value={serviceForm.address}
                      onChange={(e) => setServiceForm({ ...serviceForm, address: e.target.value })}
                      placeholder="Contoh: Jl. by pass Binaria-bondan"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Label Badge (Opsional)
                    </label>
                    <input
                      type="text"
                      value={serviceForm.badge}
                      onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                      placeholder="Contoh: Promo Cuci 75rb, Paling Laris"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                </div>

                {/* Toggles & Submit */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={serviceForm.isActive}
                        onChange={(e) => setServiceForm({ ...serviceForm, isActive: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Status Aktif (Ditampilkan ke Pengunjung)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={serviceForm.isPopular}
                        onChange={(e) => setServiceForm({ ...serviceForm, isPopular: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Tandai Sebagai Layanan Populer</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {isEditingService && (
                      <button
                        type="button"
                        onClick={resetServiceForm}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                      >
                        Batal
                      </button>
                    )}

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isEditingService ? 'Simpan Perubahan Jasa' : 'Publikasikan Jasa Permanen'}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* List Jasa yang Terdaftar */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Daftar Katalog Jasa yang Sedang Aktif ({services.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Semua jasa di bawah tersimpan secara permanen dan otomatis tampil di halaman beranda.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-black uppercase text-slate-400">
                      <th className="py-3 px-3">Foto</th>
                      <th className="py-3 px-3">Nama Jasa</th>
                      <th className="py-3 px-3">Kategori</th>
                      <th className="py-3 px-3">Harga</th>
                      <th className="py-3 px-3">Garansi</th>
                      <th className="py-3 px-3">Area</th>
                      <th className="py-3 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {services.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-12 h-10 object-cover rounded-lg border border-slate-200"
                          />
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="font-bold text-slate-900 block">{item.name}</span>
                          {item.badge && (
                            <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded font-semibold inline-block mt-0.5">
                              {item.badge}
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[11px]">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-extrabold text-blue-700">
                          {item.price}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">
                          {item.warranty}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 max-w-[140px] truncate">
                          {item.coverageArea}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleEditServiceClick(item)}
                              className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                              title="Edit Jasa"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteService(item)}
                              className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                              title="Hapus Jasa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 2: KELOLA BANNER SLIDESHOW ===================== */}
        {activeTab === 'banners' && (
          <div className="space-y-6">
            
            {/* Form Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    {isEditingBanner ? 'Edit Banner Slideshow' : 'Tambah Banner Infografis Baru'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Banner slideshow di bagian atas dengan tampilan gradasi dan info promo Serviceku.
                  </p>
                </div>

                {isEditingBanner && (
                  <button
                    onClick={resetBannerForm}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
                  >
                    Batal Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveBanner} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Judul Banner Utama <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bannerForm.title}
                      onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                      placeholder="Contoh: PROMO CUCI AC CUMA RP 75.000"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Teks Sorotan (Sub-judul)
                    </label>
                    <input
                      type="text"
                      value={bannerForm.highlightText}
                      onChange={(e) => setBannerForm({ ...bannerForm, highlightText: e.target.value })}
                      placeholder="Contoh: Dingin Maksimal & Bergaransi 1 Bulan"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Teks Badge Atas
                    </label>
                    <input
                      type="text"
                      value={bannerForm.badgeText}
                      onChange={(e) => setBannerForm({ ...bannerForm, badgeText: e.target.value })}
                      placeholder="GARANSI 1 BULAN"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Tema Gradasi Warna
                    </label>
                    <select
                      value={bannerForm.gradientTheme}
                      onChange={(e) => setBannerForm({ ...bannerForm, gradientTheme: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    >
                      <option value="blue">Biru Elektrik (Royal Blue Gradient)</option>
                      <option value="cyan">Cyan Aqua (Pendingin & Freon)</option>
                      <option value="indigo">Indigo Malam (Premium Navy)</option>
                      <option value="amber">Emas & Amber (Promo Spesial)</option>
                      <option value="emerald">Hijau Emerald (Cepat & Handal)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Teks Tombol CTA
                    </label>
                    <input
                      type="text"
                      value={bannerForm.ctaText}
                      onChange={(e) => setBannerForm({ ...bannerForm, ctaText: e.target.value })}
                      placeholder="Hubungi WA Sekarang"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Deskripsi Singkat Banner
                  </label>
                  <textarea
                    rows={2}
                    value={bannerForm.description}
                    onChange={(e) => setBannerForm({ ...bannerForm, description: e.target.value })}
                    placeholder="Tuliskan keterangan promosi atau cakupan jasa..."
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none resize-none"
                  />
                </div>

                {/* Banner Photo Upload */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Foto / Gambar Ilustrasi Banner
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={bannerFileInputRef}
                      onChange={(e) => handleFileUpload(e, 'banner')}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => bannerFileInputRef.current?.click()}
                      className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Foto</span>
                    </button>
                    <input
                      type="url"
                      value={bannerForm.imageUrl}
                      onChange={(e) => setBannerForm({ ...bannerForm, imageUrl: e.target.value })}
                      placeholder="Atau URL foto..."
                      className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 text-white font-bold text-xs sm:text-sm shadow-md"
                  >
                    {isEditingBanner ? 'Simpan Slide Banner' : 'Tambahkan ke Slideshow'}
                  </button>
                </div>
              </form>
            </div>

            {/* List Banner Slides */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banners.map((b, idx) => (
                <div key={b.id} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        Slide #{idx + 1} • {b.gradientTheme}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-600">
                        {b.isActive ? 'Aktif' : 'Non-aktif'}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm line-clamp-1">{b.title}</h4>
                    <p className="text-xs text-amber-700 font-semibold line-clamp-1">{b.highlightText}</p>
                    <p className="text-xs text-slate-500 line-clamp-2">{b.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400">Tombol: {b.ctaText}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditBannerClick(b)}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        title="Edit Banner"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(b)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                        title="Hapus Banner"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ===================== TAB 3: KONTAK & WORKSHOP ===================== */}
        {activeTab === 'config' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-900 mb-1">
              Informasi Kontak & Workshop Serviceku
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Pengaturan nomor WhatsApp tujuan pesanan, alamat workshop, dan area layanan panggilan.
            </p>

            <form onSubmit={handleSaveConfig} className="space-y-4 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama Usaha Jasa
                  </label>
                  <input
                    type="text"
                    value={configForm.companyName}
                    onChange={(e) => setConfigForm({ ...configForm, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Tagline Resmi
                  </label>
                  <input
                    type="text"
                    value={configForm.tagline}
                    onChange={(e) => setConfigForm({ ...configForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    Nomor WhatsApp Tampilan
                  </label>
                  <input
                    type="text"
                    value={configForm.whatsappNumber}
                    onChange={(e) => setConfigForm({ ...configForm, whatsappNumber: e.target.value })}
                    placeholder="+62 878-7441-7978"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    Nomor WhatsApp Link (Angka Saja)
                  </label>
                  <input
                    type="text"
                    value={configForm.whatsappRaw}
                    onChange={(e) => setConfigForm({ ...configForm, whatsappRaw: e.target.value })}
                    placeholder="6287874417978"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-mono text-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  Alamat Lengkap Workshop
                </label>
                <input
                  type="text"
                  value={configForm.workshopAddress}
                  onChange={(e) => setConfigForm({ ...configForm, workshopAddress: e.target.value })}
                  placeholder="Jl. by pass Binaria-bondan"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Ketentuan Garansi
                  </label>
                  <input
                    type="text"
                    value={configForm.warrantyPeriod}
                    onChange={(e) => setConfigForm({ ...configForm, warrantyPeriod: e.target.value })}
                    placeholder="Garansi Service 1 Bulan untuk Kerusakan yang Sama"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    Jam Operasional / Panggilan
                  </label>
                  <input
                    type="text"
                    value={configForm.workingHours}
                    onChange={(e) => setConfigForm({ ...configForm, workingHours: e.target.value })}
                    placeholder="Setiap Hari 07.30 - 21.00 WIB"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md"
                >
                  Simpan Kontak & Workshop
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ===================== TAB 4: KEAMANAN & PASSWORD ADMIN ===================== */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm max-w-2xl">
            <h2 className="text-xl font-extrabold text-slate-900 mb-1">
              Pengaturan Akun & Password Admin
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Ubah username login dan kata sandi admin dengan aman.
            </p>

            <form onSubmit={handleSaveSecurity} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Username Login Admin
                </label>
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Kata Sandi Baru
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPassword ? 'Sembunyikan' : 'Lihat Sandi'}</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Kosongkan jika tidak ingin mengubah password"
                    className="w-full pr-10 px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  Kredensial default: Username <b>admin</b> / Password <b>serviceku123</b>. Simpan kredensial baru Anda di tempat aman.
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md"
                >
                  Perbarui Kredensial Admin
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
