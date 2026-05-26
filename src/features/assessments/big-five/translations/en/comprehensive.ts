import type { ComprehensiveQuestion } from '../../data/comprehensive';

export const Comprehensive_QUESTIONS_EN: ComprehensiveQuestion[] = [

  // EXTRAVERSION
  // — Friendliness ————————————————————————————————————————————————————————
  { id: 'E1', text: 'I find it easy to start conversations with people I have just met', trait: 'extraversion', facet: 'friendliness', keyed: 'plus' },
  { id: 'E2', text: 'I genuinely enjoy getting to know new people', trait: 'extraversion', facet: 'friendliness', keyed: 'plus' },
  { id: 'E3', text: 'I tend to keep my distance from people I do not know well', trait: 'extraversion', facet: 'friendliness', keyed: 'minus' },
  { id: 'E4', text: 'I find it hard to open up to people I have recently met', trait: 'extraversion', facet: 'friendliness', keyed: 'minus' },

  // — Gregariousness ——————————————————————————————————————————————————————
  { id: 'E5', text: 'I feel energized when I am around a lot of people', trait: 'extraversion', facet: 'gregariousness', keyed: 'plus' },
  { id: 'E6', text: 'I enjoy being part of group activities', trait: 'extraversion', facet: 'gregariousness', keyed: 'plus' },
  { id: 'E7', text: 'I prefer spending time alone rather than in groups', trait: 'extraversion', facet: 'gregariousness', keyed: 'minus' },
  { id: 'E8', text: 'I often feel drained after spending time in large groups', trait: 'extraversion', facet: 'gregariousness', keyed: 'minus' },

  // — Assertiveness ———————————————————————————————————————————————————————
  { id: 'E9',  text: 'I naturally take charge when a group needs direction', trait: 'extraversion', facet: 'assertiveness', keyed: 'plus' },
  { id: 'E10', text: 'I express my opinions openly in conversations', trait: 'extraversion', facet: 'assertiveness', keyed: 'plus' },
  { id: 'E11', text: 'I find it hard to speak up, even when I have something to say', trait: 'extraversion', facet: 'assertiveness', keyed: 'minus' },
  { id: 'E12', text: 'I feel comfortable sharing opinions that differ from others', trait: 'extraversion', facet: 'assertiveness', keyed: 'plus' },

  // — Activity Level ——————————————————————————————————————————————————————
  { id: 'E13', text: 'I naturally keep myself busy throughout the day', trait: 'extraversion', facet: 'activity_level', keyed: 'plus' },
  { id: 'E14', text: 'I prefer a fast-paced daily routine', trait: 'extraversion', facet: 'activity_level', keyed: 'plus' },
  { id: 'E15', text: 'I prefer staying active rather than having nothing to do', trait: 'extraversion', facet: 'activity_level', keyed: 'plus' },
  { id: 'E16', text: 'I often feel low on energy even without much activity', trait: 'extraversion', facet: 'activity_level', keyed: 'minus' },
  

  // — Excitement Seeking ——————————————————————————————————————————————————
  { id: 'E17', text: 'I look for activities that feel exciting and stimulating', trait: 'extraversion', facet: 'excitement_seeking', keyed: 'plus' },
  { id: 'E18', text: 'I enjoy trying things that are new and unpredictable', trait: 'extraversion', facet: 'excitement_seeking', keyed: 'plus' },
  { id: 'E19', text: 'I enjoy being in situations where a lot is happening at once', trait: 'extraversion', facet: 'excitement_seeking', keyed: 'plus' },
  { id: 'E20', text: 'I prefer calm and predictable situations over intense ones', trait: 'extraversion', facet: 'excitement_seeking', keyed: 'minus' },

  // — Cheerfulness ————————————————————————————————————————————————————————
  { id: 'E21', text: 'I express positive emotions easily', trait: 'extraversion', facet: 'cheerfulness', keyed: 'plus' },
  { id: 'E22', text: 'I laugh and smile easily', trait: 'extraversion', facet: 'cheerfulness', keyed: 'plus' },
  { id: 'E23', text: 'I often lack enthusiasm in my daily life', trait: 'extraversion', facet: 'cheerfulness', keyed: 'minus' },
  { id: 'E24', text: 'I rarely feel excited about upcoming activities', trait: 'extraversion', facet: 'cheerfulness', keyed: 'minus' },
  

  // AGREEABLENESS
  // — Trust ———————————————————————————————————————————————————————————————
  { id: 'A1', text: 'I believe most people have good intentions', trait: 'agreeableness', facet: 'trust', keyed: 'plus' },
  { id: 'A2', text: 'I tend to trust people unless I have a reason to doubt them', trait: 'agreeableness', facet: 'trust', keyed: 'plus' },
  { id: 'A3', text: 'I often question the motives behind what people say', trait: 'agreeableness', facet: 'trust', keyed: 'minus' },
  { id: 'A4', text: 'I find it difficult to trust people I do not know well', trait: 'agreeableness', facet: 'trust', keyed: 'minus' },

  // — Morality ————————————————————————————————————————————————————————————
  { id: 'A5', text: 'I try to be honest even when it is inconvenient', trait: 'agreeableness', facet: 'morality', keyed: 'plus' },
  { id: 'A6', text: 'I tend to communicate my intentions clearly', trait: 'agreeableness', facet: 'morality', keyed: 'plus' },
  { id: 'A7', text: 'I sometimes focus on what benefits me, even if it is not fully fair to others', trait: 'agreeableness', facet: 'morality', keyed: 'minus' },
  { id: 'A8', text: 'When telling a story, I sometimes leave out details that make me look bad', trait: 'agreeableness', facet: 'morality', keyed: 'minus' },

  // — Altruism ————————————————————————————————————————————————————————————
  { id: 'A9',  text: 'I feel good helping others, even when it requires extra effort from me', trait: 'agreeableness', facet: 'altruism', keyed: 'plus' },
  { id: 'A10', text: 'I make time to help others when they need support', trait: 'agreeableness', facet: 'altruism', keyed: 'plus' },
  { id: 'A11', text: 'I often notice and respond to opportunities to assist others', trait: 'agreeableness', facet: 'altruism', keyed: 'plus' },
  { id: 'A12', text: 'I sometimes avoid helping others if it requires significant effort', trait: 'agreeableness', facet: 'altruism', keyed: 'minus' },

  // — Cooperation —————————————————————————————————————————————————————————
  { id: 'A13', text: 'In disagreements, I look for compromises that work for everyone', trait: 'agreeableness', facet: 'cooperation', keyed: 'plus' },
  { id: 'A14', text: 'I try to keep interactions cooperative, even during disagreements', trait: 'agreeableness', facet: 'cooperation', keyed: 'plus' },
  { id: 'A15', text: 'I can be resistant when others suggest different ways of doing things', trait: 'agreeableness', facet: 'cooperation', keyed: 'minus' },
  { id: 'A16', text: 'I try to work with others even when our approaches differ', trait: 'agreeableness', facet: 'cooperation', keyed: 'plus' },

  // — Modesty —————————————————————————————————————————————————————————————
  { id: 'A17', text: 'I do not feel a strong need to impress others with my achievements', trait: 'agreeableness', facet: 'modesty', keyed: 'plus' },
  { id: 'A18', text: 'I tend to downplay my achievements when talking with others', trait: 'agreeableness', facet: 'modesty', keyed: 'plus' },
  { id: 'A19', text: 'I am fine with contributing without receiving much attention for it', trait: 'agreeableness', facet: 'modesty', keyed: 'plus' },
  { id: 'A20', text: 'I tend to highlight my strengths when I am around others', trait: 'agreeableness', facet: 'modesty', keyed: 'minus' },

  // — Sympathy ————————————————————————————————————————————————————————————
  { id: 'A21', text: 'I feel concerned when others are going through difficulties', trait: 'agreeableness', facet: 'sympathy', keyed: 'plus' },
  { id: 'A22', text: 'I can usually tell when someone is emotionally struggling', trait: 'agreeableness', facet: 'sympathy', keyed: 'plus' },
  { id: 'A23', text: 'I usually do not feel emotionally affected by other people\'s problems', trait: 'agreeableness', facet: 'sympathy', keyed: 'minus' },
  { id: 'A24', text: 'I sometimes find it difficult to relate to other people\'s emotions', trait: 'agreeableness', facet: 'sympathy', keyed: 'minus' },


  // CONSCIENTIOUSNESS
  // — Self-Efficacy ———————————————————————————————————————————————————————
  { id: 'C1', text: 'I handle most tasks I take on effectively', trait: 'conscientiousness', facet: 'self_efficacy', keyed: 'plus' },
  { id: 'C2', text: 'I usually know how to handle the tasks I am responsible for', trait: 'conscientiousness', facet: 'self_efficacy', keyed: 'plus' },
  { id: 'C3', text: 'I can usually find a way to complete difficult tasks', trait: 'conscientiousness', facet: 'self_efficacy', keyed: 'plus' },
  { id: 'C4', text: 'I often feel unsure about how to handle difficult tasks', trait: 'conscientiousness', facet: 'self_efficacy', keyed: 'minus' },

  // — Orderliness —————————————————————————————————————————————————————————
  { id: 'C5', text: 'I keep my belongings organized', trait: 'conscientiousness', facet: 'orderliness', keyed: 'plus' },
  { id: 'C6', text: 'I keep my tasks and daily activities organized', trait: 'conscientiousness', facet: 'orderliness', keyed: 'plus' },
  { id: 'C7', text: 'My personal space often gets cluttered', trait: 'conscientiousness', facet: 'orderliness', keyed: 'minus' },
  { id: 'C8', text: 'I struggle to maintain order in my daily routines', trait: 'conscientiousness', facet: 'orderliness', keyed: 'minus' },

  // — Dutifulness —————————————————————————————————————————————————————————
  { id: 'C9',  text: 'I keep my commitments even when it is inconvenient', trait: 'conscientiousness', facet: 'dutifulness', keyed: 'plus' },
  { id: 'C10', text: 'I follow through on my commitments reliably', trait: 'conscientiousness', facet: 'dutifulness', keyed: 'plus' },
  { id: 'C11', text: 'I sometimes put aside difficult tasks to do something more enjoyable', trait: 'conscientiousness', facet: 'dutifulness', keyed: 'minus' },
  { id: 'C12', text: 'I take the responsibilities I\'ve agreed to seriously', trait: 'conscientiousness', facet: 'dutifulness', keyed: 'plus' },

  // — Achievement Striving ————————————————————————————————————————————————
  { id: 'C13', text: 'I set goals and work steadily toward them', trait: 'conscientiousness', facet: 'achievement_striving', keyed: 'plus' },
  { id: 'C14', text: 'I push myself to do more than what is required', trait: 'conscientiousness', facet: 'achievement_striving', keyed: 'plus' },
  { id: 'C15', text: 'I like challenging myself to achieve more', trait: 'conscientiousness', facet: 'achievement_striving', keyed: 'plus' },
  { id: 'C16', text: 'I am satisfied doing only what is necessary', trait: 'conscientiousness', facet: 'achievement_striving', keyed: 'minus' },

  // — Self-Discipline —————————————————————————————————————————————————————
  { id: 'C17', text: 'I usually begin tasks without delaying them', trait: 'conscientiousness', facet: 'self_discipline', keyed: 'plus' },
  { id: 'C18', text: 'Once I start a task, I usually complete it', trait: 'conscientiousness', facet: 'self_discipline', keyed: 'plus' },
  { id: 'C19', text: 'I often take longer than I should to start tasks', trait: 'conscientiousness', facet: 'self_discipline', keyed: 'minus' },
  { id: 'C20', text: 'I get distracted easily when working on difficult tasks', trait: 'conscientiousness', facet: 'self_discipline', keyed: 'minus' },

  // — Cautiousness ————————————————————————————————————————————————————————
  { id: 'C21', text: 'I double-check important things to avoid problems later', trait: 'conscientiousness', facet: 'cautiousness', keyed: 'plus' },
  { id: 'C22', text: 'I take time to think before making decisions', trait: 'conscientiousness', facet: 'cautiousness', keyed: 'plus' },
  { id: 'C23', text: 'I often make decisions without thinking through all the details', trait: 'conscientiousness', facet: 'cautiousness', keyed: 'minus' },
  { id: 'C24', text: 'I sometimes act before fully thinking things through', trait: 'conscientiousness', facet: 'cautiousness', keyed: 'minus' },


  // NEUROTICISM
  // — Anxiety —————————————————————————————————————————————————————————————
  { id: 'N1', text: 'I tend to worry about things before they happen', trait: 'neuroticism', facet: 'anxiety', keyed: 'plus' },
  { id: 'N2', text: 'I often worry when I do not know how things will turn out', trait: 'neuroticism', facet: 'anxiety', keyed: 'plus' },
  { id: 'N3', text: 'I have trouble relaxing when something uncertain is coming up', trait: 'neuroticism', facet: 'anxiety', keyed: 'plus' },
  { id: 'N4', text: 'I do not stay worried for long', trait: 'neuroticism', facet: 'anxiety', keyed: 'minus' },

  // — Anger ———————————————————————————————————————————————————————————————
  { id: 'N5', text: 'Small setbacks frustrate me more than they seem to frustrate others', trait: 'neuroticism', facet: 'anger', keyed: 'plus' },
  { id: 'N6', text: 'I can lose my temper when things become frustrating', trait: 'neuroticism', facet: 'anger', keyed: 'plus' },
  { id: 'N7', text: 'I usually stay calm when things become frustrating', trait: 'neuroticism', facet: 'anger', keyed: 'minus' },
  { id: 'N8', text: 'I do not get angry easily', trait: 'neuroticism', facet: 'anger', keyed: 'minus' },

  // — Depression ——————————————————————————————————————————————————————————
  { id: 'N9',  text: 'I sometimes feel low without a clear reason', trait: 'neuroticism', facet: 'depression', keyed: 'plus' },
  { id: 'N10', text: 'I sometimes feel hopeless even when things seem okay', trait: 'neuroticism', facet: 'depression', keyed: 'plus' },
  { id: 'N11', text: 'I have trouble bouncing back after a difficult day', trait: 'neuroticism', facet: 'depression', keyed: 'plus' },
  { id: 'N12', text: 'I recover quickly after feeling discouraged', trait: 'neuroticism', facet: 'depression', keyed: 'minus' },

  // — Self-Consciousness ——————————————————————————————————————————————————
  { id: 'N13', text: 'I feel uneasy when I think others are judging me', trait: 'neuroticism', facet: 'self_consciousness', keyed: 'plus' },
  { id: 'N14', text: 'I become self-conscious easily in social situations', trait: 'neuroticism', facet: 'self_consciousness', keyed: 'plus' },
  { id: 'N15', text: 'Being the center of attention does not make me uncomfortable', trait: 'neuroticism', facet: 'self_consciousness', keyed: 'minus' },
  { id: 'N16', text: 'I do not feel nervous when people are paying attention to me', trait: 'neuroticism', facet: 'self_consciousness', keyed: 'minus' },

  // — Immoderation ————————————————————————————————————————————————————————
  { id: 'N17', text: 'I sometimes struggle to control my impulses', trait: 'neuroticism', facet: 'immoderation', keyed: 'plus' },
  { id: 'N18', text: 'I sometimes do things impulsively that I later regret', trait: 'neuroticism', facet: 'immoderation', keyed: 'plus' },
  { id: 'N19', text: 'I rarely act on impulses that I later regret', trait: 'neuroticism', facet: 'immoderation', keyed: 'minus' },
  { id: 'N20', text: 'I can act without thinking when emotions become intense', trait: 'neuroticism', facet: 'immoderation', keyed: 'plus' },

  // — Vulnerability ———————————————————————————————————————————————————————
  { id: 'N21', text: 'I feel overwhelmed when dealing with stressful situations', trait: 'neuroticism', facet: 'vulnerability', keyed: 'plus' },
  { id: 'N22', text: 'Stress can make it difficult for me to think clearly', trait: 'neuroticism', facet: 'vulnerability', keyed: 'plus' },
  { id: 'N23', text: 'I usually remain capable and steady during stressful situations', trait: 'neuroticism', facet: 'vulnerability', keyed: 'minus' },
  { id: 'N24', text: 'I tend to handle pressure without becoming overwhelmed', trait: 'neuroticism', facet: 'vulnerability', keyed: 'minus' },


  // OPENNESS
  // — Imagination —————————————————————————————————————————————————————————
  { id: 'O1', text: 'I often imagine possibilities beyond what is happening now', trait: 'openness', facet: 'imagination', keyed: 'plus' },
  { id: 'O2', text: 'I enjoy exploring imaginative ideas even when they are not practical', trait: 'openness', facet: 'imagination', keyed: 'plus' },
  { id: 'O3', text: 'I rarely imagine unusual possibilities', trait: 'openness', facet: 'imagination', keyed: 'minus' },
  { id: 'O4', text: 'I rarely get lost in imaginative thoughts', trait: 'openness', facet: 'imagination', keyed: 'minus' },

  // — Artistic Interests ——————————————————————————————————————————————————
  { id: 'O5', text: 'I enjoy creative or artistic activities', trait: 'openness', facet: 'artistic_interests', keyed: 'plus' },
  { id: 'O6', text: 'I appreciate beauty in art, music, or nature', trait: 'openness', facet: 'artistic_interests', keyed: 'plus' },
  { id: 'O7', text: 'I often notice and appreciate beauty in everyday life', trait: 'openness', facet: 'artistic_interests', keyed: 'plus' },
  { id: 'O8', text: 'I find creative or artistic works less engaging than other activities', trait: 'openness', facet: 'artistic_interests', keyed: 'minus' },

  // — Emotionality ————————————————————————————————————————————————————————
  { id: 'O9',  text: 'I experience my feelings intensely and reflect on them', trait: 'openness', facet: 'emotionality', keyed: 'plus' },
  { id: 'O10', text: 'I often reflect on my inner feelings and what they mean', trait: 'openness', facet: 'emotionality', keyed: 'plus' },
  { id: 'O11', text: 'I rarely reflect on my feelings', trait: 'openness', facet: 'emotionality', keyed: 'minus' },
  { id: 'O12', text: 'I notice subtle changes in how I feel', trait: 'openness', facet: 'emotionality', keyed: 'plus' },

  // — Adventurousness —————————————————————————————————————————————————————
  { id: 'O13', text: 'I try new experiences when I get the chance', trait: 'openness', facet: 'adventurousness', keyed: 'plus' },
  { id: 'O14', text: 'I enjoy stepping outside my usual routines', trait: 'openness', facet: 'adventurousness', keyed: 'plus' },
  { id: 'O15', text: 'I prefer familiar routines over trying new things', trait: 'openness', facet: 'adventurousness', keyed: 'minus' },
  { id: 'O16', text: 'I usually avoid unfamiliar experiences', trait: 'openness', facet: 'adventurousness', keyed: 'minus' },

  // — Intellect ———————————————————————————————————————————————————————————
  { id: 'O17', text: 'I enjoy thinking through complex or abstract problems', trait: 'openness', facet: 'intellect', keyed: 'plus' },
  { id: 'O18', text: 'I enjoy learning about difficult topics', trait: 'openness', facet: 'intellect', keyed: 'plus' },
  { id: 'O19', text: 'I tend to avoid abstract or theoretical discussions', trait: 'openness', facet: 'intellect', keyed: 'minus' },
  { id: 'O20', text: 'I lose interest quickly in conversations about complex ideas', trait: 'openness', facet: 'intellect', keyed: 'minus' },

  // — Liberalism ——————————————————————————————————————————————————————————
  { id: 'O21', text: 'I am comfortable reconsidering traditions when new approaches seem better', trait: 'openness', facet: 'liberalism', keyed: 'plus' },
  { id: 'O22', text: 'I am open to reconsidering my views when I hear new perspectives', trait: 'openness', facet: 'liberalism', keyed: 'plus' },
  { id: 'O23', text: 'I enjoy exploring ideas that challenge assumptions I used to take for granted', trait: 'openness', facet: 'liberalism', keyed: 'plus' },
  { id: 'O24', text: 'I usually stick with my existing views once I have formed them', trait: 'openness', facet: 'liberalism', keyed: 'minus' },
];