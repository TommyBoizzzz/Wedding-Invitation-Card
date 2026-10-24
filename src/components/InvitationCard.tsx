import React from 'react';
import { Heart, MapPin } from 'lucide-react';

export const InvitationCard: React.FC = () => {
  return (
    <section id="invitation" className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Traditional Khmer Wedding Certificate / Invitation Card border styling */}
      <div className="relative bg-[#FFFDF9] border-2 border-amber-300/80 rounded-3xl p-6 sm:p-12 shadow-xl shadow-amber-950/5">
        {/* Decorative corner flourishes */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-600 rounded-tl-lg pointer-events-none"></div>
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-600 rounded-tr-lg pointer-events-none"></div>
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-600 rounded-bl-lg pointer-events-none"></div>
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-600 rounded-br-lg pointer-events-none"></div>

        {/* Header Emblem */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100/80 text-amber-800 mb-3 border border-amber-300 shadow-sm">
            <Heart className="w-6 h-6 fill-amber-600 text-amber-700" />
          </div>
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-amber-800 uppercase">
            លិខិតអញ្ជើញអាពាហ៍ពិពាហ៍ផ្លូវការ
          </p>
          <h2 className="text-2xl sm:text-4xl font-khmer-title text-amber-950 mt-1 mb-2">
            សិរីមង្គលអាពាហ៍ពិពាហ៍
          </h2>
          <div className="flex items-center justify-center gap-2 text-amber-900 font-semibold text-base sm:text-lg">
            <span>(ឈ្មោះកូនប្រុស)</span>
            <span className="text-rose-600 animate-pulse">❤️</span>
            <span>(ឈ្មោះកូនស្រី)</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 italic mt-0.5 font-khmer-body">
            « ក្ដីស្នេហ៍ អមតៈ »
          </p>
        </div>

        {/* Parents Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-y border-amber-200/60 my-6 bg-amber-50/30 rounded-2xl p-4 sm:p-6 text-center">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold block">
              មាតាបិតាខាងកូនប្រុស
            </span>
            <p className="text-base sm:text-lg font-bold text-amber-950 font-khmer-title leading-relaxed">
              (ឈ្មោះបិតា កូនប្រុស)
            </p>
            <p className="text-sm sm:text-base font-semibold text-stone-700">
              និង លោកស្រី <span className="font-bold text-amber-900">(ឈ្មោះមាតា កូនប្រុស)</span>
            </p>
            <div className="pt-2">
              <span className="text-xs text-stone-500">កូនប្រុសនាម៖</span>
              <p className="text-lg sm:text-xl font-bold text-amber-800 font-khmer-title">
                (ឈ្មោះកូនប្រុស)
              </p>
              <p className="text-xs text-stone-500 font-cinzel">Groom: (Groom Name)</p>
            </div>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-amber-200/80 pt-4 md:pt-0">
            <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold block">
              មាតាបិតាខាងកូនស្រី
            </span>
            <p className="text-base sm:text-lg font-bold text-amber-950 font-khmer-title leading-relaxed">
              (ឈ្មោះបិតា កូនស្រី)
            </p>
            <p className="text-sm sm:text-base font-semibold text-stone-700">
              និង លោកស្រី <span className="font-bold text-amber-900">(ឈ្មោះមាតា កូនស្រី)</span>
            </p>
            <div className="pt-2">
              <span className="text-xs text-stone-500">កូនស្រីនាម៖</span>
              <p className="text-lg sm:text-xl font-bold text-amber-800 font-khmer-title">
                (ឈ្មោះកូនស្រី)
              </p>
              <p className="text-xs text-stone-500 font-cinzel">Bride: (Bride Name)</p>
            </div>
          </div>
        </div>

        {/* Invitation Text */}
        <div className="text-center max-w-2xl mx-auto space-y-4 text-stone-700 leading-relaxed font-khmer-body text-sm sm:text-base">
          <p className="font-semibold text-amber-900 text-base sm:text-lg">
            មានកិត្តិយសសូមគោរពអញ្ជើញ
          </p>
          <p className="text-justify sm:text-center text-stone-700">
            ឯកឧត្តម លោកជំទាវ លោកឧកញ៉ា លោក លោកស្រី អ្នកនាងកញ្ញា និងប្រិយមិត្ត អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គលក្នុង ពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស-កូនស្រី របស់យើងខ្ញុំ និងពិសារបាយអាហារដែលនឹងប្រព្រឹត្តទៅ
          </p>

          {/* Time & Date Highlight */}
          <div className="bg-gradient-to-b from-amber-100/70 to-amber-50/70 border border-amber-300/80 rounded-2xl p-5 my-6 text-center space-y-2">
            <p className="text-xs sm:text-sm font-semibold text-amber-900">
              នៅថ្ងៃ អាទិត្យ ១៣កើត ខែកត្តិក ឆ្នាំ មមី អដ្ឋស័ក ព.ស ២៥៧០
            </p>
            <p className="text-lg sm:text-2xl font-bold text-amber-950 font-khmer-title">
              ត្រូវនឹងថ្ងៃ អាទិត្យ ទី ០១ ខែ មករា ឆ្នាំ ២០២៧
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-amber-900 pt-1">
              <span className="bg-white/80 px-3 py-1 rounded-full border border-amber-200">
                វេលាម៉ោង ៤:០០ ល្ងាច ទទួលភ្ញៀវ
              </span>
              <span className="bg-white/80 px-3 py-1 rounded-full border border-amber-200">
                វេលាម៉ោង ៥:០០ ល្ងាច ពិសារភោជនាហារ
              </span>
            </div>
          </div>

          {/* Venue */}
          <div className="space-y-1 text-center">
            <div className="inline-flex items-center gap-1.5 text-amber-800 font-bold text-base sm:text-lg">
              <MapPin className="w-5 h-5 text-amber-700" />
              <span>នៅ Coming Soon</span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-stone-800">
              ស្ថិតនៅ ......
            </p>
            <p className="text-xs text-stone-500 font-medium pt-1">
              ដោយមេត្រីភាព (សូមពិនិត្យមើលផ្លង់ និងស្កេនទីតាំងខាងក្រោម)
            </p>
          </div>
        </div>

        {/* English Summary Block */}
        <div className="mt-8 pt-6 border-t border-amber-200/60 text-center text-xs sm:text-sm text-stone-600 font-cinzel space-y-1">
          <p className="tracking-widest font-bold text-amber-900">THE WEDDING DAY</p>
          <p className="font-semibold text-stone-800">Groom: (Groom Name) · Bride: (Bride Name)</p>
          <p className="text-stone-500">
            On Sunday, 01st January 2027, at 4:00 PM, at the bride’s family home.
          </p>
          <p className="text-amber-800 font-semibold pt-1">Thank You! (Please See Map)</p>
        </div>

      </div>
    </section>
  );
};
