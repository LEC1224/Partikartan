import type { PartyResponse } from '../../types'

// See source-data/reviews/2026-09-25-language-freedom.md for scope and decisions.
const accessedAt = '2026-09-25'

export const freedomReview: Record<string, PartyResponse[]> = {
  v: [
    {
      questionId: 's16', value: 5, confidence: 'high',
      evidence: [{
        url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/motion/svensk-flyktingpolitik_hd022798/html/',
        title: 'V: Svensk flyktingpolitik, kommittémotion 2025/26:2798, avsnitt 7',
        quote: 'Vänsterpartiet anser att Sverige ska ta emot fler kvotflyktingar',
        accessedAt,
      }],
    },
    {
      questionId: 's46', value: 1, confidence: 'high',
      evidence: [{
        url: 'https://www.vansterpartiet.se/var-politik/politik-a-o/droger-och-beroende/',
        title: 'Vänsterpartiet: Droger och beroende, uppdaterad 2026-06-30',
        quote: 'Tillverkning, försäljning och innehav av narkotika ska vara olagligt.',
        accessedAt,
      }],
    },
    {
      questionId: 's48', value: null, confidence: 'unknown',
      evidence: [{
        url: 'https://www.vansterpartiet.se/var-politik/politik-a-o/dodshjalp/',
        title: 'Vänsterpartiet: Dödshjälp – stöd för utredning belägger inte stöd för införande',
        quote: 'Vi stödjer att frivillig dödshjälp utreds',
        accessedAt,
      }],
    },
  ],
  s: [
    {
      questionId: 's48', value: 1, confidence: 'high',
      evidence: [{
        url: 'https://www.socialdemokraterna.se/download/18.22fa0a9519e3e9b08ba169f/1779265338204/Protokoll_Partikongressen_2025.pdf#page=308',
        title: 'Socialdemokraternas kongressprotokoll 2025, s. 308: partistyrelsens huvudföredragande om dödshjälp',
        quote: 'Vi tycker inte att sjukvården ska få uppdraget att genomföra assisterad dödshjälp.',
        accessedAt,
      }],
    },
  ],
  mp: [
    {
      questionId: 's23', value: 5, confidence: 'high',
      evidence: [{
        url: 'https://www.mp.se/politik/hbtq/',
        title: 'Miljöpartiet: Lika rätt är allas rätt, uppdaterad 2026-06-23',
        quote: 'juridiskt kön ska kunna ändras genom självbestämmande utan kontakt med vården',
        accessedAt,
      }],
    },
  ],
  c: [
    {
      questionId: 's46', value: 1, confidence: 'high',
      evidence: [{
        url: 'https://www.riksdagen.se/sv/webb-tv/video/debatt-om-forslag/alkohol-narkotika-dopning-tobak-och-spel_hd01sou13/',
        title: 'Centerpartiets Christofer Bergenblock i ANDTS-debatten 2026-02-04, anförande 153',
        quote: 'Från Centerpartiets sida säger vi bestämt nej till alla tankar på legalisering av narkotika.',
        accessedAt,
      }],
    },
  ],
  l: [
    {
      questionId: 's48', value: 4, confidence: 'medium',
      evidence: [{
        url: 'https://www.liberalerna.se/politik/frivillig-dodshjalp',
        title: 'Liberalerna: mål om regelverk efter utredning, begränsat till obotlig dödlig sjukdom med kort tid kvar att leva (2026-05-12)',
        quote: 'Målet är att skapa ett regelverk som både värnar människors självbestämmande och skyddar utsatta personer från påtryckningar.',
        accessedAt,
      }],
    },
  ],
  kd: [
    {
      questionId: 's23', value: 1, confidence: 'high',
      evidence: [{
        url: 'https://www.riksdagen.se/sv/webb-tv/video/debatt-om-forslag/prioriteringar-inom-halso-och-sjukvarden_hd01sou17/',
        title: 'KD:s Christian Carlsson om könstillhörighetslagen 2026-04-16, anförande 98',
        quote: 'det ska krävas medicinsk utredning, en diagnos om könsdysfori och ett godkännande från Socialstyrelsen',
        accessedAt,
      }],
    },
  ],
  sd: [
    {
      questionId: 's16', value: 1, confidence: 'medium',
      evidence: [{
        url: 'https://www.sd.se/tidoavtalet/',
        title: 'Sverigedemokraternas egen redovisning av migrationspolitiken, avsnitt Begränsning av vidarebosättning, uppdaterat 2026-05-22',
        quote: 'Minska antalet kvotflyktingar',
        accessedAt,
      }],
    },
  ],
}
