import React, { useState } from 'react';
import { CartItem, CustomerDetails } from '../types';
import { X, MessageCircle, Truck, AlertCircle, ShoppingBag, CheckCircle } from 'lucide-react';
import { calculateCartTotals, getWhatsAppOrderUrl, BUSINESS_PHONE, CONTACT_PERSON } from '../utils/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    phoneNumber: '',
    deliveryAddress: '',
    locality: 'Malad West',
    isMalad: true,
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isRedirecting, setIsRedirecting] = useState(false);

  if (!isOpen) return null;

  const { subtotal, totalItemsCount } = calculateCartTotals(items);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number.';
    }
    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Please enter your full delivery address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLocalityToggle = (isMalad: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isMalad,
      locality: isMalad
        ? (prev.locality || 'Malad West')
        : (prev.locality === 'Malad' || prev.locality === 'Malad West' ? '' : prev.locality),
    }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsRedirecting(true);
    const whatsappUrl = getWhatsAppOrderUrl(items, formData);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-2 sm:p-4">
        <div className="relative inline-block w-full max-w-xl p-5 sm:p-6 my-8 text-left align-middle bg-[#FFFDF7] rounded-2xl shadow-2xl border-2 border-[#C59B27] transform transition-all text-[#2B140E]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#C59B27]/30 pb-3 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#580C0F]">
                Checkout & Delivery Details
              </h2>
              <p className="text-xs text-[#7A1014] font-medium">
                कृष्णा गृहउद्योग फरसाण · Contact: {CONTACT_PERSON} ({BUSINESS_PHONE})
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#665343] hover:text-[#580C0F] p-1.5 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
            {/* Customer Information Inputs in English */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#580C0F] mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sawant"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3 py-2 text-sm bg-white rounded-lg border ${
                    errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C59B27]/40 focus:border-[#7A1014]'
                  } focus:outline-hidden`}
                />
                {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#580C0F] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98200XXXXX"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className={`w-full px-3 py-2 text-sm bg-white rounded-lg border ${
                    errors.phoneNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C59B27]/40 focus:border-[#7A1014]'
                  } focus:outline-hidden`}
                />
                {errors.phoneNumber && <p className="text-[11px] text-red-600 mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>

            {/* Locality & Delivery Area selector */}
            <div className="space-y-2 bg-[#FAF5EA] p-3.5 rounded-xl border border-[#C59B27]/30">
              <label className="block text-xs font-bold text-[#580C0F]">
                Delivery Locality / Area *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleLocalityToggle(true)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-start gap-2 ${
                    formData.isMalad
                      ? 'bg-[#7A1014] text-[#FFFDF7] border-[#C59B27] shadow-sm'
                      : 'bg-white text-[#580C0F] border-[#C59B27]/40 hover:bg-[#F3E9D2]'
                  }`}
                >
                  <Truck className="w-4 h-4 shrink-0 mt-0.5 text-[#DFB047]" />
                  <div>
                    <div className="font-bold">Malad Area</div>
                    <div className="text-[11px] opacity-90 text-[#DFB047]">
                      ✅ Free Home Delivery
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleLocalityToggle(false)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-start gap-2 ${
                    !formData.isMalad
                      ? 'bg-[#7A1014] text-[#FFFDF7] border-[#C59B27] shadow-sm'
                      : 'bg-white text-[#580C0F] border-[#C59B27]/40 hover:bg-[#F3E9D2]'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#DFB047]" />
                  <div>
                    <div className="font-bold">Other Mumbai Areas</div>
                    <div className="text-[11px] opacity-90">
                      Delivery charges confirmed upon order
                    </div>
                  </div>
                </button>
              </div>

              <div>
                <input
                  type="text"
                  placeholder={formData.isMalad ? 'e.g. Malad West / Liberty Garden' : 'e.g. Kandivali, Borivali, Goregaon, Andheri...'}
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-[#C59B27]/40 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-xs font-bold text-[#580C0F] mb-1">
                Delivery Address *
              </label>
              <textarea
                rows={2}
                required
                placeholder="Flat / House No., Building Name, Street, Landmark, Pin code"
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                className={`w-full px-3 py-2 text-sm bg-white rounded-lg border ${
                  errors.deliveryAddress ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C59B27]/40 focus:border-[#7A1014]'
                } focus:outline-hidden`}
              />
              {errors.deliveryAddress && <p className="text-[11px] text-red-600 mt-1">{errors.deliveryAddress}</p>}
            </div>

            {/* Optional Notes */}
            <div>
              <label className="block text-xs font-semibold text-[#665343] mb-1">
                Special Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Preferred delivery time, extra spicy chakli, etc."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-[#C59B27]/30 focus:outline-hidden"
              />
            </div>

            {/* Order Summary */}
            <div className="bg-[#FAF5EA] p-3.5 rounded-xl border border-[#C59B27]/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#580C0F] border-b border-[#C59B27]/20 pb-1.5">
                <span className="flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Order Summary ({totalItemsCount} item{totalItemsCount > 1 ? 's' : ''}):</span>
                </span>
                <span>Amount</span>
              </div>

              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 text-xs">
                {items.map((it) => (
                  <div key={it.cartId} className="flex justify-between items-center text-[#524338]">
                    <span className="truncate pr-2">
                      • {it.nameEn} {it.weightLabel ? `(${it.weightLabel})` : '(Combo)'} × {it.quantity}
                    </span>
                    <span className="font-semibold text-[#580C0F] tabular-nums whitespace-nowrap">
                      ₹{it.unitPrice * it.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#C59B27]/20 pt-2 space-y-1">
                <div className="flex justify-between text-xs text-[#665343]">
                  <span>Subtotal:</span>
                  <span className="tabular-nums font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-[#665343]">
                  <span>Delivery Charges:</span>
                  <span>
                    {formData.isMalad ? (
                      <strong className="text-[#1E7E34]">₹0 (Free in Malad)</strong>
                    ) : (
                      <span className="italic text-[#7A1014]">To be confirmed</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-black text-[#580C0F] pt-1 border-t border-[#C59B27]/20">
                  <span>Total Amount:</span>
                  <span className="tabular-nums text-[#7A1014]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Instruction Notice */}
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-[#665343] flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>How it works:</strong> Clicking <strong>Order on WhatsApp</strong> will open WhatsApp with your full order details prefilled. You simply need to review the message and press <strong>Send</strong>.
              </div>
            </div>

            {/* WhatsApp Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#1E7E34] hover:bg-[#155724] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Order on WhatsApp</span>
              </button>
            </div>

            {isRedirecting && (
              <p className="text-center text-xs text-[#1E7E34] font-medium animate-pulse">
                Opening WhatsApp... Please review the prefilled message and press Send.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
