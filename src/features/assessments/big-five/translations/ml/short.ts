import type { ShortQuestion } from '../../data/short';

export const Short_QUESTIONS_ML: ShortQuestion[] = [
  // Extraversion
  { id: 'E1', text: 'I feel comfortable meeting new people', trait: 'extraversion', facet: 'friendliness', keyed: 'plus' },
  { id: 'E2', text: 'I prefer spending time alone rather than in groups', trait: 'extraversion', facet: 'gregariousness', keyed: 'minus' },
  { id: 'E3', text: 'I express my opinions openly in conversations', trait: 'extraversion', facet: 'assertiveness', keyed: 'plus' },
  { id: 'E4', text: 'I prefer a busy and active daily routine', trait: 'extraversion', facet: 'activity_level', keyed: 'plus' },
  { id: 'E5', text: 'I often lack enthusiasm in my daily life', trait: 'extraversion', facet: 'cheerfulness', keyed: 'minus' },

  // Agreeableness
  { id: 'A1', text: 'I believe most people have good intentions', trait: 'agreeableness', facet: 'trust', keyed: 'plus' },
  { id: 'A2', text: 'I make time to help others when they need support', trait: 'agreeableness', facet: 'altruism', keyed: 'plus' },
  { id: 'A3', text: 'I can be resistant when others suggest different ways of doing things', trait: 'agreeableness', facet: 'cooperation', keyed: 'minus' },
  { id: 'A4', text: 'I tend to downplay my achievements when talking with others', trait: 'agreeableness', facet: 'modesty', keyed: 'plus' },
  { id: 'A5', text: 'I do not usually feel emotionally affected by other people’s problems', trait: 'agreeableness', facet: 'sympathy', keyed: 'minus' },

  // Conscientiousness
  { id: 'C1', text: 'I keep my belongings organized', trait: 'conscientiousness', facet: 'orderliness', keyed: 'plus' },
  { id: 'C2', text: 'I follow through on my commitments reliably', trait: 'conscientiousness', facet: 'dutifulness', keyed: 'plus' },
  { id: 'C3', text: 'I set goals and work steadily toward them', trait: 'conscientiousness', facet: 'achievement_striving', keyed: 'plus' },
  { id: 'C4', text: 'I often take longer than I should to start tasks', trait: 'conscientiousness', facet: 'self_discipline', keyed: 'minus' },
  { id: 'C5', text: 'I often make decisions without thinking through all the details', trait: 'conscientiousness', facet: 'cautiousness', keyed: 'minus' },

  // Neuroticism
  { id: 'N1', text: 'I tend to worry about things before they happen', trait: 'neuroticism', facet: 'anxiety', keyed: 'plus' },
  { id: 'N2', text: 'I usually stay calm when things become frustrating', trait: 'neuroticism', facet: 'anger', keyed: 'minus' },
  { id: 'N3', text: 'I sometimes feel low without a clear reason', trait: 'neuroticism', facet: 'depression', keyed: 'plus' },
  { id: 'N4', text: 'Being the center of attention does not make me uncomfortable', trait: 'neuroticism', facet: 'self_consciousness', keyed: 'minus' },
  { id: 'N5', text: 'I feel overwhelmed when dealing with stressful situations', trait: 'neuroticism', facet: 'vulnerability', keyed: 'plus' },

  // Openness
  { id: 'O1', text: 'I often imagine possibilities beyond what is happening now', trait: 'openness', facet: 'imagination', keyed: 'plus' },
  { id: 'O2', text: 'I find creative or artistic works less engaging than other activities', trait: 'openness', facet: 'artistic_interests', keyed: 'minus' },
  { id: 'O3', text: 'I usually avoid unfamiliar experiences', trait: 'openness', facet: 'adventurousness', keyed: 'minus' },
  { id: 'O4', text: 'I enjoy thinking through complex or abstract problems', trait: 'openness', facet: 'intellect', keyed: 'plus' },
  { id: 'O5', text: 'I often reflect on my inner feelings and what they mean', trait: 'openness', facet: 'emotionality', keyed: 'plus' },
];