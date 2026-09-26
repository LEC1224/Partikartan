import { describe, expect, it } from 'vitest'
import type { Party, Question } from '../types'
import {
  FULL_COVERAGE_RATIO,
  getPartyCoverage,
  MIN_AXIS_COVERAGE,
  QUICK_COVERAGE_RATIO,
  requiredPartyResponses,
} from './partyCoverage'

const questions = (count: number): Question[] => Array.from({ length: count }, (_, index) => ({
  id: `q${index}`, kind: 'sakfraga', topic: 'ekonomi', statement: 'Test', context: 'Test',
  weights: { x: 1, y: 1 },
}))
const party = (knownIds: string[], unknownIds: string[] = []): Party => ({
  id: 'test', shortName: 'T', name: 'Test', color: '#000',
  responses: [
    ...knownIds.map((questionId) => ({ questionId, value: 5 as const, confidence: 'high' as const, evidence: [] })),
    ...unknownIds.map((questionId) => ({ questionId, value: null, confidence: 'unknown' as const, evidence: [] })),
  ],
})

describe('party publication coverage', () => {
  it('requires 80% for a quick test and 60% for a full test, rounded upward', () => {
    expect(QUICK_COVERAGE_RATIO).toBe(0.8)
    expect(FULL_COVERAGE_RATIO).toBe(0.6)
    expect(MIN_AXIS_COVERAGE).toBe(0.6)
    expect(requiredPartyResponses(questions(25))).toBe(20)
    expect(requiredPartyResponses(questions(24))).toBe(20)
    expect(requiredPartyResponses(questions(26))).toBe(16)
    expect(requiredPartyResponses(questions(71))).toBe(43)
    const bank = questions(25)
    expect(getPartyCoverage(party(bank.slice(0, 19).map((q) => q.id)), bank).sufficient).toBe(false)
    expect(getPartyCoverage(party(bank.slice(0, 20).map((q) => q.id)), bank).sufficient).toBe(true)
    const full = questions(30)
    expect(getPartyCoverage(party(full.slice(0, 17).map((q) => q.id)), full).sufficient).toBe(false)
    expect(getPartyCoverage(party(full.slice(0, 18).map((q) => q.id)), full).sufficient).toBe(true)
  })

  it('excludes unknown responses and answers outside the selected bank', () => {
    const bank = questions(5)
    const coverage = getPartyCoverage(party(['q0', 'q1', 'q2', 'q3', 'retired'], ['q4']), bank)
    expect(coverage.known).toBe(4)
    expect(coverage.required).toBe(4)
    expect(coverage.sufficient).toBe(true)
    expect(coverage.chartSufficient).toBe(true)
  })

  it('requires coverage of both axes, weighted by absolute axis weight', () => {
    const bank = questions(5)
    bank[0].weights = { x: -3, y: 1 }
    bank[1].weights = { x: 0, y: 1 }
    bank[2].weights = { x: 0, y: 1 }
    bank[3].weights = { x: 0, y: 1 }
    bank[4].weights = { x: 2, y: 0 }
    const boundary = getPartyCoverage(party(['q0', 'q1', 'q2', 'q3']), bank)
    expect(boundary.xCoverage).toBe(0.6)
    expect(boundary.yCoverage).toBe(1)
    expect(boundary.chartSufficient).toBe(true)
    bank[4].weights.x = 3
    const insufficientAxis = getPartyCoverage(party(['q0', 'q1', 'q2', 'q3']), bank)
    expect(insufficientAxis.sufficient).toBe(true)
    expect(insufficientAxis.xCoverage).toBe(0.5)
    expect(insufficientAxis.chartSufficient).toBe(false)
  })

  it('does not let match-only questions create evidence on an unmeasured axis', () => {
    const bank = questions(5)
    bank.slice(0, 4).forEach((question) => { question.weights = { x: 0, y: 0 } })
    const coverage = getPartyCoverage(party(['q0', 'q1', 'q2', 'q3']), bank)
    expect(coverage.sufficient).toBe(true)
    expect(coverage.xCoverage).toBe(0)
    expect(coverage.yCoverage).toBe(0)
    expect(coverage.chartSufficient).toBe(false)
    const noAxes = bank.slice(0, 4)
    expect(getPartyCoverage(party(['q0', 'q1', 'q2', 'q3']), noAxes).chartSufficient).toBe(false)
  })

  it('never publishes coverage for an empty questionnaire', () => {
    expect(getPartyCoverage(party(['q0']), [])).toEqual({
      known: 0, required: 0, sufficient: false, chartSufficient: false, xCoverage: 0, yCoverage: 0,
    })
  })
})
