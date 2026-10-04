export type ServiceCategory = 
  | 'AC' 
  | 'Kulkas' 
  | 'Mesin Cuci' 
  | 'Showcase' 
  | 'Freezer Box' 
  | 'Dispenser' 
  | 'Lainnya';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  price: string;
  priceNumber?: number;
  originalPrice?: string;
  description: string;
  features: string[];
  warranty: string;
  imageUrl: string;
  coverageArea: string;
  address: string;
  badge?: string;
  isPopular?: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BannerSlide {
  id: string;
  title: string;
  highlightText: string;
  description: string;
  badgeText: string;
  gradientTheme: 'blue' | 'indigo' | 'amber' | 'emerald' | 'cyan';
  imageUrl?: string;
  ctaText: string;
  ctaTargetWhatsAppText?: string;
  order: number;
  isActive: boolean;
}

export interface BusinessConfig {
  companyName: string;
  tagline: string;
  subtitle: string;
  whatsappNumber: string;
  whatsappRaw: string;
  workshopAddress: string;
  coverageAreas: string[];
  warrantyPeriod: string;
  workingHours: string;
  adminUsername: string;
  adminPassword: string;
}

export interface BookingModalData {
  service: ServiceItem;
  isOpen: boolean;
}
