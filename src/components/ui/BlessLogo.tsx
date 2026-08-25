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

  // Icon Variant (Navbar & Mobile)
  if (variant === 'icon') {
    return (
      <div
        className={`relative inline-flex items-center justify-center select-none ${className}`}
        style={{ width, height }}
      >
        <svg
          viewBox="0 0 160 160"
          width={width}
          height={height}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* Liquid 24k Gold Moving Shimmer Gradient */}
            <linearGradient id="blessLiquidGoldIcon" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFA000">
                <animate
                  attributeName="stop-color"
                  values="#FFA000; #FFD700; #FFFDEB; #FFC400; #FFA000"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="25%" stopColor="#FFD700">
                <animate
                  attributeName="stop-color"
                  values="#FFD700; #FFFDEB; #FFD700; #FFA000; #FFD700"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="#FFFDEB">
                <animate
                  attributeName="stop-color"
                  values="#FFFDEB; #FFD700; #FFA000; #FFC400; #FFFDEB"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="75%" stopColor="#FFC400">
                <animate
                  attributeName="stop-color"
                  values="#FFC400; #FFA000; #FFD700; #FFFDEB; #FFC400"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#FFA000">
                <animate
                  attributeName="stop-color"
                  values="#FFA000; #FFD700; #FFFDEB; #FFC400; #FFA000"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>

            <filter id="iconGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 3D Fluttering Butterfly Wing (Only the wing moves!) */}
          <g
            className="animate-wing-3d-flap"
            style={{
              transformOrigin: '70px 80px',
              transformBox: 'fill-box',
            }}
          >
            {/* Upper Wing */}
            <path
              d="M 68 76 C 58 48, 38 18, 14 12 C 10 11, 6 15, 9 20 C 18 40, 34 62, 68 76 Z"
              fill="url(#blessLiquidGoldIcon)"
              fillOpacity="0.2"
              stroke="url(#blessLiquidGoldIcon)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Upper Wing Veins */}
            <path
              d="M 14 12 C 26 34, 42 56, 68 76 M 20 28 C 34 46, 50 62, 64 72 M 30 44 C 42 54, 54 64, 66 72"
              stroke="url(#blessLiquidGoldIcon)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Lower Wing */}
            <path
              d="M 68 82 C 48 88, 18 100, 14 120 C 12 128, 22 132, 32 124 C 46 114, 58 98, 68 82 Z"
              fill="url(#blessLiquidGoldIcon)"
              fillOpacity="0.2"
              stroke="url(#blessLiquidGoldIcon)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Lower Wing Veins */}
            <path
              d="M 26 120 C 38 108, 52 94, 68 82 M 36 126 C 48 112, 60 98, 66 88"
              stroke="url(#blessLiquidGoldIcon)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>

          {/* Letter B (Static, with moving liquid gold fill) */}
          <g filter="url(#iconGoldGlow)">
            <path
              d="M 68 24 L 84 24 C 106 24, 118 36, 118 52 C 118 64, 110 74, 98 78 C 114 82, 124 94, 124 112 C 124 132, 106 144, 84 144 L 68 144 Z"
              stroke="url(#blessLiquidGoldIcon)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M 76 28 L 76 140 M 76 78 L 98 78"
              stroke="url(#blessLiquidGoldIcon)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    );
  }

  // Full High-Fidelity Logo: Only Wing Flaps in 3D + Letters Shimmer with Moving 24k Gold
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <div
        className="relative flex items-center justify-center overflow-visible"
        style={{ width, height }}
      >
        <svg
          viewBox="0 0 540 460"
          width={width}
          height={height}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* Continuous Liquid Gold Gradient Flow for Typography */}
            <linearGradient id="blessLetterGoldFlow" x1="0%" y1="0%" x2="100%" y2="0%">
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

            {/* Glowing Golden Filter */}
            <filter id="blessLetterGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ======================================================== */}
          {/* 1. BUTTERFLY WING (ONLY THE WING MOVES IN 3D FLUTTER)    */}
          {/* ======================================================== */}
          <g
            id="bless-moving-butterfly-wing"
            className="animate-wing-3d-flap"
            style={{
              transformOrigin: '116px 210px',
              transformBox: 'fill-box',
            }}
          >
            {/* Upper Wing Outer Perimeter */}
            <path
              d="M 116 196 C 100 138, 70 72, 26 50 C 16 45, 8 54, 14 66 C 28 102, 54 162, 116 196 Z"
              fill="url(#blessLetterGoldFlow)"
              fillOpacity="0.18"
              stroke="url(#blessLetterGoldFlow)"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Upper Wing Elegant Internal Veins */}
            <path
              d="M 26 50 C 42 92, 68 146, 116 196 M 36 82 C 54 118, 78 156, 108 184 M 50 114 C 68 144, 88 168, 110 188 M 22 64 C 34 86, 58 128, 80 166 M 66 138 C 80 162, 94 180, 112 192"
              stroke="url(#blessLetterGoldFlow)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Lower Wing Outer Perimeter */}
            <path
              d="M 116 216 C 80 226, 36 242, 28 276 C 22 292, 38 302, 54 290 C 76 272, 98 246, 116 216 Z"
              fill="url(#blessLetterGoldFlow)"
              fillOpacity="0.18"
              stroke="url(#blessLetterGoldFlow)"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Lower Wing Internal Veins */}
            <path
              d="M 42 284 C 62 264, 82 240, 116 216 M 54 294 C 72 274, 90 250, 110 228 M 32 268 C 54 248, 78 230, 102 218 M 68 280 C 84 262, 98 240, 112 222"
              stroke="url(#blessLetterGoldFlow)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Wing Antenna / Swirl */}
            <path
              d="M 116 194 C 108 172, 96 148, 82 136 C 74 128, 64 132, 66 142 C 72 154, 88 176, 116 200"
              stroke="url(#blessLetterGoldFlow)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </g>

          {/* ======================================================== */}
          {/* 2. TYPOGRAPHY "B L E S S" WITH MOVING LIQUID GOLD SHINE  */}
          {/* ======================================================== */}
          <g id="bless-letters-glow-group" filter="url(#blessLetterGlow)">
            {/* LETTER B (Static stem anchored to the wing, with inner decorative loop) */}
            <path
              d="M 116 114 L 138 114 C 176 114, 202 136, 202 166 C 202 188, 186 204, 166 210 C 192 218, 214 238, 214 274 C 214 310, 180 334, 138 334 L 116 334 Z"
              stroke="url(#blessLetterGoldFlow)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Stem of B with graceful inner loop */}
            <path
              d="M 128 120 L 128 328 M 128 210 L 166 210 M 128 114 C 108 114, 96 138, 96 160 C 96 184, 112 208, 128 210"
              stroke="url(#blessLetterGoldFlow)"
              strokeWidth="5.5"
              strokeLinecap="round"
            />

            {/* LETTER L (Original Serif Didot Style) */}
            <g transform="translate(224, 0)">
              <path
                d="M 12 114 L 28 114 L 28 322 L 70 322 L 70 334 L 6 334 L 6 322 L 12 322 Z"
                fill="url(#blessLetterGoldFlow)"
              />
              <path d="M 6 114 L 34 114" stroke="url(#blessLetterGoldFlow)" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* LETTER E (Original Serif Didot Style) */}
            <g transform="translate(302, 0)">
              <path
                d="M 12 114 L 64 114 L 64 126 L 28 126 L 28 214 L 56 214 L 56 226 L 28 226 L 28 322 L 66 322 L 66 334 L 12 334 Z"
                fill="url(#blessLetterGoldFlow)"
              />
              <path
                d="M 6 114 L 28 114 M 6 334 L 28 334 M 60 114 L 64 134 M 62 314 L 66 334"
                stroke="url(#blessLetterGoldFlow)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </g>

            {/* LETTER S (First - High-contrast Didot Curve) */}
            <g transform="translate(380, 0)">
              <path
                d="M 54 146 C 48 128, 36 116, 20 116 C 6 116, -4 128, -4 144 C -4 162, 8 176, 28 190 C 50 204, 62 222, 62 248 C 62 276, 42 300, 14 300 C -4 300, -16 286, -20 264 L -8 260 C -4 276, 4 286, 16 286 C 30 286, 40 272, 40 250 C 40 232, 28 218, 8 204 C -12 188, -24 172, -24 146 C -24 122, -6 102, 20 102 C 38 102, 52 114, 58 134 Z"
                fill="url(#blessLetterGoldFlow)"
                transform="translate(18, 14)"
              />
            </g>

            {/* LETTER S (Second - High-contrast Didot Curve) */}
            <g transform="translate(460, 0)">
              <path
                d="M 54 146 C 48 128, 36 116, 20 116 C 6 116, -4 128, -4 144 C -4 162, 8 176, 28 190 C 50 204, 62 222, 62 248 C 62 276, 42 300, 14 300 C -4 300, -16 286, -20 264 L -8 260 C -4 276, 4 286, 16 286 C 30 286, 40 272, 40 250 C 40 232, 28 218, 8 204 C -12 188, -24 172, -24 146 C -24 122, -6 102, 20 102 C 38 102, 52 114, 58 134 Z"
                fill="url(#blessLetterGoldFlow)"
                transform="translate(18, 14)"
              />
            </g>
          </g>

          {/* ======================================================== */}
          {/* 3. SLOGAN "IDEIAS QUE TRANSFORMAM" & GOLDEN HEART        */}
          {/* ======================================================== */}
          {showSlogan && (
            <g id="bless-slogan-letters-group" filter="url(#blessLetterGlow)">
              {/* Slogan Text with Moving Radiant 24k Gold */}
              <text
                x="270"
                y="392"
                textAnchor="middle"
                fill="url(#blessLetterGoldFlow)"
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
                fill="url(#blessLetterGoldFlow)"
                transform="translate(0, 18)"
                className="animate-pulse origin-center"
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
