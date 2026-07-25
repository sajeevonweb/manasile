import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '@/core/db/database';
import { useStore } from '@/core/store/useStore';
import { BIG_FIVE_TRAITS } from '../data/bigFiveTraits';
import { TRAIT_INTERPRETATIONS } from '../data/bigFiveInterpretations';
import {
  getScoreBand,
  getScoreBandLabel,
  getDisplayPercentage,
  getTestVersion,
} from '../data/bigFiveScoreBands';
import { ASSESSMENT_TYPES } from '@/core/types/assessment.types';
import type { Assessment, BigFiveScores } from '@/core/db/database';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: { name: string; value: number; color: string } }[];
}

// ─── Custom Tooltip for doughnut chart ───────────────────────────────────────
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const { name, value, color } = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-sm">
        <span className="font-semibold" style={{ color }}>{name}</span>
        <span className="text-gray-600 ml-2">{value}%</span>
      </div>
    );
  }
  return null;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BigFiveResultsScreen() {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const { currentUserId } = useStore();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!assessmentId || !currentUserId) {
        navigate('/results');
        return;
      }

      try {
        const assessmentData = await db.assessments.get(Number(assessmentId));
        if (!assessmentData || assessmentData.userId !== currentUserId) {
          navigate('/results');
          return;
        }
        setAssessment(assessmentData);
      } catch (error) {
        console.error('Failed to load results:', error);
        navigate('/results');
      }
    };
    void loadData();
  }, [assessmentId, currentUserId, navigate]);

  if (!assessment || !assessment.scores) {
    return (
      <div className="mx-auto px-4 py-8">
        <div className="text-center">Loading results...</div>
      </div>
    );
  }

  // Raw 0-100 scores as computed by the scoring engine. Kept as the source of
  // truth for getScoreBand() and TRAIT_INTERPRETATIONS lookups -- only ever
  // converted to a display percentage (via getDisplayPercentage) at render time.
  const rawScores: BigFiveScores = {
    extraversion:     typeof assessment.scores.extraversion     === 'number' ? Math.max(0, Math.min(100, assessment.scores.extraversion))     : 0,
    agreeableness:    typeof assessment.scores.agreeableness    === 'number' ? Math.max(0, Math.min(100, assessment.scores.agreeableness))    : 0,
    conscientiousness:typeof assessment.scores.conscientiousness=== 'number' ? Math.max(0, Math.min(100, assessment.scores.conscientiousness)): 0,
    neuroticism:      typeof assessment.scores.neuroticism      === 'number' ? Math.max(0, Math.min(100, assessment.scores.neuroticism))      : 0,
    openness:         typeof assessment.scores.openness         === 'number' ? Math.max(0, Math.min(100, assessment.scores.openness))         : 0,
  };

  const testVersion = getTestVersion(assessment.assessmentType);

  // Display percentages -- these are what's shown on screen everywhere. Always
  // consistent with the band label (under 30% = low, 30-69% = mid, 70%+ = high)
  // regardless of where a given trait's raw cutoffs happen to sit.
  const displayScores: BigFiveScores = {
    extraversion: getDisplayPercentage(testVersion, 'extraversion', rawScores.extraversion),
    agreeableness: getDisplayPercentage(testVersion, 'agreeableness', rawScores.agreeableness),
    conscientiousness: getDisplayPercentage(testVersion, 'conscientiousness', rawScores.conscientiousness),
    neuroticism: getDisplayPercentage(testVersion, 'neuroticism', rawScores.neuroticism),
    openness: getDisplayPercentage(testVersion, 'openness', rawScores.openness),
  };

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Build doughnut data (uses display percentages, so the chart matches the labels)
  const pieData = Object.entries(BIG_FIVE_TRAITS).map(([key, trait]) => ({
    name: trait.name,
    value: displayScores[key as keyof BigFiveScores],
    color: trait.color,
  }));

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── Header ── */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/results')}
          className="text-cyan-600 hover:text-cyan-700 mb-4 flex items-center"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Results
        </button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Assessment Results</h1>
        <div className="flex flex-wrap gap-[5px] justify-between">
          <p className="text-sm text-gray-600">
            {ASSESSMENT_TYPES[assessment.assessmentType]?.name ?? 'Big Five'}
          </p>
          <p className="text-sm text-gray-600">
            Completed on {assessment.completedAt && formatDate(assessment.completedAt)}
          </p>
        </div>
        {assessment.subjectName && (
          <p className="text-lg text-gray-700 mt-1">
            Assessment for: <span className="font-semibold">{assessment.subjectName}</span>
          </p>
        )}
      </div>

      {/* ── Doughnut + Trait Bars row ── */}
      <div className="flex flex-wrap gap-6 mb-8">

        {/* Doughnut chart card */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center w-full sm:w-auto sm:flex-1 min-w-[260px]">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 self-start">Trait Overview</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="80%"
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* Trait bars card */}
        <div className="bg-white rounded-lg shadow p-6 flex-1 min-w-[260px]">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Trait Scores</h2>
          <div className="space-y-4 mt-2">
            {Object.entries(BIG_FIVE_TRAITS).map(([key, trait]) => {
              const displayScore = displayScores[key as keyof BigFiveScores];
              return (
                <div key={key}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-sm text-gray-500 sm:w-36 sm:shrink-0">{trait.name}</span>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${displayScore}%`, backgroundColor: trait.color }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-9 text-right shrink-0">{displayScore}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Detailed Interpretations ── */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Detailed Interpretation</h2>

        {/* Disclaimer banner */}
        <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <svg className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-yellow-900 leading-relaxed">
            <span className="font-semibold">Note: </span>{'Personality traits exist on a continuum, so these scores are estimates rather than precise measurements. Use them as a guide for self-reflection, not as a definitive description of who you are.'}
          </p>
        </div>

        <div className="space-y-10">
          {Object.entries(BIG_FIVE_TRAITS).map(([key, trait]) => {
            const rawScore = rawScores[key as keyof BigFiveScores];
            const displayScore = displayScores[key as keyof BigFiveScores];
            const band = getScoreBand(testVersion, key as keyof BigFiveScores, rawScore);
            const { label, className } = getScoreBandLabel(band);
            const interp = TRAIT_INTERPRETATIONS[key as keyof BigFiveScores][band];

            return (
              <div key={key} className="border-l-4 rounded-xl pl-5" style={{ borderColor: trait.color }}>

                {/* Trait header */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{trait.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-lg ${className}`}>
                      {label}
                    </span>
                  </div>
                </div>

                {/* Score */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xs uppercase tracking-wide text-gray-500">Score</span>
                  <span className="text-2xl font-bold" style={{ color: trait.color }}>
                    {displayScore}%
                  </span>
                </div>

                {/* What this score suggests */}
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2 uppercase tracking-wide">
                    What this score suggests
                  </h4>
                  <div className="space-y-2">
                    {interp.summary.map((paragraph, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Common characteristics */}
                <div className="bg-gray-50 rounded-lg p-4 mb-5">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2 uppercase tracking-wide">
                    Common characteristics
                  </h4>
                  <ul className="space-y-1">
                    {interp.commonCharacteristics.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-800">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Strengths & Challenges side by side on md+ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-green-800 mb-2 uppercase tracking-wide">
                      Potential strengths
                    </h4>
                    <ul className="space-y-1">
                      {interp.strengths.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-green-900">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-red-800 mb-2 uppercase tracking-wide">
                      Potential challenges
                    </h4>
                    <ul className="space-y-1">
                      {interp.challenges.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-red-900">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Tips for growth */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2 uppercase tracking-wide">
                    Tips for growth
                  </h4>
                  <ul className="space-y-1">
                    {interp.tipsForGrowth.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-blue-900">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}