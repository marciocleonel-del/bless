export interface FAQItem {
  question: string;
  answer: string;
  category: 'personalizacao' | 'tecnologia' | 'envio' | 'pagamento' | 'b2b';
}

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'Qual a diferença entre Gravação a Laser e Sublimação?',
    answer: 'A Gravação a Laser atua removendo milimetricamente a camada superficial de pintura ou queimando a superfície de metais, madeiras e acrílicos, revelando a cor base do material (como o brilho do inox). É 100% permanente, não descasca nem desbota. Já a Sublimação HD utiliza tintas especiais que são transferidas pelo calor para a resina de materiais como cerâmica, alumínio e tecidos de poliéster, permitindo fotos e impressões coloridas em altíssima definição fotográfica.',
    category: 'tecnologia',
  },
  {
    question: 'Quais formatos de arquivo são aceitos no personalizador?',
    answer: 'Aceitamos arquivos em PNG, JPG, PDF, SVG, AI e EPS. Para gravação a laser, arquivos vetoriais (SVG, PDF, AI, EPS) ou imagens em preto e branco com fundo transparente e alta resolução proporcionam o melhor resultado. Nosso personalizador possui um verificador inteligente de DPI que alerta se a arte enviada estiver com baixa definição.',
    category: 'personalizacao',
  },
  {
    question: 'Existe quantidade mínima para pedidos?',
    answer: 'Para a maioria dos produtos (como Copos Térmicos, Canecas e Azulejos), o pedido mínimo é de apenas 1 unidade! Você pode personalizar um presente único. Para itens específicos de lote (como chaveiros e adesivos), o mínimo é de 5 ou 10 unidades, com descontos progressivos expressivos para compras maiores.',
    category: 'personalizacao',
  },
  {
    question: 'Como funciona a aprovação do mockup antes da produção?',
    answer: 'Ao finalizar seu pedido pelo nosso personalizador interativo, nossa equipe técnica faz uma revisão minuciosa do seu layout. Se houver qualquer ajuste de proporção ou alinhamento para atingir o padrão máximo de qualidade Bless, enviamos uma prévia digital direta no seu WhatsApp para você aprovar antes de ligarmos as máquinas de gravação.',
    category: 'personalizacao',
  },
  {
    question: 'Quais são os prazos de produção e entrega?',
    answer: 'Nosso prazo de produção expressa varia de 1 a 3 dias úteis após a aprovação da arte. Para lotes corporativos acima de 100 peças, o prazo médio é de 3 a 7 dias úteis. O prazo de entrega dos Correios/Transportadora é calculado automaticamente ao inserir seu CEP na finalização.',
    category: 'envio',
  },
  {
    question: 'Vocês atendem empresas e fornecem Nota Fiscal?',
    answer: 'Sim! Atendemos empresas de todo o Brasil para brindes corporativos, kits de boas-vindas (onboarding), eventos e premiações. Emitimos Nota Fiscal Eletrônica (NF-e) para todos os pedidos e oferecemos condições especiais de faturamento para pessoas jurídicas.',
    category: 'b2b',
  },
  {
    question: 'Quais são as formas de pagamento disponíveis?',
    answer: 'Aceitamos Pix Instantâneo (com confirmação imediata), Cartão de Crédito em até 12x (com as principais bandeiras Visa, Mastercard, Elo, Amex) e Boleto Bancário. Você também pode escolher finalizar seu pedido com suporte direto da nossa equipe via WhatsApp.',
    category: 'pagamento',
  },
  {
    question: 'O copo térmico gravado a laser pode ser lavado na máquina de lavar louças?',
    answer: 'Recomendamos a lavagem manual com o lado macio da esponja para preservar a vida útil da vedação e da pintura externa do copo. A gravação a laser propriamente dita é indestrutível e não sai com água ou sabão, pois faz parte do próprio metal.',
    category: 'tecnologia',
  },
];
