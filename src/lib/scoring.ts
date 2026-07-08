import type { Answers, Coordinate, Party, Question, TopicId } from '../types'

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

export function matchPercentage(user: Coordinate, party: Coordinate): number {
  const maxDistance = Math.sqrt(200 ** 2 + 200 ** 2)
  const distance = Math.hypot(user.x - party.x, user.y - party.y)
  return Math.max(0, Math.round((1 - distance / maxDistance) * 100))
}
