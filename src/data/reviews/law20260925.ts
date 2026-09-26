import type { Evidence, PartyResponse } from '../../types'

const accessedAt = '2026-09-25'
const source = (url: string, title: string, quote: string): Evidence => ({ url, title, quote, accessedAt })
const response = (questionId: string, value: PartyResponse['value'], confidence: PartyResponse['confidence'], ...evidence: Evidence[]): PartyResponse => ({ questionId, value, confidence, evidence })
const unknown = (questionId: string): PartyResponse => response(questionId, null, 'unknown')

const youth = source(
  'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/betankande/skarpta-regler-for-unga-lagovertradare_hd01juu41/',
  'Riksdagen: 2025/26:JuU41, punkt 2 om 14 års straffbarhetsålder; partiröster 13 augusti 2026',
  'Straffbarhetsåldern sänks till 14 år för allvarliga brott under en period om fem år.',
)
const witnesses = source(
  'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/betankande/anonyma-vittnen_hc01juu6/html/',
  'Riksdagen: 2024/25:JuU6, reservation 1 (V, C, MP) mot anonyma vittnen',
  'Ett system med anonyma vittnen är emellertid inte rätt väg att gå',
)
const camerasV = source(
  'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/betankande/kamerabevakning-i-brottsbekampning-och-annan_hc01juu27/html/',
  'Riksdagen: 2024/25:JuU27, V:s reservationer 1 och 3 mot utvidgning och för starkare integritetsskydd',
  'Jag instämmer i remissinstansernas kritiska synpunkter och anser därför att regeringens lagförslag ska avslås.',
)
const camerasL = source(
  'https://www.liberalerna.se/politik/gangkriminalitet',
  'Liberalerna: Gängkriminalitet, avsnittet Skärpta straff och fler verktyg för polisen',
  'Därför vill Liberalerna bland annat stärka möjligheterna till avlyssning och kameraövervakning',
)
const courtsL = source(
  'https://www.liberalerna.se/politik/grundlagen',
  'Liberalerna: Grundlagarna – oberoende domstolsråd och begränsad politisk styrning',
  'Vi vill också att domstolarna i Sverige hanteras av ett oberoende domstolsråd',
)
const courtsMp = source(
  'https://www.mp.se/wp-content/uploads/2025/12/miljopartiets-partiprogram-2025.pdf',
  'Miljöpartiets partiprogram 2025, avsnitt 14.4 Rättsstatens principer, sida 43',
  'Domstolarnas oberoende ska värnas, och rättsvårdande myndigheter ska agera självständigt och rättssäkert.',
)
const courtsKd = source(
  'https://kristdemokraterna.se/download/18.7932b3db19c9887db6c221c/1773136182639/Principprogram%20hemsida.pdf',
  'Kristdemokraternas principprogram, avsnitt 2.2: självständiga domstolar, obunden revision och författningsdomstol',
  'Domstolarnas ställning ska vara stark och självständig.',
)

// Sparse review overrides. Unknowns are deliberate; the accompanying review explains
// why old reforms or broader policy positions do not prove the precise statement.
export const lawReview: Record<string, PartyResponse[]> = {
  v: [response('s19', 1, 'high', witnesses), response('s20', 2, 'medium', camerasV), response('s21', 1, 'high', youth), unknown('s29'), unknown('s41')],
  s: [unknown('s19'), response('s21', 5, 'high', youth), unknown('s29')],
  mp: [response('s19', 1, 'high', witnesses), unknown('s20'), response('s21', 1, 'high', youth), unknown('s29'), response('s38', 4, 'medium', courtsMp), unknown('s41')],
  c: [response('s19', 1, 'high', witnesses), unknown('s20'), response('s21', 1, 'high', youth), unknown('s29'), unknown('s41')],
  l: [unknown('s19'), response('s20', 5, 'high', camerasL), response('s21', 5, 'high', youth), unknown('s29'), response('s38', 4, 'medium', courtsL)],
  m: [unknown('s19'), response('s21', 5, 'high', youth), unknown('s29')],
  kd: [response('s21', 5, 'high', youth), response('s38', 4, 'medium', courtsKd), unknown('s41')],
  sd: [response('s21', 5, 'high', youth), unknown('s38'), unknown('s41')],
  fl: [unknown('s21')],
  nyans: [unknown('s21')],
  afs: [unknown('s21')],
  pp: [unknown('s21')],
  med: [unknown('s21')],
}
