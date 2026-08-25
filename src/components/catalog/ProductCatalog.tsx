'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS_DATA } from '@/data/productsData';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '@/types';
import { Search, Filter, Sparkles, Layers, Flame, Tag } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'todos'>('todos');
  const [selectedTechnique, setSelectedTechnique] = useState<'todas' | 'laser' | 'sublimacao'>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'destaque' | 'menor_preco' | 'maior_preco'>('destaque');

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // Category filter
      if (selectedCategory !== 'todos' && product.category !== selectedCategory) {
        return false;
      }

      // Technique filter
      if (selectedTechnique === 'laser' && !product.technique.includes('Laser')) {
        return false;
      }
      if (selectedTechnique === 'sublimacao' && !product.technique.includes('Sublimação')) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchDesc = product.shortDescription.toLowerCase().includes(query);
        const matchMat = product.material.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchMat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'menor_preco') return a.basePrice - b.basePrice;
      if (sortBy === 'maior_preco') return b.basePrice - a.basePrice;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedTechnique, searchQuery, sortBy]);

  return (
    <section id="catalogo" className="py-20 bg-[#070D1E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1128] border border-bless-gold/40 shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5 text-bless-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-bless-gold-light">
              Catálogo Completo
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Escolha sua Base & Personalize com Excelência
          </h2>

          <p className="text-sm text-slate-400">
            Produtos selecionados a dedo com durabilidade comprovada. Atendemos desde pedidos individuais exclusivos até grandes lotes corporativos com preços de fábrica.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#0A1128] border border-bless-gold/20 rounded-3xl p-4 sm:p-6 mb-10 shadow-xl space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all ${
                selectedCategory === 'todos'
                  ? 'bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 shadow-gold-glow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Todos os Itens ({PRODUCTS_DATA.length})
            </button>

            <button
              onClick={() => setSelectedCategory('laser')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all ${
                selectedCategory === 'laser'
                  ? 'bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 shadow-gold-glow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              🔥 Gravação a Laser
            </button>

            <button
              onClick={() => setSelectedCategory('sublimacao')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all ${
                selectedCategory === 'sublimacao'
                  ? 'bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 shadow-gold-glow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              ✨ Sublimação HD
            </button>

            <button
              onClick={() => setSelectedCategory('corporativo')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all ${
                selectedCategory === 'corporativo'
                  ? 'bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 shadow-gold-glow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              💼 Kits Corporativos B2B
            </button>

            <button
              onClick={() => setSelectedCategory('adesivos')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all ${
                selectedCategory === 'adesivos'
                  ? 'bg-gradient-to-r from-bless-gold-light via-bless-gold to-bless-gold-dark text-slate-950 shadow-gold-glow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              🏷️ Adesivos Vinílicos
            </button>
          </div>

          {/* Search Input & Sort Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Buscar por nome, inox, caneca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>

            {/* Sorter */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-slate-400 shrink-0">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-bless-gold"
              >
                <option value="destaque">Mais Populares / Destaques</option>
                <option value="menor_preco">Menor Preço</option>
                <option value="maior_preco">Maior Preço</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-[#0A1128] rounded-3xl border border-slate-800 p-8 space-y-3">
            <h4 className="text-base font-bold text-slate-200">Nenhum produto encontrado</h4>
            <p className="text-xs text-slate-400">
              Tente buscar com outros termos ou selecione outra categoria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-bless-gold text-slate-950 text-xs font-bold"
            >
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
