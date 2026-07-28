import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../core/db/database';
import { useStore } from '../core/store/useStore';
import type { UserProfile } from '../core/db/database';
import LogoutConfirmModal from '../shared/components/account/LogoutConfirmModal';
import {Info,CircleHelp,MessageSquare,FileText, LogOut} from 'lucide-react';
import SEO from '@/shared/components/SEO';

// Menu item definitions 
const MENU_ITEMS = [
  {
    id: 'about',
    label: 'About',
    icon: <Info className="w-5 h-5" />,
    route: '/about',
  },
  //{
  //   id: 'export',
  //   label: 'Export Data',
  //   icon: <ArrowDownToLine className="w-5 h-5" />,
  //   route: '/export',
  // },
  {
    id: 'faq',
    label: 'FAQ',
    icon: <CircleHelp className="w-5 h-5" />,
    route: '/faq',
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: <MessageSquare className="w-5 h-5" />,
    route: '/feedback',
  },
  {
    id: 'terms',
    label: 'Terms & Conditions',
    icon: <FileText className="w-5 h-5" />,
    route: '/terms',
  },
  {
    id: 'logout',
    label: 'Log out',
    icon: <LogOut className="w-5 h-5" />,
    route: '/logout',
  },
] as const;

//Initials avatar 
function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-md shrink-0">
      <span className="text-white text-xl font-semibold tracking-wide">{initials || '?'}</span>
    </div>
  );
}

//Main screen
export default function MoreScreen() {
  const { currentUserId } = useStore();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [saving, setSaving] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutModalKey, setLogoutModalKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load profile
  useEffect(() => {
    if (!currentUserId) {
      navigate('/landing');
      return;
    }
    void db.userProfiles.get(currentUserId).then((p) => {
      if (p) {
        setProfile(p);
        setEditName(p.name);
      }
    });
  }, [currentUserId, navigate]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleEditStart = () => {
    setEditName(profile?.name ?? '');
    setIsEditing(true);
  };

  const handleSaveName = async () => {
  const trimmed = editName.trim();
  if (!trimmed || !currentUserId || trimmed === profile?.name) {
    setIsEditing(false);
    return;
  }
  setSaving(true);
  try {
    const oldName = profile?.name ?? '';

    // 1. Update userProfiles (verify both id AND current name match)
    const updated = await db.userProfiles
      .where('id')
      .equals(currentUserId)
      .filter(p => p.name === oldName)
      .modify({ name: trimmed });

    if (updated === 0) {
      // Name was already changed elsewhere, bail out
      setIsEditing(false);
      setSaving(false);
      return;
    }

    // 2. Find all assessments where userId matches AND subjectName matches old name
    const matchingAssessments = await db.assessments
      .where('userId')
      .equals(currentUserId)
      .filter(a => a.subjectName === oldName)
      .toArray();

    // 3. Bulk update subjectName on matched assessments
    await Promise.all(
      matchingAssessments.map(a =>
        db.assessments.update(a.id!, { subjectName: trimmed })
      )
    );

    setProfile((prev) => (prev ? { ...prev, name: trimmed } : prev));
  } catch (err) {
    console.error('Failed to update name:', err);
  } finally {
    setSaving(false);
    setIsEditing(false);
  }
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') void handleSaveName();
    if (e.key === 'Escape') setIsEditing(false);
  };

  const openLogoutModal = () => {
    setLogoutModalKey((k) => k + 1); // forces a fresh modal instance, guaranteeing reset state
    setShowLogoutModal(true);
  };

  if (!profile) return null;

  return (
  <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <SEO title="More Options | Manasile" />
      {/* Page title */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">More</h1>
        {/* <p className="text-sm text-gray-600"></p> */}
      </div>

      {/* ── Profile card ── */}
      <div className="bg-white rounded-xl shadow p-5 mb-6 flex items-center gap-4">
        <InitialsAvatar name={profile.name} />

        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 font-medium">Your Name</p>

          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => void handleSaveName()}
                maxLength={50}
                className="flex-1 text-lg font-semibold text-gray-900 border-b-2 border-cyan-500 focus:outline-none bg-transparent py-0.5 min-w-0"
              />
              <button
                onClick={() => void handleSaveName()}
                disabled={saving}
                className="shrink-0 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-md px-2.5 py-1 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="shrink-0 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-md px-2 py-1 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <span className="text-lg font-semibold text-gray-900 truncate">{profile.name}</span>
              <button
                onClick={handleEditStart}
                aria-label="Edit name"
                className="shrink-0 p-1 rounded-md text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
                </svg>
              </button>
            </div>
          )}

          {!isEditing && (
            <button
              onClick={handleEditStart}
              className="text-xs text-cyan-600 hover:text-cyan-700 font-medium mt-0.5 transition-colors"
            >
              Edit name
            </button>
          )}
        </div>
      </div>

      {/* ── Menu items ── */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {MENU_ITEMS.map((item, idx) => {
          const isLogout = item.id === 'logout';

          return (
            <button
              key={item.id}
              onClick={() => (isLogout ? openLogoutModal() : navigate(item.route))}
              className={`w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors ${idx < MENU_ITEMS.length - 1 ? 'border-b border-gray-100' : ''
                }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isLogout ? 'bg-red-50 text-red-600' : 'bg-cyan-50 text-cyan-600'
                  }`}
              >
                {item.icon}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold ${isLogout ? 'text-red-600' : 'text-gray-900'
                    }`}
                >
                  {item.label}
                </p>
              </div>

              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          );
        })}
      </div>

      {/* App version */}
      <p className="text-center text-xs text-gray-400 mt-6">v{__APP_VERSION__}</p>
      {showLogoutModal && (
        <LogoutConfirmModal
          key={logoutModalKey}
          onClose={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
}