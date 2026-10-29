import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Flower, Sparkles } from 'lucide-react';

export const GratitudeSection: React.FC = () => {
  return (
    <section
      id="gratitude"
      className="w-full px-3 py-5 sm:px-4 sm:py-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-full max-w-4xl"
      >
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-[#172b20] via-[#21372b] to-[#182c21] px-4 py-6 text-center shadow-lg sm:px-6 sm:py-8">

          {/* Decorative Corners */}
          <div className="pointer-events-none absolute left-3 top-3 h-8 w-8 rounded-tl-xl border-l border-t border-amber-300/40 sm:left-5 sm:top-5 sm:h-10 sm:w-10" />
          <div className="pointer-events-none absolute right-3 top-3 h-8 w-8 rounded-tr-xl border-r border-t border-amber-300/40 sm:right-5 sm:top-5 sm:h-10 sm:w-10" />
          <div className="pointer-events-none absolute bottom-3 left-3 h-8 w-8 rounded-bl-xl border-b border-l border-amber-300/40 sm:bottom-5 sm:left-5 sm:h-10 sm:w-10" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-8 w-8 rounded-br-xl border-b border-r border-amber-300/40 sm:bottom-5 sm:right-5 sm:h-10 sm:w-10" />

          {/* Background Glow */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-amber-300/[0.05] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-emerald-300/[0.05] blur-3xl" />

          {/* Decorative Flowers */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute right-8 top-8 hidden text-amber-200/40 sm:block"
          >
            <Flower size={20} strokeWidth={1} />
          </motion.div>

          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-8 left-8 hidden text-amber-200/30 sm:block"
          >
            <Sparkles size={18} strokeWidth={1} />
          </motion.div>

          {/* Heart Icon */}
          <div className="relative mb-3 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-300/40 bg-amber-200/[0.08]">
              <Heart
                className="h-5 w-5 fill-amber-300 text-amber-300"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="mb-3 flex items-center justify-center gap-2 text-amber-300/70">
            <span className="h-px w-7 bg-amber-300/40" />
            <Flower size={13} strokeWidth={1.2} />
            <span className="h-px w-7 bg-amber-300/40" />
          </div>

          {/* Heading */}
          <h3 className="relative mb-2 whitespace-nowrap text-center font-khmer-title text-[clamp(11px,3.2vw,16px)] font-bold leading-relaxed text-amber-100 sm:text-xl md:text-2xl">
            សេចក្ដីថ្លែងអំណរគុណ និង សូមអភ័យទោស
          </h3>

          {/* English Subtitle */}
          <p className="mb-4 text-center text-[10px] font-medium uppercase tracking-widest text-amber-200/60 sm:text-xs">
            With Our Sincere Gratitude
          </p>

          {/* Khmer Messages */}
          <div className="relative mx-auto max-w-2xl space-y-3 text-center font-khmer-body text-sm leading-relaxed text-stone-200/90 sm:text-base">
            <p className="text-center">
              យើងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះការអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយសក្នុងពិធីរបស់យើងខ្ញុំ និងសូមខន្តីអភ័យទោស ដោយពុំបានជួបអញ្ជើញដោយផ្ទាល់ និងការសរសេរឈ្មោះរបស់ភ្ញៀវកិត្តិយសមិនបានត្រឹមត្រូវ ឬពុំបានសរសេរឈ្មោះ។
            </p>

            {/* Small Heart Divider */}
            <div className="flex items-center justify-center gap-2 py-1">
              <span className="h-px w-6 bg-amber-300/30" />
              <Heart
                size={12}
                className="fill-amber-300/60 text-amber-300/70"
              />
              <span className="h-px w-6 bg-amber-300/30" />
            </div>

            <p className="w-full whitespace-normal break-words text-center text-sm font-semibold leading-relaxed text-amber-100 sm:text-base">
              សូមជូនពរ ឯកឧត្តម លោកឧកញ៉ា លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា
            </p>
            
            <p className="w-full whitespace-normal break-words text-center text-sm font-semibold leading-relaxed text-amber-100 sm:text-base">
              សូមមានសុខភាពល្អ និងទទួលបានជោគជ័យគ្រប់ភារកិច្ច។
            </p>

          </div>

          {/* Signature Divider */}
          <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-2">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-300/40" />
            <Flower
              size={15}
              className="shrink-0 text-amber-200/70"
              strokeWidth={1.2}
            />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-300/40" />
          </div>

          {/* Couple Signature */}
          <div className="relative mt-4 flex flex-col items-center text-center">
            <p className="mb-2 text-center font-khmer-body text-xs leading-relaxed text-amber-200/80 sm:text-sm">
              ដោយសេចក្ដីគោរព និងស្រឡាញ់ដ៏ស្មោះស្ម័គ្រ
            </p>

            <h4 className="text-center font-khmer-title text-lg font-bold leading-relaxed text-white sm:text-2xl">
              ហេង គីមហ៊ &amp; សន ធារ៉ា
            </h4>

            {/* Heart Ornament */}
            <div className="my-2 flex items-center justify-center gap-2">
              <span className="h-px w-7 bg-amber-300/40" />
              <Heart
                size={12}
                className="fill-amber-300/80 text-amber-300"
              />
              <span className="h-px w-7 bg-amber-300/40" />
            </div>

            {/* Wedding Date */}
            <p className="text-center font-cinzel text-xs tracking-wider text-amber-100/75">
              P · 23 January 2027
            </p>
          </div>
        </div>

        {/* Closing Message */}
        <p className="mt-3 px-2 text-center font-khmer-body text-xs leading-relaxed text-stone-500">
          សូមអរគុណចំពោះវត្តមានដ៏មានតម្លៃ និងពរជ័យរបស់លោកអ្នក
        </p>
      </motion.div>
    </section>
  );
};