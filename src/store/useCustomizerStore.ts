import { create } from 'zustand';
import { Product, ProductColor, CustomArtElement, CustomTextElement } from '@/types';
import { PRODUCTS_DATA } from '@/data/productsData';

interface CustomizerStore {
  currentProduct: Product;
  selectedColor: ProductColor;
  activeSide: 'frente' | 'verso' | '360';
  isTwoSided: boolean;
  laserTone: 'silver' | 'gold' | 'dark';
  quantity: number;
  customerNotes: string;
  
  // Front Side Design Elements
  frontArt: CustomArtElement | null;
  frontText: CustomTextElement | null;

  // Back Side Design Elements
  backArt: CustomArtElement | null;
  backText: CustomTextElement | null;

  // Active Selected Element for manipulation (e.g. 'art' or 'text')
  activeElement: 'art' | 'text' | null;

  // Actions
  setProduct: (product: Product) => void;
  setColor: (color: ProductColor) => void;
  setActiveSide: (side: 'frente' | 'verso' | '360') => void;
  setIsTwoSided: (isTwoSided: boolean) => void;
  setLaserTone: (tone: 'silver' | 'gold' | 'dark') => void;
  setQuantity: (qty: number) => void;
  setCustomerNotes: (notes: string) => void;
  setActiveElement: (elem: 'art' | 'text' | null) => void;

  // Art actions
  setUploadedArt: (art: CustomArtElement | null, side?: 'frente' | 'verso') => void;
  updateArtTransform: (
    transforms: Partial<Pick<CustomArtElement, 'x' | 'y' | 'scale' | 'rotation'>>,
    side?: 'frente' | 'verso'
  ) => void;

  // Text actions
  setTextElement: (textElem: Partial<CustomTextElement> | null, side?: 'frente' | 'verso') => void;

  // Reset
  resetCustomizer: (product?: Product) => void;
}

const defaultTextConfig: CustomTextElement = {
  text: 'Seu Nome / Frase',
  fontFamily: 'Montserrat',
  fontSize: 28,
  fontColor: '#FFFFFF',
  isCurved: false,
  curveRadius: 100,
  x: 0,
  y: 40,
  rotation: 0,
  bold: true,
  italic: false,
  align: 'center',
  laserEffect: true,
};

const initialProduct = PRODUCTS_DATA[0];

export const useCustomizerStore = create<CustomizerStore>((set, get) => ({
  currentProduct: initialProduct,
  selectedColor: initialProduct.availableColors[0],
  activeSide: 'frente',
  isTwoSided: false,
  laserTone: initialProduct.availableColors[0]?.laserFinishTone || 'silver',
  quantity: 1,
  customerNotes: '',
  frontArt: null,
  frontText: { ...defaultTextConfig },
  backArt: null,
  backText: null,
  activeElement: 'text',

  setProduct: (product) => {
    set({
      currentProduct: product,
      selectedColor: product.availableColors[0],
      laserTone: product.availableColors[0]?.laserFinishTone || 'silver',
      frontArt: null,
      frontText: product.technique.includes('Laser')
        ? { ...defaultTextConfig, laserEffect: true }
        : { ...defaultTextConfig, laserEffect: false, fontColor: '#1E293B' },
      backArt: null,
      backText: null,
      isTwoSided: false,
      activeSide: 'frente',
    });
  },

  setColor: (color) => {
    set({
      selectedColor: color,
      laserTone: color.laserFinishTone || get().laserTone,
    });
  },

  setActiveSide: (side) => set({ activeSide: side }),
  setIsTwoSided: (isTwoSided) => set({ isTwoSided }),
  setLaserTone: (tone) => set({ laserTone: tone }),
  setQuantity: (quantity) => set({ quantity: Math.max(1, quantity) }),
  setCustomerNotes: (notes) => set({ customerNotes: notes }),
  setActiveElement: (elem) => set({ activeElement: elem }),

  setUploadedArt: (art, side) => {
    const targetSide = side || (get().activeSide === 'verso' ? 'verso' : 'frente');
    if (targetSide === 'verso') {
      set({ backArt: art, activeElement: art ? 'art' : null });
    } else {
      set({ frontArt: art, activeElement: art ? 'art' : null });
    }
  },

  updateArtTransform: (transforms, side) => {
    const targetSide = side || (get().activeSide === 'verso' ? 'verso' : 'frente');
    if (targetSide === 'verso') {
      const curr = get().backArt;
      if (curr) set({ backArt: { ...curr, ...transforms } });
    } else {
      const curr = get().frontArt;
      if (curr) set({ frontArt: { ...curr, ...transforms } });
    }
  },

  setTextElement: (updates, side) => {
    const targetSide = side || (get().activeSide === 'verso' ? 'verso' : 'frente');
    if (targetSide === 'verso') {
      if (!updates) {
        set({ backText: null });
        return;
      }
      const curr = get().backText || { ...defaultTextConfig };
      set({ backText: { ...curr, ...updates }, activeElement: 'text' });
    } else {
      if (!updates) {
        set({ frontText: null });
        return;
      }
      const curr = get().frontText || { ...defaultTextConfig };
      set({ frontText: { ...curr, ...updates }, activeElement: 'text' });
    }
  },

  resetCustomizer: (prod) => {
    const product = prod || get().currentProduct;
    set({
      currentProduct: product,
      selectedColor: product.availableColors[0],
      activeSide: 'frente',
      isTwoSided: false,
      quantity: product.minQuantity || 1,
      customerNotes: '',
      frontArt: null,
      frontText: { ...defaultTextConfig },
      backArt: null,
      backText: null,
      activeElement: null,
    });
  },
}));
