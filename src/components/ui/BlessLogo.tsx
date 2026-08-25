'use client';

import React from 'react';

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
      <svg
        viewBox="0 0 5000 5000"
        width={width}
        height={height}
        className="overflow-visible w-full h-full"
      >
        <defs>
          {/* 1. Exact Clip Path for the Letters (100% of Original Typography: B, L, E, S, S, Slogan, Heart) */}
          <clipPath id="exactLettersClip">
            <polygon points="956,0 5000,0 5000,5000 956,5000" />
          </clipPath>

          {/* 2. Exact Clip Path for the Butterfly Wing (Strictly to the left of the stem of B) */}
          <clipPath id="exactWingClip">
            <polygon points="0,0 956,0 956,5000 0,5000" />
          </clipPath>

          {/* Moving 24K Liquid Gold Shimmer Gradient for Typography */}
          <linearGradient id="blessLetterGoldSweep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFA000">
              <animate
                attributeName="stop-color"
                values="#FFA000; #FFD700; #FFFDEB; #FFC400; #FFA000"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="25%" stopColor="#FFD700">
              <animate
                attributeName="stop-color"
                values="#FFD700; #FFFDEB; #FFD700; #FFA000; #FFD700"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#FFFDEB">
              <animate
                attributeName="stop-color"
                values="#FFFDEB; #FFD700; #FFA000; #FFC400; #FFFDEB"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="75%" stopColor="#FFC400">
              <animate
                attributeName="stop-color"
                values="#FFC400; #FFA000; #FFD700; #FFFDEB; #FFC400"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#FFA000">
              <animate
                attributeName="stop-color"
                values="#FFA000; #FFD700; #FFFDEB; #FFC400; #FFA000"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Golden Glow Filter */}
          <filter id="blessOriginalLettersGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="35" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. WING GROUP: 3D FLUTTERING ANCHORED AT THE STEM OF B   */}
        {/* ======================================================== */}
        <g
          id="bless-exact-wing-group"
          className="animate-wing-3d-perfect"
          style={{
            transformOrigin: '956px 1900px',
            transformBox: 'fill-box',
          }}
        >
          {/* Exact original high-res wing image pixels */}
          <image
            href="/bless.png"
            width="5000"
            height="5000"
            clipPath="url(#exactWingClip)"
          />
        </g>

        {/* ======================================================== */}
        {/* 2. LETTERS GROUP: 100% EXACT ORIGINAL TYPOGRAPHY         */}
        {/* ======================================================== */}
        <g id="bless-exact-letters-group">
          {/* Exact original high-res letters image pixels (B, L, E, S, S, Slogan, Heart) */}
          <image
            href="/bless.png"
            width="5000"
            height="5000"
            clipPath="url(#exactLettersClip)"
          />
        </g>
      </svg>

      {/* 3. Fluid Liquid Gold Light Shimmer Sweep Masked Over 100% of the Original Letters */}
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
        <div className="w-full h-full animate-letter-shimmer-flow" />
      </div>

      {/* 4. Secondary Specular Glistening Highlights Layer for Typography Curves */}
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
  );
};
