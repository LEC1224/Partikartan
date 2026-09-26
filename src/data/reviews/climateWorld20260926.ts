import type { AnswerValue, Evidence, PartyResponse } from '../../types'

const source = (url: string, title: string): Evidence => ({ url, title, accessedAt: '2026-09-26' })
const svt = (slug: string) => source(`https://valkompass.svt.se/2026/parti/${slug}/`, 'Partiets egna svar och motiveringar till SVT:s valkompass 2026 (partisidan)')
const sources = {
  v: svt('vansterpartiet'), s: svt('socialdemokraterna'), mp: svt('miljopartiet'), c: svt('centerpartiet'),
  l: svt('liberalerna'), m: svt('moderaterna'), kd: svt('kristdemokraterna'), sd: svt('sverigedemokraterna'),
  cars2024: source('https://valkompass.svt.se/eu-2024/fraga/eu-ska-riva-upp-beslutet-om-forbud-mot-forsaljning-av-nya-bensin-och-dieselbilar-efter-2035/', 'Partiernas egna svar till SVT inför EU-valet 2024: behålla eller riva upp 2035-regeln'),
  vClimate: source('https://www.vansterpartiet.se/var-politik/politik-a-o/klimat/', 'V: Klimatkrisen, uppdaterad 27 januari 2026, nollutsläpp 2035'),
  sClimate: source('https://www.socialdemokraterna.se/var-politik/a-till-o/klimatpolitik', 'S: Klimatpolitik, mål om nettonollutsläpp 2045'),
  sCars: source('https://sieuropaparlamentet.socialdemokraterna.se/s-i-europaparlamentet/var-europapolitik/europapolitik-a-o/transport', 'S i Europaparlamentet: Transport, försvarar stoppet för nya fossilbilar 2035'),
  mpClimate: source('https://www.mp.se/sites/default/files/mpklimatfardplan2021.pdf', 'MP: Klimatfärdplan, 2021, tidigare utsläppsminskning än Sveriges 2045-mål; kompletteras med partiets besked 2026'),
  lClimate: source('https://www.liberalerna.se/wp-content/uploads/hela-vagen-till-noll1.pdf', 'L: Hela vägen till noll, tidigare klimatplan med svenskt målår 2045'),
  lManifest: source('https://www.liberalerna.se/wp-content/uploads/liberalernas-valmanifest-2026-40s-komprimerad.pdf', 'L: Valmanifest 2026, avsnitt 87 och infrastrukturpolitiken'),
  kdClimate: source('https://kristdemokraterna.se/var-politik/politikomraden/europasamarbetet', 'KD: Europasamarbetet, uppdaterad 17 augusti 2026, gemensamma klimatmål för 2050'),
  mCars: source('https://www.svt.se/nyheter/inrikes/tobe-m-svangning-pa-gang-i-eu-fossilbilar-kan-fa-saljas-efter-2035', 'M:s EU-delegationsledare Tomas Tobé i SVT:s egen intervju, 20 november 2025'),
  kdCars: source('https://www.svd.se/a/3pjanX/eu-omprovar-forbud-mot-forbranningsmotorn-vi-valkomnar-det-skriver-kd', 'KD:s Alice Teodorescu Måwe och Peter Kullgren: egen debattartikel om 2035-regeln, 16 december 2025'),
  sdCars: source('https://www.sd.se/sverige-maste-stoppa-forbudet-av-bensinbilar/', 'SD: Sverige måste stoppa förbudet av bensinbilar'),
  nyans: source('https://www.partietnyans.se/politik-a-o/', 'Partiet Nyans: Politik A–Ö, bland annat bränsleskatt och försvar'),
  afs: source('https://alternativforsverige.se/politik/miljo-och-energi/', 'AfS: Miljö- och energipolitik, klimatmål och teknikneutral finansiering'),
  afsEuro: source('https://alternativforsverige.se/alternativ-for-sverige-gor-sitt-nast-starkaste-val-nagonsin-overtraffar-bada-riksdagsvalen/', 'AfS: egen redovisning efter EU-valet 2024, uttryckligt motstånd mot euroanslutning'),
  pp: source('https://piratpartiet.se/sakpolitik-kategori/miljopolitik/', 'Piratpartiet: Miljöpolitik, energi samt transport och infrastruktur'),
  ppEuro: source('https://piratpartiet.se/sakpolitik-kategori/eu-politik/', 'Piratpartiet: EU-politik, avsnitt 4 Valutaunionen, paragraf 14'),
  ppNato: source('https://piratpartiet.se/nyheter/forankra-beslutet-om-nato-hos-folket/', 'Piratpartiets partiledare: Förankra beslutet om NATO hos folket, 6 maj 2022'),
  medEuro: source('https://med.se/politik/partiprogram/eu-politiskt-program', 'MED: EU-politiskt program, avsnitt 2.5 Euron (officiell programtext via webbplatsens dokumentlager)'),
  medEnergy: source('https://med.se/politik/partiprogram/energipolitiskt-program', 'MED: Energipolitiskt program, Kärnkraft, Ekonomiska styrmedel och Vattenfall'),
  medClimate: source('https://med.se/politik/partiprogram/miljopolitiskt-program', 'MED: Miljöpolitiskt program (officiell programtext via webbplatsens dokumentlager)'),
  medForeign: source('https://med.se/politik/partiprogram/utrikespolitiskt-program', 'MED: Utrikespolitiskt program, Sveriges närområde – Ukrainas sak är vår'),
}
function answer(questionId: string, value: AnswerValue, rationale: string, evidence: Evidence[] = [], confidence: PartyResponse['confidence'] = 'high'): PartyResponse {
  return { questionId, value, confidence: value == null ? 'unknown' : confidence, rationale, evidence }
}
const missing = (id: string, rationale: string, evidence: Evidence[] = []) => answer(id, null, rationale, evidence)

