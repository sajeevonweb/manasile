import { useStore } from '@/core/store/useStore';
import { ASSESSMENT_CATEGORIES, type AssessmentCategory } from '@/core/types/assessment.types';
import { Brain } from "lucide-react";

interface StartAssessmentButtonProps {
  category: AssessmentCategory;
  variant?: 'primary' | 'secondary' | 'card'|'minimalist' ;
  className?: string;
}

export default function StartAssessmentButton({ 
  category,
  variant = 'primary',
  className = ''
}: StartAssessmentButtonProps) {
  const { setAssessmentConfigModal } = useStore();

  const categoryInfo = ASSESSMENT_CATEGORIES[category];

  const handleClick = () => {
    setAssessmentConfigModal({ isOpen: true, category });
  };

  // Don't render if no tests available yet
  if (!categoryInfo || categoryInfo.availableTests.length === 0) {
    return null;
  }

  if (variant === 'card') {
    return (
       <div className={`bg-gradient-to-r ${categoryInfo.gradient} rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="flex flex-col sm:flex-row">
        
        {/* Icon Section - 30% width on desktop, full width on mobile */}
        <div className="flex items-center justify-center bg-white bg-opacity-10 p-8 sm:w-[20%]">
          <Brain className="w-20 h-20 sm:w-24 sm:h-24 text-white" />
        </div>

        {/* Content Section - 70% width on desktop, full width on mobile */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {categoryInfo.name}
          </h2>
          <p className="text-white text-opacity-90 mb-6 text-sm sm:text-base leading-relaxed">
            {categoryInfo.description}
          </p>
          <button
            onClick={handleClick}
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all hover:shadow-md w-full sm:w-auto sm:inline-flex sm:items-center sm:justify-center"
          >
            Start New Assessment
          </button>
        </div>

      </div>
    </div>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        onClick={handleClick}
        className={`px-4 py-2 text-cyan-600 bg-cyan-50 border border-cyan-200 rounded-lg hover:bg-cyan-100 transition-colors font-medium ${className}`}
      >
        Start New Assessment
      </button>
    );
  }

  if (variant === 'minimalist') {
    return (
      <button
        onClick={handleClick}
        className={`group rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:shadow-md hover:border-cyan-600 ${className}`}
      >
        <div className="mb-3 flex items-center">
          <span className="text-3xl">{categoryInfo.icon}</span>
          <h3 className="text-xl font-semibold text-gray-900">
            {categoryInfo.name}
          </h3>
        </div>
        <p className="mb-4 text-sm text-gray-600 leading-relaxed">
          {categoryInfo.description}
        </p>
        <div className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 transition-colors duration-200">
          <span className='group-hover:underline'>Start New Assessment</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold ${className}`}
    >
      Start {categoryInfo.shortName}
    </button>
  );
}