export function buildQuestionFacets(
  questions: ReadonlyArray<{ id: string; facet: string }>
): Record<string, string> {
  return Object.fromEntries(questions.map((q) => [q.id, q.facet]));
}
