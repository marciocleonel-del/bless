'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Wand2, ArrowRight, ShieldCheck, Truck, Star, Layers, CheckCircle2 } from 'lucide-react';
import { BlessLogo } from '@/components/ui/BlessLogo';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#040814] via-[#070D1E] to-[#0A1128]">
      {/* Background Decorative Laser / Gold Glow Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-bless-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-bless-laser-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1128]/90 border border-bless-gold/40 shadow-gold-glow">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <Sparkles className="w-3.5 h-3.5 text-bless-gold" />
              <span className="text-xs font-bold uppercase tracking-wider text-bless-gold-light">
                Estúdio de Sublimação Ultra HD & Gravação a Laser
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Transforme ideias em <br />
              <span className="font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark">
                produtos inesquecíveis
              </span>{' '}
              com acabamento eterno.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Copos e garrafas térmicas com gravação a laser permanente, canecas fotográficas em Sublimação HD e brindes corporativos de alto padrão. Crie sua prévia digital em tempo real no nosso personalizador exclusivo.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/customizer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 font-black text-sm uppercase tracking-wider shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <Wand2 className="w-4 h-4 transition-transform group-hover:rotate-12" />
                <span>Personalizar Agora</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/#b2b"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/80 border border-slate-700 hover:border-bless-gold/60 text-slate-200 hover:text-white font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Orçamento em Lote B2B</span>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-xl mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <span className="block text-xl sm:text-2xl font-black text-white">+15.000</span>
                <span className="text-[11px] text-slate-400">Peças Personalizadas</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-xl sm:text-2xl font-black text-bless-gold">4.9 / 5.0</span>
                <span className="text-[11px] text-slate-400 flex items-center justify-center lg:justify-start gap-0.5">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  Avaliações Google
                </span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-xl sm:text-2xl font-black text-emerald-400">1 a 3 dias</span>
                <span className="text-[11px] text-slate-400">Produção Expressa</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Main Brand Showcase Card */}
            <div className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 bg-[#0A1128]/90 border border-bless-gold/40 shadow-2xl backdrop-blur-xl space-y-6">
              {/* Official Animated Brand Logo with 3D Wing Flutter & Moving Gold Shimmer */}
              <div className="flex flex-col items-center justify-center text-center pb-6 border-b border-slate-800 relative">
                <div className="relative p-3 rounded-3xl bg-gradient-to-b from-[#0F1C3F] to-[#070D1E] border border-bless-gold/40 shadow-gold-glow flex items-center justify-center">
                  <BlessLogo
                    size={300}
                    variant="full"
                    animateWing={true}
                    animateGold={true}
                    showSlogan={true}
                    showOptionSelector={true}
                  />
                </div>
              </div>

              {/* Laser / Sublimation Interactive Floating Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-bless-laser-blue/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-bless-laser-blue/10 border border-bless-laser-blue/40 flex items-center justify-center text-bless-laser-blue">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">Gravação a Laser de Fibra</h4>
                      <p className="text-[10px] text-slate-400">Revela o metal nobre, não descasca</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-bless-laser-blue uppercase">100% Permanente</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-bless-gold/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-bless-gold/10 border border-bless-gold/40 flex items-center justify-center text-bless-gold">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">Sublimação Ultra HD</h4>
                      <p className="text-[10px] text-slate-400">Resolução fotográfica espelhada</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-bless-gold uppercase">Alto Brilho</span>
                </div>
              </div>

              {/* Bottom Quick Feature */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Simule sua arte agora mesmo sem compromisso!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
