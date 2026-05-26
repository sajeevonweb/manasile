import type { PersonalityFacet } from './comprehensive';

export type BigFiveTrait = 'extraversion' | 'agreeableness' | 'conscientiousness' | 'neuroticism' | 'openness';

export interface StandardQuestion {
  id: string;
  text: string;
  trait: BigFiveTrait;
  facet: PersonalityFacet;
  keyed: 'plus' | 'minus';
}

export const BIG_FIVE_TRAITS: Record<BigFiveTrait, { 
  name: string; 
  description: string;
  color: string;
}> = {
  extraversion: {
    name: 'Extraversion',
    description: 'Extraversion reflects how socially outgoing, energetic, and expressive a person tends to be.',
    color: '#F59E0B',
  },
  agreeableness: {
    name: 'Agreeableness',
    description: 'Agreeableness reflects how compassionate, cooperative, and considerate a person tends to be toward others.',
    color: '#8B5CF6',
  },
  conscientiousness: {
    name: 'Conscientiousness',
    description: 'Conscientiousness reflects how organized, responsible, and self-disciplined a person tends to be.',
    color: '#10B981',
  },
  neuroticism: {
    name: 'Neuroticism',
    description: 'Neuroticism reflects how strongly a person tends to experience stress, worry, and emotional instability.',
    color: '#EF4444',
  },
  openness: {
    name: 'Openness to Experience',
    description: 'Openness to Experience reflects how curious, imaginative, and open to new ideas and experiences a person tends to be',
    color: '#3B82F6',
  },
};

export const QUESTIONS_PER_PAGE = 5;

// Calculate Big Five scores from responses using big-five-standard scoring
export function calculateStandardScores(
  responses: Record<string, number>,
  questions: StandardQuestion[]
): {
  extraversion: number;
  agreeableness: number;
  conscientiousness: number;
  neuroticism: number;
  openness: number;
} {
  const traitScores: Record<BigFiveTrait, number[]> = {
    extraversion: [],
    agreeableness: [],
    conscientiousness: [],
    neuroticism: [],
    openness: [],
  };

  questions.forEach((question) => {
    const response = responses[question.id];
    if (response !== undefined) {
      // Reverse score for negatively keyed items (minus keyed)
      // For minus keyed: 1->5, 2->4, 3->3, 4->2, 5->1
      const score = question.keyed === 'minus' ? 6 - response : response;
      traitScores[question.trait].push(score);
    }
  });

  // Calculate average for each trait and convert to 0-100 scale
  const calculateTraitScore = (scores: number[]): number => {
    if (scores.length === 0) return 0;
    const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    // Convert from 1-5 scale to 0-100 scale
    return Math.round(((avg - 1) / 4) * 100);
  };

  return {
    extraversion: calculateTraitScore(traitScores.extraversion),
    agreeableness: calculateTraitScore(traitScores.agreeableness),
    conscientiousness: calculateTraitScore(traitScores.conscientiousness),
    neuroticism: calculateTraitScore(traitScores.neuroticism),
    openness: calculateTraitScore(traitScores.openness),
  };
}