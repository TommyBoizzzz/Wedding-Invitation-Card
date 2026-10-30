
import React, { useState } from 'react';
import {
  MailOpen,
  Volume2,
  VolumeX,
  Heart,
  Check,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

type SplashScreenProps = {
  isMusicPlaying?: boolean;
  onMusicToggle?: () => void;
  onOpenInvitation?: () => void;
};

// Read guest name from ?to= or ?name=
const getGuestNameFromUrl = (): string => {
  if (typeof window === 'undefined') return '';

  const params = new URLSearchParams(window.location.search);
  return params.get('to')?.trim() || params.get('name')?.trim() || '';
};

export const SplashScreen: React.FC<SplashScreenProps> = ({
  isMusicPlaying = false,
  onMusicToggle,
  onOpenInvitation,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const [guestName, setGuestName] = useState<string>(getGuestNameFromUrl);
  const [isEditingGuest, setIsEditingGuest] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const t = {
    groomLabel: 'កូនកំលោះ',
    brideLabel: 'កូនក្រមុំ',
    groomKhmer: 'ហេង គីមហ៊',
    brideKhmer: 'សន ធារ៉ា',
    weddingTitle: 'មង្គលការ',
    subtitle: 'សូមគោរពអញ្ជើញ',
    weddingSubtitle: 'សិរីមង្គលអាពាហ៍ពិពាហ៍',
    invitationFor: 'លិខិតអញ្ជើញជូនចំពោះ',
    guestPlaceholder: 'សូមបញ្ចូលឈ្មោះ',
    saveName: 'រក្សាទុក',
    musicOn: 'បើកតន្ត្រី',
    musicOff: 'បិទតន្ត្រី',
    openBtn: 'បើកលិខិតអញ្ជើញ',
    openHint: 'សូមអញ្ជើញចុចដើម្បីបើកលិខិត',
    footer: 'ដោយក្តីគោរព និងសេចក្តីស្រឡាញ់',
    opening: 'សូមអញ្ជើញចូលរួមអបអរសាទរ',
  };

  // Animation settings
  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.85,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  const fadeDown = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0 : 1,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  const handleSaveGuest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = guestName.trim();

    setGuestName(name);
    setIsEditingGuest(false);

    const url = new URL(window.location.href);

    if (name) {
      url.searchParams.set('to', name);
    } else {
      url.searchParams.delete('to');
    }

    url.searchParams.delete('name');
    window.history.replaceState({}, '', url.toString());
  };

  const handleOpenInvitation = () => {
    if (isOpening) return;

    setIsOpening(true);

    window.setTimeout(() => {
      onOpenInvitation?.();
    }, shouldReduceMotion ? 0 : 1000);
  };

  const petals = [
    { left: '8%', delay: 0, duration: 12, size: 24, symbol: '✿' },
    { left: '20%', delay: 2, duration: 15, size: 17, symbol: '✧' },
    { left: '35%', delay: 4, duration: 13, size: 21, symbol: '❀' },
    { left: '68%', delay: 1, duration: 14, size: 19, symbol: '✧' },
    { left: '82%', delay: 3, duration: 12, size: 25, symbol: '✿' },
    { left: '92%', delay: 5, duration: 16, size: 16, symbol: '❀' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        scale: isOpening && !shouldReduceMotion ? 1.025 : 1,
      }}
      transition={{
        opacity: { duration: 0.8 },
        scale: { duration: 1, ease: [0.65, 0, 0.35, 1] },
      }}
      className={`wedding-splash fixed inset-0 z-50 h-screen h-[100dvh] w-full overflow-hidden overscroll-none ${
        isOpening ? 'splash-opening' : 'splash-enter'
      }`}
    >
      {/* Luxury background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="splash-ambient splash-ambient-one" />
        <div className="splash-ambient splash-ambient-two" />
        <div className="wedding-splash-pattern absolute inset-0" />

        {/* Floating flower petals */}
        {!shouldReduceMotion &&
          petals.map((petal, index) => (
            <motion.span
              key={index}
              className="absolute top-[-30px] select-none text-[#d9bd7b]/60"
              style={{
                left: petal.left,
                fontSize: petal.size,
                filter: 'drop-shadow(0 0 8px rgba(201,150,53,0.25))',
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, 22, -16, 12, 0],
                rotate: [0, 100, 220, 320],
                opacity: [0, 0.8, 0.7, 0],
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {petal.symbol}
            </motion.span>
          ))}

        {/* Ambient golden light */}
        <motion.div
          className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-[#c99635]/10 blur-[90px] sm:h-96 sm:w-96"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.85, 1.15, 0.85],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Decorative symbols */}
        <motion.div
          className="splash-petal splash-petal-one"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, 12, -12, 0], y: [0, -8, 0] }
          }
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          ✿
        </motion.div>

        <motion.div
          className="splash-petal splash-petal-two"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, 180, 360], opacity: [0.4, 1, 0.4] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          ✧
        </motion.div>

        <motion.div
          className="splash-petal splash-petal-three"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, -15, 15, 0], scale: [1, 1.12, 1] }
          }
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          ❀
        </motion.div>

        <motion.div
          className="splash-petal splash-petal-four"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, 180, 360], y: [0, 8, 0] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
          ✧
        </motion.div>
      </div>

      {/* Music control */}
      <motion.div
        {...fadeDown(0.3)}
        className="absolute left-3 right-3 top-3 z-30 flex justify-end sm:left-6 sm:right-6 sm:top-5"
      >
        <motion.button
          type="button"
          onClick={onMusicToggle}
          disabled={isOpening}
          aria-label={isMusicPlaying ? t.musicOff : t.musicOn}
          aria-pressed={isMusicPlaying}
          whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
          className="splash-control"
        >
          {isMusicPlaying ? (
            <Volume2 size={17} className="animate-pulse text-[#e6c77f]" />
          ) : (
            <VolumeX size={17} className="text-[#ded5bd]" />
          )}

          <span className="font-khmer-body">
            {isMusicPlaying ? t.musicOn : t.musicOff}
          </span>
        </motion.button>
      </motion.div>

      {/* Invitation cover */}
      <main className="relative z-10 flex h-full min-h-0 w-full flex-col items-center gap-4 overflow-x-hidden overflow-y-auto px-4 pb-8 pt-20 text-center sm:gap-6 sm:px-8 sm:pb-10 sm:pt-24 lg:gap-7">
        {/* Floral arch */}
        <motion.div
          aria-hidden="true"
          className="splash-floral-arch pointer-events-none absolute left-0 right-0 top-0"
          initial={shouldReduceMotion ? false : { opacity: 0, y: -35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.svg
            viewBox="0 0 400 190"
            className="h-full w-full"
            preserveAspectRatio="xMidYMin slice"
            xmlns="http://www.w3.org/2000/svg"
            animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <defs>
              <linearGradient
                id="splash-arch-gradient"
                x1="0"
                y1="0"
                x2="400"
                y2="190"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#c99635" stopOpacity=".5" />
                <stop offset=".5" stopColor="#fdfbf7" stopOpacity=".9" />
                <stop offset="1" stopColor="#b8c6a7" stopOpacity=".5" />
              </linearGradient>
            </defs>

            <path
              d="M0 0H400V78C340 137 275 165 200 165S60 137 0 78V0Z"
              fill="url(#splash-arch-gradient)"
            />

            <motion.path
              d="M0 78C60 137 125 165 200 165S340 137 400 78"
              stroke="#c99635"
              strokeOpacity=".65"
              strokeWidth="1.3"
              fill="none"
              initial={shouldReduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 2,
                delay: 0.3,
              }}
            />

            <path
              d="M0 88C60 147 125 175 200 175S340 147 400 88"
              stroke="#c99635"
              strokeOpacity=".3"
              fill="none"
            />
          </motion.svg>

          {[
            { position: 'left-4 top-10 sm:left-10 sm:top-12', icon: '🌿' },
            { position: 'right-4 top-10 sm:right-10 sm:top-12', icon: '🌿' },
            { position: 'left-8 top-16 sm:top-20', icon: '🌸' },
            { position: 'right-8 top-16 sm:top-20', icon: '🌸' },
          ].map((flower, index) => (
            <motion.span
              key={index}
              className={`absolute ${flower.position} text-2xl sm:text-4xl`}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, index % 2 === 0 ? -7 : 7, 0],
                      rotate: [0, index % 2 === 0 ? 7 : -7, 0],
                    }
              }
              transition={{
                duration: 4 + index,
                delay: index * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {flower.icon}
            </motion.span>
          ))}

          <motion.span
            className="absolute left-1/2 top-20 -translate-x-1/2 text-lg sm:top-24 sm:text-xl"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    opacity: [0.4, 1, 0.4],
                    scale: [0.85, 1.15, 0.85],
                    rotate: [0, 20, 0],
                  }
            }
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✨
          </motion.span>
        </motion.div>

        {/* Groom and bride names */}
        <div className="h-[clamp(1.5rem,5vh,4rem)] w-full shrink-0" aria-hidden="true" />

        <motion.section
          {...fadeUp(0.35)}
          className="splash-content relative z-10 mt-1 w-full max-w-3xl shrink-0 space-y-3 sm:mt-3 sm:space-y-4 lg:space-y-5"
        >
          {/* Glowing heart monogram */}
          <motion.div
            className="splash-monogram relative mx-auto flex items-center justify-center"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.07, 1],
                    boxShadow: [
                      '0 0 12px rgba(201,150,53,0.12)',
                      '0 0 30px rgba(201,150,53,0.4)',
                      '0 0 12px rgba(201,150,53,0.12)',
                    ],
                  }
            }
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              animate={shouldReduceMotion ? {} : { scale: [1, 1.12, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={24} className="fill-[#c99635] text-[#c99635]" />
            </motion.div>

            {!shouldReduceMotion && (
              <motion.span
                className="absolute -right-3 -top-2 text-xs text-[#FFE8A3]"
                animate={{ opacity: [0, 1, 0], y: [5, -5, 5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                ✨
              </motion.span>
            )}
          </motion.div>

          {/* Wedding subtitle */}
          <motion.p
            {...fadeUp(0.55)}
            className="text-lg font-khmer-body font-semibold tracking-[0.12em] text-[#FFF0C2] [text-shadow:0_1px_3px_rgba(35,45,30,0.9),0_0_10px_rgba(201,150,53,0.35)] sm:text-xl sm:tracking-[0.2em] md:text-2xl md:tracking-[0.25em] lg:text-3xl"
          >
            {t.weddingSubtitle}
          </motion.p>

          <motion.div
            {...fadeUp(0.7)}
            className="mx-auto flex w-full max-w-2xl items-center justify-center gap-2 sm:gap-5 md:gap-8"
          >
            {/* Groom */}
            <div className="min-w-0 flex-1 space-y-1 text-center sm:space-y-2">
              <p className="break-words font-khmer-body text-xs font-semibold tracking-[0.06em] text-[#FFE8A3] [text-shadow:0_1px_3px_rgba(35,45,30,0.9)] sm:text-sm sm:tracking-[0.12em] md:text-base">
                {t.groomLabel}
              </p>

              <h1 className="splash-couple-name text-[clamp(1.35rem,4.5vw,2.5rem)] font-khmer-title leading-tight" >
                {t.groomKhmer}
              </h1>
            </div>

            {/* Decorative divider */}
            <motion.div
              {...fadeUp(0.85)}
              className="flex flex-shrink-0 items-center justify-center"
            >
              <motion.span
                className="h-12 w-px shrink-0 bg-gradient-to-b from-transparent via-[#e6c77f] to-transparent sm:h-16"
                initial={shouldReduceMotion ? false : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.1, delay: 0.8 }}
                style={{ transformOrigin: 'center' }}
              />
            </motion.div>

            {/* Bride */}
            <div className="min-w-0 flex-1 space-y-1 text-center sm:space-y-2">
              <p className="break-words font-khmer-body text-xs font-semibold tracking-[0.06em] text-[#FFE8A3] [text-shadow:0_1px_3px_rgba(35,45,30,0.9)] sm:text-sm sm:tracking-[0.12em] md:text-base">
                {t.brideLabel}
              </p>

              <h2 className="splash-couple-name text-[clamp(1.35rem,4.5vw,2.5rem)] font-khmer-title leading-tight" >
                {t.brideKhmer}
              </h2>
            </div>
          </motion.div>

          {/* Wedding title */}
          <motion.h2
            {...fadeUp(1.15)}
            className="pt-1 text-2xl font-khmer-title text-[#FFF8E8] [text-shadow:0_1px_4px_rgba(25,35,25,0.85)] sm:text-3xl md:text-4xl"
          >
            {t.weddingTitle}
          </motion.h2>

          <motion.p
            {...fadeUp(1.3)}
            className="font-khmer-body text-base text-[#F8E8C4] [text-shadow:0_1px_3px_rgba(35,45,30,0.9)] sm:text-xl md:text-2xl"
          >
            {t.subtitle}
          </motion.p>
        </motion.section>

        {/* Guest name card */}
        <AnimatePresence mode="wait">
          {true && (
            <motion.section
              key="guest-card"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 35, scale: 0.96 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? {}
                  : { opacity: 0, y: 15, scale: 0.97 }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="splash-guest-section relative z-10 my-1 w-full max-w-md shrink-0 sm:my-2 sm:max-w-lg lg:max-w-xl"
            >
              <div className="mb-1 flex items-center justify-center gap-3 text-[#d9bd7b] sm:mb-2">
                <span>❦</span>
                <span className="h-px w-12 bg-[#c99635]/60 sm:w-16" />
                <Sparkles size={17} />
                <span className="h-px w-12 bg-[#c99635]/60 sm:w-16" />
                <span>❦</span>
              </div>

              <motion.div
                className="splash-guest-card relative rounded-2xl border p-5 sm:p-7 md:p-8"
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -3,
                        boxShadow: '0 12px 40px rgba(201,150,53,0.17)',
                      }
                }
                transition={{ duration: 0.3 }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 rounded-xl border border-[#c99635]/25"
                />

                {!shouldReduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-5 top-5 text-[#c99635]/60"
                    animate={{
                      rotate: [0, 90, 180],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <Sparkles size={15} />
                  </motion.div>
                )}

                <div className="relative z-10 space-y-4 sm:space-y-5">
                  <p className="font-khmer-body text-base leading-relaxed tracking-[0.06em] text-[#68725a] sm:text-lg sm:tracking-[0.1em] md:text-xl">
                    {t.invitationFor}
                  </p>

                  <div className="mx-auto h-0.5 w-16 bg-[#c99635] sm:w-24" />

                  {isEditingGuest ? (
                    <form onSubmit={handleSaveGuest} className="space-y-3">
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder={t.guestPlaceholder}
                        aria-label={t.guestPlaceholder}
                        autoFocus
                        className="splash-guest-input font-khmer-body"
                      />

                      <motion.button
                        type="submit"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                        className="splash-save-button font-khmer-body"
                      >
                        <Check size={16} />
                        {t.saveName}
                      </motion.button>
                    </form>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={() => setIsEditingGuest(true)}
                      disabled={isOpening}
                      title=""
                      whileHover={
                        shouldReduceMotion ? {} : { scale: 1.025 }
                      }
                      whileTap={
                        shouldReduceMotion ? {} : { scale: 0.985 }
                      }
                      className="group w-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c99635]"
                    >
                      <span className="block break-words [overflow-wrap:anywhere] font-khmer-body text-2xl font-bold leading-snug text-[#243629] transition-colors group-hover:text-[#9b7429] sm:text-3xl md:text-4xl">
                        {guestName.trim()}
                      </span>

                      <span className="mt-2 block text-sm leading-relaxed font-khmer-body text-[#7a806c] sm:mt-3 sm:text-base md:text-lg">
                      </span>
                    </motion.button>
                  )}
                </div>
              </motion.div>

              <div className="mt-1 flex items-center justify-center gap-3 text-[#d9bd7b] sm:mt-2">
                <span>❦</span>
                <span className="h-px w-12 bg-[#c99635]/60 sm:w-16" />
                <Heart size={14} className="fill-[#c99635]" />
                <span className="h-px w-12 bg-[#c99635]/60 sm:w-16" />
                <span>❦</span>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Open invitation */}
        <motion.section
          {...fadeUp(1.35)}
          className="splash-content relative z-10 mb-2 w-full max-w-md shrink-0 space-y-3 sm:mb-3 sm:max-w-lg sm:space-y-4"
        >
          <motion.button
            type="button"
            onClick={handleOpenInvitation}
            disabled={isOpening}
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    scale: 1.035,
                    y: -3,
                    boxShadow: '0 0 32px rgba(201,150,53,0.3)',
                  }
            }
            whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
            className={`splash-open-button relative overflow-hidden ${
              isOpening ? 'splash-open-button-active' : ''
            }`}
          >
            {/* Moving gold shimmer */}
            {!shouldReduceMotion && !isOpening && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ left: '-50%' }}
                animate={{ left: '140%' }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1.8,
                  ease: 'easeInOut',
                }}
              />
            )}

            <motion.span
              className="splash-open-icon relative z-10"
              animate={
                shouldReduceMotion || isOpening
                  ? {}
                  : {
                      y: [0, -2, 0],
                      rotate: [0, -4, 4, 0],
                    }
              }
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MailOpen size={21} />
            </motion.span>

            <span className="relative z-10 font-khmer-body text-lg font-semibold tracking-wide sm:text-xl md:text-2xl">
              {isOpening ? t.opening : t.openBtn}
            </span>
          </motion.button>

          <motion.p
            className="font-khmer-body text-sm leading-relaxed text-[#FFF0D0] [text-shadow:0_1px_3px_rgba(35,45,30,0.9)] sm:text-base md:text-lg"
            animate={
              shouldReduceMotion ? {} : { opacity: [0.65, 1, 0.65] }
            }
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {t.openHint}
          </motion.p>
        </motion.section>

        {/* Bottom decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 overflow-hidden sm:h-24"
        >
          <motion.div
            className="absolute -bottom-16 left-1/2 h-32 w-72 -translate-x-1/2 rounded-full border border-[#c99635]/30"
            animate={
              shouldReduceMotion
                ? {}
                : { scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] }
            }
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute -bottom-20 left-1/2 h-32 w-60 -translate-x-1/2 rounded-full border border-[#c99635]/20"
            animate={
              shouldReduceMotion
                ? {}
                : { scale: [1.05, 1, 1.05], opacity: [0.2, 0.5, 0.2] }
            }
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.span
            className="absolute bottom-2 left-3 text-2xl sm:bottom-4 sm:left-5 sm:text-3xl"
            animate={
              shouldReduceMotion
                ? {}
                : { rotate: [0, 8, -5, 0], y: [0, -4, 0] }
            }
            transition={{ duration: 5, repeat: Infinity }}
          >
            🌿
          </motion.span>

          <motion.span
            className="absolute bottom-2 right-3 text-2xl sm:bottom-4 sm:right-5 sm:text-3xl"
            animate={
              shouldReduceMotion
                ? {}
                : { rotate: [0, -8, 5, 0], y: [0, -4, 0] }
            }
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          >
            🌿
          </motion.span>
        </div>

        {/* Footer */}
        <motion.footer
          {...fadeUp(1.55)}
          className="relative z-10 mt-1 shrink-0 px-3 text-center"
        >
          <p className="font-khmer-body text-sm text-[#FFE8A3] [text-shadow:0_1px_3px_rgba(35,45,30,0.9)] sm:text-base md:text-lg">
            {t.footer}
          </p>
        </motion.footer>
      </main>
    </motion.div>
  );
};
