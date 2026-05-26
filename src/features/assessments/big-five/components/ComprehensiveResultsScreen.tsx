import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { db } from '@/core/db/database';
import { useStore } from '@/core/store/useStore';
import { IPIP_NEO_TRAITS, type BigFiveTrait } from '../data/comprehensive';
import { ASSESSMENT_TYPES } from '@/core/types/assessment.types';
import ScoreScaleNote from '@/shared/components/assessment/ScoreScaleNote';
import type { Assessment, BigFiveScores } from '@/core/db/database';

export default function ComprehensiveResultsScreen() {
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

        if (assessmentData.assessmentType !== 'big-five-comprehensive') {
          navigate(`/results/${assessmentId}`);
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

  const raw = assessment.scores as BigFiveScores & { facets?: unknown };
  const scores: BigFiveScores = {
    extraversion:
      typeof raw.extraversion === 'number'
        ? Math.max(0, Math.min(100, raw.extraversion))
        : 0,
    agreeableness:
      typeof raw.agreeableness === 'number'
        ? Math.max(0, Math.min(100, raw.agreeableness))
        : 0,
    conscientiousness:
      typeof raw.conscientiousness === 'number'
        ? Math.max(0, Math.min(100, raw.conscientiousness))
        : 0,
    neuroticism:
      typeof raw.neuroticism === 'number' ? Math.max(0, Math.min(100, raw.neuroticism)) : 0,
    openness: typeof raw.openness === 'number' ? Math.max(0, Math.min(100, raw.openness)) : 0,
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const barChartData = Object.entries(IPIP_NEO_TRAITS).map(([key, trait]) => ({
    name: trait.name,
    score: scores[key as BigFiveTrait],
    color: trait.color,
  }));

  const getInterpretation = (
    trait: BigFiveTrait,
    score: number
  ): { level: string; description: string } => {
    const traitInfo = IPIP_NEO_TRAITS[trait];
    if (score >= 70) {
      return {
        level: 'Higher tendency',
        description: `You rated yourself highly on ${traitInfo.name.toLowerCase()}. ${traitInfo.description}.`,
      };
    }
    if (score >= 31) {
      return {
        level: 'Moderate tendency',
        description: `You rated yourself in the middle range on ${traitInfo.name.toLowerCase()}. ${traitInfo.description}.`,
      };
    }
    return {
      level: 'Lower tendency',
      description: `You rated yourself lower on ${traitInfo.name.toLowerCase()}. ${traitInfo.description}.`,
    };
  };

  const getScoreBandColor = (score: number): string => {
    if (score >= 70) return 'bg-blue-100 text-blue-800';
    if (score >= 31) return 'bg-cyan-100 text-cyan-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/results')}
          className="text-cyan-600 hover:text-cyan-700 mb-4 flex items-center"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to All Results
        </button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Assessment Results</h1>
        <p className="text-lg text-gray-600">
          {ASSESSMENT_TYPES[assessment.assessmentType]?.name ?? 'Big Five (Comprehensive)'}
        </p>
        {assessment.subjectName && (
          <p className="text-lg text-gray-700 mb-1">
            Assessment for: <span className="font-semibold">{assessment.subjectName}</span>
          </p>
        )}
        <p className="text-gray-600">
          Completed on {assessment.completedAt && formatDate(assessment.completedAt)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {Object.entries(IPIP_NEO_TRAITS).map(([key, trait]) => {
          const score = scores[key as BigFiveTrait];
          const { level } = getInterpretation(key as BigFiveTrait, score);
          return (
            <div key={key} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: trait.color }}
                />
                <span className="text-2xl font-bold text-gray-900">{score}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{trait.name}</h3>
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getScoreBandColor(score)}`}
              >
                {level}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Trait Scores</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Detailed Interpretation</h2>
        <div className="space-y-6">
          {Object.entries(IPIP_NEO_TRAITS).map(([key, trait]) => {
            const traitKey = key as BigFiveTrait;
            const score = scores[traitKey];
            const { level, description } = getInterpretation(traitKey, score);
            return (
              <div key={key} className="border-l-4 pl-4" style={{ borderColor: trait.color }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{trait.name}</h3>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${getScoreBandColor(score)}`}
                    >
                      {level}
                    </span>
                    <span className="text-lg font-bold" style={{ color: trait.color }}>
                      {score}/100
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">{description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <ScoreScaleNote />
    </div>
  );
}
