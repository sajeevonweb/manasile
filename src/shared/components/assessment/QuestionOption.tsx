interface QuestionOptionProps {
  value: number;
  isSelected: boolean;
  onChange: (value: number) => void;
  labelType?: 'agree-disagree' | 'accuracy';
}

const LABEL_MAP = {
  'agree-disagree': {
    1: 'Strongly Disagree',
    2: 'Disagree',
    3: 'Neutral',
    4: 'Agree',
    5: 'Strongly Agree',
  },
  'accuracy': {
    1: 'Very Inaccurate',
    2: 'Moderately Inaccurate',
    3: 'Neutral',
    4: 'Moderately Accurate',
    5: 'Very Accurate',
  },
};

export default function QuestionOption({
  value,
  isSelected,
  onChange,
  labelType = 'agree-disagree',
}: QuestionOptionProps) {
  const labels = LABEL_MAP[labelType];
  
  return (
    <label
      className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-all min-w-[140px] ${
        isSelected
          ? 'bg-cyan-600 border-cyan-600 text-white shadow-sm'
          : 'border-gray-300 text-gray-600 hover:border-cyan-400 hover:text-cyan-700 bg-white'
      }`}
    >
      <input
        type="radio"
        value={value}
        checked={isSelected}
        onChange={(e) => onChange(Number(e.target.value))}
        className="sr-only"
      />
      {labels[value as keyof typeof labels]}
    </label>
  );
}