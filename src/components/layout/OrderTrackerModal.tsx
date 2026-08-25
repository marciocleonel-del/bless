'use client';

import React, { useState } from 'react';
import { X, Search, PackageCheck, Truck, CheckCircle2, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { maskCPFOrCNPJ } from '@/utils/formatters';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0A1128] border border-bless-gold/40 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-bless-gold/10 border border-bless-gold/30 flex items-center justify-center text-bless-gold">
            <PackageCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Rastrear Pedido Bless</h3>
            <p className="text-xs text-slate-400">Consulte o status de produção e envio da sua encomenda</p>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Digite o número do pedido (#12345) ou seu CPF"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 focus:border-bless-gold rounded-2xl px-4 py-3.5 pl-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-bless-gold/20"
            />
            <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-3.5" />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 active:scale-98 transition-all"
          >
            Consultar Andamento
          </button>
        </form>

        {/* Search Result Simulation */}
        {hasSearched && (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
              <div>
                <span className="text-[11px] font-bold uppercase text-bless-gold tracking-wider block">Pedido Encontrado</span>
                <span className="text-sm font-bold text-white">#BLS-{Math.abs(query.split('').reduce((a,b)=>a+b.charCodeAt(0), 1000)).toString().slice(0, 5)}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                Em Produção a Laser
              </span>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-3 pl-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-slate-200">1. Pedido Recebido & Pagamento Aprovado</h5>
                  <p className="text-[11px] text-slate-400">Arte validada pela equipe técnica Bless</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-bless-gold flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-bless-gold"></div>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-bless-gold">2. Gravação a Laser & Sublimação HD</h5>
                  <p className="text-[11px] text-slate-300">Seus produtos estão na bancada de personalização</p>
                </div>
              </div>

              <div className="flex items-start gap-3 opacity-50">
                <div className="w-5 h-5 rounded-full border-2 border-slate-700 flex items-center justify-center shrink-0 mt-0.5"></div>
                <div>
                  <h5 className="text-xs font-bold text-slate-400">3. Embalagem Especial & Envio</h5>
                  <p className="text-[11px] text-slate-500">Geração de código de rastreio Correios/Transportadora</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
