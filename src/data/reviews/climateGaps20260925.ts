import type { Evidence, PartyResponse } from '../../types'

const accessedAt = '2026-09-25'
const source = (url: string, title: string, quote?: string): Evidence => ({ url, title, quote, accessedAt })
const response = (questionId: string, value: PartyResponse['value'], confidence: PartyResponse['confidence'], ...evidence: Evidence[]): PartyResponse => ({ questionId, value, confidence, evidence })
const unknown = (questionId: string): PartyResponse => response(questionId, null, 'unknown')

const ukraineFunding = source(
  'https://www.regeringen.se/pressmeddelanden/2025/06/blockoverskridande-overenskommelse-nadd-om-historisk-upprustning/',
  'Överenskommelse mellan samtliga åtta riksdagspartier, 19 juni 2025: fortsatt Ukrainastöd och dess finansiering',
  'Behovet av nya försvarsutgifter, inkl. stöd till Ukraina, tillfälligt ska lånefinansieras.',
)
const ukraineV = source(
  'https://www.vansterpartiet.se/var-politik/politik-a-o/ukraina/',
  'Vänsterpartiet: Ukraina, uppdaterad 19 februari 2026',
  'Vänsterpartiet bakom både Sveriges militära, ekonomiska och humanitära stöd till Ukraina.',
)
const ukraineS = source(
  'https://www.socialdemokraterna.se/var-politik/a-till-o/utrikespolitik',
  'Socialdemokraterna: Utrikespolitik, uppdaterad 19 augusti 2026',
  'Fortsätta Sveriges starka och långsiktiga militära, ekonomiska och humanitära stöd till Ukraina',
)
const windV = source(
  'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/motion/energipolitik-for-mer-och-fornybar-el-till-rimliga_hd022797/html/',
  'V:s partimotion 2025/26:2797, avsnitt 5.2: ändrat kommunalt inflytande över vindkraft',
  'kravet på tillstyrkande bör tas bort',
)
const windS = source(
  'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/betankande/tillstandsprovning-enligt-fornybartdirektivet_hd01nu18/html/',
  '2025/26:NU18, reservation 5 (S, V, MP): tidigare bindande kommunala beslut om vindkraft',
  'För att åter få fart på utbyggnaden anser vi därför att det är nödvändigt att reformera det kommunala vetot',
)
const carsL = source(
  'https://www.liberalerna.se/eu-politik/tag',
  'Liberalerna: Transport, avsnittet Fossildrivna bilar ska fasas ut; 2035-målet (felskrivning redovisad i granskningen)',
  'Samtliga vägtransporter i EU ska snarast möjligt vara helt fossilfria.',
)
const carsSd = source(
  'https://www.sd.se/sverige-maste-stoppa-forbudet-av-bensinbilar/',
  'Sverigedemokraterna: Sverige måste stoppa förbudet av bensinbilar, 27 februari 2023',
  'Sverige måste stoppa förbudet av bensinbilar',
)
const fuelMp = source(
  'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/motion/sverige-fortjanar-battre-miljopartiets_hd023770/html/',
  'MP:s budgetmotion 2025/26:3770, avsnitt 24.1.11: höjt koldioxidpris och grön utdelning till landsbygden',
  'höjs priset på koldioxid på bensin',
)
const fuelMpReservation = source(
  'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/betankande/extra-andringsbudget-for-2026-sankt-skatt-pa_hd01fiu48/html/',
  '2025/26:FiU48, reservation 1 (V, MP) mot sänkt bensin- och dieselskatt; kompletterar MP:s långsiktiga budgetlinje',
)
const consumptionMp = source(
  'https://www.mp.se/om/partiprogram/partiprogram-gron-ekonomi/',
  'Miljöpartiets partiprogram 2025, avsnitt 16.2: politiska styrmedel för hållbar konsumtion av varor och tjänster',
  'ekonomiska styrmedel och tydliga regler',
)

// Only cells that were previously unknown are covered. An unknown is not a midpoint.
export const climateGapsReview: Record<string, PartyResponse[]> = {
  v: [unknown('s25'), response('s27', 5, 'high', windV), response('s32', 5, 'high', ukraineFunding, ukraineV), unknown('v10')],
  s: [unknown('s25'), response('s27', 4, 'high', windS), response('s32', 5, 'high', ukraineFunding, ukraineS), unknown('s36'), unknown('s37')],
  mp: [response('s36', 1, 'high', fuelMp, fuelMpReservation), response('v10', 2, 'medium', consumptionMp)],
  c: [unknown('s36'), unknown('s37')],
  l: [response('s25', 5, 'medium', carsL), unknown('s36')],
  m: [unknown('s25'), unknown('s27')],
  kd: [unknown('s25'), response('s32', 5, 'high', ukraineFunding), unknown('s37'), unknown('v10')],
  sd: [response('s25', 1, 'high', carsSd), unknown('s27'), response('s32', 5, 'high', ukraineFunding), unknown('s37'), unknown('v10')],
}
