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
  // Dimension mapping
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

  // If icon-only variant
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
            {/* Animated Gold Shimmer Gradient */}
            <linearGradient id="blessGoldShimmerIcon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9A7730">
                {animateGold && (
                  <animate
                    attributeName="stop-color"
                    values="#9A7730; #D4AF37; #FFFBEB; #D4AF37; #9A7730"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                )}
              </stop>
              <stop offset="25%" stopColor="#D4AF37">
                {animateGold && (
                  <animate
                    attributeName="stop-color"
                    values="#D4AF37; #FFFBEB; #D4AF37; #9A7730; #D4AF37"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                )}
              </stop>
              <stop offset="50%" stopColor="#FFFBEB">
                {animateGold && (
                  <animate
                    attributeName="stop-color"
                    values="#FFFBEB; #D4AF37; #9A7730; #D4AF37; #FFFBEB"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                )}
              </stop>
              <stop offset="75%" stopColor="#D4AF37">
                {animateGold && (
                  <animate
                    attributeName="stop-color"
                    values="#D4AF37; #9A7730; #D4AF37; #FFFBEB; #D4AF37"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                )}
              </stop>
              <stop offset="100%" stopColor="#9A7730">
                {animateGold && (
                  <animate
                    attributeName="stop-color"
                    values="#9A7730; #D4AF37; #FFFBEB; #D4AF37; #9A7730"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                )}
              </stop>
            </linearGradient>

            {/* Glowing filter */}
            <filter id="goldGlowIcon" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Animated Butterfly Wing Group */}
          <g
            className={animateWing ? 'animate-butterfly-wing origin-[70px_80px]' : ''}
            style={{
              transformOrigin: '70px 80px',
              transformBox: 'fill-box',
            }}
          >
            {/* Upper Wing Outer Contour */}
            <path
              d="M 68 76 C 58 52, 42 22, 22 14 C 18 12, 14 16, 17 22 C 24 38, 36 60, 68 76 Z"
              fill="url(#blessGoldShimmerIcon)"
              fillOpacity="0.12"
              stroke="url(#blessGoldShimmerIcon)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Upper Wing Inner Filigree Veins */}
            <path
              d="M 22 14 C 30 32, 44 54, 68 76 M 26 28 C 36 44, 48 58, 62 70 M 34 42 C 45 52, 54 62, 64 68 M 20 22 C 28 30, 42 46, 52 64"
              stroke="url(#blessGoldShimmerIcon)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Lower Wing Outer Contour */}
            <path
              d="M 68 84 C 48 88, 22 96, 18 114 C 16 122, 24 126, 32 120 C 44 112, 58 98, 68 84 Z"
              fill="url(#blessGoldShimmerIcon)"
              fillOpacity="0.12"
              stroke="url(#blessGoldShimmerIcon)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Lower Wing Inner Veins */}
            <path
              d="M 28 116 C 38 106, 50 94, 68 84 M 36 122 C 46 112, 56 98, 66 88 M 22 110 C 34 100, 48 90, 60 84"
              stroke="url(#blessGoldShimmerIcon)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* Letter B */}
          <path
            d="M 68 28 L 78 28 C 96 28, 108 38, 108 52 C 108 62, 100 70, 90 74 C 104 78, 114 88, 114 104 C 114 122, 98 132, 78 132 L 68 132 Z"
            stroke="url(#blessGoldShimmerIcon)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 76 34 L 76 126 M 76 74 L 92 74"
            stroke="url(#blessGoldShimmerIcon)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // Full High-Fidelity Animated Logo
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 500 500"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Sweeping Moving Gold Shimmer Gradient */}
          <linearGradient id="blessGoldShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9A7730">
              {animateGold && (
                <animate
                  attributeName="stop-color"
                  values="#9A7730; #D4AF37; #FFFBEB; #D4AF37; #9A7730"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="25%" stopColor="#D4AF37">
              {animateGold && (
                <animate
                  attributeName="stop-color"
                  values="#D4AF37; #FFFBEB; #D4AF37; #9A7730; #D4AF37"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="50%" stopColor="#FFFBEB">
              {animateGold && (
                <animate
                  attributeName="stop-color"
                  values="#FFFBEB; #D4AF37; #9A7730; #D4AF37; #FFFBEB"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="75%" stopColor="#D4AF37">
              {animateGold && (
                <animate
                  attributeName="stop-color"
                  values="#D4AF37; #9A7730; #D4AF37; #FFFBEB; #D4AF37"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="100%" stopColor="#9A7730">
              {animateGold && (
                <animate
                  attributeName="stop-color"
                  values="#9A7730; #D4AF37; #FFFBEB; #D4AF37; #9A7730"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
          </linearGradient>

          {/* Glowing Ambient Light Filter */}
          <filter id="blessGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. BUTTERFLY WING (Moving 3D Flapping Motion)            */}
        {/* ======================================================== */}
        <g
          id="butterfly-wing-group"
          className={animateWing ? 'animate-wing-flutter' : ''}
          style={{
            transformOrigin: '98px 230px',
            transformBox: 'fill-box',
          }}
        >
          {/* Upper Wing Main Boundary */}
          <path
            d="M 96 218 C 82 170, 60 110, 24 94 C 18 91, 12 99, 16 108 C 28 136, 48 185, 96 218 Z"
            fill="url(#blessGoldShimmer)"
            fillOpacity="0.1"
            stroke="url(#blessGoldShimmer)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Upper Wing Venation Lines */}
          <path
            d="M 24 94 C 36 128, 58 174, 96 218 M 32 120 C 48 152, 68 182, 90 206 M 44 148 C 60 172, 76 194, 92 210 M 20 106 C 32 124, 52 158, 70 190 M 56 168 C 70 188, 82 202, 94 214"
            stroke="url(#blessGoldShimmer)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Lower Wing Main Boundary */}
          <path
            d="M 96 238 C 68 246, 32 260, 26 288 C 22 300, 36 308, 48 298 C 66 284, 84 262, 96 238 Z"
            fill="url(#blessGoldShimmer)"
            fillOpacity="0.1"
            stroke="url(#blessGoldShimmer)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Lower Wing Venation Lines */}
          <path
            d="M 38 294 C 54 278, 72 258, 96 238 M 48 302 C 64 286, 78 266, 92 248 M 30 282 C 48 266, 68 250, 86 240 M 60 290 C 74 274, 86 256, 94 242"
            stroke="url(#blessGoldShimmer)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Wing Swirl / Antenna Details */}
          <path
            d="M 96 216 C 90 198, 80 178, 68 168 C 62 162, 54 164, 56 172 C 60 182, 74 200, 96 222"
            stroke="url(#blessGoldShimmer)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>

        {/* ======================================================== */}
        {/* 2. LETTERING "B L E S S" (Continuous Golden Shimmer)     */}
        {/* ======================================================== */}
        <g id="bless-letters-group" filter="url(#blessGoldGlow)">
          {/* LETTER B (Merged with wing swirl) */}
          <path
            d="M 96 142 L 114 142 C 146 142, 168 160, 168 184 C 168 202, 154 216, 138 222 C 160 228, 178 244, 178 274 C 178 304, 150 324, 114 324 L 96 324 Z"
            stroke="url(#blessGoldShimmer)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* B Stem and Swirl curve */}
          <path
            d="M 106 148 L 106 318 M 106 222 L 138 222 M 106 142 C 90 142, 80 162, 80 180 C 80 200, 94 220, 106 222"
            stroke="url(#blessGoldShimmer)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* LETTER L */}
          <g transform="translate(186, 0)">
            <path
              d="M 10 142 L 20 142 L 20 314 L 56 314 L 56 324 L 6 324 L 6 314 L 10 314 Z"
              fill="url(#blessGoldShimmer)"
            />
            {/* Serif top */}
            <path d="M 4 142 L 26 142" stroke="url(#blessGoldShimmer)" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* LETTER E */}
          <g transform="translate(254, 0)">
            <path
              d="M 10 142 L 52 142 L 52 152 L 22 152 L 22 226 L 46 226 L 46 236 L 22 236 L 22 314 L 54 314 L 54 324 L 10 324 Z"
              fill="url(#blessGoldShimmer)"
            />
            {/* Top & Bottom serifs */}
            <path d="M 4 142 L 24 142 M 4 324 L 24 324" stroke="url(#blessGoldShimmer)" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* LETTER S (First) */}
          <g transform="translate(322, 0)">
            <path
              d="M 48 168 C 42 152, 32 142, 18 142 C 6 142, -2 152, -2 166 C -2 182, 10 194, 28 206 C 48 218, 56 234, 56 256 C 56 280, 38 300, 14 300 C -2 300, -12 288, -16 270 L -6 266 C -2 280, 4 288, 14 288 C 26 288, 34 276, 34 258 C 34 242, 24 230, 6 218 C -12 204, -20 190, -20 168 C -20 146, -4 130, 18 130 C 34 130, 46 140, 52 158 Z"
              fill="url(#blessGoldShimmer)"
              transform="translate(16, 12)"
            />
          </g>

          {/* LETTER S (Second) */}
          <g transform="translate(394, 0)">
            <path
              d="M 48 168 C 42 152, 32 142, 18 142 C 6 142, -2 152, -2 166 C -2 182, 10 194, 28 206 C 48 218, 56 234, 56 256 C 56 280, 38 300, 14 300 C -2 300, -12 288, -16 270 L -6 266 C -2 280, 4 288, 14 288 C 26 288, 34 276, 34 258 C 34 242, 24 230, 6 218 C -12 204, -20 190, -20 168 C -20 146, -4 130, 18 130 C 34 130, 46 140, 52 158 Z"
              fill="url(#blessGoldShimmer)"
              transform="translate(16, 12)"
            />
          </g>
        </g>

        {/* ======================================================== */}
        {/* 3. SLOGAN "IDEIAS QUE TRANSFORMAM" & HEART               */}
        {/* ======================================================== */}
        {showSlogan && (
          <g id="bless-slogan-group" filter="url(#blessGoldGlow)">
            {/* Slogan Text with Moving Gold Fill */}
            <text
              x="250"
              y="384"
              textAnchor="middle"
              fill="url(#blessGoldShimmer)"
              fontFamily="'Montserrat', 'Inter', sans-serif"
              fontSize="16.5"
              fontWeight="600"
              letterSpacing="0.42em"
              className="uppercase"
            >
              IDEIAS QUE TRANSFORMAM
            </text>

            {/* Glowing Golden Heart */}
            <path
              d="M 250 422 C 248 420, 234 406, 234 396 C 234 390, 239 385, 245 385 C 248 385, 250 387, 250 388 C 250 387, 252 385, 255 385 C 261 385, 266 390, 266 396 C 266 406, 252 420, 250 422 Z"
              fill="url(#blessGoldShimmer)"
              transform="translate(0, 18)"
              className="animate-pulse origin-center"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
