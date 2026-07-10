import { describe, expect, it } from 'vitest'
import feedbackConfig from './feedbackConfig.json'

const validKinds = new Set(['party', 'question', 'select', 'text', 'textarea', 'topic'])

describe('feedback configuration', () => {
  it('uses unique reason and field ids', () => {
    const reasonIds = feedbackConfig.reasons.map((reason) => reason.id)

    expect(new Set(reasonIds).size).toBe(reasonIds.length)
    for (const reason of feedbackConfig.reasons) {
      const fieldIds = reason.fields.map((field) => field.id)
      expect(new Set(fieldIds).size).toBe(fieldIds.length)
    }
  })

  it('puts common content reports before code bias and other', () => {
    expect(feedbackConfig.reasons.map((reason) => reason.id)).toEqual([
      'party-answer-incorrect',
      'question-biased',
      'result-incorrect',
      'party-position-incorrect',
      'technical-issue',
      'improvement-suggestion',
      'new-question-suggestion',
      'party-missing',
      'code-bias',
      'other',
    ])
  })

  it('collects the requested party-answer evidence', () => {
    const reason = feedbackConfig.reasons.find((item) => item.id === 'party-answer-incorrect')

    expect(reason?.fields.map((field) => field.id)).toEqual([
      'questionId',
      'partyId',
      'explanation',
      'source',
      'notes',
    ])
    expect(reason?.fields.filter((field) => field.required).map((field) => field.id)).toEqual([
      'questionId',
      'partyId',
      'explanation',
    ])
  })

  it('only uses supported field kinds and populated fixed options', () => {
    for (const reason of feedbackConfig.reasons) {
      expect(reason.fields.length).toBeGreaterThan(0)
      for (const field of reason.fields) {
        expect(validKinds.has(field.kind)).toBe(true)
        if (field.kind === 'select') {
          expect('options' in field ? field.options?.length : 0).toBeGreaterThan(0)
        }
      }
    }
  })
})
