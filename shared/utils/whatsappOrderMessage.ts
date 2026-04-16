import { CartItem } from "@/shared/interfaces/cart";
import { CheckoutFormData } from "@/shared/interfaces/checkout";
import { formatUSD } from "@/shared/utils/formatPrice";
import { BRAND } from "@/shared/constants/contact";

interface GenerateOrderMessageParams {
  items: CartItem[];
  formData: CheckoutFormData;
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingZoneName: string;
  estimatedDays: string;
}

export function generateWhatsAppOrderMessage(params: GenerateOrderMessageParams): string {
  const { items, formData, subtotal, shippingCost, total, shippingZoneName, estimatedDays } =
    params;

  const isFreeShipping = shippingCost === 0;

  let message = `🧶 *¡Hola ${BRAND.NAME}! Quiero hacer un pedido* 🧶\n\n`;

  // Datos del cliente
  message += `👤 *Mis datos:*\n`;
  message += `   • Nombre: ${formData.fullName}\n`;
  message += `   • Teléfono: ${formData.phone}\n`;
  if (formData.email) {
    message += `   • Correo: ${formData.email}\n`;
  }
  message += `\n`;

  // Dirección de envío
  message += `📍 *Dirección de entrega:*\n`;
  message += `   • Provincia: ${formData.province}\n`;
  message += `   • Cantón: ${formData.canton}\n`;
  message += `   • Dirección: ${formData.address}\n`;
  message += `\n`;

  // Productos
  message += `🛒 *Mi pedido:*\n\n`;
  items.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   🎨 Color: ${item.color}\n`;
    message += `   📦 Cantidad: ${item.quantity}\n`;
    message += `   💵 Precio unitario: ${formatUSD(item.price)}\n`;
    message += `   💰 Subtotal: ${formatUSD(item.price * item.quantity)}\n`;
    message += `\n`;
  });

  // Resumen de costos
  message += `━━━━━━━━━━━━━━━━\n`;
  message += `💵 Subtotal: ${formatUSD(subtotal)}\n`;
  message += `🚚 Envío (${shippingZoneName}): ${
    isFreeShipping ? "¡GRATIS! 🎉" : formatUSD(shippingCost)
  }\n`;
  message += `⏱️ Tiempo estimado: ${estimatedDays}\n`;
  message += `━━━━━━━━━━━━━━━━\n`;
  message += `💳 *TOTAL: ${formatUSD(total)}*\n\n`;

  // Notas adicionales
  if (formData.notes) {
    message += `📝 *Notas:* ${formData.notes}\n\n`;
  }

  message += `_Pago en USD. Por favor confirmar disponibilidad y método de pago._`;

  return message;
}
