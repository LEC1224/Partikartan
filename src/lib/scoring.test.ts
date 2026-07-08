import { describe, expect, it } from 'vitest'
import type { Answers, Question } from '../types'
import {
  PRIORITY_MULTIPLIER,
  answerToScore,
  calculateCoordinate,
  calculatePartyCoordinate,
  matchPercentage,
} from './scoring'

const sampleQuestions: Question[] = [
  {
    id: 'q1',
    kind: 'sakfraga',
    topic: 'ekonomi',
    statement: 'Test',
    context: 'Test',
    weights: { x: 1, y: 0 },
  },
  {
    id: 'q2',
    kind: 'sakfraga',
    topic: 'frihet',
    statement: 'Test',
    context: 'Test',
    weights: { x: 0, y: 1 },
  },
  {
    id: 'q3',
    kind: 'vardering',
    topic: 'ekonomi',
    statement: 'Test',
    context: 'Test',
    weights: { x: -1, y: 0 },
  },
]

describe('answerToScore', () => {
  it('maps the 1-5 scale symmetrically around zero', () => {
    expect(answerToScore(1)).toBe(-1)
    expect(answerToScore(2)).toBe(-0.5)
    expect(answerToScore(3)).toBe(0)
    expect(answerToScore(4)).toBe(0.5)
    expect(answerToScore(5)).toBe(1)
  })
})

describe('calculateCoordinate', () => {
  it('ignores unsure answers instead of pulling the result toward the center', () => {
    const answers: Answers = { q1: 5, q2: null }

    expect(calculateCoordinate(answers, sampleQuestions)).toEqual({
      x: 100,
      y: 0,
      answered: 1,
    })
  })

  it('applies priority weights to selected topics', () => {
    const answers: Answers = { q1: 5, q3: 5 }
    const coordinate = calculateCoordinate(answers, sampleQuestions, ['ekonomi'])

    expect(coordinate.x).toBe(0)
    expect(coordinate.answered).toBe(2)
    expect(PRIORITY_MULTIPLIER).toBe(1.75)
  })
})

describe('party scoring', () => {
  it('keeps parties without coded responses in origin', () => {
    expect(
      calculatePartyCoordinate(
        { id: 'test', shortName: 'T', name: 'Testpartiet', color: '#000', responses: [] },
        sampleQuestions,
      ),
    ).toEqual({ x: 0, y: 0, answered: 0 })
  })

  it('returns a full match for identical coordinates', () => {
    expect(matchPercentage({ x: 20, y: -30, answered: 10 }, { x: 20, y: -30, answered: 8 })).toBe(100)
  })
})

