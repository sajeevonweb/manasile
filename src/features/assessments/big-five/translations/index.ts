import type { Language } from '@/core/types/language.types';
import type { StandardQuestion } from '../data/standard';
import type { ComprehensiveQuestion } from '../data/comprehensive';
import type { ShortQuestion } from '../data/short';

import { Standard_QUESTIONS_EN } from './en/standard';
// import { Standard_QUESTIONS_ML } from './ml/standard';
import { Comprehensive_QUESTIONS_EN } from './en/comprehensive';
// import { Comprehensive_QUESTIONS_ML } from './ml/comprehensive';
import { Short_QUESTIONS_EN } from './en/short';
// import { Short_QUESTIONS_ML } from './ml/short';
import { shuffleQuestions } from '../utils/seededShuffle';

// Translation lookup for big-five-standard
export function getStandardQuestions(language: Language): StandardQuestion[] {
  switch (language) {
    case 'en':
    // case 'ml':
    //   return Standard_QUESTIONS_ML;
      return shuffleQuestions(Standard_QUESTIONS_EN);
    default:
      return shuffleQuestions(Standard_QUESTIONS_EN); // Fallback to English
  }
}

// Translation lookup for Big Five Short
export function getShortQuestions(language: Language): ShortQuestion[] {
  switch (language) {
    case 'en':
    // case 'ml':
    //   return Short_QUESTIONS_ML;
      return shuffleQuestions(Short_QUESTIONS_EN);
    default:
      return shuffleQuestions(Short_QUESTIONS_EN); // Fallback to English
  }
}

// Translation lookup for comprehensive
export function getComprehensiveQuestions(language: Language): ComprehensiveQuestion[] {
  switch (language) {
    case 'en':
    // case 'ml':
    //   return Comprehensive_QUESTIONS_ML;
      return shuffleQuestions(Comprehensive_QUESTIONS_EN);
    default:
      return shuffleQuestions(Comprehensive_QUESTIONS_EN); // Fallback to English
  }
}