export const climateWorldReview: Record<string, PartyResponse[]> = {
  v: [
    answer('s25', 5, 'Försvarar 2035-regeln i det egna EU-valssvaret och vill se ett tidigare stopp. Källan är från 2024; inget senare precist avvikande besked hittades.', [sources.cars2024], 'medium'),
    answer('s26', 5, 'Den aktuella rikspolicyn anger nollutsläpp redan 2035.', [sources.vClimate]),
    answer('s33', 4, 'Driver enligt sitt eget svar 2026 inte utträde i dag, men vill förändra säkerhetssamarbetet. Äldre medlemskapsmotstånd ger därför inte längre ett nej till att fortsätta nu.', [sources.v]),
    answer('s36', 2, 'Vill ge riktat kontantstöd till bilberoende hushåll i stället för en allmän sänkning av drivmedelsskatten.', [sources.v]),
    answer('s55', 1, 'Vill behålla självständig penningpolitik och respektera folkomröstningens nej.', [sources.v]),
  ],
  s: [
    answer('s25', 5, 'Partiets EU-delegation försvarar 2035-stoppet, i linje med det egna tidigare enkätsvaret.', [sources.sCars, sources.cars2024]),
    answer('s26', 5, 'Den aktuella rikspolicyn anger nettonoll 2045. Ett annat svar om mer ambitiösa mål i SVT får inte ersätta det uttryckliga beskedet om just målåret.', [sources.sClimate]),
    missing('s36', 'Det aktuella svaret gäller uttryckligen en tillfällig krissänkning. Det belägger inte en permanent sänkning.', [sources.s]),
    answer('s55', 2, 'Vill inte ompröva folkomröstningens nej i nuläget, men följer frågan.', [sources.s]),
  ],
  mp: [
    answer('s25', 5, 'Vill behålla 2035-regeln och föredrar snabbare omställning. Det precisa enkätsvaret är från 2024.', [sources.cars2024], 'medium'),
    answer('s26', 5, 'Vill nå målen tidigare än Sveriges 2045-mål; den äldre klimatfärdplanens riktning bekräftas av det egna svaret 2026.', [sources.mpClimate, sources.mp]),
    answer('s33', 4, 'Vill stanna i det rådande säkerhetsläget och stärka samarbetet inom Nato. Bedömningen avser nuvarande medlemskap, inte tidigare anslutningsmotstånd.', [sources.mp]),
    answer('s55', 1, 'Vill behålla kronan för självständigt demokratiskt inflytande över den ekonomiska politiken.', [sources.mp]),
  ],
  c: [
    answer('s25', 5, 'Försvarar uttryckligen 2035-regeln i sitt eget EU-valssvar. Det precisa beskedet är från 2024.', [sources.cars2024], 'medium'),
    answer('s26', 5, 'Anger klimatneutralitet 2040 i det egna svaret 2026.', [sources.c]),
    answer('s27', 4, 'Vill behålla vetorätten men flytta beslutet till tidigare i processen. Det ger stöd för en begränsning, inte för att helt ta bort kommunens inflytande.', [sources.c], 'medium'),
    missing('s34', 'Avvisar det riktade kärnkraftspaketet men öppnar för teknikneutralt stöd. Det räcker inte för att entydigt avgöra frågans bredare ekonomiska riskdelning.', [sources.c]),
    answer('s36', 1, 'Säger uttryckligen nej till permanenta sänkningar, samtidigt som en tillfällig sänkning accepteras.', [sources.c]),
    missing('s55', 'Det egna enkätkrysset är försiktigt positivt, men motiveringen föreslår en utredning och beskriver möjliga fördelar. Eftersom vår fråga gäller själva införandet räcker detta inte för ett entydigt siffersvar.', [sources.c]),
  ],
  l: [
    answer('s25', 5, 'Det egna EU-valssvaret vill tidigarelägga stoppet till 2030. Säkrare stöd än den tidigare policytextens motsägelsefulla formulering, men beskedet är från 2024.', [sources.cars2024], 'medium'),
    missing('s26', 'Den tidigare klimatplanen anger Sverige 2045, medan 2026 års manifest och SVT-svar betonar EU 2050. Något entydigt aktuellt besked om ett separat tidigare svenskt målår har inte kunnat fastställas.', [sources.lClimate, sources.lManifest, sources.l]),
    missing('s27', 'Det aktuella svaret motsätter sig försvagat kommunalt inflytande. Det är oklart vilka eventuella begränsningar av dagens veto partiet samtidigt accepterar.', [sources.l]),
    missing('s36', 'Aktuellt stöd för lägre drivmedelsskatt kopplas till hushållens ekonomiska läge. Varaktigheten preciseras inte.', [sources.l]),
    missing('s37', 'Manifestet förespråkar flera trafikslag men ger inte tillräckligt stöd för den uttryckliga prioriteringen framför nya större vägprojekt.', [sources.lManifest]),
    answer('s55', 5, 'Vill införa euron och delta fullt ut i valutaunionen.', [sources.l]),
  ],
  m: [
    missing('s25', 'Partiet försvarade det strikta stoppet 2024. EU-delegationsledaren förutser en uppluckring i november 2025, men beskriver en ännu okänd kompromiss utan ett precist eget besked. Varken det äldre ja-svaret eller ett nytt nej kan därför användas säkert.', [sources.mCars, sources.cars2024]),
    answer('s26', 4, 'Försvarar Sveriges mål om nettonoll 2045, med betoning på ekonomiskt genomförande.', [sources.m]),
    missing('s27', 'Vill behålla vetot och förbättra beslutsprocessen. Tidigare information är inte i sig ett besked om att vetorätten ska begränsas.', [sources.m]),
    missing('s37', 'Den tidigare mittkodningen byggde på allmänna infrastruktursatsningar. Stöd till flera trafikslag belägger inte ett uttryckligt neutralt svar på prioriteringen.'),
    missing('s55', 'Det egna enkätkrysset är försiktigt positivt, men motiveringen säger att ett nytt ställningstagande ska prövas först efter utredning. Det är inte ett entydigt besked om själva införandet.', [sources.m]),
  ],
  kd: [
    answer('s25', 1, 'Partiets klimatpolitiska företrädare motsätter sig ett krav som bara räknar avgasutsläpp och vill tillåta nya förbränningsmotorer även efter 2035.', [sources.kdCars]),
    answer('s26', 1, 'Vill utgå från EU:s gemensamma målår 2050 och avvisar separata strängare svenska klimatmål.', [sources.kdClimate]),
    answer('s55', 2, 'Avvisar euroinförande inom överskådlig tid men accepterar en förutsättningslös utredning.', [sources.kd]),
  ],
  sd: [
    answer('s25', 1, 'Vill stoppa försäljningsförbudet för nya bensinbilar.', [sources.sdCars]),
    answer('s26', 1, 'Motsätter sig striktare nationella klimatmål än EU:s gemensamma krav.', [sources.sd]),
    answer('s27', 1, 'Försvarar uttryckligen kommunernas vetorätt.', [sources.sd]),
    answer('s55', 1, 'Vill behålla kronan och den egna penningpolitiken.', [sources.sd]),
  ],
  fl: [
    missing('s25', 'Det begränsade arkiverade EU-valsmaterialet ger inte ett tillräckligt precist besked om avgasutsläppskravet och målåret.'),
    missing('s26', 'Det granskade äldre materialet belägger inte inställningen till just ett svenskt nettonollmål före 2050.'),
    missing('s55', 'EU-kritik ger inte i sig ett belägg om valutaunionen. Ett precist partibesked saknas i det granskade materialet.'),
  ],
  nyans: [
    missing('s25', 'Energipolitiken beskriver elektrifiering men ger inget precist besked om det aktuella nybilskravet.', [sources.nyans]),
    missing('s26', 'Den granskade rikspolicyn ger inte ett bestämt målår för svenska nettonollutsläpp.', [sources.nyans]),
    answer('s36', 5, 'Vill sänka bränsleskatten som generell politik, med uttryckligt motiv om kostnader för landsbygd och hushåll.', [sources.nyans]),
    missing('s55', 'Något precist besked om kronan och euron hittades inte i partiets A–Ö-program.', [sources.nyans]),
  ],
  afs: [
    missing('s25', 'Motstånd mot klimatmål och höga bränsleskatter belägger inte i sig svaret på det specifika nybilskravet 2035.', [sources.afs]),
    answer('s26', 1, 'Vill uttryckligen överge det svenska målet om nollutsläpp 2045.', [sources.afs]),
    missing('s34', 'Vill ha teknikneutrala villkor och lika subventionsnivåer om stöd anses berättigade. Det gamla kategoriska nejet till all ekonomisk riskdelning för kärnkraft hade därför för svagt stöd.', [sources.afs]),
    answer('s55', 1, 'Har uttryckligen tagit strid mot svensk euroanslutning, utöver sin allmänna EU-kritik.', [sources.afsEuro]),
  ],
  pp: [
    missing('s25', 'Programmet behandlar miljöeffekter och transporter men inte just 2035-kravet.', [sources.pp]),
    missing('s26', 'Programmet ger inte ett tillräckligt precist svenskt nettonollår.', [sources.pp]),
    missing('s33', 'Partiledarens tidigare besked avstod från att ta ställning. Det får varken bli ett ja, nej eller numeriskt mittsvar om fortsatt medlemskap.', [sources.ppNato]),
    missing('s34', 'Vill finansiera forskning och försöksanläggningar. Det besvarar inte stöd till kommersiell nybyggnad och belägger inte heller det tidigare nejet.', [sources.pp]),
    answer('s55', 1, 'Det nu publicerade EU-programmet säger uttryckligen att Sverige ska behålla kronan.', [sources.ppEuro]),
  ],
  med: [
    answer('s32', 5, 'Vill uttryckligen fortsätta och skala upp det militära stödet till Ukraina. Detta ersätter hänvisningen till ett idéprogram från före den fullskaliga invasionen.', [sources.medForeign]),
    missing('s25', 'Det kontrollerade energi- och miljöprogrammet ger inte ett precist besked om avgasutsläppskravet 2035.', [sources.medEnergy, sources.medClimate]),
    missing('s26', 'Klimatprogrammets resonemang om effektivitet ger inte ett tillräckligt precist svenskt nettonollår.', [sources.medClimate]),
    answer('s34', 4, 'Vill bilda ett bolag för kärnkraftsutbyggnad och sänka Vattenfalls avkastningskrav. Det ger stöd för viss offentlig finansiering/riskdelning trots motstånd mot kraftslagssubventioner i allmänhet.', [sources.medEnergy], 'medium'),
    answer('s55', 1, 'EU-programmet avvisar euron och vill ha ett permanent svenskt undantag.', [sources.medEuro]),
  ],
}
