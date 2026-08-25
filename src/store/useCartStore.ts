import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product, CustomizationDetails } from '@/types';
import { calculateProductPrice } from '@/utils/formatters';

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  appliedCoupon: string | null;
  couponDiscountPercent: number;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (product: Product, customization: CustomizationDetails) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDiscountTotal: () => number;
  getFinalTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      appliedCoupon: null,
      couponDiscountPercent: 0,

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      addItem: (product, customization) => {
        const items = get().items;
        const itemId = `${product.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        
        const priceInfo = calculateProductPrice(
          product.basePrice,
          customization.quantity,
          product.priceTiers,
          customization.isTwoSided
        );

        const newItem: CartItem = {
          id: itemId,
          product,
          customization,
          quantity: customization.quantity,
          unitPrice: priceInfo.unitFinalPrice,
          subtotal: priceInfo.unitOriginalPrice * customization.quantity,
          discountPercent: priceInfo.discountPercent,
          finalTotal: priceInfo.subtotal,
          createdAt: new Date().toISOString(),
        };

        set({
          items: [...items, newItem],
          isDrawerOpen: true,
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, newQuantity) => {
        if (newQuantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === itemId) {
              const priceInfo = calculateProductPrice(
                item.product.basePrice,
                newQuantity,
                item.product.priceTiers,
                item.customization.isTwoSided
              );

              return {
                ...item,
                quantity: newQuantity,
                customization: {
                  ...item.customization,
                  quantity: newQuantity,
                },
                unitPrice: priceInfo.unitFinalPrice,
                subtotal: priceInfo.unitOriginalPrice * newQuantity,
                discountPercent: priceInfo.discountPercent,
                finalTotal: priceInfo.subtotal,
              };
            }
            return item;
          }),
        }));
      },

      applyCoupon: (code: string) => {
        const clean = code.trim().toUpperCase();
        if (clean === 'BLESS10' || clean === 'PRIMEIRACOMPRA') {
          set({
            appliedCoupon: clean,
            couponDiscountPercent: 10,
          });
          return true;
        }
        if (clean === 'ATACADO15') {
          set({
            appliedCoupon: clean,
            couponDiscountPercent: 15,
          });
          return true;
        }
        return false;
      },

      removeCoupon: () => {
        set({
          appliedCoupon: null,
          couponDiscountPercent: 0,
        });
      },

      clearCart: () => {
        set({ items: [], appliedCoupon: null, couponDiscountPercent: 0 });
      },

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.finalTotal, 0);
      },

      getDiscountTotal: () => {
        const subtotal = get().getSubtotal();
        const couponPercent = get().couponDiscountPercent;
        return (subtotal * couponPercent) / 100;
      },

      getFinalTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountTotal();
        return Math.max(0, subtotal - discount);
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'bless_cart_v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        appliedCoupon: state.appliedCoupon,
        couponDiscountPercent: state.couponDiscountPercent,
      }),
    }
  )
);
