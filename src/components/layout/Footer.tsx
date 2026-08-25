import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, Sparkles, Award, Phone, Mail, MapPin, Instagram, Facebook, Clock, Lock } from 'lucide-react';
import { BLESS_PHONE_DISPLAY, BLESS_PHONE_NUMBER } from '@/utils/whatsappHelper';
import { BlessLogo } from '@/components/ui/BlessLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#040814] text-slate-400 border-t border-bless-gold/20 pt-16 pb-12 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-bless-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-bless-laser-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Trust Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bless-gold/10 border border-bless-gold/30 flex items-center justify-center text-bless-gold shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Gravação a Laser HD</h4>
              <p className="text-[11px] text-slate-400">Precisão micrométrica permanente</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bless-gold/10 border border-bless-gold/30 flex items-center justify-center text-bless-gold shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Sublimação Ultra HD</h4>
              <p className="text-[11px] text-slate-400">Brilho espelhado e cores vívidas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bless-gold/10 border border-bless-gold/30 flex items-center justify-center text-bless-gold shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Envio Para Todo o Brasil</h4>
              <p className="text-[11px] text-slate-400">Embalagem segura e rastreada</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bless-gold/10 border border-bless-gold/30 flex items-center justify-center text-bless-gold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Garantia Bless</h4>
              <p className="text-[11px] text-slate-400">Prévia digital antes da produção</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl border border-bless-gold/40 p-1 bg-[#0A1128] shadow-gold-glow flex items-center justify-center">
                <BlessLogo size={46} variant="icon" animateWing={true} animateGold={true} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black tracking-widest text-2xl gold-shimmer-text">
                  BLESS
                </span>
                <span className="text-[10px] tracking-[0.28em] text-bless-gold-300 font-semibold uppercase -mt-1">
                  Ideias que Transformam
                </span>
              </div>
            </Link>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Estúdio especializado em personalização de alto padrão com tecnologia de Sublimação Ultra HD e Gravação a Laser de Fibra/CO2. Transformamos suas ideias em presentes inesquecíveis e brindes corporativos de impacto.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-bless-gold hover:text-slate-950 flex items-center justify-center text-slate-300 transition-colors"
                aria-label="Instagram da Bless"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-bless-gold hover:text-slate-950 flex items-center justify-center text-slate-300 transition-colors"
                aria-label="Facebook da Bless"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${BLESS_PHONE_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-600/40 hover:bg-emerald-600 text-emerald-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp da Bless"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bless-gold"></span>
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-bless-gold transition-colors">Início</Link>
              </li>
              <li>
                <Link href="/customizer" className="text-bless-laser-blue hover:underline flex items-center gap-1 font-semibold">
                  Personalizador Interativo
                </Link>
              </li>
              <li>
                <Link href="/#catalogo" className="hover:text-bless-gold transition-colors">Catálogo Completo</Link>
              </li>
              <li>
                <Link href="/#comparativo" className="hover:text-bless-gold transition-colors">Laser vs Sublimação</Link>
              </li>
              <li>
                <Link href="/#como-funciona" className="hover:text-bless-gold transition-colors">Como Funciona</Link>
              </li>
              <li>
                <Link href="/#b2b" className="hover:text-bless-gold transition-colors">Atacado & B2B</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bless-laser-blue"></span>
              Categorias
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#catalogo" className="hover:text-bless-gold transition-colors">Copos Térmicos a Laser</Link>
              </li>
              <li>
                <Link href="/#catalogo" className="hover:text-bless-gold transition-colors">Canecas Cerâmicas HD</Link>
              </li>
              <li>
                <Link href="/#catalogo" className="hover:text-bless-gold transition-colors">Garrafas Térmicas Inox</Link>
              </li>
              <li>
                <Link href="/#catalogo" className="hover:text-bless-gold transition-colors">Azulejos Decorativos</Link>
              </li>
              <li>
                <Link href="/#catalogo" className="hover:text-bless-gold transition-colors">Chaveiros de Acrílico</Link>
              </li>
              <li>
                <Link href="/#catalogo" className="hover:text-bless-gold transition-colors">Kits Corporativos VIP</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Atendimento Bless
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-200 font-semibold">{BLESS_PHONE_DISPLAY}</span>
                  <span className="text-[11px] text-slate-400">Seg. a Sex. das 08h às 18h</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-bless-gold shrink-0 mt-0.5" />
                <span className="text-slate-300">contato@blesspersonalizados.com.br</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Estúdio Bless - Produção Expressa Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Payments */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ambiente 100% Seguro com Criptografia SSL 256-bit</span>
          </div>

          {/* Simulated Payment Methods */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="px-2 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300 font-bold text-[10px]">PIX Instantâneo</span>
            <span className="px-2 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300 font-bold text-[10px]">Cartão até 12x</span>
            <span className="px-2 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300 font-bold text-[10px]">Boleto Bancário</span>
            <span className="px-2 py-1 rounded bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 font-bold text-[10px]">WhatsApp Direto</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Bless Personalizados. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
