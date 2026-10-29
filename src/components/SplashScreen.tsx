
import React, { useState } from 'react';
import {
  MailOpen,
  Volume2,
  VolumeX,
  Heart,
  Check,
  Sparkles,
} from 'lucide-react';

type SplashScreenProps = {
  isMusicPlaying?: boolean;
  onMusicToggle?: () => void;
  onOpenInvitation?: () => void;
};

// Read the guest name from the invitation URL.
// Your InviteLinkGeneratorModal generates ?to=...
const getGuestNameFromUrl = (): string => {
  if (typeof window === 'undefined') return '';

  const params = new URLSearchParams(window.location.search);

  return (
    params.get('to')?.trim() ||
    params.get('name')?.trim() ||
    ''
  );
};

export const SplashScreen: React.FC<SplashScreenProps> = ({
  isMusicPlaying = false,
  onMusicToggle,
  onOpenInvitation,
}) => {
  const [guestName, setGuestName] = useState<string>(
    getGuestNameFromUrl
  );

  const [isEditingGuest, setIsEditingGuest] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const t = {
    coupleNames: 'គីមហ៊ 💓 ធារ៉ា',
    weddingTitle: 'មង្គលការ',
    subtitle: 'សូមគោរពអញ្ជើញ',
    invitationFor: 'លិខិតអញ្ជើញជូនចំពោះ',
    editGuest: 'ចុចលើឈ្មោះដើម្បីកែប្រែ',
    guestPlaceholder: 'សូមបញ្ចូលឈ្មោះ',
    saveName: 'រក្សាទុក',
    musicOn: 'បើកតន្ត្រី',
    musicOff: 'បិទតន្ត្រី',
    openBtn: 'បើកលិខិតអញ្ជើញ',
    openHint: 'សូមអញ្ជើញចុចដើម្បីបើកលិខិត',
    footer: 'ដោយក្តីគោរព និងសេចក្តីស្រឡាញ់',
    opening: 'សូមអញ្ជើញចូលរួមអបអរសាទរ',
  };

  // Save the guest name and keep it synchronized with ?to=.
  const handleSaveGuest = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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

    // Remove the old parameter to avoid conflicting names.
    url.searchParams.delete('name');

    window.history.replaceState({}, '', url.toString());
  };

  const handleOpenInvitation = () => {
    if (isOpening) return;

    setIsOpening(true);

    window.setTimeout(() => {
      onOpenInvitation?.();
    }, 650);
  };

  return (
    <div
      className={`wedding-splash fixed inset-0 z-50 h-screen h-[100dvh] w-full overflow-hidden overscroll-none ${
        isOpening ? 'splash-opening' : 'splash-enter'
      }`}
    >
      {/* Ambient background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="splash-ambient splash-ambient-one" />
        <div className="splash-ambient splash-ambient-two" />
        <div className="wedding-splash-pattern absolute inset-0" />
        <div className="splash-petal splash-petal-one">✿</div>
        <div className="splash-petal splash-petal-two">✧</div>
        <div className="splash-petal splash-petal-three">❀</div>
        <div className="splash-petal splash-petal-four">✧</div>
      </div>

      {/* Music control */}
      <div className="absolute left-3 right-3 top-3 z-30 flex justify-end sm:left-6 sm:right-6 sm:top-5">
        <button
          type="button"
          onClick={onMusicToggle}
          disabled={isOpening}
          aria-label={isMusicPlaying ? t.musicOff : t.musicOn}
          aria-pressed={isMusicPlaying}
          className="splash-control"
        >
          {isMusicPlaying ? (
            <Volume2
              size={17}
              className="animate-pulse text-[#e6c77f]"
            />
          ) : (
            <VolumeX
              size={17}
              className="text-[#ded5bd]"
            />
          )}

          <span className="font-khmer-body">
            {isMusicPlaying ? t.musicOn : t.musicOff}
          </span>
        </button>
      </div>

      {/* Invitation cover */}
      <main className="relative z-10 flex h-full min-h-0 w-full flex-col items-center justify-between overflow-hidden px-4 pb-3 pt-16 text-center sm:px-8 sm:pb-5 sm:pt-20">
        {/* Decorative floral arch */}
        <div
          aria-hidden="true"
          className="splash-floral-arch pointer-events-none absolute left-0 right-0 top-0"
        >
          <svg
            viewBox="0 0 400 190"
            className="h-full w-full"
            preserveAspectRatio="xMidYMin slice"
            xmlns="http://www.w3.org/2000/svg"
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
                <stop
                  offset=".5"
                  stopColor="#fdfbf7"
                  stopOpacity=".9"
                />
                <stop
                  offset="1"
                  stopColor="#b8c6a7"
                  stopOpacity=".5"
                />
              </linearGradient>
            </defs>

            <path
              d="M0 0H400V78C340 137 275 165 200 165S60 137 0 78V0Z"
              fill="url(#splash-arch-gradient)"
            />

            <path
              d="M0 78C60 137 125 165 200 165S340 137 400 78"
              stroke="#c99635"
              strokeOpacity=".65"
              strokeWidth="1.3"
              fill="none"
            />

            <path
              d="M0 88C60 147 125 175 200 175S340 147 400 88"
              stroke="#c99635"
              strokeOpacity=".3"
              fill="none"
            />
          </svg>

          <span className="absolute left-4 top-10 text-2xl sm:left-10 sm:top-12 sm:text-4xl">
            🌿
          </span>
          <span className="absolute right-4 top-10 text-2xl sm:right-10 sm:top-12 sm:text-4xl">
            🌿
          </span>
          <span className="absolute left-8 top-16 text-xl sm:top-20 sm:text-2xl">
            🌸
          </span>
          <span className="absolute right-8 top-16 text-xl sm:top-20 sm:text-2xl">
            🌸
          </span>
          <span className="absolute left-1/2 top-20 -translate-x-1/2 text-lg sm:top-24 sm:text-xl">
            ✨
          </span>
        </div>

        {/* Couple's names */}
        <section className="splash-content relative z-10 mt-1 w-full space-y-2 sm:mt-3 sm:space-y-4">
          <div className="splash-monogram mx-auto">
            <Heart
              size={24}
              className="fill-[#c99635] text-[#c99635]"
            />
          </div>

          <p className="text-fluid-xs font-khmer-body uppercase tracking-[0.15em] text-[#d9bd7b] sm:tracking-[0.3em]">
            សិរីមង្គលអាពាហ៍ពិពាហ៍
          </p>

          <h1 className="splash-couple-name text-fluid-xl font-khmer-title sm:text-fluid-2xl">
            {t.coupleNames}
          </h1>

          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c99635] sm:w-12" />

            <Heart
              size={18}
              className="fill-[#c99635] text-[#c99635]"
            />

            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c99635] sm:w-12" />
          </div>

          <h2 className="text-fluid-lg font-khmer-title text-[#fdfbf7] sm:text-2xl">
            {t.weddingTitle}
          </h2>

          <p className="font-khmer-body text-base text-[#e0d5b8] sm:text-xl">
            {t.subtitle}
          </p>
        </section>

        {/* Guest name card: hidden when no name is provided */}
        {(guestName.trim() || isEditingGuest) && (
          <section className="splash-guest-section relative z-10 my-2 w-full max-w-xs shrink-0 sm:my-4 sm:max-w-sm">
            <div className="mb-1 flex items-center justify-center gap-3 text-[#d9bd7b] sm:mb-2">
              <span>❦</span>
              <span className="h-px w-12 bg-[#c99635]/60 sm:w-16" />
              <Sparkles size={17} />
              <span className="h-px w-12 bg-[#c99635]/60 sm:w-16" />
              <span>❦</span>
            </div>

            <div className="splash-guest-card relative rounded-2xl border p-4 sm:p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 rounded-xl border border-[#c99635]/25"
              />

              <div className="relative z-10 space-y-3 sm:space-y-4">
                <p className="text-fluid-xs font-khmer-body tracking-[0.08em] text-[#68725a] sm:tracking-[0.12em]">
                  {t.invitationFor}
                </p>

                <div className="mx-auto h-px w-12 bg-[#c99635]" />

                {isEditingGuest ? (
                  <form
                    onSubmit={handleSaveGuest}
                    className="space-y-3"
                  >
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) =>
                        setGuestName(e.target.value)
                      }
                      placeholder={t.guestPlaceholder}
                      aria-label={t.guestPlaceholder}
                      autoFocus
                      className="splash-guest-input font-khmer-body"
                    />

                    <button
                      type="submit"
                      className="splash-save-button font-khmer-body"
                    >
                      <Check size={16} />
                      {t.saveName}
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditingGuest(true)}
                    disabled={isOpening}
                    title={t.editGuest}
                    className="group w-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c99635]"
                  >
                    <span className="block break-words font-khmer-body text-lg font-semibold leading-relaxed text-[#243629] transition-colors group-hover:text-[#9b7429] sm:text-xl">
                      {guestName.trim()}
                    </span>

                    <span className="mt-1 block text-fluid-xs font-khmer-body text-[#7a806c] sm:mt-2">
                      {t.editGuest}
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className="mt-1 flex items-center justify-center gap-3 text-[#d9bd7b] sm:mt-2">
              <span>❦</span>
              <span className="h-px w-12 bg-[#c99635]/60 sm:w-16" />
              <Heart
                size={14}
                className="fill-[#c99635]"
              />
              <span className="h-px w-12 bg-[#c99635]/60 sm:w-16" />
              <span>❦</span>
            </div>
          </section>
        )}

        {/* Open invitation */}
        <section className="splash-content relative z-10 mb-1 w-full max-w-xs shrink-0 space-y-2 sm:mb-2 sm:max-w-sm sm:space-y-3">
          <button
            type="button"
            onClick={handleOpenInvitation}
            disabled={isOpening}
            className={`splash-open-button ${
              isOpening ? 'splash-open-button-active' : ''
            }`}
          >
            <span className="splash-open-icon">
              <MailOpen size={21} />
            </span>

            <span className="font-khmer-body text-sm font-semibold tracking-wide sm:text-base">
              {isOpening ? t.opening : t.openBtn}
            </span>
          </button>

          <p className="text-fluid-xs font-khmer-body text-[#e0d5b8]">
            {t.openHint}
          </p>
        </section>

        {/* Bottom decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 overflow-hidden sm:h-24"
        >
          <div className="absolute -bottom-16 left-1/2 h-32 w-72 -translate-x-1/2 rounded-full border border-[#c99635]/30" />
          <div className="absolute -bottom-20 left-1/2 h-32 w-60 -translate-x-1/2 rounded-full border border-[#c99635]/20" />

          <span className="absolute bottom-2 left-3 text-2xl sm:bottom-4 sm:left-5 sm:text-3xl">
            🌿
          </span>
          <span className="absolute bottom-2 right-3 text-2xl sm:bottom-4 sm:right-5 sm:text-3xl">
            🌿
          </span>
        </div>

        {/* Footer */}
        <footer className="relative z-10 mt-1 shrink-0 px-3 text-center">
          <p className="font-khmer-body text-xs text-[#d9bd7b] sm:text-sm">
            {t.footer}
          </p>
        </footer>
      </main>
    </div>
  );
};
