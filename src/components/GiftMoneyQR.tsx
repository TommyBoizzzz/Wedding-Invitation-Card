
import React, { useState, useEffect } from 'react';
import {
  Gift,
  Download,
  Heart,
  Send,
  QrCode,
  Check,
  Sparkles,
  MapPin,
  Wallet,
  Phone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { addGift } from '../lib/sqlite';
import abaQrImage from '../assets/images/ABA_QR.jpg';
import acledaQrImage from '../assets/images/AC_QR.jpg';

interface GiftMoneyQRProps {
  initialGuestName?: string;
}

const QUICK_AMOUNTS: Record<'USD' | 'KHR', number[]> = {
  USD: [30, 50, 100, 200],
  KHR: [80000, 100000, 200000, 400000],
};

export const GiftMoneyQR: React.FC<GiftMoneyQRProps> = ({
  initialGuestName = '',
}) => {
  const [activeBank, setActiveBank] = useState<'ABA' | 'ACLEDA'>('ABA');
  const [currency, setCurrency] = useState<'USD' | 'KHR'>('USD');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const [senderName, setSenderName] = useState(initialGuestName);
  const [customAmount, setCustomAmount] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const qrImage = activeBank === 'ABA' ? abaQrImage : acledaQrImage;

  useEffect(() => {
    if (initialGuestName) {
      setSenderName(initialGuestName);
    }
  }, [initialGuestName]);

  const handleBankChange = (bank: 'ABA' | 'ACLEDA') => {
    setActiveBank(bank);
  };

  const handleCurrencyChange = (nextCurrency: 'USD' | 'KHR') => {
    setCurrency(nextCurrency);
    setSelectedAmount(null);
    setCustomAmount('');
  };

  const handleQuickAmount = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(String(amount));
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = `${activeBank}_KHQR_Wedding.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRecordGift = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!senderName.trim()) return;

    const parsedAmount =
      customAmount.trim() === '' ? undefined : Number(customAmount);

    if (
      parsedAmount !== undefined &&
      (!Number.isFinite(parsedAmount) || parsedAmount <= 0)
    ) {
      setSubmitError('សូមបញ្ចូលចំនួនទឹកប្រាក់ឱ្យបានត្រឹមត្រូវ។');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await addGift({
        sender_name: senderName.trim(),
        bank: activeBank,
        amount: parsedAmount,
        currency,
        wish_message: giftNote.trim(),
      });

      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#DFB76C', '#C99635', '#E11D48', '#10B981'],
      });

      setSubmitSuccess(true);
      setSenderName(initialGuestName);
      setCustomAmount('');
      setGiftNote('');
      setSelectedAmount(null);

      window.setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to record gift:', error);
      setSubmitError(
        'មិនអាចរក្សាទុកព័ត៌មានបានទេ។ សូមពិនិត្យអ៊ីនធឺណិត ហើយព្យាយាមម្ដងទៀត។'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full min-w-0 rounded-xl border border-amber-100/15 bg-[#13291f] px-4 py-3 text-sm text-white placeholder:text-stone-400 transition-all focus:border-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/20';

  const labelClass =
    'mb-2 block text-xs font-semibold leading-relaxed text-amber-50/90 sm:text-sm';

  return (
    <section
      id="gift"
      className="relative mx-auto w-full max-w-6xl overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-20 right-0 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
        className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-[#20392b]/80 px-4 py-2 text-amber-200 shadow-lg shadow-black/10">
          <Sparkles className="h-4 w-4" />
          <span className="text-[11px] font-semibold tracking-[0.15em] sm:text-xs">
            WEDDING GIFT
          </span>
          <Heart className="h-4 w-4 fill-amber-200/20" />
        </div>

        <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-amber-300 sm:text-sm">
          ចំណងដៃអាពាហ៍ពិពាហ៍
        </p>

        <h2 className="font-khmer-title text-2xl leading-relaxed text-white sm:text-3xl md:text-4xl">
          ចំណងដៃតាមរយៈ KHQR
        </h2>

        <div className="mx-auto my-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-300/70 sm:w-16" />
          <Heart className="h-4 w-4 text-amber-300" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-300/70 sm:w-16" />
        </div>

        <p className="mx-auto max-w-2xl text-center text-sm leading-8 text-stone-300 sm:text-base">
          លោកអ្នកអាចចូលរួមចំណងដៃតាមរយៈការស្កេន KHQR របស់ធនាគារ ABA
          ឬ អេស៊ីលីដា ដោយប្រើកម្មវិធីធនាគារដែលគាំទ្រ KHQR។
        </p>
      </motion.div>

      {/* Main content */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
        {/* QR code card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-[28px] border border-amber-200/20 bg-gradient-to-br from-[#294333]/95 via-[#1e3629]/95 to-[#14291f]/95 p-5 shadow-2xl shadow-black/20 sm:p-7"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border border-amber-200/10" />
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border border-amber-200/10" />

          <div className="relative mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-200/10">
              <QrCode className="h-6 w-6 text-amber-300" />
            </div>

            <div className="min-w-0">
              <h3 className="font-khmer-title text-lg text-white sm:text-xl">
                ស្កេន QR ដើម្បីផ្ញើចំណងដៃ
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-stone-400">
                ជ្រើសរើសធនាគារដែលអ្នកចង់ប្រើ
              </p>
            </div>
          </div>

          {/* Bank selector */}
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-black/15 p-1.5">
            <button
              type="button"
              onClick={() => handleBankChange('ABA')}
              aria-pressed={activeBank === 'ABA'}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-2 py-3 text-xs font-bold transition-all duration-300 sm:text-sm ${
                activeBank === 'ABA'
                  ? 'bg-[#003653] text-white shadow-lg ring-1 ring-sky-300/30'
                  : 'text-stone-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-[10px] font-black">
                A
              </span>
              ABA BANK
            </button>

            <button
              type="button"
              onClick={() => handleBankChange('ACLEDA')}
              aria-pressed={activeBank === 'ACLEDA'}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-2 py-3 text-xs font-bold transition-all duration-300 sm:text-sm ${
                activeBank === 'ACLEDA'
                  ? 'bg-[#17457d] text-white shadow-lg ring-1 ring-blue-300/30'
                  : 'text-stone-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-[10px] font-black">
                A
              </span>
              ACLEDA
            </button>
          </div>

          {/* QR image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBank}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="mx-auto w-full max-w-[300px]"
            >
              <div className="rounded-[26px] border border-amber-200/60 bg-gradient-to-br from-amber-100 via-white to-amber-50 p-2 shadow-[0_18px_55px_rgba(0,0,0,0.3)] sm:p-3">
                <div className="overflow-hidden rounded-[19px] bg-white p-1.5 sm:p-2">
                  <img
                    src={qrImage}
                    alt={`${activeBank} bank wedding gift KHQR`}
                    className="block h-auto w-full rounded-xl object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-2 text-center text-xs leading-relaxed text-stone-300">
            <Check className="h-4 w-4 shrink-0 text-emerald-300" />
            <span>សូមពិនិត្យឈ្មោះគណនីមុនពេលបញ្ជាក់ការផ្ទេរប្រាក់</span>
          </div>

          <button
            onClick={handleDownloadQr}
            type="button"
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-amber-200/30 bg-amber-100/5 px-4 py-3 text-sm font-semibold text-amber-100 transition-all duration-300 hover:border-amber-200/60 hover:bg-amber-100/10 active:scale-[0.99]"
          >
            <Download className="h-4 w-4 text-amber-300" />
            រក្សាទុក QR Code
          </button>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">
            <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
            <p className="text-xs leading-6 text-stone-300">
              បន្ទាប់ពីផ្ទេរចំណងដៃរួច លោកអ្នកអាចបំពេញឈ្មោះ ចំនួនទឹកប្រាក់
              និងពាក្យជូនពរនៅក្នុងទម្រង់ខាងស្តាំ។
            </p>
          </div>
        </motion.div>

        {/* Gift form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative overflow-hidden rounded-[28px] border border-amber-200/20 bg-gradient-to-br from-[#263f30]/95 via-[#1d3528]/95 to-[#14291f]/95 p-5 shadow-2xl shadow-black/20 sm:p-7"
        >
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-amber-500/5 blur-3xl" />

          <div className="relative">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-200/10">
                <Gift className="h-6 w-6 text-amber-300" />
              </div>

              <div className="min-w-0">
                <h3 className="font-khmer-title text-lg leading-relaxed text-white sm:text-xl">
                  កត់ត្រាចំណងដៃ
                </h3>
                <p className="mt-1 text-xs text-stone-400">
                  Gift registration & wishes
                </p>
              </div>
            </div>

            <p className="mb-6 text-center text-sm leading-8 text-stone-300 sm:text-left">
              សូមអរគុណចំពោះទឹកចិត្តដ៏ថ្លៃថ្លារបស់លោកអ្នក។
              សូមកត់ត្រាព័ត៌មានខាងក្រោម ដើម្បីឱ្យកូនកំលោះកូនក្រមុំបានចងចាំ។
            </p>

            <form onSubmit={handleRecordGift} className="space-y-5">
              {/* Currency */}
              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <label className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-amber-300" />
                      រូបិយប័ណ្ណ
                    </span>
                  </label>

                  <span className="text-[11px] text-stone-400">
                    Select currency
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-black/15 p-1">
                  <button
                    type="button"
                    onClick={() => handleCurrencyChange('USD')}
                    aria-pressed={currency === 'USD'}
                    className={`min-h-11 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                      currency === 'USD'
                        ? 'bg-amber-200 text-[#26372a] shadow-md'
                        : 'text-stone-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    USD ($)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCurrencyChange('KHR')}
                    aria-pressed={currency === 'KHR'}
                    className={`min-h-11 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                      currency === 'KHR'
                        ? 'bg-amber-200 text-[#26372a] shadow-md'
                        : 'text-stone-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    KHR (៛)
                  </button>
                </div>
              </div>

              {/* Quick amounts */}
              <div>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <label className={labelClass}>
                    ជ្រើសរើសចំនួនទឹកប្រាក់
                  </label>
                  <span className="text-[11px] text-stone-400">
                    Quick amount
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {QUICK_AMOUNTS[currency].map((amount) => {
                    const isSelected = selectedAmount === amount;

                    return (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleQuickAmount(amount)}
                        aria-pressed={isSelected}
                        className={`min-h-12 rounded-xl border px-2 py-3 text-sm font-bold transition-all duration-200 active:scale-95 ${
                          isSelected
                            ? 'border-amber-300 bg-amber-200 text-[#25372a] shadow-lg shadow-amber-950/20'
                            : 'border-white/10 bg-[#142a20]/80 text-stone-200 hover:border-amber-200/40 hover:bg-[#294333]'
                        }`}
                      >
                        {currency === 'USD'
                          ? `$${amount}`
                          : `${(amount / 1000).toLocaleString()}k ៛`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guest name */}
              <div>
                <label htmlFor="gift-sender-name" className={labelClass}>
                  ឈ្មោះភ្ញៀវកិត្តិយស
                  <span className="ml-1 text-rose-300">*</span>
                </label>

                <input
                  id="gift-sender-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="ឧ. លោក ហេង គីមហត និងភរិយា"
                  className={inputClass}
                />
              </div>

              {/* Amount and bank */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="gift-amount" className={labelClass}>
                    ចំនួនទឹកប្រាក់
                  </label>

                  <div className="relative">
                    <input
                      id="gift-amount"
                      type="number"
                      min="0.01"
                      step="any"
                      inputMode="decimal"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      placeholder={currency === 'USD' ? 'ឧ. 50' : 'ឧ. 100000'}
                      className={`${inputClass} pr-12`}
                    />

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-amber-300">
                      {currency === 'USD' ? '$' : '៛'}
                    </span>
                  </div>
                </div>

                <div className="min-w-0">
                  <label htmlFor="gift-bank" className={labelClass}>
                    ផ្ញើតាមធនាគារ
                  </label>

                  <select
                    id="gift-bank"
                    value={activeBank}
                    onChange={(e) =>
                      setActiveBank(e.target.value as 'ABA' | 'ACLEDA')
                    }
                    className={inputClass}
                  >
                    <option value="ABA" className="bg-[#173027]">
                      ABA Bank
                    </option>
                    <option value="ACLEDA" className="bg-[#173027]">
                      ACLEDA Bank
                    </option>
                  </select>
                </div>
              </div>

              {/* Wish message */}
              <div>
                <label htmlFor="gift-wish" className={labelClass}>
                  ពាក្យជូនពរ
                  <span className="ml-2 font-normal text-stone-400">
                    (មិនចាំបាច់)
                  </span>
                </label>

                <textarea
                  id="gift-wish"
                  rows={3}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="សូមជូនពរកូនកំលោះកូនក្រមុំស្រឡាញ់គ្នាផ្អែមល្ហែម និងរកស៊ីមានបាន..."
                  className={`${inputClass} resize-y leading-7`}
                />
              </div>

              {/* Privacy / reminder */}
              <div className="flex items-start gap-2 rounded-xl border border-amber-200/10 bg-amber-100/[0.04] p-3">
                <Heart className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <p className="text-xs leading-6 text-stone-300">
                  ព័ត៌មានដែលអ្នកបញ្ចូលនឹងត្រូវបានប្រើសម្រាប់កត់ត្រាចំណងដៃ
                  និងពាក្យជូនពររបស់អ្នក។
                </p>
              </div>

              {/* Error */}
              <AnimatePresence>
                {submitError && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    role="alert"
                    className="rounded-xl border border-rose-300/20 bg-rose-400/10 p-3 text-sm leading-6 text-rose-200"
                  >
                    {submitError}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !senderName.trim()}
                className="group inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b88635] via-[#d9ad5d] to-[#b88635] px-5 py-3.5 text-sm font-bold text-[#1d2e21] shadow-lg shadow-amber-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-950/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1d2e21]/30 border-t-[#1d2e21]" />
                    កំពុងរក្សាទុក...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    បញ្ជាក់ការកត់ត្រាចំណងដៃ
                  </>
                )}
              </button>

              {/* Success */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5 }}
                    role="status"
                    aria-live="polite"
                    className="rounded-2xl border border-emerald-300/25 bg-emerald-400/10 p-4 text-center"
                  >
                    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-300/15">
                      <Check className="h-5 w-5 text-emerald-300" />
                    </div>
                    <p className="font-khmer-title text-sm leading-7 text-emerald-100">
                      សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះចំណងដៃ និងពរជ័យដ៏ថ្លៃថ្លារបស់លោកអ្នក!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 px-2 text-center sm:mt-10"
      >
        <Heart className="mt-1 h-4 w-4 shrink-0 text-amber-300/80" />
        <p className="text-xs leading-7 text-stone-400 sm:text-sm">
          វត្តមាន និងទឹកចិត្តរបស់លោកអ្នក គឺជាកាដូដ៏មានតម្លៃបំផុតសម្រាប់យើងខ្ញុំ។
          សូមអរគុណដែលបានចូលរួមចែករំលែកសុភមង្គលក្នុងថ្ងៃពិសេសនេះ។
        </p>
      </motion.div>
    </section>
  );
};
