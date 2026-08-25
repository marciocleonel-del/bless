'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useCustomizerStore } from '@/store/useCustomizerStore';
import { RefreshCw, ZoomIn, ZoomOut, RotateCw, Move, Layers, Sparkles, Eye } from 'lucide-react';

export const CanvasMockup: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    currentProduct,
    selectedColor,
    activeSide,
    setActiveSide,
    isTwoSided,
    laserTone,
    frontArt,
    frontText,
    backArt,
    backText,
    activeElement,
    setActiveElement,
    updateArtTransform,
    setTextElement,
  } = useCustomizerStore();

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [artImageCache, setArtImageCache] = useState<HTMLImageElement | null>(null);

  const currentArt = activeSide === 'verso' ? backArt : frontArt;
  const currentText = activeSide === 'verso' ? backText : frontText;
  const isLaserTechnique = currentProduct.technique.includes('Laser');

  // Load and cache uploaded art image
  useEffect(() => {
    if (currentArt?.url) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = currentArt.url;
      img.onload = () => {
        setArtImageCache(img);
      };
    } else {
      setArtImageCache(null);
    }
  }, [currentArt?.url, activeSide]);

  // Main Canvas Rendering Function
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear Canvas with subtle studio background
    ctx.clearRect(0, 0, width, height);

    // Studio radial light background
    const bgGrad = ctx.createRadialGradient(centerX, centerY - 50, 40, centerX, centerY, width * 0.7);
    bgGrad.addColorStop(0, '#132042');
    bgGrad.addColorStop(1, '#070D1E');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Grid guide lines (subtle studio floor)
    ctx.strokeStyle = 'rgba(207, 167, 88, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 40; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let j = 40; j < height; j += 40) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(width, j);
      ctx.stroke();
    }

    // Draw realistic product mockup base
    ctx.save();
    drawProductMockup(ctx, currentProduct.mockup.type, selectedColor.hex, width, height);
    ctx.restore();

    // Clip to printable area
    const pArea = currentProduct.mockup.printableArea;
    const printX = (pArea.xPercent / 100) * width;
    const printY = (pArea.yPercent / 100) * height;
    const printW = (pArea.widthPercent / 100) * width;
    const printH = (pArea.heightPercent / 100) * height;
    const printCenterX = printX + printW / 2;
    const printCenterY = printY + printH / 2;

    // Draw dashed bounding box for printable area
    ctx.save();
    ctx.strokeStyle = 'rgba(207, 167, 88, 0.35)';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(printX, printY, printW, printH);
    ctx.restore();

    // Render Uploaded Art (if available)
    if (artImageCache && currentArt) {
      ctx.save();
      // Clip to printable bounding box
      ctx.beginPath();
      ctx.rect(printX, printY, printW, printH);
      ctx.clip();

      const artX = printCenterX + currentArt.x;
      const artY = printCenterY + currentArt.y;

      ctx.translate(artX, artY);
      ctx.rotate((currentArt.rotation * Math.PI) / 180);

      const targetW = 140 * currentArt.scale;
      const aspect = artImageCache.width / (artImageCache.height || 1);
      const targetH = targetW / aspect;

      if (isLaserTechnique) {
        // Laser effect filter
        ctx.drawImage(artImageCache, -targetW / 2, -targetH / 2, targetW, targetH);
        ctx.globalCompositeOperation = 'source-in';
        
        // Metallic laser tone gradient
        const laserGrad = ctx.createLinearGradient(-targetW / 2, -targetH / 2, targetW / 2, targetH / 2);
        if (laserTone === 'gold') {
          laserGrad.addColorStop(0, '#FFF5D1');
          laserGrad.addColorStop(0.5, '#D4AF37');
          laserGrad.addColorStop(1, '#99731C');
        } else if (laserTone === 'dark') {
          laserGrad.addColorStop(0, '#475569');
          laserGrad.addColorStop(0.5, '#1E293B');
          laserGrad.addColorStop(1, '#0F172A');
        } else {
          laserGrad.addColorStop(0, '#FFFFFF');
          laserGrad.addColorStop(0.4, '#E2E8F0');
          laserGrad.addColorStop(0.7, '#94A3B8');
          laserGrad.addColorStop(1, '#F8FAFC');
        }
        ctx.fillStyle = laserGrad;
        ctx.fillRect(-targetW / 2, -targetH / 2, targetW, targetH);

        // Highlight sheen
        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowColor = laserTone === 'gold' ? 'rgba(212, 175, 55, 0.4)' : 'rgba(255, 255, 255, 0.3)';
        ctx.shadowBlur = 4;
      } else {
        // HD Sublimation with full colors
        ctx.drawImage(artImageCache, -targetW / 2, -targetH / 2, targetW, targetH);
      }

      // If active element is art, draw selection border
      if (activeElement === 'art') {
        ctx.strokeStyle = '#00D4FF';
        ctx.setLineDash([2, 2]);
        ctx.lineWidth = 2;
        ctx.strokeRect(-targetW / 2 - 4, -targetH / 2 - 4, targetW + 8, targetH + 8);
      }

      ctx.restore();
    }

    // Render Custom Text Element (if available)
    if (currentText && currentText.text.trim()) {
      ctx.save();
      // Clip to printable area
      ctx.beginPath();
      ctx.rect(printX, printY, printW, printH);
      ctx.clip();

      const textX = printCenterX + currentText.x;
      const textY = printCenterY + currentText.y;

      ctx.translate(textX, textY);
      ctx.rotate((currentText.rotation * Math.PI) / 180);

      const fontStyle = `${currentText.italic ? 'italic ' : ''}${currentText.bold ? 'bold ' : ''}${currentText.fontSize}px '${currentText.fontFamily}', sans-serif`;
      ctx.font = fontStyle;
      ctx.textAlign = currentText.align;
      ctx.textBaseline = 'middle';

      if (isLaserTechnique || currentText.laserEffect) {
        // Metallic laser text gradient
        const textGrad = ctx.createLinearGradient(-100, -20, 100, 20);
        if (laserTone === 'gold') {
          textGrad.addColorStop(0, '#FFFBEB');
          textGrad.addColorStop(0.4, '#F59E0B');
          textGrad.addColorStop(0.7, '#D97706');
          textGrad.addColorStop(1, '#FDE68A');
        } else if (laserTone === 'dark') {
          textGrad.addColorStop(0, '#64748B');
          textGrad.addColorStop(0.5, '#334155');
          textGrad.addColorStop(1, '#0F172A');
        } else {
          textGrad.addColorStop(0, '#FFFFFF');
          textGrad.addColorStop(0.3, '#E2E8F0');
          textGrad.addColorStop(0.7, '#94A3B8');
          textGrad.addColorStop(1, '#FFFFFF');
        }
        ctx.fillStyle = textGrad;
        ctx.shadowColor = laserTone === 'gold' ? 'rgba(217, 119, 6, 0.5)' : 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = 6;
      } else {
        ctx.fillStyle = currentText.fontColor;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
        ctx.shadowBlur = 2;
      }

      if (currentText.isCurved) {
        drawCurvedText(ctx, currentText.text, 0, 0, currentText.curveRadius || 120);
      } else {
        ctx.fillText(currentText.text, 0, 0);
      }

      // If active element is text, draw selection handles
      if (activeElement === 'text') {
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#CFA758';
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1.5;
        const textMetrics = ctx.measureText(currentText.text);
        const textW = textMetrics.width + 16;
        const textH = currentText.fontSize + 12;
        ctx.strokeRect(-textW / 2, -textH / 2, textW, textH);
      }

      ctx.restore();
    }

    // Realistic Lighting & Glass/Metal Gloss Overlay
    ctx.save();
    drawProductGlossOverlay(ctx, currentProduct.mockup.type, width, height);
    ctx.restore();

  }, [
    currentProduct,
    selectedColor,
    activeSide,
    laserTone,
    frontArt,
    frontText,
    backArt,
    backText,
    activeElement,
    artImageCache,
    isLaserTechnique,
  ]);

  // Redraw when dependencies change
  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Handle Mouse/Touch Drag for positioning elements on canvas
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setIsDragging(true);
    setDragStart({ x, y });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const currentX = (e.clientX - rect.left) * scaleX;
    const currentY = (e.clientY - rect.top) * scaleY;

    const deltaX = currentX - dragStart.x;
    const deltaY = currentY - dragStart.y;

    if (activeElement === 'art' && currentArt) {
      updateArtTransform({
        x: currentArt.x + deltaX,
        y: currentArt.y + deltaY,
      });
      setDragStart({ x: currentX, y: currentY });
    } else if (activeElement === 'text' && currentText) {
      setTextElement({
        x: currentText.x + deltaX,
        y: currentText.y + deltaY,
      });
      setDragStart({ x: currentX, y: currentY });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Top Mockup Controls Bar */}
      <div className="w-full flex items-center justify-between px-3 py-2 bg-[#0A1128] border border-bless-gold/30 rounded-2xl mb-3 shadow-lg">
        {/* Side Selector (Frente vs Verso) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSide('frente')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSide === 'frente'
                ? 'bg-gradient-to-r from-bless-gold-light to-bless-gold text-slate-950 shadow-gold-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Frente
          </button>
          <button
            onClick={() => setActiveSide('verso')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSide === 'verso'
                ? 'bg-gradient-to-r from-bless-gold-light to-bless-gold text-slate-950 shadow-gold-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Verso {isTwoSided ? '(Ativado +R$10)' : '(2º Lado)'}
          </button>
        </div>

        {/* Selected Element Pill */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300">
          <span className="text-[11px] text-slate-500">Editando:</span>
          <button
            onClick={() => setActiveElement(activeElement === 'text' ? null : 'text')}
            className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
              activeElement === 'text'
                ? 'bg-bless-gold/20 border-bless-gold text-bless-gold-light'
                : 'border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Texto
          </button>
          <button
            onClick={() => setActiveElement(activeElement === 'art' ? null : 'art')}
            className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
              activeElement === 'art'
                ? 'bg-bless-laser-blue/20 border-bless-laser-blue text-bless-laser-blue'
                : 'border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Logotipo/Arte
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (activeElement === 'art' && currentArt) {
                updateArtTransform({ x: 0, y: 0, rotation: 0, scale: 1 });
              } else if (activeElement === 'text' && currentText) {
                setTextElement({ x: 0, y: 40, rotation: 0 });
              }
            }}
            title="Centralizar elemento selecionado"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[460px] aspect-square rounded-3xl overflow-hidden border border-bless-gold/40 shadow-2xl bg-[#070D1E] flex items-center justify-center mockup-canvas-wrapper"
      >
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-full object-contain cursor-grab active:cursor-grabbing"
        />

        {/* Live Technology Watermark Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A1128]/90 backdrop-blur-md border border-bless-gold/30 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-bless-gold" />
          <span className="text-[11px] font-bold text-slate-200">
            {currentProduct.technique}
          </span>
        </div>

        {/* Drag Helper Tip */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-slate-300 flex items-center gap-1 pointer-events-none">
          <Move className="w-3 h-3 text-bless-gold" />
          <span>Arraste o elemento diretamente no produto para posicionar</span>
        </div>
      </div>
    </div>
  );
};

