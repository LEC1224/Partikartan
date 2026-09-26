import type { PartyResponse } from '../../types'

type Source = readonly [url: string, title: string]
const accessedAt = '2026-09-26'
const answer = (questionId: string, value: PartyResponse['value'], confidence: PartyResponse['confidence'], source: Source, rationale: string, extra?: Source): PartyResponse => ({
  questionId, value, confidence, rationale,
  evidence: [source, ...(extra ? [extra] : [])].map(([url, title]) => ({ url, title, accessedAt })),
})
const unknown = (questionId: string, rationale: string): PartyResponse => ({ questionId, value: null, confidence: 'unknown', evidence: [], rationale })

const vProgram: Source = ['https://www.vansterpartiet.se/wp-content/uploads/2024/11/partiprogram_2024_skrivare.pdf', 'V: partiprogram 2024']
const sProgram: Source = ['https://www.socialdemokraterna.se/download/18.66b0e5c8197581879ca15ce/1749742402637/Socialdemokraternas%20partiprogram%202025.pdf', 'S: partiprogram 2025']
const mpProgram: Source = ['https://www.mp.se/wp-content/uploads/2025/12/miljopartiets-partiprogram-2025.pdf', 'MP: partiprogram 2025']
const lProgram: Source = ['https://www.liberalerna.se/wp-content/uploads/liberalernas-partiprogram-2025.pdf', 'L: partiprogram 2025, avsnitt 3.1.4']
const mProgram: Source = ['https://moderaterna.se/app/uploads/2026/09/Proposition-1-Moderaternas-Handlingsprogram.pdf', 'M: antaget handlingsprogram 2025, s. 9–11']
const kdProgram: Source = ['https://kristdemokraterna.se/download/18.7932b3db19c9887db6c221c/1773136182639/Principprogram%20hemsida.pdf', 'KD: principprogram 2025, arbetsmarknad']
const careDecision: Source = ['https://www.riksdagen.se/sv/dokument-och-lagar/dokument/betankande/halso-och-sjukvardens-organisation_hd01sou16/', 'Riksdagen: 2025/26:SoU16, punkt 9, motivering och partivis omröstning']
const careReservation: Source = ['https://www.riksdagen.se/sv/dokument-och-lagar/dokument/betankande/halso-och-sjukvardens-organisation_hd01sou16/html/', 'S, V och MP: reservation 13 i 2025/26:SoU16']
const conflictSurvey: Source = ['https://www.arbetsvarlden.se/regeringen-vill-se-strejkratten-inskrankt/', 'Arbetsvärlden: partiernas egna enkätsvar om konflikträtt, 27 november 2023']
const cLabor: Source = ['https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/jobb/arbetsratt-och-fackforening', 'C: Arbetsrätt och fackförening']
const cBudget: Source = ['https://www.centerpartiet.se/download/18.6cda1b9f19936660f5013f9/1759839478397/Centerpartiets_budgetmotion_2026_webb.pdf', 'C: budgetmotion för 2026, s. 17']
const med = (slug: string, title: string): Source => [`https://med.se/politik/partiprogram/${slug}`, `MED: ${title}`]
const taxInterview = (name: string): Source => ['https://www.pwc.se/skatterna-och-valet', `PwC: intervju med ${name}, 2026`]
const noWealth = (name: string) => answer('s15', 1, 'medium', taxInterview(name), 'Uttryckligt nej till förmögenhetsskatt i intervjusammanfattningen.')
const noInheritance = (name: string) => answer('s43', 5, 'medium', taxInterview(name), 'Uttryckligt nej till arvsskatt i intervjusammanfattningen.')
const separatedCare = 'Belägget gäller försäkringspatienter i offentligt finansierad verksamhet. Det räcker inte för den bredare principen som också omfattar helt separat privat vård.'
const svt = (slug: string): Source => [`https://valkompass.svt.se/2026/parti/${slug}/`, 'Partiets egna svar till SVT:s valkompass 2026']
const cManifest: Source = ['https://val2026.centerpartiet.se/wp-content/uploads/2026/06/Valmanifest-2026.pdf', 'C: valmanifest 2026']
const sdProgram: Source = ['https://www.sd.se/wp-content/uploads/2024/01/sverigedemokraternas-principprogram-2023.pdf', 'SD: principprogram 2023']
const growthGap = 'Källorna förespråkar både klimatomställning och ekonomisk utveckling, men avgör inte den uttryckliga prioriteringen när dessa mål står i konflikt. Teknikoptimism eller stöd för klimatmål räcker inte för ett ja eller nej.'

