import React, { useState, useEffect } from 'react';
import { X, Link2, Copy, Check, Send, QrCode, Download, ExternalLink, Share2, MessageCircle } from 'lucide-react';
import { generateQrDataUrl } from '../lib/qrHelper';

interface InviteLinkGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
}

const HONORIFICS = [
  { label: 'គ្មាន (None)', value: '' },
  { label: 'ឯកឧត្តម', value: 'ឯកឧត្តម ' },
  { label: 'លោកជំទាវ', value: 'លោកជំទាវ ' },
  { label: 'លោកឧកញ៉ា', value: 'លោកឧកញ៉ា ' },
  { label: 'លោក', value: 'លោក ' },
  { label: 'លោកស្រី', value: 'លោកស្រី ' },
  { label: 'កញ្ញា', value: 'កញ្ញា ' },
  { label: 'បង', value: 'បង ' },
  { label: 'ប្អូន', value: 'ប្អូន' },
  { label: 'សម្លាញ់', value: 'សម្លាញ់ ' },
  { label: 'មិត្ត', value: 'មិត្ត ' },
];

export const InviteLinkGeneratorModal: React.FC<InviteLinkGeneratorModalProps> = ({
  isOpen,
  onClose,
  initialName = ''
}) => {
  const [honorific, setHonorific] = useState<string>('');
  const [guestName, setGuestName] = useState<string>(initialName || 'test');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);
  const [messengerNotice, setMessengerNotice] = useState<string>('');
  const [qrSrc, setQrSrc] = useState<string>('');

  const fullName = `${honorific}${guestName}`.trim();

  // Construct URL prioritizing the public shared App URL
  const baseUrl = (import.meta.env.VITE_APP_URL as string) || (typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}${window.location.pathname}`
    : '');

  const inviteUrl = fullName
    ? `${baseUrl}?to=${encodeURIComponent(fullName)}`
    : baseUrl;

  const inviteCaption = `សូមគោរពអញ្ជើញ ${fullName || 'ភ្ញៀវកិត្តិយស'} ចូលរួមពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍ ហេង គីមហ៊ &​ សន ធារ៉ា (២៣ មករា ២០២៦)`;
  const shareMessage = `${inviteCaption}\n${inviteUrl}`;

  useEffect(() => {
    if (inviteUrl) {
      generateQrDataUrl(inviteUrl, { width: 350 }).then(url => setQrSrc(url));
    }
  }, [inviteUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(shareMessage).then(() => {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    });
  };

  const handleShareTelegram = () => {
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteUrl)}&text=${encodeURIComponent(inviteCaption)}`;
    window.open(tgUrl, '_blank');
  };

  const handleShareMessenger = async () => {
    setMessengerNotice('');
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'លិខិតអញ្ជើញពិធីមង្គលការ',
          text: inviteCaption,
          url: inviteUrl,
        });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        console.error('Failed to share invitation:', error);
      }
    }

    const messengerWindow = window.open('https://www.messenger.com/', '_blank');
    try {
      await navigator.clipboard.writeText(shareMessage);
      setMessengerNotice('បានចម្លងសារអញ្ជើញហើយ។ សូមបិទភ្ជាប់សារនៅក្នុង Messenger។');
      setTimeout(() => setMessengerNotice(''), 5000);
    } catch (error) {
      messengerWindow?.close();
      console.error('Failed to copy invitation for Messenger:', error);
      setMessengerNotice('មិនអាចចម្លងសារអញ្ជើញបានទេ។ សូមចម្លងសារដោយដៃ។');
    }
  };

  const handleDownloadQr = () => {
    if (!qrSrc) return;
    const link = document.createElement('a');
    link.href = qrSrc;
    link.download = `wedding_invite_qr_${fullName || 'guest'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-amber-50/60">
          <div className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-amber-700" />
            <h3 className="text-base sm:text-lg font-bold text-amber-950 font-khmer-title">
              បង្កើតតំណភ្ជាប់អញ្ជើញភ្ញៀវផ្ទាល់ខ្លួន
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <p className="text-xs text-stone-600 leading-relaxed">
            លោកអ្នកគ្រាន់តែបញ្ចូលឈ្មោះភ្ញៀវ (ឧ. <strong>test</strong> ឬ <strong>បង សុខា</strong>) ប្រព័ន្ធនឹងបង្កើតតំណភ្ជាប់ (Link) ផ្ទាល់ខ្លួនភ្លាមៗ។ នៅពេលភ្ញៀវបើក Link នោះ គេហទំព័រនឹងបង្ហាញលិខិតអញ្ជើញដែលមានឈ្មោះគាត់ផ្ទាល់ និងបំពេញឈ្មោះគាត់ក្នុងទម្រង់ចុះឈ្មោះ ដោយស្វ័យប្រវត្តិ!
          </p>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                គោរមងារ / ស័ក្តិ
              </label>
              <select
                value={honorific}
                onChange={e => setHonorific(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {HONORIFICS.map((h, i) => (
                  <option key={i} value={h.value}>{h.label}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ឈ្មោះភ្ញៀវកិត្តិយស <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                placeholder="ឧ. លោក ហេង គីមហត និងភរិយា"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-stone-900"
              />
            </div>
          </div>

          {/* Generated Link Preview */}
          <div className="space-y-2 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
              តំណភ្ជាប់ផ្ទាល់ខ្លួនសម្រាប់ «{fullName || 'ភ្ញៀវ'}»
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={inviteUrl}
                className="flex-1 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-mono text-stone-800 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                type="button"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors whitespace-nowrap cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'បានចម្លង!' : 'ចម្លង Link'}</span>
              </button>
            </div>
          </div>

          {/* Quick Sharing Options */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-stone-700 block">
              ចែករំលែកទៅកាន់ភ្ញៀវដោយផ្ទាល់៖
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={handleShareTelegram}
                type="button"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#229ED9] hover:bg-[#1E88E5] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ផ្ញើតាម Telegram</span>
              </button>

              <button
                onClick={() => void handleShareMessenger()}
                type="button"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0866FF] hover:bg-[#0757D5] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>ផ្ញើតាម Messenger</span>
              </button>

              <button
                onClick={handleCopyMessage}
                type="button"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors"
              >
                {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedMessage ? 'បានចម្លងសារ!' : 'ចម្លងសារអញ្ជើញ'}</span>
              </button>

              <a
                href={inviteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 rounded-xl text-xs font-semibold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>បើកមើលតេស្ត</span>
              </a>
            </div>
            {messengerNotice && (
              <p role="status" className="text-[11px] text-stone-600">
                {messengerNotice}
              </p>
            )}
          </div>

          {/* QR Code for Guest */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-amber-50/40 rounded-2xl border border-amber-200/80">
            <div className="p-2 bg-white rounded-xl border border-stone-200 shadow-xs shrink-0">
              {qrSrc ? (
                <img src={qrSrc} alt="Guest QR" className="w-24 h-24 object-contain" />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center text-[10px] text-stone-400">
                  QR
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <h4 className="text-xs font-bold text-amber-950 font-khmer-title">
                QR Code ផ្ទាល់ខ្លួនសម្រាប់ភ្ញៀវ៖ {fullName || 'ភ្ញៀវ'}
              </h4>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                លោកអ្នកអាចទាញយក QR Code នេះដើម្បីបោះពុម្ពបិទលើធៀបការ ឬផ្ញើរូបភាព QR ឱ្យភ្ញៀវស្កេនចូលមើលបានភ្លាមៗ!
              </p>
              <button
                onClick={handleDownloadQr}
                type="button"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-stone-50 border border-amber-300 text-amber-900 rounded-lg text-xs font-medium shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-amber-700" />
                <span>ទាញយក QR Code នេះ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
