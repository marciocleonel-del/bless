'use client';

import React, { useState } from 'react';
import { useCustomizerStore } from '@/store/useCustomizerStore';
import { useCartStore } from '@/store/useCartStore';
import { calculateProductPrice, formatBRL } from '@/utils/formatters';
import { generateWhatsAppQuickQuoteUrl } from '@/utils/whatsappHelper';
import { ShoppingBag, Sparkles, MessageCircle, Check, Tag, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PriceSummaryBar: React.FC = () => {
  const [addedSuccess, setAddedSuccess] = useState(false);

  const {
    currentProduct,
    selectedColor,
    activeSide,
    isTwoSided,
    laserTone,
    quantity,
    setQuantity,
    customerNotes,
    setCustomerNotes,
    frontArt,
    frontText,
    backArt,
    backText,
  } = useCustomizerStore();

  const { addItem } = useCartStore();

  const priceInfo = calculateProductPrice(
    currentProduct.basePrice,
    quantity,
    currentProduct.priceTiers,
    isTwoSided
  );

  const handleAddToCart = () => {
    // Add item to Zustand Cart
    addItem(currentProduct, {
      productId: currentProduct.id,
      selectedColor,
      activeSide,
      frontArt,
      frontText,
      backArt,
      backText,
      isTwoSided,
      laserTone,
      quantity,
      notes: customerNotes,
    });

    // Confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#CFA758', '#00D4FF', '#FFFFFF', '#D4AF37'],
      });
    } catch (e) {
      // ignore if canvas confetti is unavailable
    }

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const handleWhatsAppQuote = () => {
    let details = `Cor: ${selectedColor.name}; Lados: ${isTwoSided ? 'Frente e Verso' : '1 Lado'}`;
    if (frontText?.text) details += `; Texto Frente: "${frontText.text}"`;
    if (backText?.text) details += `; Texto Verso: "${backText.text}"`;

    const url = generateWhatsAppQuickQuoteUrl({
      productName: currentProduct.name,
      quantity,
      technique: currentProduct.technique,
      details,
    });
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#0A1128] border border-bless-gold/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">
      {/* Tier Price Progress Banner */}
      {priceInfo.discountPercent > 0 ? (
        <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-950/40 border border-emerald-600/30 text-emerald-300 text-xs">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">
              Desconto de Atacado Aplicado: {priceInfo.discountPercent}% OFF!
            </span>
          </div>
          <span className="font-bold text-white">
            Economia de {formatBRL(priceInfo.totalSavings)}
          </span>
        </div>
      ) : (
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-bless-gold" />
            Compre 10+ unidades e ganhe até 35% de desconto automático!
          </span>
        </div>
      )}

      {/* Quantity Stepper & Price Breakdown */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
        {/* Quantity Controls */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Quantidade de Peças
          </label>
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-2xl p-1">
            <button
              onClick={() => setQuantity(Math.max(currentProduct.minQuantity || 1, quantity - 1))}
              className="w-9 h-9 rounded-xl hover:bg-slate-800 text-slate-300 font-bold text-base flex items-center justify-center transition-colors"
            >
              -
            </button>
            <input
              type="number"
              min={currentProduct.minQuantity || 1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center bg-transparent font-bold text-white text-base focus:outline-none"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-xl hover:bg-slate-800 text-slate-300 font-bold text-base flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Price Display */}
        <div className="text-right">
          <span className="text-[11px] text-slate-400 block">
            {formatBRL(priceInfo.unitFinalPrice)} / unidade
            {isTwoSided && ' (inclui 2 lados)'}
          </span>
          <div className="flex items-baseline gap-2 justify-end">
            {priceInfo.discountPercent > 0 && (
              <span className="text-sm line-through text-slate-500">
                {formatBRL(priceInfo.unitOriginalPrice * quantity)}
              </span>
            )}
            <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark">
              {formatBRL(priceInfo.subtotal)}
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold block">
            ou até 12x no cartão
          </span>
        </div>
      </div>

      {/* Production Notes Input */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
          Observações para a Produção Bless (Opcional)
        </label>
        <textarea
          rows={2}
          value={customerNotes}
          onChange={(e) => setCustomerNotes(e.target.value)}
          placeholder="Ex: Gostaria do nome centralizado na horizontal, ou caso queira enviar uma lista de nomes para cada copo."
          className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          onClick={handleAddToCart}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-gold-glow hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          {addedSuccess ? (
            <>
              <Check className="w-5 h-5" />
              <span>Adicionado ao Carrinho!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              <span>Adicionar ao Carrinho</span>
            </>
          )}
        </button>

        <button
          onClick={handleWhatsAppQuote}
          className="w-full py-4 px-6 rounded-2xl bg-emerald-950/70 border border-emerald-600/50 hover:bg-emerald-600 text-emerald-300 hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <MessageCircle className="w-5 h-5 text-emerald-400" />
          <span>Pedir via WhatsApp</span>
        </button>
      </div>

      {/* Guarantee Badge */}
      <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-4 h-4 text-bless-gold" />
        <span>Garantia de Prévia Digital: validamos o mockup antes de produzir.</span>
      </div>
    </div>
  );
};
