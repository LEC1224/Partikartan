import { describe, expect, it } from 'vitest'
import { parties } from './parties'
import { questionArguments } from './questionArguments'
import { questions } from './questions'
import { calculateCoordinate } from '../lib/scoring'
import type { Answers } from '../types'

describe('question data', () => {
  it('uses unique question ids', () => {
    const ids = questions.map((question) => question.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it('keeps every question attached to at least one axis', () => {
    expect(questions.every((question) => question.weights.x !== 0 || question.weights.y !== 0)).toBe(true)
  })

  it('has for and against arguments for every question', () => {
    const questionIds = questions.map((question) => question.id).sort()
    const argumentIds = Object.keys(questionArguments).sort()

    expect(argumentIds).toEqual(questionIds)
    expect(
      questions.every((question) => {
        const argument = questionArguments[question.id]
        return argument.for.trim().length > 0 && argument.against.trim().length > 0
      }),
    ).toBe(true)
  })

  it('keeps straight-line answering near the origin', () => {
    const allOnes: Answers = Object.fromEntries(questions.map((question) => [question.id, 1]))
    const allFives: Answers = Object.fromEntries(questions.map((question) => [question.id, 5]))

    for (const coordinate of [
      calculateCoordinate(allOnes, questions),
      calculateCoordinate(allFives, questions),
    ]) {
      expect(Math.abs(coordinate.x)).toBeLessThanOrEqual(5)
      expect(Math.abs(coordinate.y)).toBeLessThanOrEqual(5)
    }
  })

  it('only codes party responses for existing questions', () => {
    const questionIds = new Set(questions.map((question) => question.id))

    for (const party of parties) {
      expect(party.responses.every((response) => questionIds.has(response.questionId))).toBe(true)
    }
  })
})
