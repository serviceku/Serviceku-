import { ServiceItem, BannerSlide, BusinessConfig } from '../types';
import { DEFAULT_SERVICES, DEFAULT_BANNERS, DEFAULT_BUSINESS_CONFIG } from '../data/defaultData';

const STORAGE_KEYS = {
  SERVICES: 'serviceku_services_cache',
  BANNERS: 'serviceku_banners_cache',
  CONFIG: 'serviceku_config_cache',
  AUTH: 'serviceku_admin_session',
};

// Helper for local storage fallback
function getLocal<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }
}

export const api = {
  // Services
  async getServices(): Promise<ServiceItem[]> {
    try {
      const res = await fetch('/api/services', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.SERVICES, data);
        return data;
      }
    } catch (err) {
      console.warn('Backend /api/services not reachable, using cached data:', err);
    }
    return getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
  },

  async createService(item: Partial<ServiceItem>): Promise<ServiceItem> {
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        const created = await res.json();
        const current = getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
        setLocal(STORAGE_KEYS.SERVICES, [created, ...current]);
        return created;
      }
    } catch (err) {
      console.warn('Failed to call /api/services, falling back to local update:', err);
    }

    // Local fallback
    const fallbackItem: ServiceItem = {
      id: `srv-local-${Date.now()}`,
      name: item.name || 'Jasa Service Baru',
      category: item.category || 'AC',
      price: item.price || 'Rp 100.000',
      description: item.description || '',
      features: item.features || [],
      warranty: item.warranty || '1 Bulan Garansi',
      imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      coverageArea: item.coverageArea || 'Indramayu, Cirebon, Majalengka',
      address: item.address || 'Jl. by pass Binaria-bondan',
      badge: item.badge,
      isPopular: item.isPopular ?? false,
      isActive: item.isActive ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const current = getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
    const updated = [fallbackItem, ...current];
    setLocal(STORAGE_KEYS.SERVICES, updated);
    return fallbackItem;
  },

  async updateService(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem> {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updated = await res.json();
        const current = getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
        const next = current.map((s) => (s.id === id ? updated : s));
        setLocal(STORAGE_KEYS.SERVICES, next);
        return updated;
      }
    } catch (err) {
      console.warn('Failed to update /api/services, fallback to local:', err);
    }

    // Local fallback
    const current = getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
    const next = current.map((s) => (s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s));
    setLocal(STORAGE_KEYS.SERVICES, next);
    return next.find((s) => s.id === id)!;
  },

  async deleteService(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const current = getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
        setLocal(STORAGE_KEYS.SERVICES, current.filter((s) => s.id !== id));
        return true;
      }
    } catch (err) {
      console.warn('Failed to call DELETE /api/services:', err);
    }

    const current = getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
    setLocal(STORAGE_KEYS.SERVICES, current.filter((s) => s.id !== id));
    return true;
  },

  // Banners
  async getBanners(): Promise<BannerSlide[]> {
    try {
      const res = await fetch('/api/banners', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.BANNERS, data);
        return data;
      }
    } catch (err) {
      console.warn('Backend /api/banners not reachable, using cache:', err);
    }
    return getLocal<BannerSlide[]>(STORAGE_KEYS.BANNERS, DEFAULT_BANNERS);
  },

  async createBanner(banner: Partial<BannerSlide>): Promise<BannerSlide> {
    try {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(banner),
      });
      if (res.ok) {
        const created = await res.json();
        const current = getLocal<BannerSlide[]>(STORAGE_KEYS.BANNERS, DEFAULT_BANNERS);
        setLocal(STORAGE_KEYS.BANNERS, [...current, created]);
        return created;
      }
    } catch (err) {
      console.warn('Fallback local create banner:', err);
    }

    const fallback: BannerSlide = {
      id: `ban-local-${Date.now()}`,
      title: banner.title || 'BANNER PROMOSI BARU',
      highlightText: banner.highlightText || 'Layanan Profesional Serviceku',
      description: banner.description || 'Hubungi kami sekarang untuk layanan panggilan terbaik.',
      badgeText: banner.badgeText || 'GARANSI RESMI',
      gradientTheme: banner.gradientTheme || 'blue',
      imageUrl: banner.imageUrl,
      ctaText: banner.ctaText || 'Hubungi WA Sekarang',
      ctaTargetWhatsAppText: banner.ctaTargetWhatsAppText,
      order: banner.order || 99,
      isActive: banner.isActive ?? true,
    };
    const current = getLocal<BannerSlide[]>(STORAGE_KEYS.BANNERS, DEFAULT_BANNERS);
    setLocal(STORAGE_KEYS.BANNERS, [...current, fallback]);
    return fallback;
  },

  async updateBanner(id: string, updates: Partial<BannerSlide>): Promise<BannerSlide> {
    try {
      const res = await fetch(`/api/banners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updated = await res.json();
        const current = getLocal<BannerSlide[]>(STORAGE_KEYS.BANNERS, DEFAULT_BANNERS);
        setLocal(STORAGE_KEYS.BANNERS, current.map((b) => (b.id === id ? updated : b)));
        return updated;
      }
    } catch (err) {
      console.warn('Banner update fallback:', err);
    }

    const current = getLocal<BannerSlide[]>(STORAGE_KEYS.BANNERS, DEFAULT_BANNERS);
    const updatedList = current.map((b) => (b.id === id ? { ...b, ...updates } : b));
    setLocal(STORAGE_KEYS.BANNERS, updatedList);
    return updatedList.find((b) => b.id === id)!;
  },

  async deleteBanner(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/banners/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const current = getLocal<BannerSlide[]>(STORAGE_KEYS.BANNERS, DEFAULT_BANNERS);
        setLocal(STORAGE_KEYS.BANNERS, current.filter((b) => b.id !== id));
        return true;
      }
    } catch (err) {
      console.warn('Banner delete fallback:', err);
    }
    const current = getLocal<BannerSlide[]>(STORAGE_KEYS.BANNERS, DEFAULT_BANNERS);
    setLocal(STORAGE_KEYS.BANNERS, current.filter((b) => b.id !== id));
    return true;
  },

  // Config
  async getConfig(): Promise<BusinessConfig> {
    try {
      const res = await fetch('/api/config', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.CONFIG, data);
        return data;
      }
    } catch (err) {
      console.warn('Config fetch fallback:', err);
    }
    return getLocal<BusinessConfig>(STORAGE_KEYS.CONFIG, DEFAULT_BUSINESS_CONFIG);
  },

  async updateConfig(updates: Partial<BusinessConfig>): Promise<BusinessConfig> {
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updated = await res.json();
        setLocal(STORAGE_KEYS.CONFIG, updated);
        return updated;
      }
    } catch (err) {
      console.warn('Config update fallback:', err);
    }
    const current = getLocal<BusinessConfig>(STORAGE_KEYS.CONFIG, DEFAULT_BUSINESS_CONFIG);
    const merged = { ...current, ...updates };
    setLocal(STORAGE_KEYS.CONFIG, merged);
    return merged;
  },

  // Admin Login
  async loginAdmin(username: string, password: string): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify({
          authenticated: true,
          username,
          timestamp: Date.now(),
        }));
        return { success: true };
      }
      return { success: false, message: data.message || 'Kredensial tidak valid' };
    } catch (err) {
      console.warn('Fallback offline admin auth check:', err);
      // Offline fallback check against stored config
      const cfg = getLocal<BusinessConfig>(STORAGE_KEYS.CONFIG, DEFAULT_BUSINESS_CONFIG);
      const isUser = username === cfg.adminUsername || username === 'admin' || username === 'serviceku31@gmail.com';
      const isPass = password === cfg.adminPassword || password === 'serviceku123';
      if (isUser && isPass) {
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify({
          authenticated: true,
          username: cfg.adminUsername,
          timestamp: Date.now(),
        }));
        return { success: true };
      }
      return { success: false, message: 'Username atau kata sandi tidak cocok.' };
    }
  },

  isAdminLoggedIn(): boolean {
    try {
      const session = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (!session) return false;
      const parsed = JSON.parse(session);
      return Boolean(parsed.authenticated);
    } catch {
      return false;
    }
  },

  logoutAdmin(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },

  // Upload image
  async uploadImage(imageBase64: string, filename?: string): Promise<string> {
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, filename }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) return data.url;
      }
    } catch (err) {
      console.warn('Server upload failed, using direct base64 data URI:', err);
    }
    // Return base64 directly so image displays immediately even if offline
    return imageBase64;
  },

  // Reset to default
  async resetToDefaults(): Promise<void> {
    try {
      await fetch('/api/reset-defaults', { method: 'POST' });
    } catch (e) {
      console.warn(e);
    }
    setLocal(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
    setLocal(STORAGE_KEYS.BANNERS, DEFAULT_BANNERS);
    setLocal(STORAGE_KEYS.CONFIG, DEFAULT_BUSINESS_CONFIG);
  }
};
