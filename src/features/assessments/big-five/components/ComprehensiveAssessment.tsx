import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { db } from '@/core/db/database';
import { useStore } from '@/core/store/useStore';
import {
  QUESTIONS_PER_PAGE,
  calculateComprehensiveScores,
} from '../data/comprehensive';
import { getComprehensiveQuestions } from '../translations';
import { buildQuestionFacets } from '../utils/questionFacets';
import ProgressBar from '@/shared/components/assessment/ProgressBar';
import QuestionOption from '@/shared/components/assessment/QuestionOption';
import type { Assessment } from '@/core/db/database';
import type { Language } from '@/core/types/language.types';

interface FormData {
  [questionId: string]: number;
}

export default function ComprehensiveAssessment() {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const { currentUserId, setCurrentAssessment } = useStore();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const isMountedRef = useRef(true);

  // Get questions based on assessment language
  const questions = useMemo(() => 
    getComprehensiveQuestions((assessment?.language as Language) || 'en'), 
    [assessment?.language]
  );

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, endIndex);

  const { handleSubmit, setValue, control, getValues, clearErrors } = useForm<FormData>({
    defaultValues: {},
    mode: 'onChange',
  });

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      setCurrentAssessment(null);
    };
  }, [setCurrentAssessment]);

  // Load assessment + previous answers
  useEffect(() => {
    const loadAssessment = async () => {
      if (!assessmentId || !currentUserId) {
        navigate('/assessments');
        return;
      }

      try {
        const assessmentData = await db.assessments.get(Number(assessmentId));

        if (!assessmentData || assessmentData.userId !== currentUserId) {
          if (isMountedRef.current) navigate('/assessments');
          return;
        }

        if (!isMountedRef.current) return;

        setAssessment(assessmentData);
        setCurrentAssessment(assessmentId);

        const questionsForLanguage = getComprehensiveQuestions(
          (assessmentData.language as Language) || 'en'
        );

        // Load existing responses
        if (
          assessmentData.responses &&
          Object.keys(assessmentData.responses).length > 0
        ) {
          Object.entries(assessmentData.responses).forEach(([questionId, value]) => {
            const numValue =
              typeof value === 'number' ? value : parseFloat(String(value));
            if (!isNaN(numValue) && numValue >= 1 && numValue <= 5) {
              setValue(questionId, numValue, {
                shouldValidate: false,
                shouldDirty: false,
              });
            }
          });

          // Jump to first unanswered question
          const firstUnansweredIndex = questionsForLanguage.findIndex(
            (q) => !assessmentData.responses?.[q.id]
          );
          const targetPage =
            firstUnansweredIndex >= 0
              ? Math.floor(firstUnansweredIndex / QUESTIONS_PER_PAGE)
              : Math.ceil(questionsForLanguage.length / QUESTIONS_PER_PAGE) - 1;

          setCurrentPage(targetPage);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to load assessment:', error);
        if (isMountedRef.current) navigate('/assessments');
      }
    };

    void loadAssessment();
  }, [assessmentId, currentUserId, navigate, setValue, setCurrentAssessment]);

  // Auto-save progress
  const saveProgress = useCallback(
    async (data: FormData) => {
      if (!assessment) return false;
      try {
        setSaveError(null);
        const numericResponses: Record<string, number> = {};
        Object.entries(data).forEach(([key, value]) => {
          numericResponses[key] = Number(value);
        });
        await db.assessments.update(assessment.id!, { responses: numericResponses });
        return true;
      } catch (error) {
        console.error('Failed to save progress:', error);
        setSaveError('Failed to save progress. Please try again.');
        return false;
      }
    },
    [assessment]
  );

  // Final submission
  const onSubmit = async (data: FormData) => {
    if (!assessment) return;

    setLoading(true);
    setSaveError(null);

    try {
      const numericResponses: Record<string, number> = {};
      Object.entries(data).forEach(([key, value]) => {
        numericResponses[key] = Number(value);
      });

      const calculatedScores = calculateComprehensiveScores(numericResponses, questions);
      const scores = {
        openness: Math.round(
          Math.max(0, Math.min(100, calculatedScores.openness))
        ),
        conscientiousness: Math.round(
          Math.max(0, Math.min(100, calculatedScores.conscientiousness))
        ),
        extraversion: Math.round(
          Math.max(0, Math.min(100, calculatedScores.extraversion))
        ),
        agreeableness: Math.round(
          Math.max(0, Math.min(100, calculatedScores.agreeableness))
        ),
        neuroticism: Math.round(
          Math.max(0, Math.min(100, calculatedScores.neuroticism))
        ),
      };

      await db.assessments.update(assessment.id!, {
        responses: numericResponses,
        questionFacets: buildQuestionFacets(questions),
        scores,
        completedAt: new Date(),
      });

      if (isMountedRef.current) {
        navigate(`/results/${assessment.id}`);
      }
    } catch (error) {
      console.error('Failed to complete assessment:', error);
      setSaveError('Failed to complete assessment. Please try again.');
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  };

  // Next handler
  const handleNext = async () => {
    const currentQuestionIds = currentQuestions.map((q) => q.id);
    const formValues = getValues();

    const unansweredQuestions = currentQuestionIds.filter((id) => {
      const value = formValues[id];
      return value === undefined || value === null;
    });

    if (unansweredQuestions.length > 0) {
      return;
    }

    currentQuestionIds.forEach((id) => clearErrors(id));

    const saved = await saveProgress(formValues);

    if (saved && currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const allFormValues = useWatch({ control });

  const allCurrentQuestionsAnswered = useMemo(() => {
    if (!isInitialized) return false;
    return currentQuestions.every((q) => {
      const value = allFormValues?.[q.id];
      return (
        value !== undefined &&
        value !== null &&
        Number(value) >= 1 &&
        Number(value) <= 5
      );
    });
  }, [allFormValues, currentQuestions, isInitialized]);

  const onFinalSubmit = handleSubmit(onSubmit);

  if (!assessment || !isInitialized) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyan-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {saveError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{saveError}</p>
        </div>
      )}

      {/* Progress Bar */}
      <ProgressBar
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalQuestions={questions.length}
      />

      {/* Form */}
      <div
        onSubmit={
          currentPage === totalPages - 1
            ? onFinalSubmit
            : (e) => e.preventDefault()
        }
      >
        <div className="bg-white">
          <h2 className="text-2xl font-bold text-gray-900">
            Big Five Personality Assessment
          </h2>
          <p className="text-gray-600 mb-6 text-xs">
            For best results be honest and choose the answer that best reflects your typical behavior and feelings.
          </p>

          <div className="space-y-8">
            {currentQuestions.map((question) => {
              const watchedValue = allFormValues?.[question.id];
              const numericValue =
                typeof watchedValue === 'number'
                  ? watchedValue
                  : Number(watchedValue);

              return (
                <div
                  key={question.id}
                  className=""
                >
                  <label className="block text-lg font-medium text-gray-900 mb-4">
                    {question.text}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <QuestionOption
                        key={value}
                        value={value}
                        isSelected={!isNaN(numericValue) && numericValue === value}
                        onChange={(val) =>
                          setValue(question.id, val, {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          })
                        }
                        labelType="accuracy"
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-5">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Previous
          </button>

          {currentPage === totalPages - 1 ? (
            <button
              type="button"
              onClick={() => void onFinalSubmit()}
              disabled={loading || !allCurrentQuestionsAnswered}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {loading ? 'Submitting...' : 'Complete Assessment'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void handleNext()}
              disabled={!allCurrentQuestionsAnswered}
              className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}