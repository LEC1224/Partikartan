import { describe, expect, it } from 'vitest'
import type { Answers, Party, Question } from '../types'
import {
  PRIORITY_MULTIPLIER,
  COORDINATE_SCALE,
  answerSimilarity,
  answerToScore,
  calculatePartyMatch,
  calculateCoordinate,
  calculatePartyCoordinate,
  getAnsweredAxes,
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
  it('distinguishes a neutral answer from missing axis input, including match-only answers', () => {
    const matchOnly: Question = { ...sampleQuestions[0], id: 'match', weights: { x: 0, y: 0 } }
    expect(getAnsweredAxes({ q1: null, match: 5 }, [...sampleQuestions, matchOnly])).toEqual({ x: false, y: false })
    expect(getAnsweredAxes({ q1: 3 }, sampleQuestions)).toEqual({ x: true, y: false })
    expect(getAnsweredAxes({ q1: 3, q2: 3 }, sampleQuestions)).toEqual({ x: true, y: true })
  })
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

  it('normalizes parties over known answers just like users, without center pull', () => {
    expect(
      calculatePartyCoordinate(
        {
          id: 'test',
          shortName: 'T',
          name: 'Testpartiet',
          color: '#000',
          responses: [
            { questionId: 'q1', value: 5, confidence: 'high', evidence: [] },
            { questionId: 'q2', value: null, confidence: 'unknown', evidence: [] },
            { questionId: 'q3', value: null, confidence: 'unknown', evidence: [] },
          ],
        },
        sampleQuestions,
      ),
    ).toEqual({ x: COORDINATE_SCALE, y: 0, answered: 1 })
  })

  it('applies the same topic priorities to party and user coordinates', () => {
    const questions: Question[] = [
      { ...sampleQuestions[0], weights: { x: 1, y: 1 } },
      { ...sampleQuestions[1], weights: { x: -1, y: -1 } },
      { ...sampleQuestions[2], weights: { x: 10, y: 10 } },
    ]
    const answers: Answers = { q1: 5, q2: 5, q3: null }
    const party: Party = {
      id: 'same', shortName: 'S', name: 'Same', color: '#000',
      responses: questions.map((question) => ({
        questionId: question.id, value: answers[question.id],
        confidence: answers[question.id] == null ? 'unknown' : 'high', evidence: [],
      })),
    }

    expect(calculatePartyCoordinate(party, questions)).toEqual(calculateCoordinate(answers, questions))
    const expected = ((PRIORITY_MULTIPLIER - 1) / (PRIORITY_MULTIPLIER + 1)) * COORDINATE_SCALE
    const coordinate = calculatePartyCoordinate(party, questions, ['ekonomi'])
    expect(coordinate).toEqual(calculateCoordinate(answers, questions, ['ekonomi']))
    expect(coordinate.x).toBeCloseTo(expected)
    expect(coordinate.y).toBeCloseTo(expected)
    expect(coordinate.answered).toBe(2)
  })

  it('uses questions with zero axis weights for matching but not chart direction', () => {
    const questions = [sampleQuestions[0], { ...sampleQuestions[1], weights: { x: 0, y: 0 } }]
    const party: Party = {
      id: 'test', shortName: 'T', name: 'Test', color: '#000',
      responses: [
        { questionId: 'q1', value: 5, confidence: 'high', evidence: [] },
        { questionId: 'q2', value: 1, confidence: 'high', evidence: [] },
      ],
    }
    const answers: Answers = { q1: 5, q2: 5 }
    expect(calculatePartyCoordinate(party, questions)).toEqual(calculateCoordinate(answers, questions))
    expect(calculateCoordinate(answers, questions)).toEqual({ x: 100, y: 0, answered: 2 })
    expect(calculatePartyMatch(answers, party, questions).percent).toBe(50)
    expect(calculatePartyMatch(answers, party, questions, ['frihet']).percent).toBe(36)
  })

  it('counts different strengths in the same direction as a near match', () => {
    expect(answerSimilarity(4, 5)).toBe(1)
    expect(answerSimilarity(1, 2)).toBe(1)
    expect(answerSimilarity(3, 4)).toBe(0)
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
      percent: 100,
      exactPercent: 50,
      nearPercent: 50,
      exactMatches: 1,
      nearMatches: 1,
      comparedQuestions: 2,
      knownPartyAnswers: 2,
      unknownPartyAnswers: 0,
    })
  })

  it('leaves party Vet ej out when no comparable answer exists', () => {
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
    expect(match.exactPercent).toBe(0)
    expect(match.nearPercent).toBe(0)
    expect(match.unknownPartyAnswers).toBe(1)
  })

  it('does not dilute a sourced match with unknown party answers', () => {
    const match = calculatePartyMatch(
      { q1: 5, q2: 4 },
      {
        id: 'test',
        shortName: 'T',
        name: 'Testpartiet',
        color: '#000',
        responses: [
          { questionId: 'q1', value: 5, confidence: 'high', evidence: [] },
          { questionId: 'q2', value: null, confidence: 'unknown', evidence: [] },
        ],
      },
      sampleQuestions,
    )

    expect(match.percent).toBe(100)
    expect(match.exactPercent).toBe(100)
    expect(match.knownPartyAnswers).toBe(1)
    expect(match.unknownPartyAnswers).toBe(1)
  })
})
