// Deterministic PRNG (mulberry32) — same seed always produces the same sequence
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Fixed internal seed - Do not change this
const FIXED_SEED = 42;

// Fisher-Yates shuffle using the fixed seed — always returns the same order
// for the same input array, every time, for every user.
export function shuffleQuestions<T>(array: T[]): T[] {
  const result = [...array];
  const random = mulberry32(FIXED_SEED);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}