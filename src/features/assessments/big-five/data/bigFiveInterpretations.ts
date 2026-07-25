import type { BigFiveScores } from '@/core/db/database';
import type { ScoreBand } from './bigFiveScoreBands';

export type { ScoreBand } from './bigFiveScoreBands';

export interface TraitInterpretation {
  summary: string[];
  commonCharacteristics: string[];
  strengths: string[];
  challenges: string[];
  tipsForGrowth: string[];
}

export const TRAIT_INTERPRETATIONS: Record<keyof BigFiveScores, Record<ScoreBand, TraitInterpretation>> = {
  extraversion: {
    high: {
      summary: [
        'You score high on Extraversion. Being around people usually gives you energy rather than draining you. You often enjoy talking, meeting new people, and being part of busy social settings.',
        'You often think by talking things through with others instead of keeping your thoughts to yourself. Group settings usually bring out your best. You both gain and share energy from the people around you.',
        'This doesn\'t mean you\'re always social. Even highly extraverted people need quiet time, especially after a lot of social activity. Still, your natural preference is to connect with others rather than spend long periods alone.',
      ],
      commonCharacteristics: [
        'Talkative and expressive in most situations',
        'Comfortable starting conversations with new people',
        'Enjoys variety, activity, and social interaction',
        'Likes to think by talking things through with others',
      ],
      strengths: [
        'Builds connections with people easily',
        'Speaks up confidently in groups and meetings',
        'Brings energy and enthusiasm to others',
        'Adjusts easily to new social situations',
      ],
      challenges: [
        'Long periods of working alone may feel difficult',
        'May talk more than intended without realizing it',
        'May take on too many social activities and feel drained later',
        'Very quiet environments may feel boring',
      ],
      tipsForGrowth: [
        'Make time for quiet, focused work without distractions',
        'Pause before responding to give others time to speak',
        'Leave some free time in your schedule to rest after social activities',
      ],
    },

    mid: {
      summary: [
        'You score in the mid-range on Extraversion. This suggests a balance between social engagement and solitude, rather than a strong preference for either.',
        'You can enjoy being with people when needed, and you also enjoy spending time on your own. Both feel natural to you.',
      ],
      commonCharacteristics: [
        'Comfortable in both social situations and time alone',
        'Your energy changes depending on the people and the situation',
        'You enjoy social interaction but also value quiet time',
      ],
      strengths: [
        'Can adapt to different social situations',
        'Easy for many people to get along with',
        'Can relate well to both quieter and more outgoing people',
      ],
      challenges: [
        'May stay in your comfort zone instead of doing what the situation needs',
        'Less visible in high-energy settings if not intentional about speaking up',
      ],
      tipsForGrowth: [
        'When a situation calls for it, be willing to take the lead or share your ideas',
        'Pay attention to times when speaking up or joining in can make a positive difference',
      ],
    },
    low: {
      summary: [
        'You score low on Extraversion, which means you lean toward Introversion. Time alone helps you recharge, and you may prefer smaller groups or one-on-one conversations over large social gatherings. This is a difference in energy style, not a flaw or a weakness.',
        'You may prefer to think things through before speaking, and when you do share your thoughts, they often feel well considered. Social activities can leave you feeling tired because they use your energy. Quiet time helps you recharge.',
        'This does not mean you avoid people or social activities. You can enjoy both. Your natural preference is simply to recharge through quieter moments rather than frequent social interaction.',
      ],
      commonCharacteristics: [
        'Prefers meaningful conversations over casual small talk',
        'Feels refreshed after spending time alone',
        'Often takes a moment to think before speaking',
        'Comfortable working independently for long periods',
      ],
      strengths: [
        'Able to focus deeply on important tasks',
        'Shares ideas in a thoughtful and careful way',
        'Builds close and meaningful relationships',
        'Able to work independently while staying productive',
      ],
      challenges: [
        'Networking and promoting yourself may not come naturally',
        'Contributions can go unnoticed in fast-paced group discussions',
        'Long periods of social interaction can leave you feeling tired',
      ],
      tipsForGrowth: [
        'Prepare a few key points before meetings so it feels easier to speak up',
        'Focus on having a few genuine conversations instead of trying to meet everyone',
        'Share your ideas when you are ready instead of waiting for the perfect moment',
      ],
    },
  },

  agreeableness: {
    high: {
      summary: [
        'You score high on Agreeableness. Warmth, cooperation, and consideration for others come naturally to you, and people often trust you quickly.',
        'You notice how people around you are feeling and adjust to keep things smooth. This makes you a natural collaborator and peacemaker. But your own needs or opinions can get pushed aside while you\'re busy keeping everyone else comfortable.',
      ],
      commonCharacteristics: [
        'Cooperative and considerate by default',
        'Quick to build trust with others',
        'Highly attentive to others\' emotional states',
        'Prioritizes harmony in group settings',
      ],
      strengths: [
        'Creates psychologically safe, collaborative environments',
        'Earns trust quickly',
        'Finds common ground effectively in conflict',
        'Reads others\' emotional states accurately',
      ],
      challenges: [
        'Struggles to say no, leading to overcommitment',
        'Avoids difficult conversations, even when they are necessary',
        'More vulnerable to being taken advantage of in competitive settings',
        'Own needs get deprioritized in the moment',
      ],
      tipsForGrowth: [
        'Practice stating your needs and disagreements directly. Warmth and directness can coexist',
        'Ask whether you\'re avoiding conflict for genuine peace, or out of discomfort',
        'Treat boundary-setting as compatible with kindness, not opposed to it',
      ],
    },
    mid: {
      summary: [
        'You score in the mid-range on Agreeableness. You balance cooperation with assertiveness depending on the situation, rather than defaulting strongly to either.',
        'You can be diplomatic when needed and direct when it is important to be honest. That flexibility tends to come naturally rather than through deliberate effort.',
      ],
      commonCharacteristics: [
        'Often seen as fair and balanced, neither too accommodating nor overly confrontational',
        'Collaborates while still advocating for your own position',
        'Comfortable in both cooperative and competitive contexts',
      ],
      strengths: [
        'Mediates well between more agreeable and more assertive people',
        'Adjusts cooperativeness based on what the situation actually needs',
      ],
      challenges: [
        'Can come across as inconsistent if warmth and directness aren\'t applied deliberately',
        'Uncertain in situations that call for a clearly empathetic or clearly firm stance',
      ],
      tipsForGrowth: [
        'Be intentional about when to compromise and when to stand your ground',
        'Practice giving honest feedback in a respectful way',
      ],
    },

    low: {
      summary: [
        'You score low on Agreeableness, which leans toward directness, skepticism, and a focus on results over social harmony. This is more about communication and decision-making style than about how much you care about people, and it is not a character flaw.',
        'You question rather than comply. You\'re willing to say things others avoid saying. That honesty is valuable, but it can create friction in teams that depend on trust and close relationships.',
        'This does not mean you\'re uncaring or unkind. You can be direct and still be considerate. The two are not opposites.',
      ],

      commonCharacteristics: [
        'Direct and unfiltered in communication',
        'Skeptical of claims without evidence',
        'Focused on outcomes over agreement',
        'Comfortable with confrontation when necessary',
      ],
      strengths: [
        'Communicates honestly and directly',
        'Resists social pressure and groupthink',
        'Drives results in competitive or high-stakes settings',
        'Gives honest feedback others avoid',
      ],
      challenges: [
        'Can come across as too direct or insensitive, even unintentionally',
        'May make teamwork harder by putting less emphasis on relationships',
        'Risks prioritizing being right over being effective',
      ],
      tipsForGrowth: [
        'Consider emotional impact alongside factual accuracy before speaking',
        'Lead with a clarifying question before offering critique',
        'Remember that trust and strong relationships also drive long-term results',
      ],
    },
  },

  conscientiousness: {
    high: {
      summary: [
        'You score high on Conscientiousness. You\'re organized, disciplined, and reliable, the kind of person others rely on to follow through without needing reminders.',
        'You plan ahead and hold yourself to consistent standards. You can sustain effort toward long-term goals without much external pressure. The flip side: unexpected changes or unclear expectations from others can be genuinely frustrating for you.',
      ],
      commonCharacteristics: [
        'Plans ahead and sticks to commitments',
        'Holds high personal standards',
        'Self-directed with minimal need for oversight',
        'Detail-oriented and thorough',
      ],
      strengths: [
        'Highly reliable and dependable',
        'Sustains effort toward long-term goals',
        'Needs little external structure to stay on track',
        'Consistently follows through on responsibilities',
      ],
      challenges: [
        'Inflexible when plans change unexpectedly',
        'Perfectionism can slow down progress',
        'Struggles to delegate or trust others\' standards',
        'Structure can tip into rigidity, affecting work-life balance',
      ],
      tipsForGrowth: [
        'Build in deliberate flexibility, since good outcomes sometimes come from improvising',
        'Set a "good enough" threshold for lower-stakes tasks',
        'When working with others, be clear about the outcome while allowing flexibility in how it is achieved',
      ],
    },

    mid: {
      summary: [
        'You score in the mid-range on Conscientiousness. You bring structure when it matters most, without being bound to rigid systems the rest of the time.',
        'Planning and spontaneity both feel available to you. You\'ll organize carefully around something you care about and let smaller things unfold more loosely.',
      ],
      commonCharacteristics: [
        'Flexible enough to adapt without losing overall direction',
        'Comfortable with some uncertainty',
        'Functions well in both structured and unstructured environments',
      ],
      strengths: [
        'Adapts without losing sight of the bigger picture',
        'Doesn\'t over-plan or over-structure',
        'Comfortable in both structured and unstructured environments',
      ],
      challenges: [
        'Consistency fluctuates with motivation',
        'Lower-priority tasks are prone to slipping',
      ],
      tipsForGrowth: [
        'Build lightweight routines around your highest-priority areas',
        'Before assuming you lack motivation, check whether the task just needs more clarity',
      ],
    },
    low: {
      summary: [
        'You score low on Conscientiousness, which leans toward spontaneity and comfort with change over rigid planning. It comes down to style rather than ability or intelligence.',
        'You\'re quick to adapt and comfortable improvising. But long-term follow-through and attention to detail are more likely to slip without some kind of external system in place.',
      ],
      commonCharacteristics: [
        'Comfortable with change and ambiguity',
        'Prefers action over extensive planning',
        'Flexible about deadlines and structure',
      ],
      strengths: [
        'Highly adaptable in dynamic, fast-changing environments',
        'Comfortable with improvisation and open-ended situations',
        'Leans toward action rather than getting stuck planning',
      ],
      challenges: [
        'Long-term follow-through is harder to sustain without external structure',
        'Deadlines and details slip without reminders or systems',
        'Can be perceived as unreliable even when output quality is good',
        'Disorganization creates avoidable stress over time',
      ],
      tipsForGrowth: [
        'Use a minimal external system, like a single to-do list or shared calendar, to catch what memory drops',
        'Break big tasks into smaller, clear steps',
        'Communicate proactively about timelines to build trust',
      ],
    },
  },

  neuroticism: {
    high: {
      summary: [
        'You score high on Neuroticism, sometimes described as lower emotional stability. You experience negative emotions like worry, stress, or self-doubt more intensely or more often than most people. It isn\'t a diagnosis or a character flaw. It\'s a common trait, and one that coexists with a full, functional life.',
        'You\'re likely more attuned to your own emotional state and to potential risks than most people. This has a real upside. The downside: stress responses can feel disproportionate to the situation, and recovery from setbacks can take longer.',
      ],
      commonCharacteristics: [
        'Experiences stress and worry more intensely than average',
        'Highly attuned to own emotional state',
        'Sensitive to potential risks or threats',
        'Recovery from setbacks takes longer than average',
      ],
      strengths: [
        'Heightened emotional awareness',
        'Strong empathy, drawn from familiarity with difficult emotions',
        'Notices risks others miss',
        'Emotional depth fuels creative or reflective work',
      ],
      challenges: [
        'Stress responses can feel disproportionate to the trigger',
        'Strong emotions can sometimes lead to decisions you may regret later',
        'Recovery from setbacks takes longer',
        'Persistent worry is draining over time',
      ],
      tipsForGrowth: [
        'Build healthy daily habits like good sleep, regular exercise, healthy eating, and breathing exercises to help manage stress',
        'Ask yourself whether your worries are helping you take action or just keeping you stuck',
        'Question worst-case thoughts before assuming they are likely to happen',
        'If stress feels hard to manage day to day, consider talking to a therapist or counselor',
      ],
    },

    mid: {
      summary: [
        'You score in the mid-range on Neuroticism. You experience stress and difficult emotions much like most people, usually without them disrupting your daily life for long.',
        'Some situations may affect you more than others, but you generally recover within a reasonable amount of time rather than staying distressed.',
      ],
      commonCharacteristics: [
        'Experiences normal emotional ups and downs',
        'Generally recovers from setbacks within a reasonable time',
        'Emotionally aware without being frequently overwhelmed',
      ],
      strengths: [
        'Stays emotionally balanced in most situations',
        'Empathizes with others while staying grounded',
        'Usually bounces back after stressful experiences',
      ],
      challenges: [
        'Stress can sometimes build up without being noticed',
        'High-pressure situations may temporarily increase emotional reactions',
      ],
      tipsForGrowth: [
        'Notice early signs of stress before they build up',
        'Make time for regular recovery through rest and activities that help you recharge',
      ],
    },
    low: {
      summary: [
        'You score low on Neuroticism, meaning you\'re emotionally stable. Stressful situations are less likely to strongly disrupt your mood, and staying calm under pressure comes naturally.',
        'At times, your calmness may make it harder to notice when others are experiencing more stress or emotional distress than you are.',
      ],

      commonCharacteristics: [
        'Stays composed under pressure',
        'Recovers quickly from criticism or setbacks',
        'Rarely feels overwhelmed by stressful situations',
      ],

      strengths: [
        'Stays calm in high-pressure situations',
        'Makes decisions without being easily influenced by anxiety',
        'Recovers quickly from setbacks or criticism',
        'Lower day-to-day stress supports long-term wellbeing',
      ],
      challenges: [
        'May underestimate how stressful a situation feels for others',
        'May not notice when others are feeling stressed or upset',
        'Can sometimes appear emotionally distant or unaffected',
      ],
      tipsForGrowth: [
        'Take time to understand how others are feeling, even when you remain calm',
        'Remember that people may react differently to the same situation',
        'In close relationships, make a point of expressing care and support, even when you don\'t feel stressed yourself',
      ],
    },
  },

  openness: {
    high: {
      summary: [
        'You score high on Openness to Experience. Curiosity, imagination, and a love of learning come naturally to you. You enjoy exploring new ideas and experiences, are comfortable when there isn\'t a clear answer, and often connect ideas from different areas.',
        'This trait is linked to creativity and intellectual curiosity, though it doesn\'t by itself predict skill in any specific area. You may enjoy exploring possibilities more than following familiar routines, so repetitive tasks can sometimes feel less engaging.',
      ],
      commonCharacteristics: [
        'Enjoys exploring new ideas and experiences',
        'Comfortable thinking about complex or open-ended ideas',
        'Curious about many different topics',
        'Enjoys connecting ideas from different fields',
      ],
      strengths: [
        'Open to new ideas and experiences',
        'Finds connections between ideas from different areas',
        'Comfortable with complex ideas and situations without clear answers',
        'Adapts easily to new situations and ways of thinking',
      ],
      challenges: [
        'May lose interest once the excitement of a new idea fades',
        'Routine or repetitive tasks may feel less engaging',
        'Can spend too much time exploring different possibilities',
        'May overcomplicate problems that have simple solutions',
      ],
      tipsForGrowth: [
        'Set clear deadlines to turn ideas into action',
        'Practice finishing one project before starting another',
        'Use simple routines to stay on top of repetitive but important tasks',
      ],
    },
    mid: {
      summary: [
        'You score in the mid-range on Openness to Experience. You enjoy new ideas and creative thinking while also appreciating practical, proven approaches when they work best.',
        'You like trying new things, but you don\'t feel the need to constantly seek change. You can explore new possibilities while also being happy with familiar and reliable ways of doing things.',
      ],
      commonCharacteristics: [
        'Balances curiosity with practicality',
        'Open to new ideas while valuing proven approaches',
        'Comfortable with both structure and exploring new possibilities',
      ],

      strengths: [
        'Balances creative thinking with practical decision-making',
        'Comfortable with both new ideas and familiar approaches',
        'Can see different perspectives without losing focus on what works',
      ],
      challenges: [
        'May stick with familiar solutions when a new approach could work better',
        'Creative ideas may need a little time or effort to develop',
      ],

      tipsForGrowth: [
        'Explore new topics and perspectives to keep learning and growing',
        'When you\'re stuck, ask yourself how someone with a completely different viewpoint might solve the problem',
      ],

    },
    low: {
      summary: [
        'You score low on Openness to Experience, meaning you tend to prefer practical, familiar approaches over experimenting with new ideas. This reflects a difference in thinking style, not intelligence or ability.',
        'You value what has been proven to work and often focus on practical results. While this can help you stay grounded and consistent, you may be slower to adopt new ideas or consider different ways of doing things.',
      ],
      commonCharacteristics: [
        'Prefers proven methods over new or untested ideas',
        'Values practical solutions and concrete results',
        'Prefers clear, straightforward discussions over abstract ideas',
      ],
      strengths: [
        'Focuses on practical solutions that work',
        'Reliable and consistent in familiar situations',
        'Builds deep knowledge through experience',
        'Less influenced by trends or unproven claims',
      ],
      challenges: [
        'May hesitate to try new approaches',
        'May miss creative ways to solve problems',
        'Abstract or highly theoretical discussions may feel less useful',
      ],
      tipsForGrowth: [
        'When you\'re stuck, ask someone with a different perspective for ideas',
        'Give new approaches a fair chance before deciding they won\'t work',
        'Remember that "new" doesn\'t always mean "bad" and "familiar" doesn\'t always mean "best"',
      ],
    },
  },
};