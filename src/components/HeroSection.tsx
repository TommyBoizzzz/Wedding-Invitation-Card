import React from 'react';
import {
  CalendarDays,
  MapPin,
  Clock,
  Heart,
  Sparkles,
  ArrowDown,
  Gift,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import image01 from '../assets/images/wedding-hero.jpg';

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.8,
      delay: shouldReduceMotion ? 0 : delay,
      ease: 'easeOut',
    },
  });

  return (
    <section
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-[#10291F] px-4 py-20 text-white sm:px-6 sm:py-24 lg:flex lg:items-center lg:py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(197,158,83,0.16),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(197,158,83,0.12),transparent_40%)]" />

        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-amber-400/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-[130px]" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:45px_45px]" />
      </div>

      {/* Main Content */}
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

        {/* Left Content */}
        <div className="relative z-10 text-center lg:text-left">

          {/* Wedding Label */}
          <motion.div
            {...fadeUp(0.1)}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-amber-200/30 bg-amber-100/[0.07] px-5 py-2.5"
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span className="font-cinzel text-[10px] font-semibold tracking-[0.3em] text-amber-200 sm:text-xs">
              OUR WEDDING CELEBRATION
            </span>
            <Sparkles className="h-4 w-4 text-amber-300" />
          </motion.div>

          {/* Couple Names */}
          <motion.div {...fadeUp(0.2)} className="space-y-3">
            <p className="font-cinzel text-xs tracking-[0.35em] text-amber-200/80 sm:text-sm">
              TOGETHER WITH OUR FAMILIES
            </p>

            <h1 className="font-khmer-title text-4xl font-bold leading-[1.5] text-amber-100 sm:text-5xl md:text-6xl xl:text-7xl">
              ហេង គីមហ៊
            </h1>

            <div className="flex items-center justify-center gap-4 lg:justify-start">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-300 sm:w-20" />
              <Heart
                className="h-6 w-6 fill-amber-300/20 text-amber-300"
                strokeWidth={1.4}
              />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-300 sm:w-20" />
            </div>

            <h1 className="font-khmer-title text-4xl font-bold leading-[1.5] text-amber-100 sm:text-5xl md:text-6xl xl:text-7xl">
              សន ធារ៉ា
            </h1>

            <p className="pt-2 font-cinzel text-xs tracking-[0.3em] text-stone-300 sm:text-sm">
              HENG KIMHOR & SORN THEARA
            </p>
          </motion.div>

          {/* Invitation Text */}
          <motion.div
            {...fadeUp(0.3)}
            className="mx-auto mt-9 max-w-2xl lg:mx-0"
          >
            <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-px w-8 bg-amber-300/60" />
              <span className="font-khmer-body text-sm font-semibold tracking-wider text-amber-200 sm:text-base">
                សេចក្តីជូនដំណឹង
              </span>
              <span className="h-px w-8 bg-amber-300/60" />
            </div>

            <p className="font-khmer-body text-base font-medium leading-[2.1] text-stone-200 sm:text-lg sm:leading-[2.2] md:text-xl">
              យើងខ្ញុំមានកិត្តិយស សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី
              អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស
              ក្នុងពិធីមង្គលការរបស់យើងខ្ញុំ។
            </p>
          </motion.div>

          {/* Wedding Information */}
          <motion.div
            {...fadeUp(0.4)}
            className="mx-auto mt-9 grid max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:mx-0"
          >
            {/* Date */}
            <div className="group rounded-2xl border border-amber-200/20 bg-white/[0.045] p-4 transition-all duration-300 hover:border-amber-200/50 hover:bg-white/[0.08] sm:p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200">
                  <CalendarDays size={20} />
                </div>
                <span className="font-cinzel text-[10px] font-bold tracking-[0.2em] text-amber-200 sm:text-xs">
                  DATE & TIME
                </span>
              </div>

              <p className="font-khmer-body text-sm font-semibold leading-relaxed text-white sm:text-base">
                ថ្ងៃសៅរ៍ ទី ២៣ ខែ មករា ឆ្នាំ ២០២៧
              </p>
              <div className="mt-2 flex items-center gap-2 text-stone-300">
                <Clock size={14} className="shrink-0 text-amber-300" />
                <span className="font-khmer-body text-xs sm:text-sm">
                  វេលាម៉ោង ៥:០០ ល្ងាច
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="group rounded-2xl border border-amber-200/20 bg-white/[0.045] p-4 transition-all duration-300 hover:border-amber-200/50 hover:bg-white/[0.08] sm:p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200">
                  <MapPin size={20} />
                </div>
                <span className="font-cinzel text-[10px] font-bold tracking-[0.2em] text-amber-200 sm:text-xs">
                  LOCATION
                </span>
              </div>

              <p className="font-khmer-body text-sm font-semibold leading-[1.9] text-white sm:text-base">
                នៅភោជនីយដ្ឋាន និងសាលរៀបចំកម្មវិធី ផ្កាឈូកទិព្វ (អគារ G)
                រាជធានីភ្នំពេញ
              </p>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            {...fadeUp(0.5)}
            className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <a
              href="#location"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-500 px-7 py-3 font-khmer-body text-sm font-bold text-[#183126] shadow-[0_8px_30px_rgba(212,175,55,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(212,175,55,0.3)] sm:text-base"
            >
              <MapPin size={17} />
              ទីតាំងកម្មវិធី
              <ArrowDown
                size={15}
                className="transition-transform group-hover:translate-y-1"
              />
            </a>

            <a
              href="#gift"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-amber-200/40 bg-white/[0.04] px-7 py-3 font-khmer-body text-sm font-semibold text-amber-100 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:bg-amber-200/10 sm:text-base"
            >
              <Gift size={17} />
              ជូនពរ និងចំណងដៃ
            </a>
          </motion.div>
        </div>

        {/* Right Photo */}
        <motion.div
          {...fadeUp(0.3)}
          className="relative mx-auto w-full max-w-[500px] lg:max-w-none"
        >
          {/* Outer Glow */}
          <div className="absolute -inset-5 rounded-[2rem] bg-amber-300/[0.08] blur-2xl" />

          {/* Photo Frame */}
          <div className="relative rounded-[2rem] border border-amber-200/50 bg-gradient-to-br from-amber-200/40 via-amber-500/10 to-amber-100/30 p-2 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:p-3">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <img
                src={image01}
                alt="Heng Kimhor and Sorn Theara wedding"
                className="aspect-[4/5] w-full object-cover object-center transition-transform duration-1000 hover:scale-105"
              />

              {/* Photo Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#10291F]/90 via-transparent to-[#10291F]/10" />

              {/* Corner Decorations */}
              <div className="absolute left-4 top-4 h-12 w-12 rounded-tl-xl border-l-2 border-t-2 border-amber-200/80 sm:left-6 sm:top-6" />
              <div className="absolute right-4 top-4 h-12 w-12 rounded-tr-xl border-r-2 border-t-2 border-amber-200/80 sm:right-6 sm:top-6" />
              <div className="absolute bottom-4 left-4 h-12 w-12 rounded-bl-xl border-b-2 border-l-2 border-amber-200/80 sm:bottom-6 sm:left-6" />
              <div className="absolute bottom-4 right-4 h-12 w-12 rounded-br-xl border-b-2 border-r-2 border-amber-200/80 sm:bottom-6 sm:right-6" />

              {/* Photo Caption */}
              <div className="absolute inset-x-0 bottom-0 px-5 pb-9 text-center sm:px-8 sm:pb-12">
                <Sparkles className="mx-auto mb-3 h-5 w-5 text-amber-300" />

                <p className="font-cinzel text-[10px] tracking-[0.4em] text-amber-200 sm:text-xs">
                  TWO HEARTS, ONE JOURNEY
                </p>

                <h2 className="mt-3 font-khmer-title text-2xl font-bold leading-relaxed text-white sm:text-3xl md:text-4xl">
                  ហេង គីមហ៊ & សន ធារ៉ា
                </h2>

                <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

                <p className="mt-3 font-cinzel text-xs tracking-[0.25em] text-amber-100/90">
                  23 · 01 · 2027
                </p>
              </div>
            </div>
          </div>

          {/* Floating Decoration */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, -10, 0], rotate: [0, 5, 0] }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -right-3 -top-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200/30 bg-[#18382A] shadow-xl sm:-right-6 sm:-top-6 sm:h-16 sm:w-16"
          >
            <Heart className="h-7 w-7 fill-amber-300/20 text-amber-300" />
          </motion.div>

          <motion.div
            animate={
              shouldReduceMotion ? undefined : { y: [0, 8, 0] }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -bottom-5 -left-3 flex h-12 w-12 items-center justify-center rounded-xl border border-amber-200/30 bg-[#18382A] shadow-xl sm:-bottom-6 sm:-left-6 sm:h-14 sm:w-14"
          >
            <Sparkles className="h-6 w-6 text-amber-300" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decoration */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
    </section>
  );
};