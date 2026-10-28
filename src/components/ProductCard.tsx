import React, { useState } from 'react';
import { FaralProduct } from '../types';
import { ShoppingBag, Plus, Minus, Check } from 'lucide-react';

interface ProductCardProps {
  product: FaralProduct;
  cartQuantity: number; // current quantity in cart for the currently selected weight
  onQuantityChange: (
    product: FaralProduct,
    grams: number,
    weightLabel: string,
    packPrice: number,
    newQuantity: number
  ) => void;
  selectedWeightGrams: number;
  onWeightChange: (grams: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartQuantity,
  onQuantityChange,
  selectedWeightGrams,
  onWeightChange,
}) => {
  const [feedbackAdded, setFeedbackAdded] = useState(false);

  // Match the weight option
  const currentOption =
    product.weightOptions.find((w) => w.grams === selectedWeightGrams) ||
    product.weightOptions[0];

  const packPrice = Math.round(product.pricePerKg * currentOption.multiplier);

  const handleIncrement = () => {
    const nextQty = cartQuantity + 1;
    onQuantityChange(product, currentOption.grams, currentOption.labelEn, packPrice, nextQty);
    setFeedbackAdded(true);
    setTimeout(() => setFeedbackAdded(false), 900);
  };

  const handleDecrement = () => {
    if (cartQuantity > 0) {
      const nextQty = cartQuantity - 1;
      onQuantityChange(product, currentOption.grams, currentOption.labelEn, packPrice, nextQty);
    }
  };

  const handleDirectAdd = () => {
    const nextQty = cartQuantity > 0 ? cartQuantity + 1 : 1;
    onQuantityChange(product, currentOption.grams, currentOption.labelEn, packPrice, nextQty);
    setFeedbackAdded(true);
    setTimeout(() => setFeedbackAdded(false), 900);
  };

  return (
    <div className="bg-[#FFFDF7] rounded-2xl border border-[#C59B27]/40 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Realistic food photo with smooth hover zoom */}
        <div className="relative h-52 sm:h-56 w-full bg-[#FAF5EA] overflow-hidden border-b border-[#C59B27]/20">
          <img
            src={product.imageCrop.src}
            alt={`${product.nameEn} - Authentic Maharashtrian Faral`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Base rate tag */}
          <div className="absolute top-3 right-3 bg-[#580C0F] text-[#FFFDF7] px-3 py-1 rounded-lg text-xs font-bold border border-[#DFB047]/60 shadow-md">
            ₹{product.pricePerKg} <span className="text-[11px] text-[#DFB047] font-normal">/ kg</span>
          </div>

          {cartQuantity > 0 && (
            <div className="absolute top-3 left-3 bg-[#1E7E34] text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>{cartQuantity} in Cart</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-3">
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-[#580C0F] leading-tight">
                {product.nameEn}
              </h3>
              <span className="text-xs font-semibold text-[#C59B27] font-marathi-display">
                {product.nameMr}
              </span>
            </div>
            <p className="text-xs text-[#524338] mt-1 line-clamp-2 leading-relaxed">
              {product.descriptionEn}
            </p>
          </div>

          {/* EXACT REQUIREMENT: ONLY 500 g and 1 kg Options */}
          <div className="space-y-1.5 pt-1">
            <span className="text-xs font-bold text-[#580C0F] block">
              Select Weight:
            </span>
            <div className="grid grid-cols-2 gap-2 bg-[#F6EEDA] p-1.5 rounded-xl border border-[#C59B27]/30">
              {product.weightOptions.map((opt) => {
                const isSelected = selectedWeightGrams === opt.grams;
                const optPackPrice = Math.round(product.pricePerKg * opt.multiplier);
                return (
                  <button
                    key={opt.grams}
                    type="button"
                    onClick={() => onWeightChange(opt.grams)}
                    className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-[#7A1014] text-[#FFFDF7] shadow-sm'
                        : 'text-[#580C0F] hover:bg-[#EAE0C4]'
                    }`}
                  >
                    <span>{opt.labelEn}</span>
                    <span className={`text-[11px] font-semibold ${isSelected ? 'text-[#DFB047]' : 'text-[#7A1014]'}`}>
                      ₹{optPackPrice}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer with Price, Quantity Controls (− / +) and Add to Cart */}
      <div className="p-4 sm:p-5 pt-0 mt-1 border-t border-[#F3E9D2] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#7A1014] font-medium block">Pack Price ({currentOption.labelEn}):</span>
            <span className="text-xl font-black text-[#580C0F] tabular-nums">
              ₹{packPrice}
            </span>
          </div>

          {/* Clear Quantity Stepper (− / + buttons) */}
          <div className="flex items-center gap-1.5 bg-[#FAF5EA] border border-[#C59B27]/50 rounded-xl p-1 shadow-inner">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={cartQuantity === 0}
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                cartQuantity > 0
                  ? 'bg-white hover:bg-[#7A1014] text-[#580C0F] hover:text-white shadow-xs'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              aria-label={`Decrease ${product.nameEn} quantity`}
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-8 text-center text-sm font-bold text-[#580C0F] tabular-nums">
              {cartQuantity}
            </span>

            <button
              type="button"
              onClick={handleIncrement}
              className="w-8 h-8 rounded-lg bg-white hover:bg-[#7A1014] text-[#580C0F] hover:text-white shadow-xs flex items-center justify-center font-bold text-sm transition-colors"
              aria-label={`Increase ${product.nameEn} quantity`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add to Cart button */}
        <button
          type="button"
          onClick={handleDirectAdd}
          className={`w-full py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${
            feedbackAdded
              ? 'bg-[#1E7E34] text-white'
              : 'bg-[#C59B27] hover:bg-[#D4AF37] text-[#580C0F] active:scale-98'
          }`}
        >
          {feedbackAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>{cartQuantity > 0 ? `Add More (${currentOption.labelEn})` : `Add to Cart`}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
