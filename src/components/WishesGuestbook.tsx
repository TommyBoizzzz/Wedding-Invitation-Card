
import React, { useState, useEffect } from 'react';
import {
  MessageSquareHeart,
  Heart,
  Send,
  Sparkles,
  MessageCircle,
  User,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  getWishes,
  addWish,
  incrementWishHearts,
  WishRecord,
} from '../lib/sqlite';

const QUICK_BLESSINGS = [
  'សុភមង្គលជារៀងរហូត!',
  'ស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង!',
  'រកស៊ីមានបាន ត្រជាក់ត្រជុំ!',
  'ឆាប់បានកូនប្រុសស្រីពេញផ្ទះ!',
  'អាយុ វណ្ណៈ សុខៈ ពលៈ កុំបីឃ្លៀងឃ្លាតឡើយ!',
];

const RELATIONSHIPS = [
  'មិត្តភក្តិ',
  'សាច់ញាតិ',
  'មិត្តរួមការងារ',
  'បងប្អូន',
  'ភ្ញៀវកិត្តិយស',
];

interface WishesGuestbookProps {
  initialGuestName?: string;
}

export const WishesGuestbook: React.FC<WishesGuestbookProps> = ({
  initialGuestName = '',
}) => {
  const [wishes, setWishes] = useState<WishRecord[]>([]);
  const [senderName, setSenderName] = useState(initialGuestName);
  const [relationship, setRelationship] = useState('មិត្តភក្តិ');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [heartError, setHeartError] = useState('');
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (initialGuestName) {
      setSenderName(initialGuestName);
    }
  }, [initialGuestName]);

  const loadAllWishes = async () => {
    try {
      const records = await getWishes();
      setWishes(records);
      setLoadError('');
    } catch (err) {
      console.error('Failed to load wishes from SQLite:', err);
      setLoadError(
        'មិនអាចផ្ទុកសារជូនពរបានទេ។ សូមសាកល្បងផ្ទុកទំព័រឡើងវិញ។'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadAllWishes();
  }, []);

  const handleQuickAdd = (text: string) => {
    setMessage((prev) => (prev ? `${prev} ${text}` : text));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!senderName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await addWish({
        sender_name: senderName,
        relationship,
        message,
      });

      confetti({
        particleCount: 60,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#DFB76C', '#C99635', '#F43F5E', '#FB7185'],
      });

      setSenderName('');
      setMessage('');

      await loadAllWishes();
    } catch (err) {
      console.error('Failed to add wish:', err);
      setSubmitError(
        'មិនអាចរក្សាទុកសារជូនពរបានទេ។ សូមពិនិត្យអ៊ីនធឺណិត ហើយព្យាយាមម្ដងទៀត។'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHeartClick = async (id: number) => {
    if (likedIds.has(id)) return;

    try {
      const newHearts = await incrementWishHearts(id);

      setLikedIds((prev) => new Set(prev).add(id));
      setHeartError('');

      setWishes((prev) =>
        prev.map((wish) =>
          wish.id === id ? { ...wish, hearts: newHearts } : wish
        )
      );
    } catch (err) {
      console.error('Failed to increment hearts:', err);
      setHeartError('មិនអាចចុចបេះដូងបានទេ។ សូមព្យាយាមម្ដងទៀត។');
    }
  };

  const inputClass =
    'w-full min-w-0 rounded-xl border border-amber-100/15 bg-[#13291f] px-4 py-3 text-sm text-white placeholder:text-stone-400 transition-all focus:border-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/20';

  const labelClass =
    'mb-2 block text-xs font-semibold leading-relaxed text-amber-50/90 sm:text-sm';

  return (
    <section
      id="wishes"
      className="relative mx-auto w-full max-w-6xl overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-20 right-0 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />

      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mx-auto mb-10 max-w-3xl px-4 text-center sm:mb-12"
      >
        {/* Elegant Label */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-[#20392b]/70 px-4 py-2 shadow-sm shadow-black/10 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-amber-300/90" />

          <span className="text-[10px] font-medium tracking-[0.18em] text-amber-100/90 sm:text-xs sm:tracking-[0.2em]">
            WEDDING GUESTBOOK
          </span>

          <Heart className="h-3.5 w-3.5 fill-amber-300/15 text-amber-300/90" />
        </div>

        {/* Khmer Subtitle */}
        <p className="mb-3 font-khmer-title text-xs tracking-wide text-amber-300/80 sm:text-sm">
          សៀវភៅកត់ត្រាពាក្យជូនពរ
        </p>

        {/* Main Heading */}
        <h2 className="mx-auto max-w-2xl font-khmer-title text-xl font-bold leading-relaxed text-amber-50 sm:text-2xl md:text-4xl">
          ផ្ញើសារជូនពរដល់ កូនកំលោះកូនក្រមុំ
        </h2>

        {/* Decorative Divider */}
        <div className="mx-auto my-5 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-300/50 sm:w-16" />

          <Heart className="h-4 w-4 fill-amber-300/10 text-amber-300/90" />

          <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-300/50 sm:w-16" />
        </div>

        {/* Description */}
        <p className="mx-auto max-w-1xl font-khmer-title text-xs leading-8 text-stone-300/90 sm:text-sm sm:leading-9 md:text-base">
          <span className="block sm:inline">
            សូមចូលរួមផ្ញើសារជូនពរ សេចក្ដីស្រឡាញ់ និងពរជ័យសិរីសួស្តី
          </span>{' '}
          <span className="block sm:inline">
            ដល់គូស្វាមីភរិយាថ្មី{' '}
            <span className="font-semibold text-amber-200">
              គីមហ៊ &amp; ធារ៉ា ។
            </span>
          </span>
        </p>
      </motion.div>

      {/* Main layout */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Wish submission form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-[28px] border border-amber-200/20 bg-gradient-to-br from-[#294333]/95 via-[#1e3629]/95 to-[#14291f]/95 p-5 shadow-2xl shadow-black/20 sm:p-7 lg:col-span-5"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border border-amber-200/10" />
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border border-amber-200/10" />

          <div className="relative">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-200/10">
                <MessageSquareHeart className="h-6 w-6 text-amber-300" />
              </div>

              <div className="min-w-0">
                <h3 className="font-khmer-title text-lg leading-relaxed text-white sm:text-xl">
                  សរសេរសារជូនពរ
                </h3>
                <p className="mt-1 text-xs text-stone-400">
                  Share your love and blessings
                </p>
              </div>
            </div>

            {/* Quick blessings */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-amber-300" />
                <span className="text-xs font-semibold leading-relaxed text-stone-200 sm:text-sm">
                  ជ្រើសរើសពាក្យជូនពររហ័ស
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {QUICK_BLESSINGS.map((text, idx) => (
                  <motion.button
                    key={idx}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleQuickAdd(text)}
                    className="rounded-xl border border-amber-200/20 bg-amber-50/[0.06] px-3 py-2 text-left text-xs leading-relaxed text-amber-100 transition-colors hover:border-amber-200/50 hover:bg-amber-100/10"
                  >
                    {text}
                  </motion.button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Sender name */}
              <div>
                <label htmlFor="wish-sender-name" className={labelClass}>
                  ឈ្មោះអ្នកជូនពរ
                  <span className="ml-1 text-rose-300">*</span>
                </label>

                <div className="relative">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-300/70" />

                  <input
                    id="wish-sender-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="ឧ. លោក ហេង គីមហត និងភរិយា"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* Relationship */}
              <div>
                <label htmlFor="wish-relationship" className={labelClass}>
                  ទំនាក់ទំនង
                </label>

                <select
                  id="wish-relationship"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className={inputClass}
                >
                  {RELATIONSHIPS.map((rel) => (
                    <option
                      key={rel}
                      value={rel}
                      className="bg-[#173027]"
                    >
                      {rel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <label htmlFor="wish-message" className="text-xs font-semibold text-amber-50/90 sm:text-sm">
                    ពាក្យជូនពរ
                    <span className="ml-1 text-rose-300">*</span>
                  </label>

                  <MessageCircle className="h-4 w-4 text-amber-300/70" />
                </div>

                <textarea
                  id="wish-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="សូមសរសេរពាក្យជូនពរនៅទីនេះ..."
                  className={`${inputClass} resize-y leading-7`}
                />
              </div>

              <AnimatePresence>
                {submitError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="rounded-xl border border-rose-300/20 bg-rose-400/10 p-3 text-sm leading-6 text-rose-200"
                  >
                    {submitError}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <button
                type="submit"
                disabled={
                  isSubmitting || !senderName.trim() || !message.trim()
                }
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b88635] via-[#d9ad5d] to-[#b88635] px-5 py-3.5 text-sm font-bold text-[#1d2e21] shadow-lg shadow-amber-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1d2e21]/30 border-t-[#1d2e21]" />
                    កំពុងផ្ញើ...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    ផ្ញើសារជូនពរ
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-6 text-stone-400">
                សារជូនពររបស់អ្នកនឹងក្លាយជាអនុស្សាវរីយ៍ដ៏មានតម្លៃ។
              </p>
            </form>
          </div>
        </motion.div>

        {/* Wishes stream */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="space-y-4 lg:col-span-7"
        >
          {/* List heading */}
          <div className="rounded-2xl border border-amber-200/20 bg-[#21372b]/80 p-4 shadow-lg shadow-black/10 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-200/20 bg-amber-200/10">
                  <MessageCircle className="h-5 w-5 text-amber-300" />
                </div>

                <div className="min-w-0">
                  <h3 className="font-khmer-title text-base leading-relaxed text-white sm:text-lg">
                    សៀវភៅពាក្យជូនពរ
                  </h3>
                  <p className="mt-1 text-xs text-stone-400">
                    Messages from our beloved guests
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 rounded-full border border-amber-200/20 bg-amber-100/5 px-3 py-2">
                <Users className="h-4 w-4 text-amber-300" />
                <span className="text-sm font-bold tabular-nums text-amber-100">
                  {wishes.length}
                </span>
              </div>
            </div>
          </div>

          {/* Heart error */}
          <AnimatePresence>
            {heartError && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="alert"
                className="rounded-xl border border-rose-300/20 bg-rose-400/10 p-3 text-sm leading-6 text-rose-200"
              >
                {heartError}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Loading state */}
          {isLoading ? (
            <div className="rounded-2xl border border-amber-200/15 bg-[#183126]/80 p-10 text-center">
              <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-amber-200/20 border-t-amber-300" />
              <p className="text-sm leading-relaxed text-stone-300">
                កំពុងផ្ទុកសារជូនពរ...
              </p>
            </div>
          ) : loadError ? (
            <div
              role="alert"
              className="rounded-2xl border border-rose-300/20 bg-[#183126]/80 p-8 text-center"
            >
              <MessageCircle className="mx-auto mb-3 h-8 w-8 text-rose-300" />
              <p className="text-sm leading-7 text-rose-200">{loadError}</p>
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  void loadAllWishes();
                }}
                className="mt-4 rounded-xl border border-amber-200/25 px-4 py-2 text-sm font-semibold text-amber-100 transition-colors hover:bg-amber-100/10"
              >
                ព្យាយាមម្ដងទៀត
              </button>
            </div>
          ) : wishes.length === 0 ? (
            <div className="rounded-2xl border border-amber-200/15 bg-gradient-to-br from-[#21372b]/90 to-[#14291f]/90 px-5 py-12 text-center sm:px-8">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-amber-200/20 bg-amber-200/10">
                <Heart className="h-7 w-7 text-amber-300" />
              </div>

              <h4 className="font-khmer-title text-lg leading-relaxed text-white">
                ចាប់ផ្តើមសរសេរអនុស្សាវរីយ៍ដំបូង
              </h4>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-stone-300">
                មិនទាន់មានសារជូនពរនៅឡើយទេ។ សូមក្លាយជាអ្នកដំបូងដែលផ្ញើសារជូនពរដ៏មានន័យដល់គូស្វាមីភរិយាថ្មី។
              </p>

              <Heart className="mx-auto mt-5 h-5 w-5 text-amber-300/70" />
            </div>
          ) : (
            <div className="max-h-[650px] space-y-3 overflow-y-auto overscroll-contain pr-1 sm:space-y-4 sm:pr-2">
              <AnimatePresence initial={false}>
                {wishes.map((wish, index) => {
                  const isLiked = likedIds.has(wish.id);

                  return (
                    <motion.article
                      key={wish.id}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{
                        duration: 0.3,
                        delay: Math.min(index * 0.04, 0.2),
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-amber-100/10 bg-gradient-to-br from-[#21372b]/95 to-[#172d22]/95 p-4 shadow-lg shadow-black/10 transition-colors duration-300 hover:border-amber-200/30 sm:p-5"
                    >
                      <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-amber-300/[0.035] blur-2xl transition-colors group-hover:bg-amber-300/[0.08]" />

                      {/* Guest identity and heart button */}
                      <div className="relative flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-200/50 bg-gradient-to-br from-amber-100 to-[#c99a45] text-amber-950 shadow-md shadow-black/10">
                            {wish.sender_name.trim() ? (
                              <span className="font-khmer-title text-base font-bold">
                                {Array.from(wish.sender_name.trim())[0]}
                              </span>
                            ) : (
                              <User className="h-5 w-5" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <h4 className="break-words text-sm font-bold leading-relaxed text-white sm:text-base">
                              {wish.sender_name}
                            </h4>

                            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] leading-relaxed text-stone-400 sm:text-xs">
                              <span className="rounded-full border border-amber-200/15 bg-amber-100/5 px-2 py-0.5 text-amber-100/90">
                                {wish.relationship}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>
                                {wish.created_at.split(' ')[0]}
                              </span>
                            </div>
                          </div>
                        </div>

                        <motion.button
                          type="button"
                          whileTap={isLiked ? undefined : { scale: 0.88 }}
                          onClick={() => void handleHeartClick(wish.id)}
                          disabled={isLiked}
                          aria-label={
                            isLiked
                              ? 'You liked this wish'
                              : 'Like this wish'
                          }
                          aria-pressed={isLiked}
                          className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                            isLiked
                              ? 'border-rose-300/30 bg-rose-500/10 text-rose-200'
                              : 'border-white/10 bg-white/[0.04] text-stone-300 hover:border-rose-300/40 hover:bg-rose-400/10 hover:text-rose-200'
                          }`}
                        >
                          <Heart
                            className={`h-4 w-4 transition-all ${
                              isLiked
                                ? 'fill-rose-400 text-rose-400'
                                : ''
                            }`}
                          />
                          <span className="tabular-nums">
                            {wish.hearts}
                          </span>
                        </motion.button>
                      </div>

                      {/* Message */}
                      <div className="relative mt-4 rounded-xl border border-white/[0.06] bg-black/[0.10] p-3.5 sm:p-4">
                        <MessageCircle className="mb-2 h-4 w-4 text-amber-300/70" />
                        <p className="whitespace-pre-line break-words font-khmer-body text-sm leading-8 text-stone-200">
                          {wish.message}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-stone-500">
                        <Heart className="h-3 w-3 text-amber-300/70" />
                        <span>ផ្ញើដោយក្តីស្រឡាញ់</span>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
      {/* Thank-you footer */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="mx-auto mt-9 flex max-w-2xl items-start justify-center gap-2 px-3 text-center sm:mt-12 sm:gap-3"
      >
        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-300/80 sm:h-5 sm:w-5" />

        <p className="text-xs leading-relaxed text-stone-400 sm:text-sm sm:leading-7">
          រាល់ពាក្យជូនពររបស់លោកអ្នក គឺជាអនុស្សាវរីយ៍ដ៏មានតម្លៃសម្រាប់យើងខ្ញុំ។
          សូមអរគុណដែលបានចូលរួមចែករំលែកសុភមង្គលក្នុងថ្ងៃពិសេសនេះ។
        </p>
      </motion.div>
    </section>
  );
};
