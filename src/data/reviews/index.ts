import type { PartyResponse } from '../../types'
import { questionRevisions } from '../questionRevisions'
import { questions } from '../questions'
import { climateGapsReview } from './climateGaps20260925'
import { economyReview } from './economy20260925'
import { framingReview } from './framing20260925'
import { freedomReview } from './freedom20260925'
import { incomeReview } from './income20260925'
import { lawReview } from './law20260925'
import { animalsReview } from './animals20260926'
import { climateWorldReview } from './climateWorld20260926'
import { economyReview20260926 } from './economy20260926'
import { freedom20260926Review } from './freedom20260926'
import { law20260926Review } from './law20260926'

export interface ResponseReviewBatch {
  date: string
  questionRevisions: Record<string, number>
  reviews: Record<string, PartyResponse[]>[]
}

export const responseReviewBatches: ResponseReviewBatch[] = [
  {
    date: '2026-09-25',
    questionRevisions: { s21: 1, s35: 1, v02: 1, v21: 1 },
    reviews: [climateGapsReview, economyReview, framingReview, freedomReview, incomeReview, lawReview],
  },
  {
    date: '2026-09-26',
    // Snapshot of the wording assessed in this batch, deliberately not a live reference.
    questionRevisions: {
      s02: 1, s08: 1, s11: 1, s15: 1, s18: 1, s19: 1, s20: 1, s21: 1,
      s22: 1, s23: 1, s25: 1, s26: 1, s28: 1, s30: 1, s35: 1, s38: 1,
      s39: 1, s41: 1, s43: 1, s45: 1, s49: 1, s51: 1,
      v02: 1, v05: 1, v14: 1, v21: 1,
    },
    reviews: [animalsReview, climateWorldReview, economyReview20260926, freedom20260926Review, law20260926Review],
  },
]

export const responseReviews = responseReviewBatches.flatMap((batch) => batch.reviews)

// Keep the original source coding and dated review decisions separately auditable.
// Explicit nulls also replace old answers when the old evidence is insufficient.
export function applyResponseReviews(partyId: string, original: PartyResponse[]): PartyResponse[] {
  const responses = new Map(original.map((response) => [response.questionId, { response, revision: 0 }]))
  for (const batch of responseReviewBatches) {
    for (const review of batch.reviews) {
      for (const response of review[partyId] ?? []) {
        responses.set(response.questionId, {
          response,
          revision: batch.questionRevisions[response.questionId] ?? 0,
        })
      }
    }
  }
  // Old wording must never silently supply a score for a revised question.
  // Mapping the current bank also retires removed ids and completes new ones.
  return questions.map((question) => {
    const reviewed = responses.get(question.id)
    if (reviewed && reviewed.revision === (questionRevisions[question.id] ?? 0)) {
      return reviewed.response
    }
    return {
      questionId: question.id,
      value: null,
      confidence: 'unknown',
      evidence: [],
      rationale: reviewed
        ? 'Tidigare bedömning avsåg en annan frågeformulering. Tillräckligt belägg för den nya frågan saknas.'
        : 'Tillräckligt tydligt belägg för just detta påstående saknas i det granskade underlaget.',
    }
  })
}