// Helper function to draw curved text on canvas
function drawCurvedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  centerY: number,
  radius: number
) {
  const chars = text.split('');
  const totalAngle = (text.length * 14 * Math.PI) / 180;
  const startAngle = -Math.PI / 2 - totalAngle / 2;

  chars.forEach((char, i) => {
    const angle = startAngle + (i / (chars.length - 1 || 1)) * totalAngle;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });
}

// Draw Realistic Product Mockup Silhouettes
function drawProductMockup(
  ctx: CanvasRenderingContext2D,
  type: string,
  colorHex: string,
  w: number,
  h: number
) {
  const cx = w / 2;
  const cy = h / 2;

  if (type === 'copo') {
    // Copo Térmico 473ml (Estilo Stanley com parede cônica e anel inox superior)
    const topY = cy - 180;
    const botY = cy + 180;
    const topW = 160;
    const botW = 120;

    // Body Gradient
    const bodyGrad = ctx.createLinearGradient(cx - topW / 2, 0, cx + topW / 2, 0);
    bodyGrad.addColorStop(0, colorHex);
    bodyGrad.addColorStop(0.3, adjustBrightness(colorHex, 30));
    bodyGrad.addColorStop(0.6, colorHex);
    bodyGrad.addColorStop(1, adjustBrightness(colorHex, -40));

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(cx, botY + 15, botW / 2 + 10, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.beginPath();
    ctx.moveTo(cx - topW / 2, topY + 30);
    ctx.lineTo(cx + topW / 2, topY + 30);
    ctx.lineTo(cx + botW / 2, botY);
    ctx.quadraticCurveTo(cx, botY + 12, cx - botW / 2, botY);
    ctx.closePath();
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // Top Inox Rim
    const inoxGrad = ctx.createLinearGradient(cx - topW / 2, 0, cx + topW / 2, 0);
    inoxGrad.addColorStop(0, '#94A3B8');
    inoxGrad.addColorStop(0.4, '#FFFFFF');
    inoxGrad.addColorStop(0.7, '#64748B');
    inoxGrad.addColorStop(1, '#CBD5E1');

    ctx.beginPath();
    ctx.roundRect(cx - topW / 2 - 2, topY, topW + 4, 30, [10, 10, 0, 0]);
    ctx.fillStyle = inoxGrad;
    ctx.fill();

    // Lid (Tampa)
    ctx.beginPath();
    ctx.roundRect(cx - topW / 2 + 8, topY - 14, topW - 16, 16, [6, 6, 0, 0]);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fill();
  } else if (type === 'caneca') {
    // Caneca Cerâmica 325ml com Alça
    const mugX = cx - 75;
    const mugY = cy - 130;
    const mugW = 150;
    const mugH = 210;

    // Handle (Alça)
    ctx.beginPath();
    ctx.arc(cx + 80, cy - 20, 50, -Math.PI / 2, Math.PI / 2);
    ctx.lineWidth = 26;
    ctx.strokeStyle = colorHex === '#FFFFFF' ? '#E2E8F0' : colorHex;
    ctx.stroke();

    // Handle highlight
    ctx.beginPath();
    ctx.arc(cx + 80, cy - 20, 50, -Math.PI / 2, Math.PI / 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.stroke();

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(cx, mugY + mugH + 10, mugW / 2 + 15, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body
    const mugGrad = ctx.createLinearGradient(mugX, 0, mugX + mugW, 0);
    mugGrad.addColorStop(0, colorHex);
    mugGrad.addColorStop(0.35, adjustBrightness(colorHex, 20));
    mugGrad.addColorStop(0.7, colorHex);
    mugGrad.addColorStop(1, adjustBrightness(colorHex, -25));

    ctx.beginPath();
    ctx.roundRect(mugX, mugY, mugW, mugH, [12, 12, 20, 20]);
    ctx.fillStyle = mugGrad;
    ctx.fill();

    // Top Rim ellipse
    ctx.beginPath();
    ctx.ellipse(cx, mugY, mugW / 2, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = adjustBrightness(colorHex, 35);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.stroke();
  } else if (type === 'azulejo') {
    // Azulejo 20x20 com Suporte de Madeira
    const tileW = 280;
    const tileH = 280;
    const tileX = cx - tileW / 2;
    const tileY = cy - tileH / 2 - 20;

    // Wooden Stand
    ctx.fillStyle = '#78350F';
    ctx.beginPath();
    ctx.moveTo(tileX + 30, tileY + tileH);
    ctx.lineTo(tileX + 70, tileY + tileH + 40);
    ctx.lineTo(tileX + 50, tileY + tileH + 40);
    ctx.lineTo(tileX + 20, tileY + tileH);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(tileX + tileW - 30, tileY + tileH);
    ctx.lineTo(tileX + tileW - 70, tileY + tileH + 40);
    ctx.lineTo(tileX + tileW - 50, tileY + tileH + 40);
    ctx.lineTo(tileX + tileW - 20, tileY + tileH);
    ctx.fill();

    // Tile Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.roundRect(tileX + 10, tileY + 15, tileW, tileH, 8);
    ctx.fill();

    // Tile Body
    ctx.fillStyle = colorHex;
    ctx.beginPath();
    ctx.roundRect(tileX, tileY, tileW, tileH, 8);
    ctx.fill();

    // Ceramic Enameled Bevel Edge
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 4;
    ctx.strokeRect(tileX + 2, tileY + 2, tileW - 4, tileH - 4);
  } else if (type === 'chaveiro') {
    // Chaveiro de Acrílico com Argola Metálica
    const keyW = 200;
    const keyH = 200;
    const keyX = cx - keyW / 2;
    const keyY = cy - keyH / 2 + 20;

    // Metal Ring (Argola)
    ctx.beginPath();
    ctx.arc(cx, keyY - 40, 26, 0, Math.PI * 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#E2E8F0';
    ctx.stroke();

    // Chain links
    ctx.beginPath();
    ctx.arc(cx, keyY - 10, 10, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#94A3B8';
    ctx.stroke();

    // Acrylic Body
    ctx.fillStyle = colorHex === '#E2E8F0' ? 'rgba(226, 232, 240, 0.25)' : colorHex;
    ctx.beginPath();
    ctx.roundRect(keyX, keyY, keyW, keyH, 24);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 3;
    ctx.stroke();
  } else {
    // Generic / Garrafa / Camiseta
    const boxW = 220;
    const boxH = 320;
    const boxX = cx - boxW / 2;
    const boxY = cy - boxH / 2;

    ctx.fillStyle = colorHex;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 20);
    ctx.fill();
  }
}

// Specular Highlight Overlay
function drawProductGlossOverlay(
  ctx: CanvasRenderingContext2D,
  type: string,
  w: number,
  h: number
) {
  const cx = w / 2;
  const cy = h / 2;

  // Specular lighting sheen across left side
  const sheenGrad = ctx.createLinearGradient(cx - 100, 0, cx + 100, 0);
  sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
  sheenGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.35)');
  sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
  sheenGrad.addColorStop(1, 'rgba(0, 0, 0, 0.2)');

  ctx.fillStyle = sheenGrad;
  ctx.fillRect(cx - 120, cy - 200, 240, 400);
}

// Color Utility
function adjustBrightness(col: string, percent: number) {
  const num = parseInt(col.replace('#', ''), 16);
  if (isNaN(num)) return col;
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const B = ((num >> 8) & 0x00ff) + amt;
  const G = (num & 0x0000ff) + amt;

  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  );
}
