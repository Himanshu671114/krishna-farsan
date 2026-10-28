import React from 'react';
import { Sparkles, Truck, Heart, ArrowDown, FileImage } from 'lucide-react';
import { PHOTO_HAMPER_REALISTIC } from '../data/products';
import { CONTACT_PERSON, BUSINESS_PHONE } from '../utils/whatsapp';

interface HeroProps {
  onOpenPosterModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPosterModal }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#580C0F] via-[#7A1014] to-[#4A0A0C] text-[#FFFDF7] pt-8 pb-14 px-4 sm:px-6 border-b-4 border-[#C59B27]">
      {/* Background festive ambient */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_#DFB047_0%,_transparent_70%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#42080A]/90 border border-[#C59B27]/50 rounded-full text-xs text-[#DFB047] font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>100% Homemade · Authentic Maharashtrian Diwali Faral</span>
            </div>

            {/* Main Brand Title in Hindi */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#FFFDF7] font-marathi-display drop-shadow-md">
                कृष्णा गृहउद्योग फरसाण
              </h1>
              <div className="inline-block px-4 py-1 bg-[#C59B27] text-[#580C0F] font-black text-lg sm:text-xl rounded-md tracking-wide shadow-md">
                Diwali Faral Special · दिवाळी फराळ विशेष
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#F3E9D2] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Make your Diwali delightful and delicious with authentic homemade Maharashtrian faral. 
              Pure ghee laddus, spiky crunchy bhajani chakli, thick spicy shev, sweet shankarpale, and rich dryfruit karanji prepared with traditional heritage.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 py-2 text-xs sm:text-sm text-[#F6EEDA]">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#DFB047] shrink-0" />
                <span>Pure Ghee & Premium Ingredients</span>
              </div>
              <span className="text-[#C59B27]">·</span>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#DFB047] shrink-0" />
                <span><strong>Free Home Delivery in Malad Area</strong></span>
              </div>
            </div>

            {/* CTAs in English */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#individual-faral"
                className="px-5 py-2.5 bg-[#DFB047] hover:bg-[#EAC05C] text-[#580C0F] font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2 whitespace-nowrap"
              >
                <span>Shop Individual Faral</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#combos"
                className="px-5 py-2.5 bg-[#42080A] hover:bg-[#320608] border border-[#C59B27] text-[#FFFDF7] font-bold text-sm rounded-xl shadow transition-colors whitespace-nowrap"
              >
                <span>Faral Combos (₹599 & ₹1,099)</span>
              </a>

              <button
                onClick={onOpenPosterModal}
                className="px-3.5 py-2.5 bg-transparent hover:bg-white/10 border border-[#C59B27]/50 text-[#DFB047] text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <FileImage className="w-3.5 h-3.5" />
                <span>View Reference Poster</span>
              </button>
            </div>

            <div className="text-xs text-[#F3E9D2]/80 pt-1">
              For direct orders & inquiries: <strong className="text-[#DFB047]">{CONTACT_PERSON} ({BUSINESS_PHONE})</strong>
            </div>
          </div>

          {/* Right Column: Realistic Hamper Presentation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm bg-[#FFFDF7] text-[#2B140E] rounded-2xl p-3.5 shadow-2xl border-2 border-[#C59B27] rotate-1 hover:rotate-0 transition-transform">
              <div className="bg-[#7A1014] text-[#DFB047] text-center py-1.5 px-3 rounded-t-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Diwali Festive Gift Hamper</span>
              </div>

              {/* Realistic Hamper Photo */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-xl bg-[#FAF5EA] my-2.5 border border-[#C59B27]/30">
                <img
                  src={PHOTO_HAMPER_REALISTIC}
                  alt="Traditional Maharashtrian Diwali Faral Gift Hamper"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2.5 right-2.5 bg-[#580C0F]/90 text-[#FFFDF7] px-3 py-1 rounded-lg text-xs font-bold border border-[#DFB047]/60 shadow-md">
                  ₹599 & ₹1,099 Combos
                </div>
              </div>

              <div className="px-2 py-1 text-center">
                <p className="text-xs text-[#7A1014] font-bold">
                  All 7 Traditional Maharashtrian Sweets & Savouries
                </p>
                <p className="text-[11px] text-[#665343] mt-0.5">
                  Chakli · Karanji · Besan Laddu · Rava Laddu · Tikhat Shev · Shankarpaale · Pohe Chiwda
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
