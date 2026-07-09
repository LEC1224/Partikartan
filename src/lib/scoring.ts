import type { AnswerValue, Answers, Coordinate, Party, Question, TopicId } from '../types'

export const PRIORITY_MULTIPLIER = 1.75

export function answerToScore(answer: number): number {
  return (answer - 3) / 2
}

export function calculateCoordinate(
  answers: Answers,
  questions: Question[],
  priorities: TopicId[] = [],
): Coordinate {
  let xTotal = 0
  let yTotal = 0
  let xWeight = 0
  let yWeight = 0
  let answered = 0

  for (const question of questions) {
    const answer = answers[question.id]
    if (answer == null) continue

    const priorityWeight = priorities.includes(question.topic) ? PRIORITY_MULTIPLIER : 1
    const score = answerToScore(answer)
    xTotal += score * question.weights.x * priorityWeight
    yTotal += score * question.weights.y * priorityWeight
    xWeight += Math.abs(question.weights.x) * priorityWeight
    yWeight += Math.abs(question.weights.y) * priorityWeight
    answered += 1
  }

  return {
    x: xWeight ? (xTotal / xWeight) * 100 : 0,
    y: yWeight ? (yTotal / yWeight) * 100 : 0,
    answered,
  }
}

export function calculatePartyCoordinate(party: Party, questions: Question[]): Coordinate {
  const answers: Answers = Object.fromEntries(
    party.responses.map((response) => [response.questionId, response.value]),
  )
  return calculateCoordinate(answers, questions)
}

export interface PartyMatch {
  percent: number
  exactMatches: number
  nearMatches: number
  comparedQuestions: number
  knownPartyAnswers: number
  unknownPartyAnswers: number
}

export function answerSimilarity(
  userAnswer: Exclude<AnswerValue, null>,
  partyAnswer: Exclude<AnswerValue, null>,
): number {
  return Math.max(0, 1 - Math.abs(userAnswer - partyAnswer) / 4)
}

export function countKnownPartyResponses(party: Party): number {
  return party.responses.filter((response) => response.value != null).length
}

export function calculatePartyMatch(
  answers: Answers,
  party: Party,
  questions: Question[],
  priorities: TopicId[] = [],
): PartyMatch {
  const responsesByQuestion = new Map(party.responses.map((response) => [response.questionId, response]))
  let weightedScore = 0
  let weightedPossible = 0
  let exactMatches = 0
  let nearMatches = 0
  let comparedQuestions = 0
  let knownPartyAnswers = 0
  let unknownPartyAnswers = 0

  for (const question of questions) {
    const userAnswer = answers[question.id]
    if (userAnswer == null) continue

    const weight = priorities.includes(question.topic) ? PRIORITY_MULTIPLIER : 1
    const partyAnswer = responsesByQuestion.get(question.id)?.value ?? null
    weightedPossible += weight
    comparedQuestions += 1

    if (partyAnswer == null) {
      unknownPartyAnswers += 1
      continue
    }

    knownPartyAnswers += 1
    weightedScore += answerSimilarity(userAnswer, partyAnswer) * weight

    const distance = Math.abs(userAnswer - partyAnswer)
    if (distance === 0) exactMatches += 1
    if (distance === 1) nearMatches += 1
  }

  return {
    percent: weightedPossible ? Math.round((weightedScore / weightedPossible) * 100) : 0,
    exactMatches,
    nearMatches,
    comparedQuestions,
    knownPartyAnswers,
    unknownPartyAnswers,
  }
}
