import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'Bless Personalizados | Estúdio de Sublimação HD & Gravação a Laser',
  description: 'Copos e garrafas térmicas a laser, canecas cerâmicas fotográficas, azulejos decorativos e brindes corporativos de alto padrão. Personalizador interativo em tempo real.',
  keywords: 'gravação a laser, sublimação hd, copos térmicos personalizados, canecas personalizadas, brindes corporativos, atacado de brindes, bless personalizados, ideias que transformam',
  icons: {
    icon: '/bless.png',
    apple: '/bless.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-[#070D1E] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-bless-gold selection:text-slate-950">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
