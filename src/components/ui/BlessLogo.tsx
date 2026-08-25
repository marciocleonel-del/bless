'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export type LogoAnimationOption = 'liquid-sweep' | 'specular-sparkle' | 'golden-aura';

interface BlessLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  showSlogan?: boolean;
  animateWing?: boolean;
  animateGold?: boolean;
  className?: string;
  variant?: 'full' | 'icon' | 'badge';
  option?: LogoAnimationOption;
  showOptionSelector?: boolean;
}

export const BlessLogo: React.FC<BlessLogoProps> = ({
  size = 'md',
  showSlogan = true,
  animateWing = true,
  animateGold = true,
  className = '',
  variant = 'full',
  option: initialOption = 'liquid-sweep',
  showOptionSelector = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<LogoAnimationOption>(initialOption);

  // Dimension mapping
  let width = 280;
  let height = 280;

  if (typeof size === 'number') {
    width = size;
    height = size;
  } else {
    switch (size) {
      case 'sm':
        width = 120;
        height = 120;
        break;
      case 'md':
        width = 220;
        height = 220;
        break;
      case 'lg':
        width = 300;
        height = 300;
        break;
      case 'xl':
        width = 380;
        height = 380;
        break;
      case '2xl':
        width = 460;
        height = 460;
        break;
    }
  }

  // If icon-only variant (Navbar & Mobile)
  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center select-none ${className}`} style={{ width, height }}>
        {/* Base Logo Image */}
        <div className="relative w-full h-full">
          <Image
            src="/bless.png"
            alt="Bless Logo"
            fill
            className="object-contain"
            priority
          />
          {/* Animated 3D Flapping Wing Overlay */}
          {animateWing && (
            <div
              className="absolute left-[3.5%] top-[25.5%] w-[23.5%] h-[30%] pointer-events-none origin-right animate-wing-flap-3d"
              style={{
                transformOrigin: '98% 50%',
                perspective: '600px',
              }}
            >
              <svg viewBox="0 0 100 130" className="w-full h-full overflow-visible" fill="none">
                <defs>
                  <linearGradient id="iconWingGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFA000" />
                    <stop offset="50%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FFF9C4" />
                  </linearGradient>
                </defs>
                <path
                  d="M 96 68 C 80 40, 52 14, 16 6 C 10 4, 6 10, 10 16 C 24 38, 48 60, 96 68 Z"
                  fill="url(#iconWingGold)"
                  fillOpacity="0.35"
                  stroke="#FFD700"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 16 6 C 30 28, 56 50, 96 68 M 24 22 C 40 40, 64 54, 86 64"
                  stroke="#FFF9C4"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M 96 74 C 70 82, 28 94, 20 114 C 18 122, 28 128, 38 120 C 56 108, 76 92, 96 74 Z"
                  fill="url(#iconWingGold)"
                  fillOpacity="0.35"
                  stroke="#FFD700"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 28 116 C 44 104, 64 90, 96 74 M 40 122 C 54 110, 72 96, 90 84"
                  stroke="#FFF9C4"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}

          {/* Shimmer Light Flow Overlay */}
          {animateGold && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-85"
              style={{
                WebkitMaskImage: 'url(/bless.png)',
                maskImage: 'url(/bless.png)',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              }}
            >
              <div className="w-full h-full animate-gold-sweep-fast bg-gradient-to-r from-transparent via-amber-200/90 to-transparent" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Animation Styles CSS Classes
  const getShimmerClass = () => {
    switch (selectedOption) {
      case 'liquid-sweep':
        return 'animate-gold-sweep-smooth bg-gradient-to-r from-transparent via-[#FFEB3B]/90 via-[#FFF9C4] to-transparent';
      case 'specular-sparkle':
        return 'animate-gold-specular-sparkle bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFFFF] via-[#FFD700]/90 to-transparent';
      case 'golden-aura':
        return 'animate-gold-aura-pulse bg-gradient-to-tr from-[#FFA000]/60 via-[#FFD700]/95 via-[#FFFDEB] to-[#FF8F00]/60';
      default:
        return 'animate-gold-sweep-smooth bg-gradient-to-r from-transparent via-[#FFD700]/90 to-transparent';
    }
  };

  const getWingAnimationClass = () => {
    switch (selectedOption) {
      case 'liquid-sweep':
        return 'animate-wing-flutter-realistic';
      case 'specular-sparkle':
        return 'animate-wing-flutter-lively';
      case 'golden-aura':
        return 'animate-wing-flutter-wave';
      default:
        return 'animate-wing-flutter-realistic';
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Main Logo Container */}
      <div
        className="relative flex items-center justify-center overflow-visible"
        style={{ width, height }}
      >
        {/* 1. Exact Original Logo Base Artwork */}
        <div className="relative w-full h-full">
          <Image
            src="/bless.png"
            alt="Bless - Ideias que Transformam"
            fill
            className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.25)]"
            priority
          />

          {/* 2. Interactive 3D Fluttering Butterfly Wing on the Left of B */}
          {animateWing && (
            <div
              id="bless-fluttering-wing"
              className={`absolute pointer-events-none origin-right ${getWingAnimationClass()}`}
              style={{
                left: '3.6%',
                top: '25.6%',
                width: '23.6%',
                height: '30%',
                transformOrigin: '98% 50%',
                perspective: '800px',
                zIndex: 10,
              }}
            >
              <svg viewBox="0 0 120 150" className="w-full h-full overflow-visible" fill="none">
                <defs>
                  <linearGradient id="realWingGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFA000" />
                    <stop offset="30%" stopColor="#FFD700" />
                    <stop offset="70%" stopColor="#FFF9C4" />
                    <stop offset="100%" stopColor="#FFC400" />
                  </linearGradient>
                  <filter id="wingGlowFX" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Upper Wing with Filigree Outline */}
                <path
                  d="M 116 78 C 96 46, 62 16, 20 8 C 12 6, 6 12, 10 20 C 26 46, 56 70, 116 78 Z"
                  fill="url(#realWingGoldGrad)"
                  fillOpacity="0.4"
                  stroke="#FFD700"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#wingGlowFX)"
                />
                {/* Upper Wing Internal Veins */}
                <path
                  d="M 20 8 C 36 34, 66 60, 116 78 M 30 28 C 48 50, 78 66, 104 74 M 44 46 C 60 62, 84 72, 108 76 M 16 16 C 30 38, 54 62, 78 72"
                  stroke="#FFFDEB"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                {/* Lower Wing Outline */}
                <path
                  d="M 116 86 C 84 96, 34 110, 24 134 C 20 144, 32 150, 44 142 C 66 128, 92 108, 116 86 Z"
                  fill="url(#realWingGoldGrad)"
                  fillOpacity="0.4"
                  stroke="#FFD700"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#wingGlowFX)"
                />
                {/* Lower Wing Internal Veins */}
                <path
                  d="M 34 138 C 54 124, 78 106, 116 86 M 48 144 C 66 130, 88 114, 108 98 M 26 128 C 48 114, 74 100, 98 90"
                  stroke="#FFFDEB"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                {/* Sparkling Highlight Dot on Wingtip */}
                <circle cx="20" cy="8" r="3.5" fill="#FFFFFF" className="animate-ping origin-center opacity-80" />
                <circle cx="20" cy="8" r="2.5" fill="#FFFDEB" />
              </svg>
            </div>
          )}

          {/* 3. Pixel-Perfect Dynamic Shimmer / Specular Light Flow Masked Over 100% of the Original Logo */}
          {animateGold && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-color-dodge z-20"
              style={{
                WebkitMaskImage: 'url(/bless.png)',
                maskImage: 'url(/bless.png)',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              }}
            >
              {/* Shimmer Wave Container */}
              <div className={`w-full h-full ${getShimmerClass()}`} />
            </div>
          )}

          {/* 4. Second Specular Glistening Highlights Layer for Sparkles */}
          {animateGold && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-90 z-20"
              style={{
                WebkitMaskImage: 'url(/bless.png)',
                maskImage: 'url(/bless.png)',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              }}
            >
              <div className="w-full h-full animate-gold-glimmer-secondary bg-gradient-to-bl from-transparent via-[#FFF8B3]/60 via-[#FFFFFF]/80 to-transparent" />
            </div>
          )}
        </div>
      </div>

      {/* Interactive 3-Option Selector (Live Preview Controls) */}
      {showOptionSelector && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-bless-gold/30 backdrop-blur-md shadow-xl max-w-lg">
          <button
            onClick={() => setSelectedOption('liquid-sweep')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
              selectedOption === 'liquid-sweep'
                ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 shadow-gold-glow scale-105'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>✨ Opção 1</span>
            <span className="text-[10px] font-normal opacity-90">Ouro Líquido Contínuo</span>
          </button>

          <button
            onClick={() => setSelectedOption('specular-sparkle')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
              selectedOption === 'specular-sparkle'
                ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 shadow-gold-glow scale-105'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>💎 Opção 2</span>
            <span className="text-[10px] font-normal opacity-90">Brilho Espelhado & Cintilância</span>
          </button>

          <button
            onClick={() => setSelectedOption('golden-aura')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
              selectedOption === 'golden-aura'
                ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 shadow-gold-glow scale-105'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>🌟 Opção 3</span>
            <span className="text-[10px] font-normal opacity-90">Aura Dourada 24K & Pulso</span>
          </button>
        </div>
      )}
    </div>
  );
};