// Every party is recoded on s02, s08, s11, s15, s43, s45 and v05.
// Other entries are specific audited corrections, not an exhaustive recoding.
// Search scope, dates, rejected sources and remaining gaps: 2026-09-26-economy.md.
export const economyReview20260926: Record<string, PartyResponse[]> = {
  v: [
    answer('s02', 1, 'high', ['https://www.vansterpartiet.se/var-politik/politik-a-o/skolan/', 'V: Skolan'], 'Partiet vill avskaffa möjligheten att ta ut vinst ur skolverksamhet; fristående verksamhet utan vinstuttag är en annan fråga.'),
    answer('s08', 2, 'medium', vProgram, 'Programmet förespråkar ett högre löneläge som utvecklingsstrategi och motsätter sig att utsatta arbetstagare pressas till lägre lön. Tolkning av riktningen, inte ett preciserat förslag om varje ingångslön.'),
    answer('s11', 5, 'high', careReservation, 'Reservationen föreslår uttryckligen förbud mot försäkringsfinansierad vård som samtidigt omfattas av regionavtal.'),
    answer('s15', 4, 'medium', ['https://www.vansterpartiet.se/val2026/darfor-ska-du-rosta-pa-vansterpartiet/', 'V: valbudskap 2026, miljardärsskatt'], 'Vill införa miljardärsskatt. Skattebas, avdrag och genomförande är ännu inte fullt preciserade; stödet gäller främst de allra största förmögenheterna.', vProgram),
    answer('s43', 1, 'high', vProgram, 'Programmet anger höjd beskattning av arv. Det motsäger att även stora arv fortsättningsvis ska vara skattefria.'),
    answer('s45', 1, 'high', ['https://www.vansterpartiet.se/wp-content/uploads/2023/10/facklig-politisk-plattform-2023-print.pdf', 'V: facklig-politisk plattform, avsnitt Strejk- och konflikträtt'], 'Motsätter sig uttryckligen proportionalitetsregler som begränsar fackliga sympatiåtgärder.'),
    unknown('v05', separatedCare),
    unknown('s05', 'Äldre program stöder fastighetsskatt, men ekonomisk-politiska talespersonen uppgav i en intervju 2026 att förslaget släppts till förmån för miljardärsskatt. Det oklara förhållandet mellan långsiktig princip och aktuell politik gör det tidigare ja-svaret osäkert.'),
    answer('v15', 4, 'medium', ['https://www.vansterpartiet.se/var-politik/politik-a-o/klimat/', 'V: Klimat'], 'Kräver att ekonomisk politik anpassas till klimatets och ekosystemens ramar och prioriterar gemensamma investeringar framför ökad privat konsumtion hos de rikaste. Ett kvalificerat stöd, inte en allmän målsättning om krympande ekonomi.'),
    answer('v19', 2, 'high', vProgram, 'Förordar nationellt självbestämmande och mellanstatliga minimiregler framför överstatliga beslut, men stöder bindande samarbeten på avgränsade områden.'),
  ],
  s: [
    answer('s02', 1, 'high', sProgram, 'Programmet kräver att vinstintresset tas bort ur skolan, inte bara högre kvalitetskrav.'),
    answer('s08', 2, 'medium', sProgram, 'Programmet kritiserar politiskt sänkta lönenivåer som väg till fler lågbetalda jobb. Det ger en tydlig riktning men ingen detaljerad regel för alla ingångslöner.'),
    answer('s11', 5, 'high', careReservation, 'Partiet står bakom det uttryckliga förbudet för den vård som regionavtalet omfattar.'),
    noWealth('Niklas Karlsson (S)'),
    noInheritance('Niklas Karlsson (S)'),
    answer('s45', 1, 'medium', conflictSurvey, 'Teresa Carvalho avvisar ändringar i konflikträtten i partiets eget enkätsvar. Partiprogrammet 2025 försvarar också rätten till sympatiåtgärder.', sProgram),
    unknown('v05', separatedCare),
    answer('s04', 1, 'high', svt('socialdemokraterna'), 'Avvisar marknadshyror även i den uttryckliga frågan om nyproduktion.'),
    answer('s13', 2, 'high', svt('socialdemokraterna'), 'Vill korta arbetstiden genom parterna i första hand; avvisar lagförslaget i enkäten.'),
    unknown('v15', growthGap),
    answer('v19', 4, 'medium', sProgram, 'Accepterar att gemensamma EU-bestämmelser styr nationella beslut och vill delta fullt ut. Undantar bland annat skattepolitiken från gemensamt beslutsfattande.'),
    unknown('v06', 'Programmet 2025 försvarar reglerad konkurrens i stora delar av ekonomin men avvisar marknadsmodellen för välfärd. Det tidigare negativa svaret generaliserade välfärdsståndpunkten till alla tjänster; den generella övervikten är inte fastställd.'),
  ],
  mp: [
    answer('s02', 1, 'high', mpProgram, 'Programmet vill avskaffa vinstdrivande aktiebolag inom skolan och välkomnar idéburna alternativ.'),
    unknown('s08', 'Äldre besked avvisar sänkta ingångslöner. Det aktuella programmet och arbetsmarknadsmaterialet gav inte ett tillräckligt preciserat, aktuellt besked om just denna åtgärd.'),
    answer('s11', 5, 'high', careReservation, 'Partiet står bakom förbud för samma vård som omfattas av regionavtal. Detta innebär inte förbud mot all privatfinansierad vård.'),
    answer('s15', 4, 'medium', ['https://www.mp.se/just-nu/ett-rattvisare-skattesystem-kraver-miljardarsskatt/', 'MP: Ett rättvisare skattesystem kräver miljardärsskatt, 1 september 2026'], 'Förslaget gäller en årlig minimiskatt för miljardärer med avräkning för redan betalda skatter. Det är ett avgränsat stöd för förmögenhetsbeskattning, vars utformning ska utredas.', ['https://www.svd.se/a/m0pGzg/mp-och-gabriel-zucman-en-skatt-for-miljardarer-ar-inte-radikal', 'MP:s språkrör och Gabriel Zucman: debattartikel om miljardärsskatt']),
    unknown('s43', 'Högre kapital- och förmögenhetsbeskattning besvarar inte arvsskatt. Inget tillräckligt aktuellt nationellt besked om just arvsskatt har verifierats.'),
    answer('s45', 1, 'medium', conflictSurvey, 'Leila Ali Elmi avvisar ytterligare inskränkningar i partiets enkätsvar, som uttryckligen avser sympatiåtgärder och proportionalitet. Belägget är från 2023.'),
    unknown('v05', separatedCare),
    answer('s40', 1, 'high', svt('miljopartiet'), 'Avvisar statligt huvudmannaskap; vill däremot stärka statlig finansiering och vissa gemensamma funktioner.'),
    answer('v15', 5, 'high', mpProgram, 'Programmet underordnar ekonomin planetens gränser och avvisar ständig traditionell tillväxt som överordnat mål. Det besvarar den uttryckliga målkonflikten.'),
    answer('v19', 4, 'medium', mpProgram, 'Vill ha överstatliga beslut som begränsar enskilda länders naturpåverkan och starka internationella regler. Detta ger stöd för principen med en tydlig sakpolitisk avgränsning.'),
    unknown('v06', 'Programmet 2025 försvarar företagande och reglerad konkurrens samtidigt som det avvisar vinststyrd välfärd. Det tidigare kategoriska nej-svaret beskrev därför inte den generella principen tillförlitligt.'),
  ],
  c: [
    answer('s02', 4, 'high', ['https://val2026.centerpartiet.se/wp-content/uploads/2026/06/Valmanifest-2026.pdf', 'C: valmanifest 2026, skolan'], 'Tillåter vinstutdelning men vill stoppa den vid kvalitetsbrister och ställa skarpare krav på friskolor.'),
    unknown('s08', 'Aktuella ingångsjobb och budgetförslag sänker arbetsgivaravgifter, inte uttryckligen den anställdes lön. Äldre förslag räcker inte för att fastställa dagens besked.'),
    answer('s11', 1, 'high', careDecision, 'Röstade mot det specifika förbudet. Talespersonen beskriver i samma debatt avtalsvillkor mot undanträngning som alternativ till förbud.'),
    unknown('s15', 'Allmänna skattesänkningar och företagarpolitik ger inget säkert besked om en årlig skatt på stora nettoförmögenheter.'),
    unknown('s43', 'Aktuellt program, valmanifest och den lästa skatteintervjun gav inget tillräckligt specifikt besked om arvsskatt.'),
    answer('s45', 5, 'high', cLabor, 'Vill uttryckligen begränsa sympatiåtgärder och skydda utomstående företag; kommittémotionen preciserar begränsningarna.', ['https://www.riksdagen.se/sv/dokument-och-lagar/dokument/motion/arbetsmarknad_hd023191/html/', 'C: kommittémotion 2025/26:3191, yrkanden 10–12']),
    answer('v05', 2, 'medium', careDecision, 'Christofer Bergenblock försvarar individens och arbetsgivarens val av privat försäkring, men kräver att offentlig vård inte trängs undan. Det ger ett villkorat motstånd mot den breda principen.'),
    answer('s06', 4, 'high', cBudget, 'Budgeten anger långsiktigt generell sänkning av arbetsgivaravgiftens rena skattedel. De första budgetstegen är riktade mot vissa grupper och mindre företag.'),
    answer('s44', 4, 'medium', cLabor, 'Värnar partsmodellen samtidigt som partiet vill ändra konflikträtten. Önskade reformer innebär inte att kollektivavtal upphör att vara huvudmodell.'),
    answer('s04', 4, 'medium', svt('centerpartiet'), 'Tillåter individuellt avtalad hyra som alternativ till förhandlad hyra; ett kvalificerat stöd för ökat marknadsinslag.'),
    answer('s09', 4, 'high', svt('centerpartiet'), 'Vill på lång sikt ha samma högkostnadsskydd för tandvård som för vanlig vård.'),
    unknown('v15', growthGap),
    answer('v19', 4, 'high', cManifest, 'Vill avskaffa vetorätten i EU:s utrikespolitik och utvidga majoritetsbeslut när enhällighet blockerar. Sverige kan då bli bundet av beslut det motsätter sig.'),
  ],
  l: [
    answer('s02', 1, 'high', ['https://www.liberalerna.se/politik/vinstintresset-i-skolan', 'L: Vinstintresset i skolan, uppdaterad 8 maj 2026'], 'Vill fasa ut vinstdrivande aktiebolag ur skolan. Partiets stöd för privata vårdföretag ändrar inte skolsvaret.'),
    answer('s08', 5, 'high', lProgram, 'Programmet förespråkar uttryckligen lägre ingångslöner för att personer utan erfarenhet ska kunna få sitt första jobb.'),
    answer('s11', 1, 'high', careDecision, 'Röstade mot det avgränsade förbudet och stod bakom utskottets materiella motivering att behålla möjligheten till båda uppdragen.'),
    noWealth('Anders Ekegren (L)'),
    noInheritance('Anders Ekegren (L)'),
    answer('s45', 4, 'high', lProgram, 'Vill införa proportionalitet vid stridsåtgärder. Det är en begränsning men inte ett generellt förbud mot sympatiåtgärder.', conflictSurvey),
    answer('v05', 2, 'medium', ['https://www.svt.se/nyheter/video/ec5c7aaa0e2c9142-liberalerna-vill-inte-forbjuda-privata-sjukvardsforsakringar/y4psw9', 'SVT: Liberalernas svar om privata sjukvårdsförsäkringar, 31 maj 2026'], 'SVT återger partiets besked att försäkringarna ska tillåtas, med förbehållet att den offentliga vården måste fungera för alla. Kodningen bygger på den publicerade texten till intervjun.'),
    answer('s05', 1, 'medium', taxInterview('Anders Ekegren (L)'), 'Uttryckligt nej till fastighetsskatt i intervjusammanfattningen.'),
    answer('s44', 4, 'high', lProgram, 'Programmet stöder att arbetsvillkor i huvudsak bestäms genom avtal mellan parterna, även om vissa arbetsrättsliga regler ska förändras.'),
    answer('v08', 4, 'medium', lProgram, 'Programmet vill ha ökad lönespridning som belönar kompetens, ansvar och erfarenhet. Det belägger en riktning, inte stöd för hur stora skillnader som helst.'),
    answer('s09', 4, 'high', svt('liberalerna'), 'Vill stegvis förstärka tandvårdens högkostnadsskydd för alla, med behovsprioritering först.'),
    answer('s13', 2, 'high', svt('liberalerna'), 'Föredrar partsavtal och riktade ledighetsreformer framför generell lagstadgad förkortning.'),
    unknown('s03', 'Den aktuella sidan beskriver högre ersättning i början än senare i arbetslösheten. Den fastställer inte en höjning jämfört med dagens nivå, som det tidigare ja-svaret förutsatte.'),
    unknown('s40', 'Programmet 2025 lägger sjukvårdsansvar hos regionerna. Svaret till SVT 2026 begär starkare statlig styrning men preciserar inte ett övertagande av huvudmannaskapet. Någon säker aktuell riktning om just övertagandet har inte fastställts.'),
    unknown('v15', growthGap),
    answer('v19', 5, 'high', ['https://www.liberalerna.se/wp-content/uploads/liberalernas-partiprogram-2025.pdf', 'L: partiprogram 2025, avsnitt 5.3.1'], 'Förespråkar ett federalt Europa, avskaffad vetorätt i ministerrådet och en bindande maktfördelning i EU:s konstitution.'),
  ],
  m: [
    answer('s02', 4, 'high', ['https://moderaterna.se/var-politik/skola-och-utbildning/', 'M: Skola och utbildning'], 'Tillåter vinstdrivande skolor med kvalitetskrav och begränsningar av uttag. Stödet är villkorat, inte obegränsad utdelningsrätt.'),
    unknown('s08', 'Handlingsprogrammet 2025 vill sänka anställningskostnader men anger inte att detta måste ske genom lägre ingångslön. Tidigare inträdesjobb blandade arbete och utbildning och ger inget entydigt aktuellt svar.'),
    answer('s11', 1, 'high', careDecision, 'Röstade mot det specifika förbudet. Partiets företrädare har även 2026 uttryckligen invänt mot att skilja dessa uppdrag åt.'),
    noWealth('Marie Nicholson (M)'),
    noInheritance('Marie Nicholson (M)'),
    answer('s45', 4, 'high', mProgram, 'Det antagna programmet kräver proportionalitet vid strids- och sympatiåtgärder. Begränsningen gäller omfattningen, inte ett generellt förbud.'),
    answer('v05', 2, 'medium', ['https://www.svt.se/nyheter/video/405fc0f983cffa42-moderaterna-om-privata-sjukvardsforsakringar-och-vardkoer/y4psw9', 'SVT: M:s svar om sjukvårdsförsäkringar, 31 maj 2026'], 'Den publicerade intervjutexten försvarar försäkringarnas användning av separat vårdkapacitet. Det belägger stöd för den privata möjligheten, inte förtur i den offentliga kön.'),
    answer('s44', 4, 'high', mProgram, 'Det aktuella programmet beskriver kollektivavtal som grund för regleringen av arbetsvillkor, samtidigt som partiet vill reformera bland annat konflikträtten.'),
    answer('s04', 2, 'medium', svt('moderaterna'), 'Ger ett negativt enkätsvar och uppger att partiet saknar förslag om marknadshyror.'),
    answer('s09', 4, 'high', svt('moderaterna'), 'Vill långsiktigt närma tandvårdens finansiering till övrig sjukvård; äldrereformen är ett redan genomfört steg.'),
    answer('s13', 2, 'high', svt('moderaterna'), 'Avvisar lagstiftad förkortning och hänvisar till partsavtal samt finansieringskostnader.'),
    unknown('s03', 'Äldre källa om höjt tak räcker inte efter genomförda ändringar. Handlingsprogrammet 2025 stödjer en omställningsförsäkring men preciserar ingen ytterligare höjning av ersättningen.'),
    answer('s06', 4, 'high', ['https://moderaterna.se/app/uploads/2026/09/Proposition-1-Moderaternas-Handlingsprogram.pdf', 'M: antaget handlingsprogram 2025, s. 17'], 'Vill minska den rena skattedelen av arbetsgivaravgiften. Det är en generell inriktning, utan preciserad tidplan eller nivå.'),
    unknown('v15', growthGap),
    answer('v19', 4, 'high', ['https://moderaterna.se/app/uploads/2026/09/Proposition-1-Moderaternas-Handlingsprogram.pdf', 'M: antaget handlingsprogram 2025, s. 53–57'], 'Vill använda kvalificerad majoritet i delar av EU:s utrikespolitik och betonar den gemensamma förmågan att påverka. Stödet gäller avgränsad gemensam beslutanderätt.'),
  ],
  kd: [
    answer('s02', 4, 'high', ['https://kristdemokraterna.se/var-politik/politik-a-till-o/vinster-i-valfarden', 'KD: Vinster i välfärden'], 'Försvarar vinstdrivande välfärdsföretag, inklusive skolor, men ställer krav på kvalitet och uppföljning.'),
    unknown('s08', 'Aktuella program betonar lägre trösklar och anställningsstöd. Det specifika förslaget om lägre ingångslöner återfanns i äldre alliansförslag, men kunde inte aktualitetsbekräftas.'),
    answer('s11', 1, 'high', careDecision, 'Står bakom det materiella avslaget på just detta förbud; offentlig behovsprioritering är en annan fråga.'),
    noWealth('Cecilia Engström (KD)'),
    noInheritance('Cecilia Engström (KD)'),
    answer('s45', 4, 'medium', conflictSurvey, 'Magnus Jacobsson vill i partiets svar se proportionalitet; lagstiftning kan bli aktuell om parterna inte löser frågan. Beskedet är villkorat och från 2023.'),
    answer('v05', 2, 'medium', ['https://www.svt.se/nyheter/video/8c8e2650a0b56f93-kristdemokraterna-vill-tillata-privata-sjukvardsforsakringar/y4psw9', 'SVT: KD:s svar om privata sjukvårdsförsäkringar, 31 maj 2026'], 'Den publicerade intervjutexten försvarar försäkringarna med hänvisning till mer vård i tid. Det belägger villkorat stöd för den privata möjligheten, inte förtur i offentlig vård.'),
    answer('s44', 4, 'medium', kdProgram, 'Programmet lägger lönebildningen hos arbetsmarknadens parter och vill ha en decentraliserad lönebildning. Det är förenligt med kollektivavtal som huvudmodell.'),
    answer('s04', 4, 'high', svt('kristdemokraterna'), 'Stöder friare hyror i nyproduktion med besittningsskydd och förutsägbar indexering.'),
    answer('s13', 2, 'high', svt('kristdemokraterna'), 'Motsätter sig generell lagstiftning men accepterar branschvisa partsavtal om kortare arbetstid.'),
    unknown('v15', growthGap),
    answer('v19', 4, 'high', ['https://kristdemokraterna.se/download/18.7932b3db19c9887db6c221c/1773136182639/Principprogram%20hemsida.pdf', 'KD: principprogram 2025, s. 19–20'], 'Anser EU nödvändigt och vill ha majoritetsbeslut inom dess befogenheter. Värnar samtidigt avgränsningen mellan EU:s och medlemsländernas uppgifter.'),
  ],
  sd: [
    answer('s02', 4, 'high', ['https://www.sd.se/wp-content/uploads/2023/02/kommunpolitiskt-inriktningsprogram-2024.pdf', 'SD: kommunpolitiskt inriktningsprogram 2024, skola'], 'Avvisar generellt vinstförbud men vill ställa kvalitetskrav och krav på ekonomiska buffertar.'),
    unknown('s08', 'Materialet om enklare vägar till arbete, bidrag och lägre anställningskostnader ger inte ett tillräckligt aktuellt besked om sänkt lön för den anställde.'),
    answer('s11', 1, 'high', careDecision, 'Står bakom det aktuella materiella avslaget på förbudet för blandad finansiering hos samma vårdgivare.'),
    noWealth('Oscar Sjöstedt (SD)'),
    noInheritance('Oscar Sjöstedt (SD)'),
    unknown('s45', 'Partiet avstod från ja eller nej i enkäten om just begränsningar och begärde utredning. En enskild ledamots senare motion fastställer inte hela partiets linje.'),
    answer('v05', 2, 'medium', ['https://www.svt.se/nyheter/video/d5b193428f2e37bd-sverigedemokraterna-vill-behalla-privata-sjukforsakringar-om-de-starker-varden/y4psw9', 'SVT: SD:s svar om sjukvårdsförsäkringar, 31 maj 2026'], 'Den publicerade intervjutexten tillåter försäkringarna under villkor att de stärker offentlig vård och kapacitet. Det är ett villkorat motstånd mot att generellt utesluta denna möjlighet.'),
    answer('s05', 1, 'medium', taxInterview('Oscar Sjöstedt (SD)'), 'Uttryckligt nej till fastighetsskatt i intervjusammanfattningen.'),
    answer('s04', 1, 'high', svt('sverigedemokraterna'), 'Vill behålla bruksvärdessystemet även i den specifika frågan om nya hyresrätter.'),
    answer('s13', 1, 'high', svt('sverigedemokraterna'), 'Avvisar lagförslaget och lägger arbetstidens reglering hos arbetsmarknadens parter.'),
    unknown('s03', 'Den aktuella a-kassesidan beskriver det redan höjda taket på 34 000 kronor och ett framtida förstatligande, men ingen ytterligare ersättningshöjning. Ändrad organisation avgör inte nivån.'),
    unknown('v15', 'Principprogrammet kräver balans mellan tillväxt och bland annat miljö. Invändningar mot ineffektiva klimatåtgärder besvarar inte vilken sida som ska prioriteras vid en verklig målkonflikt.'),
    answer('v19', 1, 'high', sdProgram, 'Programmet bedömer mellanstatligt samarbete som tillräckligt och avvisar överstatliga organ som ersätter folkens yttersta bestämmande över politiken.'),
  ],
  fl: [
    ...['s02', 's08', 's11', 's15', 's43', 's45', 'v05'].map((id) => unknown(id, 'Det verifierade materialet består huvudsakligen av EU-prioriteringar från 2024. Inget tillräckligt specifikt och aktuellt nationellt besked har hittats för denna fråga.')),
    unknown('v15', 'EU-prioriteringarna kritiserar vissa klimatregler och vill skydda fiskbestånd, men ger inget entydigt besked om den breda avvägningen mot tillväxt och konsumtion.'),
    answer('v19', 2, 'medium', ['https://web.archive.org/web/20240521141157/https://folklistan.se/prioriteringar/', 'Folklistan: arkiverade EU-prioriteringar 2024'], 'Vill omförhandla medlemskapet för nationella undantag och hejda ökad överstatlighet. Stöder samtidigt vissa gemensamma åtgärder; materialet är från 2024.'),
  ],
  nyans: [
    unknown('s02', 'Programmet vill ha fristående skolor, gärna stiftelser. Det fastställer inte om företag ska få dela ut vinst.'),
    unknown('s08', 'Förslag om billigare anställningar och ändrade avgifter besvarar inte om den anställdes ingångslön ska sänkas.'),
    unknown('s11', 'Allmänna vårdprioriteringar besvarar inte förbudet för blandad finansiering hos samma vårdgivare.'),
    unknown('s15', 'Inget specifikt besked om årlig skatt på stora nettoförmögenheter i det verifierade programmet.'),
    unknown('s43', 'Inget specifikt besked om arvsskatt i det verifierade programmet.'),
    unknown('s45', 'Inget specifikt besked om sympatiåtgärder i det verifierade programmet.'),
    unknown('v05', 'Programmet ger inget tillräckligt besked om möjligheten att själv köpa snabbare vård separat från offentlig finansiering.'),
    unknown('v15', 'Det lästa nationella materialet gav inget preciserat besked om miljö och klimat i konflikt med konsumtion och tillväxt.'),
    answer('v19', 4, 'medium', ['https://www.partietnyans.se/var-politik/', 'Nyans: Vår politik, EU'], 'Vill värna EU och införa gemensam flyktingfördelning med sanktioner mot medlemsländer som vägrar. Det belägger avgränsat bindande samarbete; nej till EMU begränsar stödet.'),
    unknown('v06', 'Stöd för privata utförare i vissa skolor och bostadsprojekt bevisar inte den generella principen om konkurrens mellan privata aktörer.'),
  ],
  afs: [
    answer('s02', 1, 'high', ['https://alternativforsverige.se/politik/skolpolitik/', 'AfS: Skolpolitik'], 'Vill stoppa nya vinstdrivande friskolor och fasa ut befintliga; idéburna skolor kan finnas kvar.'),
    unknown('s08', 'Lägre skatter och allmänt företagsvänlig politik innebär inte ett uttryckligt förslag om sänkt ingångslön.'),
    unknown('s11', 'Programmet om sjukvård tar inte ställning till just kombinationen regionavtal och försäkringspatienter.'),
    unknown('s15', 'Den allmänna lågskatteprincipen fastställer inte inställningen till just en årlig skatt på stora nettoförmögenheter.'),
    unknown('s43', 'Inget preciserat besked om arvsskatt i det aktuella ekonomiska programmet.'),
    unknown('s45', 'Inget specifikt nationellt besked om begränsade sympatiåtgärder har verifierats.'),
    unknown('v05', 'Offentlig finansiering och vård efter behov fastställer inte om separat privat betalning får ge snabbare vård.'),
    unknown('v15', 'Miljöprogrammet kritiserar konsumtionshysteri och oändlig tillväxt men avvisar samtidigt centrala klimatåtgärder. Det tidigare entydiga nej-svaret fångade inte denna skillnad; hela det sammansatta påståendet är inte säkert besvarat.'),
    answer('v19', 1, 'high', ['https://alternativforsverige.se/politik/demokratipolitik/', 'AfS: Demokratipolitik'], 'Vill lämna EU och internationella avtal som begränsar Sveriges självbestämmande. Det besvarar avvägningen uttryckligen.'),
  ],
  pp: [
    unknown('s02', 'Partiets krav på kunskap och kvalitet i skolan fastställer inte om vinstutdelning ska vara tillåten.'),
    unknown('s08', 'Utredning om sänkt skatt på arbete och basinkomst innebär inte att lönen ska sänkas.'),
    unknown('s11', 'Det verifierade vårdmaterialet ger inget besked om det specifika förbudet för blandad finansiering.'),
    unknown('s15', 'Förslag om andra skattebaser är inte ett preciserat beslut om årlig nettoförmögenhetsskatt.'),
    unknown('s43', 'Inget specifikt besked om arvsskatt har verifierats.'),
    unknown('s45', 'Stöd för arbetsrätt eller individuell frihet besvarar inte den särskilda rätten till sympatiåtgärder.'),
    unknown('v05', 'Inget tillräckligt specifikt besked om snabbare separat privatfinansierad vård har verifierats.'),
    unknown('s03', 'Basinkomstförslaget anger en annan organisation för trygghetssystemen, inte att ersättningen i dagens arbetslöshetsförsäkring ska sänkas eller höjas.'),
    unknown('v15', 'Miljöprogrammet gör fossil avveckling nödvändig men värnar samtidigt levnadsstandarden. Det fastställer inte prioriteringen mot begränsad konsumtion och ekonomisk tillväxt.'),
    answer('v19', 4, 'medium', ['https://piratpartiet.se/sakpolitik-kategori/eu-politik/', 'PP: EU-politik'], 'Vill stärka EU-parlamentets och EU-domstolens makt och ersätta ministerrådet med en direktvald senat. Accepterar därmed gemensamt bindande beslut men motsätter sig dagens valutaunion.'),
    unknown('v06', 'Principprogrammet vill förbättra konkurrensen på digitala marknader. Det fastställer varken ett allmänt svar om alla tjänster eller den balanserade ståndpunkt som den tidigare trean antydde.'),
    unknown('v09', 'Öppna digitala allmänningar och delad kunskap är inte detsamma som statligt, regionalt eller kommunalt ägande. Tidigare källor belägger inte den ägandeform som frågans kontext uttryckligen avser.'),
  ],
  med: [
    unknown('s02', 'Skolprogrammet stöder friskolor och fri etablering men fastställer inte uttryckligen rätten till vinstutdelning.'),
    unknown('s08', 'Företagsprogrammet sänker lönekostnader genom skatter och avgifter. Det innebär inte ett preciserat krav på lägre ingångslön.'),
    unknown('s11', 'Sjukvårdsprogrammet förespråkar privat drift och nationell finansiering, men besvarar inte det specifika förbudet för blandad finansiering.'),
    unknown('s15', 'Skatteprogrammet specificerar andra skattesänkningar men ger inget uttryckligt besked om en ny årlig nettoförmögenhetsskatt.'),
    unknown('s43', 'Inget preciserat ställningstagande till arvsskatt i det aktuellt publicerade skatteprogrammet.'),
    answer('s45', 4, 'high', med('foretagspolitiskt-program', 'företagspolitiskt program, 2 februari 2025, avsnitt 10'), 'Vill införa skadeståndsansvar vid sympatiåtgärder och hindra berörda myndigheter och offentliga bolag från att vägra service. Det begränsar möjligheterna utan att vara ett allmänt förbud.'),
    unknown('v05', 'Programmet stöder privat drift och egen betalning men preciserar inte den här avvägningen om olika väntetider. Äldre talespersonstext och lokala uttalanden räcker inte för en säker aktuell nationell kodning.'),
    unknown('s03', 'Privatiserad inkomstförsäkring och grundtrygghet fastställer inte en höjning eller sänkning relativt dagens a-kassa. Det tidigare negativa svaret gick längre än belägget.'),
    unknown('v15', 'Betoning av kostnadseffektivitet och kritik mot vissa klimatstyrmedel besvarar inte den generella prioriteringen när verklig miljönytta står mot konsumtion och tillväxt.'),
    answer('v19', 2, 'high', med('eu-politiskt-program', 'EU-politiskt program, antaget 23 september 2023, avsnitt 2.1–2.3'), 'Utgår från nationell suveränitet och vill återföra makt från EU. Tillåter gemensam kompetens när mycket starka skäl finns; därför ett kvalificerat nej.'),
  ],
}
