
import React from 'react';
import { Heart, MapPin, Sparkles } from 'lucide-react';

export const InvitationCard: React.FC = () => {
  return (
    <section
      id="invitation"
      className="w-full max-w-4xl mx-auto px-3 sm:px-5 py-8 sm:py-12"
    >
      {/* Main Wedding Invitation Card */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-amber-300/40 bg-[#21372b]/95 p-5 sm:p-10 md:p-12 shadow-2xl shadow-[#08140e]/50">

        {/* Subtle Decorative Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-amber-300/[0.04] blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-emerald-300/[0.04] blur-3xl" />
          <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-amber-300/10" />
        </div>

        {/* Decorative Corners */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/80 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/80 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/80 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/80 rounded-br-lg pointer-events-none" />

        <div className="relative z-10">

          {/* ========================================
              HEADER
          ======================================== */}
          <header className="text-center mb-8 sm:mb-10">

            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-200/10 border border-amber-300/40 shadow-lg shadow-black/10 mb-4">
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-amber-300 text-amber-300" />
            </div>

            <p className="text-fluid-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] text-amber-200 uppercase">
              លិខិតអញ្ជើញអាពាហ៍ពិពាហ៍ផ្លូវការ
            </p>

            <h2 className="text-fluid-2xl font-khmer-title text-white mt-3 mb-4 leading-relaxed">
              សិរីមង្គលអាពាហ៍ពិពាហ៍
            </h2>

            {/* Couple Names */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-amber-100 font-semibold text-fluid-lg font-khmer-title">
              <span>ហេង គីមហ៊</span>

              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-300 text-rose-300 shrink-0" />

              <span>សន ធារ៉ា</span>
            </div>

            <p className="text-fluid-sm text-stone-300 italic mt-3 font-khmer-body">
              « ក្ដីស្នេហ៍ អមតៈ »
            </p>

            {/* Header Ornament */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-400/70" />
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-400/70" />
            </div>
          </header>

          {/* ========================================
              PARENTS & COUPLE INFORMATION
          ======================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 py-6 sm:py-8 border-y border-amber-200/25 my-7 bg-[#183126]/70 rounded-2xl p-4 sm:p-7 text-center">

            {/* Groom's Family */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm tracking-wide text-amber-200 font-semibold">
                មាតាបិតាខាងកូនប្រុស
              </p>

              <p className="text-base sm:text-lg font-bold text-white font-khmer-title leading-relaxed">
                លោក​ មាស សុផល
              </p>

              <p className="text-sm sm:text-base font-semibold text-stone-200 leading-relaxed">
                និង លោកស្រី{' '}
                <span className="font-bold text-amber-100">
                  ប្រាក់ ប៊ុនអេង
                </span>
              </p>

              <div className="pt-3">
                <span className="text-xs sm:text-sm text-stone-300">
                  កូនប្រុសនាម៖
                </span>

                <p className="text-lg sm:text-xl font-bold text-amber-200 font-khmer-title mt-1">
                  ហេង គីមហ៊
                </p>

                <p className="text-xs text-stone-300 font-cinzel mt-1">
                  Groom: Heng Kimhor
                </p>
              </div>
            </div>

            {/* Bride's Family */}
            <div className="space-y-2 border-t md:border-t-0 md:border-l border-amber-200/25 pt-5 md:pt-0 md:pl-5">
              <p className="text-xs sm:text-sm tracking-wide text-amber-200 font-semibold">
                មាតាបិតាខាងកូនស្រី
              </p>

              <p className="text-base sm:text-lg font-bold text-white font-khmer-title leading-relaxed">
                លោក​ សន ចិត្រា
              </p>

              <p className="text-sm sm:text-base font-semibold text-stone-200 leading-relaxed">
                និង លោកស្រី{' '}
                <span className="font-bold text-amber-100">
                  សួង ចន្ធី
                </span>
              </p>

              <div className="pt-3">
                <span className="text-xs sm:text-sm text-stone-300">
                  កូនស្រីនាម៖
                </span>

                <p className="text-lg sm:text-xl font-bold text-amber-200 font-khmer-title mt-1">
                  សន ធារ៉ា
                </p>

                <p className="text-xs text-stone-300 font-cinzel mt-1">
                  Bride: Sorn Theara
                </p>
              </div>
            </div>
          </div>

          {/* ========================================
              INVITATION MESSAGE
          ======================================== */}
          <div className="max-w-2xl mx-auto space-y-4 text-stone-200 leading-8 font-khmer-body text-sm sm:text-base">

            <p className="text-center font-semibold text-amber-200 text-base sm:text-lg">
              មានកិត្តិយសសូមគោរពអញ្ជើញ
            </p>

            <p className="text-justify sm:text-center leading-8">
              ឯកឧត្តម លោកជំទាវ លោកឧកញ៉ា លោក លោកស្រី អ្នកនាងកញ្ញា និងប្រិយមិត្ត
              អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ
              សិរីសួស្តី ជ័យមង្គលក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស-កូនស្រី
              របស់យើងខ្ញុំ និងពិសារបាយអាហារ ដែលនឹងប្រព្រឹត្តទៅតាមពេលវេលា
              និងទីកន្លែងដូចខាងក្រោម៖
            </p>
          </div>

          {/* ========================================
              DATE & TIME
          ======================================== */}
          <div className="mt-7 sm:mt-8 bg-[#183126]/85 border border-amber-300/30 rounded-2xl p-5 sm:p-7 text-center shadow-lg shadow-black/10">

            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-7 sm:w-12 bg-amber-400/50" />
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="h-px w-7 sm:w-12 bg-amber-400/50" />
            </div>

            <p className="text-xs sm:text-sm font-semibold text-amber-100 leading-relaxed">
              នៅថ្ងៃសៅរ៍ ១រោច ខែបុស្ស ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០
            </p>

            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white font-khmer-title leading-relaxed mt-3">
              ត្រូវនឹងថ្ងៃសៅរ៍ ទី ២៣ ខែមករា ឆ្នាំ ២០២៧
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">

              <div className="flex flex-col items-center justify-center gap-1 bg-white/[0.04] border border-amber-200/20 rounded-xl px-3 py-4">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-300">
                  Reception
                </span>

                <span className="text-sm sm:text-base font-semibold text-amber-100 font-khmer-body">
                  វេលាម៉ោង ៥:០០ ល្ងាច
                </span>

                <span className="text-xs text-stone-300 font-khmer-body">
                  ទទួលភ្ញៀវ
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-1 bg-white/[0.04] border border-amber-200/20 rounded-xl px-3 py-4">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-300">
                  Dinner
                </span>

                <span className="text-sm sm:text-base font-semibold text-amber-100 font-khmer-body">
                  វេលាម៉ោង ៥:៣០ ល្ងាច
                </span>

                <span className="text-xs text-stone-300 font-khmer-body">
                  ពិសារភោជនាហារ
                </span>
              </div>

            </div>
          </div>

          {/* ========================================
              VENUE
          ======================================== */}
          <div className="mt-8 sm:mt-10 text-center px-1 sm:px-3">

            <div className="inline-flex items-start justify-center gap-2 text-amber-200 font-bold text-sm sm:text-base md:text-lg leading-relaxed">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 shrink-0 mt-1" />

              <span>
                នៅភោជនីយដ្ឋាន និងសាលរៀបចំកម្មវិធី
                <br className="sm:hidden" />
                {' '}ផ្កាឈូកទេព (អគារ G)
              </span>
            </div>

            <p className="text-xs sm:text-sm md:text-base font-medium text-stone-100 leading-relaxed mt-3">
              ស្ថិតនៅ សង្កាត់ផ្សារដើមគរ ខណ្ឌទួលគោក
              <br className="sm:hidden" />
              {' '}រាជធានីភ្នំពេញ
            </p>

            <p className="text-xs sm:text-sm text-stone-300 font-medium leading-relaxed pt-2">
              ដោយមេត្រីភាព (សូមពិនិត្យមើលផ្លង់ និងស្កេនទីតាំងខាងក្រោម)
            </p>
          </div>

          {/* ========================================
              ELEGANT ENGLISH SUMMARY
          ======================================== */}
          <div className="relative mt-9 sm:mt-12 pt-7 sm:pt-8 border-t border-amber-200/20 text-center px-1 sm:px-4">

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
              <span className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-amber-400/80" />
              <span className="text-amber-300 text-lg leading-none">✦</span>
              <span className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-amber-400/80" />
            </div>

            <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.35em] text-amber-300 font-semibold uppercase mb-3">
              Together With Our Families
            </p>

            <h3 className="font-cinzel text-lg sm:text-2xl tracking-[0.1em] sm:tracking-[0.12em] text-amber-100 font-semibold">
              THE WEDDING DAY
            </h3>

            {/* Couple Names */}
            <div className="mt-5 space-y-2">
              <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm sm:text-base text-stone-100 font-medium tracking-wide">
                <span>Heng Kimhor</span>
                <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                <span>Sorn Theara</span>
              </p>

              <p className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] text-amber-300/80 uppercase">
                Groom &nbsp; · &nbsp; Bride
              </p>
            </div>

            {/* Date, Time & Venue */}
            <div className="mt-6 py-5 px-3 sm:px-6 border-y border-amber-300/20 bg-amber-100/[0.04] rounded-xl">

              <p className="font-cinzel text-sm sm:text-base text-amber-200 tracking-wide sm:tracking-wider">
                Saturday, 23 January 2027
              </p>

              <div className="mt-3 inline-flex items-center gap-2 text-xs sm:text-sm text-stone-100">
                <span className="text-amber-300">✦</span>
                <span>Guest Reception: 5:00 PM</span>
                <span className="text-amber-300">✦</span>
              </div>

              <p className="mt-2 text-xs sm:text-sm text-stone-200">
                Dinner: 5:30 PM
              </p>

              <p className="mt-4 text-xs sm:text-sm text-stone-200 leading-relaxed">
                Phka Chhouk Tep Wedding Hall
                <br />
                <span className="text-amber-200/80">
                  Building G · Phnom Penh, Cambodia
                </span>
              </p>
            </div>

            {/* Closing Message */}
            <div className="mt-6 space-y-2">
              <p className="font-cinzel text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] text-amber-300 font-semibold">
                WITH LOVE &amp; GRATITUDE
              </p>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Thank you for sharing in our special day.
              </p>

              <p className="text-[10px] sm:text-xs text-amber-200/80 italic leading-relaxed">
                Kindly refer to the map below for directions.
              </p>
            </div>

            {/* Bottom Ornament */}
            <div className="mt-6 text-amber-400/80 text-sm tracking-[0.5em]">
              ❧ ✦ ❧
            </div>
          </div>

          {/* Bottom Greeting */}
          <p className="mt-8 text-center text-[10px] sm:text-xs text-stone-400 tracking-wider">
            WITH JOYFUL HEARTS, WE LOOK FORWARD TO CELEBRATING WITH YOU
          </p>

        </div>
      </div>
    </section>
  );
};
