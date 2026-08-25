'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ZoomIn, X, Tag, Heart, Award } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'laser' | 'sublimacao' | 'b2b';
  technique: string;
  client: string;
  description: string;
  tag: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Copo Térmico Black Matte com Logo Corporativo a Laser',
    category: 'laser',
    technique: 'Gravação Laser de Fibra',
    client: 'Tech Soluções Digitais',
    description: 'Lote de 150 copos térmicos com revelação prateada perfeita do logotipo e nomes individuais dos funcionários no verso.',
    tag: 'Kit Onboarding VIP',
  },
  {
    id: '2',
    title: 'Canecas Cerâmicas Classe AAA Lembrança de Casamento',
    category: 'sublimacao',
    technique: 'Sublimação Ultra HD',
    client: 'Gabriel & Beatriz',
    description: 'Estampa em 360 graus com detalhes dourados fotográficos e ilustração personalizada dos noivos.',
    tag: 'Casamento & Afeto',
  },
  {
    id: '3',
    title: 'Garrafas Térmicas Inox 750ml com Tipografia Exclusiva',
    category: 'laser',
    technique: 'Gravação Laser CO2 & Fibra',
    client: 'Studio Pilates & Saúde',
    description: 'Personalização vertical de alta precisão em aço escovado e pintura militar com vedação hermética.',
    tag: 'Linha Esportiva',
  },
  {
    id: '4',
    title: 'Azulejo Decorativo 20x20 com Suporte Rústico de Madeira',
    category: 'sublimacao',
    technique: 'Sublimação Fotográfica HD',
    client: 'Família Silveira',
    description: 'Homenagem de Bodas de Prata com reprodução fotográfica e verniz protetor contra raios UV.',
    tag: 'Homenagens & Bodas',
  },
  {
    id: '5',
    title: 'Chaveiros Acrílico Cristal Corte no Formato do Logo',
    category: 'laser',
    technique: 'Corte & Vetor Laser',
    client: 'Imobiliária Prime Concept',
    description: 'Corte milimétrico de 3mm com bordas polidas no próprio laser para entrega de chaves aos clientes.',
    tag: 'Brindes B2B',
  },
  {
    id: '6',
    title: 'Kit Executivo Bless em Caixa Rígida Personalizada',
    category: 'b2b',
    technique: 'Laser Fibra + Hot Stamping',
    client: 'Grupo Financeiro Orion',
    description: 'Copo térmico, caneta metálica e caderno tipo moleskine gravados a laser para presentes de diretoria.',
    tag: 'Presente Executivo',
  },
];

export const ShowcaseGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'laser' | 'sublimacao' | 'b2b'>('todos');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filtered = selectedCategory === 'todos'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-20 bg-[#040814] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1128] border border-bless-gold/40 shadow-gold-glow">
            <Award className="w-3.5 h-3.5 text-bless-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-bless-gold-light">
              Portfólio & Vitrine
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Trabalhos Realizados com o Padrão Bless
          </h2>

          <p className="text-sm text-slate-400">
            Confira algumas das peças entregues para presentes exclusivos, eventos memoráveis e grandes marcas.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {[
            { id: 'todos', label: 'Todos os Trabalhos' },
            { id: 'laser', label: 'Gravação a Laser' },
            { id: 'sublimacao', label: 'Sublimação HD' },
            { id: 'b2b', label: 'Kits Corporativos B2B' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === tab.id
                  ? 'bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 shadow-gold-glow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group cursor-pointer rounded-3xl bg-[#0A1128] border border-slate-800 hover:border-bless-gold/40 shadow-xl hover:shadow-gold-glow overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image / Mockup Card Header */}
              <div className="relative p-8 bg-gradient-to-b from-[#0F1C3F] to-[#0A1128] flex items-center justify-center min-h-[200px] overflow-hidden">
                <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-bless-gold/30 shadow-2xl flex flex-col items-center justify-center p-3 text-center transition-transform duration-500 group-hover:scale-110">
                  <span className="font-serif font-black text-xs text-bless-gold">BLESS</span>
                  <span className="text-[8px] text-slate-300 font-bold uppercase mt-0.5">
                    {item.technique.split(' ')[0]}
                  </span>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-2 rounded-xl bg-black/60 text-bless-gold backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>

                <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-700 text-[10px] font-bold text-slate-300">
                  {item.tag}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-2">
                <span className="text-[10px] text-bless-gold font-bold uppercase tracking-wider block">
                  {item.technique} • {item.client}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-bless-gold transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Detail Zoom Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0A1128] border border-bless-gold/40 shadow-2xl p-6 sm:p-8 space-y-5">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-bless-gold/10 border border-bless-gold/30 text-bless-gold text-xs font-bold uppercase">
                {activeModalItem.technique}
              </span>
              <span className="text-xs text-slate-400">Cliente: <strong>{activeModalItem.client}</strong></span>
            </div>

            <h3 className="text-xl font-bold text-white">
              {activeModalItem.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              {activeModalItem.description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Garantia de Acabamento Perfeito
              </span>

              <button
                onClick={() => setActiveModalItem(null)}
                className="px-5 py-2.5 rounded-xl bg-bless-gold text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
