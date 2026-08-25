'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { CustomerAddress, CustomerInfo, ShippingOption, PaymentMethod } from '@/types';
import { StepAddress } from '@/components/checkout/StepAddress';
import { StepPayment } from '@/components/checkout/StepPayment';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { generateWhatsAppOrderUrl } from '@/utils/whatsappHelper';
import { formatBRL } from '@/utils/formatters';
import { ArrowLeft, CheckCircle2, ShoppingBag, ShieldCheck, Sparkles, MessageCircle, Home, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDiscountTotal, getFinalTotal, clearCart } = useCartStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [completedOrderId, setCompletedOrderId] = useState<string>('');

  // Customer State
  const [customer, setCustomer] = useState<CustomerInfo>({
    nome: '',
    whatsapp: '',
    email: '',
    documento: '',
  });

  // Address State
  const [address, setAddress] = useState<CustomerAddress>({
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
  });

  // Shipping State
  const [shipping, setShipping] = useState<ShippingOption>({
    id: 'sedex',
    name: 'SEDEX Expresso',
    price: 24.90,
    prazo: '1 a 3 dias úteis',
    carrier: 'Correios',
  });

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');

  const subtotal = getSubtotal();
  const discount = getDiscountTotal();
  const total = Math.max(0, subtotal - discount + shipping.price);

  const handleConfirmOrder = (method: PaymentMethod) => {
    const orderId = `BLS-${Math.floor(10000 + Math.random() * 90000)}`;
    setCompletedOrderId(orderId);
    setPaymentMethod(method);
    setCurrentStep(3);

    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#CFA758', '#00D4FF', '#FFFFFF', '#D4AF37', '#10B981'],
      });
    } catch (e) {}

    clearCart();
  };

  const handleWhatsAppDirectOrder = () => {
    const orderId = completedOrderId || `BLS-${Math.floor(10000 + Math.random() * 90000)}`;
    const url = generateWhatsAppOrderUrl({
      orderId,
      customer,
      address,
      shipping,
      items,
      subtotal,
      shippingPrice: shipping.price,
      discount,
      total,
      paymentMethod: 'Finalização via WhatsApp',
    });

    window.open(url, '_blank');
    if (currentStep !== 3) {
      handleConfirmOrder('whatsapp');
    }
  };

  // If cart is empty and not on success step
  if (items.length === 0 && currentStep !== 3) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-[#070D1E] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-[#0A1128] border border-slate-800 rounded-3xl p-8 space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Seu carrinho está vazio</h2>
          <p className="text-xs text-slate-400">
            Adicione um produto personalizado antes de prosseguir para a finalização da compra.
          </p>
          <Link
            href="/customizer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow"
          >
            <Wand2 className="w-4 h-4" />
            <span>Abrir Personalizador</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-to-b from-[#040814] via-[#070D1E] to-[#0A1128]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator Header */}
        <div className="max-w-3xl mx-auto mb-10 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => currentStep === 2 && setCurrentStep(1)}
              disabled={currentStep !== 2}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                currentStep === 1
                  ? 'bg-bless-gold text-slate-950 shadow-gold-glow'
                  : 'bg-slate-900 border border-slate-800 text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-950 text-bless-gold flex items-center justify-center text-[11px] font-black">
                1
              </span>
              <span>Identificação & Endereço</span>
            </button>

            <span className="w-6 h-0.5 bg-slate-800"></span>

            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                currentStep === 2
                  ? 'bg-bless-gold text-slate-950 shadow-gold-glow'
                  : 'bg-slate-900 border border-slate-800 text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-950 text-bless-gold flex items-center justify-center text-[11px] font-black">
                2
              </span>
              <span>Pagamento & Prévia</span>
            </div>

            <span className="w-6 h-0.5 bg-slate-800"></span>

            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                currentStep === 3
                  ? 'bg-emerald-500 text-slate-950 shadow-lg'
                  : 'bg-slate-900 border border-slate-800 text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-950 text-emerald-400 flex items-center justify-center text-[11px] font-black">
                3
              </span>
              <span>Conclusão</span>
            </div>
          </div>
        </div>

        {/* Success Confirmation Step (Step 3) */}
        {currentStep === 3 ? (
          <div className="max-w-2xl mx-auto rounded-3xl bg-[#0A1128] border border-bless-gold/40 shadow-2xl p-8 sm:p-12 text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-20 h-20 rounded-3xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-bless-gold">
                Pedido Recebido com Sucesso!
              </span>
              <h2 className="text-3xl font-black text-white">
                Obrigado por escolher a Bless!
              </h2>
              <p className="text-sm text-slate-300">
                Seu número de pedido é <strong className="text-bless-gold">#{completedOrderId}</strong>.
              </p>
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 text-xs text-slate-300 space-y-2 text-left">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Próximo Passo: Validação da sua Arte</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Nossa equipe de designers está preparando a maquete de produção. Você receberá uma mensagem no WhatsApp cadastrado (<strong className="text-white">{customer.whatsapp || 'WhatsApp'}</strong>) com o mockup digital final para sua aprovação.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleWhatsAppDirectOrder}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar com Produção no WhatsApp</span>
              </button>

              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-bless-gold text-slate-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Voltar ao Início</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-Step Forms & Summary Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Forms (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {currentStep === 1 ? (
                <StepAddress
                  customer={customer}
                  setCustomer={setCustomer}
                  address={address}
                  setAddress={setAddress}
                  shipping={shipping}
                  setShipping={setShipping}
                  onNext={() => setCurrentStep(2)}
                />
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-slate-400 hover:text-bless-gold flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Voltar para Dados de Endereço</span>
                  </button>

                  <StepPayment
                    total={total}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    onConfirmOrder={handleConfirmOrder}
                    onWhatsAppOrder={handleWhatsAppDirectOrder}
                  />
                </div>
              )}
            </div>

            {/* Right Order Summary (5 Cols) */}
            <div className="lg:col-span-5">
              <OrderSummary
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                total={total}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
