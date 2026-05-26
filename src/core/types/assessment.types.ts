export type AssessmentCategory = 'big-five'; //Add more Categores here like 'big-five' | 'cognitive' |.......

export type BigFiveAssessmentType = 'big-five-standard' | 'big-five-comprehensive' |'big-five-short';

export type AssessmentType = BigFiveAssessmentType;

export interface AssessmentTypeInfo {
  id: AssessmentType;
  category: AssessmentCategory;
  name: string;
  shortName: string;
  description: string;
  questionCount: number;
  estimatedTime: string;
  measuresCount: string;
  navigationPath: (assessmentId: number) => string;
  requiresSubjectName?: boolean; // Some tests might not need this
}

export interface AssessmentCategoryInfo {
  id: AssessmentCategory;
  name: string;
  shortName: string;
  description: string;
  icon?: string;
  gradient: string; // Tailwind gradient classes
  availableTests: AssessmentType[];
}

export const ASSESSMENT_CATEGORIES: Record<AssessmentCategory, AssessmentCategoryInfo> = {
  'big-five': {
    id: 'big-five',
    name: 'Big Five Personality Test',
    shortName: 'Big Five',
    description: 'Discover your personality traits across five dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
    gradient: 'from-cyan-600 to-teal-600',
    availableTests: ['big-five-short','big-five-standard', 'big-five-comprehensive']
  },
};

export const ASSESSMENT_TYPES: Record<AssessmentType, AssessmentTypeInfo> = {
  'big-five-short': {
    id: 'big-five-short',
    category: 'big-five',
    name: 'Big Five (Short)',
    shortName: 'Short',
    description: 'A quick 25-item assessment measuring the five major personality dimensions',
    questionCount: 25,
    estimatedTime: '5-10 minutes',
    measuresCount: '5 traits',
    navigationPath: (id) => `/big-five-short/${id}`,
    requiresSubjectName: true
  },
  'big-five-standard': {
    id: 'big-five-standard',
    category: 'big-five',
    name: 'Big Five (Standard)',
    shortName: 'Standard',
    description: 'A quick 50-item assessment measuring the five major personality dimensions',
    questionCount: 50,
    estimatedTime: '10-15 minutes',
    measuresCount: '5 traits',
    navigationPath: (id) => `/big-five-standard/${id}`,
    requiresSubjectName: true
  },
  'big-five-comprehensive': {
    id: 'big-five-comprehensive',
    category: 'big-five',
    name: 'Big Five (Comprehensive)',
    shortName: 'Comprehensive',
    description: 'An in-depth 120-item assessment measuring the five major personality dimensions',
    questionCount: 120,
    estimatedTime: '15-20 minutes',
    measuresCount: '5 traits',
    navigationPath: (id) => `/big-five-comprehensive/${id}`,
    requiresSubjectName: true
  }
  // Future assessments will be added here
  // 'eq-test': { ... },
  // 'career-match': { ... },
};