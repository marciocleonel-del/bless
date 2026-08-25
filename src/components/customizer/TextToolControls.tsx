'use client';

import React from 'react';
import { useCustomizerStore } from '@/store/useCustomizerStore';
import { Type, Bold, Italic, AlignLeft, AlignCenter, AlignRight, Sparkles, RefreshCw, Trash2, Sliders } from 'lucide-react';

const GOOGLE_FONTS = [
  { name: 'Montserrat', category: 'Moderna & Forte', sample: 'BLESS 2026' },
  { name: 'Playfair Display', category: 'Elegante & Luxo', sample: 'Blessing Elegance' },
  { name: 'Cinzel', category: 'Romana & Clássica', sample: 'VICTORIA' },
  { name: 'Dancing Script', category: 'Manuscrita / Cursiva', sample: 'Com Amor & Carinho' },
  { name: 'Bebas Neue', category: 'Impacto & Caixa Alta', sample: 'TITULOS GRANDES' },
  { name: 'Roboto Mono', category: 'Tecnológica / Código', sample: 'DEV_STUDIO' },
  { name: 'Oswald', category: 'Esportiva & Condensada', sample: 'CROSSFIT & RUN' },
  { name: 'Pacifico', category: 'Descontraída & Retrô', sample: 'Aloha Summer' },
  { name: 'Inter', category: 'Minimalista Clean', sample: 'Minimalist Clean' },
];

