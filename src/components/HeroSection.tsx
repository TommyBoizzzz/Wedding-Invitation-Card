import React from 'react';
import { Calendar, MapPin, QrCode, Sparkles } from 'lucide-react';
import image01 from '../assets/images/wedding-hero.jpg';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden pt-6 pb-12 sm:pb-16">
      {/* Background Hero Banner with soft overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={image01}
          alt="Angkor Wat Wedding"
          className="w-full h-full object-cover object-center filter blur-xs opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d2d22]/60 via-[#1d2d22]/75 to-[#1f2d22]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text & Ceremony Lead-in */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>សិរីមង្គលអាពាហ៍ពិពាហ៍ · ក្ដីស្នេហ៍ អមតៈ</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-black text-white font-khmer-title tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                ហេង គីមហ៊ <span className="text-rose-300 font-serif">❤️</span> សន ធារ៉ា
              </h1>
              <p className="text-sm sm:text-base text-amber-50/85 font-cinzel font-semibold tracking-wide">
                Heng Kimhor & Sorn Theara · Wedding Celebration
              </p>
            </div>

            <p className="text-stone-100 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-khmer-body drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] text-center lg:text-left">
              យើងខ្ញុំមានកិត្តិយស និងសេចក្ដីសោមនស្សរីករាយឥតឧបមា សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោកឧកញ៉ា លោក លោកស្រី អ្នកនាងកញ្ញា និងប្រិយមិត្តជិតឆ្ងាយ អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គលក្នុង ពិធីរៀបអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ។
            </p>

            {/* Event Highlights Strip */}
            <div className="bg-[#183126]/80 backdrop-blur-md rounded-2xl border border-amber-200/20 p-4 shadow-lg shadow-[#08140e]/30 max-w-lg mx-auto lg:mx-0 space-y-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-100">
                <Calendar className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="font-semibold text-amber-100">
                  ថ្ងៃសៅរ៍ ទី ២៣ ខែ មករា ឆ្នាំ ២០២៧ (វេលាម៉ោង ៥:០០ ល្ងាច)
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-300">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                <span>
                  នៅភោជនីយដ្ឋាន និងសាលរៀបចំកម្មវិធី ផ្កាឈូកទេព (​ អគារ G ) រាជធានីភ្នំពេញ
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#location"
                className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-amber-200/30 text-white rounded-xl text-fluid-sm font-semibold shadow-xs transition-all flex items-center gap-2"
              >
                <QrCode className="w-4 h-4 text-amber-300" />
                <span>ស្កេនទីតាំងពិធី</span>
              </a>
              <a
                href="#gift"
                className="px-5 py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-200/30 text-amber-50 rounded-xl text-fluid-sm font-semibold transition-all flex items-center gap-2"
              >
                <span>បាញ់ចំណងដៃ KHQR</span>
              </a>
            </div>
          </div>

          {/* Right Column: Featured Couple Photo with Elegant Gold Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Outer decorative gold frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber-300 via-amber-400 to-amber-200 opacity-60 blur-xs"></div>
              
              <div className="relative bg-white p-2.5 rounded-3xl shadow-xl border-2 border-amber-300/80 overflow-hidden">
                <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-100">
                  <img
                    src={image01}
                    alt="ហេង គីមហ៊ &​ សន ធារ៉ា"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="text-center py-3 bg-gradient-to-b from-transparent to-amber-50/50 rounded-b-2xl">
                  <p className="text-sm font-bold text-amber-950 font-khmer-title">
                    ហេង គីមហ៊ &​ សន ធារ៉ា
                  </p>
                  <p className="text-[11px] text-stone-500 font-cinzel mt-0.5">
                    Phnom Penh · 2027
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
