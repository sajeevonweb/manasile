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
    q: 'Do I need to sign up or provide an email to take the test?',
    a: 'No account or email is required. We only ask for a name or nickname to personalize your results. This information stays on your device, is never uploaded or shared, and you can use any name, nickname, or label you like.',
  },
  {
    q: 'Is my personality test data really private?',
    a: 'Yes, completely. Unlike other online personality tests that collect your personal information and sell behavioral data, Manasile is built to be a privacy-first platform. We use zero databases and zero backend tracking. Your responses and results stay locally on your device and never leave it.',
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
    q: 'What happens if I clear my browser cache or storage?',
    a: 'Since we respect your privacy and do not store any of your data on external servers, clearing your browser\'s cache or site data will permanently erase your saved results. We currently do not offer a backup or export option.',
  },
];