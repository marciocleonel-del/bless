'use client';

import React, { useRef, useState } from 'react';
import { useCustomizerStore } from '@/store/useCustomizerStore';
import { UploadCloud, FileImage, CheckCircle, AlertTriangle, Trash2, ZoomIn, RotateCw, Sparkles } from 'lucide-react';
import { CustomArtElement } from '@/types';

export const FileUploader: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    activeSide,
    frontArt,
    backArt,
    setUploadedArt,
    updateArtTransform,
  } = useCustomizerStore();

  const currentArt = activeSide === 'verso' ? backArt : frontArt;

  const handleFileProcess = (file: File) => {
    setErrorMsg(null);
    const validExtensions = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'application/pdf'];
    const fileName = file.name.toLowerCase();
    const isAiOrEps = fileName.endsWith('.ai') || fileName.endsWith('.eps');

    if (!validExtensions.includes(file.type) && !isAiOrEps) {
      setErrorMsg('Formato não suportado. Envie PNG, JPG, SVG, PDF, AI ou EPS.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg('Arquivo muito grande. O limite máximo é de 25MB.');
      return;
    }

    // If it's a browser-renderable image, create object URL and analyze resolution
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          // DPI / Quality analysis
          let dpiQuality: 'excelente' | 'boa' | 'baixa' = 'boa';
          if (img.width >= 1200 || img.height >= 1200) {
            dpiQuality = 'excelente';
          } else if (img.width < 500 && img.height < 500) {
            dpiQuality = 'baixa';
          }

          const artElement: CustomArtElement = {
            url,
            name: file.name,
            width: img.width,
            height: img.height,
            x: 0,
            y: -20,
            scale: 1,
            rotation: 0,
            dpiQuality,
          };

          setUploadedArt(artElement);
        };
        img.src = url;
      };
      reader.readAsDataURL(file);
    } else {
      // Vector AI/EPS/PDF placeholder representation
      const artElement: CustomArtElement = {
        url: '/bless.png', // fallback preview for vector file
        name: file.name,
        width: 800,
        height: 800,
        x: 0,
        y: -20,
        scale: 1,
        rotation: 0,
        dpiQuality: 'excelente', // Vectors are infinite resolution
      };
      setUploadedArt(artElement);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-[#0D1630] border border-bless-gold/20 rounded-2xl p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-bless-laser-blue" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Upload de Arte/Logo ({activeSide === 'verso' ? 'Verso' : 'Frente'})
          </h4>
        </div>
        {currentArt && (
          <button
            onClick={() => setUploadedArt(null)}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 p-1 hover:bg-rose-950/40 rounded-lg transition-colors"
            title="Remover arte"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remover</span>
          </button>
        )}
      </div>

      {/* Upload Dropzone */}
      {!currentArt ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            isDragOver
              ? 'border-bless-laser-blue bg-bless-laser-blue/10 scale-102'
              : 'border-slate-700 hover:border-bless-gold/50 bg-slate-900/50 hover:bg-slate-900/80'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.svg,.pdf,.ai,.eps"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFileProcess(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          <div className="w-12 h-12 rounded-2xl bg-bless-laser-blue/10 border border-bless-laser-blue/30 flex items-center justify-center text-bless-laser-blue mx-auto mb-3">
            <UploadCloud className="w-6 h-6 animate-pulse" />
          </div>

          <h5 className="text-xs font-bold text-slate-100 mb-1">
            Arraste e solte sua arte aqui ou clique para buscar
          </h5>
          <p className="text-[11px] text-slate-400 mb-2">
            Formatos aceitos: <span className="text-bless-gold font-semibold">PNG, JPG, PDF, SVG, AI, EPS</span> (Máx 25MB)
          </p>

          <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
            <Sparkles className="w-3 h-3 text-bless-gold" />
            Análise automática de resolução e qualidade
          </span>
        </div>
      ) : (
        /* File Active Details & Sliders */
        <div className="space-y-4">
          {/* Active File Card */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-bless-gold shrink-0 border border-slate-700">
                <FileImage className="w-5 h-5" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate max-w-[180px]">
                  {currentArt.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  {currentArt.dpiQuality === 'excelente' && (
                    <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Resolução Excelente (300+ DPI)
                    </span>
                  )}
                  {currentArt.dpiQuality === 'boa' && (
                    <span className="text-[10px] font-semibold text-bless-gold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Qualidade Boa para Impressão
                    </span>
                  )}
                  {currentArt.dpiQuality === 'baixa' && (
                    <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Aviso: Resolução Baixa (Pixelada)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-[11px] text-bless-laser-blue hover:underline font-semibold shrink-0 ml-2"
            >
              Trocar
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.svg,.pdf,.ai,.eps"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileProcess(e.target.files[0]);
                }
              }}
              className="hidden"
            />
          </div>

          {/* Scale & Rotate Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span className="flex items-center gap-1">
                  <ZoomIn className="w-3 h-3 text-bless-laser-blue" />
                  Escala da Imagem
                </span>
                <span className="font-bold text-bless-laser-blue">
                  {Math.round(currentArt.scale * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0.3}
                max={2.5}
                step={0.05}
                value={currentArt.scale}
                onChange={(e) => updateArtTransform({ scale: Number(e.target.value) })}
                className="w-full accent-bless-laser-blue cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span className="flex items-center gap-1">
                  <RotateCw className="w-3 h-3 text-bless-laser-blue" />
                  Rotação do Logo
                </span>
                <span className="font-bold text-bless-laser-blue">
                  {currentArt.rotation}°
                </span>
              </div>
              <input
                type="range"
                min={-180}
                max={180}
                step={5}
                value={currentArt.rotation}
                onChange={(e) => updateArtTransform({ rotation: Number(e.target.value) })}
                className="w-full accent-bless-laser-blue cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {errorMsg && (
        <p className="text-xs text-rose-400 flex items-center gap-1 mt-2">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          {errorMsg}
        </p>
      )}
    </div>
  );
};
