'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { BLESS_PHONE_NUMBER } from '@/utils/whatsappHelper';
import { BlessLogo } from '@/components/ui/BlessLogo';

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = message.trim() || 'Olá, Equipe Bless! Gostaria de tirar dúvidas sobre personalização de produtos.';
    const url = `https://wa.me/${BLESS_PHONE_NUMBER}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-[#0A1128] border border-bless-gold/40 shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-bless-gold/40 bg-[#070D1E] p-1 flex items-center justify-center">
                <BlessLogo size={36} variant="icon" animateWing={true} animateGold={true} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-100">Atendimento Bless</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-emerald-400 font-medium">Online agora no WhatsApp</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="py-3 space-y-2">
            <div className="bg-[#121E40] border border-slate-700/60 rounded-xl p-3 text-xs text-slate-200 leading-relaxed">
              👋 Olá! Precisa de ajuda com a sua arte, prazos de entrega ou orçamento para lotes corporativos?
            </div>
            <div className="flex items-center gap-1 text-[11px] text-bless-gold-300">
              <Sparkles className="w-3 h-3 text-bless-gold" />
              <span>Resposta média em menos de 5 minutos</span>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1 shadow-md transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Falar conosco no WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#070D1E]"></span>
        </span>
        <MessageCircle className="w-7 h-7 transition-transform group-hover:rotate-12" />
      </button>
    </div>
  );
};
