
import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Phone,
  QrCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Heart,
} from 'lucide-react';
import { motion } from 'framer-motion';

import { WEDDING_LOCATION } from '../lib/qrHelper';
import mapQrImage from '../assets/images/qr_map.png';

export const LocationMap: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopy = async (
    text: string,
    onSuccess: () => void
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      onSuccess();
    } catch {
      // Clipboard access may be unavailable on non-secure origins.
      window.prompt('សូមចម្លងព័ត៌មានខាងក្រោម៖', text);
    }
  };

  const handleCopyAddress = () => {
    handleCopy(WEDDING_LOCATION.fullKhmer, () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleCopyPhone = (num: string) => {
    handleCopy(num.replace(/\s+/g, ''), () => {
      setCopiedPhone(num);
      window.setTimeout(() => setCopiedPhone(null), 2500);
    });
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = mapQrImage;
    link.download = 'wedding_location_qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cardReveal = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="location"
      className="relative isolate w-full overflow-hidden px-3 py-12 sm:px-5 sm:py-16 lg:py-20"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/[0.07] blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-emerald-400/[0.05] blur-3xl" />
        <div className="absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-amber-300/[0.04] blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-5xl">
      {/* Section Heading */}
      <motion.div
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className="mx-auto mb-9 max-w-3xl px-4 text-center sm:mb-12"
      >
        {/* Elegant Label */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-[#20392b]/60 px-4 py-2 shadow-sm shadow-black/10 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-amber-300/80" />

          <span className="text-[10px] font-medium tracking-[0.2em] text-amber-100/90 sm:text-xs">
            WEDDING VENUE
          </span>

          <Sparkles className="h-3.5 w-3.5 text-amber-300/80" />
        </div>

        {/* Main Heading */}
        <h2 className="font-khmer-title text-xl font-bold leading-relaxed text-amber-50 sm:text-2xl md:text-4xl">
          ស្កេន QR និងព័ត៌មានទីតាំង
        </h2>

        {/* Decorative Divider */}
        <div className="mx-auto my-5 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-300/50 sm:w-16" />

          <Heart className="h-4 w-4 fill-amber-300/10 text-amber-300/90" />

          <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-300/50 sm:w-16" />
        </div>

        {/* Description */}
        <p className="mx-auto max-w-xl font-khmer-title text-xs leading-8 text-stone-300/90 sm:text-sm sm:leading-9 md:text-base">
          សូមស្កេន QR Code ឬចុចប៊ូតុងខាងក្រោម
          ដើម្បីស្វែងរកទីតាំង និងធ្វើដំណើរមកចូលរួម
          ក្នុងពិធីមង្គលការដ៏មានអត្ថន័យរបស់យើងខ្ញុំ។
        </p>
      </motion.div>

        {/* Main panel */}
        <motion.div
          variants={cardReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[1.75rem] border border-amber-200/20 bg-[#21372b]/95 shadow-[0_25px_80px_rgba(0,0,0,0.25)] sm:rounded-[2rem]"
        >
          {/* Fine gold top border */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />

          <div className="grid grid-cols-1 gap-5 p-4 sm:gap-6 sm:p-6 md:grid-cols-12 md:gap-7 md:p-8">
            {/* QR column */}
            <div className="md:col-span-5">
              <div className="relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-amber-200/20 bg-[#14291f]/80 p-5 text-center sm:p-6">
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border border-amber-200/[0.07]" />
                <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full border border-amber-200/[0.07]" />

                <div className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/15 bg-amber-200/[0.06] px-3 py-1.5">
                  <QrCode className="h-4 w-4 text-amber-300" />
                  <span className="text-xs font-semibold text-amber-100">
                    Location QR Code
                  </span>
                </div>

                <div className="group relative rounded-2xl border border-amber-300/70 bg-white p-2.5 shadow-[0_0_35px_rgba(245,200,100,0.09)] transition-transform duration-500 hover:scale-[1.02] sm:p-3">
                  <img
                    src={mapQrImage}
                    alt="QR Code សម្រាប់ទីតាំងកម្មវិធីមង្គលការ"
                    className="h-44 w-44 object-contain sm:h-52 sm:w-52 md:h-56 md:w-56"
                  />

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.03]" />
                </div>

                <p className="mt-4 max-w-xs text-xs leading-6 text-stone-300">
                  ស្កេន QR Code នេះដោយប្រើកាមេរ៉ាទូរស័ព្ទ
                  ដើម្បីមើលទីតាំងកម្មវិធី។
                </p>

                <div className="mt-5 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-amber-200/25 bg-white/[0.04] px-3 py-3 text-xs font-semibold text-amber-100 transition-all duration-300 hover:border-amber-200/50 hover:bg-white/[0.08] active:scale-[0.98]"
                  >
                    <Download className="h-4 w-4 text-amber-300" />
                    ទាញយក QR
                  </button>

                  <a
                    href={WEDDING_LOCATION.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-3 py-3 text-xs font-bold text-white shadow-lg shadow-amber-950/20 transition-all duration-300 hover:from-amber-500 hover:to-amber-400 active:scale-[0.98]"
                  >
                    <Navigation className="h-4 w-4" />
                    នាំផ្លូវ
                    <ExternalLink className="h-3 w-3 opacity-80" />
                  </a>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[10px] text-stone-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>ងាយស្រួលសម្រាប់ការធ្វើដំណើរ</span>
                </div>
              </div>
            </div>

            {/* Venue and contact column */}
            <div className="flex flex-col gap-5 md:col-span-7">
              {/* Venue details */}
              <div className="rounded-2xl border border-amber-200/15 bg-white/[0.035] p-4 sm:p-5">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-300/25 bg-amber-200/10 sm:h-12 sm:w-12">
                    <MapPin className="h-5 w-5 text-amber-300 sm:h-6 sm:w-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold tracking-[0.16em] text-amber-300/90">
                      WEDDING LOCATION
                    </span>

                    <h3 className="mt-1 font-khmer-title text-base leading-relaxed text-white sm:text-lg">
                      {WEDDING_LOCATION.name}
                    </h3>

                    <p className="mt-2 break-words font-khmer-body text-sm leading-7 text-stone-200">
                      {WEDDING_LOCATION.fullKhmer}
                    </p>

                    <p className="mt-2 break-words text-xs leading-6 text-stone-400">
                      {WEDDING_LOCATION.fullEnglish}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-2 border-t border-white/[0.08] pt-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-amber-200/20 bg-amber-100/[0.05] px-3 py-2.5 text-xs font-semibold text-amber-100 transition-all hover:bg-amber-100/10 active:scale-[0.98]"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-300" />
                    ) : (
                      <Copy className="h-4 w-4 text-amber-300" />
                    )}
                    <span>
                      {copied ? 'បានចម្លងអាសយដ្ឋានរួច!' : 'ចម្លងអាសយដ្ឋាន'}
                    </span>
                  </button>

                  <a
                    href={WEDDING_LOCATION.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs font-semibold text-stone-200 transition-all hover:border-amber-200/30 hover:bg-white/[0.08] active:scale-[0.98]"
                  >
                    <ExternalLink className="h-4 w-4 text-amber-300" />
                    បើក Google Maps
                  </a>
                </div>
              </div>

              {/* Contact numbers */}
              <div className="rounded-2xl border border-amber-200/15 bg-[#14291f]/60 p-4 sm:p-5">
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-300/10">
                    <Phone className="h-5 w-5 text-emerald-300" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-khmer-title text-sm leading-relaxed text-white sm:text-base">
                      ទំនាក់ទំនងម្ចាស់កម្មវិធី
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-stone-400">
                      សូមទាក់ទងមកយើងខ្ញុំ ប្រសិនបើត្រូវការជំនួយក្នុងការស្វែងរកទីតាំង។
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {WEDDING_LOCATION.hostsPhones.map((phone, idx) => (
                    <motion.div
                      key={`${phone.tel}-${idx}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.4,
                        delay: idx * 0.08,
                      }}
                      className="min-w-0 rounded-xl border border-white/[0.08] bg-white/[0.035] p-3.5 transition-colors duration-300 hover:border-amber-200/25 hover:bg-white/[0.055]"
                    >
                      <p className="text-[11px] font-medium text-stone-400">
                        {phone.label}
                      </p>

                      <a
                        href={`tel:${phone.tel}`}
                        className="mt-2 block break-words text-base font-bold tracking-wide text-amber-100 transition-colors hover:text-amber-300 sm:text-lg"
                      >
                        {phone.number}
                      </a>

                      <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/[0.08] pt-3">
                        <a
                          href={`tel:${phone.tel}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-400/10 px-2.5 py-2 text-[11px] font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/15"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          ហៅទូរស័ព្ទ
                        </a>

                        <button
                          type="button"
                          onClick={() => handleCopyPhone(phone.number)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-medium text-stone-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                        >
                          {copiedPhone === phone.number ? (
                            <Check className="h-3.5 w-3.5 text-emerald-300" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                          {copiedPhone === phone.number ? 'បានចម្លង!' : 'ចម្លង'}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Travel note */}
              <div className="flex items-start gap-3 rounded-xl border border-amber-200/15 bg-amber-100/[0.045] p-4">
                <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />

                <p className="font-khmer-body text-xs leading-7 text-stone-300">
                  <strong className="font-semibold text-amber-100">
                    ចំណាំការធ្វើដំណើរ៖
                  </strong>{' '}
                  សូមពិនិត្យទីតាំងក្នុង Google Maps ជាមុន។
                  ប្រសិនបើពិបាកស្វែងរកទីតាំង សូមទាក់ទងលេខទូរស័ព្ទខាងលើ
                  ដើម្បីទទួលបានជំនួយ។
                </p>
              </div>
            </div>
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center justify-center gap-3 pb-5 pt-1 sm:pb-6">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-300/40" />
            <Heart className="h-3.5 w-3.5 text-amber-300/70" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-300/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
