import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { db } from '@/core/db/database';

const CONFIRM_WORD = 'logout';

interface LogoutConfirmModalProps {
  onClose: () => void;
}

export default function LogoutConfirmModal({ onClose }: LogoutConfirmModalProps) {
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  const isConfirmMatch = confirmText.trim().toLowerCase() === CONFIRM_WORD;

  const handleLogout = async () => {
    if (!isConfirmMatch || loading) return;
    setLoading(true);
    setError(null);
    try {
      // Wipe IndexedDB (all profiles + assessments)
      await db.delete();
      // Wipe localStorage (zustand-persisted app state, etc.)
      localStorage.clear();
      // Hard redirect: forces a full reload so every in-memory store
      // (zustand, Dexie's open connection) starts completely fresh.
      window.location.href = '/landing';
    } catch (err) {
      console.error('Failed to log out:', err);
      setError('Something went wrong while deleting your data. Please try again.');
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isConfirmMatch) void handleLogout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Bottom sheet on mobile → centered card on sm+ */}
      <div
        className="relative bg-white w-full sm:max-w-sm sm:rounded-xl rounded-t-2xl shadow-2xl flex flex-col max-h-[92dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="px-5 pt-4 pb-2">
          <div className="w-11 h-11 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-3">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-gray-900 leading-snug">
            Log out & delete all data?
          </h2>
          <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
            Manasile stores everything only on this device. Logging out will{' '}
            <strong className="text-gray-700">permanently delete</strong> your profile and every
            assessment you've taken. This can't be undone — there's no backup or account to
            recover it from.
          </p>
        </div>

        <div className="px-5 pb-2">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Type <span className="font-mono font-semibold text-gray-700">logout</span> to confirm
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="logout"
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            disabled={loading}
            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50"
          />
          {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
        </div>

        <div className="h-px bg-gray-100 mt-2 flex-shrink-0" />
        <div className="flex gap-2 px-5 py-3 flex-shrink-0">
          <button
            onClick={handleClose}
            disabled={loading}
            className="flex-1 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => void handleLogout()}
            disabled={!isConfirmMatch || loading}
            className="flex-1 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Deleting…' : 'Log out & delete'}
          </button>
        </div>
      </div>
    </div>
  );
}