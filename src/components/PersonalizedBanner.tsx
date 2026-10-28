import React, { useState } from 'react';
import { Heart, Sparkles, Check, ChevronDown } from 'lucide-react';

interface PersonalizedBannerProps {
  guestName: string;
}

export const PersonalizedBanner: React.FC<PersonalizedBannerProps> = ({ guestName }) => {
  const [acknowledged, setAcknowledged] = useState<boolean>(false);

  if (!guestName.trim()) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-4 pb-2 animate-fade-in">
      <div className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-400/80 overflow-hidden text-center">
        {/* Decorative corner accents */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-amber-300/80 pointer-events-none"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-amber-300/80 pointer-events-none"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-amber-300/80 pointer-events-none"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-amber-300/80 pointer-events-none"></div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-700/60 border border-amber-400/60 text-amber-200 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>លិខិតអញ្ជើញជាកិត្តិយសពិសេស</span>
        </div>

        <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
          សូមគោរពអញ្ជើញជាពិសេសចំពោះ
        </p>

        {/* Highlighted Guest Name */}
        <h2 className="text-2xl sm:text-4xl font-black text-amber-100 font-khmer-title my-2 tracking-wide drop-shadow-md">
          {guestName}
        </h2>

        <p className="text-xs sm:text-sm text-stone-200 max-w-xl mx-auto leading-relaxed font-khmer-body">
          អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសដ៏ថ្លៃថ្លា ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ <br className="hidden sm:inline" />
          <strong className="text-amber-300 font-semibold">កូនកំលោះ ហេង គីមហ៊ & កូនក្រមុំសន ធារ៉ា</strong>
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#invitation"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-amber-300/40 text-amber-100 rounded-xl text-xs font-medium transition-colors"
          >
            <span>អានលិខិតអញ្ជើញពេញលេញ</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
