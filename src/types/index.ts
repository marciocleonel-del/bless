export type ProductCategory = 'sublimacao' | 'laser' | 'adesivos' | 'corporativo';

export type TechniqueType = 'Sublimação HD' | 'Gravação a Laser Fibra/CO2' | 'Recorte e Adesivo Vinílico';

export interface PriceTier {
  min: number;
  max?: number;
  discountPercent: number;
  label: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  classBg?: string;
  laserFinishTone?: 'silver' | 'gold' | 'dark';
}

export interface MockupConfig {
  type: 'copo' | 'caneca' | 'azulejo' | 'chaveiro' | 'garrafa' | 'camiseta';
  printableArea: {
    xPercent: number; // 0 - 100
    yPercent: number;
    widthPercent: number;
    heightPercent: number;
  };
  hasLaserShine?: boolean;
  supports360?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  technique: TechniqueType;
  basePrice: number;
  originalPrice?: number;
  minQuantity: number;
  shortDescription: string;
  fullDescription: string;
  material: string;
  dimensions: string;
  leadTime: string;
  rating: number;
  reviewCount: number;
  availableColors: ProductColor[];
  priceTiers: PriceTier[];
  mockup: MockupConfig;
  features: string[];
  featured?: boolean;
  badge?: string;
  image: string;
}

export interface CustomArtElement {
  url: string;
  name: string;
  width: number;
  height: number;
  x: number; // offset from center in px
  y: number;
  scale: number; // 0.1 to 3
  rotation: number; // degrees -180 to 180
  dpiQuality: 'excelente' | 'boa' | 'baixa';
}

export interface CustomTextElement {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  isCurved: boolean;
  curveRadius: number;
  x: number;
  y: number;
  rotation: number;
  bold: boolean;
  italic: boolean;
  align: 'left' | 'center' | 'right';
  laserEffect: boolean;
}

export interface CustomizationDetails {
  productId: string;
  selectedColor: ProductColor;
  activeSide: 'frente' | 'verso' | '360';
  frontArt: CustomArtElement | null;
  frontText: CustomTextElement | null;
  backArt: CustomArtElement | null;
  backText: CustomTextElement | null;
  isTwoSided: boolean;
  laserTone: 'silver' | 'gold' | 'dark';
  quantity: number;
  notes: string;
  snapshotPreviewUrl?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  customization: CustomizationDetails;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discountPercent: number;
  finalTotal: number;
  createdAt: string;
}

export interface CustomerAddress {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface CustomerInfo {
  nome: string;
  whatsapp: string;
  email: string;
  documento: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  prazo: string;
  carrier: string;
}

export type PaymentMethod = 'pix' | 'credit_card' | 'boleto' | 'whatsapp';

export interface OrderSubmission {
  orderId: string;
  customer: CustomerInfo;
  address: CustomerAddress;
  shipping: ShippingOption;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  shippingPrice: number;
  discount: number;
  total: number;
  installments?: number;
  status: 'pendente' | 'pago' | 'em_producao' | 'enviado';
  createdAt: string;
}
