'use client';

import React from 'react';
import { Star, Quote, CheckCircle2, Heart } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: '1',
      name: 'Camila Mendonça',
      role: 'Head de People & Cultura',
      company: 'Fintech Nexus',
      text: 'Pedimos 220 copos térmicos gravados a laser com o nome de cada novo colaborador e o logo da empresa. O acabamento prateado no fundo preto matte ficou surreal de elegante. Entrega 2 dias antes do prazo!',
      rating: 5,
      product: 'Copo Térmico Laser Black',
    },
    {
      id: '2',
      name: 'Rodrigo Alencar',
      role: 'Cliente Final',
      company: 'Presente de Aniversário',
      text: 'A experiência no personalizador ao vivo é sensacional! Consegui montar a caneca com a foto da minha família e uma frase curvada. A cerâmica tem um brilho espelhado que impressiona de verdade.',
      rating: 5,
      product: 'Caneca Cerâmica HD 325ml',
    },
    {
      id: '3',
      name: 'Mariana Duarte',
      role: 'Diretora de Eventos',
      company: 'Agência Lumina',
      text: 'Trabalho com eventos corporativos há 8 anos e o padrão da Bless se destaca demais. A validação de mockup no WhatsApp dá muita segurança para fechar grandes lotes. Já é nosso quarto pedido com eles.',
      rating: 5,
      product: 'Kit Executivo Bless VIP',
    },
    {
      id: '4',
      name: 'Eduardo Fontes',
      role: 'Sócio-Fundador',
      company: 'Box Cross Training',
      text: 'As garrafas térmicas com gravação a laser para nossos atletas ficaram impecáveis. O laser não sai de jeito nenhum, mesmo com o pessoal jogando na mochila todo dia. Qualidade 10/10.',
      rating: 5,
      product: 'Garrafa Térmica Inox 750ml',
    },
  ];

  return (
    <section className="py-20 bg-[#040814] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1128] border border-bless-gold/40 shadow-gold-glow">
            <Heart className="w-3.5 h-3.5 text-bless-gold fill-bless-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-bless-gold-light">
              Depoimentos & Experiência
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Quem Conhece o Padrão Bless Recomenda
          </h2>

          <p className="text-sm text-slate-400">
            Mais de 15.000 clientes e empresas atendidas com índice de 99.8% de satisfação e recomendação.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-[#0A1128] border border-slate-800 p-6 space-y-4 hover:border-bless-gold/40 hover:shadow-gold-glow transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-3 border-t border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{item.name}</h4>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    Verificado
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {item.role} • <strong className="text-slate-300">{item.company}</strong>
                </p>
                <span className="text-[10px] text-bless-gold block font-semibold">
                  Produto: {item.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
