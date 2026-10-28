import { CartItem, CustomerDetails } from '../types';

export const BUSINESS_PHONE = '7400204683';
export const WHATSAPP_NUMBER = '917400204683';
export const CONTACT_PERSON = 'Urmila';
export const BUSINESS_NAME = 'कृष्णा गृहउद्योग फरसाण';

export function calculateCartTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { subtotal, totalItemsCount };
}

export function generateWhatsAppMessage(
  items: CartItem[],
  customer: CustomerDetails
): string {
  const { subtotal } = calculateCartTotals(items);
  const deliveryStatus = customer.isMalad
    ? '✅ Free Home Delivery (Malad Area)'
    : 'ℹ️ Other Area (Delivery availability & charges to be confirmed)';

  let message = `*🪔 NEW DIWALI FARAL ORDER - ${BUSINESS_NAME} 🪔*\n\n`;
  message += `*Customer Details:*\n`;
  message += `👤 Name: ${customer.fullName || 'Not provided'}\n`;
  message += `📱 Phone: ${customer.phoneNumber || 'Not provided'}\n`;
  message += `📍 Delivery Address: ${customer.deliveryAddress || 'Not provided'}\n`;
  message += `🏙️ Locality / Area: ${customer.locality || 'Not provided'}\n`;
  message += `🚚 Delivery: ${deliveryStatus}\n\n`;

  message += `*🛒 Order Summary:*\n`;
  message += `--------------------------------\n`;

  items.forEach((item, index) => {
    const itemTotal = item.unitPrice * item.quantity;
    if (item.type === 'combo') {
      message += `${index + 1}. *${item.nameEn}* (${item.nameMr})\n`;
      message += `   Rate: ₹${item.unitPrice} × ${item.quantity} = *₹${itemTotal}*\n`;
      if (item.comboItems && item.comboItems.length > 0) {
        message += `   _Included Snacks:_\n`;
        item.comboItems.forEach((ci) => {
          message += `   • ${ci.nameEn} (${ci.quantityEn})\n`;
        });
      }
    } else {
      message += `${index + 1}. *${item.nameEn}* (${item.nameMr})\n`;
      message += `   Weight: ${item.weightLabel || ''}\n`;
      message += `   Rate: ₹${item.unitPrice} × ${item.quantity} = *₹${itemTotal}*\n`;
    }
    message += `\n`;
  });

  message += `--------------------------------\n`;
  message += `*💰 Subtotal: ₹${subtotal}*\n`;
  if (customer.isMalad) {
    message += `*🚚 Delivery Charges: ₹0 (Free in Malad)*\n`;
    message += `*🏷️ Total Amount: ₹${subtotal}*\n\n`;
  } else {
    message += `*🚚 Delivery Charges: Confirmation Needed*\n`;
    message += `*🏷️ Estimated Total: ₹${subtotal} (+ delivery if applicable)*\n\n`;
  }

  if (customer.notes && customer.notes.trim()) {
    message += `📝 *Special Notes:* ${customer.notes.trim()}\n\n`;
  }

  message += `_Please review and tap Send to place this order with ${BUSINESS_NAME}. Thank you and Happy Diwali!_ 🪔✨`;

  return message;
}

export function getWhatsAppOrderUrl(items: CartItem[], customer: CustomerDetails): string {
  const text = generateWhatsAppMessage(items, customer);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
