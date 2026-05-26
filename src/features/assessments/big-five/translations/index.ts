import type { Language } from '@/core/types/language.types';
import type { StandardQuestion } from '../data/standard';
import type { ComprehensiveQuestion } from '../data/comprehensive';
import type { ShortQuestion } from '../data/short';

import { Standard_QUESTIONS_EN } from './en/standard';
import { Standard_QUESTIONS_ML } from './ml/standard';
import { Comprehensive_QUESTIONS_EN } from './en/comprehensive';
import { Comprehensive_QUESTIONS_ML } from './ml/comprehensive';
import { Short_QUESTIONS_EN } from './en/short';
import { Short_QUESTIONS_ML } from './ml/short';

// Translation lookup for big-five-standard
export function getStandardQuestions(language: Language): StandardQuestion[] {
  switch (language) {
    case 'en':
      return Standard_QUESTIONS_EN;
    case 'ml':
      return Standard_QUESTIONS_ML;
    default:
      return Standard_QUESTIONS_EN; // Fallback to English
  }
}

// Translation lookup for Big Five Short
export function getShortQuestions(language: Language): ShortQuestion[] {
  switch (language) {
    case 'en':
      return Short_QUESTIONS_EN;
    case 'ml':
      return Short_QUESTIONS_ML;
    default:
      return Short_QUESTIONS_EN; // Fallback to English
  }
}

// Translation lookup for comprehensive
export function getComprehensiveQuestions(language: Language): ComprehensiveQuestion[] {
  switch (language) {
    case 'en':
      return Comprehensive_QUESTIONS_EN;
    case 'ml':
      return Comprehensive_QUESTIONS_ML;
    default:
      return Comprehensive_QUESTIONS_EN; // Fallback to English
  }
}

