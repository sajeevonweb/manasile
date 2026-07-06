export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: 'What is the Big Five personality test?',
    a: 'The Big Five (also called OCEAN) is one of the most well-researched personality frameworks in psychology. It measures five traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. Based on your responses, the assessment estimates where you fall on each of these dimensions and provides insights into your personality, preferences, and behavioral tendencies.',
  },
  {
    q: 'Which variant should I pick in big five test?',
    a: "All three variants measure the same five personality traits and provide the same type of results. The main difference is reliability: the more questions you answer, the more accurate and consistent your results are likely to be. Choose Short (25 questions) for a quick estimate, Standard (50 questions) for improved reliability, or Comprehensive (120 questions) for the most reliable assessment.",
  },
  {
    q: 'What assessments are available?',
    a: 'Right now, the Big Five Personality Test is available in three variants (Short, Standard, and Comprehensive). More assessments covering different areas of psychology and self-understanding will be adding in the future.',
  },
  {
    q: 'Is my data really private?',
    a: 'Yes, completely. All your results are stored locally in your device.',
  },
  {
    q: 'What happens if I clear my browser cache or storage?',
    a: 'Your data will be permanently lost. All results are stored only on your device and are never backed up to a server. If you clear your browser’s stored website data, your saved results will be erased. We currently do not offer a backup or export option.',
  },
];