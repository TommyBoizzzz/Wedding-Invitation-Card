import React, { useState } from 'react';
import { MapPin, Navigation, Phone, QrCode, Download, Copy, Check, ExternalLink } from 'lucide-react';
import { WEDDING_LOCATION } from '../lib/qrHelper';
import mapQrImage from '../assets/images/qr_map.png';

export const LocationMap: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(WEDDING_LOCATION.fullKhmer).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleCopyPhone = (num: string) => {
    navigator.clipboard.writeText(num.replace(/\s+/g, '')).then(() => {
      setCopiedPhone(num);
      setTimeout(() => setCopiedPhone(null), 2500);
    });
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = mapQrImage;
    link.download = 'wedding_location_qr_peou_samnang.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="location" className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase block mb-1">
          ទីតាំងកម្មវិធី & ផែនទី
        </span>
        <h2 className="text-2xl sm:text-3xl font-khmer-title text-amber-950">
          ស្កេន QR និងព័ត៌មានទីតាំង
        </h2>
        <p className="text-sm text-stone-600 max-w-xl mx-auto mt-2">
          សូមស្កេន QR Code ឬចុចលើផែនទីដើម្បីកំណត់ទិសដៅមកកាន់គេហដ្ឋានរៀបចំពិធី
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white/90 backdrop-blur-md rounded-3xl border border-amber-200/90 shadow-md p-6 sm:p-8">
        {/* Left column: QR Code for Location Map */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-amber-50/40 rounded-2xl border border-amber-100 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-2">
            <QrCode className="w-4 h-4 text-amber-700" />
            <span>ស្កេនទីតាំងកម្មវិធី (Location QR)</span>
          </div>

          <div className="p-3 bg-white rounded-2xl border-2 border-amber-300 shadow-sm relative group">
            <img
              src={mapQrImage}
              alt="ស្កេនទីតាំងពិធីមង្គលការ"
              className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
            />
            <div className="absolute inset-0 bg-amber-950/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-white/95 text-stone-800 text-xs px-2.5 py-1 rounded-md shadow-sm font-medium">
                ស្កេនជាមួយកាមេរ៉ាទូរស័ព្ទ
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-500 mt-2">
            ស្កេនដោយផ្ទាល់ ឬចុចទាញយកដើម្បីរក្សាទុក
          </p>

          <div className="flex gap-2 mt-3 w-full">
            <button
              onClick={handleDownloadQr}
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-stone-50 border border-amber-200 text-stone-700 rounded-lg text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span>ទាញយក QR</span>
            </button>
            <a
              href={WEDDING_LOCATION.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>នាំផ្លូវទៅកាន់ទីនោះ</span>
            </a>
          </div>
        </div>

        {/* Right column: Venue Details & Host Contact Numbers */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-amber-950 font-khmer-title">
                  {WEDDING_LOCATION.name}
                </h4>
                <p className="text-sm font-medium text-stone-700 mt-0.5 leading-relaxed">
                  {WEDDING_LOCATION.fullKhmer}
                </p>
                <p className="text-xs text-stone-500 font-cinzel mt-1">
                  {WEDDING_LOCATION.fullEnglish}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleCopyAddress}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-lg text-xs font-medium transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'បានចម្លងអាសយដ្ឋានរួច!' : 'ចម្លងអាសយដ្ឋាន'}</span>
              </button>

              <a
                href={WEDDING_LOCATION.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>បើកក្នុង Google Maps</span>
              </a>
            </div>
          </div>

          {/* Host Contact Phone Numbers */}
          <div className="bg-[#FAF7F0] border border-amber-200/80 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-2">
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span>ទូរស័ព្ទម្ចាស់កម្មវិធី (ទំនាក់ទំនងសាកសួរព័ត៌មាន)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {WEDDING_LOCATION.hostsPhones.map((phone, idx) => (
                <div
                  key={idx}
                  className="bg-white p-2.5 rounded-xl border border-stone-200/80 flex flex-col justify-between"
                >
                  <span className="text-[10px] text-stone-500 font-medium">
                    {phone.label}
                  </span>
                  <a
                    href={`tel:${phone.tel}`}
                    className="text-sm font-bold text-amber-950 font-cinzel hover:text-amber-700 transition-colors my-1"
                  >
                    {phone.number}
                  </a>
                  <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                    <a
                      href={`tel:${phone.tel}`}
                      className="text-[11px] font-semibold text-emerald-700 hover:underline inline-flex items-center gap-0.5"
                    >
                      <Phone className="w-2.5 h-2.5" />
                      <span>ហៅទូរស័ព្ទ</span>
                    </a>
                    <button
                      onClick={() => handleCopyPhone(phone.number)}
                      type="button"
                      className="text-[10px] text-stone-500 hover:text-stone-800"
                    >
                      {copiedPhone === phone.number ? 'បានចម្លង!' : 'ចម្លង'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Landmark guide note */}
          <div className="text-xs text-stone-500 bg-white/70 p-3 rounded-xl border border-stone-100 leading-relaxed">
            <strong className="text-stone-700 font-semibold">ចំណាំការធ្វើដំណើរ៖</strong> ពិធីប្រព្រឹត្តទៅនៅគេហដ្ឋានខាងស្រី ភូមិបេង ឃុំជីក្រែង ស្រុកជីក្រែង ខេត្តសៀមរាប។ ប្រសិនបើលោកអ្នកពិបាកស្វែងរកទីតាំង សូមទូរស័ព្ទមកកាន់លេខខាងលើ ដើម្បីក្រុមការងាររង់ចាំទទួលស្វាគមន៍។
          </div>
        </div>
      </div>
    </section>
  );
};
