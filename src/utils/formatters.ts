import { PriceTier } from '@/types';

export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function maskCEP(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
}

export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 14);
  }
  return digits
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
}

export function maskCPFOrCNPJ(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  }
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18);
}

export function maskCreditCard(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})\s(\d{4})(\d)/, '$1 $2 $3')
    .replace(/(\d{4})\s(\d{4})\s(\d{4})(\d)/, '$1 $2 $3 $4')
    .slice(0, 19);
}

export function maskCardExpiry(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .slice(0, 5);
}

export function getCardBrand(number: string): 'visa' | 'mastercard' | 'elo' | 'amex' | 'unknown' {
  const clean = number.replace(/\D/g, '');
  if (/^4/.test(clean)) return 'visa';
  if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return 'mastercard';
  if (/^3[47]/.test(clean)) return 'amex';
  if (/^(4011|4389|4514|4576|5041|5066|5090|6277|6362|6363|650|6516|6550)/.test(clean)) return 'elo';
  return 'unknown';
}

export function calculateTierDiscount(tiers: PriceTier[], quantity: number): {
  discountPercent: number;
  matchedTier: PriceTier | null;
  nextTier: { neededQuantity: number; discountPercent: number } | null;
} {
  if (!tiers || tiers.length === 0) {
    return { discountPercent: 0, matchedTier: null, nextTier: null };
  }

  // Sort tiers by min ascending
  const sorted = [...tiers].sort((a, b) => a.min - b.min);

  let currentTier: PriceTier | null = null;
  let nextTier: { neededQuantity: number; discountPercent: number } | null = null;

  for (let i = 0; i < sorted.length; i++) {
    const tier = sorted[i];
    if (quantity >= tier.min && (tier.max === undefined || quantity <= tier.max)) {
      currentTier = tier;
      if (i + 1 < sorted.length) {
        nextTier = {
          neededQuantity: sorted[i + 1].min - quantity,
          discountPercent: sorted[i + 1].discountPercent,
        };
      }
      break;
    }
  }

  // If quantity is above all tiers, match highest
  if (!currentTier && sorted.length > 0) {
    if (quantity >= sorted[sorted.length - 1].min) {
      currentTier = sorted[sorted.length - 1];
    } else {
      currentTier = sorted[0];
      if (sorted.length > 1) {
        nextTier = {
          neededQuantity: sorted[1].min - quantity,
          discountPercent: sorted[1].discountPercent,
        };
      }
    }
  }

  return {
    discountPercent: currentTier?.discountPercent || 0,
    matchedTier: currentTier,
    nextTier,
  };
}

export function calculateProductPrice(
  basePrice: number,
  quantity: number,
  tiers: PriceTier[],
  isTwoSided = false,
  extraProcessingCost = 0
): {
  unitOriginalPrice: number;
  unitFinalPrice: number;
  subtotal: number;
  discountPercent: number;
  totalSavings: number;
} {
  const twoSidedFee = isTwoSided ? 10.0 : 0;
  const unitOriginalPrice = basePrice + twoSidedFee + extraProcessingCost;
  const { discountPercent } = calculateTierDiscount(tiers, quantity);
  
  const discountMultiplier = 1 - discountPercent / 100;
  const unitFinalPrice = unitOriginalPrice * discountMultiplier;
  const subtotal = unitFinalPrice * quantity;
  const totalSavings = (unitOriginalPrice - unitFinalPrice) * quantity;

  return {
    unitOriginalPrice,
    unitFinalPrice,
    subtotal,
    discountPercent,
    totalSavings,
  };
}
