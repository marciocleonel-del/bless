'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Layers, ShieldCheck, Flame, Check, ArrowRight, Wand2 } from 'lucide-react';

export const TechComparison: React.FC = () => {
  const [activeTech, setActiveTech] = useState<'both' | 'laser' | 'sublimacao'>('both');

  const comparisonRows = [
    {
      feature: 'Durabilidade do Acabamento',
      sublimacao: 'Altíssima durabilidade (resina fundida termicamente)',
      laser: 'Eterna / Vitalícia (gravado diretamente no metal ou material base)',
    },
    {
      feature: 'Resistência a Lavagens e Atrito',
      sublimacao: 'Suporta lava-louças e micro-ondas (cerâmicas classe AAA)',
      laser: 'Imune a água, sabão, riscos e solventes (não descasca)',
    },
    {
      feature: 'Fidelidade Cromática & Cores',
      sublimacao: 'Cores fotográficas ilimitadas, degradês e brilho espelhado',
      laser: 'Monocromático nobre (revela inox prateado, dourado ou tom queimado)',
    },
    {
      feature: 'Materiais Compatíveis',
      sublimacao: 'Cerâmica resinada, alumínio, polímero, tecidos de poliéster',
      laser: 'Aço inox térmico, madeira nobre, acrílico cast, couro, facas',
    },
    {
      feature: 'Sensação Tátil ao Toque',
      sublimacao: 'Superfície 100% lisa e esmaltada com toque zero',
      laser: 'Baixo relevo sofisticado micrométrico perceptível ao toque',
    },
    {
      feature: 'Melhor Indicação de Uso',
      sublimacao: 'Fotos de família, artes coloridas, canecas temáticas, azulejos',
      laser: 'Copos térmicos premium, kits executivos, branding corporativo VIP',
    },
  ];

  return (
    <section id="comparativo" className="py-20 bg-[#040814] relative border-t border-b border-bless-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1128] border border-bless-gold/40 shadow-gold-glow">
            <Layers className="w-3.5 h-3.5 text-bless-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-bless-gold-light">
              Análise Tecnológica Bless
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Sublimação Ultra HD vs Gravação a Laser
          </h2>

          <p className="text-sm text-slate-400">
            Entenda a ciência por trás de cada técnica e escolha o processo ideal para o seu projeto, presente ou brinde empresarial.
          </p>
        </div>

        {/* Side-by-Side Interactive Comparison Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Laser Card */}
          <div className="rounded-3xl bg-[#0A1128] border-2 border-bless-laser-blue/40 shadow-laser-glow p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-bless-laser-blue/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-bless-laser-blue/10 border border-bless-laser-blue/40 flex items-center justify-center text-bless-laser-blue">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Gravação a Laser de Fibra/CO2</h3>
                  <span className="text-xs text-bless-laser-blue font-semibold">Precisão de 0.01mm computadorizada</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-bless-laser-blue/10 border border-bless-laser-blue/30 text-bless-laser-blue font-bold text-xs">
                Inoxidável
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O feixe de laser de alta potência queima com precisão cirúrgica a tinta superficial de copos térmicos e metais, expondo o brilho do aço nobre. O resultado é definitivo e jamais descola ou desbota.
            </p>

            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bless-laser-blue shrink-0" />
                <span><strong>Eterno:</strong> Não sai com água, atrito ou uso diário</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bless-laser-blue shrink-0" />
                <span><strong>Acabamento Premium:</strong> Brilho metálico espelhado ou fosco nobre</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bless-laser-blue shrink-0" />
                <span><strong>Aplicações:</strong> Copos térmicos, garrafas inox, chaveiros acrílicos, facas</span>
              </li>
            </ul>

            <Link
              href="/customizer"
              className="w-full py-3.5 rounded-xl bg-bless-laser-blue/10 hover:bg-bless-laser-blue text-bless-laser-blue hover:text-slate-950 font-bold text-xs uppercase tracking-wider border border-bless-laser-blue/40 transition-all flex items-center justify-center gap-2"
            >
              <span>Personalizar a Laser</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Sublimation Card */}
          <div className="rounded-3xl bg-[#0A1128] border-2 border-bless-gold/40 shadow-gold-glow p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-bless-gold/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-bless-gold/10 border border-bless-gold/40 flex items-center justify-center text-bless-gold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Sublimação Ultra HD</h3>
                  <span className="text-xs text-bless-gold font-semibold">Resolução Fotográfica 300+ DPI</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-bless-gold/10 border border-bless-gold/30 text-bless-gold font-bold text-xs">
                Cores Vivas
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Tintas especiais termotransmissíveis que penetram diretamente na estrutura molecular da resina cerâmica ou tecido através de calor e pressão, conferindo brilho espelhado e cores vívidas.
            </p>

            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bless-gold shrink-0" />
                <span><strong>Fidelidade Total:</strong> Imprime fotografias, degradês e logos complexos</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bless-gold shrink-0" />
                <span><strong>Brilho Intenso:</strong> Resina importada de altíssima reflexão de luz</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bless-gold shrink-0" />
                <span><strong>Aplicações:</strong> Canecas cerâmicas, azulejos decorativos, camisetas, squeezes</span>
              </li>
            </ul>

            <Link
              href="/customizer"
              className="w-full py-3.5 rounded-xl bg-bless-gold/10 hover:bg-bless-gold text-bless-gold hover:text-slate-950 font-bold text-xs uppercase tracking-wider border border-bless-gold/40 transition-all flex items-center justify-center gap-2"
            >
              <span>Personalizar Sublimação HD</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-[#0A1128] shadow-2xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0F1C3F] text-slate-100 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4 sm:p-5 font-bold">Critério / Característica</th>
                <th className="p-4 sm:p-5 font-bold text-bless-laser-blue">Gravação a Laser</th>
                <th className="p-4 sm:p-5 font-bold text-bless-gold">Sublimação Ultra HD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {comparisonRows.map((row, idx) => (
                <tr key={row.feature} className={idx % 2 === 0 ? 'bg-slate-900/30' : 'bg-transparent'}>
                  <td className="p-4 sm:p-5 font-bold text-white whitespace-nowrap">{row.feature}</td>
                  <td className="p-4 sm:p-5 text-slate-300">{row.laser}</td>
                  <td className="p-4 sm:p-5 text-slate-300">{row.sublimacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
