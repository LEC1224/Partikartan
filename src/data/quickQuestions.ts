import { questions } from './questions'

// Reviewed 2026-09-26: all 12 topics, concrete choices and some broader values.
// At least seven of the eight parliamentary parties have evidence for each item.
// Match-only questions broaden comparison without forcing an ideological axis.
export const quickQuestionIds = [
  's02',
  's04',
  's10',
  's11',
  's13',
  's15',
  's18',
  's20',
  's22',
  's25',
  's30',
  's33',
  's34',
  's38',
  's39',
  's40',
  's45',
  's49',
  's51',
  's52',
  'v02',
  'v07',
  'v13',
  'v14',
  'v23',
] as const

const quickQuestionIdSet = new Set<string>(quickQuestionIds)

export const quickQuestions = questions.filter((question) => quickQuestionIdSet.has(question.id))
