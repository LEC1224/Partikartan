import type { PartyResponse } from '../../types'

const accessedAt = '2026-09-25'

const answer = (
  questionId: string,
  value: PartyResponse['value'],
  confidence: PartyResponse['confidence'],
  url: string,
  title: string,
  quote?: string,
): PartyResponse => ({
  questionId,
  value,
  confidence,
  evidence: [{ url, title, ...(quote ? { quote } : {}), accessedAt }],
})

const unknown = (questionId: string): PartyResponse => ({
  questionId,
  value: null,
  confidence: 'unknown',
  evidence: [],
})

const careInquiry =
  'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/statens-offentliga-utredningar/ansvaret-for-halso-och-sjukvarden_hdb362/html/'
const employerSurvey = 'https://smaforetagarna.se/wp-content/uploads/2026/04/Valenkat.pdf'

// These are sourced corrections, not a claim that every other cell was verified.
// Scope, retained unknowns and coding decisions: source-data/reviews/2026-09-25-economy.md.
export const economyReview: Record<string, PartyResponse[]> = {
  v: [
    // Opposition to private priority does not by itself establish a referral ban.
    unknown('s11'),
    answer(
      's12', 1, 'high',
      'https://www.vansterpartiet.se/var-politik/politik-a-o/rut-och-rot/',
      'Vänsterpartiet: RUT och ROT (uppdaterad 30 juni 2026)',
      'Vänsterpartiet anser att skattereduktionen för hushållsnära tjänster, det s.k. rutavdraget, bör avskaffas.',
    ),
    answer(
      's40', 1, 'high',
      'https://www.vansterpartiet.se/var-politik/politik-a-o/halso-och-sjukvardens-huvudmannaskap/',
      'Vänsterpartiet: Hälso- och sjukvårdens huvudmannaskap',
      'Vänsterpartiet vill inte förstatliga vården.',
    ),
  ],
  s: [
    answer(
      's06', 2, 'high', employerSurvey,
      'Socialdemokraternas eget svar i Småföretagarnas valenkät 2026, fråga 1, s. 1',
    ),
    answer(
      's07', 4, 'medium',
      'https://www.socialdemokraterna.se/var-politik/a-till-o/jarnvag',
      'Socialdemokraterna: Järnväg – egen maskinpark och mer underhåll i Trafikverkets regi',
    ),
    answer(
      's40', 1, 'high', careInquiry,
      'SOU 2025:62, s. 158–159: Socialdemokraternas eget särskilda yttrande om huvudmannaskap',
    ),
  ],
  mp: [
    answer(
      's06', 2, 'high', employerSurvey,
      'Miljöpartiets eget svar i Småföretagarnas valenkät 2026, fråga 1, s. 1',
    ),
    answer(
      's07', 4, 'medium',
      'https://www.mp.se/just-nu/aterta-kontrollen-over-jarnvagen/',
      'Miljöpartiet: Återta kontrollen över järnvägen (28 februari 2024)',
      'Miljöpartiet vill därför återförstatliga järnvägsunderhållet',
    ),
    unknown('s11'),
    answer(
      's43', 1, 'high',
      'https://www.mp.se/politik/ekonomi-och-skatter/',
      'Miljöpartiet: Ekonomi och skatter – progressiv beskattning av kapitalinkomster',
      'Miljöpartiet vill därför se en mer progressiv och rättvis beskattning av kapitalinkomster.',
    ),
    answer(
      's45', 1, 'high',
      'https://www.mp.se/om/partiprogram/partiprogram-hallbart-arbetsliv/',
      'Miljöpartiets partiprogram 2025, avsnitt 15.1: Den svenska modellen ska värna alla arbetstagare',
    ),
    // Needs-based public care does not settle the private-financing exception.
    unknown('v05'),
  ],
  c: [
    // Targeted reductions do not establish support for a general reduction.
    unknown('s06'),
    answer(
      's40', 1, 'high', careInquiry,
      'SOU 2025:62, s. 156–157: Centerpartiets eget särskilda yttrande om huvudmannaskap',
    ),
    answer(
      's45', 2, 'medium',
      'https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/jobb/arbetsratt-och-fackforening',
      'Centerpartiet: Arbetsrätt och fackförening – parternas förhandlingar är grundmodellen',
    ),
  ],
  l: [
    // Not excluding a general reduction is not an adopted position for it.
    unknown('s06'),
    answer(
      's12', 5, 'high',
      'https://www.liberalerna.se/politik/rut-och-rot-avdrag',
      'Liberalerna: RUT- och ROT-avdrag (uppdaterad 11 maj 2026)',
      'Höja taket för RUT för att skapa fler enkla jobb',
    ),
    unknown('s45'),
  ],
  m: [
    // The undated regional page cannot establish a further rise above today's cap.
    unknown('s12'),
    answer(
      's40', 1, 'high', careInquiry,
      'SOU 2025:62, s. 163–164: Moderaternas eget särskilda yttrande om huvudmannaskap',
      'Moderaterna är övertygade om att den svenska hälso- och sjukvården inte ska förstatligas. Varken helt eller delvis.',
    ),
    unknown('s45'),
  ],
  kd: [
    answer(
      's45', 2, 'medium',
      'https://kristdemokraterna.se/var-politik/politik-a-till-o/arbetsratt',
      'Kristdemokraterna: Arbetsrätt (uppdaterad 21 juli 2026) – partsmodellen för lön och arbetsrätt',
    ),
  ],
  sd: [
    answer(
      's06', 4, 'medium', employerSurvey,
      'Sverigedemokraternas eget svar i Småföretagarnas valenkät 2026, fråga 1, s. 2',
    ),
    unknown('s45'),
  ],
}
