import type { Evidence, PartyResponse } from '../../types'

const source = (url: string, title: string): Evidence => ({ url, title, accessedAt: '2026-09-26' })
const r = (questionId: string, value: PartyResponse['value'], confidence: PartyResponse['confidence'], rationale: string, ...evidence: Evidence[]): PartyResponse => ({ questionId, value, confidence, rationale, evidence })
const u = (questionId: string, rationale: string): PartyResponse => r(questionId, null, 'unknown', rationale)
const rd = 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/'
const citizenship = source(`${rd}betankande/skarpta-krav-for-svenskt-medborgarskap_hd01sfu28/html/`, 'SfU28 2025/26: kunskapskrav; V/MP:s reservation 1 och S:s reservation om åldersgränsen')
const citizenshipDebate = source('https://www.riksdagen.se/sv/webb-tv/video/debatt-om-forslag/skarpta-krav-for-svenskt-medborgarskap_hd01sfu28/', 'SfU28: partiföreträdarnas egna anföranden om språk- och samhällskunskapskrav, särskilt C anförande 52 och 82')
const witnesses = source(`${rd}betankande/anonyma-vittnen_hc01juu6/html/`, 'JuU6 2024/25: anonyma vittnen; utskottets ställningstagande och reservation 1 (V, C, MP)')
const ai = source(`${rd}betankande/polisens-anvandning-av-ai-for-ansiktsigenkanning-i_hd01juu28/html/`, 'JuU28 2025/26: ansiktsigenkänning i realtid, utskottet och C:s reservation 1')
const aiV = source(`${rd}motion/med-anledning-av-prop-202526150-polisens_hd023947/`, 'V:s följdmotion 2025/26:3947: reglerad tillåtelse med domstolsprövning och tidsgräns')
const aiMp = source(`${rd}motion/med-anledning-av-prop-202526150-polisens_hd023953/`, 'MP:s följdmotion 2025/26:3953: snäva undantag, förstärkt prövning och utvärdering')
const youth = source(`${rd}betankande/skarpta-regler-for-unga-lagovertradare_hd01juu41/`, 'JuU41 2025/26, punkt 2: partiernas röster om just 14 års straffbarhetsålder')
const abortion = source(`${rd}betankande/en-grundlagsskyddad-abortratt-samt-utokade_hd01ku34/html/`, 'KU34 2025/26: särskilt ställningstagandet om aborträtt och reservationerna om starkare skydd')
const courts = source(`${rd}protokoll/protokoll-20252615-onsdagen-den-1-oktober_hd0915/html/`, 'Protokoll 2025/26:15, anföranden 1–8: respektive partis uttryckliga stöd till domstolarnas oberoende')
const discipline = source(`${rd}betankande/battre-forutsattningar-for-trygghet-och-studiero-i_hd01ubu22/html/`, 'UbU22 2025/26: tillfällig placering vid annan skolenhet; partiernas ställningstaganden och reservationer')
const eu2026 = source(`${rd}betankande/verksamheten-i-europeiska-unionen-under-2025_hd01uu10/html/`, 'UU10 2025/26: särskilt ställningstagande om kvalificerad majoritet i utrikespolitiken och SD:s särskilda yttrande')
const schoolRules = source(`${rd}betankande/overgripande-skolfragor_hd01ubu7/html/`, 'UbU7 2025/26: särskilt ställningstagande om skolor med konfessionell inriktning')
const cSchool = source(`${rd}motion/en-skola-for-kunskap-och-livsresor_hd023186/html/`, 'C:s partimotion 2025/26:3186, avsnitt 19: konfessionella inslag avskilda i rum och tid')
const sdSchool = source('https://www.riksdagen.se/sv/webb-tv/video/debatt-om-forslag/overgripande-skolfragor_hd01ubu7/', 'UbU7, anföranden 116 och 135–139: SD skiljer mellan muslimska och andra konfessionella skolor')
const vProgram = source('https://www.vansterpartiet.se/resursbank/partiprogram/', 'Vänsterpartiets partiprogram: demokrati, rättsstat och fria medier')
const sProgram = source('https://www.socialdemokraterna.se/download/18.66b0e5c8197581879ca15ce/1749742402637/Socialdemokraternas%20partiprogram%202025.pdf', 'Socialdemokraternas partiprogram 2025: demokrati och demokratisk tillsättning av statschefen')
const mpProgram = source('https://www.mp.se/wp-content/uploads/2025/12/miljopartiets-partiprogram-2025.pdf', 'Miljöpartiets partiprogram 2025: avsnitt 7.2–7.3 och 14.4')
const mProgram = source('https://moderaterna.se/app/uploads/2022/01/Ideprogram_digitalt_9dec.pdf', 'Moderaternas idéprogram: En demokratisk rättsstat och Ett tryggt samhälle, tryckta sidor 31–33')
const kdProgram = source('https://kristdemokraterna.se/download/18.7932b3db19c9887db6c221c/1773136182639/Principprogram%20hemsida.pdf', 'Kristdemokraternas principprogram, avsnitt 2.2–2.3: maktdelning, monarki och påföljdernas ändamål')
const sdProgram = source('https://www.sd.se/wp-content/uploads/2024/01/sverigedemokraternas-principprogram-2023.pdf', 'Sverigedemokraternas principprogram 2023: demokrati, monarki och kriminalpolitik')
const ppProgram = source('https://piratpartiet.se/wp-content/uploads/2026/09/2024-04-24-Piratpartiet-Sakpolitik.pdf', 'Piratpartiets sakpolitik: Demokrati, grundlagsskydd och oberoende konstitutionsdomstol, sidor 12–15')
const ppPrinciples = source('https://piratpartiet.se/principprogram/', 'Piratpartiets principprogram: rättsstat, maktdelning och granskning av makten')
const medIdea = source('https://www.med.se/wp-content/uploads/2021/03/Ideprogram-rev2-stamma-2019.pdf', 'MED:s idéprogram 2019, sida 13: konstitutionell monarki, maktdelning och författningsdomstol; indexerad primärtext')
const medDemocracy = source('https://www.med.se/politik/demokrati', 'MED: Demokrati, aktuell sidtext hämtad från webbplatsens publika policies-data')
const nyans = source('https://www.partietnyans.se/var-politik/politik-a-o/', 'Partiet Nyans: Politik A–Ö, avsnitten Lag och ordning och Våldtäkt')
const afsReturn = source('https://alternativforsverige.se/politik/atervandring/', 'AfS: Återvandring, medborgarskapstest i svenska, historia, kultur och samhällsliv')
const afsCrime = source('https://alternativforsverige.se/politik/lag-och-ordning/', 'AfS: Lag och ordning, straffens proportioner och brottsoffers upprättelse')
const afsDemocracy = source('https://alternativforsverige.se/politik/demokrati/', 'AfS: Demokrati, avsnittet Folkomröstningar')
const afsCulture = source('https://alternativforsverige.se/politik/kulturpolitik/', 'AfS: Kulturpolitik, public service-uppdraget och privata nöjesprogram')
const ps = (slug: string, party: string) => source(`https://valkompass.svt.se/2026/parti/${slug}/`, `${party}s eget svar i SVT:s valkompass 2026: motiveringen om public services innehållsuppdrag`)
const cMedia = source('https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/kultur-media-och-idrott/media-och-public-service', 'Centerpartiet: Media och public service, oberoende medier och brett utbud')
const lMedia = source('https://www.liberalerna.se/politik/public-service', 'Liberalerna: Public service, oberoende och grundlagsskydd')
const noPreciseYouth = 'Inget direkt belägg för just den tidsbegränsade 14-årsregeln. Allmän straffpolitik avgör inte denna fråga.'
const noEu = 'Det granskade materialet ger inget säkert svar om majoritetsbeslut i EU:s utrikespolitik. Allmän EU-politik är inte tillräckligt.'
const noVoteFrequency = 'Materialet ger inget uttryckligt generellt krav på fler nationella folkomröstningar; stöd i enskilda frågor räcker inte.'
const noSchoolMove = 'Stöd för ordning eller elevstöd räcker inte som belägg för disciplinär placering vid en annan skola.'
const noMoralPunishment = 'Beläggen avgör inte om straffskärpning bör användas för att uttrycka samhällets värderingar. Brottsbekämpning i allmänhet räcker inte.'
const noInstitutions = 'Det granskade materialet avgör inte prioriteringen mellan institutionella spärrar/fri press och den politiska majoritetens snabbhet.'

