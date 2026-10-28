import React from 'react';
import { Phone, ShoppingBag, MessageCircle, Sparkles, FileImage } from 'lucide-react';
import { BUSINESS_PHONE, CONTACT_PERSON, WHATSAPP_NUMBER } from '../utils/whatsapp';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenPosterModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenPosterModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#580C0F] text-[#FFFDF7] border-b border-[#C59B27]/40 shadow-md">
      {/* Top announcement bar */}
      <div className="bg-[#42080A] text-[#F3E9D2] text-xs py-1.5 px-4 text-center border-b border-[#C59B27]/20 flex items-center justify-center gap-2">
        <span className="text-[#DFB047] font-semibold">🪔 Happy Diwali!</span>
        <span aria-hidden="true" className="opacity-60">·</span>
        <span><strong>Free Home Delivery in Malad Area</strong></span>
        <span aria-hidden="true" className="hidden sm:inline opacity-60">·</span>
        <span className="hidden sm:inline">Contact: {CONTACT_PERSON} ({BUSINESS_PHONE})</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Main Business Brand Title in Hindi as required */}
        <a href="#" className="flex items-center gap-2.5 group whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#C59B27] flex items-center justify-center text-[#580C0F] shadow-sm">
            <Sparkles className="w-4 h-4 fill-current" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#FFFDF7] font-marathi-display block leading-none">
              कृष्णा गृहउद्योग फरसाण
            </span>
            <span className="text-[10px] sm:text-xs text-[#DFB047] font-medium tracking-wide uppercase block mt-0.5">
              Authentic Maharashtrian Diwali Faral
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links in English */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#F3E9D2]">
          <a href="#individual-faral" className="hover:text-[#DFB047] transition-colors whitespace-nowrap shrink-0">
            Individual Faral Products
          </a>
          <a href="#combos" className="hover:text-[#DFB047] transition-colors whitespace-nowrap shrink-0">
            Faral Combos
          </a>
          <a href="#delivery-info" className="hover:text-[#DFB047] transition-colors whitespace-nowrap shrink-0">
            Delivery Details
          </a>
          <button
            onClick={onOpenPosterModal}
            className="flex items-center gap-1.5 text-xs text-[#DFB047] hover:text-[#FFFDF7] border border-[#C59B27]/50 rounded-lg px-2.5 py-1 transition-colors whitespace-nowrap shrink-0"
          >
            <FileImage className="w-3.5 h-3.5" />
            <span>View Reference Poster</span>
          </button>
        </nav>

        {/* Zone 3: Contact & Shopping Cart */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={`tel:${BUSINESS_PHONE}`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#FFFDF7] bg-[#7A1014] hover:bg-[#8B1419] border border-[#C59B27]/40 rounded-lg transition-colors whitespace-nowrap"
            title={`Call ${CONTACT_PERSON}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#DFB047]" />
            <span>Call: {BUSINESS_PHONE}</span>
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#FFFDF7] bg-[#1E7E34] hover:bg-[#155724] rounded-lg transition-colors whitespace-nowrap"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-[#580C0F] bg-[#DFB047] hover:bg-[#EAC05C] rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shopping Cart</span>
            {cartCount > 0 && (
              <span className="ml-1 bg-[#580C0F] text-[#FFFDF7] text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
