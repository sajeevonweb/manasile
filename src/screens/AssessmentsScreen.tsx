import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../core/db/database';
import { useStore } from '../core/store/useStore';
import { ASSESSMENT_TYPES } from '../core/types/assessment.types';
import type { Assessment } from '../core/db/database';
import StartAssessmentButton from '../shared/components/assessment/StartAssessmentButton';
import AssessmentConfigModal from '../shared/components/assessment/AssessmentConfigModal';

export default function AssessmentsScreen() {
  const { currentUserId, assessmentConfigModal, closeAssessmentConfigModal } = useStore();
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    if (!currentUserId) {
      navigate('/landing');
      return;
    }

    const loadData = async () => {
      try {
        const userAssessments = await db.assessments
          .where('userId')
          .equals(currentUserId)
          .reverse()
          .sortBy('createdAt');
        setAssessments(userAssessments);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    void loadData();
  }, [currentUserId, navigate]);

  const continueAssessment = (assessment: Assessment) => {
    const assessmentInfo = ASSESSMENT_TYPES[assessment.assessmentType];
    if (assessmentInfo && assessment.id) {
      navigate(assessmentInfo.navigationPath(assessment.id));
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const inProgressAssessments = assessments.filter(a => !a.completedAt);
  const completedAssessments = assessments.filter(a => a.completedAt);

return (
  <>
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessments</h1>
        <p className="text-gray-600">Take or continue your psychological assessments</p>
      </div>

      {/* start New Assessment - Big Five */}
      <StartAssessmentButton category="big-five" variant="card" className="mb-8" />

      { /* Future: Add other assessment categories */ }
      {/* <StartAssessmentButton category="emotional-intelligence" variant="card" className="mb-8" /> */}
      {/* <StartAssessmentButton category="career" variant="card" className="mb-8" /> */}

      {/* In Progress Assessments */}
      {inProgressAssessments.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">In Progress</h2>
          <div className="space-y-4">
            {inProgressAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => continueAssessment(assessment)}
              >
                <div className="flex justify-between flex-wrap items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {ASSESSMENT_TYPES[assessment.assessmentType]?.name || 'Assessment'}
                      {assessment.subjectName && (
                        <span className="text-base font-normal text-gray-600 ml-2">
                          - {assessment.subjectName}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 mb-1">
                      Started {formatDate(assessment.createdAt)}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Assessments */}
      {completedAssessments.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed</h2>
          <div className="space-y-4">
            {completedAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/results/${assessment.id}`)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {ASSESSMENT_TYPES[assessment.assessmentType]?.name || 'Assessment'}
                      {assessment.subjectName && (
                        <span className="text-base font-normal text-gray-600 ml-2">
                          - {assessment.subjectName}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Completed {assessment.completedAt && formatDate(assessment.completedAt)}
                    </p>
                  </div>
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {assessments.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-600">No assessments yet. Start your first assessment above!</p>
        </div>
      )}
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

