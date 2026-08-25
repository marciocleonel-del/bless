'use client';

import React from 'react';
import { Sparkles, Wand2, Flame, Layers, Award, Star } from 'lucide-react';

export const DynamicLivingBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Ambient Color Glow Mesh */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-gradient-to-br from-amber-500/10 via-bless-gold/5 to-transparent rounded-full blur-[140px] animate-laser-pulse" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/10 via-bless-laser-blue/5 to-transparent rounded-full blur-[150px] animate-laser-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-40 left-1/4 w-[750px] h-[750px] bg-gradient-to-tr from-amber-600/8 via-bless-gold/4 to-transparent rounded-full blur-[160px] animate-laser-pulse" style={{ animationDelay: '4s' }} />

      {/* ======================================================== */}
      {/* 1. COPO TÉRMICO INOX PERSONALIZADO (Canto Superior Direito)*/}
      {/* ======================================================== */}
      <div
        className="absolute top-[12%] right-[4%] lg:right-[7%] w-36 sm:w-44 lg:w-52 aspect-[1/2] animate-float-slow opacity-35 hover:opacity-75 transition-opacity"
        style={{ animationDelay: '0s' }}
      >
        <div className="relative w-full h-full filter drop-shadow-[0_20px_35px_rgba(0,212,255,0.2)]">
          <svg viewBox="0 0 160 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Tampa Acrílica */}
            <rect x="35" y="10" width="90" height="14" rx="7" fill="#1E293B" stroke="#475569" strokeWidth="2" />
            <path d="M50 10 L110 10 L105 4 L55 4 Z" fill="#334155" opacity="0.8" />
            <rect x="70" y="2" width="20" height="4" rx="2" fill="#00D4FF" opacity="0.7" />

            {/* Borda Superior Inox */}
            <rect x="30" y="22" width="100" height="10" rx="3" fill="url(#silverGrad)" />

            {/* Corpo do Copo Térmico */}
            <path
              d="M33 32 L44 265 C45 273 52 280 60 280 L100 280 C108 280 115 273 116 265 L127 32 Z"
              fill="url(#tumblerBodyGrad)"
              stroke="rgba(255,215,0,0.3)"
              strokeWidth="1.5"
            />

            {/* Reflexo de Luz Curvo */}
            <path d="M42 36 L51 260 C51 262 53 264 55 264 L59 264 L49 36 Z" fill="white" opacity="0.15" />
            <path d="M118 36 L109 260 L105 260 L115 36 Z" fill="#00D4FF" opacity="0.12" />

            {/* Gravação a Laser Dourada no Copo (Monograma & Asas) */}
            <g transform="translate(56, 110) scale(0.6)">
              {/* Asas da Borboleta Gravada */}
              <path
                d="M40 30 C20 10 0 25 10 50 C2 70 25 80 40 55 C55 80 78 70 70 50 C80 25 60 10 40 30 Z"
                fill="url(#goldLaserGrad)"
                filter="url(#laserGlowFilter)"
              />
              <text x="40" y="90" textAnchor="middle" fill="#FFD700" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="3">
                BLESS
              </text>
              <text x="40" y="102" textAnchor="middle" fill="#FFFDEB" fontSize="6" fontFamily="sans-serif" letterSpacing="2" opacity="0.8">
                LASER ENGRAVED
              </text>
            </g>

            {/* Brilho Laser Animado */}
            <circle cx="80" cy="140" r="4" fill="#FFFFFF" className="animate-ping" style={{ animationDuration: '3s' }} />
          </svg>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. CANECA DE CERÂMICA COM SUBLIMAÇÃO HD (Canto Meio Esquerdo) */}
      {/* ======================================================== */}
      <div
        className="absolute top-[38%] -left-6 sm:left-[3%] lg:left-[5%] w-36 sm:w-48 lg:w-56 aspect-[1.2/1] animate-float-medium opacity-30 hover:opacity-75 transition-opacity"
        style={{ animationDelay: '1.5s' }}
      >
        <div className="relative w-full h-full filter drop-shadow-[0_20px_40px_rgba(255,215,0,0.2)]">
          <svg viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Alça da Caneca */}
            <path
              d="M150 45 C195 45 195 135 150 135 C145 135 145 120 150 120 C175 120 175 60 150 60 Z"
              fill="url(#mugHandleGrad)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
            />

            {/* Corpo da Caneca */}
            <rect x="30" y="30" width="130" height="120" rx="14" fill="url(#mugBodyGrad)" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5" />

            {/* Abertura Superior (Elipse com Profundidade) */}
            <ellipse cx="95" cy="30" rx="65" ry="12" fill="#0A1128" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
            <ellipse cx="95" cy="30" rx="55" ry="8" fill="#040814" />

            {/* Estampa Fotográfica Sublimada HD na Caneca */}
            <g clipPath="url(#mugPrintClip)">
              <rect x="42" y="46" width="106" height="88" rx="8" fill="url(#sublimationArtGrad)" />
              {/* Ilustração Colorida na Caneca */}
              <circle cx="95" cy="78" r="22" fill="#FFD700" opacity="0.3" />
              <path d="M75 90 C85 65 105 65 115 90 Z" fill="#FFC400" opacity="0.8" />
              <text x="95" y="112" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
                SUBLIMAÇÃO HD
              </text>
            </g>

            {/* Brilho Especular na Cerâmica */}
            <path d="M38 35 L48 142 L42 142 L34 35 Z" fill="white" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. CHAVEIRO METÁLICO DOURADO GRAVADO (Canto Inferior Direito) */}
      {/* ======================================================== */}
      <div
        className="absolute bottom-[22%] right-[6%] lg:right-[9%] w-28 sm:w-36 lg:w-44 aspect-square animate-float-fast opacity-35 hover:opacity-80 transition-opacity"
        style={{ animationDelay: '3s' }}
      >
        <div className="relative w-full h-full filter drop-shadow-[0_15px_30px_rgba(255,160,0,0.3)]">
          <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Argola Metálica */}
            <circle cx="80" cy="30" r="20" stroke="url(#goldLaserGrad)" strokeWidth="6" fill="none" />
            <circle cx="80" cy="30" r="14" stroke="#040814" strokeWidth="2" fill="none" opacity="0.6" />

            {/* Elo de Ligação */}
            <rect x="76" y="48" width="8" height="14" rx="4" fill="url(#goldLaserGrad)" />

            {/* Placa do Chaveiro Dourada Chanfrada */}
            <rect
              x="35"
              y="60"
              width="90"
              height="90"
              rx="18"
              fill="url(#keychainMetalGrad)"
              stroke="#FFFDEB"
              strokeWidth="2"
            />

            {/* Borda em Baixo-Relevo */}
            <rect x="42" y="67" width="76" height="76" rx="12" stroke="rgba(0,0,0,0.4)" strokeWidth="2" fill="none" />

            {/* Gravação a Laser no Centro do Chaveiro */}
            <path
              d="M80 82 C70 70 58 80 66 94 C60 106 74 112 80 98 C86 112 100 106 94 94 C102 80 90 70 80 82 Z"
              fill="#070D1E"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            <text x="80" y="128" textAnchor="middle" fill="#0A1128" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="2">
              BLESS
            </text>
          </svg>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. ADESIVOS VINÍLICOS / HOLOGRÁFICOS (Canto Inferior Esquerdo) */}
      {/* ======================================================== */}
      <div
        className="absolute bottom-[10%] left-[4%] lg:left-[8%] w-32 sm:w-40 lg:w-48 aspect-square animate-float-medium opacity-30 hover:opacity-75 transition-opacity"
        style={{ animationDelay: '0.8s' }}
      >
        <div className="relative w-full h-full filter drop-shadow-[0_15px_35px_rgba(0,212,255,0.25)]">
          <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Adesivo com Borda Branca de Recorte (Die-Cut) */}
            <path
              d="M80 18 C115 18 142 45 142 80 C142 115 115 142 80 142 C45 142 18 115 18 80 C18 45 45 18 80 18 Z"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="4"
            />

            {/* Miolo Holográfico com Degradê Furta-Cor */}
            <path
              d="M80 24 C111 24 136 49 136 80 C136 111 111 136 80 136 C49 136 24 111 24 80 C24 49 49 24 80 24 Z"
              fill="url(#holoStickerGrad)"
            />

            {/* Arte do Adesivo */}
            <g transform="translate(80, 75)">
              <polygon points="0,-25 8,-8 26,-8 11,4 17,22 0,11 -17,22 -11,4 -26,-8 -8,-8" fill="#FFFDEB" filter="url(#laserGlowFilter)" />
              <text x="0" y="38" textAnchor="middle" fill="#0A1128" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="1.5">
                VINIL PREMIUM
              </text>
            </g>

            {/* Dobra de Destaque 3D no Canto */}
            <path d="M120 30 L140 50 L120 50 Z" fill="#CBD5E1" opacity="0.7" />
          </svg>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. GARRAFA TÉRMICA INOX SPORT (Centro/Fundo Flutuante) */}
      {/* ======================================================== */}
      <div
        className="absolute top-[68%] right-[40%] lg:right-[46%] w-24 sm:w-32 aspect-[1/3] animate-float-slow opacity-20 hover:opacity-60 transition-opacity"
        style={{ animationDelay: '4.5s' }}
      >
        <div className="relative w-full h-full filter drop-shadow-[0_25px_40px_rgba(255,215,0,0.15)]">
          <svg viewBox="0 0 100 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Tampa com Alça */}
            <path d="M40 8 C40 4 60 4 60 8 L60 20 L40 20 Z" fill="#334155" />
            <rect x="30" y="20" width="40" height="20" rx="4" fill="url(#silverGrad)" />
            <rect x="36" y="40" width="28" height="15" fill="#0F172A" />

            {/* Corpo Longo da Garrafa Térmica */}
            <path
              d="M32 55 L25 80 L25 255 C25 265 35 272 50 272 C65 272 75 265 75 255 L75 80 L68 55 Z"
              fill="url(#bottleBodyGrad)"
              stroke="rgba(255,215,0,0.3)"
              strokeWidth="1.5"
            />

            {/* Gravação Vertical a Laser */}
            <text
              x="50"
              y="180"
              textAnchor="middle"
              fill="#FFD700"
              fontSize="12"
              fontWeight="bold"
              fontFamily="sans-serif"
              letterSpacing="6"
              transform="rotate(-90 50 180)"
              opacity="0.8"
            >
              BLESS INOX
            </text>
          </svg>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DEFINIÇÕES DE DEGRADÊS SVG E FILTROS DE LUZ              */}
      {/* ======================================================== */}
      <svg className="hidden">
        <defs>
          {/* Laser Glow Filter */}
          <filter id="laserGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Mug Print Clip Path */}
          <clipPath id="mugPrintClip">
            <rect x="42" y="46" width="106" height="88" rx="8" />
          </clipPath>

          {/* Tumbler Body Gradient */}
          <linearGradient id="tumblerBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="25%" stopColor="#1C2541" />
            <stop offset="50%" stopColor="#3A506B" />
            <stop offset="75%" stopColor="#1C2541" />
            <stop offset="100%" stopColor="#0B132B" />
          </linearGradient>

          {/* Bottle Body Gradient */}
          <linearGradient id="bottleBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#070D1E" />
            <stop offset="30%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="70%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#070D1E" />
          </linearGradient>

          {/* Mug Body Gradient */}
          <linearGradient id="mugBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="30%" stopColor="#F8FAFC" />
            <stop offset="70%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Mug Handle Gradient */}
          <linearGradient id="mugHandleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Sublimation Art Gradient */}
          <linearGradient id="sublimationArtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="35%" stopColor="#8B5CF6" />
            <stop offset="70%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          {/* Keychain Metal Gradient */}
          <linearGradient id="keychainMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="25%" stopColor="#FFA000" />
            <stop offset="50%" stopColor="#FFFDEB" />
            <stop offset="75%" stopColor="#FFC400" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Gold Laser Gradient */}
          <linearGradient id="goldLaserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDEB" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA000" />
          </linearGradient>

          {/* Holographic Sticker Gradient */}
          <linearGradient id="holoStickerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="20%" stopColor="#FBBF24" />
            <stop offset="40%" stopColor="#34D399" />
            <stop offset="60%" stopColor="#60A5FA" />
            <stop offset="80%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>

          {/* Silver Chrome Gradient */}
          <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