// Every active question in this review is reassessed for every party. Unknown is
// an explicit withdrawal when an earlier, broader question had a coded answer.
export const law20260926Review: Record<string, PartyResponse[]> = {
  v: [
    r('s18', 1, 'high', 'Avvisar uttryckligen språk- och samhällskunskapskrav, inte bara andra delar av medborgarskapspaketet.', citizenship),
    r('s19', 1, 'high', 'Reservation 1 avvisar själva systemet med anonyma vittnen.', witnesses),
    r('s20', 4, 'medium', 'Accepterar en reglerad möjlighet men kräver domstolsbeslut i alla fall, offentligt ombud och tidsbegränsning.', aiV),
    r('s21', 1, 'high', 'Motsätter sig just sänkningen till 14 år, enligt reservation och punkt 2.', youth),
    r('s28', 5, 'high', 'Vill ha grundlagsskydd även för utländska medborgare; paketinvändningarna är inte motstånd mot aborträtten.', abortion),
    u('s29', noVoteFrequency), u('s30', noEu),
    r('s38', 5, 'high', 'Jessica Wetterling, anförande 4, stöder uttryckligen förstärkt domstolsoberoende.', courts),
    r('s39', 1, 'high', 'Vill uttryckligen ha ett brett utbud inklusive underhållning. Endast innehållsmotiveringen används.', ps('vansterpartiet', 'Vänsterpartiet')),
    r('s41', 4, 'medium', 'Accepterar lagens placeringsmöjlighet; invändningen gäller slopad dokumentation, inte själva placeringen. Elevens stödbehov betonas.', discipline),
    r('s51', 1, 'high', 'Vill förbjuda religiösa friskolor, även frivilliga religiösa inslag i utbildningen.', source('https://www.vansterpartiet.se/var-politik/politik-a-o/religiosa-friskolor/', 'Vänsterpartiet: Religiösa friskolor, uppdaterad 19 februari 2026')),
    r('v14', 1, 'high', 'Vill avskaffa monarkin och utse statschefen demokratiskt.', source('https://www.vansterpartiet.se/var-politik/politik-a-o/monarki/', 'Vänsterpartiet: Monarki')),
    u('v18', noMoralPunishment),
    r('v23', 4, 'medium', 'Försvarar oberoende granskning och förstärkta konstitutionella spärrar. Den allmänna prioriteringen är en försiktig tolkning.', vProgram, courts),
  ],
  s: [
    r('s18', 5, 'high', 'Stöder kunskapskraven men vill ha 18 års åldersgräns; frågan gäller huvudregeln och medger undantag för barn.', citizenship, citizenshipDebate),
    r('s19', 5, 'high', 'Stöder det definierade systemet och vill följa upp det; det krävs inget antagande om ytterligare utvidgning.', witnesses),
    r('s20', 5, 'high', 'Stöder den särskilda lagen om ansiktsigenkänning i realtid och utskottets motivering.', ai),
    r('s21', 5, 'high', 'Stöder just 14-årsregeln, enligt punkt 2 och partiets förklaring.', youth),
    r('s28', 5, 'high', 'Stöder uttryckligen grundlagsskyddet; särskilt yttrande kräver fungerande tillgång till abort.', abortion),
    u('s29', noVoteFrequency),
    r('s30', 4, 'high', 'Vill ha kvalificerad majoritet för vissa utrikesbeslut, särskilt sanktioner och mänskliga rättigheter; inte för allt.', source('https://www.socialdemokraterna.se/var-politik/a-till-o/europa-och-eu', 'Socialdemokraterna: Europa och EU, majoritetsbeslut om sanktioner och mänskliga rättigheter')),
    r('s38', 5, 'high', 'Hans Ekström, anförande 1, stöder den friare domstolsadministrationen och skyddade domartillsättningen.', courts),
    r('s39', 1, 'high', 'Motiveringen försvarar det breda innehållsuppdraget och avvisar begränsning.', ps('socialdemokraterna', 'Socialdemokraterna')),
    r('s41', 4, 'medium', 'Stöder placeringsreglerna i sak med betoning på stöd och förebyggande arbete; frågan gäller en befintlig möjlighet.', discipline),
    r('s51', 1, 'high', 'Vill förbjuda alla religiösa friskolor oavsett religion och samtidigt värna nationella minoriteters rättigheter; källan anger inget etableringsundantag.', source('https://www.socialdemokraterna.se/var-politik/a-till-o/religiosa-skolor', 'Socialdemokraterna: Religiösa skolor, förbud med hänsyn till nationella minoriteter')),
    r('v14', 1, 'high', 'Partiprogrammet kräver att monarkin avskaffas. Det är en principståndpunkt, inte ett påstående om omedelbar genomförandeplan.', sProgram),
    u('v18', noMoralPunishment),
    r('v23', 4, 'medium', 'Programmet och stödet för starkare grundlagsspärrar talar för oberoende granskning; ingen exakt tidsprioritering anges.', sProgram, courts),
  ],
  mp: [
    r('s18', 1, 'high', 'Invänder uttryckligen mot bindande kunskapskrav som kan utestänga grupper från medborgarskap.', citizenship),
    r('s19', 1, 'high', 'Gemensam reservation med V och C mot systemet med anonyma vittnen.', witnesses),
    r('s20', 4, 'medium', 'Medger ett fåtal motiverade undantag men kräver snävare omfattning, domstolsprövning, högre misstankegrad samt tidsbegränsning och utvärdering före permanentning.', aiMp),
    r('s21', 1, 'high', 'Motsätter sig den särskilda 14-årsregeln.', youth),
    r('s28', 5, 'high', 'Vill ha ett uttryckligt och reellt grundlagsskydd; reservationen efterfrågar starkare skydd.', abortion),
    u('s29', noVoteFrequency),
    r('s30', 4, 'high', 'Vill att sanktioner för brott mot mänskliga rättigheter ska beslutas med kvalificerad majoritet; stödet gäller en del av utrikespolitiken.', source('https://www.mp.se/wp-content/uploads/2022/05/forsvars-och-sakerhetspolitiskt-program-antaget-ps-21-10-07-plg-22-06.pdf', 'MP:s antagna försvars- och säkerhetspolitiska program, sida 28: majoritetsbeslut om sanktioner')),
    r('s38', 5, 'high', 'Jan Riise, anförande 7, stöder konkret skydd mot regeringars påverkan på domstolar.', courts),
    r('s39', 1, 'high', 'Försvarar ett brett innehåll som tilltalar hela befolkningen.', ps('miljopartiet', 'Miljöpartiet')),
    r('s41', 4, 'medium', 'Stöder placeringsmöjligheten i lagärendet men betonar stöd, förebyggande åtgärder och uppföljning.', discipline),
    r('s51', 2, 'high', 'Vill utreda förbud med uttrycklig hänsyn till Europakonventionen och nationella minoriteters rättigheter; ett kvalificerat nej till generell tillåtelse.', source(`${rd}motion/forskola-och-skola-for-en-hallbar-framtid_hd023364/html/`, 'MP:s kommittémotion 2025/26:3364, avsnitt Förbjud religiösa friskolor')),
    r('v14', 1, 'high', 'Programmet vill avskaffa monarkin på sikt; frågan gäller principen.', mpProgram),
    u('v18', noMoralPunishment),
    r('v23', 4, 'medium', 'Starkt stöd för fria medier, domstolsoberoende och spärrar mot maktkoncentration; jämförelsen med snabbhet är en tolkning.', mpProgram, courts),
  ],
  c: [
    r('s18', 4, 'medium', 'Företrädaren accepterar i huvudsak kraven och öppnar uttryckligen för språk- och samhällsprov men invänder mot bristande övergångsregler.', citizenshipDebate),
    r('s19', 1, 'high', 'Avvisar systemet i reservation 1.', witnesses),
    r('s20', 2, 'medium', 'Avvisar realtidslagen som alltför ingripande men är positivt till AI och ansiktsanalys i efterhand.', ai),
    r('s21', 1, 'high', 'Motsätter sig sänkningen till 14 år.', youth),
    r('s28', 5, 'high', 'Vill ha ett starkare uttryckligt grundlagsskydd än regeringens förslag.', abortion),
    u('s29', noVoteFrequency),
    r('s30', 5, 'high', 'Valmanifestet kräver uttryckligen avskaffad vetorätt i utrikes- och säkerhetspolitiken.', source('https://val2026.centerpartiet.se/wp-content/uploads/2026/06/Valmanifest-2026.pdf', 'Centerpartiets valmanifest 2026: avskaffa vetorätten i EU:s utrikes- och säkerhetspolitik')),
    r('s38', 5, 'high', 'Muharrem Demirok, anförande 5, stöder reglerna om domares anställning och begränsad politisk tillsyn.', courts),
    r('s39', 1, 'high', 'Det egna svaret och rikspolicyn försvarar ett brett utbud, uttryckligen även underhållning.', ps('centerpartiet', 'Centerpartiet'), cMedia),
    r('s41', 4, 'medium', 'Stöder placeringsmöjligheten i lagärendet; stödet kodas inte som krav på ytterligare framtida befogenheter.', discipline),
    r('s51', 4, 'medium', 'Accepterar konfessionella inslag men kräver att de sker före eller efter skoldagen och åtskilda från undervisningen.', cSchool, schoolRules),
    r('v14', 5, 'high', 'Vill behålla dagens ceremoniella, opolitiska monarki.', source('https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/demokrati/monarki', 'Centerpartiet: Monarki')),
    u('v18', noMoralPunishment),
    r('v23', 4, 'medium', 'Försvarar fria medier och konstitutionella spärrar; den generella avvägningen är en försiktig bedömning.', cMedia, courts),
  ],
  l: [
    r('s18', 5, 'high', 'Stöder uttryckligen språk- och samhällskunskapskrav för medborgarskap.', citizenshipDebate),
    r('s19', 5, 'high', 'Stöder införandet av det definierade systemet.', witnesses),
    r('s20', 5, 'high', 'Stöder den särskilda realtidslagen med nödvändighets- och tillståndskrav.', ai),
    r('s21', 5, 'high', 'Stöder just 14-årsregeln i punkt 2.', youth),
    r('s28', 5, 'high', 'Stöder grundlagsskyddet i utskottets särskilda bedömning av aborträtten.', abortion),
    u('s29', noVoteFrequency),
    r('s30', 5, 'high', 'Vill uttryckligen avskaffa vetorätten i utrikes- och säkerhetsfrågor.', source('https://www.liberalerna.se/politik/europeiska-unionen', 'Liberalerna: Europeiska unionen')),
    r('s38', 5, 'high', 'Mauricio Rojas, anförande 8, vill gå längre med ett självständigt domstolsråd.', courts),
    r('s39', 1, 'high', 'Vill ha ett brett uppdrag, även möjlighet att sända stora sportevenemang.', ps('liberalerna', 'Liberalerna')),
    r('s41', 5, 'high', 'Förespråkar uttryckligen lättare omplacering av våldsamma elever och stöder placeringsreglerna.', source('https://www.liberalerna.se/politik/trygghet-och-studiero', 'Liberalerna: Trygghet och studiero'), discipline),
    r('s51', 1, 'high', 'Kräver uttryckligen stopp för nya religiösa friskolor. Minoritetsskolor ska kunna stärka språk och kultur utan religiös undervisning.', source('https://www.liberalerna.se/politik/religiosa-friskolor', 'Liberalerna: Religiösa friskolor')),
    r('v14', 5, 'high', 'Vill behålla dagens monarki utan politisk makt.', source('https://www.liberalerna.se/politik/monarki', 'Liberalerna: Monarki')),
    u('v18', noMoralPunishment),
    r('v23', 4, 'medium', 'Vill grundlagsskydda mediers oberoende och införa starkare domstolsspärrar.', lMedia, courts),
  ],
  m: [
    r('s18', 5, 'high', 'Viktor Wärnick motiverar uttryckligen båda kunskapskraven i debatten.', citizenshipDebate),
    r('s19', 5, 'high', 'Stöder systemet med skyddade vittnesidentiteter och domstolsprövning.', witnesses),
    r('s20', 5, 'high', 'Stöder den särskilda realtidslagen och dess avgränsningar.', ai),
    r('s21', 5, 'high', 'Stöder just 14-årsregeln i punkt 2.', youth),
    r('s28', 5, 'high', 'Stöder den särskilda motiveringen om grundlagsskyddad aborträtt.', abortion),
    u('s29', noVoteFrequency),
    r('s30', 4, 'medium', 'Den M-ledda regeringens utrikesdeklaration och partiets utskottsställningstagande förespråkar fler majoritetsbeslut, särskilt om sanktioner.', eu2026),
    r('s38', 5, 'high', 'Ulrik Nilsson, anförande 3, stöder förstärkt domstolsoberoende.', courts),
    r('s39', 2, 'high', 'Det aktuella egna svaret förespråkar ett brett uppdrag. Äldre förslag om smalare public service används inte framför detta besked.', ps('moderaterna', 'Moderaterna')),
    r('s41', 5, 'high', 'Stöder den konkreta placeringsmöjligheten i det egna lagförslaget.', discipline),
    r('s51', 4, 'medium', 'Utskottets sakmotivering försvarar tillåtelse med demokrativillkor och tillsyn. Det äldre tillfälliga etableringsstoppet kodas inte som permanent förbud.', schoolRules),
    r('v14', 5, 'high', 'Idéprogrammet försvarar den konstitutionella monarkin som en samlande institution.', mProgram),
    r('v18', 4, 'medium', 'Kopplar stränga straff till brottets allvar, brottsoffer och förtroendet för rättsstaten; detta belägger ett kvalificerat signalvärde.', mProgram),
    r('v23', 4, 'medium', 'Idéprogrammet förbjuder majoriteten att behandla minoriteten godtyckligt och försvarar maktbalans och oberoende domstolar.', mProgram, courts),
  ],
  kd: [
    r('s18', 5, 'high', 'Partiets företrädare stöder språk- och samhällskunskapskraven i sak.', citizenshipDebate),
    r('s19', 5, 'high', 'Stöder systemet med anonyma vittnen.', witnesses),
    r('s20', 5, 'high', 'Stöder den särskilda realtidslagen.', ai),
    r('s21', 5, 'high', 'Stöder just 14-årsregeln i punkt 2.', youth),
    r('s28', 5, 'high', 'Stöder grundlagsskyddet i KU34. Det tidigare mittsvaret byggde inte på den aktuella ståndpunkten.', abortion),
    u('s29', 'Principprogrammet tillåter folkomröstningar på flera nivåer men anger inte att nationella omröstningar generellt ska bli vanligare.'),
    r('s30', 4, 'high', 'EU-valmanifestet vill ersätta enhällighet med majoritet för sanktioner; stödet är avgränsat till en del av utrikespolitiken.', source('https://kristdemokraterna.se/download/18.5169119918fa43c06dcb585/1717580241298/EU%20Valmanifest-KD.pdf', 'Kristdemokraternas EU-valmanifest 2024: effektivare gemensamma sanktioner')),
    r('s38', 5, 'high', 'Gudrun Brunegård, anförande 6, motiverar uttryckligen friare administration och tryggad domarställning.', courts),
    r('s39', 5, 'high', 'Den aktuella rikspolicyn och det egna kompassvaret räknar uttryckligen upp det fokuserade innehållsuppdraget.', source('https://kristdemokraterna.se/var-politik/politik-a-till-o/public-service', 'Kristdemokraterna: Public service, uppdaterad 20 augusti 2026'), ps('kristdemokraterna', 'Kristdemokraterna')),
    r('s41', 5, 'high', 'Stöder den konkreta placeringsmöjligheten i regeringens lagförslag.', discipline),
    r('s51', 4, 'medium', 'Stöder den reglerade möjligheten till konfessionella skolor i utskottets särskilda sakmotivering, med frivilliga inslag och tillsyn.', schoolRules),
    r('v14', 5, 'high', 'Principprogrammet säger uttryckligen att Sverige ska fortsätta vara en konstitutionell monarki.', kdProgram),
    r('v18', 4, 'medium', 'Påföljder ska också uttrycka respekt för brottsoffret och låta förövaren sona sin skuld, utöver brottsförebyggande syften.', kdProgram),
    r('v23', 4, 'medium', 'Programmet förespråkar maktdelning, fria medier, självständiga domstolar och författningsdomstol.', kdProgram),
  ],
  sd: [
    r('s18', 5, 'high', 'Principprogrammet och debatten kräver kunskaper i svenska och svenskt samhällsliv.', sdProgram, citizenshipDebate),
    r('s19', 5, 'high', 'Stöder systemet med anonyma vittnen.', witnesses),
    r('s20', 5, 'high', 'Stöder den särskilda realtidslagen.', ai),
    r('s21', 5, 'high', 'Stöder just 14-årsregeln i punkt 2.', youth),
    r('s28', 5, 'high', 'Stöder grundlagsskyddet i utskottets särskilda sakmotivering.', abortion),
    r('s29', 5, 'high', 'Principprogrammet förespråkar uttryckligen fler beslutande folkomröstningar även på nationell nivå.', sdProgram),
    r('s30', 2, 'high', 'Vill behålla enhällighet i centrala delar av utrikes- och säkerhetspolitiken. Senaste yttrandet avser vissa delar; inte ett säkert nej till varje möjligt undantag.', eu2026, source('https://www.riksdagen.se/sv/webb-tv/video/utrikespolitisk-debatt/utrikespolitisk-debatt_hdc120260218ud/', 'Aron Emilsson, utrikespolitisk debatt 18 februari 2026, anförande 52: nej till majoritetsbeslut i utrikespolitiken')),
    r('s38', 5, 'high', 'Martin Westmont, anförande 2, välkomnar uttryckligen stärkt domstolsoberoende trots invändningar mot andra delar av grundlagspaketet.', courts),
    r('s39', 5, 'high', 'Det egna svaret vill överlåta bred underhållning till privata aktörer och fokusera public services uppdrag.', ps('sverigedemokraterna', 'Sverigedemokraterna')),
    r('s41', 5, 'high', 'Stöder den konkreta placeringsmöjligheten och lagens trygghetsåtgärder.', discipline),
    r('s51', 3, 'medium', 'Reservation 34 kräver nyetableringsförbud för muslimska skolor. Företrädarna försvarar andra konfessionella skolor; dokumenterad villkorad hållning till generell tillåtelse.', schoolRules, sdSchool),
    r('v14', 5, 'high', 'Försvarar uttryckligen monarkin som opolitisk symbol.', source('https://www.sd.se/a-till-o/monarki/', 'Sverigedemokraterna: Monarki')),
    r('v18', 4, 'medium', 'Kopplar straff till folklig rättsuppfattning och brottsoffers upprättelse; kvalificerat stöd för normuttrycket.', sdProgram),
    u('v23', 'Stödet till domstolsoberoende och kritiken mot majoritetsspärrar i KU2 går inte att översätta till ett säkert svar på hela jämförelsen, som också gäller fri press.'),
  ],
  fl: ['s18', 's19', 's20', 's21', 's28', 's29', 's30', 's38', 's39', 's41', 's51', 'v14', 'v18', 'v23'].map((id) => u(id, 'Folklistans tillgängliga prioriteringar inför EU-valet 2024 ger inget direkt belägg för detta påstående. Ingen ny ståndpunkt antas från partiets allmänna profil.')),
  nyans: [
    u('s18', 'Allmän integrationspolitik ger inget precist svar om kunskapskrav för medborgarskap.'),
    u('s19', 'Den granskade kriminalpolitiken tar inte ställning till anonyma vittnen.'),
    u('s20', 'Stöd till vanliga övervakningskameror belägger inte stöd till automatisk ansiktsigenkänning i realtid.'),
    u('s21', noPreciseYouth), u('s28', 'Materialet ger inget särskilt besked om grundlagsreglering av aborträtten.'),
    u('s29', noVoteFrequency), u('s30', noEu),
    u('s38', 'Önskemål om granskning av myndighetsbeslut är inte ett besked om skyddad domarställning eller friare domstolsadministration.'),
    u('s39', 'Ingen precis hållning till public services innehållsuppdrag har belagts.'), u('s41', noSchoolMove),
    u('s51', 'Stöd för fler friskolor och religionsfrihet ger inte i sig ett svar om nyetablering av konfessionella skolor.'),
    u('v14', 'Inget belägg om monarki; familje- eller religionspolitik ersätter inte ett ställningstagande om statschefen.'),
    r('v18', 4, 'medium', 'Förslaget om hårdare straff för våldtäkt motiveras också med handlingens förkastlighet och brottsoffrets skada.', nyans),
    u('v23', noInstitutions),
  ],
  afs: [
    r('s18', 5, 'high', 'Kräver uttryckligen medborgarskapstest i svenska och svenskt samhällsliv, utöver ytterligare krav.', afsReturn),
    u('s19', 'Kriminalpolitiken ger inget uttryckligt besked om anonyma vittnen.'),
    u('s20', 'Motstånd mot en övervakningsstat och stöd till proportionerliga polismetoder avgör inte frågan om denna avgränsade teknik.'),
    u('s21', noPreciseYouth),
    u('s28', 'Abortpolitikens innehåll avgör inte i sig om aborträtten ska regleras i grundlag; det tidigare svaret gick längre än belägget.'),
    r('s29', 5, 'high', 'Vill göra nationella folkomröstningar till ett återkommande inslag och införa medborgarinitiativ.', afsDemocracy),
    u('s30', noEu),
    u('s38', 'Krav på riksrätt och avpolitiserade nämndemän gäller andra institutionella ändringar än skyddad domarställning och domstolsadministration.'),
    r('s39', 5, 'high', 'Vill fokusera på samhällsviktigt innehåll och överlåta rena nöjesprogram åt privata aktörer.', afsCulture),
    u('s41', noSchoolMove),
    u('s51', 'Skolpolitiken belägger inte nyetablering av konfessionella skolor. Generell valfrihet räcker inte.'),
    u('v14', 'Traditionspolitik belägger inte ett uttryckligt ställningstagande till monarkin.'),
    r('v18', 4, 'medium', 'Straffskärpningar knyts uttryckligen till rättsuppfattning, brottsoffers upprättelse och förtroende för rättssystemet.', afsCrime),
    u('v23', 'Riksrätt och offentlighet är sakförslag men avgör inte hela avvägningen mellan oberoende institutioner, fri press och majoritetsstyre.'),
  ],
  pp: [
    u('s18', 'Princip- och sakprogrammen ger inget precist besked om dessa kunskapskrav.'),
    u('s19', 'Rättssäkerhetsprinciper räcker inte för att avgöra just anonyma vittnen.'),
    r('s20', 2, 'medium', 'Partiet motsätter sig ansiktsigenkänning på offentliga platser. Materialet är tydligt restriktivt men behandlar inte alla undantag i 2026 års lag.', source('https://www.mynewsdesk.com/se/piratpartiet/pressreleases/stensson-m-och-kd-baeddar-foer-massoevervakning-3298768', 'Piratpartiets eget pressmeddelande: Stensson om ansiktsigenkänning och massövervakning')),
    u('s21', noPreciseYouth),
    u('s28', 'Starkt stöd för aborträtten i sakprogrammet är inte ett uttryckligt krav på grundlagsskydd.'),
    r('s29', 5, 'high', 'Vill införa bindande folkomröstningar och medborgarinitiativ på alla politiska nivåer.', ppProgram),
    u('s30', noEu),
    r('s38', 4, 'medium', 'Vill ha en konstitutionsdomstol med rekrytering som säkrar oberoende från regeringen; stödet avser en del av domstolsväsendet.', ppProgram),
    u('s39', 'Sakprogrammet anger inget tydligt allmänt innehållsuppdrag för public service.'), u('s41', noSchoolMove),
    u('s51', 'Programmens allmänna skol- och frihetsprinciper avgör inte nyetablering av religiösa friskolor.'),
    u('v14', 'Demokratiska principer är inte tillräckliga för att härleda en hållning till en opolitisk ärftlig statschef.'),
    u('v18', noMoralPunishment),
    r('v23', 4, 'medium', 'Programmen kräver starkare skydd för grundlagar, rättigheter och oberoende kontroll av makten.', ppProgram, ppPrinciples),
  ],
  med: [
    u('s18', 'Högre krav på medborgarskap och språkinlärning i allmänhet ger inget säkert aktuellt svar på båda kunskapskraven.'),
    u('s19', 'Det tidigare svaret stöddes inte av ett verifierat uttryckligt ställningstagande om anonyma vittnen.'),
    u('s20', 'Aktuell kriminalpolitik ger inget precist besked om ansiktsigenkänning i realtid.'),
    u('s21', noPreciseYouth), u('s28', 'Inget belägg om grundlagsreglering av aborträtten.'),
    u('s29', 'Kritik av partivälde och stöd till demokratireformer belägger inte frekvensen av nationella folkomröstningar.'),
    u('s30', noEu),
    r('s38', 4, 'medium', 'Idéprogrammet vill stärka maktdelningen med en författningsdomstol; det är mer begränsat än en full reform av domstolsadministrationen.', medIdea),
    r('s39', 5, 'high', 'Den aktuella policyn vill avveckla bolagen i nuvarande form och bara behålla en kanal för språkvård och krisinformation; tydligt stöd för mindre bredd.', medDemocracy),
    u('s41', noSchoolMove),
    u('s51', 'Sekulär stat och allmän skolpolitik räcker inte som belägg för ett förbud eller tillstånd till nya konfessionella skolor.'),
    r('v14', 5, 'medium', 'Det uttryckliga beskedet i idéprogrammet är att behålla konstitutionell monarki; äldre program och begränsad aktuell åtkomst sänker säkerheten.', medIdea),
    u('v18', noMoralPunishment),
    r('v23', 4, 'medium', 'Idéprogrammet kräver maktdelning och oberoende granskning. Den generella prioriteringen är en tolkning av dessa principer.', medIdea),
  ],
}
