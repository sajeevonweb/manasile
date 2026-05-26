export type BigFiveTrait = 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism';

export type OpennessFacet = 'imagination' | 'artistic_interests' | 'emotionality' | 'adventurousness' | 'intellect' | 'liberalism';
export type ConscientiousnessFacet = 'self_efficacy' | 'orderliness' | 'dutifulness' | 'achievement_striving' | 'self_discipline' | 'cautiousness';
export type ExtraversionFacet = 'friendliness' | 'gregariousness' | 'assertiveness' | 'activity_level' | 'excitement_seeking' | 'cheerfulness';
export type AgreeablenessFacet = 'trust' | 'morality' | 'altruism' | 'cooperation' | 'modesty' | 'sympathy';
export type NeuroticismFacet = 'anxiety' | 'anger' | 'depression' | 'self_consciousness' | 'immoderation' | 'vulnerability';

export type PersonalityFacet = OpennessFacet | ConscientiousnessFacet | ExtraversionFacet | AgreeablenessFacet | NeuroticismFacet;

export interface ComprehensiveQuestion {
  id: string;
  text: string;
  trait: BigFiveTrait;
  facet: PersonalityFacet;
  keyed: 'plus' | 'minus';
}

export interface FacetInfo {
  name: string;
  description: string;
}

export interface TraitInfo {
  name: string;
  description: string;
  color: string;
  facets: Record<string, FacetInfo>;
}

export const IPIP_NEO_TRAITS: Record<BigFiveTrait, TraitInfo> = {
  openness: {
    name: 'Openness to Experience',
    description: 'Openness to Experience reflects how curious, imaginative, and open to new ideas and experiences a person tends to be.',
    color: '#3B82F6',
    facets: {
      imagination: {
        name: 'Imagination',
        description: 'Tendency to engage in imagination, fantasy, and creative thinking.'
      },

      artistic_interests: {
        name: 'Artistic Interests',
        description: 'Appreciation for art, beauty, creativity, music, and aesthetically meaningful experiences.'
      },

      emotionality: {
        name: 'Emotionality',
        description: 'Awareness of personal emotions and tendency to reflect on inner feelings.'
      },

      adventurousness: {
        name: 'Adventurousness',
        description: 'Willingness to explore unfamiliar experiences, activities, and ways of doing things.'
      },

      intellect: {
        name: 'Intellect',
        description: 'Interest in complex ideas, abstract thinking, and intellectually challenging topics.'
      },

      liberalism: {
        name: 'Liberalism',
        description: 'Openness to reconsidering existing beliefs, traditions, and perspectives when exposed to new ideas.'
      }
    }
  },

  conscientiousness: {
    name: 'Conscientiousness',
    description: 'Conscientiousness reflects how organized, responsible, and self-disciplined a person tends to be.',
    color: '#10B981',
    facets: {
      self_efficacy: {
        name: 'Self-Efficacy',
        description: 'Confidence in one’s ability to handle responsibilities and complete difficult tasks effectively.'
      },

      orderliness: {
        name: 'Orderliness',
        description: 'Preference for organization, structure, and keeping tasks or environments orderly.'
      },

      dutifulness: {
        name: 'Dutifulness',
        description: 'Tendency to take responsibilities and commitments seriously and follow through reliably.'
      },

      achievement_striving: {
        name: 'Achievement Striving',
        description: 'Motivation to work toward goals, improve performance, and achieve high standards.'
      },

      self_discipline: {
        name: 'Self-Discipline',
        description: 'Ability to start tasks, stay focused, and persist until work is completed.'
      },

      cautiousness: {
        name: 'Cautiousness',
        description: 'Tendency to think carefully and consider consequences before acting or making decisions.'
      }
    }
  },

  extraversion: {
    name: 'Extraversion',
    description: 'Extraversion reflects how socially outgoing, energetic, and expressive a person tends to be.',
    color: '#F59E0B',
    facets: {
      friendliness: {
        name: 'Friendliness',
        description: 'Warmth, openness, and ease in forming social connections with other people.'
      },

      gregariousness: {
        name: 'Gregariousness',
        description: 'Preference for being around people, groups, and socially active environments.'
      },

      assertiveness: {
        name: 'Assertiveness',
        description: 'Comfort with expressing opinions, speaking up, and taking initiative in social situations.'
      },

      activity_level: {
        name: 'Activity Level',
        description: 'Tendency toward an active, busy, and energetic lifestyle.'
      },

      excitement_seeking: {
        name: 'Excitement Seeking',
        description: 'Desire for stimulation, novelty, excitement, and emotionally engaging experiences.'
      },

      cheerfulness: {
        name: 'Cheerfulness',
        description: 'Tendency to experience and express positive emotions, enthusiasm, and enjoyment.'
      }
    }
  },

  agreeableness: {
    name: 'Agreeableness',
    description: 'Agreeableness reflects how compassionate, cooperative, and considerate a person tends to be toward others.',
    color: '#8B5CF6',
    facets: {
      trust: {
        name: 'Trust',
        description: 'Tendency to believe that other people are generally honest, well-intentioned, and trustworthy.'
      },

      morality: {
        name: 'Morality',
        description: 'Preference for honesty, sincerity, fairness, and being genuine in interactions with others.'
      },

      altruism: {
        name: 'Altruism',
        description: 'Willingness to help, support, and care for others, even when effort is required.'
      },

      cooperation: {
        name: 'Cooperation',
        description: 'Preference for compromise, collaboration, and maintaining harmony during disagreements.'
      },

      modesty: {
        name: 'Modesty',
        description: 'Tendency to avoid seeking excessive attention, recognition, or praise for personal achievements.'
      },

      sympathy: {
        name: 'Sympathy',
        description: 'Sensitivity to other people’s emotions and concern for their difficulties and emotional experiences.'
      }
    }
  },

  neuroticism: {
    name: 'Neuroticism',
    description: 'Neuroticism reflects how strongly a person tends to experience stress, worry, and emotional instability.',
    color: '#EF4444',
    facets: {
      anxiety: {
        name: 'Anxiety',
        description: 'Tendency to worry, feel tense, and experience concern about uncertainty or future events.'
      },

      anger: {
        name: 'Anger',
        description: 'Tendency to become frustrated, irritated, or angry when facing setbacks or difficulties.'
      },

      depression: {
        name: 'Depression',
        description: 'Tendency toward sadness, discouragement, hopelessness, or difficulty recovering from negative emotions.'
      },

      self_consciousness: {
        name: 'Self-Consciousness',
        description: 'Sensitivity to being judged, observed, or evaluated by other people.'
      },

      immoderation: {
        name: 'Immoderation',
        description: 'Difficulty resisting impulses or controlling reactions when emotions become strong.'
      },

      vulnerability: {
        name: 'Vulnerability',
        description: 'Tendency to feel overwhelmed, emotionally affected, or mentally strained during stressful situations.'
      }
    }
  }
};


export const QUESTIONS_PER_PAGE = 10;

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