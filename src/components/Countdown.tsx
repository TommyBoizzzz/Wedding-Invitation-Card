import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, Sparkles } from 'lucide-react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

const WEDDING_DATE = new Date('2027-01-23T17:00:00+07:00').getTime();

type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

const getTimeLeft = (): CountdownTime => {
  const diff = WEDDING_DATE - Date.now();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
};

const countdownItems = [
  { key: 'days', label: 'ថ្ងៃ' },
  { key: 'hours', label: 'ម៉ោង' },
  { key: 'minutes', label: 'នាទី' },
  { key: 'seconds', label: 'វិនាទី' },
] as const;

export const Countdown: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(getTimeLeft);

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(getTimeLeft());
    };

    updateCountdown();

    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const handleAddToCalendar = () => {
    const title = 'សិរីមង្គលអាពាហ៍ពិពាហ៍ | ហេង គីមហ៊ & សន ធារ៉ា';

    const details =
      'សូមគោរពអញ្ជើញចូលរួមពិធីរៀបអាពាហ៍ពិពាហ៍ កូនកំលោះ ហេង គីមហ៊ និង កូនក្រមុំ សន ធារ៉ា។';

    const location =
      'ភោជនីយដ្ឋាន និងសាលរៀបចំកម្មវិធី ផ្កាឈូកទិព្វ (អគារ G) រាជធានីភ្នំពេញ';

    // January 23, 2027, 5:00 PM–10:00 PM Cambodia time (UTC+7).
    const dates = '20270123T100000Z/20270123T150000Z';

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates,
      details,
      location,
    });

    window.open(
      `https://calendar.google.com/calendar/render?${params.toString()}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.7,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section className="w-full overflow-hidden px-4 py-8 sm:py-10">
      <motion.div
        {...fadeUp(0)}
        className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-amber-200/25 bg-[#22382d]/95 p-4 text-center shadow-xl shadow-[#08140e]/40 backdrop-blur-md sm:rounded-3xl sm:p-8"
      >
        {/* Top gold decoration */}
        <motion.div
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: [0.5, 1, 0.5], scaleX: [0.8, 1, 0.8] }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-1/2 top-0 h-1 w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-400 to-transparent sm:w-56"
        />

        {/* Ambient glow */}
        {!shouldReduceMotion && (
          <>
            <motion.div
              aria-hidden="true"
              animate={{ opacity: [0.06, 0.15, 0.06] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute -left-20 top-10 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl sm:h-56 sm:w-56"
            />

            <motion.div
              aria-hidden="true"
              animate={{ opacity: [0.05, 0.12, 0.05] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="pointer-events-none absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-rose-300/10 blur-3xl sm:h-64 sm:w-64"
            />
          </>
        )}

        <div className="relative z-10">
          {/* Animated label */}
          <motion.div
            {...fadeUp(0.1)}
            className="mb-2 inline-flex max-w-full items-center justify-center gap-2 text-[11px] font-semibold tracking-wide text-amber-200 sm:text-xs"
          >
            <motion.span
              animate={
                shouldReduceMotion
                  ? undefined
                  : { rotate: [0, 12, -12, 0] }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <Clock className="h-3.5 w-3.5 shrink-0 text-amber-300" />
            </motion.span>

            <span>រាប់ថយក្រោយដល់ថ្ងៃសិរីសួស្តីជ័យមង្គល</span>

            <motion.span
              animate={
                shouldReduceMotion
                  ? undefined
                  : { scale: [1, 1.15, 1] }
              }
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-300" />
            </motion.span>
          </motion.div>

          {/* Wedding date */}
          <motion.h3
            {...fadeUp(0.2)}
            className="mb-6 font-khmer-title text-base leading-relaxed text-white drop-shadow-sm min-[380px]:text-lg sm:mb-8 sm:text-2xl"
          >
            ថ្ងៃសៅរ៍ ទី ២៣ ខែ មករា ឆ្នាំ ២០២៧
          </motion.h3>

          {/* Countdown */}
          <AnimatePresence mode="wait">
            {timeLeft.isPast ? (
              <motion.div
                key="completed"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 font-khmer-body text-sm font-medium leading-loose text-amber-100 sm:text-base"
              >
                <Sparkles className="mx-auto mb-3 h-8 w-8 text-amber-300" />

                ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍បានប្រព្រឹត្តទៅដោយជោគជ័យ និងមហោឡារិក!
              </motion.div>
            ) : (
              <motion.div
                key="countdown"
                {...fadeUp(0.3)}
                className="mx-auto mb-6 grid max-w-xl grid-cols-4 gap-2 sm:mb-8 sm:gap-4"
              >
                {countdownItems.map((item, index) => {
                  const value = timeLeft[item.key];
                  const formattedValue = String(value).padStart(2, '0');
                  const isSeconds = item.key === 'seconds';

                  return (
                    <motion.div
                      key={item.key}
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, y: 15, scale: 0.95 }
                      }
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.5,
                        delay: shouldReduceMotion ? 0 : index * 0.1,
                        ease: 'easeOut',
                      }}
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { y: -4, borderColor: 'rgba(252, 211, 77, 0.65)' }
                      }
                      className="relative min-w-0 overflow-hidden rounded-xl border border-amber-300/25 bg-[#183126]/95 px-1.5 py-3 shadow-inner shadow-black/10 sm:rounded-2xl sm:px-3 sm:py-5"
                    >
                      {/* Card glow */}
                      {!shouldReduceMotion && (
                        <motion.div
                          aria-hidden="true"
                          animate={{ opacity: [0.05, 0.13, 0.05] }}
                          transition={{
                            duration: 3 + index,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.3,
                          }}
                          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-300/20 to-transparent"
                        />
                      )}

                      <div className="relative">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={formattedValue}
                            initial={
                              shouldReduceMotion
                                ? false
                                : { opacity: 0.5, y: -7 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            exit={
                              shouldReduceMotion
                                ? undefined
                                : { opacity: 0, y: 7 }
                            }
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className={`block whitespace-nowrap font-cinzel text-[clamp(1.2rem,5.5vw,2.5rem)] font-bold leading-tight tabular-nums sm:text-4xl ${
                              isSeconds ? 'text-amber-200' : 'text-white'
                            }`}
                          >
                            {formattedValue}
                          </motion.span>
                        </AnimatePresence>

                        <span className="mt-1 block text-[10px] font-medium text-stone-300 sm:mt-2 sm:text-sm">
                          {item.label}
                        </span>
                      </div>

                      {/* Seconds indicator */}
                      {isSeconds && !shouldReduceMotion && (
                        <motion.div
                          aria-hidden="true"
                          animate={{ scaleX: [0.35, 1, 0.35] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="absolute bottom-0 left-0 h-0.5 w-full origin-center bg-amber-300/80"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Calendar button and event time */}
          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-col items-center justify-center gap-4 sm:gap-5"
          >
            <motion.button
              type="button"
              onClick={handleAddToCalendar}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -3, scale: 1.02 }
              }
              whileTap={
                shouldReduceMotion ? undefined : { scale: 0.97 }
              }
              className="inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-xl border border-amber-300/30 bg-amber-50/10 px-4 py-3 text-xs font-medium text-amber-100 shadow-sm transition-colors duration-300 hover:bg-amber-50/20 active:bg-amber-50/25 sm:px-5 sm:text-sm"
            >
              <Calendar className="h-4 w-4 shrink-0 text-amber-300" />

              <span>
                កត់ត្រាក្នុងប្រតិទិន (Google Calendar)
              </span>
            </motion.button>

            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : { opacity: [0.75, 1, 0.75] }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex items-start justify-center gap-2 text-center text-[11px] leading-relaxed text-stone-300 sm:text-xs"
            >
              <Bell className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" />

              <span>
                វេលាម៉ោង ៥:០០ ល្ងាច / ពិសារអាហារ ៥:៣០ ល្ងាច
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};