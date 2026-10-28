
import React, { useState } from 'react';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Heart,
} from 'lucide-react';

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

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<
    'all' | 'traditional' | 'modern'
  >('all');

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(
    null
  );

  const filteredPhotos =
    filter === 'all'
      ? WEDDING_PHOTOS
      : WEDDING_PHOTOS.filter(
          (photo) => photo.category === filter
        );

  const activePhoto =
    lightboxIndex !== null
      ? filteredPhotos[lightboxIndex]
      : null;

  const handleNext = () => {
    if (lightboxIndex === null || filteredPhotos.length === 0) {
      return;
    }

    setLightboxIndex(
      (lightboxIndex + 1) % filteredPhotos.length
    );
  };

  const handlePrev = () => {
    if (lightboxIndex === null || filteredPhotos.length === 0) {
      return;
    }

    setLightboxIndex(
      (lightboxIndex - 1 + filteredPhotos.length) %
        filteredPhotos.length
    );
  };

  const handleFilterChange = (
    newFilter: 'all' | 'traditional' | 'modern'
  ) => {
    setFilter(newFilter);
    setLightboxIndex(null);
  };

  return (
    <section
      id="gallery"
      className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-8"
    >
      {/* Gallery Heading */}
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-widest text-amber-200 uppercase block mb-2">
          អាល់ប៊ុមរូបថតអាពាហ៍ពិពាហ៍
        </span>

        <h2 className="text-2xl sm:text-3xl font-khmer-title text-white">
          ទំព័ររូបភាពអនុស្សាវរីយ៍
        </h2>

        <p className="text-sm text-stone-300 max-w-md mx-auto mt-2">
          រូបភាព Pre-Wedding ដ៏ស្រស់ស្អាតរបស់គូស្នេហ៍
          ហេង គីមហ៊ &amp; សន ធារ៉ា
        </p>

        {/* Filter Buttons */}
        <div className="inline-flex flex-wrap items-center justify-center gap-1 p-1 bg-[#183126]/90 rounded-xl mt-5 border border-white/10">
          <button
            type="button"
            onClick={() => handleFilterChange('all')}
            className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            ទាំងអស់ ({WEDDING_PHOTOS.length})
          </button>

          <button
            type="button"
            onClick={() => handleFilterChange('traditional')}
            className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              filter === 'traditional'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            ឈុតបុរាណខ្មែរ
          </button>

          <button
            type="button"
            onClick={() => handleFilterChange('modern')}
            className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              filter === 'modern'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            ឈុតសម័យទំនើប
          </button>
        </div>
      </div>

      {/* Gallery Grid: Always 2 Columns on Every Screen */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {filteredPhotos.map((photo, idx) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setLightboxIndex(idx)}
            aria-label={`View photo: ${photo.title}`}
            className="group relative min-w-0 overflow-hidden rounded-xl sm:rounded-2xl bg-[#20372e]/90 border border-amber-200/15 text-left shadow-sm hover:shadow-lg hover:border-amber-200/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#e9dfcc]">
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-80 sm:opacity-60 sm:group-hover:opacity-100 transition-opacity duration-300" />

              {/* Zoom Icon */}
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-black/40 backdrop-blur-sm text-white sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Image Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4">
                <p className="text-[11px] sm:text-sm font-semibold text-white line-clamp-2 font-khmer-body leading-relaxed">
                  {photo.title}
                </p>

                <p className="text-[9px] sm:text-xs text-amber-200 mt-1">
                  {photo.location}
                </p>
              </div>
            </div>

            {/* Photo Details */}
            <div className="p-2 sm:p-3 text-left">
              <h3 className="text-[11px] sm:text-sm font-bold text-stone-100 line-clamp-2 font-khmer-body leading-relaxed">
                {photo.title}
              </h3>

              <p className="text-[10px] sm:text-xs text-stone-300 line-clamp-2 mt-1">
                {photo.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
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
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-[60] p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous photo"
            className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-[60] p-2 sm:p-3 text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next photo"
            className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-[60] p-2 sm:p-3 text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          {/* Active Photo */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center"
          >
            <img
              src={activePhoto.src}
              alt={activePhoto.title}
              className="max-h-[65vh] sm:max-h-[72vh] max-w-full w-auto object-contain rounded-lg shadow-2xl"
            />

            {/* Photo Caption */}
            <div className="mt-4 text-center text-white max-w-2xl px-8 sm:px-12">
              <h3 className="text-base sm:text-xl font-bold font-khmer-title text-amber-200 leading-relaxed">
                {activePhoto.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                {activePhoto.description}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-stone-400 mt-3">
                <span>{activePhoto.location}</span>
                <span>·</span>
                <span>
                  {lightboxIndex + 1} / {filteredPhotos.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