export const TextToolControls: React.FC = () => {
  const {
    currentProduct,
    activeSide,
    frontText,
    backText,
    setTextElement,
    laserTone,
    setLaserTone,
  } = useCustomizerStore();

  const currentText = activeSide === 'verso' ? backText : frontText;
  const isLaserTechnique = currentProduct.technique.includes('Laser');

  const handleCreateOrUpdateText = (field: string, value: any) => {
    setTextElement({ [field]: value });
  };

  if (!currentText) {
    return (
      <div className="bg-[#0D1630] border border-bless-gold/20 rounded-2xl p-5 text-center space-y-3">
        <div className="w-10 h-10 rounded-xl bg-bless-gold/10 border border-bless-gold/30 flex items-center justify-center text-bless-gold mx-auto">
          <Type className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-200">Adicionar Texto Personalizado</h4>
          <p className="text-xs text-slate-400 mt-1">
            Insira nomes, frases comemorativas, datas especiais ou dedicatórias.
          </p>
        </div>
        <button
          onClick={() =>
            setTextElement({
              text: 'Seu Nome Aqui',
              fontFamily: 'Montserrat',
              fontSize: 26,
              fontColor: isLaserTechnique ? '#FFFFFF' : '#1E293B',
              isCurved: false,
              curveRadius: 110,
              x: 0,
              y: 40,
              rotation: 0,
              bold: true,
              italic: false,
              align: 'center',
              laserEffect: isLaserTechnique,
            })
          }
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-bless-gold-light to-bless-gold text-slate-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 transition-all"
        >
          + Adicionar Texto
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0D1630] border border-bless-gold/20 rounded-2xl p-4 sm:p-5 space-y-4">
      {/* Header & Remove Action */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-bless-gold" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Texto ({activeSide === 'verso' ? 'Verso' : 'Frente'})
          </h4>
        </div>
        <button
          onClick={() => setTextElement(null)}
          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 p-1 hover:bg-rose-950/40 rounded-lg transition-colors"
          title="Remover texto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Remover</span>
        </button>
      </div>

      {/* Text Input */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
          Conteúdo do Texto
        </label>
        <input
          type="text"
          value={currentText.text}
          onChange={(e) => handleCreateOrUpdateText('text', e.target.value)}
          placeholder="Ex: Gabriel & Sofia 2026"
          className="w-full bg-slate-900 border border-slate-700 focus:border-bless-gold rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-bless-gold"
        />
      </div>

      {/* Font Family Selector */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
          Família Tipográfica ({GOOGLE_FONTS.length} Fontes Selecionadas)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
          {GOOGLE_FONTS.map((font) => (
            <button
              key={font.name}
              onClick={() => handleCreateOrUpdateText('fontFamily', font.name)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                currentText.fontFamily === font.name
                  ? 'bg-bless-gold/20 border-bless-gold text-bless-gold shadow-gold-glow'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{font.name}</span>
                <span className="text-[9px] text-slate-500">{font.category}</span>
              </div>
              <span
                style={{ fontFamily: font.name }}
                className="text-sm block mt-1 text-slate-100 truncate"
              >
                {currentText.text || font.sample}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Laser Finish Tone / Color */}
      {isLaserTechnique ? (
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Acabamento da Gravação a Laser
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setLaserTone('silver')}
              className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                laserTone === 'silver'
                  ? 'bg-slate-800 border-white text-white shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span className="block w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-white mx-auto mb-1 border border-slate-600"></span>
              Prata / Inox
            </button>
            <button
              onClick={() => setLaserTone('gold')}
              className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                laserTone === 'gold'
                  ? 'bg-amber-950/40 border-bless-gold text-bless-gold shadow-gold-glow'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span className="block w-4 h-4 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 mx-auto mb-1 border border-amber-500"></span>
              Ouro / Latão
            </button>
            <button
              onClick={() => setLaserTone('dark')}
              className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                laserTone === 'dark'
                  ? 'bg-slate-800 border-slate-400 text-slate-200 shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span className="block w-4 h-4 rounded-full bg-slate-900 mx-auto mb-1 border border-slate-600"></span>
              Oxidado Escuro
            </button>
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Cor do Texto
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {['#FFFFFF', '#0A1128', '#CFA758', '#DC2626', '#2563EB', '#16A34A', '#9333EA'].map((col) => (
              <button
                key={col}
                onClick={() => handleCreateOrUpdateText('fontColor', col)}
                style={{ backgroundColor: col }}
                className={`w-7 h-7 rounded-full border-2 transition-transform ${
                  currentText.fontColor === col ? 'scale-125 border-bless-gold' : 'border-slate-700'
                }`}
              />
            ))}
            <input
              type="color"
              value={currentText.fontColor}
              onChange={(e) => handleCreateOrUpdateText('fontColor', e.target.value)}
              className="w-7 h-7 rounded-lg cursor-pointer bg-transparent"
              title="Escolher cor personalizada"
            />
          </div>
        </div>
      )}

      {/* Font Size & Curvature Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div>
          <div className="flex justify-between text-[11px] text-slate-300 mb-1">
            <span>Tamanho da Fonte</span>
            <span className="font-bold text-bless-gold">{currentText.fontSize}px</span>
          </div>
          <input
            type="range"
            min={12}
            max={52}
            value={currentText.fontSize}
            onChange={(e) => handleCreateOrUpdateText('fontSize', Number(e.target.value))}
            className="w-full accent-bless-gold cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] text-slate-300 mb-1">
            <span>Curvatura de Arco</span>
            <span className="font-bold text-bless-gold">
              {currentText.isCurved ? `${currentText.curveRadius}px` : 'Reto'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isCurved"
              checked={currentText.isCurved}
              onChange={(e) => handleCreateOrUpdateText('isCurved', e.target.checked)}
              className="rounded accent-bless-gold"
            />
            <input
              type="range"
              min={60}
              max={180}
              disabled={!currentText.isCurved}
              value={currentText.curveRadius}
              onChange={(e) => handleCreateOrUpdateText('curveRadius', Number(e.target.value))}
              className="flex-1 accent-bless-gold cursor-pointer disabled:opacity-30"
            />
          </div>
        </div>
      </div>

      {/* Formatting buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleCreateOrUpdateText('bold', !currentText.bold)}
            className={`p-2 rounded-lg border text-xs font-bold transition-colors ${
              currentText.bold
                ? 'bg-bless-gold/20 border-bless-gold text-bless-gold'
                : 'border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Negrito"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleCreateOrUpdateText('italic', !currentText.italic)}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              currentText.italic
                ? 'bg-bless-gold/20 border-bless-gold text-bless-gold'
                : 'border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Itálico"
          >
            <Italic className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => handleCreateOrUpdateText('align', 'left')}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              currentText.align === 'left'
                ? 'bg-bless-gold/20 border-bless-gold text-bless-gold'
                : 'border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleCreateOrUpdateText('align', 'center')}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              currentText.align === 'center'
                ? 'bg-bless-gold/20 border-bless-gold text-bless-gold'
                : 'border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleCreateOrUpdateText('align', 'right')}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              currentText.align === 'right'
                ? 'bg-bless-gold/20 border-bless-gold text-bless-gold'
                : 'border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
