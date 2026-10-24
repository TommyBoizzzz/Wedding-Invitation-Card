import React, { useState, useEffect } from 'react';
import { X, Download, Database, Search, Lock, KeyRound, LogOut, Trash2 } from 'lucide-react';
import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import {
  exportAdminDatabase,
  getAdminDatabase,
  ApiError,
  deleteAdminRecord,
  deleteAllAdminData,
  GiftRecord,
  importLegacyDatabase,
  loginAdmin,
  logoutAdmin,
  WishRecord,
} from '../lib/sqlite';

function parseLegacyBank(value: unknown): GiftRecord['bank'] {
  if (value === 'ABA' || value === 'ACLEDA') return value;
  throw new Error('The SQLite backup contains an invalid bank.');
}

function parseLegacyCurrency(value: unknown): GiftRecord['currency'] {
  if (value === 'USD' || value === 'KHR') return value;
  throw new Error('The SQLite backup contains an invalid currency.');
}

function csvCell(value: unknown): string {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

interface AdminGuestListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInviteGenerator?: () => void;
}

export const AdminGuestListModal: React.FC<AdminGuestListModalProps> = ({
  isOpen,
  onClose,
  onOpenInviteGenerator
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingSession, setCheckingSession] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'gifts' | 'wishes'>('gifts');
  const [gifts, setGifts] = useState<GiftRecord[]>([]);
  const [wishes, setWishes] = useState<WishRecord[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [adminError, setAdminError] = useState<string>('');
  const [importing, setImporting] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [adminNotice, setAdminNotice] = useState<string>('');

  const handleClose = () => {
    setAdminError('');
    setAdminNotice('');
    onClose();
  };

  const handleOpenInviteGenerator = () => {
    if (!isAuthenticated || !onOpenInviteGenerator) return;
    onOpenInviteGenerator();
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      setIsAuthenticated(false);
      setPinInput('');
      setPinError('');
      setAdminError('');
    } catch (err) {
      console.error('Failed to end admin session:', err);
      setAdminError('មិនអាចចេញពី Admin បានទេ។ សូមព្យាយាមម្ដងទៀត។');
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginAdmin(pinInput);
      setIsAuthenticated(true);
      setPinError('');
    } catch (err) {
      setPinError(err instanceof Error ? err.message : 'មិនអាចចូល Admin បានទេ។ សូមព្យាយាមម្ដងទៀត។');
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    if (isAuthenticated) {
      void loadData();
      return;
    }

    let cancelled = false;
    setCheckingSession(true);
    getAdminDatabase()
      .then(() => {
        if (!cancelled) setIsAuthenticated(true);
      })
      .catch(err => {
        if (cancelled) return;
        if (!(err instanceof ApiError && err.status === 401)) {
          console.error('Failed to restore admin session:', err);
          setAdminError('មិនអាចផ្ទៀងផ្ទាត់សម័យ Admin បានទេ។ សូមព្យាយាមម្ដងទៀត។');
        }
      })
      .finally(() => {
        if (!cancelled) setCheckingSession(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    setAdminError('');
    try {
      const data = await getAdminDatabase();
      setGifts(data.gifts);
      setWishes(data.wishes);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      if (err instanceof ApiError && err.status === 401) {
        setIsAuthenticated(false);
        setPinInput('');
        setPinError('សម័យ Admin បានផុតកំណត់។ សូមបញ្ចូល PIN ម្ដងទៀត។');
      } else {
        setAdminError('មិនអាចផ្ទុកទិន្នន័យបានទេ។ សូមពិនិត្យការកំណត់ database ហើយព្យាយាមម្ដងទៀត។');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadBackup = async () => {
    try {
      const data = await exportAdminDatabase();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wedding_database_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export database backup:', err);
      setAdminError('មិនអាចទាញយកទិន្នន័យបានទេ។ សូមព្យាយាមម្ដងទៀត។');
    }
  };

  const handleDeleteRecord = async (type: 'gifts' | 'wishes', id: number, name: string) => {
    const recordType = type === 'gifts' ? 'ចំណងដៃ' : 'សារជូនពរ';
    if (!window.confirm(`តើអ្នកប្រាកដថាចង់លុប ${recordType} របស់ ${name} មែនទេ? ការលុបនេះមិនអាចត្រឡប់វិញបានទេ។`)) return;

    setDeleting(true);
    setAdminError('');
    setAdminNotice('');
    try {
      await deleteAdminRecord(type, id);
      setAdminNotice(`បានលុប${recordType}របស់ ${name} រួចរាល់។`);
      await loadData();
    } catch (err) {
      console.error('Failed to delete admin record:', err);
      setAdminError('មិនអាចលុបទិន្នន័យបានទេ។ សូមព្យាយាមម្ដងទៀត។');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteAllData = async () => {
    const total = gifts.length + wishes.length;
    if (total === 0) return;
    if (!window.confirm(`តើអ្នកប្រាកដថាចង់លុបទិន្នន័យចំណងដៃ និងសារជូនពរទាំង ${total} កំណត់ត្រាមែនទេ? ការលុបនេះមិនអាចត្រឡប់វិញបានទេ។`)) return;

    setDeleting(true);
    setAdminError('');
    setAdminNotice('');
    try {
      const deleted = await deleteAllAdminData();
      setAdminNotice(`បានលុបទិន្នន័យចំណងដៃ ${deleted.gifts} និងសារជូនពរ ${deleted.wishes} កំណត់ត្រារួចរាល់។`);
      await loadData();
    } catch (err) {
      console.error('Failed to clear admin data:', err);
      setAdminError('មិនអាចលុបទិន្នន័យទាំងអស់បានទេ។ សូមព្យាយាមម្ដងទៀត។');
    } finally {
      setDeleting(false);
    }
  };

  const handleImportLegacyDatabase = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;
    if (!window.confirm('នាំចូល backup បានតែមួយដង ហើយទិន្នន័យ RSVP ចាស់នឹងមិនត្រូវបាននាំចូលទេ។ តើបន្តទេ?')) return;

    setImporting(true);
    setAdminError('');
    setAdminNotice('');
    let legacyDb: SqlJsDatabase | null = null;
    try {
      const SQL = await initSqlJs({ locateFile: () => '/sql-wasm.wasm' });
      legacyDb = new SQL.Database(new Uint8Array(await file.arrayBuffer()));
      const readTable = (sql: string): unknown[][] => {
        const result = legacyDb?.exec(sql);
        return result?.[0]?.values ?? [];
      };
      const data = {
        gifts: readTable(
          'SELECT id, sender_name, bank, amount, currency, wish_message, created_at FROM gifts ORDER BY id',
        ).map(([id, senderName, bank, amount, currency, wishMessage, createdAt]) => ({
          id: Number(id),
          sender_name: String(senderName ?? ''),
          bank: parseLegacyBank(bank),
          amount: Number(amount ?? 0),
          currency: parseLegacyCurrency(currency),
          wish_message: String(wishMessage ?? ''),
          created_at: String(createdAt ?? ''),
        })),
        wishes: readTable(
          'SELECT id, sender_name, relationship, message, hearts, created_at FROM wishes ORDER BY id',
        ).map(([id, senderName, relationship, message, hearts, createdAt]) => ({
          id: Number(id),
          sender_name: String(senderName ?? ''),
          relationship: String(relationship ?? ''),
          message: String(message ?? ''),
          hearts: Number(hearts),
          created_at: String(createdAt ?? ''),
        })),
      };
      await importLegacyDatabase(data);
      setAdminNotice('បាននាំចូលទិន្នន័យចាស់រួចរាល់។');
      await loadData();
    } catch (err) {
      console.error('Failed to import the legacy SQLite database:', err);
      setAdminError(
        err instanceof Error
          ? err.message
          : 'មិនអាចនាំចូលទិន្នន័យចាស់បានទេ។ សូមពិនិត្យឯកសារ SQLite និងព្យាយាមម្ដងទៀត។',
      );
    } finally {
      legacyDb?.close();
      setImporting(false);
    }
  };

  const handleExportCSV = () => {
    if (activeTab === 'gifts') {
      const header = 'ID,ឈ្មោះអ្នកជូន,ធនាគារ,ចំនួនទឹកប្រាក់,រូបិយប័ណ្ណ,ពាក្យជូនពរ,កាលបរិច្ឆេទ\n';
      const rows = gifts.map(g =>
        [g.id, g.sender_name, g.bank, g.amount || '', g.currency, g.wish_message, g.created_at].map(csvCell).join(',')
      ).join('\n');
      const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wedding_gifts_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      const header = 'ID,ឈ្មោះអ្នកជូនពរ,ទំនាក់ទំនង,សារ,បេះដូង,កាលបរិច្ឆេទ\n';
      const rows = wishes.map(w =>
        [w.id, w.sender_name, w.relationship, w.message, w.hearts, w.created_at].map(csvCell).join(',')
      ).join('\n');
      const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wedding_wishes_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-center relative">
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center mb-3 border border-amber-300">
            <Lock className="w-6 h-6 text-amber-700" />
          </div>

          <h3 className="text-lg font-bold text-amber-950 font-khmer-title">
            ផ្ទាំងគ្រប់គ្រងម្ចាស់ដើមការ
          </h3>
          <p className="text-xs text-stone-500 mt-1 mb-5">
            {checkingSession
              ? 'កំពុងផ្ទៀងផ្ទាត់សម័យ Admin...'
                : 'សូមបញ្ចូល PIN ដើម្បីពិនិត្យទិន្នន័យចំណងដៃ និងសារជូនពរ។ ការចូលនឹងត្រូវចងចាំក្នុង browser នេះ រហូតដល់ចេញពី Admin។'}
          </p>

          {adminError && (
            <p role="alert" className="text-xs text-rose-600 mb-3">{adminError}</p>
          )}

          {!checkingSession && <form onSubmit={handleUnlock} className="space-y-3">
            <div className="relative">
              <input
                type="password"
                autoFocus
                value={pinInput}
                onChange={e => {
                  setPinInput(e.target.value);
                  setPinError('');
                }}
                placeholder="លេខកូដសម្ងាត់"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-center text-sm font-cinzel font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            </div>

            {pinError && (
              <p className="text-xs text-rose-600 font-medium">
                {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              ដោះសោចូលមើល (Unlock)
            </button>
          </form>}

          <p className="text-[11px] text-stone-400 mt-4">
            សម្រាប់កូនកំលោះ (ឈ្មោះកូនប្រុស) & កូនក្រមុំ (ឈ្មោះកូនស្រី)
          </p>
        </div>
      </div>
    );
  }

  const filteredGifts = gifts.filter(g =>
    g.sender_name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredWishes = wishes.filter(w =>
    w.sender_name.toLowerCase().includes(search.toLowerCase()) ||
    w.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-amber-50/50">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-700" />
              <h3 className="text-base sm:text-lg font-bold text-amber-950 font-khmer-title">
                ប្រព័ន្ធគ្រប់គ្រងភ្ញៀវ & SQLite Database
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              សម្រាប់ម្ចាស់ដើមការពិនិត្យទិន្នន័យចំណងដៃ និងសារជូនពរ
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => void handleLogout()}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              ចេញពី Admin
            </button>
            <button
              onClick={handleClose}
              type="button"
              aria-label="បិទ"
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subheader Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-stone-200">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('gifts')}
              type="button"
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'gifts'
                  ? 'bg-amber-700 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              បញ្ជីចំណងដៃ ({gifts.length})
            </button>
            <button
              onClick={() => setActiveTab('wishes')}
              type="button"
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'wishes'
                  ? 'bg-amber-700 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              សារជូនពរ ({wishes.length})
            </button>
          </div>

          {/* Export & Actions */}
          <div className="flex items-center gap-2">
            {onOpenInviteGenerator && (
              <button
                onClick={handleOpenInviteGenerator}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <span>+ បង្កើត Link ភ្ញៀវ</span>
              </button>
            )}
            <button
              onClick={handleDownloadBackup}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-lg text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span>ទាញយក Backup (.json)</span>
            </button>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 transition-colors cursor-pointer">
              <input
              type="file"
              accept=".sqlite,.db,application/octet-stream"
              onChange={handleImportLegacyDatabase}
              disabled={importing}
              className="sr-only"
              />
              <span>{importing ? 'កំពុងនាំចូល...' : 'នាំចូល SQLite ចាស់'}</span>
            </label>
            <button
              onClick={handleExportCSV}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ទាញយកជា CSV</span>
            </button>
            <button
              onClick={() => void handleDeleteAllData()}
              type="button"
              disabled={deleting || gifts.length + wishes.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-lg text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>លុបទិន្នន័យទាំងអស់</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-2.5 bg-white border-b border-stone-100">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ស្វែងរកតាមឈ្មោះ..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {adminNotice && (
            <div role="status" className="mb-3 rounded-lg bg-emerald-50 px-3 py-2 text-center text-xs text-emerald-700">
              {adminNotice}
            </div>
          )}

          {loading ? (
            <div className="py-12 text-center text-xs text-stone-400">កំពុងទាញទិន្នន័យ...</div>
          ) : adminError ? (
            <div role="alert" className="py-12 text-center text-xs text-rose-600">
              {adminError}
              <button
                onClick={() => void loadData()}
                type="button"
                className="block mx-auto mt-3 px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50"
              >
                ព្យាយាមម្ដងទៀត
              </button>
            </div>
          ) : activeTab === 'gifts' ? (
            filteredGifts.length === 0 ? (
              <div className="py-12 text-center text-xs text-stone-500">
                ពុំទាន់មានកំណត់ត្រាចំណងដៃនៅឡើយទេ។
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-500 font-semibold">
                      <th className="py-2 px-3">#</th>
                      <th className="py-2 px-3">ឈ្មោះអ្នកជូន</th>
                      <th className="py-2 px-3">ធនាគារ</th>
                      <th className="py-2 px-3">ចំនួនទឹកប្រាក់</th>
                      <th className="py-2 px-3">ពាក្យជូនពរ</th>
                      <th className="py-2 px-3">កាលបរិច្ឆេទ</th>
                      <th className="py-2 px-3">សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredGifts.map(gift => (
                      <tr key={gift.id} className="hover:bg-stone-50">
                        <td className="py-2.5 px-3 font-cinzel text-stone-400">{gift.id}</td>
                        <td className="py-2.5 px-3 font-bold text-stone-900">{gift.sender_name}</td>
                        <td className="py-2.5 px-3 font-semibold text-stone-700">{gift.bank}</td>
                        <td className="py-2.5 px-3 font-cinzel font-bold text-amber-900">
                          {gift.amount ? `${gift.currency === 'USD' ? '$' : ''}${gift.amount} ${gift.currency === 'KHR' ? '៛' : ''}` : '-'}
                        </td>
                        <td className="py-2.5 px-3 text-stone-600 max-w-sm truncate" title={gift.wish_message}>
                          {gift.wish_message || '-'}
                        </td>
                        <td className="py-2.5 px-3 font-cinzel text-stone-400 whitespace-nowrap">
                          {gift.created_at.split(' ')[0]}
                        </td>
                        <td className="py-2.5 px-3">
                          <button
                            onClick={() => void handleDeleteRecord('gifts', gift.id, gift.sender_name)}
                            type="button"
                            disabled={deleting}
                            aria-label={`លុបចំណងដៃរបស់ ${gift.sender_name}`}
                            title="លុបកំណត់ត្រានេះ"
                            className="rounded-md p-1.5 text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            filteredWishes.length === 0 ? (
              <div className="py-12 text-center text-xs text-stone-500">
                មិនទាន់មានសារជូនពរនៅឡើយទេ។
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-500 font-semibold">
                      <th className="py-2 px-3">#</th>
                      <th className="py-2 px-3">ឈ្មោះអ្នកជូនពរ</th>
                      <th className="py-2 px-3">ទំនាក់ទំនង</th>
                      <th className="py-2 px-3">សារជូនពរ</th>
                      <th className="py-2 px-3">បេះដូង</th>
                      <th className="py-2 px-3">កាលបរិច្ឆេទ</th>
                      <th className="py-2 px-3">សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredWishes.map(wish => (
                      <tr key={wish.id} className="hover:bg-stone-50">
                        <td className="py-2.5 px-3 font-cinzel text-stone-400">{wish.id}</td>
                        <td className="py-2.5 px-3 font-bold text-stone-900">{wish.sender_name}</td>
                        <td className="py-2.5 px-3 text-stone-600">{wish.relationship}</td>
                        <td className="py-2.5 px-3 text-stone-600 max-w-sm truncate" title={wish.message}>
                          {wish.message}
                        </td>
                        <td className="py-2.5 px-3 font-cinzel text-rose-600">{wish.hearts}</td>
                        <td className="py-2.5 px-3 font-cinzel text-stone-400 whitespace-nowrap">
                          {wish.created_at.split(' ')[0]}
                        </td>
                        <td className="py-2.5 px-3">
                          <button
                            onClick={() => void handleDeleteRecord('wishes', wish.id, wish.sender_name)}
                            type="button"
                            disabled={deleting}
                            aria-label={`លុបសារជូនពររបស់ ${wish.sender_name}`}
                            title="លុបកំណត់ត្រានេះ"
                            className="rounded-md p-1.5 text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
