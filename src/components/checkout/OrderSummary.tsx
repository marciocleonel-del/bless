'use client';

import React from 'react';
import { CartItem, ShippingOption } from '@/types';
import { formatBRL } from '@/utils/formatters';
import { ShoppingBag, Truck, ShieldCheck, Tag, Sparkles } from 'lucide-react';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: ShippingOption;
  discount: number;
  total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  discount,
  total,
}) => {
  return (
    <div className="rounded-3xl bg-[#0A1128] border border-bless-gold/30 p-6 space-y-5 sticky top-24 shadow-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-bless-gold" />
          Resumo do Pedido
        </h3>
        <span className="text-xs text-slate-400 font-semibold">{items.length} itens</span>
      </div>

      {/* Item List */}
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-3 text-xs pb-3 border-b border-slate-800/60"
          >
            <div className="flex items-start gap-2.5">
              <div
                style={{ backgroundColor: item.customization.selectedColor.hex }}
                className="w-7 h-7 rounded-lg border border-slate-700 shrink-0 mt-0.5"
              />
              <div>
                <p className="font-bold text-white line-clamp-1">{item.product.name}</p>
                <span className="text-[11px] text-slate-400">
                  {item.quantity}x {formatBRL(item.unitPrice)}
                </span>
                {item.customization.frontText?.text && (
                  <p className="text-[10px] text-bless-gold mt-0.5 truncate max-w-[170px]">
                    "{item.customization.frontText.text}"
                  </p>
                )}
              </div>
            </div>

            <span className="font-bold text-white shrink-0">
              {formatBRL(item.finalTotal)}
            </span>
          </div>
        ))}
      </div>

      {/* Financial Breakdown */}
      <div className="space-y-2 text-xs text-slate-300 pt-2">
        <div className="flex justify-between">
          <span>Subtotal dos Itens:</span>
          <span className="font-semibold text-white">{formatBRL(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            Frete ({shipping.name}):
          </span>
          <span className="font-semibold text-white">
            {shipping.price === 0 ? 'Grátis' : formatBRL(shipping.price)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-400 font-semibold">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              Desconto Cupom:
            </span>
            <span>-{formatBRL(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-base font-black text-white pt-3 border-t border-slate-800">
          <span>Total a Pagar:</span>
          <span className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark">
            {formatBRL(total)}
          </span>
        </div>
      </div>

      {/* Security Assurance */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Garantia de Prévia no WhatsApp</span>
        </div>
        <p className="text-[10px] leading-relaxed">
          Nossa equipe envia a arte final para você validar antes de colocarmos os produtos em máquina.
        </p>
      </div>
    </div>
  );
};
