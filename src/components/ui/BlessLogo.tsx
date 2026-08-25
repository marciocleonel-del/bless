'use client';

import React from 'react';

interface BlessLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  showSlogan?: boolean;
  animateWing?: boolean;
  animateGold?: boolean;
  className?: string;
  variant?: 'full' | 'icon' | 'badge';
}

export const BlessLogo: React.FC<BlessLogoProps> = ({
  size = 'md',
  showSlogan = true,
  animateWing = true,
  animateGold = true,
  className = '',
  variant = 'full',
}) => {
  let width = 240;
  let height = 240;

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
        width = 200;
        height = 200;
        break;
      case 'lg':
        width = 280;
        height = 280;
        break;
      case 'xl':
        width = 360;
        height = 360;
        break;
      case '2xl':
        width = 440;
        height = 440;
        break;
    }
  }

  // Icon Only (for Navbar & Mobile)
  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
        <svg
          viewBox="0 0 160 160"
          width={width}
          height={height}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* Vibrant Yellow-Gold Moving Shimmer Gradient */}
            <linearGradient id="blessVibrantGoldIcon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFA000">
                {animateGold && (
                  <animate
                    attributeName="stop-color"
                    values="#FFA000; #FFD700; #FFF9C4; #FFC400; #FFA000"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                )}
              </stop>
              <stop offset="25%" stopColor="#FFD700">
                {animateGold && (
                  <animate
                    attributeName="stop-color"
                    values="#FFD700; #FFF9C4; #FFD700; #FFA000; #FFD700"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                )}
              </stop>
              <stop offset="50%" stopColor="#FFF9C4">
                {animateGold && (
                  <animate
                    attributeName="stop-color"
                    values="#FFF9C4; #FFD700; #FFA000; #FFC400; #FFF9C4"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                )}
              </stop>
              <stop offset="75%" stopColor="#FFC400">
                {animateGold && (
                  <animate
                    attributeName="stop-color"
                    values="#FFC400; #FFA000; #FFD700; #FFF9C4; #FFC400"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                )}
              </stop>
              <stop offset="100%" stopColor="#FFA000">
                {animateGold && (
                  <animate
                    attributeName="stop-color"
                    values="#FFA000; #FFD700; #FFF9C4; #FFC400; #FFA000"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                )}
              </stop>
            </linearGradient>

            <filter id="vibrantGoldGlowIcon" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Butterfly Wing with 3D Flutter */}
          <g
            className={animateWing ? 'animate-butterfly-wing' : ''}
            style={{
              transformOrigin: '76px 82px',
              transformBox: 'fill-box',
            }}
          >
            {/* Upper Wing */}
            <path
              d="M 74 76 C 60 48, 40 18, 16 12 C 12 11, 8 15, 11 20 C 20 40, 36 62, 74 76 Z"
              fill="url(#blessVibrantGoldIcon)"
              fillOpacity="0.15"
              stroke="url(#blessVibrantGoldIcon)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Wing Veins */}
            <path
              d="M 16 12 C 28 34, 44 56, 74 76 M 22 28 C 36 46, 52 62, 68 72 M 32 44 C 44 54, 56 64, 70 72"
              stroke="url(#blessVibrantGoldIcon)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Lower Wing */}
            <path
              d="M 74 84 C 52 90, 20 102, 16 122 C 14 130, 24 134, 34 126 C 48 116, 62 100, 74 84 Z"
              fill="url(#blessVibrantGoldIcon)"
              fillOpacity="0.15"
              stroke="url(#blessVibrantGoldIcon)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Lower Wing Veins */}
            <path
              d="M 28 122 C 40 110, 54 96, 74 84 M 38 128 C 50 114, 62 100, 72 90"
              stroke="url(#blessVibrantGoldIcon)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>

          {/* Letter B */}
          <g filter="url(#vibrantGoldGlowIcon)">
            <path
              d="M 74 24 L 88 24 C 110 24, 122 36, 122 52 C 122 64, 114 74, 102 78 C 118 82, 128 94, 128 112 C 128 132, 110 144, 88 144 L 74 144 Z"
              stroke="url(#blessVibrantGoldIcon)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M 82 28 L 82 140 M 82 78 L 102 78"
              stroke="url(#blessVibrantGoldIcon)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    );
  }

  // Full Logo with Exact Original Serif Proportions & Vibrant Yellow-Gold
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 540 460"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Vibrant Vivid 24K Yellow-Gold Shimmer Gradient */}
          <linearGradient id="blessVibrantGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA000">
              {animateGold && (
                <animate
                  attributeName="stop-color"
                  values="#FFA000; #FFD700; #FFFDEB; #FFC400; #FFA000"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="25%" stopColor="#FFD700">
              {animateGold && (
                <animate
                  attributeName="stop-color"
                  values="#FFD700; #FFFDEB; #FFD700; #FFA000; #FFD700"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="50%" stopColor="#FFFDEB">
              {animateGold && (
                <animate
                  attributeName="stop-color"
                  values="#FFFDEB; #FFD700; #FFA000; #FFC400; #FFFDEB"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="75%" stopColor="#FFC400">
              {animateGold && (
                <animate
                  attributeName="stop-color"
                  values="#FFC400; #FFA000; #FFD700; #FFFDEB; #FFC400"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="100%" stopColor="#FFA000">
              {animateGold && (
                <animate
                  attributeName="stop-color"
                  values="#FFA000; #FFD700; #FFFDEB; #FFC400; #FFA000"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
          </linearGradient>

          {/* Radiant Gold Glow Filter */}
          <filter id="vibrantGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. BUTTERFLY WING WITH VIBRANT 3D FLUTTERING MOTION      */}
        {/* ======================================================== */}
        <g
          id="butterfly-wing-vibrant"
          className={animateWing ? 'animate-wing-flutter' : ''}
          style={{
            transformOrigin: '112px 210px',
            transformBox: 'fill-box',
          }}
        >
          {/* Upper Wing Outer Loop */}
          <path
            d="M 112 198 C 96 142, 68 76, 28 54 C 18 49, 10 58, 16 70 C 30 106, 54 164, 112 198 Z"
            fill="url(#blessVibrantGold)"
            fillOpacity="0.14"
            stroke="url(#blessVibrantGold)"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Upper Wing Detailed Filigree Veins */}
          <path
            d="M 28 54 C 44 94, 70 148, 112 198 M 38 86 C 56 122, 80 158, 106 186 M 52 118 C 70 146, 88 170, 108 190 M 24 68 C 36 90, 60 130, 82 168 M 68 142 C 82 164, 96 182, 110 194"
            stroke="url(#blessVibrantGold)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Lower Wing Outer Loop */}
          <path
            d="M 112 218 C 78 228, 36 244, 30 278 C 24 294, 40 304, 56 292 C 78 274, 98 248, 112 218 Z"
            fill="url(#blessVibrantGold)"
            fillOpacity="0.14"
            stroke="url(#blessVibrantGold)"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Lower Wing Filigree Veins */}
          <path
            d="M 44 286 C 64 266, 84 242, 112 218 M 56 296 C 74 276, 92 252, 108 230 M 34 270 C 56 250, 80 232, 100 220 M 70 282 C 86 264, 100 242, 110 224"
            stroke="url(#blessVibrantGold)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Antenna / Swirl */}
          <path
            d="M 112 196 C 104 174, 92 150, 78 138 C 70 130, 60 134, 62 144 C 68 156, 84 178, 112 202"
            stroke="url(#blessVibrantGold)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>

        {/* ======================================================== */}
        {/* 2. ORIGINAL TYPOGRAPHY "B L E S S" IN VIBRANT GOLD       */}
        {/* ======================================================== */}
        <g id="bless-original-typography" filter="url(#vibrantGoldGlow)">
          {/* LETTER B */}
          <path
            d="M 112 114 L 134 114 C 172 114, 198 136, 198 166 C 198 188, 182 204, 162 210 C 188 218, 210 238, 210 274 C 210 310, 176 334, 134 334 L 112 334 Z"
            stroke="url(#blessVibrantGold)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Stem of B with graceful curve */}
          <path
            d="M 124 120 L 124 328 M 124 210 L 162 210 M 124 114 C 104 114, 92 138, 92 160 C 92 184, 108 208, 124 210"
            stroke="url(#blessVibrantGold)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />

          {/* LETTER L (Original Serif Style) */}
          <g transform="translate(222, 0)">
            {/* Vertical stem with serifs */}
            <path
              d="M 12 114 L 28 114 L 28 322 L 68 322 L 68 334 L 6 334 L 6 322 L 12 322 Z"
              fill="url(#blessVibrantGold)"
            />
            {/* Top Serif */}
            <path d="M 6 114 L 34 114" stroke="url(#blessVibrantGold)" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* LETTER E (Original Serif Style) */}
          <g transform="translate(300, 0)">
            <path
              d="M 12 114 L 62 114 L 62 126 L 28 126 L 28 214 L 54 214 L 54 226 L 28 226 L 28 322 L 64 322 L 64 334 L 12 334 Z"
              fill="url(#blessVibrantGold)"
            />
            {/* Top & Bottom serifs */}
            <path
              d="M 6 114 L 28 114 M 6 334 L 28 334 M 58 114 L 62 134 M 60 314 L 64 334"
              stroke="url(#blessVibrantGold)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* LETTER S (First - High-contrast Didot Curve) */}
          <g transform="translate(378, 0)">
            <path
              d="M 54 146 C 48 128, 36 116, 20 116 C 6 116, -4 128, -4 144 C -4 162, 8 176, 28 190 C 50 204, 62 222, 62 248 C 62 276, 42 300, 14 300 C -4 300, -16 286, -20 264 L -8 260 C -4 276, 4 286, 16 286 C 30 286, 40 272, 40 250 C 40 232, 28 218, 8 204 C -12 188, -24 172, -24 146 C -24 122, -6 102, 20 102 C 38 102, 52 114, 58 134 Z"
              fill="url(#blessVibrantGold)"
              transform="translate(18, 14)"
            />
          </g>

          {/* LETTER S (Second - High-contrast Didot Curve) */}
          <g transform="translate(458, 0)">
            <path
              d="M 54 146 C 48 128, 36 116, 20 116 C 6 116, -4 128, -4 144 C -4 162, 8 176, 28 190 C 50 204, 62 222, 62 248 C 62 276, 42 300, 14 300 C -4 300, -16 286, -20 264 L -8 260 C -4 276, 4 286, 16 286 C 30 286, 40 272, 40 250 C 40 232, 28 218, 8 204 C -12 188, -24 172, -24 146 C -24 122, -6 102, 20 102 C 38 102, 52 114, 58 134 Z"
              fill="url(#blessVibrantGold)"
              transform="translate(18, 14)"
            />
          </g>
        </g>

        {/* ======================================================== */}
        {/* 3. SLOGAN "IDEIAS QUE TRANSFORMAM" & GOLDEN HEART        */}
        {/* ======================================================== */}
        {showSlogan && (
          <g id="bless-slogan-vibrant" filter="url(#vibrantGoldGlow)">
            {/* Slogan Text with Moving Vibrant Gold */}
            <text
              x="270"
              y="392"
              textAnchor="middle"
              fill="url(#blessVibrantGold)"
              fontFamily="'Montserrat', 'Inter', sans-serif"
              fontSize="17.5"
              fontWeight="600"
              letterSpacing="0.44em"
              className="uppercase"
            >
              IDEIAS QUE TRANSFORMAM
            </text>

            {/* Radiant Golden Heart */}
            <path
              d="M 270 430 C 268 428, 252 412, 252 400 C 252 393, 258 387, 265 387 C 268 387, 270 389, 270 390 C 270 389, 272 387, 275 387 C 282 387, 288 393, 288 400 C 288 412, 272 428, 270 430 Z"
              fill="url(#blessVibrantGold)"
              transform="translate(0, 18)"
              className="animate-pulse origin-center"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
