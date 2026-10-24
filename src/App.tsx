import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PersonalizedBanner } from './components/PersonalizedBanner';
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
import { Heart, Database } from 'lucide-react';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('');

  useEffect(() => {
    // Read URL search params: ?to=... or ?guest=... or ?name=...
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const nameFromUrl = searchParams.get('to') || searchParams.get('guest') || searchParams.get('name');
      if (nameFromUrl) {
        setGuestName(nameFromUrl.trim());
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-khmer-body flex flex-col selection:bg-amber-200 selection:text-amber-900">
      {/* Top Navbar */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Personalized Invitation Header for Specific Guest */}
      {guestName && <PersonalizedBanner guestName={guestName} />}

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col space-y-4 sm:space-y-8">
        <HeroSection />
        <Countdown />
        <InvitationCard />
        <Gallery />
        <LocationMap />
        <GiftMoneyQR initialGuestName={guestName} />
        <WishesGuestbook initialGuestName={guestName} />
        <GratitudeSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-200/80 bg-[#F5EFE6] py-8 text-center text-xs text-stone-600 space-y-2 mt-12">
        <div className="flex items-center justify-center gap-2 font-khmer-title text-amber-950 text-sm">
          <span>(ឈ្មោះកូនប្រុស)</span>
          <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
          <span>(ឈ្មោះកូនស្រី)</span>
        </div>
        <p className="font-cinzel text-[11px] text-stone-500">
          Sunday 22nd November 2026 · Chi Kraeng, Siem Reap, Cambodia
        </p>
        <p className="text-[11px] text-stone-500">
          គេហទំព័ររៀបចំដោយក្តីគោរព និងស្រឡាញ់ | រៀបចំ និង បង្កើតដោយ លោក៖ (ឈ្មោះកូនប្រុស)
        </p>
      </footer>

      {/* Background Traditional Music Player */}
      <AudioPlayer />

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
    </div>
  );
}
