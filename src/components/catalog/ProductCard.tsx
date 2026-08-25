'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useCustomizerStore } from '@/store/useCustomizerStore';
import { calculateProductPrice, formatBRL } from '@/utils/formatters';
import { Sparkles, Wand2, Star, Tag, ChevronRight, Layers } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { setProduct } = useCustomizerStore();

  const [simulatedQty, setSimulatedQty] = useState<number>(product.minQuantity || 1);

  const isLaser = product.technique.includes('Laser');
  const priceInfo = calculateProductPrice(product.basePrice, simulatedQty, product.priceTiers);

  const handleGoToCustomizer = () => {
    setProduct(product);
    router.push('/customizer');
  };

  return (
    <div className="group rounded-3xl bg-[#0A1128] border border-slate-800 hover:border-bless-gold/40 shadow-xl hover:shadow-gold-glow transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Card Visual Header */}
      <div className="relative p-6 bg-gradient-to-b from-[#0F1C3F] to-[#0A1128] flex flex-col items-center justify-center min-h-[220px] overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full bg-bless-gold text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
              {product.badge}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[10px] font-bold text-slate-200 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-bless-laser-blue" />
            {product.technique}
          </span>
        </div>

        {/* Mockup Stylized Representation */}
        <div className="relative w-36 h-36 my-2 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
          <div
            style={{ backgroundColor: product.availableColors[0]?.hex || '#0A1128' }}
            className={`w-28 h-28 rounded-3xl shadow-2xl border border-white/20 flex flex-col items-center justify-center p-3 text-center ${
              isLaser ? 'shadow-laser-glow' : 'shadow-gold-glow'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center mb-1">
              <Layers className={`w-4 h-4 ${isLaser ? 'text-bless-laser-blue' : 'text-bless-gold'}`} />
            </div>
            <span
              className={`text-[10px] font-black tracking-wider uppercase ${
                product.availableColors[0]?.hex === '#FFFFFF' ? 'text-slate-900' : 'text-white'
              }`}
            >
              BLESS
            </span>
            <span
              className={`text-[8px] font-semibold opacity-75 ${
                product.availableColors[0]?.hex === '#FFFFFF' ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {isLaser ? 'LASER ETCH' : 'HD PRINT'}
            </span>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 mt-2">
          {product.availableColors.slice(0, 5).map((color) => (
            <span
              key={color.name}
              style={{ backgroundColor: color.hex }}
              className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-sm"
              title={color.name}
            />
          ))}
          {product.availableColors.length > 5 && (
            <span className="text-[9px] text-slate-400 font-bold">
              +{product.availableColors.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Rating */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <strong className="text-slate-200">{product.rating.toFixed(1)}</strong>
              <span>({product.reviewCount} avaliações)</span>
            </div>
            <span>Mínimo: {product.minQuantity} un</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-white group-hover:text-bless-gold transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Volume Simulator */}
        <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Simular Lote:</span>
            <div className="flex items-center gap-1">
              {[1, 10, 50, 100].map((qty) => (
                <button
                  key={qty}
                  onClick={() => setSimulatedQty(qty)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors ${
                    simulatedQty === qty
                      ? 'bg-bless-gold text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {qty} un
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-baseline justify-between pt-1 border-t border-slate-800/80">
            <div>
              <span className="text-[10px] text-slate-400 block">Unitário no lote:</span>
              <span className="text-sm font-bold text-white">
                {formatBRL(priceInfo.unitFinalPrice)}
              </span>
            </div>

            <div className="text-right">
              {priceInfo.discountPercent > 0 && (
                <span className="text-[10px] text-emerald-400 font-bold block">
                  Economize {formatBRL(priceInfo.totalSavings)}
                </span>
              )}
              <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark">
                Total {formatBRL(priceInfo.subtotal)}
              </span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-2">
          <button
            onClick={handleGoToCustomizer}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Wand2 className="w-4 h-4" />
            <span>Personalizar este Produto</span>
          </button>
        </div>
      </div>
    </div>
  );
};
