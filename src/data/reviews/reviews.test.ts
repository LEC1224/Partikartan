import { describe, expect, it } from 'vitest'
import type { PartyResponse } from '../../types'
import { minorParties } from '../minorParties'
import { parties } from '../parties'
import { questionRevisions } from '../questionRevisions'
import { questions } from '../questions'
import { retiredQuestionIds } from '../retiredQuestions'
import { applyResponseReviews, responseReviewBatches, responseReviews } from './index'

const allParties = [...parties, ...minorParties]

describe('sourced response reviews', () => {
  it('keeps chronological batches, without conflicting decisions within a batch', () => {
    const partyIds = new Set(allParties.map((party) => party.id))
    const questionIds = new Set<string>([...questions.map((question) => question.id), ...retiredQuestionIds])
    expect(responseReviewBatches.map((batch) => batch.date)).toEqual(
      responseReviewBatches.map((batch) => batch.date).sort(),
    )
    for (const batch of responseReviewBatches) {
      expect(batch.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      const reviewed = new Set<string>()
      for (const review of batch.reviews) {
        for (const [partyId, responses] of Object.entries(review)) {
          expect(partyIds.has(partyId)).toBe(true)
          for (const response of responses) {
            const key = `${partyId}:${response.questionId}`
            expect(questionIds.has(response.questionId), key).toBe(true)
            expect(reviewed.has(key), `Conflicting ${batch.date} decision: ${key}`).toBe(false)
            reviewed.add(key)
          }
        }
      }
    }
  })

  it('reassesses every party when a question changes meaning, including unknown answers', () => {
    for (const party of allParties) {
      const latest = new Map<string, { response: PartyResponse; revision: number }>()
      for (const batch of responseReviewBatches) {
        for (const response of batch.reviews.flatMap((review) => review[party.id] ?? [])) {
          latest.set(response.questionId, { response, revision: batch.questionRevisions[response.questionId] ?? 0 })
        }
      }
      for (const [id, revision] of Object.entries(questionRevisions)) {
        if (!questions.some((question) => question.id === id)) continue
        expect(latest.get(id)?.revision, `${party.id}:${id} revision ${revision}`).toBe(revision)
      }
      // Later decisions and explicit withdrawals supersede earlier reviewed values.
      for (const [id, reviewed] of latest) {
        if (!questions.some((question) => question.id === id)) continue
        const current = party.responses.find((item) => item.questionId === id)
        if (reviewed.revision === (questionRevisions[id] ?? 0)) {
          expect(current, `${party.id}:${id}`).toEqual(reviewed.response)
        } else {
          expect(current?.value, `${party.id}:${id} must reject old wording`).toBeNull()
        }
      }
    }
  })

  it('covers every new question for all 13 parties and excludes all retired questions', () => {
    expect(allParties).toHaveLength(13)
    const activeIds = questions.map((question) => question.id)
    for (const party of allParties) {
      expect(party.responses.map((response) => response.questionId).sort()).toEqual([...activeIds].sort())
      for (const id of ['s52', 's53', 's54', 's55']) {
        expect(responseReviews.some((review) => review[party.id]?.some((response) => response.questionId === id)), `${party.id}:${id}`).toBe(true)
      }
      for (const retiredId of retiredQuestionIds) {
        expect(party.responses.some((response) => response.questionId === retiredId)).toBe(false)
      }
    }
  })

  it('does not reuse a previously valid response when the question revision increments', () => {
    const id = questions[0].id
    const previousRevision = questionRevisions[id]
    const previousBatchCount = responseReviewBatches.length
    const oldRevision = previousRevision ?? 0
    const original: PartyResponse = { questionId: id, value: 5, confidence: 'high', evidence: [] }
    const later: PartyResponse = { ...original, value: 1 }
    try {
      questionRevisions[id] = oldRevision
      responseReviewBatches.push({ date: '2099-01-01', questionRevisions: { [id]: oldRevision }, reviews: [{ fixture: [original] }] })
      expect(applyResponseReviews('fixture', [original]).find((response) => response.questionId === id)?.value).toBe(5)

      questionRevisions[id] = oldRevision + 1
      expect(applyResponseReviews('fixture', [original]).find((response) => response.questionId === id)).toMatchObject({ value: null, confidence: 'unknown', evidence: [] })

      responseReviewBatches.push({ date: '2099-01-02', questionRevisions: { [id]: oldRevision + 1 }, reviews: [{ fixture: [later] }] })
      expect(applyResponseReviews('fixture', [original]).find((response) => response.questionId === id)).toEqual(later)

      // A later explicit unknown is a withdrawal, not permission to fall back.
      const withdrawn: PartyResponse = { ...later, value: null, confidence: 'unknown', rationale: 'Insufficient evidence' }
      responseReviewBatches.push({ date: '2099-01-03', questionRevisions: { [id]: oldRevision + 1 }, reviews: [{ fixture: [withdrawn] }] })
      expect(applyResponseReviews('fixture', [original]).find((response) => response.questionId === id)).toEqual(withdrawn)

      // A new revision also invalidates a previously explicit unknown rationale.
      questionRevisions[id] = oldRevision + 2
      const unreviewed = applyResponseReviews('fixture', [original]).find((response) => response.questionId === id)
      expect(unreviewed?.value).toBeNull()
      expect(unreviewed?.rationale).not.toBe(withdrawn.rationale)
    } finally {
      responseReviewBatches.splice(previousBatchCount)
      if (previousRevision == null) delete questionRevisions[id]
      else questionRevisions[id] = previousRevision
    }
  })

  it('keeps source metadata and certainty consistent with the reviewed answer', () => {
    for (const response of responseReviews.flatMap((review) => Object.values(review).flat())) {
      if (response.value == null) {
        expect(response.confidence).toBe('unknown')
      } else {
        expect(response.value).toBeGreaterThanOrEqual(1)
        expect(response.value).toBeLessThanOrEqual(5)
        expect(response.confidence).not.toBe('unknown')
        expect(response.evidence.length).toBeGreaterThan(0)
        for (const evidence of response.evidence) {
          expect(new URL(evidence.url).protocol).toBe('https:')
          expect(evidence.title.trim()).not.toBe('')
          expect(evidence.accessedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        }
      }
    }
  })
})
