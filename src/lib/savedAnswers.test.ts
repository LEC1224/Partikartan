import { describe, expect, it } from 'vitest'
import { questionRevisions } from '../data/questionRevisions'
import { restoreAnswers } from './savedAnswers'

describe('saved answers after a question revision', () => {
  it('keeps unaffected answers but asks again after changed meaning, including old Vet ej', () => {
    const result = restoreAnswers({ s03: 5, s02: 4, s21: 5, s35: null, s51: 1, v02: 1, v21: 4 })
    expect(result.answers).toEqual({ s03: 5 })
    expect(result.revisedQuestionIds).toEqual(['s02', 's21', 's35', 's51', 'v02', 'v21'])
  })

  it('restores answers given to the current wording, including neutral and unknown answers', () => {
    expect(restoreAnswers({ s21: 3, s35: null, v02: 4, v21: 2 }, questionRevisions)).toEqual({
      answers: { s21: 3, s35: null, v02: 4, v21: 2 },
      revisedQuestionIds: [],
    })
  })

  it('rejects invalid or removed answers instead of feeding them into scoring', () => {
    expect(restoreAnswers({ s02: '5', s03: 8, s04: 2.5, v22: 1, s24: 5, s31: 4, s50: 1, v12: null, v17: 4, v20: 5 }, questionRevisions).answers).toEqual({})
    expect(restoreAnswers(null).answers).toEqual({})
  })
})
