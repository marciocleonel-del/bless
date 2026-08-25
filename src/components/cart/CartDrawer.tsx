'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { CartItemRow } from './CartItemRow';
import { formatBRL } from '@/utils/formatters';
import { generateWhatsAppOrderUrl } from '@/utils/whatsappHelper';
import { X, ShoppingBag, ArrowRight, Sparkles, MessageCircle, Tag, Truck, Check, Trash2 } from 'lucide-react';

const FREE_SHIPPING_TARGET = 250.0;

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    appliedCoupon,
    couponDiscountPercent,
    applyCoupon,
    removeCoupon,
    clearCart,
    getSubtotal,
    getDiscountTotal,
    getFinalTotal,
    getItemCount,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);

  if (!isDrawerOpen) return null;

  const subtotal = getSubtotal();
  const discountTotal = getDiscountTotal();
  const finalTotal = getFinalTotal();
  const itemCount = getItemCount();

  const freeShippingLeft = Math.max(0, FREE_SHIPPING_TARGET - finalTotal);
  const freeShippingProgress = Math.min(100, (finalTotal / FREE_SHIPPING_TARGET) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(false);
    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError(true);
    } else {
      setCouponInput('');
    }
  };

  const handleQuickWhatsAppOrder = () => {
    const orderId = `BLS-${Math.floor(10000 + Math.random() * 90000)}`;
    const url = generateWhatsAppOrderUrl({
      orderId,
      customer: {
        nome: 'Cliente Bless',
        whatsapp: 'Via Carrinho Rápido',
        email: '',
        documento: '',
      },
      items,
      subtotal,
      shippingPrice: 0,
      discount: discountTotal,
      total: finalTotal,
      paymentMethod: 'A Combinar via WhatsApp',
    });
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#070D1E] border-l border-bless-gold/30 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#0A1128]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-bless-gold/10 border border-bless-gold/30 flex items-center justify-center text-bless-gold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">Seu Carrinho de Compras</h3>
                <p className="text-[11px] text-slate-400">
                  {itemCount} {itemCount === 1 ? 'item personalizado' : 'itens personalizados'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 text-xs flex items-center gap-1 transition-colors"
                  title="Esvaziar carrinho"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={closeDrawer}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="p-4 bg-[#0A1128]/80 border-b border-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400" />
                {freeShippingLeft > 0 ? (
                  <span>
                    Faltam <strong className="text-bless-gold">{formatBRL(freeShippingLeft)}</strong> para Frete Grátis!
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Parabéns! Você ganhou Frete Grátis!
                  </span>
                )}
              </span>
              <span className="text-[10px] text-slate-500 font-bold">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
              <div
                style={{ width: `${freeShippingProgress}%` }}
                className="h-full bg-gradient-to-r from-bless-gold to-emerald-400 rounded-full transition-all duration-500"
              />
            </div>
          </div>

          {/* Drawer Body - Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-200">Seu carrinho está vazio</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Explore nosso catálogo ou crie um produto personalizado agora mesmo no Estúdio Live!
                  </p>
                </div>
                <Link
                  href="/customizer"
                  onClick={closeDrawer}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Personalizar Agora</span>
                </Link>
              </div>
            ) : (
              items.map((item) => <CartItemRow key={item.id} item={item} />)
            )}
          </div>

          {/* Drawer Footer - Coupon, Totals & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-[#0A1128] space-y-4">
              {/* Coupon Form */}
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Cupom (ex: BLESS10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-bless-gold text-xs font-bold transition-colors border border-slate-700"
                  >
                    Aplicar
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-emerald-300 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Cupom <strong>{appliedCoupon}</strong> ({couponDiscountPercent}% OFF)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] text-rose-400 hover:underline"
                  >
                    Remover
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-400">Cupom inválido. Tente BLESS10 ou PRIMEIRACOMPRA.</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-slate-200 font-semibold">{formatBRL(subtotal)}</span>
                </div>
                {discountTotal > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Desconto Cupom:</span>
                    <span>-{formatBRL(discountTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                  <span>Total Final:</span>
                  <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark">
                    {formatBRL(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTAs */}
              <div className="space-y-2.5 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 font-black text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <span>Finalizar Compra Segura</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={handleQuickWhatsAppOrder}
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-950/80 border border-emerald-600/50 hover:bg-emerald-600 text-emerald-300 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Finalizar e Enviar Arte via WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
