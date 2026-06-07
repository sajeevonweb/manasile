import type { PersonalityFacet,BigFiveTrait } from './bigFiveTraits';

export interface ComprehensiveQuestion {
  id: string;
  text: string;
  trait: BigFiveTrait;
  facet: PersonalityFacet;
  keyed: 'plus' | 'minus';
}

export const QUESTIONS_PER_PAGE = 5;

export interface BigFiveScores {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

// Calculate trait scores from responses (facet metadata is stored separately, not scored)
export function calculateComprehensiveScores(
  responses: Record<string, number>,
  questions: ComprehensiveQuestion[]
): BigFiveScores {
  const traitScores: Record<BigFiveTrait, number[]> = {
    openness: [],
    conscientiousness: [],
    extraversion: [],
    agreeableness: [],
    neuroticism: [],
  };

  questions.forEach((question) => {
    const response = responses[question.id];
    if (response !== undefined) {
      const score = question.keyed === 'plus' ? response : 6 - response;
      traitScores[question.trait].push(score);
    }
  });

  const calculateScore = (scores: number[]): number => {
    if (scores.length === 0) return 0;
    const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round(((avg - 1) / 4) * 100);
  };

  return {
    openness: calculateScore(traitScores.openness),
    conscientiousness: calculateScore(traitScores.conscientiousness),
    extraversion: calculateScore(traitScores.extraversion),
    agreeableness: calculateScore(traitScores.agreeableness),
    neuroticism: calculateScore(traitScores.neuroticism),
  };
}