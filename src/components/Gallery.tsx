import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Heart,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoItem } from '../types/wedding';

import image01 from '../assets/images/wedding-hero.jpg';
import image02 from '../assets/images/image_02.jpg';
import image03 from '../assets/images/image_03.jpg';
import image04 from '../assets/images/image_04.jpg';
import image05 from '../assets/images/image_05.jpg';
import image06 from '../assets/images/image_06.jpg';
import image07 from '../assets/images/image_07.jpg';
import image08 from '../assets/images/image_08.jpg';

const WEDDING_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    src: image01,
    title: 'សិរីសួស្តីក្នុងឈុតមង្គលការបុរាណខ្មែរ',
    category: 'traditional',
    description:
      'កូនកំលោះ ហេង គីមហ៊ និង កូនក្រមុំ សន ធារ៉ា ក្នុងសម្លៀកបំពាក់ប្រពៃណីពណ៌មាសដ៏ប្រណិត នៅមុខប្រាសាទអង្គរវត្ត',
    location: 'Phnom Penh, Cambodia',
  },
  {
    id: 'photo-2',
    src: image02,
    title: 'ស្នាមញញឹមនៃសេចក្ដីសុខ និងមកុដមាស',
    category: 'traditional',
    description:
      'រូបថតជិតនៃគូស្នេហ៍ដ៏ផ្អែមល្ហែម គ្រងមកុដមង្គលការ និងគ្រឿងអលង្ការមាសក្បាច់បុរាណ',
    location: 'Phnom Penh, Cambodia',
  },
  {
    id: 'photo-3',
    src: image04,
    title: 'ក្រោមម្លប់ឆត្រមាស តាមផ្លូវស្ពានបុរាណ',
    category: 'traditional',
    description:
      'កូនកំលោះបាំងឆត្រមាសការពារកូនក្រមុំ ដើរកាត់ស្ពានហាលបុរាណថ្មភក់ ពោរពេញដោយភាពកក់ក្តៅ',
    location: 'Phnom Penh, Cambodia',
  },
  {
    id: 'photo-4',
    src: image07,
    title: 'ស្នេហាបែបសម័យទំនើបដ៏ស្រស់បំព្រង',
    category: 'modern',
    description:
      'កូនកំលោះក្នុងឈុតអាវធំពណ៌ខៀវ និងកូនក្រមុំក្នុងរ៉ូបសដ៏ស្រស់ស្អាត',
    location: 'Phnom Penh, Cambodia',
  },
  {
    id: 'photo-5',
    src: image05,
    title: 'ក្ដីស្នេហ៍អមតៈ កណ្តាលធម្មជាតិបៃតង',
    category: 'modern',
    description:
      'ឈរផ្អែកខ្នងគ្នាទៅវិញទៅមក ឆ្លុះបញ្ចាំងពីការជឿជាក់ និងការគាំទ្រគ្នាក្នុងជីវិតអាពាហ៍ពិពាហ៍',
    location: 'Phnom Penh, Cambodia',
  },
  {
    id: 'photo-6',
    src: image06,
    title: 'ទេសភាពស្ពានហាលអង្គរវត្ត ពេលព្រឹកព្រលឹម',
    category: 'traditional',
    description:
      'ទិដ្ឋភាពដ៏អស្ចារ្យនៃប្រាសាទអង្គរវត្ត និងការតុបតែងលម្អផ្កាឈូកសម្រាប់ពិធីសិរីមង្គល',
    location: 'Phnom Penh, Cambodia',
  },
  {
    id: 'photo-7',
    src: image03,
    title: 'អនុស្សាវរីយ៍ដ៏មានន័យនៃថ្ងៃមង្គលការ',
    category: 'traditional',
    description:
      'រូបភាពអនុស្សាវរីយ៍ដ៏ស្រស់ស្អាត ដែលរក្សាទុកនូវស្នាមញញឹម និងក្ដីស្រឡាញ់របស់គូស្វាមីភរិយា',
    location: 'Phnom Penh, Cambodia',
  },
  {
    id: 'photo-8',
    src: image08,
    title: 'ក្ដីស្រឡាញ់ និងសុភមង្គលជារៀងរហូត',
    category: 'traditional',
    description:
      'អនុស្សាវរីយ៍ដ៏ពិសេសនៃគូស្នេហ៍ ក្នុងឱកាសចាប់ផ្ដើមជីវិតគ្រួសារថ្មី',
    location: 'Phnom Penh, Cambodia',
  },
];

