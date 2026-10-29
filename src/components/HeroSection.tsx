import React from 'react';
import { Calendar, MapPin, QrCode, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import image01 from '../assets/images/wedding-hero.jpg';

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Smooth entrance animations for mobile and desktop.
  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.7,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section className="relative isolate w-full overflow-hidden pt-6 pb-12 sm:pb-16">
      {/* Background image with responsive animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.img
          src={image01}
          alt=""
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.04, opacity: 0.2 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.5,
            ease: 'easeOut',
          }}
          className="h-full w-full object-cover object-center blur-[2px]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#1d2d22]/65 via-[#1d2d22]/80 to-[#1f2d22]" />

        {/* Soft golden glow */}
        {!shouldReduceMotion && (
          <>
            <motion.div
              aria-hidden="true"
              animate={{ opacity: [0.12, 0.23, 0.12] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute -left-20 top-20 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl sm:h-72 sm:w-72"
            />

            <motion.div
              aria-hidden="true"
              animate={{ opacity: [0.08, 0.18, 0.08] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-rose-300/10 blur-3xl sm:h-80 sm:w-80"
            />
          </>
        )}
      </div>

      {/* Floating sparkles */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 12, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute left-[5%] top-20 text-amber-200/70 sm:left-[8%] sm:top-24"
          >
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.div>

          <motion.div
            aria-hidden="true"
            animate={{
              y: [0, 9, 0],
              rotate: [0, -12, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="pointer-events-none absolute right-[6%] top-36 text-amber-200/60 sm:right-[8%] sm:top-40"
          >
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.div>
        </>
      )}

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">

          {/* LEFT: Wedding introduction */}
          <div className="space-y-4 text-center sm:space-y-5 lg:col-span-7 lg:text-left">

            {/* Wedding badge */}
            <motion.div
              {...fadeUp(0.05)}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-amber-300/80 bg-amber-100/90 px-3 py-1.5 text-[10px] font-semibold text-amber-900 shadow-sm sm:px-3.5 sm:text-xs"
            >
              <motion.span
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { rotate: [0, 10, -10, 0] }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="shrink-0"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              </motion.span>

              <span>
                សិរីមង្គលអាពាហ៍ពិពាហ៍ · ក្ដីស្នេហ៍ អមតៈ
              </span>
            </motion.div>

            {/* Couple names */}
            <motion.div {...fadeUp(0.15)} className="space-y-2">
              <h1 className="font-khmer-title text-[1.65rem] font-black leading-relaxed tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] min-[380px]:text-[1.9rem] sm:text-4xl">
                ហេង គីមហ៊{' '}
                <motion.span
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.16, 1],
                          rotate: [0, -7, 7, 0],
                        }
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: 'easeInOut',
                  }}
                  className="inline-block text-rose-300"
                >
                  ❤️
                </motion.span>{' '}
                សន ធារ៉ា
              </h1>

              <p className="font-cinzel text-[10px] font-semibold leading-relaxed tracking-wide text-amber-50/85 min-[380px]:text-xs sm:text-base">
                Heng Kimhor &amp; Sorn Theara · Wedding Celebration
              </p>
            </motion.div>

            {/* Khmer invitation message */}
            <motion.p
              {...fadeUp(0.25)}
              className="mx-auto max-w-xl text-center font-khmer-body text-[13px] leading-[1.9] text-stone-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-base sm:leading-relaxed lg:mx-0 lg:text-left"
            >
              យើងខ្ញុំមានកិត្តិយស និងសេចក្ដីសោមនស្សរីករាយឥតឧបមា
              សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោកឧកញ៉ា លោក លោកស្រី
              អ្នកនាងកញ្ញា និងប្រិយមិត្តជិតឆ្ងាយ អញ្ជើញចូលរួមជាអធិបតី
              និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី
              ជ័យមង្គលក្នុង ពិធីរៀបអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ។
            </motion.p>

            {/* Event information */}
            <motion.div
              {...fadeUp(0.35)}
              whileHover={
                shouldReduceMotion ? undefined : { y: -2 }
              }
              className="mx-auto max-w-lg space-y-3 rounded-2xl border border-amber-200/20 bg-[#183126]/85 p-3.5 text-left shadow-lg shadow-[#08140e]/30 backdrop-blur-md sm:p-4 lg:mx-0"
            >
              <div className="flex items-start gap-3 text-xs text-stone-100 sm:text-sm">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />

                <span className="font-semibold leading-relaxed text-amber-100">
                  ថ្ងៃសៅរ៍ ទី ២៣ ខែ មករា ឆ្នាំ ២០២៧
                  (វេលាម៉ោង ៥:០០ ល្ងាច)
                </span>
              </div>

              <div className="flex items-start gap-3 text-xs text-stone-300 sm:text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />

                <span className="leading-relaxed">
                  នៅភោជនីយដ្ឋាន និងសាលរៀបចំកម្មវិធី
                  ផ្កាឈូកទិព្វ (អគារ G) រាជធានីភ្នំពេញ
                </span>
              </div>
            </motion.div>

            {/* Action buttons: touch-friendly on mobile */}
            <motion.div
              {...fadeUp(0.45)}
              className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-start"
            >
              <motion.a
                href="#location"
                whileHover={
                  shouldReduceMotion ? undefined : { y: -3 }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { scale: 0.96 }
                }
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-amber-200/30 bg-white/5 px-4 py-3 text-xs font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-white/10 active:bg-white/15 sm:px-5 sm:text-sm"
              >
                <QrCode className="h-4 w-4 shrink-0 text-amber-300" />
                <span>ស្កេនទីតាំងពិធី</span>
              </motion.a>

              <motion.a
                href="#gift"
                whileHover={
                  shouldReduceMotion ? undefined : { y: -3 }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { scale: 0.96 }
                }
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-amber-200/30 bg-amber-500/20 px-4 py-3 text-xs font-semibold text-amber-50 transition-colors duration-300 hover:bg-amber-500/30 active:bg-amber-500/40 sm:px-5 sm:text-sm"
              >
                <motion.span
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { scale: [1, 1.08, 1] }
                  }
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  💝
                </motion.span>

                <span>បាញ់ចំណងដៃ KHQR</span>
              </motion.a>
            </motion.div>
          </div>

          {/* RIGHT: Featured couple photo */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 25, scale: 0.97 }
            }
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.85,
              delay: shouldReduceMotion ? 0 : 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center lg:col-span-5"
          >
            <motion.div
              className="relative w-full max-w-[290px] sm:max-w-sm"
              animate={
                shouldReduceMotion ? undefined : { y: [0, -5, 0] }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Golden glowing border */}
              <motion.div
                aria-hidden="true"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { opacity: [0.4, 0.75, 0.4] }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-amber-300 via-amber-400 to-amber-200 blur-[3px] sm:-inset-2 sm:blur-xs"
              />

              <div className="relative overflow-hidden rounded-3xl border-2 border-amber-300/80 bg-white p-2 sm:p-2.5">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-100">
                  <motion.img
                    src={image01}
                    alt="ហេង គីមហ៊ និង សន ធារ៉ា"
                    initial={
                      shouldReduceMotion
                        ? false
                        : { scale: 1.08, opacity: 0.7 }
                    }
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 1.2,
                      ease: 'easeOut',
                    }}
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                {/* Photo caption */}
                <div className="rounded-b-2xl bg-gradient-to-b from-transparent to-amber-50/50 py-3 text-center">
                  <p className="font-khmer-title text-sm font-bold text-amber-950">
                    ហេង គីមហ៊ &amp; សន ធារ៉ា
                  </p>

                  <p className="mt-1 font-cinzel text-[11px] text-stone-500">
                    Phnom Penh · 2027
                  </p>
                </div>
              </div>

              {/* Decorative floating elements */}
              {!shouldReduceMotion && (
                <>
                  <motion.span
                    aria-hidden="true"
                    animate={{
                      y: [0, -8, 0],
                      rotate: [-8, 8, -8],
                      opacity: [0.55, 1, 0.55],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="pointer-events-none absolute -right-2 top-10 text-xl drop-shadow-md sm:-right-3 sm:text-2xl"
                  >
                    ✨
                  </motion.span>

                  <motion.span
                    aria-hidden="true"
                    animate={{
                      y: [0, 7, 0],
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.95, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.8,
                    }}
                    className="pointer-events-none absolute -bottom-2 -left-2 text-xl drop-shadow-md sm:-bottom-3 sm:-left-3 sm:text-2xl"
                  >
                    💕
                  </motion.span>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};