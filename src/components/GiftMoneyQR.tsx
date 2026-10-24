import React, { useState, useEffect } from 'react';
import { Gift, Copy, Check, Download, CreditCard, Heart, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { addGift } from '../lib/sqlite';
import abaQrImage from '../assets/images/ABA_QR.jpg';
import acledaQrImage from '../assets/images/AC_QR.jpg';

interface GiftMoneyQRProps {
  initialGuestName?: string;
}

export const GiftMoneyQR: React.FC<GiftMoneyQRProps> = ({ initialGuestName = '' }) => {
  const [activeBank, setActiveBank] = useState<'ABA' | 'ACLEDA'>('ABA');
  const [currency, setCurrency] = useState<'USD' | 'KHR'>('USD');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  // Gift submission form state
  const [senderName, setSenderName] = useState<string>(initialGuestName);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [giftNote, setGiftNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');

  useEffect(() => {
    if (initialGuestName) {
      setSenderName(initialGuestName);
    }
  }, [initialGuestName]);

  const handleQuickAmount = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount(String(amt));
  };

  const handleRecordGift = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim()) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const amtNum = customAmount ? parseFloat(customAmount) : undefined;
      await addGift({
        sender_name: senderName,
        bank: activeBank,
        amount: amtNum,
        currency: currency,
        wish_message: giftNote,
      });

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#DFB76C', '#C99635', '#E11D48', '#10B981']
      });

      setSubmitSuccess(true);
      setSenderName('');
      setCustomAmount('');
      setGiftNote('');
      setSelectedAmount(null);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error('Failed to record gift:', err);
      setSubmitError('មិនអាចរក្សាទុកព័ត៌មានបានទេ។ សូមពិនិត្យអ៊ីនធឺណិត ហើយព្យាយាមម្ដងទៀត។');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = activeBank === 'ABA' ? abaQrImage : acledaQrImage;
    link.download = `${activeBank}_KHQR_Peou_Neang.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="gift" className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase block mb-1">
          ចំណងដៃអាពាហ៍ពិពាហ៍
        </span>
        <h2 className="text-2xl sm:text-3xl font-khmer-title text-amber-950">
          បាញ់លុយចំណងដៃតាមរយៈ KHQR
        </h2>
        <p className="text-sm text-stone-600 max-w-xl mx-auto mt-2">
          លោកអ្នកអាចចូលរួមចំណងដៃតាមរយៈការស្កេន KHQR (ABA ឬ អេស៊ីលីដា) ជាមួយគ្រប់កម្មវិធីធនាគារទាំងអស់ក្នុងប្រទេសកម្ពុជា
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Authentic KHQR Bank Card */}
        <div className="lg:col-span-6 flex flex-col items-center">
          {/* Bank selector tabs */}
          <div className="flex p-1 bg-stone-200/70 rounded-xl mb-4 w-full max-w-sm">
            <button
              onClick={() => setActiveBank('ABA')}
              type="button"
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeBank === 'ABA'
                  ? 'bg-[#002744] text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              ABA BANK
            </button>
            <button
              onClick={() => setActiveBank('ACLEDA')}
              type="button"
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeBank === 'ACLEDA'
                  ? 'bg-[#0F2D59] text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              អេស៊ីលីដា ACLEDA
            </button>
          </div>

          {/* Bank QR image */}
          {activeBank === 'ABA' ? (
            <div className="w-full max-w-xs">
              <img
                src={abaQrImage}
                alt="ABA Bank KHQR for PEOU NEANG"
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
          ) : (
            <div className="w-full max-w-xs">
              <img
                src={acledaQrImage}
                alt="ACLEDA Bank KHQR for (Groom Name)"
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
          )}

          {/* Action buttons below card */}
          <div className="flex gap-2 mt-4 w-full max-w-xs">
            <button
              onClick={handleDownloadQr}
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span>រក្សាទុក QR Code</span>
            </button>
          </div>
        </div>

        {/* Right Side: Quick Amount & Gift Registry Form */}
        <div className="lg:col-span-6 bg-white/90 backdrop-blur-md rounded-3xl border border-amber-200/90 shadow-md p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-amber-700" />
            <h3 className="text-lg font-bold text-amber-950 font-khmer-title">
              កត់ត្រាចំណងដៃ & ពាក្យជូនពរ
            </h3>
          </div>

          <p className="text-xs text-stone-600 mb-5 leading-relaxed">
            បន្ទាប់ពីលោកអ្នកបានស្កេនផ្ញើចំណងដៃរួចហើយ លោកអ្នកអាចកត់ត្រាឈ្មោះ និងពាក្យជូនពរនៅទីនេះ ដើម្បីឱ្យកូនកំលោះកូនក្រមុំបានដឹង និងចងចាំនូវទឹកចិត្តដ៏ថ្លៃថ្លារបស់លោកអ្នក។
          </p>

          {/* Currency Toggle */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-700">ជ្រើសរើសរូបិយប័ណ្ណ៖</span>
            <div className="flex p-0.5 bg-stone-100 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-md transition-all ${
                  currency === 'USD' ? 'bg-amber-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('KHR')}
                className={`px-3 py-1 rounded-md transition-all ${
                  currency === 'KHR' ? 'bg-amber-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                KHR (៛)
              </button>
            </div>
          </div>

          {/* Quick Amount Selection Buttons */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {currency === 'USD' ? (
              [10, 20, 50, 100].map(amt => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleQuickAmount(amt)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    selectedAmount === amt
                      ? 'bg-amber-100 border-amber-500 text-amber-900'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  ${amt}
                </button>
              ))
            ) : (
              [20000, 40000, 100000, 200000].map(amt => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleQuickAmount(amt)}
                  className={`py-2 text-[11px] font-bold rounded-xl border transition-all ${
                    selectedAmount === amt
                      ? 'bg-amber-100 border-amber-500 text-amber-900'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {(amt / 1000)}k ៛
                </button>
              ))
            )}
          </div>

          <form onSubmit={handleRecordGift} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ឈ្មោះភ្ញៀវកិត្តិយស <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={e => setSenderName(e.target.value)}
                placeholder="ឧ. លោក សុខា និងភរិយា"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  ចំនួនទឹកប្រាក់
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={e => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder={currency === 'USD' ? 'ឧ. 50' : 'ឧ. 100000'}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-semibold text-stone-500 pointer-events-none">
                    {currency === 'USD' ? '$' : '៛'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  ផ្ញើតាមធនាគារ
                </label>
                <select
                  value={activeBank}
                  onChange={e => setActiveBank(e.target.value as 'ABA' | 'ACLEDA')}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                >
                  <option value="ABA">ABA Bank</option>
                  <option value="ACLEDA">ACLEDA Bank</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                សារជូនពរភ្ជាប់ជាមួយចំណងដៃ
              </label>
              <textarea
                rows={2}
                value={giftNote}
                onChange={e => setGiftNote(e.target.value)}
                placeholder="ឧ. សូមជូនពរកូនកំលោះកូនក្រមុំស្រឡាញ់គ្នាផ្អែមល្ហែម និងរកស៊ីមានបាន..."
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            {submitError && (
              <p role="alert" className="text-xs text-rose-600">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !senderName.trim()}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 text-white rounded-xl text-sm font-semibold shadow-md transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'កំពុងរក្សាទុក...' : 'បញ្ជាក់ការផ្ញើចំណងដៃ'}</span>
            </button>

            {submitSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800 animate-fade-in">
                សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះចំណងដៃ និងពរជ័យដ៏ថ្លៃថ្លារបស់លោកអ្នក!
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
