import type { AnswerValue, Answers, Coordinate, Party, Question, TopicId } from '../types'

export const PRIORITY_MULTIPLIER = 1.75
export const COORDINATE_SCALE = 100

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
    x: xWeight ? (xTotal / xWeight) * COORDINATE_SCALE : 0,
    y: yWeight ? (yTotal / yWeight) * COORDINATE_SCALE : 0,
    answered,
  }
}

export function calculatePartyCoordinate(party: Party, questions: Question[]): Coordinate {
  const responsesByQuestion = new Map(party.responses.map((response) => [response.questionId, response.value]))
  let xTotal = 0
  let yTotal = 0
  let xPossibleWeight = 0
  let yPossibleWeight = 0
  let answered = 0

  for (const question of questions) {
    xPossibleWeight += Math.abs(question.weights.x)
    yPossibleWeight += Math.abs(question.weights.y)

    const answer = responsesByQuestion.get(question.id) ?? null
    if (answer == null) continue

    const score = answerToScore(answer)
    xTotal += score * question.weights.x
    yTotal += score * question.weights.y
    answered += 1
  }

  return {
    x: xPossibleWeight ? (xTotal / xPossibleWeight) * COORDINATE_SCALE : 0,
    y: yPossibleWeight ? (yTotal / yPossibleWeight) * COORDINATE_SCALE : 0,
    answered,
  }
}

export interface PartyMatch {
  percent: number
  exactPercent: number
  nearPercent: number
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
  if (userAnswer === partyAnswer) return 1

  const userDirection = Math.sign(userAnswer - 3)
  const partyDirection = Math.sign(partyAnswer - 3)
  return userDirection !== 0 && userDirection === partyDirection ? 1 : 0
}

export function countKnownPartyResponses(party: Party, questions?: Question[]): number {
  const questionIds = questions && new Set(questions.map((question) => question.id))

  return party.responses.filter(
    (response) => response.value != null && (!questionIds || questionIds.has(response.questionId)),
  ).length
}

export function calculatePartyMatch(
  answers: Answers,
  party: Party,
  questions: Question[],
  priorities: TopicId[] = [],
): PartyMatch {
  const responsesByQuestion = new Map(party.responses.map((response) => [response.questionId, response]))
  let weightedPossible = 0
  let weightedExact = 0
  let weightedNear = 0
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
    comparedQuestions += 1

    if (partyAnswer == null) {
      unknownPartyAnswers += 1
      continue
    }

    knownPartyAnswers += 1
    weightedPossible += weight

    const distance = Math.abs(userAnswer - partyAnswer)
    if (distance === 0) {
      exactMatches += 1
      weightedExact += weight
    } else if (answerSimilarity(userAnswer, partyAnswer) === 1) {
      nearMatches += 1
      weightedNear += weight
    }
  }

  const percent = weightedPossible
    ? Math.round(((weightedExact + weightedNear) / weightedPossible) * 100)
    : 0
  const exactPercent = weightedPossible ? Math.round((weightedExact / weightedPossible) * 100) : 0

  return {
    percent,
    exactPercent,
    nearPercent: Math.max(0, percent - exactPercent),
    exactMatches,
    nearMatches,
    comparedQuestions,
    knownPartyAnswers,
    unknownPartyAnswers,
  }
}
