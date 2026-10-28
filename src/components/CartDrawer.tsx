import React from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { calculateCartTotals } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const { subtotal, totalItemsCount } = calculateCartTotals(items);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF7] text-[#2B140E] shadow-2xl flex flex-col border-l-2 border-[#C59B27]/40">
          {/* Drawer Header */}
          <div className="p-4 bg-[#580C0F] text-[#FFFDF7] flex items-center justify-between border-b border-[#C59B27]/40">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#DFB047]" />
              <h2 className="text-lg font-bold">
                Shopping Cart ({totalItemsCount})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#F3E9D2] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery notice */}
          <div className="bg-[#FAF5EA] px-4 py-2.5 text-xs border-b border-[#C59B27]/20 flex items-center gap-2 text-[#580C0F]">
            <Truck className="w-4 h-4 text-[#C59B27] shrink-0" />
            <span>
              <strong>Free Home Delivery in Malad!</strong> Other locations confirmed upon WhatsApp order.
            </span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF5EA] flex items-center justify-center text-[#C59B27]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="text-base font-bold text-[#580C0F]">
                  Your Shopping Cart is Empty
                </h3>
                <p className="text-xs text-[#665343] max-w-xs mx-auto">
                  Add authentic Maharashtrian faral items or Diwali gift hampers to get started.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-[#7A1014] text-[#FFFDF7] text-xs font-semibold rounded-lg hover:bg-[#8B1419] transition-colors"
                >
                  Browse Faral
                </button>
              </div>
            ) : (
              items.map((item) => {
                const lineTotal = item.unitPrice * item.quantity;
                return (
                  <div
                    key={item.cartId}
                    className="p-3 bg-[#FAF5EA] rounded-xl border border-[#C59B27]/30 flex gap-3 items-center justify-between"
                  >
                    <div className="space-y-1 flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#580C0F] truncate block">
                          {item.nameEn}
                        </span>
                        {item.type === 'combo' && (
                          <span className="text-[10px] bg-[#7A1014] text-[#DFB047] px-1.5 py-0.2 rounded font-semibold whitespace-nowrap">
                            Combo
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-[#665343]">
                        {item.type === 'individual' ? (
                          <span>Weight: <strong className="text-[#580C0F]">{item.weightLabel}</strong></span>
                        ) : (
                          <span className="italic text-[11px] text-[#7A1014]">All 7 festive snacks included</span>
                        )}
                      </div>

                      <div className="text-xs text-[#580C0F] tabular-nums font-semibold">
                        ₹{item.unitPrice} × {item.quantity} = <strong className="text-sm font-black text-[#7A1014]">₹{lineTotal}</strong>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.cartId)}
                        className="text-[#94171D] hover:text-[#580C0F] p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-white border border-[#C59B27]/40 rounded-lg p-0.5 shadow-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, -1)}
                          className="w-6 h-6 flex items-center justify-center text-[#580C0F] hover:bg-[#FAF5EA] rounded transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#580C0F] w-5 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#580C0F] hover:bg-[#FAF5EA] rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-4 bg-[#FAF5EA] border-t-2 border-[#C59B27]/30 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#665343] font-medium">Subtotal:</span>
                <span className="text-xl font-black text-[#580C0F] tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="text-[11px] text-[#665343] space-y-0.5">
                <p>• Free home delivery in Malad area.</p>
                <p>• Other Mumbai locations confirmed upon ordering.</p>
              </div>

              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-3 bg-[#7A1014] hover:bg-[#8B1419] text-[#FFFDF7] font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2 border border-[#DFB047]/40"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#DFB047]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
