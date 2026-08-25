import React from 'react';
import { CustomizerStudio } from '@/components/customizer/CustomizerStudio';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estúdio de Personalização Interativo | Bless Personalizados',
  description: 'Simulador visual em tempo real para gravação a laser e sublimação. Arraste logotipos, escolha tipografias Google Fonts e veja sua maquete 2D antes de produzir.',
};

export default function CustomizerPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-[#040814] via-[#070D1E] to-[#0A1128]">
      <CustomizerStudio />
    </div>
  );
}