type GalleryFilter = 'all' | 'traditional' | 'modern';

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos =
    filter === 'all'
      ? WEDDING_PHOTOS
      : WEDDING_PHOTOS.filter((photo) => photo.category === filter);

  const activePhoto =
    lightboxIndex !== null
      ? filteredPhotos[lightboxIndex] ?? null
      : null;

  const handleNext = () => {
    if (lightboxIndex === null || filteredPhotos.length === 0) return;

    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % filteredPhotos.length
    );
  };

  const handlePrev = () => {
    if (lightboxIndex === null || filteredPhotos.length === 0) return;

    setLightboxIndex((current) =>
      current === null
        ? null
        : (current - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  };

  const handleFilterChange = (newFilter: GalleryFilter) => {
    setFilter(newFilter);
    setLightboxIndex(null);
  };

  return (
    <section
      id="gallery"
      className="mx-auto w-full max-w-5xl px-3 py-8 sm:px-4 sm:py-12"
    >
      {/* Gallery Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative mx-auto mb-10 w-full max-w-4xl px-3 text-center sm:mb-14 sm:px-6"
      >
        {/* Decorative background glow */}
        <div className="pointer-events-none absolute left-1/2 top-12 h-40 w-72 -translate-x-1/2 rounded-full bg-amber-500/[0.07] blur-3xl sm:h-52 sm:w-96" />

        {/* Decorative top ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mb-5 flex items-center justify-center gap-3 sm:mb-7"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/70 sm:w-20" />

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/30 bg-gradient-to-br from-[#294a36] to-[#14291e] shadow-[0_0_25px_rgba(217,169,76,0.10)] sm:h-14 sm:w-14">
            <Heart className="h-5 w-5 fill-amber-300/15 text-amber-300 sm:h-6 sm:w-6" />
          </div>

          <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/70 sm:w-20" />
        </motion.div>

        {/* Elegant eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mb-4 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-amber-300/25 bg-gradient-to-r from-[#243d2d]/90 via-[#304b35]/90 to-[#243d2d]/90 px-4 py-2 shadow-lg shadow-black/10 sm:mb-5 sm:px-5"
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-300 sm:h-4 sm:w-4" />

          <span className="font-khmer-body text-[10px] font-medium tracking-[0.12em] text-amber-100 sm:text-xs sm:tracking-[0.18em]">
            អាល់ប៊ុមរូបថតអាពាហ៍ពិពាហ៍
          </span>

          <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-300 sm:h-4 sm:w-4" />
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative font-khmer-title text-xl font-bold leading-[1.9] text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400 drop-shadow-sm sm:text-3xl md:text-4xl"
        >
          ទំព័ររូបភាពអនុស្សាវរីយ៍
        </motion.h2>

        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="relative mx-auto my-4 flex max-w-xs items-center justify-center gap-3 sm:my-5 sm:max-w-sm sm:gap-4"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/50 to-amber-300/80" />

          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rotate-45 border border-amber-300/80" />
            <Heart className="h-4 w-4 fill-amber-300/20 text-amber-300 sm:h-5 sm:w-5" />
            <span className="h-1.5 w-1.5 rotate-45 border border-amber-300/80" />
          </div>

          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-400/50 to-amber-300/80" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto max-w-xl font-khmer-body text-xs leading-8 text-stone-300 sm:text-sm sm:leading-9 md:text-base"
        >
          រក្សាទុកអនុស្សាវរីយ៍ដ៏មានតម្លៃនៃថ្ងៃស្រស់ស្អាតរបស់គូស្នេហ៍

          <span className="mt-1 block font-khmer-title text-sm leading-8 text-amber-200 sm:text-base sm:leading-9">
            ហេង គីមហ៊ <span className="mx-1 text-amber-400">&amp;</span> សន ធារ៉ា
          </span>
        </motion.p>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mx-auto mt-7 flex w-full max-w-2xl flex-wrap items-center justify-center gap-2 sm:mt-9 sm:gap-3"
        >
          {(
            [
              {
                value: 'all',
                label: 'រូបភាពទាំងអស់',
                count: WEDDING_PHOTOS.length,
              },
              {
                value: 'traditional',
                label: 'ឈុតបុរាណខ្មែរ',
              },
              {
                value: 'modern',
                label: 'ឈុតសម័យទំនើប',
              },
            ] as const
          ).map((item) => {
            const isActive = filter === item.value;

            return (
              <motion.button
                key={item.value}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleFilterChange(item.value)}
                aria-pressed={isActive}
                className={`relative inline-flex min-h-10 items-center justify-center gap-2 rounded-full border px-3.5 py-2.5 font-khmer-body text-[11px] transition-all duration-300 sm:min-h-11 sm:px-5 sm:text-xs ${
                  isActive
                    ? 'border-amber-300/60 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white shadow-lg shadow-amber-950/30'
                    : 'border-white/10 bg-[#1c3426]/80 text-stone-300 hover:border-amber-300/30 hover:bg-[#294331] hover:text-amber-100'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="gallery-active-filter"
                    className="absolute inset-0 rounded-full border border-amber-200/20"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <span className="relative">{item.label}</span>

                {'count' in item && (
                  <span
                    className={`relative flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white/[0.08] text-amber-200'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Bottom decorative detail */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative mt-7 flex items-center justify-center gap-2 sm:mt-9"
        >
          <span className="h-1 w-1 rounded-full bg-amber-400/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
          <span className="h-1 w-1 rounded-full bg-amber-400/50" />
        </motion.div>
      </motion.div>

      {/* Animated Gallery Grid */}
      <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, idx) => (
            <motion.button
              layout
              key={photo.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              aria-label={`View photo: ${photo.title}`}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.12 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{
                opacity: { duration: 0.4, delay: (idx % 4) * 0.06 },
                y: { duration: 0.5, delay: (idx % 4) * 0.06 },
                scale: { duration: 0.4 },
                layout: { duration: 0.35 },
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative min-w-0 overflow-hidden rounded-xl border border-amber-200/15 bg-[#20372e]/90 text-left shadow-sm transition-colors duration-300 hover:border-amber-200/40 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 sm:rounded-2xl"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#e9dfcc]">
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-80 transition-opacity duration-300 sm:opacity-60 sm:group-hover:opacity-100" />

                {/* Zoom Icon */}
                <div className="absolute right-2 top-2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition-opacity duration-300 sm:right-3 sm:top-3 sm:p-2 sm:opacity-0 sm:group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </div>

                {/* Image Caption */}
                <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4">
                  <p className="line-clamp-2 font-khmer-body text-[11px] font-semibold leading-relaxed text-white sm:text-sm">
                    {photo.title}
                  </p>

                  <p className="mt-1 text-[9px] text-amber-200 sm:text-xs">
                    {photo.location}
                  </p>
                </div>
              </div>

              {/* Photo Details */}
              <div className="p-2 text-left sm:p-3">
                <h3 className="line-clamp-2 font-khmer-body text-[11px] font-bold leading-relaxed text-stone-100 sm:text-sm">
                  {photo.title}
                </h3>

                <p className="mt-1 line-clamp-2 font-khmer-body text-[10px] leading-relaxed text-stone-300 sm:text-xs">
                  {photo.description}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && activePhoto && (
          <motion.div
            key="wedding-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 backdrop-blur-sm sm:p-6"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Wedding photo viewer"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close photo viewer"
              className="absolute right-3 top-3 z-[60] rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:right-5 sm:top-5"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Previous Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous photo"
              className="absolute left-1 top-1/2 z-[60] -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-4 sm:p-3"
            >
              <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next photo"
              className="absolute right-1 top-1/2 z-[60] -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-4 sm:p-3"
            >
              <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
            </button>

            {/* Active Photo */}
            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] w-full max-w-4xl flex-col items-center justify-center"
            >
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[65vh] max-w-full rounded-lg object-contain shadow-2xl sm:max-h-[72vh]"
              />

              {/* Photo Caption */}
              <div className="mt-4 max-w-2xl px-8 text-center text-white sm:px-12">
                <h3 className="font-khmer-title text-base font-bold leading-relaxed text-amber-200 sm:text-xl">
                  {activePhoto.title}
                </h3>

                <p className="mt-2 font-khmer-body text-xs leading-relaxed text-stone-300 sm:text-sm">
                  {activePhoto.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[10px] text-stone-400 sm:gap-4 sm:text-xs">
                  <span>{activePhoto.location}</span>
                  <span>·</span>
                  <span>
                    {(lightboxIndex ?? 0) + 1} / {filteredPhotos.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
