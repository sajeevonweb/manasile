import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../core/db/database';
import { useStore } from '../core/store/useStore';
import type { Assessment } from '../core/db/database';

export default function AllResultsScreen() {
  const { currentUserId } = useStore();
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    if (!currentUserId) {
      navigate('/landing');
      return;
    }

    const loadAssessments = async () => {
      try {
        const completedAssessments = await db.assessments
          .where('userId')
          .equals(currentUserId)
          .filter(a => a.completedAt !== undefined)
          .reverse()
          .sortBy('completedAt');
        setAssessments(completedAssessments);
      } catch (error) {
        console.error('Failed to load assessments:', error);
      }
    };

    void loadAssessments();
  }, [currentUserId, navigate]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">All Results</h1>
        <p className="text-sm text-gray-600">View your completed assessment results</p>
      </div>

      {assessments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-gray-600 mb-4">No completed assessments yet.</p>
          <button
            onClick={() => navigate('/assessments')}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold"
          >
            Start Your First Assessment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessments.map((assessment) => {
            if (!assessment.scores) return null;
            
            return (
              <div
                key={assessment.id}
                onClick={() => navigate(`/results/${assessment.id}`)}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {assessment.assessmentType.replace(/-/g, ' ')} Assessment
                    </h3>
                    {assessment.subjectName && (
                      <p className="text-sm text-gray-600 mt-0.5">
                        For: {assessment.subjectName}
                      </p>
                    )}
                  </div>
                  <svg className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                <p className="text-sm text-gray-500 mb-2">
                  {assessment.completedAt && formatDate(assessment.completedAt)}
                </p>

                <div className="space-y-1">
                  {(['extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness'] as const).map((trait) => {
                    const score = (assessment.scores as unknown as Record<string, unknown>)[trait];
                    if (typeof score !== 'number') return null;
                    return (
                      <div key={trait} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 capitalize">{trait}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-cyan-600 h-1.5 rounded-full"
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 w-8">{score}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-xs text-cyan-600 font-medium">View Full Results →</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

