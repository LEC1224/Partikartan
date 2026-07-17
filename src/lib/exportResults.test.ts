import { describe, expect, it } from 'vitest'
import { getAnswerComparisonKind } from './exportResults'

describe('getAnswerComparisonKind', () => {
  it('skiljer på exakt, samma riktning och olika svar', () => {
    expect(getAnswerComparisonKind(true, 4, 4)).toBe('exact')
    expect(getAnswerComparisonKind(true, 4, 5)).toBe('near')
    expect(getAnswerComparisonKind(true, 4, 2)).toBe('different')
  })

  it('markerar svar som inte går att jämföra', () => {
    expect(getAnswerComparisonKind(false, undefined, 5)).toBe('unanswered')
    expect(getAnswerComparisonKind(true, null, 5)).toBe('unknown')
    expect(getAnswerComparisonKind(true, 5, null)).toBe('unknown')
  })
})
