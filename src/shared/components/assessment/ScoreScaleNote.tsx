import { SCORE_SCALE_DISCLAIMER } from '@/shared/constants/scoreInterpretation';

export default function ScoreScaleNote() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
      <p className="text-sm text-gray-700">{SCORE_SCALE_DISCLAIMER}</p>
    </div>
  );
}
