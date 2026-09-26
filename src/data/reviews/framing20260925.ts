import type { Evidence, PartyResponse } from '../../types'

const source = (url: string, title: string, quote: string): Evidence => ({
  url, title, quote, accessedAt: '2026-09-25',
})
const answer = (questionId: string, value: PartyResponse['value'], confidence: PartyResponse['confidence'], ...evidence: Evidence[]): PartyResponse => ({ questionId, value, confidence, evidence })
const unknown = (questionId: string) => answer(questionId, null, 'unknown')

const climateAgreement = source(
  'https://kristdemokraterna.se/download/18.1d0d4a9518bcc32fac24e94/1700663515374/Klimat%202.0.%20O%CC%88verenskommelsen.pdf',
  'M, KD, L och SD: Klimatpolitisk överenskommelse 2023, s. 3 och 5 – prioriterade verktyg',
  'Våra viktigaste verktyg är elektrifiering och teknikutveckling.',
)
const climateL = source(
  'https://www.liberalerna.se/klimat/fossilfri-tillvaxt-liberalernas-klimatpolitik-for-ett-rikare-och-friare-sverige',
  'Liberalerna: Fossilfri tillväxt (30 augusti 2026) – prioritering framför begränsningar',
  'Sverige ska minska utsläppen genom att bygga mer, uppfinna mer och göra det fossilfria alternativet bättre.',
)
const defence = source(
  'https://www.regeringen.se/pressmeddelanden/2025/06/blockoverskridande-overenskommelse-nadd-om-historisk-upprustning/',
  'Alla åtta riksdagspartier: överenskommelse 19 juni 2025 om nya försvarsutgifter och tillfällig lånefinansiering',
  'Behovet av nya försvarsutgifter, inkl. stöd till Ukraina, tillfälligt ska lånefinansieras.',
)

// All parties are reconsidered for the new priority question. Support for both
// technology and consumption measures is not evidence for a midpoint of 3.
// v21 is qualified support: the common agreement has a ceiling and a time limit.
// Rationale and sources considered for unknowns: 2026-09-25-framing.md.
export const framingReview: Record<string, PartyResponse[]> = {
  v: [unknown('s35'), answer('v21', 4, 'medium', defence)],
  s: [unknown('s35'), answer('v21', 4, 'medium', defence)],
  mp: [unknown('s35'), answer('v21', 4, 'medium', defence)],
  c: [unknown('s35'), answer('v21', 4, 'medium', defence)],
  l: [answer('s35', 5, 'high', climateL), answer('v21', 4, 'medium', defence)],
  m: [answer('s35', 4, 'medium', climateAgreement), answer('v21', 4, 'medium', defence)],
  kd: [answer('s35', 4, 'medium', climateAgreement), answer('v21', 4, 'medium', defence)],
  sd: [answer('s35', 4, 'medium', climateAgreement), answer('v21', 4, 'medium', defence)],
  fl: [unknown('s35'), unknown('v21')],
  nyans: [unknown('s35'), unknown('v21')],
  afs: [unknown('s35'), unknown('v21')],
  pp: [unknown('s35'), unknown('v21')],
  med: [unknown('s35'), unknown('v21')],
}
