# 🦋 Bless Personalizados — E-Commerce & Personalizador Interativo

> **Estúdio de Sublimação Ultra HD & Gravação a Laser de Alta Precisão**  
> *"Ideias que Transformam"*

Uma plataforma web completa e responsiva desenvolvida com **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion** e **HTML5 Canvas 2D**. Reúne um e-commerce de alto padrão, estúdio de personalização visual em tempo real, cálculo dinâmico de descontos progressivos por volume (atacado/varejo), carrinho lateral com persistência local e checkout multietapas integrado à API ViaCEP, gerador de QR Code Pix e fallback direto para o WhatsApp.

---

## ✨ Principais Recursos

- 🦋 **Identidade Visual Dinâmica**: Logotipo com bater de asas da borboleta em 3D contínuo e fluxo de ouro líquido (*liquid gold shimmer*) percorrendo toda a tipografia e detalhes.
- 🎨 **Estúdio de Personalização ao Vivo (`/customizer`)**:
  - Manipulação interativa (arraste, rotação, redimensionamento) de logos e textos sobre maquetes fotorrealistas de produtos (Copos Térmicos, Canecas Cerâmicas, Garrafas Inox, Azulejos e Chaveiros).
  - Simulação de **Gravação a Laser** permanente com acabamento em aço escovado, ouro/latão e oxidação escura.
  - Simulação de **Sublimação Ultra HD** com cores vivas e alto brilho espelhado.
  - **Upload de Arquivos** com suporte a PNG, JPG, PDF, SVG, AI e EPS com analisador de resolução e qualidade (DPI).
  - **Ferramenta de Texto** com 9 famílias tipográficas do Google Fonts, controle de alinhamento, tamanho e **curvatura de texto em arco**.
- 📦 **Catálogo Dinâmico & Calculadora de Volume**:
  - Filtros por categorias (*Gravação a Laser, Sublimação HD, Adesivos Vinílicos, Kits Corporativos B2B*).
  - Simulador de atacado em tempo real com descontos de 15%, 25%, 35% e até 50% OFF.
- 🛒 **Carrinho Deslizante (Drawer)**:
  - Barra de progresso para Frete Grátis.
  - Cupons de desconto (`BLESS10`, `PRIMEIRACOMPRA`, `ATACADO15`).
  - Persistência no `localStorage`.
- 💳 **Checkout Multi-Etapas (`/checkout`)**:
  - Preenchimento automático de endereço por CEP através da **API ViaCEP**.
  - **Pix Instantâneo** com geração dinâmica de QR Code visual e chave Copia e Cola com temporizador regressivo.
  - **Cartão de Crédito** com detecção inteligente de bandeira e cálculo de parcelamento em até 12x.
  - **Boleto Bancário** e **Finalização com Arte via WhatsApp**.
- 🏢 **Seções Institucionais de Alta Conversão**:
  - Comparativo Tecnológico: *Sublimação HD vs Gravação a Laser Fibra/CO2*.
  - Workflow passo a passo do pedido à entrega.
  - Portfólio / Vitrine de trabalhos realizados com modal de zoom.
  - Simulador de orçamento corporativo B2B.
  - Depoimentos com selo de compra verificada e FAQ interativo em acordeão.
  - Botão flutuante de atendimento rápido no WhatsApp e rastreamento de pedidos.

---

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Animações & Efeitos**: [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Gerenciamento de Estado**: [Zustand](https://github.com/pmndrs/zustand) com sincronização em `localStorage`
- **QR Code**: [qrcode](https://www.npmjs.com/package/qrcode)

---

## 🚀 Como Executar Localmente

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/marciocleonel-del/bless.git
   cd bless
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**:
   ```
   http://localhost:3000
   ```

---

## 📦 Build para Produção

```bash
npm run build
npm run start
```

---

## 📄 Licença

Este projeto é de propriedade do **Estúdio Bless Personalizados**. Todos os direitos reservados.
