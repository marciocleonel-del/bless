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
        <div className="relative w-full h-full logo-3d-emboss">
          {/* Pristine Original Logo Image */}
          <Image
            src="/bless.png"
            alt="Bless Logo"
            fill
            className="object-contain"
            priority
          />

          {/* 3D Fluttering Wing Overlay (Anchored to B) */}
          <div
            className="absolute left-[3.5%] top-[25.5%] w-[23.5%] h-[30%] pointer-events-none origin-right animate-wing-3d-relief"
            style={{
              transformOrigin: '98% 50%',
              perspective: '600px',
            }}
          >
            <svg viewBox="0 0 100 130" className="w-full h-full overflow-visible" fill="none">
              <defs>
                <linearGradient id="icon3DWingGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFA000" />
                  <stop offset="50%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFFDEB" />
                </linearGradient>
              </defs>
              <path
                d="M 96 68 C 80 40, 52 14, 16 6 C 10 4, 6 10, 10 16 C 24 38, 48 60, 96 68 Z"
                fill="url(#icon3DWingGold)"
                fillOpacity="0.3"
                stroke="#FFD700"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 16 6 C 30 28, 56 50, 96 68 M 24 22 C 40 40, 64 54, 86 64"
                stroke="#FFFDEB"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M 96 74 C 70 82, 28 94, 20 114 C 18 122, 28 128, 38 120 C 56 108, 76 92, 96 74 Z"
                fill="url(#icon3DWingGold)"
                fillOpacity="0.3"
                stroke="#FFD700"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 28 116 C 44 104, 64 90, 96 74 M 40 122 C 54 110, 72 96, 90 84"
                stroke="#FFFDEB"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Full High-Definition Logo with 3D Emboss / Alto-Relevo & Wing Flutter
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width, height }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* 1. Base Pristine Original Logo Image with 3D Alto-Relevo Depth */}
        <div className="relative w-full h-full logo-3d-emboss">
          <Image
            src="/bless.png"
            alt="Bless - Ideias que Transformam"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* 2. 3D Fluttering Butterfly Wing (Only the Wing Moves in 3D, Anchored to B) */}
        <div
          id="bless-fluttering-wing-3d"
          className="absolute pointer-events-none animate-wing-3d-relief z-20"
          style={{
            left: '3.6%',
            top: '25.6%',
            width: '23.8%',
            height: '30%',
            transformOrigin: '98% 50%',
            perspective: '800px',
          }}
        >
          <svg viewBox="0 0 120 150" className="w-full h-full overflow-visible" fill="none">
            <defs>
              <linearGradient id="embossWingGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFA000" />
                <stop offset="35%" stopColor="#FFD700" />
                <stop offset="75%" stopColor="#FFFDEB" />
                <stop offset="100%" stopColor="#FFC400" />
              </linearGradient>
              <filter id="wingEmbossGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Upper Wing Outer Loop with 3D Depth */}
            <path
              d="M 116 78 C 96 46, 62 16, 20 8 C 12 6, 6 12, 10 20 C 26 46, 56 70, 116 78 Z"
              fill="url(#embossWingGoldGrad)"
              fillOpacity="0.32"
              stroke="#FFD700"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#wingEmbossGlow)"
            />

            {/* Upper Wing Internal Filigree Veins */}
            <path
              d="M 20 8 C 36 34, 66 60, 116 78 M 30 28 C 48 50, 78 66, 104 74 M 44 46 C 60 62, 84 72, 108 76 M 16 16 C 30 38, 54 62, 78 72"
              stroke="#FFFDEB"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Lower Wing Outer Loop */}
            <path
              d="M 116 86 C 84 96, 34 110, 24 134 C 20 144, 32 150, 44 142 C 66 128, 92 108, 116 86 Z"
              fill="url(#embossWingGoldGrad)"
              fillOpacity="0.32"
              stroke="#FFD700"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#wingEmbossGlow)"
            />

            {/* Lower Wing Internal Veins */}
            <path
              d="M 34 138 C 54 124, 78 106, 116 86 M 48 144 C 66 130, 88 114, 108 98 M 26 128 C 48 114, 74 100, 98 90"
              stroke="#FFFDEB"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Radiant Sparkle at Wingtip */}
            <circle cx="20" cy="8" r="3" fill="#FFFFFF" className="animate-ping origin-center opacity-70" />
            <circle cx="20" cy="8" r="2" fill="#FFFDEB" />
          </svg>
        </div>

        {/* 3. Luminous 3D Specular Sheen Passing Across the Embossed Artwork */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-30">
          <div className="w-[180%] h-full animate-specular-light-pass" />
        </div>
      </div>
    </div>
  );
};
