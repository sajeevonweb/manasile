
interface ProgressBarProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalQuestions: number;
}

export default function ProgressBar({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalQuestions,
}: ProgressBarProps) {
  const progress = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Question {startIndex + 1} - {Math.min(endIndex, totalQuestions)} of {totalQuestions}
        </span>
        <span className="text-sm font-medium text-gray-700">
          Page {currentPage + 1} of {totalPages}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-cyan-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}