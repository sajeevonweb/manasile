import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../core/db/database';
import { useStore } from '../core/store/useStore';
import { ASSESSMENT_TYPES } from '../core/types/assessment.types';
import type { Assessment } from '../core/db/database';
import StartAssessmentButton from '../shared/components/assessment/StartAssessmentButton';
import AssessmentConfigModal from '../shared/components/assessment/AssessmentConfigModal';
import SEO from '@/shared/components/SEO';

export default function HomeScreen() {
  const { currentUserId, assessmentConfigModal, closeAssessmentConfigModal } = useStore();
  const navigate = useNavigate();
  const [recentAssessments, setRecentAssessments] = useState<Assessment[]>([]);
  const [stats, setStats] = useState({
    totalAssessments: 0,
    completedAssessments: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      if (!currentUserId) {
        navigate('/landing');
        return;
      }

      try {
        const assessments = await db.assessments
          .where('userId')
          .equals(currentUserId)
          .reverse()
          .sortBy('createdAt');

        setRecentAssessments(assessments.slice(0, 3));

        const completed = assessments.filter(a => a.completedAt).length;
        setStats({
          totalAssessments: assessments.length,
          completedAssessments: completed,
        });
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    void loadData();
  }, [currentUserId, navigate]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleAssessmentClick = (assessment: Assessment) => {
    if (assessment.completedAt) {
      navigate(`/results/${assessment.id}`);
    } else {
      const assessmentInfo = ASSESSMENT_TYPES[assessment.assessmentType];
      if (assessmentInfo && assessment.id) {
        navigate(assessmentInfo.navigationPath(assessment.id));
      }
    }
  };

  const progressRate = stats.totalAssessments > 0
    ? Math.round((stats.completedAssessments / stats.totalAssessments) * 100)
    : 0;

  return (
    <>
      <SEO title="Home | Manasile" />
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          
          {/* 
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Welcome back, {userProfile?.name || 'there'}!
            </h1>
            <p className="mt-2 text-gray-600">Track your progress and continue your assessments</p>
          </div> */}

          {/* Start Assessment - Main Focus */}
          <StartAssessmentButton category="big-five" variant="card" className="mb-6" />
      
          {/* Combined Stats Card - Single Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-2 mb-2 sm:p-4">
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              
              <div className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-3">
                <div className="hidden sm:block bg-cyan-50 rounded-md p-2">
                  <svg className="h-4 w-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.totalAssessments}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-3">
                <div className="hidden sm:block bg-cyan-50 rounded-md p-2">
                  <svg className="h-4 w-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Completed</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.completedAssessments}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-3">
                <div className="hidden sm:block bg-cyan-50 rounded-md p-2">
                  <svg className="h-4 w-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Progress</p>
                  <p className="text-lg font-semibold text-gray-900">{progressRate}%</p>
                </div>
              </div>

            </div>
          </div>

          {/* Recent Assessments */}
          {recentAssessments.length > 0 && (
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Recent Assessments</h2>
                <p className="mt-1 text-sm text-gray-500">Continue where you left off</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {recentAssessments.map((assessment) => (
                  <div
                    key={assessment.id}
                    className="px-6 py-5 hover:bg-gray-50 cursor-pointer transition-colors group"
                    onClick={() => handleAssessmentClick(assessment)}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900 text-base">
                            {ASSESSMENT_TYPES[assessment.assessmentType]?.name || 'Assessment'}
                          </h3>
                           {assessment.language && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {assessment.language.toUpperCase()}
                            </span>
                          )}
                          {assessment.subjectName && (
                            <span className="text-sm text-gray-500">
                              • {assessment.subjectName}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {formatDate(assessment.createdAt)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          assessment.completedAt
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {assessment.completedAt ? 'Completed' : 'In Progress'}
                        </span>
                        <svg 
                          className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {recentAssessments.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="max-w-sm mx-auto">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No assessments yet</h3>
                <p className="text-gray-500">Start your first assessment to begin tracking your progress</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Assessment Configuration Modal */}
      <AssessmentConfigModal
        isOpen={assessmentConfigModal.isOpen}
        onClose={closeAssessmentConfigModal}
        category={assessmentConfigModal.category}
      />
    </>
  );
}