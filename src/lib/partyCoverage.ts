import type { Party, Question } from '../types'
import { countKnownPartyResponses } from './scoring'

// Editorial publication thresholds, not statistical confidence levels.
export const QUICK_COVERAGE_RATIO = 0.8
export const FULL_COVERAGE_RATIO = 0.6
export const MIN_AXIS_COVERAGE = 0.6

export function requiredPartyResponses(questions: Question[]): number {
  return Math.ceil(questions.length * (questions.length <= 25 ? QUICK_COVERAGE_RATIO : FULL_COVERAGE_RATIO))
}

export interface PartyCoverage {
  known: number
  required: number
  sufficient: boolean
  chartSufficient: boolean
  xCoverage: number
  yCoverage: number
}

export function getPartyCoverage(party: Party, questions: Question[]): PartyCoverage {
  const required = requiredPartyResponses(questions)
  const known = countKnownPartyResponses(party, questions)
  const knownIds = new Set(party.responses.filter((response) => response.value != null).map((response) => response.questionId))
  const axisCoverage = (axis: 'x' | 'y') => {
    const total = questions.reduce((sum, question) => sum + Math.abs(question.weights[axis]), 0)
    const sourced = questions.reduce((sum, question) => sum + (knownIds.has(question.id) ? Math.abs(question.weights[axis]) : 0), 0)
    return total ? sourced / total : 0
  }
  const xCoverage = axisCoverage('x')
  const yCoverage = axisCoverage('y')
  const sufficient = questions.length > 0 && known >= required

  return {
    known,
    required,
    sufficient,
    chartSufficient: sufficient && xCoverage >= MIN_AXIS_COVERAGE && yCoverage >= MIN_AXIS_COVERAGE,
    xCoverage,
    yCoverage,
  }
}
