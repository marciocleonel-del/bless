'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Wand2, CheckCircle2, Truck, ArrowRight, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: '1. Escolha o Produto',
      description: 'Selecione a base ideal no catálogo (copos térmicos, canecas, garrafas inox, azulejos ou kits corporativos).',
      icon: Package,
      badge: 'Catálogo Amplo',
    },
    {
      number: '02',
      title: '2. Crie ou Envie a Arte',
      description: 'Use nosso personalizador ao vivo para digitar textos com fontes exclusivas ou faça upload do seu logotipo em PNG/SVG/PDF.',
      icon: Wand2,
      badge: 'Live Mockup 2D',
    },
    {
      number: '03',
      title: '3. Aprove a Prévia',
      description: 'Nossa equipe técnica valida os alinhamentos e envia o layout final para você confirmar tudo antes de gravar.',
      icon: CheckCircle2,
      badge: 'Garantia Total',
    },
    {
      number: '04',
      title: '4. Produção & Envio',
      description: 'Gravação a laser de alta precisão ou sublimação HD com embalagem reforçada e envio rastreado para todo o Brasil.',
      icon: Truck,
      badge: 'Envio Expresso',
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-[#070D1E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1128] border border-bless-gold/40 shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5 text-bless-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-bless-gold-light">
              Processo Simplificado
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Do Seu Projeto ao Produto Pronto em 4 Passos
          </h2>

          <p className="text-sm text-slate-400">
            Sem complicações: personalização instantânea pelo navegador com suporte direto da nossa fábrica.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-3xl bg-[#0A1128] border border-slate-800 p-6 sm:p-7 space-y-4 hover:border-bless-gold/40 hover:shadow-gold-glow transition-all duration-300 group"
              >
                {/* Step Number Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-serif font-black text-3xl text-slate-700 group-hover:text-bless-gold transition-colors">
                    {step.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-bold text-slate-300">
                    {step.badge}
                  </span>
                </div>

                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-2xl bg-bless-gold/10 border border-bless-gold/30 flex items-center justify-center text-bless-gold group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-bless-gold-light transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#0A1128] via-[#0F1C3F] to-[#0A1128] border border-bless-gold/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">
              Pronto para transformar sua ideia em um presente memorável?
            </h3>
            <p className="text-xs text-slate-400">
              Faça sua simulação visual agora mesmo. Não cobramos nada pela prévia!
            </p>
          </div>

          <Link
            href="/customizer"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 font-black text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shrink-0"
          >
            <Wand2 className="w-4 h-4" />
            <span>Abrir Personalizador</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
