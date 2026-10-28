import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Heart, Send, Sparkles, MessageCircle, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getWishes, addWish, incrementWishHearts, WishRecord } from '../lib/sqlite';

const QUICK_BLESSINGS = [
  'សុភមង្គលជារៀងរហូត!',
  'ស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង!',
  'រកស៊ីមានបាន ត្រជាក់ត្រជុំ!',
  'ឆាប់បានកូនប្រុសស្រីពេញផ្ទះ!',
  'អាយុ វណ្ណៈ សុខៈ ពលៈ កុំបីឃ្លៀងឃ្លាតឡើយ!'
];

const RELATIONSHIPS = [
  'មិត្តភក្តិ',
  'សាច់ញាតិ',
  'មិត្តរួមការងារ',
  'បងប្អូន',
  'ភ្ញៀវកិត្តិយស'
];

interface WishesGuestbookProps {
  initialGuestName?: string;
}

export const WishesGuestbook: React.FC<WishesGuestbookProps> = ({ initialGuestName = '' }) => {
  const [wishes, setWishes] = useState<WishRecord[]>([]);
  const [senderName, setSenderName] = useState<string>(initialGuestName);
  const [relationship, setRelationship] = useState<string>('មិត្តភក្តិ');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const [heartError, setHeartError] = useState<string>('');
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
      setLoadError('មិនអាចផ្ទុកសារជូនពរបានទេ។ សូមសាកល្បងផ្ទុកទំព័រឡើងវិញ។');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllWishes();
  }, []);

  const handleQuickAdd = (text: string) => {
    setMessage(prev => (prev ? `${prev} ${text}` : text));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#F43F5E', '#FB7185', '#FBBF24']
      });

      setSenderName('');
      setMessage('');
      await loadAllWishes();
    } catch (err) {
      console.error('Failed to add wish:', err);
      setSubmitError('មិនអាចរក្សាទុកសារជូនពរបានទេ។ សូមពិនិត្យអ៊ីនធឺណិត ហើយព្យាយាមម្ដងទៀត។');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHeartClick = async (id: number) => {
    if (likedIds.has(id)) return;
    try {
      const newHearts = await incrementWishHearts(id);
      setLikedIds(prev => new Set(prev).add(id));
      setHeartError('');
      setWishes(prev =>
        prev.map(w => (w.id === id ? { ...w, hearts: newHearts } : w))
      );
    } catch (err) {
      console.error('Failed to increment hearts:', err);
      setHeartError('មិនអាចចុចបេះដូងបានទេ។ សូមព្យាយាមម្ដងទៀត។');
    }
  };

  return (
    <section id="wishes" className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-widest text-amber-200 uppercase block mb-1">
          សៀវភៅកត់ត្រាពាក្យជូនពរ
        </span>
        <h2 className="text-2xl sm:text-3xl font-khmer-title text-white">
          ផ្ញើសារជូនពរដល់កូនកំលោះកូនក្រមុំ
        </h2>
        <p className="text-sm text-stone-300 max-w-lg mx-auto mt-2">
          សូមចូលរួមផ្ញើសារជូនពរ សេចក្ដីស្រឡាញ់ និងពរជ័យសិរីសួស្តីដល់គូស្វាមីភរិយាថ្មី ពៅ & សំណាង
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Wish Submission Form */}
        <div className="lg:col-span-5 bg-[#21372b]/90 backdrop-blur-md rounded-3xl border border-amber-200/25 shadow-lg shadow-[#08140e]/40 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquareHeart className="w-5 h-5 text-amber-300" />
            <h3 className="text-base font-bold text-white font-khmer-title">
              សរសេរសារជូនពរ
            </h3>
          </div>

          {/* Quick blessing phrases */}
          <div className="mb-4">
            <span className="block text-[11px] font-semibold text-stone-300 mb-2">
              ចុចជ្រើសរើសពាក្យជូនពររហ័ស៖
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_BLESSINGS.map((text, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickAdd(text)}
                  className="px-2.5 py-1 bg-amber-50/10 hover:bg-amber-50/20 border border-amber-200/20 rounded-lg text-[11px] text-amber-100 transition-colors text-left"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>

          {submitError && (
            <p role="alert" className="text-xs text-rose-600">
              {submitError}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-stone-200 mb-1">
                ឈ្មោះអ្នកជូនពរ <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={e => setSenderName(e.target.value)}
                placeholder="ឧ. ពេជ្រ និងសុភា"
                className="w-full px-3.5 py-2.5 bg-[#183126] border border-white/10 rounded-xl text-sm text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-[#1d382f]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-200 mb-1">
                ទំនាក់ទំនង
              </label>
              <select
                value={relationship}
                onChange={e => setRelationship(e.target.value)}
                className="w-full px-3 py-2 bg-[#183126] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-[#1d382f]"
              >
                {RELATIONSHIPS.map((rel, idx) => (
                  <option key={idx} value={rel}>{rel}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-200 mb-1">
                ពាក្យជូនពរ <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="សូមសរសេរពាក្យជូនពរនៅទីនេះ..."
                className="w-full px-3.5 py-2.5 bg-[#183126] border border-white/10 rounded-xl text-sm text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-[#1d382f]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !senderName.trim() || !message.trim()}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 text-white rounded-xl text-sm font-semibold shadow-md transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'កំពុងផ្ញើ...' : 'ផ្ញើសារជូនពរ'}</span>
            </button>
          </form>
        </div>

        {/* Right Side: Wishes Stream */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-amber-100">
              សារជូនពរពីភ្ញៀវកិត្តិយស ({wishes.length})
            </span>
          </div>

          {heartError && (
            <p role="alert" className="text-xs text-rose-600">
              {heartError}
            </p>
          )}

          {isLoading ? (
            <div className="p-8 text-center bg-[#183126]/80 rounded-2xl border border-white/10 text-xs text-stone-300">
              កំពុងផ្ទុកទិន្នន័យសារជូនពរ...
            </div>
          ) : loadError ? (
            <div role="alert" className="p-8 text-center bg-[#183126]/80 rounded-2xl border border-rose-400/30 text-xs text-rose-200">
              {loadError}
            </div>
          ) : wishes.length === 0 ? (
            <div className="p-8 text-center bg-[#183126]/80 rounded-2xl border border-white/10 text-xs text-stone-300">
              មិនទាន់មានសារជូនពរនៅឡើយទេ។ សូមក្លាយជាអ្នកដំបូងគេដែលផ្ញើសារជូនពរ!
            </div>
          ) : (
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {wishes.map(wish => (
                <div
                  key={wish.id}
                  className="bg-[#183126]/80 rounded-2xl p-4 border border-white/10 shadow-sm hover:border-amber-200/30 transition-all text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 text-amber-900 flex items-center justify-center font-bold text-xs shadow-xs">
                        {wish.sender_name.charAt(0) || <User className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {wish.sender_name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-stone-300 mt-0.5">
                          <span>{wish.relationship}</span>
                          <span>·</span>
                          <span>{wish.created_at.split(' ')[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Heart button */}
                    <button
                      type="button"
                      onClick={() => handleHeartClick(wish.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                        likedIds.has(wish.id)
                          ? 'bg-rose-500/10 text-rose-200 border-rose-300/40'
                          : 'bg-white/5 text-stone-200 border-white/10 hover:border-rose-300/40 hover:text-rose-200'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedIds.has(wish.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span className="tabular-nums font-cinzel">{wish.hearts}</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-200 mt-3 leading-relaxed font-khmer-body whitespace-pre-line pl-1 border-l-2 border-amber-200/60">
                    {wish.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
