import { useState, useEffect, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/core/db/database';
import { useStore } from '@/core/store/useStore';
import {
  ASSESSMENT_TYPES,
  ASSESSMENT_CATEGORIES,
  type AssessmentType,
  type AssessmentCategory,
} from '@/core/types/assessment.types';
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
} from '@/core/types/language.types';

// ─── Sub-components ──────────────────────────────────────────────────────────

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-sm font-semibold text-gray-500 tracking-wide mb-2">{label}</p>
      {children}
    </div>
  );
}

function RadioCard({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all select-none ${
        checked
          ? 'border-cyan-600 bg-cyan-50'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      {/* sr-only native input keeps keyboard/a11y working */}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {/* Custom dot — purely driven by `checked` prop, never by browser state */}
      <span
        className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
          checked ? 'border-cyan-600' : 'border-gray-300'
        }`}
      >
        {checked && <span className="w-2 h-2 rounded-full bg-cyan-600" />}
      </span>
      <div className="flex-1 min-w-0">{children}</div>
    </label>
  );
}

// ─── Types & defaults ────────────────────────────────────────────────────────

interface AssessmentConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: AssessmentCategory;
}

const DEFAULT_FORM = {
  selectedAssessmentType: null as AssessmentType | null,
  selectedLanguage: DEFAULT_LANGUAGE,
  userName: '',
  userNameSubmitted: false,
  whoIsFor: 'myself' as 'myself' | 'someone-else',
  otherName: '',
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function AssessmentConfigModal({ isOpen, onClose, category }: AssessmentConfigModalProps) {
  const { currentUserId, setCurrentUserId } = useStore();
  const navigate = useNavigate();
  const uid = useId(); // stable per mount; makes radio names unique across open/close cycles

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(DEFAULT_FORM);
  const set = (patch: Partial<typeof DEFAULT_FORM>) => setForm((f) => ({ ...f, ...patch }));

  const availableTests: AssessmentType[] = category
    ? ASSESSMENT_CATEGORIES[category].availableTests
    : (Object.keys(ASSESSMENT_TYPES) as AssessmentType[]);

  // Reset / pre-fill on open only
  useEffect(() => {
    if (!isOpen) return;

    setForm({ ...DEFAULT_FORM, selectedAssessmentType: availableTests[0] ?? null });

    if (currentUserId) {
      db.userProfiles
        .get(currentUserId)
        .then((profile) => {
          if (profile) setForm((f) => ({ ...f, userName: profile.name, userNameSubmitted: true }));
        })
        .catch(console.error);
    }
    // Only run when the modal opens — not on every render of availableTests / currentUserId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    if (loading) return;
    setForm(DEFAULT_FORM);
    onClose();
  };

  const startAssessment = async () => {
    if (!form.selectedAssessmentType) return;
    const info = ASSESSMENT_TYPES[form.selectedAssessmentType];

    const subjectName = info.requiresSubjectName
      ? form.whoIsFor === 'myself' ? form.userName.trim() : form.otherName.trim()
      : undefined;

    if (info.requiresSubjectName && !subjectName) return;

    setLoading(true);
    try {
      let userId = currentUserId;
      if (!userId) {
        const newUserId: unknown = await db.userProfiles.add({ name: form.userName.trim(), createdAt: new Date() });
        if (typeof newUserId !== 'number') {
          throw new Error('Failed to create user profile');
        }
        userId = newUserId;
        setCurrentUserId(userId);
      }

      const assessmentId: unknown = await db.assessments.add({
        userId,
        assessmentType: form.selectedAssessmentType,
        language: form.selectedLanguage,
        subjectName,
        responses: {},
        createdAt: new Date(),
      });
      if (typeof assessmentId !== 'number') {
        throw new Error('Failed to create assessment');
      }

      handleClose();
      navigate(info.navigationPath(assessmentId));
    } catch (error) {
      console.error('Failed to create assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || availableTests.length === 0) return null;

  const categoryInfo = category ? ASSESSMENT_CATEGORIES[category] : null;
  const requiresSubject =
    form.selectedAssessmentType && ASSESSMENT_TYPES[form.selectedAssessmentType]?.requiresSubjectName;

  const isFormLocked = !form.userNameSubmitted;

  const isStartDisabled =
    loading ||
    !form.selectedAssessmentType ||
    !form.userNameSubmitted ||
    Boolean(requiresSubject && form.whoIsFor === 'someone-else' && !form.otherName.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Bottom sheet on mobile → centered card on sm+ */}
      <div
        className="relative bg-white w-full sm:max-w-md sm:rounded-xl rounded-t-2xl shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-4 pt-3 pb-2 sm:px-5 sm:pt-4 flex-shrink-0">
          <div className="flex-1 min-w-0 pr-2">
            <h2 className="text-base font-semibold text-gray-900 leading-snug truncate">
              {categoryInfo?.name ?? 'New Assessment'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="h-px bg-gray-100 flex-shrink-0" />

        {/* Scrollable body */}
        <div className="overflow-y-auto px-4 sm:px-5 py-3 flex-1">

          {/*Only shown for first-time users; returning users skip straight to the form. */}
          {!form.userNameSubmitted && (
            <div className="mb-4 p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
              <p className="text-xs font-semibold text-cyan-700 mb-2">First, what's your name?</p>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.userName}
                  onChange={(e) => set({ userName: e.target.value })}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter' && form.userName.trim()) set({ userNameSubmitted: true });
                  }}
                  className="flex-1 min-w-[111px] px-3 py-2 text-sm border-2 border-cyan-200 rounded-lg focus:outline-none focus:border-cyan-500 bg-white transition-colors"
                  autoFocus
                />
                <button
                  onClick={() => set({ userNameSubmitted: true })}
                  disabled={!form.userName.trim()}
                  className="flex-shrink-0 px-4 py-2 text-sm bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-medium"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          <div className={isFormLocked ? 'opacity-40 pointer-events-none select-none' : ''}>

              {/* Language */}
              <Section label="Language">
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(SUPPORTED_LANGUAGES).map((lang) => (
                    <RadioCard
                      key={lang.code}
                      name={`${uid}-language`}
                      value={lang.code}
                      checked={form.selectedLanguage === lang.code}
                      onChange={() => set({ selectedLanguage: lang.code })}
                    >
                      <span className="text-sm font-medium text-gray-900">{lang.nativeName}</span>
                      <span className="block text-xs text-gray-400">{lang.name}</span>
                    </RadioCard>
                  ))}
                </div>
              </Section>

              {/* Assessment version */}
              {availableTests.length > 1 && (
                <Section label="Version">
                  <div className="space-y-2">
                    {availableTests.map((type) => {
                      const info = ASSESSMENT_TYPES[type];
                      if (!info) return null;
                      return (
                        <RadioCard
                          key={type}
                          name={`${uid}-assessmentType`}
                          value={type}
                          checked={form.selectedAssessmentType === type}
                          onChange={() => set({ selectedAssessmentType: type })}
                        >
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-sm font-medium text-gray-900">{info.shortName}</span>
                            <span className="text-xs text-gray-400">{info.estimatedTime}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {info.questionCount} questions · {info.measuresCount}
                          </p>
                        </RadioCard>
                      );
                    })}
                  </div>
                </Section>
              )}

              {/* Who is it for */}
              {requiresSubject && (
                <Section label="Who is this for?">
                  <div className="space-y-2">
                    <RadioCard
                      name={`${uid}-whoIsFor`}
                      value="myself"
                      checked={form.whoIsFor === 'myself'}
                      onChange={() => set({ whoIsFor: 'myself' })}
                    >
                      <span className="text-sm font-medium text-gray-900">
                        Myself{' '}
                        {form.userName && (
                        <span className="font-normal text-gray-400">({form.userName})</span>
                        )}
                      </span>
                    </RadioCard>

                    <RadioCard
                      name={`${uid}-whoIsFor`}
                      value="someone-else"
                      checked={form.whoIsFor === 'someone-else'}
                      onChange={() => set({ whoIsFor: 'someone-else' })}
                    >
                      <span className="text-sm font-medium text-gray-900">Someone else</span>
                    </RadioCard>

                    {form.whoIsFor === 'someone-else' && (
                      <div className="pl-6 space-y-2 pt-1">
                        <input
                          type="text"
                          placeholder="Their name"
                          value={form.otherName}
                          onChange={(e) => set({ otherName: e.target.value })}
                          onKeyUp={(e) => {
                            if (e.key === 'Enter' && form.otherName.trim() && !loading) void startAssessment();
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          autoFocus
                        />
                        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 leading-snug">
                          <strong>Note:</strong> The person being assessed must complete this themselves.
                        </p>
                      </div>
                    )}
                  </div>
                </Section>
              )}
            </div>
        </div>

            {/* Footer actions — always present so modal height stays stable */}
            <div className="h-px bg-gray-100 flex-shrink-0" />
            <div className="flex gap-2 px-4 sm:px-5 py-3 flex-shrink-0">
              <button
                onClick={handleClose}
                disabled={loading}
                className="flex-1 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => void startAssessment()}
                disabled={isStartDisabled}
                className="flex-1 py-2 text-sm bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-medium"
              >
                {loading ? 'Starting…' : 'Start Assessment'}
              </button>
            </div>
      </div>
    </div>
  );
}