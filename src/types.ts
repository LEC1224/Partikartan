export type AxisWeights = { x: number; y: number }

export type QuestionKind = 'sakfraga' | 'vardering'

export type TopicId =
  | 'ekonomi'
  | 'valfard'
  | 'arbete'
  | 'bostad'
  | 'klimat'
  | 'lagordning'
  | 'migration'
  | 'frihet'
  | 'demokrati'
  | 'euvarld'

export interface Topic {
  id: TopicId
  label: string
  description: string
}

export interface Question {
  id: string
  kind: QuestionKind
  topic: TopicId
  statement: string
  context: string
  weights: AxisWeights
}

export type AnswerValue = 1 | 2 | 3 | 4 | 5 | null
export type Answers = Record<string, AnswerValue>

export interface Evidence {
  url: string
  title: string
  quote?: string
  accessedAt: string
}

export interface PartyResponse {
  questionId: string
  value: Exclude<AnswerValue, null>
  confidence: 'high' | 'medium' | 'low'
  evidence: Evidence[]
}

export interface Party {
  id: string
  shortName: string
  name: string
  color: string
  responses: PartyResponse[]
}

export interface Coordinate {
  x: number
  y: number
  answered: number
}
