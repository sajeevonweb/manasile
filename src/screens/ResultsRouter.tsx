// Smart router that detects assessment type and renders appropriate results screen
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../core/db/database';
import { useStore } from '../core/store/useStore';
import StandardResultsScreen from '../features/assessments/big-five/components/StandardResultsScreen';
import ComprehensiveResultsScreen from '../features/assessments/big-five/components/ComprehensiveResultsScreen';
import type { Assessment } from '../core/db/database';
import ShortResultsScreen from '../features/assessments/big-five/components/ShortResultsScreen';

export default function ResultsRouter() {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const { currentUserId } = useStore();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssessment = async () => {
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

        if (!assessmentData.completedAt) {
          switch (assessmentData.assessmentType) {
            case 'big-five-comprehensive':
              navigate(`/big-five-comprehensive/${assessmentId}`);
              break;
            case 'big-five-standard':
              navigate(`/big-five-standard/${assessmentId}`);
              break;
            case 'big-five-short':
              navigate(`/big-five-short/${assessmentId}`);
              break;
          }
          return;
        }

        setAssessment(assessmentData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load assessment:', error);
        navigate('/results');
      }
    };

    void loadAssessment();
  }, [assessmentId, currentUserId, navigate]);

  if (loading) {
    return (
      <div className=" mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyan-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className=" mx-auto px-4 py-8">
        <div className="text-center text-red-600">Assessment not found</div>
      </div>
    );
  }

  // Render appropriate results screen based on assessment type
  if (assessment.assessmentType === 'big-five-comprehensive') {
    return <ComprehensiveResultsScreen />;
  }

  if (assessment.assessmentType === 'big-five-standard') {
    return <StandardResultsScreen />;
  }

  if (assessment.assessmentType === 'big-five-short') {
    return <ShortResultsScreen />;
  }
}