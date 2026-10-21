import React, { useState } from 'react';
import { Heart, Menu, X, Database } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-amber-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold tracking-tight text-amber-950 font-khmer-title whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <span>នាង ពៅ</span>
          <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
          <span>ហូ សំណាង</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-700">
          <a href="#invitation" className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
            លិខិតអញ្ជើញ
          </a>
          <a href="#gallery" className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
            រូបភាព
          </a>
          <a href="#location" className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
            ទីតាំង & ផែនទី
          </a>
          <a href="#gift" className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
            ចំណងដៃ KHQR
          </a>
          <a href="#wishes" className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
            សារជូនពរ
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            onClick={onOpenAdmin}
            type="button"
            title="ពិនិត្យមើលបញ្ជីភ្ញៀវ & SQLite"
            className="p-2 rounded-xl text-stone-600 hover:text-amber-900 hover:bg-amber-100/60 transition-colors border border-stone-200/80 cursor-pointer"
          >
            <Database className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden p-2 text-stone-700 rounded-lg hover:bg-stone-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-amber-200 px-4 py-4 space-y-3">
          <a
            href="#invitation"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm font-medium text-stone-800 hover:text-amber-800"
          >
            លិខិតអញ្ជើញ
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm font-medium text-stone-800 hover:text-amber-800"
          >
            រូបភាពអាពាហ៍ពិពាហ៍
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm font-medium text-stone-800 hover:text-amber-800"
          >
            ទីតាំង & ផែនទី (Location)
          </a>
          <a
            href="#gift"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm font-medium text-stone-800 hover:text-amber-800"
          >
            បាញ់លុយចំណងដៃ KHQR
          </a>
          <a
            href="#wishes"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm font-medium text-stone-800 hover:text-amber-800"
          >
            ផ្ញើសារជូនពរ
          </a>
          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              type="button"
              className="text-xs text-stone-600 flex items-center gap-1.5 py-1"
            >
              <Database className="w-3.5 h-3.5 text-amber-700" />
              <span>បញ្ជីភ្ញៀវ (Admin SQLite)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
