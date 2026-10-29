import React from 'react';
import { Heart, MapPin, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export const InvitationCard: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Reusable entrance animation for every section.
  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.75,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  const floatAnimation = shouldReduceMotion
    ? {}
    : {
        animate: { y: [0, -5, 0] },
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  return (
    <section
      id="invitation"
      className="mx-auto w-full max-w-4xl overflow-hidden px-3 py-8 sm:px-5 sm:py-12"
    >
      {/* Main Wedding Invitation Card */}
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, y: 25, scale: 0.985 }
        }
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative overflow-hidden rounded-3xl border-2 border-amber-300/40 bg-[#21372b]/95 p-5 shadow-2xl shadow-[#08140e]/50 sm:p-10 md:p-12"
      >
        {/* Animated decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0.5, 1, 0.5], scale: [1, 1.12, 1] }
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-300/[0.06] blur-3xl"
          />

          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0.4, 0.9, 0.4], scale: [1.1, 1, 1.1] }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-300/[0.06] blur-3xl"
          />

          <div className="absolute inset-3 rounded-2xl border border-amber-300/10 sm:inset-4" />
        </div>

        {/* Decorative corners */}
        {[
          'left-3 top-3 rounded-tl-lg border-l-2 border-t-2',
          'right-3 top-3 rounded-tr-lg border-r-2 border-t-2',
          'bottom-3 left-3 rounded-bl-lg border-b-2 border-l-2',
          'bottom-3 right-3 rounded-br-lg border-b-2 border-r-2',
        ].map((position, index) => (
          <motion.div
            key={position}
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0.55, 1, 0.55] }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.35,
              ease: 'easeInOut',
            }}
            className={`pointer-events-none absolute h-8 w-8 border-amber-400/80 sm:h-10 sm:w-10 ${position}`}
          />
        ))}

        {/* Floating decorations */}
        {!shouldReduceMotion && (
          <>
            <motion.div
              aria-hidden="true"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 12, 0],
                opacity: [0.35, 0.8, 0.35],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute right-8 top-20 text-amber-300/50"
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>

            <motion.div
              aria-hidden="true"
              animate={{
                y: [0, 8, 0],
                rotate: [0, -10, 0],
                opacity: [0.25, 0.65, 0.25],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 1,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute bottom-28 left-7 text-rose-300/40"
            >
              <Heart className="h-4 w-4 fill-current" />
            </motion.div>
          </>
        )}

        <div className="relative z-10">
          {/* ========================================
              HEADER
          ======================================== */}
          <header className="mb-8 text-center sm:mb-10">
            {/* Animated heart badge */}
            <motion.div
              {...fadeUp(0.05)}
              {...floatAnimation}
              className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/40 bg-amber-200/10 shadow-lg shadow-black/10 sm:h-16 sm:w-16"
            >
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { scale: [1, 1.12, 1] }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Heart className="h-6 w-6 fill-amber-300 text-amber-300 sm:h-7 sm:w-7" />
              </motion.div>
            </motion.div>

            <motion.p
              {...fadeUp(0.12)}
              className="text-fluid-xs font-semibold tracking-[0.15em] text-amber-200 sm:text-sm sm:tracking-[0.3em]"
            >
              លិខិតអញ្ជើញអាពាហ៍ពិពាហ៍ផ្លូវការ
            </motion.p>

            <motion.h2
              {...fadeUp(0.2)}
              className="mt-3 mb-4 text-center font-khmer-title text-xl leading-relaxed text-white sm:text-5xl md:text-fluid-2xl lg:text-fluid-2xl"
            >
              សិរីមង្គលអាពាហ៍ពិពាហ៍
            </motion.h2>

            {/* Couple names */}
            <motion.div
              {...fadeUp(0.28)}
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-khmer-title text-fluid-lg font-semibold text-amber-100"
            >
              <motion.span
                whileHover={
                  shouldReduceMotion ? undefined : { y: -2 }
                }
              >
                ហេង គីមហ៊
              </motion.span>

              <motion.span
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { scale: [1, 1.2, 1], rotate: [0, -8, 8, 0] }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="inline-flex"
              >
                <Heart className="h-4 w-4 shrink-0 fill-rose-300 text-rose-300 sm:h-5 sm:w-5" />
              </motion.span>

              <motion.span
                whileHover={
                  shouldReduceMotion ? undefined : { y: -2 }
                }
              >
                សន ធារ៉ា
              </motion.span>
            </motion.div>

            <motion.p
              {...fadeUp(0.35)}
              className="mt-3 font-khmer-body text-fluid-sm italic text-stone-300"
            >
              « ក្ដីស្នេហ៍ អមតៈ »
            </motion.p>

            {/* Animated header ornament */}
            <motion.div
              {...fadeUp(0.4)}
              className="mt-6 flex items-center justify-center gap-3"
            >
              <motion.span
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-px w-12 origin-right bg-gradient-to-r from-transparent to-amber-400/70 sm:w-20"
              />

              <motion.span
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { rotate: [0, 180, 360] }
                }
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <Sparkles className="h-4 w-4 text-amber-300" />
              </motion.span>

              <motion.span
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-px w-12 origin-left bg-gradient-to-l from-transparent to-amber-400/70 sm:w-20"
              />
            </motion.div>
          </header>

          {/* ========================================
              PARENTS & COUPLE INFORMATION
          ======================================== */}
          <motion.div
            {...fadeUp(0.1)}
            className="my-7 grid grid-cols-1 gap-5 rounded-2xl border-y border-amber-200/25 bg-[#183126]/70 p-4 py-6 text-center sm:my-8 sm:gap-6 sm:p-7 md:grid-cols-2"
          >
            {/* Groom's family */}
            <motion.div
              {...fadeUp(0.1)}
              whileHover={
                shouldReduceMotion ? undefined : { y: -3 }
              }
              className="space-y-2 rounded-xl p-2 transition-colors duration-300 hover:bg-white/[0.02] sm:p-3"
            >
              <p className="text-xs font-semibold tracking-wide text-amber-200 sm:text-sm">
                មាតាបិតាខាងកូនប្រុស
              </p>

              <p className="font-khmer-title text-base font-bold leading-relaxed text-white sm:text-lg">
                លោក មាស សុផល
              </p>

              <p className="text-sm font-semibold leading-relaxed text-stone-200 sm:text-base">
                និង លោកស្រី{' '}
                <span className="font-bold text-amber-100">
                  ប្រាក់ ប៊ុនអេង
                </span>
              </p>

              <div className="pt-3">
                <span className="text-xs text-stone-300 sm:text-sm">
                  កូនប្រុសនាម៖
                </span>

                <p className="mt-1 font-khmer-title text-lg font-bold text-amber-200 sm:text-xl">
                  ហេង គីមហ៊
                </p>

                <p className="mt-1 font-cinzel text-xs text-stone-300">
                  Groom: Heng Kimhor
                </p>
              </div>
            </motion.div>

            {/* Bride's family */}
            <motion.div
              {...fadeUp(0.2)}
              whileHover={
                shouldReduceMotion ? undefined : { y: -3 }
              }
              className="space-y-2 rounded-xl border-t border-amber-200/25 p-2 pt-5 transition-colors duration-300 hover:bg-white/[0.02] sm:p-3 sm:pt-5 md:border-l md:border-t-0 md:pl-5 md:pt-3"
            >
              <p className="text-xs font-semibold tracking-wide text-amber-200 sm:text-sm">
                មាតាបិតាខាងកូនស្រី
              </p>

              <p className="font-khmer-title text-base font-bold leading-relaxed text-white sm:text-lg">
                លោក សន ចិត្រា
              </p>

              <p className="text-sm font-semibold leading-relaxed text-stone-200 sm:text-base">
                និង លោកស្រី{' '}
                <span className="font-bold text-amber-100">
                  សួង ចន្ធី
                </span>
              </p>

              <div className="pt-3">
                <span className="text-xs text-stone-300 sm:text-sm">
                  កូនស្រីនាម៖
                </span>

                <p className="mt-1 font-khmer-title text-lg font-bold text-amber-200 sm:text-xl">
                  សន ធារ៉ា
                </p>

                <p className="mt-1 font-cinzel text-xs text-stone-300">
                  Bride: Sorn Theara
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ========================================
              INVITATION MESSAGE
          ======================================== */}
          <motion.div
            {...fadeUp(0.1)}
            className="mx-auto max-w-2xl space-y-4 font-khmer-body text-sm leading-8 text-stone-200 sm:text-base"
          >
            <motion.p
              {...fadeUp(0.1)}
              className="text-center text-base font-semibold text-amber-200 sm:text-lg"
            >
              មានកិត្តិយសសូមគោរពអញ្ជើញ
            </motion.p>

            <motion.p
              {...fadeUp(0.2)}
              className="text-center leading-8"
            >
              ឯកឧត្តម លោកជំទាវ លោកឧកញ៉ា លោក លោកស្រី អ្នកនាងកញ្ញា និងប្រិយមិត្ត
              អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ
              សិរីសួស្តី ជ័យមង្គលក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស-កូនស្រី
              របស់យើងខ្ញុំ និងពិសារបាយអាហារ ដែលនឹងប្រព្រឹត្តទៅតាមពេលវេលា
              និងទីកន្លែងដូចខាងក្រោម៖
            </motion.p>
          </motion.div>

          {/* ========================================
              DATE & TIME
          ======================================== */}
          <motion.div
            {...fadeUp(0.1)}
            whileHover={
              shouldReduceMotion ? undefined : { y: -3 }
            }
            className="mt-7 rounded-2xl border border-amber-300/30 bg-[#183126]/85 p-5 text-center shadow-lg shadow-black/10 transition-colors duration-300 hover:border-amber-300/45 sm:mt-8 sm:p-7"
          >
            <div className="mb-4 flex items-center justify-center gap-2">
              <motion.span
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="h-px w-7 origin-right bg-amber-400/50 sm:w-12"
              />

              <motion.span
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { rotate: [0, 180, 360] }
                }
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <Sparkles className="h-4 w-4 text-amber-300" />
              </motion.span>

              <motion.span
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="h-px w-7 origin-left bg-amber-400/50 sm:w-12"
              />
            </div>

            <motion.p
              {...fadeUp(0.1)}
              className="text-xs font-semibold leading-relaxed text-amber-100 sm:text-sm"
            >
              នៅថ្ងៃសៅរ៍ ១រោច ខែបុស្ស ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០
            </motion.p>

            <motion.h3
              {...fadeUp(0.2)}
              className="mt-3 font-khmer-title text-lg font-bold leading-relaxed text-white sm:text-2xl md:text-3xl"
            >
              ត្រូវនឹងថ្ងៃសៅរ៍ ទី ២៣ ខែមករា ឆ្នាំ ២០២៧
            </motion.h3>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Reception */}
              <motion.div
                {...fadeUp(0.1)}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -4, scale: 1.015 }
                }
                className="flex flex-col items-center justify-center gap-1 rounded-xl border border-amber-200/20 bg-white/[0.04] px-3 py-4"
              >
                <span className="text-[10px] uppercase tracking-widest text-amber-300 sm:text-xs">
                  Reception
                </span>

                <span className="font-khmer-body text-sm font-semibold text-amber-100 sm:text-base">
                  វេលាម៉ោង ៥:០០ ល្ងាច
                </span>

                <span className="font-khmer-body text-xs text-stone-300">
                  ទទួលភ្ញៀវ
                </span>
              </motion.div>

              {/* Dinner */}
              <motion.div
                {...fadeUp(0.2)}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -4, scale: 1.015 }
                }
                className="flex flex-col items-center justify-center gap-1 rounded-xl border border-amber-200/20 bg-white/[0.04] px-3 py-4"
              >
                <span className="text-[10px] uppercase tracking-widest text-amber-300 sm:text-xs">
                  Dinner
                </span>

                <span className="font-khmer-body text-sm font-semibold text-amber-100 sm:text-base">
                  វេលាម៉ោង ៥:៣០ ល្ងាច
                </span>

                <span className="font-khmer-body text-xs text-stone-300">
                  ពិសារភោជនាហារ
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================
              VENUE
          ======================================== */}
          <motion.div
            {...fadeUp(0.1)}
            className="mt-8 px-2 text-center sm:mt-10 sm:px-3"
          >
            <motion.div
              whileHover={
                shouldReduceMotion ? undefined : { scale: 1.015 }
              }
              className="flex items-center justify-center gap-2 font-bold leading-relaxed text-amber-200 sm:text-base md:text-lg"
            >
              <motion.span
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { y: [0, -4, 0] }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="shrink-0"
              >
                <MapPin className="h-5 w-5 text-amber-300 sm:h-6 sm:w-6" />
              </motion.span>

              <span className="text-center text-sm sm:text-base md:text-lg">
                នៅភោជនីយដ្ឋាន និងសាលរៀបចំកម្មវិធី ផ្កាឈូកទិព្វ (អគារ G)
              </span>
            </motion.div>

            <motion.p
              {...fadeUp(0.15)}
              className="mt-3 text-center text-xs font-medium leading-relaxed text-stone-100 sm:text-sm md:text-base"
            >
              ស្ថិតនៅ សង្កាត់ផ្សារដើមគរ ខណ្ឌទួលគោក រាជធានីភ្នំពេញ
            </motion.p>

            <motion.p
              {...fadeUp(0.2)}
              className="pt-2 text-center text-xs font-medium leading-relaxed text-stone-300 sm:text-sm"
            >
              ដោយមេត្រីភាព (សូមពិនិត្យមើលផ្លង់ និងស្កេនទីតាំងខាងក្រោម)
            </motion.p>
          </motion.div>

          {/* ========================================
              ELEGANT ENGLISH SUMMARY
          ======================================== */}
          <motion.div
            {...fadeUp(0.1)}
            className="relative mt-9 border-t border-amber-200/20 px-1 pt-7 text-center sm:mt-12 sm:px-4 sm:pt-8"
          >
            {/* Decorative divider */}
            <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6">
              <motion.span
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-px w-10 origin-right bg-gradient-to-r from-transparent to-amber-400/80 sm:w-20"
              />

              <motion.span
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { rotate: [0, 180, 360], scale: [1, 1.15, 1] }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-lg leading-none text-amber-300"
              >
                ✦
              </motion.span>

              <motion.span
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-px w-10 origin-left bg-gradient-to-l from-transparent to-amber-400/80 sm:w-20"
              />
            </div>

            <motion.p
              {...fadeUp(0.1)}
              className="mb-3 font-cinzel text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300 sm:text-xs sm:tracking-[0.35em]"
            >
              Together With Our Families
            </motion.p>

            <motion.h3
              {...fadeUp(0.2)}
              className="font-cinzel text-lg font-semibold tracking-[0.1em] text-amber-100 sm:text-2xl sm:tracking-[0.12em]"
            >
              THE WEDDING DAY
            </motion.h3>

            {/* Couple names */}
            <motion.div
              {...fadeUp(0.3)}
              className="mt-5 space-y-2"
            >
              <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-medium tracking-wide text-stone-100 sm:text-base">
                <span>Heng Kimhor</span>

                <motion.span
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { scale: [1, 1.2, 1] }
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex"
                >
                  <Heart className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" />
                </motion.span>

                <span>Sorn Theara</span>
              </p>

              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-300/80 sm:text-xs sm:tracking-[0.25em]">
                Groom &nbsp; · &nbsp; Bride
              </p>
            </motion.div>

            {/* Date, time and venue */}
            <motion.div
              {...fadeUp(0.2)}
              whileHover={
                shouldReduceMotion ? undefined : { y: -3 }
              }
              className="mt-6 rounded-xl border-y border-amber-300/20 bg-amber-100/[0.04] px-3 py-5 transition-colors duration-300 hover:border-amber-300/40 sm:px-6"
            >
              <p className="font-cinzel text-sm tracking-wide text-amber-200 sm:text-base sm:tracking-wider">
                Saturday, 23 January 2027
              </p>

              <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-2 text-xs text-stone-100 sm:text-sm">
                <span className="text-amber-300">✦</span>
                <span>Guest Reception: 5:00 PM</span>
                <span className="text-amber-300">✦</span>
              </div>

              <p className="mt-2 text-xs text-stone-200 sm:text-sm">
                Dinner: 5:30 PM
              </p>

              <p className="mt-4 text-xs leading-relaxed text-stone-200 sm:text-sm">
                Phka Chhouk Tep Wedding Hall
                <br />
                <span className="text-amber-200/80">
                  Building G · Phnom Penh, Cambodia
                </span>
              </p>
            </motion.div>

            {/* Closing message */}
            <motion.div
              {...fadeUp(0.2)}
              className="mt-6 space-y-2"
            >
              <p className="font-cinzel text-xs font-semibold tracking-[0.15em] text-amber-300 sm:text-sm sm:tracking-[0.2em]">
                WITH LOVE &amp; GRATITUDE
              </p>

              <p className="text-xs leading-relaxed text-stone-300 sm:text-sm">
                Thank you for sharing in our special day.
              </p>

              <p className="text-[10px] italic leading-relaxed text-amber-200/80 sm:text-xs">
                Kindly refer to the map below for directions.
              </p>
            </motion.div>

            {/* Bottom ornament */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : { opacity: [0.5, 1, 0.5] }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mt-6 text-sm tracking-[0.5em] text-amber-400/80"
            >
              ❧ ✦ ❧
            </motion.div>
          </motion.div>

          {/* Bottom greeting */}
          <motion.p
            {...fadeUp(0.15)}
            className="mt-8 text-center text-[10px] tracking-wider text-stone-400 sm:text-xs"
          >
            WITH JOYFUL HEARTS, WE LOOK FORWARD TO CELEBRATING WITH YOU
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};