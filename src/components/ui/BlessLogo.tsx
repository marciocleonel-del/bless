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

  // Icon Variant (Navbar & Mobile)
  if (variant === 'icon') {
    return (
      <div
        className={`relative inline-flex items-center justify-center select-none ${className}`}
        style={{ width, height }}
      >
        <div className="relative w-full h-full">
          {/* Exact Pristine Original Logo Image */}
          <Image
            src="/bless.png"
            alt="Bless Logo"
            fill
            className="object-contain"
            priority
          />

          {/* Smooth Golden Sheen Movement across the letters */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-color-dodge z-10"
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
            <div className="w-full h-full animate-letter-shimmer-flow" />
          </div>
        </div>
      </div>
    );
  }

  // Full Logo with Exact Original Wing & Animated Lettering Movement
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <div
        className="relative flex items-center justify-center overflow-visible"
        style={{ width, height }}
      >
        {/* Container for the logo */}
        <div className="relative w-full h-full group">
          {/* 1. Exact Original Logo Base Artwork (Pristine Wing & Lettering) */}
          <Image
            src="/bless.png"
            alt="Bless - Ideias que Transformam"
            fill
            className="object-contain drop-shadow-[0_0_20px_rgba(255,215,0,0.2)]"
            priority
          />

          {/* 2. Primary Luminous Golden Light Wave Moving Across the Letters */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-color-dodge z-10"
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
            <div className="w-full h-full animate-letter-shimmer-flow" />
          </div>

          {/* 3. Secondary Radiant Specular Reflection Passing Over the Letters */}
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
            <div className="w-full h-full animate-letter-glimmer-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
