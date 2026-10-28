import React from 'react';
import { FaralCombo } from '../types';
import { Sparkles, ShoppingBag, Plus, Minus, Gift, PackageCheck, Check } from 'lucide-react';

interface ComboSectionProps {
  combos: FaralCombo[];
  getComboQuantity: (comboId: string) => number;
  onUpdateComboQuantity: (combo: FaralCombo, newQty: number) => void;
}

export const ComboSection: React.FC<ComboSectionProps> = ({
  combos,
  getComboQuantity,
  onUpdateComboQuantity,
}) => {
  return (
    <section id="combos" className="py-14 px-4 sm:px-6 bg-[#F6EEDA] border-t-2 border-b-2 border-[#C59B27]/40">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#580C0F] text-[#DFB047] rounded-full text-xs font-bold tracking-wide">
            <Gift className="w-3.5 h-3.5 fill-current" />
            <span>Special Diwali Hampers · खास फराळ कॉम्बो</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#580C0F]">
            Faral Combos
          </h2>

          <p className="text-sm text-[#665343]">
            Curated authentic Maharashtrian festive gift hampers containing all traditional sweets and savouries. Freshly prepared, beautifully packed, and ready to share.
          </p>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {combos.map((combo) => {
            const quantity = getComboQuantity(combo.id);

            return (
              <div
                key={combo.id}
                className={`bg-[#FFFDF7] rounded-2xl border-2 ${
                  combo.popular ? 'border-[#C59B27] shadow-xl' : 'border-[#C59B27]/50 shadow-md'
                } overflow-hidden flex flex-col justify-between transition-transform hover:-translate-y-1`}
              >
                {/* Popular Flag */}
                {combo.popular && (
                  <div className="bg-[#7A1014] text-[#DFB047] text-xs font-bold py-1.5 px-4 text-center tracking-wider uppercase flex items-center justify-center gap-1.5 border-b border-[#C59B27]">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>Most Popular Diwali Gift Hamper (All 7 Items in Double Quantity)</span>
                  </div>
                )}

                <div>
                  {/* Realistic Hamper Photo */}
                  <div className="relative h-60 sm:h-72 w-full bg-[#FAF5EA] overflow-hidden border-b border-[#C59B27]/30">
                    <img
                      src={combo.image}
                      alt={combo.nameEn}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Fixed Price Tag */}
                    <div className="absolute top-3 right-3 bg-[#580C0F] text-[#FFFDF7] px-4 py-1.5 rounded-xl text-xl font-black border-2 border-[#DFB047] shadow-lg">
                      ₹{combo.price.toLocaleString('en-IN')}
                    </div>

                    {quantity > 0 && (
                      <div className="absolute top-3 left-3 bg-[#1E7E34] text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>{quantity} in Cart</span>
                      </div>
                    )}
                  </div>

                  {/* Combo Info */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#580C0F]">
                          {combo.nameEn}
                        </h3>
                        <span className="text-xs font-semibold text-[#C59B27] font-marathi-display">
                          {combo.nameMr}
                        </span>
                      </div>
                      <p className="text-xs text-[#7A1014] font-medium">
                        {combo.subtitleMr}
                      </p>
                    </div>

                    {/* All Included Snacks with Exact Quantities */}
                    <div className="bg-[#FAF5EA] rounded-xl p-4 border border-[#C59B27]/30 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#580C0F] border-b border-[#C59B27]/30 pb-2">
                        <PackageCheck className="w-4 h-4 text-[#C59B27]" />
                        <span>Included Snacks & Exact Quantities:</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                        {combo.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-white border border-[#EAE0C4]"
                          >
                            <span className="font-semibold text-[#2B140E]">
                              • {item.nameEn} <span className="text-[10px] text-[#7A1014]">({item.nameMr})</span>
                            </span>
                            <span className="font-bold text-[#7A1014] tabular-nums whitespace-nowrap ml-2">
                              {item.quantityEn}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with Price and Reactive Quantity Stepper */}
                <div className="p-5 sm:p-6 pt-0 mt-2 border-t border-[#F3E9D2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#7A1014] font-medium block">All-Inclusive Fixed Price:</span>
                    <span className="text-2xl sm:text-3xl font-black text-[#580C0F] tabular-nums">
                      ₹{combo.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Clear Plus & Minus Buttons */}
                    <div className="flex items-center gap-1.5 bg-[#FAF5EA] border border-[#C59B27]/50 rounded-xl p-1 shadow-inner">
                      <button
                        type="button"
                        onClick={() => onUpdateComboQuantity(combo, Math.max(0, quantity - 1))}
                        disabled={quantity === 0}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                          quantity > 0
                            ? 'bg-white hover:bg-[#7A1014] text-[#580C0F] hover:text-white shadow-xs'
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                        aria-label={`Decrease ${combo.nameEn} quantity`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="w-8 text-center text-sm font-bold text-[#580C0F] tabular-nums">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => onUpdateComboQuantity(combo, quantity + 1)}
                        className="w-9 h-9 rounded-lg bg-white hover:bg-[#7A1014] text-[#580C0F] hover:text-white shadow-xs flex items-center justify-center font-bold text-sm transition-colors"
                        aria-label={`Increase ${combo.nameEn} quantity`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onUpdateComboQuantity(combo, quantity > 0 ? quantity + 1 : 1)}
                      className="px-5 py-2.5 bg-[#7A1014] hover:bg-[#8B1419] text-[#FFFDF7] font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-98 flex items-center gap-2 border border-[#DFB047]/40"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#DFB047]" />
                      <span>{quantity > 0 ? 'Add More' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
