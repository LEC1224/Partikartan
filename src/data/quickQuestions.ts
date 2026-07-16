import { questions } from './questions'

// Every selected question has a sourced answer from at least seven of the eight
// parties. The mix also keeps both axes balanced for straight-line answers.
export const quickQuestionIds = [
  's02',
  's03',
  's08',
  's10',
  's14',
  's22',
  's26',
  's30',
  's33',
  's34',
  's35',
  's39',
  's42',
  's44',
  's47',
  's49',
  's50',
  's51',
  'v03',
  'v06',
  'v07',
  'v12',
  'v13',
  'v19',
  'v23',
] as const

const quickQuestionIdSet = new Set<string>(quickQuestionIds)

export const quickQuestions = questions.filter((question) => quickQuestionIdSet.has(question.id))
