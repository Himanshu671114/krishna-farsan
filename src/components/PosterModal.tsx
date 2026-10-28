import React, { useState } from 'react';
import { X, ZoomIn, Sparkles, ExternalLink } from 'lucide-react';
import { POSTER_MAIN_IMAGE, POSTER_HAMPER_IMAGE } from '../data/products';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PosterModal: React.FC<PosterModalProps> = ({ isOpen, onClose }) => {
  const [selectedPoster, setSelectedPoster] = useState<'main' | 'hamper'>('main');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-2 sm:p-4">
        <div className="relative inline-block w-full max-w-4xl p-4 sm:p-6 my-8 text-left align-middle bg-[#FFFDF7] rounded-2xl shadow-2xl border-2 border-[#C59B27] transform transition-all text-[#2B140E]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#C59B27]/30 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C59B27]" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#580C0F]">
                  Official Reference Posters · कृष्णा गृहउद्योग फरसाण
                </h3>
                <p className="text-xs text-[#7A1014]">
                  Authoritative rate card, snack items, and combo hamper reference posters
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#665343] hover:text-[#580C0F] p-1.5 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Poster Switcher Tabs */}
          <div className="flex gap-2 mb-4 bg-[#F6EEDA] p-1.5 rounded-xl border border-[#C59B27]/20 max-w-md">
            <button
              onClick={() => setSelectedPoster('main')}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg transition-colors text-center ${
                selectedPoster === 'main'
                  ? 'bg-[#7A1014] text-[#FFFDF7] shadow-sm'
                  : 'text-[#580C0F] hover:bg-[#EAE0C4]'
              }`}
            >
              Poster 1: Full Rate Card & Combos
            </button>
            <button
              onClick={() => setSelectedPoster('hamper')}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg transition-colors text-center ${
                selectedPoster === 'hamper'
                  ? 'bg-[#7A1014] text-[#FFFDF7] shadow-sm'
                  : 'text-[#580C0F] hover:bg-[#EAE0C4]'
              }`}
            >
              Poster 2: Festive Gift Hamper
            </button>
          </div>

          {/* Image Display */}
          <div className="relative max-h-[72vh] overflow-auto rounded-xl border-2 border-[#C59B27]/40 bg-[#FAF5EA] flex justify-center p-2">
            <img
              src={selectedPoster === 'main' ? POSTER_MAIN_IMAGE : POSTER_HAMPER_IMAGE}
              alt="Krishna Gruhudyog Farsan Official Diwali Poster"
              className="max-h-[68vh] w-auto object-contain rounded shadow"
            />
          </div>

          {/* Footer note */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#665343] pt-2 border-t border-[#C59B27]/20">
            <span>
              All snacks are 100% homemade, freshly prepared with authentic traditional recipes.
            </span>
            <a
              href={selectedPoster === 'main' ? POSTER_MAIN_IMAGE : POSTER_HAMPER_IMAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#7A1014] hover:text-[#580C0F] font-bold"
            >
              <ZoomIn className="w-4 h-4" />
              <span>Open in Full Size</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
