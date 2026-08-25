'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Sparkles, Wand2, Layers, HelpCircle, Phone, Menu, X, Search, ShieldCheck, Lock } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { BlessLogo } from '@/components/ui/BlessLogo';
import { BLESS_PHONE_NUMBER } from '@/utils/whatsappHelper';

interface HeaderProps {
  onOpenTracker?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTracker }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { openDrawer, getItemCount } = useCartStore();
  const itemCount = mounted ? getItemCount() : 0;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070D1E]/90 backdrop-blur-md border-b border-bless-gold/20 shadow-2xl py-2.5'
            : 'bg-gradient-to-b from-[#070D1E] via-[#070D1E]/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Animated Wing and Moving Gold */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl shadow-gold-glow border border-bless-gold/40 p-1 bg-[#0A1128] transition-transform duration-300 group-hover:scale-105 flex items-center justify-center overflow-hidden">
              <BlessLogo size={44} variant="icon" animateWing={true} animateGold={true} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black tracking-widest text-xl sm:text-2xl gold-shimmer-text">
                BLESS
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.28em] text-bless-gold-300 font-semibold uppercase -mt-1">
                Ideias que Transformam
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-bless-gold transition-colors"
            >
              Início
            </Link>
            <Link
              href="/customizer"
              className="px-3 py-2 text-sm font-semibold text-bless-laser-blue hover:text-white transition-colors flex items-center gap-1.5 rounded-lg bg-bless-laser-blue/10 border border-bless-laser-blue/30 shadow-laser-glow"
            >
              <Wand2 className="w-4 h-4 text-bless-laser-blue animate-pulse" />
              <span>Personalizador Live</span>
            </Link>
            <Link
              href="/#catalogo"
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-bless-gold transition-colors"
            >
              Catálogo
            </Link>
            <Link
              href="/#comparativo"
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-bless-gold transition-colors flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5 text-bless-gold" />
              <span>Laser vs Sublimação</span>
            </Link>
            <Link
              href="/#como-funciona"
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-bless-gold transition-colors"
            >
              Como Funciona
            </Link>
            <Link
              href="/#b2b"
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-bless-gold transition-colors"
            >
              Orçamento B2B
            </Link>
            <Link
              href="/#faq"
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-bless-gold transition-colors flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Dúvidas</span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Order Tracking Button */}
            {onOpenTracker && (
              <button
                onClick={onOpenTracker}
                className="hidden md:flex items-center gap-1.5 text-xs text-slate-300 hover:text-bless-gold border border-slate-700/60 hover:border-bless-gold/40 px-3 py-1.5 rounded-full bg-slate-900/60 transition-all"
                title="Consultar status do pedido"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-bless-gold" />
                <span>Rastrear Pedido</span>
              </button>
            )}

            {/* Customizer Direct CTA */}
            <Link
              href="/customizer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#070D1E] bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark hover:brightness-110 rounded-full shadow-gold-glow transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Criar Arte</span>
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openDrawer}
              aria-label="Abrir carrinho de compras"
              className="relative p-2.5 rounded-xl bg-[#0F1C3F] border border-bless-gold/30 hover:border-bless-gold text-slate-100 hover:text-bless-gold transition-all shadow-md group"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-[11px] flex items-center justify-center shadow-lg animate-bounce">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Discreet Admin Lock Button */}
            <Link
              href="/admin"
              aria-label="Acesso Administrativo"
              title="Acesso Administrativo"
              className="p-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-800 border border-slate-800/80 hover:border-bless-gold/40 text-slate-400 hover:text-bless-gold transition-all"
            >
              <Lock className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Abrir menu mobile"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/80 backdrop-blur-lg flex flex-col">
          <div className="p-4 flex items-center justify-between border-b border-slate-800">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5"
            >
              <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-bless-gold/40 p-0.5 bg-[#0A1128] flex items-center justify-center">
                <BlessLogo size={32} variant="icon" animateWing={true} animateGold={true} />
              </div>
              <span className="font-serif font-black text-xl gold-shimmer-text">BLESS</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <Link
              href="/customizer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 font-bold uppercase tracking-wider shadow-gold-glow"
            >
              <Wand2 className="w-4 h-4" />
              <span>Personalizador Interativo</span>
            </Link>

            <nav className="space-y-2 pt-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-800/80 font-medium"
              >
                Início
              </Link>
              <Link
                href="/#catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-800/80 font-medium"
              >
                Catálogo de Produtos
              </Link>
              <Link
                href="/#comparativo"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-800/80 font-medium"
              >
                Tecnologia: Laser vs Sublimação
              </Link>
              <Link
                href="/#como-funciona"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-800/80 font-medium"
              >
                Como Funciona o Pedido
              </Link>
              <Link
                href="/#b2b"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-800/80 font-medium"
              >
                Orçamento Corporativo B2B
              </Link>
              <Link
                href="/#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-800/80 font-medium"
              >
                Perguntas Frequentes (FAQ)
              </Link>
              {onOpenTracker && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTracker();
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-bless-gold hover:bg-slate-800/80 font-medium flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Rastrear Pedido</span>
                </button>
              )}
            </nav>
          </div>

          <div className="p-4 border-t border-slate-800 bg-[#070D1E]">
            <a
              href={`https://wa.me/${BLESS_PHONE_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Atendimento no WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
