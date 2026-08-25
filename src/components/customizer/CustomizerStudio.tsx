'use client';

import React, { useState } from 'react';
import { CanvasMockup } from './CanvasMockup';
import { ProductSelector } from './ProductSelector';
import { TextToolControls } from './TextToolControls';
import { FileUploader } from './FileUploader';
import { PriceSummaryBar } from './PriceSummaryBar';
import { Wand2, Sparkles, Type, UploadCloud, Layers, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const CustomizerStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'product' | 'text' | 'art'>('product');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/#catalogo"
              className="text-xs text-slate-400 hover:text-bless-gold flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Catálogo</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-xs text-bless-gold font-bold">Estúdio Interativo</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white flex items-center gap-3">
            <span>Personalize Seu Produto ao Vivo</span>
            <span className="p-1.5 rounded-xl bg-bless-laser-blue/10 border border-bless-laser-blue/30 text-bless-laser-blue">
              <Wand2 className="w-6 h-6 animate-pulse" />
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Arraste logotipos, escolha fontes tipográficas e visualize o efeito fotorrealista da Gravação a Laser e Sublimação HD.
          </p>
        </div>

        {/* Live Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0A1128] border border-bless-gold/30 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs font-bold text-slate-200">
            Pré-visualização 2D em Tempo Real
          </span>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Mockup Canvas (5 Cols on Desktop) */}
        <div className="lg:col-span-6 sticky top-24 space-y-4">
          <CanvasMockup />
        </div>

        {/* Right Column: Controls, Tools & Price Summary (7 Cols on Desktop) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Quick Tool Navigation Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#0A1128] border border-bless-gold/30 rounded-2xl">
            <button
              onClick={() => setActiveTab('product')}
              className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'product'
                  ? 'bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 shadow-gold-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>1. Produto & Cor</span>
            </button>

            <button
              onClick={() => setActiveTab('art')}
              className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'art'
                  ? 'bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 shadow-gold-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>2. Upload Arte</span>
            </button>

            <button
              onClick={() => setActiveTab('text')}
              className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'text'
                  ? 'bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 shadow-gold-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>3. Texto & Fonte</span>
            </button>
          </div>

          {/* Active Tab Component Render */}
          <div className="space-y-6">
            {activeTab === 'product' && <ProductSelector />}
            {activeTab === 'art' && <FileUploader />}
            {activeTab === 'text' && <TextToolControls />}
          </div>

          {/* Price Summary & Add to Cart */}
          <PriceSummaryBar />
        </div>
      </div>
    </div>
  );
};
