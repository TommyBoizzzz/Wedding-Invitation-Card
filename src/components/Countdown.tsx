import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell } from 'lucide-react';

export const Countdown: React.FC = () => {
  // Wedding Date
  const targetDate = new Date('2027-01-01T07:00:00+07:00').getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('សិរីមង្គលអាពាហ៍ពិពាហ៍ | ហេង គីមហ៊ &​ សន ធារ៉ា');
    const details = encodeURIComponent('សូមគោរពអញ្ជើញចូលរួមពិធីរៀបអាពាហ៍ពិពាហ៍ កូនកំលោះ ហេង គីមហ៊ និង កូនក្រមុំសន ធារ៉ា នៅPhnom Penh។');
    const location = encodeURIComponent('ភូមិបេង ឃុំជីក្រែង ស្រុកជីក្រែង ខេត្តសៀមរាប');
    // 20261122T090000Z to 20261122T150000Z (4PM to 10PM ICT is 09:00 to 15:00 UTC)
    const dates = '20261122T090000Z/20261122T150000Z';
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-[#22382d]/90 backdrop-blur-md rounded-2xl border border-amber-200/25 shadow-lg shadow-[#08140e]/40 p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Subtle decorative gold motif */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-200 tracking-wider mb-2">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          <span>រាប់ថយក្រោយដល់ថ្ងៃសិរីសួស្តីជ័យមង្គល</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-khmer-title text-white mb-6">
          ថ្ងៃសៅរ៍ ទី ២៣ ខែ មករា ឆ្នាំ ២០២៧
        </h3>

        {timeLeft.isPast ? (
          <div className="py-4 text-amber-100 font-medium">
            ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍បានប្រព្រឹត្តទៅដោយជោគជ័យ និងមហោឡារិក!
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto mb-6">
            <div className="bg-[#183126]/90 border border-amber-300/25 rounded-xl p-3 sm:p-4 text-center shadow-inner shadow-[#000]/10">
              <span className="block text-2xl sm:text-4xl font-bold text-white font-cinzel tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="block text-xs sm:text-sm text-stone-300 mt-1 font-medium">
                ថ្ងៃ
              </span>
            </div>

            <div className="bg-[#183126]/90 border border-amber-300/25 rounded-xl p-3 sm:p-4 text-center shadow-inner shadow-[#000]/10">
              <span className="block text-2xl sm:text-4xl font-bold text-white font-cinzel tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="block text-xs sm:text-sm text-stone-300 mt-1 font-medium">
                ម៉ោង
              </span>
            </div>

            <div className="bg-[#183126]/90 border border-amber-300/25 rounded-xl p-3 sm:p-4 text-center shadow-inner shadow-[#000]/10">
              <span className="block text-2xl sm:text-4xl font-bold text-white font-cinzel tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="block text-xs sm:text-sm text-stone-300 mt-1 font-medium">
                នាទី
              </span>
            </div>

            <div className="bg-[#183126]/90 border border-amber-300/25 rounded-xl p-3 sm:p-4 text-center shadow-inner shadow-[#000]/10">
              <span className="block text-2xl sm:text-4xl font-bold text-amber-200 font-cinzel tabular-nums animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="block text-xs sm:text-sm text-stone-300 mt-1 font-medium">
                វិនាទី
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleAddToCalendar}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50/10 hover:bg-amber-50/20 border border-amber-300/30 rounded-lg text-amber-100 text-xs sm:text-sm font-medium transition-colors"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span className="whitespace-nowrap">កត់ត្រាក្នុងប្រតិទិន (Google Calendar)</span>
          </button>
          <div className="inline-flex items-center gap-1.5 text-xs text-stone-300">
            <Bell className="w-3.5 h-3.5 text-amber-300" />
            <span>វេលាម៉ោង ៥:០០ ល្ងាច / ពិសារអាហារ ៥:៣០ ល្ងាច</span>
          </div>
        </div>
      </div>
    </div>
  );
};
