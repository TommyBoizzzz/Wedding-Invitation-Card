import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SplashScreen } from './components/SplashScreen';
import { Countdown } from './components/Countdown';
import { InvitationCard } from './components/InvitationCard';
import { LocationMap } from './components/LocationMap';
import { GiftMoneyQR } from './components/GiftMoneyQR';
import { Gallery } from './components/Gallery';
import { WishesGuestbook } from './components/WishesGuestbook';
import { GratitudeSection } from './components/GratitudeSection';
import { AudioPlayer } from './components/AudioPlayer';
import { AdminGuestListModal } from './components/AdminGuestListModal';
import { InviteLinkGeneratorModal } from './components/InviteLinkGeneratorModal';
import { Heart } from 'lucide-react';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('');
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  useEffect(() => {
    // Read URL search params: ?to=... or ?guest=... or ?name=...
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const nameFromUrl = searchParams.get('to') || searchParams.get('guest') || searchParams.get('name');
      if (nameFromUrl) {
        setGuestName(nameFromUrl.trim());
      }

      const storedMusicState = window.localStorage.getItem('wedding-music-enabled');
      if (storedMusicState === 'true') {
        setIsMusicPlaying(true);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('wedding-music-enabled', String(isMusicPlaying));
    }
  }, [isMusicPlaying]);

  return (
    <div className="theme-olive relative min-h-screen overflow-x-hidden text-stone-100 font-khmer-body flex flex-col selection:bg-amber-200 selection:text-amber-900">
      <AudioPlayer isPlaying={isMusicPlaying} onPlayingChange={setIsMusicPlaying} />

      {isSplashVisible ? (
        <SplashScreen
          guestName={guestName || 'Mr. Alexandro Hale'}
          isMusicPlaying={isMusicPlaying}
          onMusicToggle={() => setIsMusicPlaying((prev) => !prev)}
          onOpenInvitation={() => setIsSplashVisible(false)}
        />
      ) : (
        <>
          <div className="butterfly-sky" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, index) => (
              <span key={index} className="butterfly" style={{ animationDelay: `${index * 0.7}s` }} />
            ))}
          </div>

          {/* Top Navbar */}
          <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

          {/* Main Content Sections */}
          <main className="relative z-10 flex-1 flex flex-col space-y-4 sm:space-y-8">
            <HeroSection />
            <Countdown />
            <InvitationCard />
            <LocationMap />
            <GiftMoneyQR initialGuestName={guestName} />
            <WishesGuestbook initialGuestName={guestName} />
            <Gallery />
            <GratitudeSection />
          </main>

          {/* Footer */}
          <footer className="relative z-10 border-t border-white/10 bg-[#1d2d22]/90 py-8 text-center text-xs text-stone-200 space-y-2 mt-12 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 font-khmer-title text-white text-sm">
              <span>ហេង គីមហ៊</span>
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span>សន ធារ៉ា</span>
            </div>
            <p className="font-cinzel text-[11px] text-stone-300">
              Saturday 23rd January 2027 · Phnom Penh, Cambodia
            </p>
            <p className="text-[11px] text-stone-300">
              គេហទំព័ររៀបចំដោយក្តីគោរព និងស្រឡាញ់ | រៀបចំ និង បង្កើតដោយ លោក ៖ ហេង ចាន់សិលា
            </p>
          </footer>

          {/* Admin / Host Guest List & SQLite Manager Modal */}
          <AdminGuestListModal
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            onOpenInviteGenerator={() => {
              setIsAdminOpen(false);
              setIsInviteModalOpen(true);
            }}
          />

          {/* Personalized Invitation Link Generator Modal */}
          <InviteLinkGeneratorModal
            isOpen={isInviteModalOpen}
            onClose={() => setIsInviteModalOpen(false)}
            initialName={guestName || ''}
          />
        </>
      )}
    </div>
  );
}
