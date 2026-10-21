import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell } from 'lucide-react';

export const Countdown: React.FC = () => {
  // Wedding Date: Sunday, 22nd November 2026, 4:00 PM ICT (UTC+7)
  const targetDate = new Date('2026-11-22T16:00:00+07:00').getTime();

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
    const title = encodeURIComponent('សិរីមង្គលអាពាហ៍ពិពាហ៍ | នាង ពៅ & ហូ សំណាង');
    const details = encodeURIComponent('សូមគោរពអញ្ជើញចូលរួមពិធីរៀបអាពាហ៍ពិពាហ៍ កូនកំលោះ នាង ពៅ និង កូនក្រមុំ ហូ សំណាង នៅគេហដ្ឋានខាងស្រី ភូមិបេង ឃុំជីក្រែង ស្រុកជីក្រែង ខេត្តសៀមរាប។');
    const location = encodeURIComponent('ភូមិបេង ឃុំជីក្រែង ស្រុកជីក្រែង ខេត្តសៀមរាប');
    // 20261122T090000Z to 20261122T150000Z (4PM to 10PM ICT is 09:00 to 15:00 UTC)
    const dates = '20261122T090000Z/20261122T150000Z';
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-amber-200/80 shadow-sm p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Subtle decorative gold motif */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wider mb-2">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>រាប់ថយក្រោយដល់ថ្ងៃសិរីសួស្តីជ័យមង្គល</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-khmer-title text-amber-950 mb-6">
          ថ្ងៃអាទិត្យ ទី ២២ ខែ វិច្ឆិកា ឆ្នាំ ២០២៦
        </h3>

        {timeLeft.isPast ? (
          <div className="py-4 text-amber-900 font-medium">
            ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍បានប្រព្រឹត្តទៅដោយជោគជ័យ និងមហោឡារិក!
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto mb-6">
            <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F7EFE1] border border-amber-200/90 rounded-xl p-3 sm:p-4 text-center">
              <span className="block text-2xl sm:text-4xl font-bold text-amber-950 font-cinzel tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="block text-xs sm:text-sm text-stone-600 mt-1 font-medium">
                ថ្ងៃ
              </span>
            </div>

            <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F7EFE1] border border-amber-200/90 rounded-xl p-3 sm:p-4 text-center">
              <span className="block text-2xl sm:text-4xl font-bold text-amber-950 font-cinzel tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="block text-xs sm:text-sm text-stone-600 mt-1 font-medium">
                ម៉ោង
              </span>
            </div>

            <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F7EFE1] border border-amber-200/90 rounded-xl p-3 sm:p-4 text-center">
              <span className="block text-2xl sm:text-4xl font-bold text-amber-950 font-cinzel tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="block text-xs sm:text-sm text-stone-600 mt-1 font-medium">
                នាទី
              </span>
            </div>

            <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F7EFE1] border border-amber-200/90 rounded-xl p-3 sm:p-4 text-center">
              <span className="block text-2xl sm:text-4xl font-bold text-amber-800 font-cinzel tabular-nums animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="block text-xs sm:text-sm text-stone-600 mt-1 font-medium">
                វិនាទី
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleAddToCalendar}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg text-amber-900 text-xs sm:text-sm font-medium transition-colors"
          >
            <Calendar className="w-4 h-4 text-amber-700" />
            <span className="whitespace-nowrap">កត់ត្រាក្នុងប្រតិទិន (Google Calendar)</span>
          </button>
          <div className="inline-flex items-center gap-1.5 text-xs text-stone-500">
            <Bell className="w-3.5 h-3.5 text-amber-600" />
            <span>វេលាម៉ោង ៤:០០ ល្ងាច / ពិសារអាហារ ៥:០០ ល្ងាច</span>
          </div>
        </div>
      </div>
    </div>
  );
};
