import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';
import { PRODUCTS_DATA } from '@/data/productsData';
import { AdminUser, SiteConfig, Coupon, AdminOrder } from '@/types/admin';

interface AdminStore {
  // Auth state
  isAuthenticated: boolean;
  user: AdminUser | null;
  adminCredentials: {
    username: string;
    passwordHash: string; // Plain/SHA representation for local CMS
    email: string;
  };
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateCredentials: (newUsername: string, newPassword?: string, newEmail?: string) => boolean;

  // Products state (CMS)
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

  // Site Config state
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;

  // Coupons state
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  toggleCoupon: (code: string) => void;
  deleteCoupon: (code: string) => void;

  // Orders state
  orders: AdminOrder[];
  addOrder: (order: AdminOrder) => void;
  updateOrderStatus: (orderId: string, status: AdminOrder['status']) => void;
}

const DEFAULT_CONFIG: SiteConfig = {
  siteTitle: 'Bless Personalizados | Estúdio de Sublimação HD & Gravação a Laser',
  phoneWhatsapp: '5511914317959',
  phoneDisplay: '(11) 91431-7959',
  supportEmail: 'contato@blesspersonalizados.com.br',
  pixKey: '5511914317959',
  pixKeyType: 'phone',
  freeShippingThreshold: 299,
  heroBadge: 'Estúdio de Sublimação Ultra HD & Gravação a Laser',
  heroHeadline: 'Transforme ideias em produtos inesquecíveis com acabamento eterno.',
  heroSubheadline: 'Copos e garrafas térmicas com gravação a laser permanente, canecas fotográficas em Sublimação HD e brindes corporativos de alto padrão. Crie sua prévia digital em tempo real no nosso personalizador exclusivo.',
  productionTimeDays: '1 a 3 dias úteis',
  announcementBar: {
    enabled: true,
    text: '🚀 Frete Grátis para todo o Brasil em pedidos acima de R$ 299 | Atacado com até 35% OFF',
  },
};

const DEFAULT_COUPONS: Coupon[] = [
  { code: 'BLESS10', discountPercentage: 10, active: true },
  { code: 'PRIMEIRACOMPRA', discountPercentage: 15, active: true },
  { code: 'ATACADO15', discountPercentage: 15, active: true, minOrderValue: 500 },
];

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'BLS-9841',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    customerName: 'Rodrigo Medeiros',
    customerPhone: '(11) 98765-4321',
    customerEmail: 'rodrigo@empresa.com.br',
    total: 395.0,
    status: 'in_production',
    paymentMethod: 'pix',
    itemsSummary: '5x Copo Térmico Inox 473ml (Gravação a Laser)',
    shippingAddress: 'Av. Paulista, 1000 - Bela Vista, São Paulo/SP',
  },
  {
    id: 'BLS-9840',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    customerName: 'Camila Vasconcelos',
    customerPhone: '(11) 97123-8899',
    customerEmail: 'camila.v@gmail.com',
    total: 149.8,
    status: 'paid',
    paymentMethod: 'credit_card',
    itemsSummary: '2x Caneca Cerâmica Premium 325ml (Sublimação HD)',
    shippingAddress: 'Rua das Flores, 450 - Moema, São Paulo/SP',
  },
];

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      // Auth Initial State
      isAuthenticated: false,
      user: null,
      adminCredentials: {
        username: 'admin',
        passwordHash: 'bless2026', // Initial password
        email: 'marcio@bless.com.br',
      },

      login: (username, password) => {
        const { adminCredentials } = get();
        if (
          username.trim().toLowerCase() === adminCredentials.username.toLowerCase() &&
          password.trim() === adminCredentials.passwordHash
        ) {
          const user: AdminUser = {
            username: adminCredentials.username,
            name: 'Administrador Bless',
            email: adminCredentials.email,
            role: 'admin',
          };
          set({ isAuthenticated: true, user });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },

      updateCredentials: (newUsername, newPassword, newEmail) => {
        const { adminCredentials } = get();
        const updated = {
          username: newUsername.trim() || adminCredentials.username,
          passwordHash: newPassword?.trim() ? newPassword.trim() : adminCredentials.passwordHash,
          email: newEmail?.trim() || adminCredentials.email,
        };
        set({
          adminCredentials: updated,
          user: get().user ? { ...get().user!, username: updated.username, email: updated.email } : null,
        });
        return true;
      },

      // Products CMS
      products: PRODUCTS_DATA,

      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: `prod-${Date.now()}`,
        };
        set((state) => ({
          products: [newProduct, ...state.products],
        }));
      },

      updateProduct: (id, updatedFields) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      resetProductsToDefault: () => {
        set({ products: PRODUCTS_DATA });
      },

      // Site Config
      config: DEFAULT_CONFIG,

      updateConfig: (newConfig) => {
        set((state) => ({
          config: { ...state.config, ...newConfig },
        }));
      },

      // Coupons
      coupons: DEFAULT_COUPONS,

      addCoupon: (coupon) => {
        set((state) => ({
          coupons: [coupon, ...state.coupons.filter((c) => c.code !== coupon.code)],
        }));
      },

      toggleCoupon: (code) => {
        set((state) => ({
          coupons: state.coupons.map((c) => (c.code === code ? { ...c, active: !c.active } : c)),
        }));
      },

      deleteCoupon: (code) => {
        set((state) => ({
          coupons: state.coupons.filter((c) => c.code !== code),
        }));
      },

      // Orders
      orders: INITIAL_ORDERS,

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        }));
      },
    }),
    {
      name: 'bless_admin_cms_storage',
    }
  )
);
