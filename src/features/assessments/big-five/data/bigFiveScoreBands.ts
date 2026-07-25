import type { BigFiveScores } from '@/core/db/database';
import type { BigFiveAssessmentType } from '@/core/types/assessment.types';

export type ScoreBand = 'high' | 'mid' | 'low';

export type TestVersion = 'short' | 'standard' | 'comprehensive';

export const ASSESSMENT_TYPE_TO_TEST_VERSION: Record<BigFiveAssessmentType, TestVersion> = {
  'big-five-short': 'short',
  'big-five-standard': 'standard',
  'big-five-comprehensive': 'comprehensive',
};

export const getTestVersion = (assessmentType: BigFiveAssessmentType): TestVersion => {
  const version = ASSESSMENT_TYPE_TO_TEST_VERSION[assessmentType];
  if (!version) {
    throw new Error(`getTestVersion: unrecognized assessmentType "${assessmentType}"`);
  }
  return version;
};
// To understand how low and high values are decided and its reasoning read 'docs\result_interpretation_logic.md'
const TRAIT_BAND_CUTOFFS_BY_VERSION: Record<
  TestVersion,
  Record<keyof BigFiveScores, { low: number; high: number }>
> = {
  short: {
    extraversion:      { low: 44.0, high: 69.0 },
    neuroticism:       { low: 34.0, high: 59.0 },
    conscientiousness: { low: 47.5, high: 70.0 },
    agreeableness:     { low: 50.5, high: 70.5 },
    openness:          { low: 58.0, high: 75.5 },
  },
  standard: {
    extraversion:      { low: 42.5, high: 67.5 },
    neuroticism:       { low: 32.5, high: 57.5 },
    conscientiousness: { low: 47.5, high: 70.0 },
    agreeableness:     { low: 51.5, high: 71.5 },
    openness:          { low: 57.5, high: 75.0 },
  },
  comprehensive: {
    extraversion:      { low: 41.0, high: 66.0 },
    neuroticism:       { low: 34.0, high: 59.0 },
    conscientiousness: { low: 47.5, high: 70.0 },
    agreeableness:     { low: 53.0, high: 73.0 },
    openness:          { low: 59.0, high: 76.5 },
  },
};

const getCutoffs = (testVersion: TestVersion, trait: keyof BigFiveScores) =>
  TRAIT_BAND_CUTOFFS_BY_VERSION[testVersion][trait];

export const getScoreBand = (
  testVersion: TestVersion,
  trait: keyof BigFiveScores,
  score: number
): ScoreBand => {
  if (Number.isNaN(score)) {
    throw new Error(`getScoreBand: score is NaN`);
  }
  if (score < 0 || score > 100) {
    throw new Error(`getScoreBand: score out of range (0-100): ${score}`);
  }

  const { low, high } = getCutoffs(testVersion, trait);
  if (score >= high) return 'high';
  if (score >= low) return 'mid';
  return 'low';
};

export const getScoreBandLabel = (band: ScoreBand): { label: string; className: string } => {
  switch (band) {
    case 'high':
      return { label: 'Higher tendency', className: 'bg-blue-100 text-blue-800' };
    case 'mid':
      return { label: 'Moderate tendency', className: 'bg-cyan-100 text-cyan-800' };
    case 'low':
      return { label: 'Lower tendency', className: 'bg-gray-100 text-gray-800' };
    default: {
      const _exhaustive: never = band;
      throw new Error(`Unhandled ScoreBand: ${String(_exhaustive)}`);
    }
  }
};

export const getDisplayPercentage = (
  testVersion: TestVersion,
  trait: keyof BigFiveScores,
  rawScore: number
): number => {
  if (Number.isNaN(rawScore)) {
    throw new Error(`getDisplayPercentage: score is NaN`);
  }
  const clampedRaw = Math.max(0, Math.min(100, rawScore));
  const { low, high } = getCutoffs(testVersion, trait);

  let pct: number;
  if (clampedRaw <= low) {
    pct = low > 0 ? (clampedRaw / low) * 30 : 0;
  } else if (clampedRaw < high) {
    pct = 30 + ((clampedRaw - low) / (high - low)) * 40;
  } else {
    pct = high < 100 ? 70 + ((clampedRaw - high) / (100 - high)) * 30 : 100;
  }

  return Math.round(Math.max(0, Math.min(100, pct)));
};