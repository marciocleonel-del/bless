import { Product } from './index';

export interface AdminUser {
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}

export interface SiteConfig {
  siteTitle: string;
  phoneWhatsapp: string;
  phoneDisplay: string;
  supportEmail: string;
  pixKey: string;
  pixKeyType: 'cnpj' | 'cpf' | 'email' | 'phone' | 'random';
  freeShippingThreshold: number;
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  productionTimeDays: string;
  announcementBar: {
    enabled: boolean;
    text: string;
  };
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  active: boolean;
  minOrderValue?: number;
}

export interface AdminOrder {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  total: number;
  status: 'pending' | 'paid' | 'in_production' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'pix' | 'credit_card' | 'boleto' | 'whatsapp';
  itemsSummary: string;
  customArtUrl?: string;
  shippingAddress: string;
}
