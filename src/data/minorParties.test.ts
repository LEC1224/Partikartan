import { describe, expect, it } from 'vitest'
import { getPartyCoverage, requiredPartyResponses } from '../lib/partyCoverage'
import { minorParties } from './minorParties'
import { parties } from './parties'
import { questions } from './questions'
import { quickQuestions } from './quickQuestions'

describe('minor-party data', () => {
  it('contains the five parties selected by the neutral result filter', () => {
    expect(minorParties.map((party) => party.name)).toEqual([
      'Folklistan',
      'Partiet Nyans',
      'Alternativ för Sverige',
      'Piratpartiet',
      'Medborgerlig Samling',
    ])
  })

  it('exports exactly one response for every question', () => {
    const questionIds = questions.map((question) => question.id).sort()

    for (const party of minorParties) {
      expect(party.responses.map((response) => response.questionId).sort()).toEqual(questionIds)
    }
  })

  it('requires primary evidence for every coded answer', () => {
    for (const party of minorParties) {
      for (const response of party.responses) {
        if (response.value == null) {
          expect(response.confidence).toBe('unknown')
          // Sources can document why a numeric interpretation was rejected.
          if (response.evidence.length) expect(response.rationale?.length).toBeGreaterThan(20)
        } else {
          expect(response.confidence).not.toBe('unknown')
          expect(response.evidence.length).toBeGreaterThan(0)
          expect(response.evidence.every((evidence) => evidence.url.startsWith('https://'))).toBe(true)
        }
      }
    }
  })

  it('applies the same minimum coverage without inventing missing positions', () => {
    // Eligibility follows evidence, never party identity or a frozen list of names.
    for (const bank of [quickQuestions, questions]) {
      for (const party of [...parties, ...minorParties]) {
        const coverage = getPartyCoverage(party, bank)
        const active = new Set(bank.map((question) => question.id))
        const known = party.responses.filter((response) => active.has(response.questionId) && response.value != null).length
        expect(coverage.required).toBe(requiredPartyResponses(bank))
        expect(coverage.sufficient).toBe(known >= coverage.required)
      }
    }
    expect(parties.every((party) => getPartyCoverage(party, quickQuestions).sufficient)).toBe(true)
    expect(parties.every((party) => getPartyCoverage(party, questions).sufficient)).toBe(true)
  })
})
