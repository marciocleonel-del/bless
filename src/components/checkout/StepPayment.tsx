'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { PaymentMethod } from '@/types';
import { formatBRL, maskCreditCard, maskCardExpiry, getCardBrand } from '@/utils/formatters';
import { QrCode, CreditCard, FileText, CheckCircle2, Copy, Check, ShieldCheck, Clock, MessageCircle, AlertCircle } from 'lucide-react';

interface StepPaymentProps {
  total: number;
  paymentMethod: PaymentMethod;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
  onConfirmOrder: (method: PaymentMethod) => void;
  onWhatsAppOrder: () => void;
}

export const StepPayment: React.FC<StepPaymentProps> = ({
  total,
  paymentMethod,
  setPaymentMethod,
  onConfirmOrder,
  onWhatsAppOrder,
}) => {
  // Pix State
  const [pixQrDataUrl, setPixQrDataUrl] = useState<string>('');
  const [pixCopied, setPixCopied] = useState(false);
  const [pixTimer, setPixTimer] = useState(900); // 15 min countdown

  // Card State
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState(1);

  // Generate simulated dynamic Pix QR Code on load
  useEffect(() => {
    const pixPayload = `00020126580014br.gov.bcb.pix0136bless-${Date.now()}520400005303986540${total.toFixed(2)}5802BR5918BLESS PERSONALIZADOS6009SAO PAULO62070503***6304`;
    QRCode.toDataURL(pixPayload, { width: 220, margin: 1, color: { dark: '#0A1128', light: '#FFFFFF' } })
      .then(setPixQrDataUrl)
      .catch(console.error);

    const interval = setInterval(() => {
      setPixTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [total]);

  const cardBrand = getCardBrand(cardNumber);

  const handleCopyPix = () => {
    const code = `00020126580014br.gov.bcb.pix0136bless-personalizados-pagamento-${Date.now()}520400005303986540${total.toFixed(2)}5802BR5918BLESS PERSONALIZADOS6009SAO PAULO`;
    navigator.clipboard.writeText(code);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  const minutes = Math.floor(pixTimer / 60);
  const seconds = pixTimer % 60;

  return (
    <div className="space-y-6">
      {/* Payment Method Selector Tabs */}
      <div className="rounded-3xl bg-[#0A1128] border border-bless-gold/30 p-6 sm:p-7 space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-800">
          <CreditCard className="w-4 h-4 text-bless-gold" />
          Escolha a Forma de Pagamento
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Pix */}
          <button
            type="button"
            onClick={() => setPaymentMethod('pix')}
            className={`p-3.5 rounded-2xl border text-center transition-all ${
              paymentMethod === 'pix'
                ? 'bg-bless-gold/20 border-bless-gold shadow-gold-glow'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <QrCode className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
            <span className="text-xs font-bold text-white block">Pix Instantâneo</span>
            <span className="text-[10px] text-emerald-400 font-semibold">Aprovação Imediata</span>
          </button>

          {/* Cartão de Crédito */}
          <button
            type="button"
            onClick={() => setPaymentMethod('credit_card')}
            className={`p-3.5 rounded-2xl border text-center transition-all ${
              paymentMethod === 'credit_card'
                ? 'bg-bless-gold/20 border-bless-gold shadow-gold-glow'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <CreditCard className="w-6 h-6 text-bless-laser-blue mx-auto mb-1" />
            <span className="text-xs font-bold text-white block">Cartão de Crédito</span>
            <span className="text-[10px] text-slate-400">Até 12x parcelado</span>
          </button>

          {/* Boleto */}
          <button
            type="button"
            onClick={() => setPaymentMethod('boleto')}
            className={`p-3.5 rounded-2xl border text-center transition-all ${
              paymentMethod === 'boleto'
                ? 'bg-bless-gold/20 border-bless-gold shadow-gold-glow'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <FileText className="w-6 h-6 text-slate-300 mx-auto mb-1" />
            <span className="text-xs font-bold text-white block">Boleto Bancário</span>
            <span className="text-[10px] text-slate-400">Compensação 1-2 dias</span>
          </button>

          {/* WhatsApp Direct */}
          <button
            type="button"
            onClick={() => setPaymentMethod('whatsapp')}
            className={`p-3.5 rounded-2xl border text-center transition-all ${
              paymentMethod === 'whatsapp'
                ? 'bg-emerald-950/60 border-emerald-500 shadow-lg text-emerald-300'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <MessageCircle className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
            <span className="text-xs font-bold text-white block">Via WhatsApp</span>
            <span className="text-[10px] text-emerald-400">Envio de Arte Direto</span>
          </button>
        </div>

        {/* Dynamic Payment Body */}
        <div className="pt-4 border-t border-slate-800">
          {/* 1. Pix View */}
          {paymentMethod === 'pix' && (
            <div className="flex flex-col items-center text-center space-y-4 py-2 animate-in fade-in duration-300">
              <div className="p-3 bg-white rounded-2xl shadow-xl border border-bless-gold/40">
                {pixQrDataUrl ? (
                  <img src={pixQrDataUrl} alt="QR Code Pix Bless" className="w-44 h-44 rounded-lg" />
                ) : (
                  <div className="w-44 h-44 flex items-center justify-center text-slate-950 text-xs">
                    Gerando QR Code...
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-950/40 px-3 py-1.5 rounded-full border border-amber-800">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>
                  QR Code válido por {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
              </div>

              <div className="w-full max-w-sm space-y-2">
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 border border-bless-gold/40 hover:bg-slate-800 text-bless-gold text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  {pixCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{pixCopied ? 'Código Pix Copiado com Sucesso!' : 'Copiar Código Pix Copia e Cola'}</span>
                </button>

                <p className="text-[11px] text-slate-400">
                  Abra o aplicativo do seu banco, escolha <strong>Pix &gt; Pagar com QR Code</strong> ou cole a chave acima.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onConfirmOrder('pix')}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 font-black text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 active:scale-98 transition-all"
              >
                Já realizei o Pix! Confirmar Pedido
              </button>
            </div>
          )}

          {/* 2. Credit Card View */}
          {paymentMethod === 'credit_card' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs text-slate-400">Bandeira detectada:</span>
                <span className="text-xs font-bold uppercase text-bless-gold">
                  {cardBrand !== 'unknown' ? cardBrand : 'Aguardando digitação'}
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Número do Cartão
                </label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(maskCreditCard(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Nome Impresso no Cartão
                </label>
                <input
                  type="text"
                  placeholder="MARCELO S SILVA"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Validade (MM/AA)
                  </label>
                  <input
                    type="text"
                    placeholder="12/28"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(maskCardExpiry(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    CVV (Cód. Segurança)
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="123"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Opções de Parcelamento
                </label>
                <select
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 10, 12].map((i) => {
                    const instValue = total / i;
                    return (
                      <option key={i} value={i}>
                        {i}x de {formatBRL(instValue)} {i <= 3 ? '(Sem Juros)' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button
                type="button"
                onClick={() => onConfirmOrder('credit_card')}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 font-black text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 active:scale-98 transition-all"
              >
                Pagar com Cartão ({formatBRL(total)})
              </button>
            </div>
          )}

          {/* 3. Boleto View */}
          {paymentMethod === 'boleto' && (
            <div className="space-y-4 text-center py-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-bless-gold mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Boleto Bancário Registrado</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Ao confirmar o pedido, o boleto será gerado com vencimento para 3 dias úteis. A produção inicia após a compensação bancária.
              </p>

              <button
                type="button"
                onClick={() => onConfirmOrder('boleto')}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 font-black text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 active:scale-98 transition-all"
              >
                Gerar Boleto Bancário ({formatBRL(total)})
              </button>
            </div>
          )}

          {/* 4. WhatsApp Fallback View */}
          {paymentMethod === 'whatsapp' && (
            <div className="space-y-4 text-center py-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-600/40 flex items-center justify-center text-emerald-400 mx-auto">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Finalização com Atendimento Humano</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Todos os itens do seu carrinho, dados de entrega e notas de personalização serão enviados automaticamente para o WhatsApp da equipe Bless para validação da arte e acerto do pagamento.
              </p>

              <button
                type="button"
                onClick={onWhatsAppOrder}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Finalizar e Enviar Pedido via WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
