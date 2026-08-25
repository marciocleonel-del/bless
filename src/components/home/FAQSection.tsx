'use client';

import React, { useState } from 'react';
import { FAQ_DATA } from '@/data/faqData';
import { HelpCircle, ChevronDown, MessageCircle, Sparkles } from 'lucide-react';
import { BLESS_PHONE_NUMBER } from '@/utils/whatsappHelper';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#070D1E] relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1128] border border-bless-gold/40 shadow-gold-glow">
            <HelpCircle className="w-3.5 h-3.5 text-bless-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-bless-gold-light">
              Perguntas Frequentes
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Tire Todas as Suas Dúvidas
          </h2>

          <p className="text-sm text-slate-400">
            Tudo o que você precisa saber sobre técnicas de gravação, formatos de arquivos, prazos e faturamento.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-2xl bg-[#0A1128] border border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-100">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-bless-gold shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4 animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 p-6 rounded-3xl bg-[#0A1128] border border-bless-gold/30 text-center space-y-3">
          <h4 className="text-base font-bold text-white">
            Ainda tem alguma dúvida específica sobre o seu projeto?
          </h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Nossos especialistas em gravação a laser e sublimação estão prontos para te ajudar agora no WhatsApp.
          </p>
          <a
            href={`https://wa.me/${BLESS_PHONE_NUMBER}?text=${encodeURIComponent('Olá, tenho uma dúvida sobre personalização na Bless!')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com um Especialista Bless</span>
          </a>
        </div>
      </div>
    </section>
  );
};
