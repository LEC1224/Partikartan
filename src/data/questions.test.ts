import { describe, expect, it } from 'vitest'
import { parties } from './parties'
import { questionArguments } from './questionArguments'
import { questions } from './questions'
import { quickQuestionIds, quickQuestions } from './quickQuestions'
import { calculateCoordinate } from '../lib/scoring'
import type { Answers } from '../types'

describe('question data', () => {
  it('uses unique question ids', () => {
    const ids = questions.map((question) => question.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it('documents questions that only affect the party match', () => {
    for (const question of questions) {
      if (question.weights.x === 0 && question.weights.y === 0) {
        expect(question.matchOnlyReason?.trim().length).toBeGreaterThan(30)
      } else {
        expect(question.matchOnlyReason).toBeUndefined()
      }
    }
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

  it('uses substantial weight in both directions on each full-test axis', () => {
    const allOnes: Answers = Object.fromEntries(questions.map((question) => [question.id, 1]))
    const allFives: Answers = Object.fromEntries(questions.map((question) => [question.id, 5]))

    for (const coordinate of [
      calculateCoordinate(allOnes, questions),
      calculateCoordinate(allFives, questions),
    ]) {
      // At least 40% of absolute weight points each way. This is a framing
      // imbalance guard, not validation of political neutrality or party positions.
      expect(Math.abs(coordinate.x)).toBeLessThanOrEqual(20)
      expect(Math.abs(coordinate.y)).toBeLessThanOrEqual(20)
    }
  })

  it('keeps the quick quiz fixed, sourced and representative', () => {
    const questionIds = new Set(questions.map((question) => question.id))
    const selectedIds = new Set<string>(quickQuestionIds)

    expect(quickQuestionIds).toHaveLength(25)
    expect(selectedIds.size).toBe(quickQuestionIds.length)
    expect(quickQuestions.map((question) => question.id)).toEqual(
      questions.filter((question) => selectedIds.has(question.id)).map((question) => question.id),
    )
    expect(quickQuestionIds.every((id) => questionIds.has(id))).toBe(true)
    expect(new Set(quickQuestions.map((question) => question.topic)).size).toBe(12)

    for (const question of quickQuestions) {
      const knownResponses = parties.filter((party) =>
        party.responses.some((response) => response.questionId === question.id && response.value != null),
      ).length

      expect(knownResponses).toBeGreaterThanOrEqual(parties.length - 1)
    }
  })

  it('uses substantial weight in both directions on each quick-test axis', () => {
    const allOnes: Answers = Object.fromEntries(quickQuestions.map((question) => [question.id, 1]))
    const allFives: Answers = Object.fromEntries(quickQuestions.map((question) => [question.id, 5]))

    for (const coordinate of [
      calculateCoordinate(allOnes, quickQuestions),
      calculateCoordinate(allFives, quickQuestions),
    ]) {
      expect(Math.abs(coordinate.x)).toBeLessThanOrEqual(20)
      expect(Math.abs(coordinate.y)).toBeLessThanOrEqual(20)
    }
  })

  it('only codes party responses for existing questions', () => {
    const questionIds = new Set(questions.map((question) => question.id))

    for (const party of parties) {
      expect(party.responses.every((response) => questionIds.has(response.questionId))).toBe(true)
    }
  })

  it('exports one explicit party response per question', () => {
    const questionIds = questions.map((question) => question.id).sort()

    for (const party of parties) {
      expect(party.responses.map((response) => response.questionId).sort()).toEqual(questionIds)
    }
  })
})
