import type { PersonalityFacet,BigFiveTrait } from './bigFiveTraits';

export interface ShortQuestion {
  id: string;
  text: string;
  trait: BigFiveTrait;
  facet: PersonalityFacet;
  keyed: 'plus' | 'minus';
}

export const QUESTIONS_PER_PAGE = 5;

// Calculate Big Five scores from responses using big-five-standard scoring
export function calculateShortScores(
  responses: Record<string, number>,
  questions: ShortQuestion[]
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