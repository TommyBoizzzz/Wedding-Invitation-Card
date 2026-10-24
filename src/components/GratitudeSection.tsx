import React from 'react';
import { Heart, Flower } from 'lucide-react';

export const GratitudeSection: React.FC = () => {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F5ECE0] rounded-3xl border border-amber-300/80 p-8 sm:p-12 text-center shadow-md relative overflow-hidden">
        {/* Subtle decorative motif */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100/90 text-amber-800 mb-4 border border-amber-300 shadow-xs">
          <Heart className="w-5 h-5 fill-amber-600 text-amber-700" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold font-khmer-title text-amber-950 mb-4">
          សេចក្ដីថ្លែងអំណរគុណ និងសូមអភ័យទោស
        </h3>

        <div className="max-w-2xl mx-auto space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-khmer-body">
          <p className="text-justify sm:text-center">
            យើងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះការអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយសក្នុងពិធីរបស់យើងខ្ញុំ និងសូមខន្តីអភ័យទោស ដោយពុំបានជួបអញ្ជើញដោយផ្ទាល់ និងការសរសេរឈ្មោះរបស់ភ្ញៀវកិត្តិយសមិនបានត្រឹមត្រូវ ឬពុំបានសរសេរឈ្មោះ។
          </p>
          <p className="text-amber-900 font-semibold text-justify sm:text-center">
            សូមជូនពរ ឯកឧត្តម លោកឧកញ៉ា លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា សូមមានសុខភាពល្អ និងទទួលបានជោគជ័យគ្រប់ភារកិច្ច។
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-amber-200/80 flex flex-col items-center justify-center space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-800">
            ដោយសេចក្ដីគោរព និងស្រឡាញ់ដ៏ស្មោះស្ម័គ្រ
          </p>
          <p className="text-base sm:text-lg font-bold font-khmer-title text-amber-950">
            (ឈ្មោះកូនប្រុស) & (ឈ្មោះកូនស្រី)
          </p>
          <p className="text-xs text-stone-500 font-cinzel">
            Chi Kraeng, Siem Reap · 22 November 2026
          </p>
        </div>
      </div>
    </section>
  );
};
