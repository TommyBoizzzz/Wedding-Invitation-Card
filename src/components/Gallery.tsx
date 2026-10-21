import React, { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, X, ZoomIn, Download, Heart } from 'lucide-react';
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
    description: 'កូនកំលោះ នាង ពៅ និង កូនក្រមុំ ហូ សំណាង ក្នុងសម្លៀកបំពាក់ប្រពៃណីពណ៌មាសដ៏ប្រណិត នៅមុខប្រាសាទអង្គរវត្ត',
    location: 'ប្រាសាទអង្គរវត្ត, ខេត្តសៀមរាប'
  },
  {
    id: 'photo-2',
    src: image02,
    title: 'ស្នាមញញឹមនៃសេចក្ដីសុខ និងមកុដមាស',
    category: 'traditional',
    description: 'រូបថតជិតនៃគូស្នេហ៍ដ៏ផ្អែមល្ហែម គ្រងមកុដមង្គលការ និងគ្រឿងអលង្ការមាសក្បាច់បុរាណ',
    location: 'ប្រាសាទអង្គរវត្ត, ខេត្តសៀមរាប'
  },
  {
    id: 'photo-3',
    src: image04,
    title: 'ក្រោមម្លប់ឆត្រមាស តាមផ្លូវស្ពានបុរាណ',
    category: 'traditional',
    description: 'កូនកំលោះបាំងឆត្រមាសការពារកូនក្រមុំ ដើរកាត់ស្ពានហាលបុរាណថ្មភក់ ពោរពេញដោយភាពកក់ក្តៅ',
    location: 'ស្ពានហាលអង្គរ, ខេត្តសៀមរាប'
  },
  {
    id: 'photo-4',
    src: image07,
    title: 'ស្នេហាបែបសម័យទំនើបដ៏ស្រស់បំព្រង',
    category: 'modern',
    description: 'កូនកំលោះក្នុងឈុតអាវធំពណ៌ខៀវ និងកូនក្រមុំក្នុងរ៉ូបសរំលេចផ្កាកុលាប និងផ្កាលីលីដ៏ស្រស់ស្អាត',
    location: 'សួនធម្មជាតិអង្គរ, ខេត្តសៀមរាប'
  },
  {
    id: 'photo-5',
    src: image05,
    title: 'ក្ដីស្នេហ៍អមតៈ កណ្តាលធម្មជាតិបៃតង',
    category: 'modern',
    description: 'ឈរផ្អែកខ្នងគ្នាទៅវិញទៅមក ឆ្លុះបញ្ចាំងពីការជឿជាក់ និងការគាំទ្រគ្នាក្នុងជីវិតអាពាហ៍ពិពាហ៍',
    location: 'សៀមរាប អង្គរ'
  },
  {
    id: 'photo-6',
    src: image06,
    title: 'ទេសភាពស្ពានហាលអង្គរវត្ត ពេលព្រឹកព្រលឹម',
    category: 'traditional',
    description: 'ទិដ្ឋភាពដ៏អស្ចារ្យនៃប្រាសាទអង្គរវត្ត និងការតុបតែងលម្អផ្កាឈូកសម្រាប់ពិធីសិរីមង្គល',
    location: 'មហាប្រាសាទអង្គរវត្ត'
  },
  {
    id: 'photo-7',
    src: image03,
    title: 'ទេសភាពស្ពានហាលអង្គរវត្ត ពេលព្រឹកព្រលឹម',
    category: 'traditional',
    description: 'ទិដ្ឋភាពដ៏អស្ចារ្យនៃប្រាសាទអង្គរវត្ត និងការតុបតែងលម្អផ្កាឈូកសម្រាប់ពិធីសិរីមង្គល',
    location: 'មហាប្រាសាទអង្គរវត្ត'
  },
  {
    id: 'photo-8',
    src: image08,
    title: 'ទេសភាពស្ពានហាលអង្គរវត្ត ពេលព្រឹកព្រលឹម',
    category: 'traditional',
    description: 'ទិដ្ឋភាពដ៏អស្ចារ្យនៃប្រាសាទអង្គរវត្ត និងការតុបតែងលម្អផ្កាឈូកសម្រាប់ពិធីសិរីមង្គល',
    location: 'មហាប្រាសាទអង្គរវត្ត'
  }
];

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'traditional' | 'modern'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = filter === 'all'
    ? WEDDING_PHOTOS
    : WEDDING_PHOTOS.filter(p => p.category === filter);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <section id="gallery" className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase block mb-1">
          អាល់ប៊ុមរូបថតអាពាហ៍ពិពាហ៍
        </span>
        <h2 className="text-2xl sm:text-3xl font-khmer-title text-amber-950">
          ទំព័ររូបភាពអនុស្សាវរីយ៍
        </h2>
        <p className="text-sm text-stone-600 max-w-md mx-auto mt-2">
          រូបភាព Pre-Wedding ដ៏ស្រស់ស្អាតរបស់គូស្នេហ៍ នាង ពៅ & ហូ សំណាង
        </p>

        {/* Filter Buttons */}
        <div className="inline-flex items-center gap-1 p-1 bg-stone-100 rounded-xl mt-5 border border-stone-200">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'all' ? 'bg-amber-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            ទាំងអស់ ({WEDDING_PHOTOS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('traditional')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'traditional' ? 'bg-amber-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            ឈុតបុរាណខ្មែរ
          </button>
          <button
            type="button"
            onClick={() => setFilter('modern')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'modern' ? 'bg-amber-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            ឈុតសម័យទំនើប
          </button>
        </div>
      </div>

      {/* Gallery Grid - Responsive Masonry/Grid for mobile and desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredPhotos.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => setLightboxIndex(idx)}
            className="group relative bg-white rounded-2xl overflow-hidden border border-amber-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <div className="aspect-[3/4] w-full overflow-hidden bg-stone-100 relative">
              <img
                src={photo.src}
                alt={photo.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback container
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('bg-gradient-to-br', 'from-amber-100', 'to-amber-50', 'flex', 'items-center', 'justify-center', 'p-4', 'text-center');
                    parent.innerHTML = `<div class="text-xs text-amber-900 font-medium">${photo.title}</div>`;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="text-white text-left">
                  <p className="text-xs font-semibold line-clamp-1">{photo.title}</p>
                  <span className="text-[10px] text-amber-200">{photo.location}</span>
                </div>
              </div>
              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="p-3 text-left">
              <h4 className="text-xs font-bold text-stone-800 line-clamp-1 font-khmer-body">
                {photo.title}
              </h4>
              <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                {photo.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            type="button"
            className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2.5 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2.5 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full max-h-[90vh] flex flex-col items-center"
          >
            <img
              src={activePhoto.src}
              alt={activePhoto.title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center text-white max-w-xl px-4">
              <h3 className="text-base sm:text-lg font-bold font-khmer-title text-amber-200">
                {activePhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                {activePhoto.description}
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-stone-400 mt-2">
                <span>{activePhoto.location}</span>
                <span>·</span>
                <span>{lightboxIndex + 1} / {filteredPhotos.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
