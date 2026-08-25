import { CartItem, CustomerAddress, CustomerInfo, ShippingOption } from '@/types';
import { formatBRL } from './formatters';

export const BLESS_PHONE_NUMBER = '5511999999999'; // Default support phone
export const BLESS_PHONE_DISPLAY = '(11) 99999-9999';

export function generateWhatsAppOrderUrl(params: {
  orderId: string;
  customer: CustomerInfo;
  address?: CustomerAddress;
  shipping?: ShippingOption;
  items: CartItem[];
  subtotal: number;
  shippingPrice: number;
  discount: number;
  total: number;
  paymentMethod: string;
  notes?: string;
}): string {
  const {
    orderId,
    customer,
    address,
    shipping,
    items,
    shippingPrice,
    discount,
    total,
    paymentMethod,
    notes,
  } = params;

  let msg = `✨ *NOVO PEDIDO - BLESS PERSONALIZADOS* ✨\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📋 *Pedido:* #${orderId}\n`;
  msg += `👤 *Cliente:* ${customer.nome}\n`;
  msg += `📱 *WhatsApp:* ${customer.whatsapp}\n`;
  if (customer.documento) {
    msg += `📄 *CPF/CNPJ:* ${customer.documento}\n`;
  }
  msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  msg += `🛍️ *ITENS DO PEDIDO:*\n`;
  items.forEach((item, index) => {
    msg += `\n*${index + 1}. ${item.product.name}*\n`;
    msg += `   • Quantidade: *${item.quantity} un*\n`;
    msg += `   • Técnica: ${item.product.technique}\n`;
    msg += `   • Cor: ${item.customization.selectedColor.name}\n`;
    
    if (item.customization.isTwoSided) {
      msg += `   • Gravação/Estampa: *Frente e Verso (2 Lados)*\n`;
    } else {
      msg += `   • Gravação/Estampa: *1 Lado (Frente)*\n`;
    }

    if (item.customization.frontText?.text) {
      msg += `   • Texto Frente: "${item.customization.frontText.text}" (Fonte: ${item.customization.frontText.fontFamily})\n`;
    }
    if (item.customization.backText?.text) {
      msg += `   • Texto Verso: "${item.customization.backText.text}" (Fonte: ${item.customization.backText.fontFamily})\n`;
    }
    if (item.customization.frontArt) {
      msg += `   • Arte Frente: Anexada no sistema (${item.customization.frontArt.name})\n`;
    }
    if (item.customization.backArt) {
      msg += `   • Arte Verso: Anexada no sistema (${item.customization.backArt.name})\n`;
    }
    if (item.customization.notes) {
      msg += `   • Obs do Item: ${item.customization.notes}\n`;
    }
    msg += `   • Valor Unitário: ${formatBRL(item.unitPrice)}\n`;
    msg += `   • Subtotal Item: *${formatBRL(item.finalTotal)}*\n`;
  });

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  if (address) {
    msg += `📍 *ENDEREÇO DE ENTREGA:*\n`;
    msg += `${address.logradouro}, ${address.numero}${address.complemento ? ` (${address.complemento})` : ''}\n`;
    msg += `${address.bairro} - ${address.cidade}/${address.uf}\n`;
    msg += `CEP: ${address.cep}\n`;
  }

  if (shipping) {
    msg += `🚚 *Frete:* ${shipping.name} (${shipping.prazo}) - ${shipping.price === 0 ? 'Grátis' : formatBRL(shipping.price)}\n`;
  }

  msg += `💳 *Forma de Pagamento:* ${paymentMethod.toUpperCase()}\n`;
  if (discount > 0) {
    msg += `🎟️ *Desconto Aplicado:* -${formatBRL(discount)}\n`;
  }
  msg += `💰 *VALOR TOTAL: ${formatBRL(total)}*\n`;

  if (notes) {
    msg += `\n📝 *Observações Gerais:* ${notes}\n`;
  }

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `Gostaria de confirmar os detalhes da produção e receber a prévia da arte! 🚀`;

  const encoded = encodeURIComponent(msg);
  return `https://wa.me/${BLESS_PHONE_NUMBER}?text=${encoded}`;
}

export function generateWhatsAppQuickQuoteUrl(params: {
  productName: string;
  quantity: number;
  technique: string;
  customerName?: string;
  details?: string;
}): string {
  const { productName, quantity, technique, customerName, details } = params;

  let msg = `Olá, Equipe Bless! Gostaria de um orçamento personalizado. 🌟\n\n`;
  if (customerName) {
    msg += `Meu nome é *${customerName}*.\n`;
  }
  msg += `• *Produto:* ${productName}\n`;
  msg += `• *Técnica desejada:* ${technique}\n`;
  msg += `• *Quantidade estimada:* ${quantity} unidades\n`;
  if (details) {
    msg += `• *Detalhes/Dúvidas:* ${details}\n`;
  }
  msg += `\nPoderiam me enviar os valores e prazos para esta quantidade? Obrigado!`;

  return `https://wa.me/${BLESS_PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;
}
