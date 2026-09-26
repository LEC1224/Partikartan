export type AxisWeights = { x: number; y: number }

export type QuestionKind = 'sakfraga' | 'vardering'

export type TopicId =
  | 'ekonomi'
  | 'valfard'
  | 'arbete'
  | 'bostad'
  | 'forsvar'
  | 'energi'
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
  /** A policy comparison without a defensible direction on either chart axis. */
  matchOnlyReason?: string
}

export interface QuestionArguments {
  for: string
  against: string
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
  value: AnswerValue
  confidence: 'high' | 'medium' | 'low' | 'unknown'
  evidence: Evidence[]
  /** Editorial reasoning, distinct from a quotation of the party's own words. */
  rationale?: string
}

export interface Party {
  id: string
  shortName: string
  name: string
  color: string
  textColor?: string
  kind?: 'minor'
  responses: PartyResponse[]
}

export interface Coordinate {
  x: number
  y: number
  answered: number
}
