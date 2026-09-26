import type { AnswerValue, Evidence, PartyResponse } from '../../types'

const interview = (slug: string, party: string): Evidence => ({
  url: `https://tidningen.djurskyddet.se/2026/06/${slug}/`,
  title: `${party}: talespersonens egna svar i Tidningen Djurskyddets valenkät, 18 juni 2026, fråga 6 och 10`,
  accessedAt: '2026-09-26',
})
const sources = {
  v: interview('har-star-vansterpartiet-i-tio-aktuella-djurskyddsfragor', 'V'),
  s: interview('har-star-socialdemokraterna-i-tio-aktuella-djurskyddsfragor', 'S'),
  mp: interview('har-star-miljopartiet-i-tio-djurskyddsfragor', 'MP'),
  c: interview('sa-ska-centerpartiet-arbeta-for-djurskyddet', 'C'),
  l: interview('har-star-liberalerna-i-tio-djurskyddsfragor', 'L'),
  m: interview('sa-ska-moderaterna-agera-for-djurskyddet', 'M'),
  kd: interview('har-star-kristdemokraterna-i-tio-djurskyddsfragor', 'KD'),
  sd: interview('har-star-sverigedemokraterna-i-tio-aktuella-djurskyddsfragor', 'SD'),
}
function answer(questionId: string, value: AnswerValue, rationale: string, evidence: Evidence[] = [], confidence: PartyResponse['confidence'] = 'high'): PartyResponse {
  return { questionId, value, confidence: value == null ? 'unknown' : confidence, evidence, rationale }
}
const missing = (party: string) => ['s52', 's53'].map((id) => answer(id, null,
  `${party}: det granskade programunderlaget ger inget tillräckligt precist besked om denna regel. Allmänna djurskydds- eller näringsprinciper räcker inte för ett siffersvar.`,
))

export const animalsReview: Record<string, PartyResponse[]> = {
  v: [
    answer('s52', 5, 'Vill behålla och utöka mjölkkors rätt till bete; svaret avser alla mjölkkor.', [sources.v]),
    answer('s53', 5, 'Vill besluta om lagförbud snarast så att pälsdjursuppfödning inte återkommer.', [sources.v]),
  ],
  s: [
    answer('s52', 5, 'Vill uttryckligen behålla betesrätten för svenska mjölkkor.', [sources.s]),
    answer('s53', 2, 'Välkomnar avvecklingen men anser för närvarande inte att ytterligare reglering behövs. Det är ett nej till lagförbud nu, inte stöd för pälsdjursuppfödning.', [sources.s]),
  ],
  mp: [
    answer('s52', 5, 'Vill bevara och utöka beteskravet och motsätter sig att det avskaffas.', [sources.mp]),
    answer('s53', 5, 'Vill ha lagförbud för att hindra att uppfödningen återkommer.', [sources.mp]),
  ],
  c: [
    answer('s52', 5, 'Svarar ja till fortsatt betesrätt för samtliga mjölkkor, med ersättning för lantbrukarnas merkostnader.', [sources.c]),
    answer('s53', 2, 'Ser inget aktuellt behov av förbud men förbehåller sig att pröva en framtida proposition. Därför ett försiktigt nej, inte ett principiellt försvar av uppfödningen.', [sources.c], 'medium'),
  ],
  l: [
    answer('s52', 5, 'Försvarar beteskravet för samtliga mjölkkor och vill samtidigt ge lantbrukarna rimlig ersättning.', [sources.l]),
    answer('s53', 5, 'Vill uttryckligen införa lagförbud även efter att minkfarmarna stängts.', [sources.l]),
  ],
  m: [
    answer('s52', null, 'Talespersonen vill ha flexibel beteslagstiftning, men preciserar inte om mjölkkor i lösdrift ska undantas från själva beteskravet.', [sources.m]),
    answer('s53', null, 'Hänvisar till avvecklingsstödet och vill invänta remissen. Det är inte ett tydligt ja eller nej till ett lagförbud.', [sources.m]),
  ],
  kd: [
    answer('s52', 2, 'Vill kunna göra undantag från beteslagen med hänvisning till dagens stallmiljöer. Värdet av bete erkänns, men ett generellt krav stöds inte.', [sources.kd]),
    answer('s53', 5, 'Talespersonen bekräftar att partiet utlovat ett förbud i regeringsställning.', [sources.kd]),
  ],
  sd: [
    answer('s52', 2, 'Vill låta lantbrukaren välja vilka djur som ska beta och i vilken omfattning. Detta ger direkt stöd för undantag från ett generellt krav, även om partiet vill se fler betande djur.', [{
      url: 'https://www.sd.se/wp-content/uploads/2026/05/landsbygdspolitiskt-program.pdf',
      title: 'SD: Ett starkt svenskt lantbruk, 2026, avsnittet Förenkla betesreglerna',
      accessedAt: '2026-09-26',
    }]),
    answer('s53', 5, 'Talespersonen vill genomföra utredningens förbud i enlighet med överenskommelsen med regeringen.', [sources.sd]),
  ],
  fl: missing('Folklistan'),
  nyans: missing('Partiet Nyans'),
  afs: missing('Alternativ för Sverige'),
  pp: missing('Piratpartiet'),
  med: missing('Medborgerlig Samling'),
}
