import { questionRevisions } from '../data/questionRevisions'
import { questions } from '../data/questions'
import type { Answers } from '../types'

export function restoreAnswers(saved: unknown, savedRevisions: unknown = {}) {
  const answers: Answers = {}
  const revisedQuestionIds: string[] = []
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) {
    return { answers, revisedQuestionIds }
  }

  const revisions = savedRevisions && typeof savedRevisions === 'object'
    ? savedRevisions as Record<string, unknown>
    : {}
  const values = saved as Record<string, unknown>

  for (const { id } of questions) {
    if (!Object.hasOwn(values, id)) continue
    const value = values[id]
    if (value !== null && (!Number.isInteger(value) || Number(value) < 1 || Number(value) > 5)) continue
    if ((revisions[id] ?? 0) !== (questionRevisions[id] ?? 0)) {
      revisedQuestionIds.push(id)
      continue
    }
    answers[id] = value as Answers[string]
  }

  return { answers, revisedQuestionIds }
}
