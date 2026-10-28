import React from 'react';
import { Phone, MessageCircle, Truck, Heart, MapPin, Sparkles } from 'lucide-react';
import { BUSINESS_PHONE, CONTACT_PERSON, WHATSAPP_NUMBER } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer id="delivery-info" className="bg-[#42080A] text-[#FFFDF7] border-t-4 border-[#C59B27] pt-12 pb-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Festive Greeting Banner */}
        <div className="text-center space-y-2 border-b border-[#C59B27]/30 pb-8">
          <div className="inline-flex items-center gap-2 text-[#DFB047] font-bold text-xl sm:text-2xl font-marathi-display">
            <span>✨ शुभ दीपावली · Happy Diwali! ✨</span>
          </div>
          <p className="text-sm text-[#F3E9D2] max-w-xl mx-auto">
            Purity, authentic taste, and traditional heritage. Bringing authentic homemade Maharashtrian festive snacks directly to your home.
          </p>
        </div>

        {/* 3-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {/* Column 1: Business Details */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-[#DFB047] flex items-center gap-2">
              <Sparkles className="w-4 h-4 fill-current" />
              <span>कृष्णा गृहउद्योग फरसाण</span>
            </h4>
            <p className="text-xs text-[#F3E9D2] leading-relaxed">
              Trusted homemade Maharashtrian Diwali faral. Pure ghee besan laddus, crisp karanji, spiky bhajani chakli, authentic thick shev, shankarpale, and special festive combos.
            </p>
            <div className="text-xs text-[#DFB047]">
              100% Homemade · Traditional Recipes · Pure Ghee
            </div>
          </div>

          {/* Column 2: Delivery Policy */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-[#DFB047] flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>Delivery Details</span>
            </h4>
            <div className="p-3.5 bg-[#580C0F] rounded-xl border border-[#C59B27]/30 space-y-2 text-xs">
              <div className="flex items-start gap-2 text-[#FFFDF7]">
                <MapPin className="w-4 h-4 text-[#DFB047] shrink-0 mt-0.5" />
                <div>
                  <strong>Malad Area:</strong>
                  <div className="text-[#DFB047] font-bold">Free Home Delivery!</div>
                </div>
              </div>
              <div className="text-[#F3E9D2] text-[11px] pt-1 border-t border-[#C59B27]/20">
                Other Mumbai locations: Delivery availability and charges to be confirmed upon order.
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Order Information */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-[#DFB047] flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Contact & Orders</span>
            </h4>
            <div className="space-y-2.5 text-xs">
              <p className="text-[#F3E9D2]">
                Contact Person: <strong className="text-white">{CONTACT_PERSON}</strong>
              </p>

              <div className="flex flex-col gap-2 pt-1">
                <a
                  href={`tel:${BUSINESS_PHONE}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#580C0F] hover:bg-[#7A1014] border border-[#C59B27]/40 text-white font-bold transition-colors w-fit"
                >
                  <Phone className="w-4 h-4 text-[#DFB047]" />
                  <span>Call: {BUSINESS_PHONE}</span>
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1E7E34] hover:bg-[#155724] text-white font-bold transition-colors w-fit"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet copyright footer */}
        <div className="pt-8 border-t border-[#C59B27]/20 text-center text-xs text-[#F3E9D2]/70 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} कृष्णा गृहउद्योग फरसाण. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-[#DFB047]">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-current text-red-500" />
            <span>for joyous Diwali celebrations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
