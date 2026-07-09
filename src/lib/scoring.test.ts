import { describe, expect, it } from 'vitest'
import type { Answers, Question } from '../types'
import {
  PRIORITY_MULTIPLIER,
  COORDINATE_SCALE,
  answerSimilarity,
  answerToScore,
  calculatePartyMatch,
  calculateCoordinate,
  calculatePartyCoordinate,
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
      x: COORDINATE_SCALE,
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
        {
          id: 'test',
          shortName: 'T',
          name: 'Testpartiet',
          color: '#000',
          responses: sampleQuestions.map((question) => ({
            questionId: question.id,
            value: null,
            confidence: 'unknown',
            evidence: [],
          })),
        },
        sampleQuestions,
      ),
    ).toEqual({ x: 0, y: 0, answered: 0 })
  })

  it('scores adjacent party answers as a strong but partial match', () => {
    expect(answerSimilarity(4, 5)).toBe(0.75)
    expect(answerSimilarity(1, 5)).toBe(0)
  })

  it('compares parties question by question instead of by chart distance', () => {
    const answers: Answers = { q1: 5, q2: 4, q3: null }
    const match = calculatePartyMatch(
      answers,
      {
        id: 'test',
        shortName: 'T',
        name: 'Testpartiet',
        color: '#000',
        responses: [
          { questionId: 'q1', value: 5, confidence: 'high', evidence: [] },
          { questionId: 'q2', value: 5, confidence: 'high', evidence: [] },
          { questionId: 'q3', value: 1, confidence: 'high', evidence: [] },
        ],
      },
      sampleQuestions,
    )

    expect(match).toEqual({
      percent: 88,
      exactMatches: 1,
      nearMatches: 1,
      comparedQuestions: 2,
      knownPartyAnswers: 2,
      unknownPartyAnswers: 0,
    })
  })

  it('counts party Vet ej as missing agreement for answered user questions', () => {
    const match = calculatePartyMatch(
      { q1: 5 },
      {
        id: 'test',
        shortName: 'T',
        name: 'Testpartiet',
        color: '#000',
        responses: [{ questionId: 'q1', value: null, confidence: 'unknown', evidence: [] }],
      },
      sampleQuestions,
    )

    expect(match.percent).toBe(0)
    expect(match.unknownPartyAnswers).toBe(1)
  })
})
