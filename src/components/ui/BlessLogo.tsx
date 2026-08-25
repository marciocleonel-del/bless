'use client';

import React from 'react';
import Image from 'next/image';

interface BlessLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  showSlogan?: boolean;
  className?: string;
  variant?: 'full' | 'icon' | 'badge';
}

export const BlessLogo: React.FC<BlessLogoProps> = ({
  size = 'md',
  showSlogan = true,
  className = '',
  variant = 'full',
}) => {
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

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width, height }}
    >
      <div className="relative w-full h-full">
        {/* ======================================================== */}
        {/* 1. EXACT ORIGINAL LOGO LETTERS (100% Transparent BG)     */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            clipPath: 'polygon(19.12% 0%, 100% 0%, 100% 100%, 19.12% 100%)',
          }}
        >
          <Image
            src="/bless-transparent.png"
            alt="Bless - Ideias que Transformam"
            fill
            className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
            priority
          />
        </div>

        {/* ======================================================== */}
        {/* 2. BUTTERFLY WING ONLY (100% Transparent, 3D Flutter)    */}
        {/* Zero background rotation - ONLY the gold lines flap!     */}
        {/* ======================================================== */}
        <div
          id="bless-isolated-wing-3d"
          className="absolute z-20 pointer-events-none animate-wing-3d-clean"
          style={{
            left: '0%',
            top: '18%',
            width: '20%',
            height: '38%',
            transformOrigin: '95.6% 52.6%',
            perspective: '800px',
          }}
        >
          <Image
            src="/bless-wing-transparent.png"
            alt="Bless Wing"
            fill
            className="object-contain filter drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]"
            priority
          />
        </div>

        {/* ======================================================== */}
        {/* 3. FLUID LIQUID GOLD LIGHT SHIMMER FLOW ACROSS LETTERS   */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge z-30 opacity-90"
          style={{
            WebkitMaskImage: 'url(/bless-transparent.png)',
            maskImage: 'url(/bless-transparent.png)',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }}
        >
          <div className="w-full h-full animate-letter-shimmer-flow" />
        </div>

        {/* ======================================================== */}
        {/* 4. SECONDARY SPECULAR GLISTEN ON TYPOGRAPHY EDGES        */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen z-30 opacity-80"
          style={{
            WebkitMaskImage: 'url(/bless-transparent.png)',
            maskImage: 'url(/bless-transparent.png)',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }}
        >
          <div className="w-full h-full animate-letter-glimmer-pulse" />
        </div>
      </div>
    </div>
  );
};
