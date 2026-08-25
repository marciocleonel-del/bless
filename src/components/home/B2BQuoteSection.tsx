'use client';

import React, { useState } from 'react';
import { Building2, Send, Sparkles, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { maskPhone, maskCPFOrCNPJ } from '@/utils/formatters';
import { generateWhatsAppQuickQuoteUrl } from '@/utils/whatsappHelper';

export const B2BQuoteSection: React.FC = () => {
  const [empresa, setEmpresa] = useState('');
  const [contato, setContato] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [produto, setProduto] = useState('Copo Térmico 473ml Inox');
  const [quantidade, setQuantidade] = useState(50);
  const [detalhes, setDetalhes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const detailsMsg = `Empresa: ${empresa || 'Não informado'} | CNPJ: ${cnpj || 'Não informado'} | Contato: ${contato} | Detalhes: ${detalhes || 'Orçamento de Lote B2B'}`;
    const url = generateWhatsAppQuickQuoteUrl({
      productName: produto,
      quantity: quantidade,
      technique: 'Gravação a Laser / Sublimação B2B',
      customerName: contato || empresa,
      details: detailsMsg,
    });

    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="b2b" className="py-20 bg-[#070D1E] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: B2B Benefits & Trust */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1128] border border-bless-gold/40 shadow-gold-glow">
              <Building2 className="w-3.5 h-3.5 text-bless-gold" />
              <span className="text-xs font-bold uppercase tracking-widest text-bless-gold-light">
                Soluções Corporativas & Atacado
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Brindes & Kits Corporativos que Valorizam Sua Marca
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Atendemos agências, startups, indústrias e eventos com capacidade de produção em escala, gravação a laser computadorizada e personalização com nomes individuais de colaboradores sem taxa extra em lotes.
            </p>

            {/* Benefit Checkmarks */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Faturamento Facilitado para Empresas</h4>
                  <p className="text-[11px] text-slate-400">Emissão de NF-e, boleto faturado para PJ e contratos empresariais.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Descontos Progressivos de até 50% OFF</h4>
                  <p className="text-[11px] text-slate-400">Tabelas de atacado direto de fábrica para lotes acima de 50, 100 e 500 peças.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Amostra Digital e Mockup 3D Gratuito</h4>
                  <p className="text-[11px] text-slate-400">Montamos a maquete virtual com sua marca antes de qualquer compromisso financeiro.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quote Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#0A1128] border border-bless-gold/40 shadow-2xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-bless-gold" />
                  <h3 className="text-base font-bold text-white">
                    Solicitar Orçamento Rápido B2B
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-700/60 px-2.5 py-1 rounded-full">
                  Resposta em &lt; 15 min
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Nome da Empresa / Razão Social
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Bless Tech Group"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Nome do Responsável
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Marcelo Silva"
                      value={contato}
                      onChange={(e) => setContato(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      WhatsApp com DDD
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="(11) 99999-9999"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      CNPJ (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="00.000.000/0001-00"
                      value={cnpj}
                      onChange={(e) => setCnpj(maskCPFOrCNPJ(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Produto de Interesse
                    </label>
                    <select
                      value={produto}
                      onChange={(e) => setProduto(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    >
                      <option value="Copo Térmico 473ml Inox Laser">Copo Térmico 473ml Inox Laser</option>
                      <option value="Caneca de Cerâmica Premium 325ml Sublimação">Caneca Cerâmica Premium Sublimação</option>
                      <option value="Garrafa Térmica Inox 750ml Laser">Garrafa Térmica Inox 750ml Laser</option>
                      <option value="Kit Executivo Bless (Copo + Caneta + Moleskine)">Kit Executivo VIP (Copo + Caneta + Moleskine)</option>
                      <option value="Chaveiros Acrílico / MDF Corte Laser">Chaveiros Acrílico / MDF Laser</option>
                      <option value="Adesivos em Vinil e Rótulos">Adesivos em Vinil e Rótulos</option>
                      <option value="Outros / Mix de Produtos">Outros / Mix de Produtos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Quantidade Estimada
                    </label>
                    <select
                      value={quantidade}
                      onChange={(e) => setQuantidade(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    >
                      <option value={20}>20 a 49 unidades (15% OFF)</option>
                      <option value={50}>50 a 99 unidades (25% OFF)</option>
                      <option value={100}>100 a 249 unidades (35% OFF)</option>
                      <option value={250}>250 a 499 unidades (40% OFF)</option>
                      <option value={500}>500+ unidades (Mega Atacado 50% OFF)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Detalhes do Pedido ou Prazo Desejado
                  </label>
                  <textarea
                    rows={2}
                    value={detalhes}
                    onChange={(e) => setDetalhes(e.target.value)}
                    placeholder="Ex: Precisamos dos brindes para nossa convenção anual no dia 15 do próximo mês. Teremos 80 nomes diferentes."
                    className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 font-black text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>Enviar Orçamento Direto para Produção</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
