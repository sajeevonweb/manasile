import type { StandardQuestion } from '../../data/standard';

export const Standard_QUESTIONS_EN: StandardQuestion[] = [
  // Extraversion (10 items)
  { id: 'E1', text: 'I find it easy to start conversations with people I have just met', trait: 'extraversion', facet: 'friendliness', keyed: 'plus' },
  { id: 'E2', text: 'I prefer spending time alone rather than in groups', trait: 'extraversion', facet: 'gregariousness', keyed: 'minus' },
  { id: 'E3', text: 'I enjoy being part of group activities', trait: 'extraversion', facet: 'gregariousness', keyed: 'plus' },
  { id: 'E4', text: 'I find it hard to speak up, even when I have something to say', trait: 'extraversion', facet: 'assertiveness', keyed: 'minus' },
  { id: 'E5', text: 'I express my opinions openly in conversations', trait: 'extraversion', facet: 'assertiveness', keyed: 'plus' },
  { id: 'E6', text: 'I prefer a fast-paced daily routine', trait: 'extraversion', facet: 'activity_level', keyed: 'plus' },
  { id: 'E7', text: 'I look for activities that feel exciting and stimulating', trait: 'extraversion', facet: 'excitement_seeking', keyed: 'plus' },
  { id: 'E8', text: 'I often lack enthusiasm in my daily life', trait: 'extraversion', facet: 'cheerfulness', keyed: 'minus' },
  { id: 'E9', text: 'I express positive emotions easily', trait: 'extraversion', facet: 'cheerfulness', keyed: 'plus' },
  { id: 'E10', text: 'Social interactions tend to leave me feeling tired', trait: 'extraversion', facet: 'gregariousness', keyed: 'minus' },

  // Agreeableness (10 items)
  { id: 'A1', text: 'I believe most people have good intentions', trait: 'agreeableness', facet: 'trust', keyed: 'plus' },
  { id: 'A2', text: 'I sometimes focus on what benefits me, even if it is not fully fair to others', trait: 'agreeableness', facet: 'morality', keyed: 'minus' },
  { id: 'A3', text: 'I make time to help others when they need support', trait: 'agreeableness', facet: 'altruism', keyed: 'plus' },
  { id: 'A4', text: 'I sometimes avoid helping others if it requires significant effort', trait: 'agreeableness', facet: 'altruism', keyed: 'minus' },
  { id: 'A5', text: 'In disagreements, I look for compromises that work for everyone', trait: 'agreeableness', facet: 'cooperation', keyed: 'plus' },
  { id: 'A6', text: 'I can be resistant when others suggest different ways of doing things', trait: 'agreeableness', facet: 'cooperation', keyed: 'minus' },
  { id: 'A7', text: 'I tend to downplay my achievements when talking with others', trait: 'agreeableness', facet: 'modesty', keyed: 'plus' },
  { id: 'A8', text: 'I feel concerned when others are going through difficulties', trait: 'agreeableness', facet: 'sympathy', keyed: 'plus' },
  { id: 'A9', text: 'I usually do not feel emotionally affected by other people’s problems', trait: 'agreeableness', facet: 'sympathy', keyed: 'minus' },
  { id: 'A10', text: 'I can usually tell when someone is emotionally struggling', trait: 'agreeableness', facet: 'sympathy', keyed: 'plus' },

  // Conscientiousness (10 items)
  { id: 'C1', text: 'I handle most tasks I take on effectively', trait: 'conscientiousness', facet: 'self_efficacy', keyed: 'plus' },
  { id: 'C2', text: 'My personal space often gets cluttered', trait: 'conscientiousness', facet: 'orderliness', keyed: 'minus' },
  { id: 'C3', text: 'I keep my belongings organized', trait: 'conscientiousness', facet: 'orderliness', keyed: 'plus' },
  { id: 'C4', text: 'I sometimes put aside difficult tasks to do something more enjoyable', trait: 'conscientiousness', facet: 'dutifulness', keyed: 'minus' },
  { id: 'C5', text: 'I follow through on my commitments reliably', trait: 'conscientiousness', facet: 'dutifulness', keyed: 'plus' },
  { id: 'C6', text: 'I set goals and work steadily toward them', trait: 'conscientiousness', facet: 'achievement_striving', keyed: 'plus' },
  { id: 'C7', text: 'I often take longer than I should to start tasks', trait: 'conscientiousness', facet: 'self_discipline', keyed: 'minus' },
  { id: 'C8', text: 'Once I start a task, I usually complete it', trait: 'conscientiousness', facet: 'self_discipline', keyed: 'plus' },
  { id: 'C9', text: 'I often make decisions without thinking through all the details', trait: 'conscientiousness', facet: 'cautiousness', keyed: 'minus' },
  { id: 'C10', text: 'I take time to think before making decisions', trait: 'conscientiousness', facet: 'cautiousness', keyed: 'plus' },

  // Neuroticism (10 items)
  { id: 'N1', text: 'I tend to worry about things before they happen', trait: 'neuroticism', facet: 'anxiety', keyed: 'plus' },
  { id: 'N2', text: 'I do not stay worried for long', trait: 'neuroticism', facet: 'anxiety', keyed: 'minus' },
  { id: 'N3', text: 'Small setbacks frustrate me more than they seem to frustrate others', trait: 'neuroticism', facet: 'anger', keyed: 'plus' },
  { id: 'N4', text: 'I recover quickly after feeling discouraged', trait: 'neuroticism', facet: 'depression', keyed: 'minus' },
  { id: 'N5', text: 'I sometimes feel low without a clear reason', trait: 'neuroticism', facet: 'depression', keyed: 'plus' },
  { id: 'N6', text: 'Being the center of attention does not make me uncomfortable', trait: 'neuroticism', facet: 'self_consciousness', keyed: 'minus' },
  { id: 'N7', text: 'I feel uneasy when I think others are judging me', trait: 'neuroticism', facet: 'self_consciousness', keyed: 'plus' },
  { id: 'N8', text: 'I rarely act on impulses that I later regret', trait: 'neuroticism', facet: 'immoderation', keyed: 'minus' },
  { id: 'N9', text: 'I feel overwhelmed when dealing with stressful situations', trait: 'neuroticism', facet: 'vulnerability', keyed: 'plus' },
  { id: 'N10', text: 'Stress can make it difficult for me to think clearly', trait: 'neuroticism', facet: 'vulnerability', keyed: 'plus' },

  // Openness (10 items)
  { id: 'O1', text: 'I often imagine possibilities beyond what is happening now', trait: 'openness', facet: 'imagination', keyed: 'plus' },
  { id: 'O2', text: 'I rarely imagine unusual possibilities', trait: 'openness', facet: 'imagination', keyed: 'minus' },
  { id: 'O3', text: 'I enjoy creative or artistic activities', trait: 'openness', facet: 'artistic_interests', keyed: 'plus' },
  { id: 'O4', text: 'I rarely reflect on my feelings', trait: 'openness', facet: 'emotionality', keyed: 'minus' },
  { id: 'O5', text: 'I often reflect on my inner feelings and what they mean', trait: 'openness', facet: 'emotionality', keyed: 'plus' },
  { id: 'O6', text: 'I try new experiences when I get the chance', trait: 'openness', facet: 'adventurousness', keyed: 'plus' },
  { id: 'O7', text: 'I lose interest quickly in conversations about complex ideas', trait: 'openness', facet: 'intellect', keyed: 'minus' },
  { id: 'O8', text: 'I enjoy thinking through complex or abstract problems', trait: 'openness', facet: 'intellect', keyed: 'plus' },
  { id: 'O9', text: 'I am open to reconsidering my views when I hear new perspectives', trait: 'openness', facet: 'liberalism', keyed: 'plus' },
  { id: 'O10', text: 'I usually stick with my existing views once I have formed them', trait: 'openness', facet: 'liberalism', keyed: 'minus' },
];