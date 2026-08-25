'use client';

import React from 'react';
import { useCustomizerStore } from '@/store/useCustomizerStore';
import { PRODUCTS_DATA } from '@/data/productsData';
import { Sparkles, Palette, Layers, Check, Info } from 'lucide-react';
import { formatBRL } from '@/utils/formatters';

export const ProductSelector: React.FC = () => {
  const {
    currentProduct,
    setProduct,
    selectedColor,
    setColor,
    isTwoSided,
    setIsTwoSided,
  } = useCustomizerStore();

  return (
    <div className="bg-[#0D1630] border border-bless-gold/20 rounded-2xl p-4 sm:p-5 space-y-5">
      {/* Product Category / Switcher */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-bless-gold" />
            1. Selecione o Produto Base
          </label>
          <span className="text-[11px] text-bless-gold font-semibold">
            {currentProduct.technique}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PRODUCTS_DATA.map((prod) => {
            const isSelected = prod.id === currentProduct.id;
            return (
              <button
                key={prod.id}
                onClick={() => setProduct(prod)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-bless-gold/20 border-bless-gold shadow-gold-glow'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {prod.category}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-bless-gold" />}
                </div>
                <p className="text-xs font-bold text-slate-100 mt-1 line-clamp-1">
                  {prod.name}
                </p>
                <span className="text-xs text-bless-gold font-bold block mt-0.5">
                  A partir de {formatBRL(prod.basePrice)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Selector */}
      {currentProduct.availableColors.length > 0 && (
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-bless-laser-blue" />
              2. Cor do Item: <span className="text-white font-normal">{selectedColor.name}</span>
            </label>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {currentProduct.availableColors.map((color) => {
              const isSelected = color.name === selectedColor.name;
              return (
                <button
                  key={color.name}
                  onClick={() => setColor(color)}
                  style={{ backgroundColor: color.hex }}
                  className={`w-8 h-8 rounded-full border-2 transition-all relative ${
                    isSelected
                      ? 'scale-125 border-bless-gold shadow-gold-glow'
                      : 'border-slate-700 hover:scale-110'
                  }`}
                  title={color.name}
                >
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          color.hex === '#FFFFFF' || color.hex === '#F9FAFB'
                            ? 'bg-slate-900'
                            : 'bg-white'
                        }`}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Two-Sided Customization Option */}
      <div className="pt-2 border-t border-slate-800">
        <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-bless-gold/10 border border-bless-gold/30 flex items-center justify-center text-bless-gold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                Personalização Frente e Verso (2 Lados)
              </span>
              <span className="text-[11px] text-slate-400">
                Grave um logo na frente e seu nome/frase no verso
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-bless-gold">+R$ 10,00</span>
            <input
              type="checkbox"
              checked={isTwoSided}
              onChange={(e) => setIsTwoSided(e.target.checked)}
              className="w-5 h-5 rounded accent-bless-gold cursor-pointer"
            />
          </div>
        </label>
      </div>

      {/* Product Spec Highlights */}
      <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
        <div className="flex justify-between">
          <span>Material:</span>
          <span className="text-slate-200 font-medium">{currentProduct.material}</span>
        </div>
        <div className="flex justify-between">
          <span>Dimensões:</span>
          <span className="text-slate-200 font-medium">{currentProduct.dimensions}</span>
        </div>
        <div className="flex justify-between">
          <span>Prazo de Produção:</span>
          <span className="text-emerald-400 font-semibold">{currentProduct.leadTime}</span>
        </div>
      </div>
    </div>
  );
};
