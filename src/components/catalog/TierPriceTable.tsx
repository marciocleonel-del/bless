'use client';

import React from 'react';
import { PriceTier } from '@/types';
import { formatBRL } from '@/utils/formatters';
import { Tag, Sparkles } from 'lucide-react';

interface TierPriceTableProps {
  basePrice: number;
  tiers: PriceTier[];
  currentQuantity?: number;
}

export const TierPriceTable: React.FC<TierPriceTableProps> = ({
  basePrice,
  tiers,
  currentQuantity = 1,
}) => {
  return (
    <div className="bg-[#0A1128] border border-bless-gold/30 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-bless-gold" />
          Tabela de Descontos por Volume (Atacado)
        </h4>
        <span className="text-[10px] text-emerald-400 font-bold">Desconto Automático</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tiers.map((tier) => {
          const discountMultiplier = 1 - tier.discountPercent / 100;
          const tierUnitPrice = basePrice * discountMultiplier;
          const isCurrent =
            currentQuantity >= tier.min && (tier.max === undefined || currentQuantity <= tier.max);

          return (
            <div
              key={tier.label}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isCurrent
                  ? 'bg-bless-gold/20 border-bless-gold shadow-gold-glow scale-102'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {tier.min}{tier.max ? ` a ${tier.max}` : '+'} un
              </span>

              <span className="text-sm font-black text-white block mt-0.5">
                {formatBRL(tierUnitPrice)}
              </span>

              {tier.discountPercent > 0 ? (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded-md inline-block mt-1">
                  {tier.discountPercent}% OFF
                </span>
              ) : (
                <span className="text-[10px] text-slate-500 block mt-1">Preço Base</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
