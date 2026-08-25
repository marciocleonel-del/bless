'use client';

import React from 'react';
import { CartItem } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { formatBRL } from '@/utils/formatters';
import { Trash2, FileImage, Layers, Type } from 'lucide-react';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const isLaser = item.product.technique.includes('Laser');

  return (
    <div className="p-4 rounded-2xl bg-[#0A1128] border border-slate-800 space-y-3">
      {/* Top Details & Remove Button */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Color/Technique Indicator Badge */}
          <div
            style={{ backgroundColor: item.customization.selectedColor.hex }}
            className="w-10 h-10 rounded-xl border border-slate-700 shadow-md flex items-center justify-center shrink-0"
            title={item.customization.selectedColor.name}
          >
            <span
              className={`text-[9px] font-bold ${
                item.customization.selectedColor.hex === '#FFFFFF' ? 'text-black' : 'text-white'
              }`}
            >
              {isLaser ? 'LASER' : 'HD'}
            </span>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-100 line-clamp-1">
              {item.product.name}
            </h4>
            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
              <span>Cor: <strong className="text-slate-200">{item.customization.selectedColor.name}</strong></span>
              <span>•</span>
              <span>{item.customization.isTwoSided ? 'Frente e Verso' : '1 Lado'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => removeItem(item.id)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
          title="Remover item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Customization Details Badges */}
      <div className="bg-slate-900/80 rounded-xl p-2.5 space-y-1 text-[11px] border border-slate-800/80">
        {item.customization.frontText?.text && (
          <div className="flex items-center gap-1.5 text-slate-300">
            <Type className="w-3.5 h-3.5 text-bless-gold shrink-0" />
            <span>Texto Frente: <strong>"{item.customization.frontText.text}"</strong></span>
          </div>
        )}

        {item.customization.backText?.text && (
          <div className="flex items-center gap-1.5 text-slate-300">
            <Type className="w-3.5 h-3.5 text-bless-gold shrink-0" />
            <span>Texto Verso: <strong>"{item.customization.backText.text}"</strong></span>
          </div>
        )}

        {item.customization.frontArt && (
          <div className="flex items-center gap-1.5 text-bless-laser-blue">
            <FileImage className="w-3.5 h-3.5 shrink-0" />
            <span>Arte Frente: {item.customization.frontArt.name}</span>
          </div>
        )}

        {item.customization.backArt && (
          <div className="flex items-center gap-1.5 text-bless-laser-blue">
            <FileImage className="w-3.5 h-3.5 shrink-0" />
            <span>Arte Verso: {item.customization.backArt.name}</span>
          </div>
        )}

        {item.customization.notes && (
          <p className="text-[10px] text-slate-400 italic mt-1">
            Obs: "{item.customization.notes}"
          </p>
        )}
      </div>

      {/* Quantity and Price Row */}
      <div className="flex items-center justify-between pt-1">
        {/* Stepper */}
        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-0.5">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-7 h-7 rounded-lg hover:bg-slate-800 text-slate-300 text-sm font-bold flex items-center justify-center"
          >
            -
          </button>
          <span className="w-10 text-center font-bold text-xs text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-7 h-7 rounded-lg hover:bg-slate-800 text-slate-300 text-sm font-bold flex items-center justify-center"
          >
            +
          </button>
        </div>

        {/* Total Price */}
        <div className="text-right">
          {item.discountPercent > 0 && (
            <span className="text-[10px] text-emerald-400 font-bold block">
              {item.discountPercent}% OFF atacado
            </span>
          )}
          <span className="text-sm font-black text-bless-gold">
            {formatBRL(item.finalTotal)}
          </span>
        </div>
      </div>
    </div>
  );
};
