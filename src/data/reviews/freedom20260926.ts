import type { Evidence, PartyResponse } from '../../types'

// Scope, rejected inferences and research log: source-data/reviews/2026-09-26-freedom.md.
const accessedAt = '2026-09-26'
const source = (url: string, title: string, quote?: string): Evidence => ({ url, title, quote, accessedAt })
const answer = (questionId: string, value: PartyResponse['value'], confidence: PartyResponse['confidence'], rationale: string, ...evidence: Evidence[]): PartyResponse => ({ questionId, value, confidence, rationale, evidence })
const unknown = (questionId: string, rationale: string, ...evidence: Evidence[]) => answer(questionId, null, 'unknown', rationale, ...evidence)

const familyDebate = 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/betankande/skarpta-villkor-for-anhoriginvandring_hd01sfu37/'
const ppPolicy = 'https://piratpartiet.se/wp-content/uploads/2026/09/2024-04-24-Piratpartiet-Sakpolitik.pdf'
const nyansPolicy = 'https://www.partietnyans.se/var-politik/politik-a-o/'
const afsFamily = 'https://alternativforsverige.se/politik/familj/'
const afsMigration = 'https://alternativforsverige.se/politik/atervandring/'
const medMigration = 'https://www.med.se/politik/migration-och-assimilation'

// Every party is reassessed for the materially revised s22, s23, s49 and new s54.
export const freedom20260926Review: Record<string, PartyResponse[]> = {
  v: [
    answer('s22', 1, 'high', 'Partiet motsätter sig att alkoholmonopolet avskaffas och även den mer begränsade gårdsförsäljningen.', source('https://www.vansterpartiet.se/var-politik/politik-a-o/gardsforsaljning/', 'V: Gårdsförsäljning, uppdaterad 2026-06-30', 'avskaffandet av alkoholmonopolet, vilket vi starkt ställer oss emot')),
    answer('s23', 5, 'high', 'Ett administrativt förfarande och självbestämmande är uttrycklig partipolitik. Den nya frågan gäller endast vuxna.', source('https://www.vansterpartiet.se/var-politik/politik-a-o/hbtqi/', 'V: hbtqia+, uppdaterad 2026-01-27', 'ändring av juridiskt kön ska vara ett administrativt förfarande')),
    answer('s49', 1, 'high', 'Motionen avvisar själva inkomstvillkoret för rätten till familjeliv, inte bara den föreslagna höjningen.', source('https://www.riksdagen.se/sv/dokument-och-lagar/dokument/motion/med-anledning-av-prop-202526301-skarpta-villkor_hd024220/', 'V: kommittémotion 2025/26:4220, Ett skärpt försörjningskrav', 'Rätten till familjeliv ska inte villkoras av inkomst eller bostadssituation.')),
    answer('s54', 5, 'medium', 'Kommittémotionen vill göra den familjerättsliga lagstiftningen materiellt könsneutral och beskriver samkönade pars adoptionsrätt som del av den reformerade föräldrabalken. Det är en regel om familjerätten, men inte ett separat svar på exakt denna enkätfråga.', source('https://www.riksdagen.se/sv/dokument-och-lagar/dokument/motion/modern-familjeratt_hd02320/html/', 'V: Modern familjerätt, kommittémotion 2025/26:320, avsnitt 3.7', 'den familjerättsliga lagstiftningen bör bli både materiellt och språkligt könsneutral')),
    unknown('s48', 'V vill utreda frågan för att kunna föra en seriös diskussion. Det belägger varken stöd för införande eller ett slutligt nej.', source('https://www.vansterpartiet.se/var-politik/politik-a-o/dodshjalp/', 'V: Dödshjälp, uppdaterad 2026-01-20', 'Vi stödjer att frivillig dödshjälp utreds')),
  ],
  s: [
    answer('s22', 1, 'high', 'Det aktuella anförandet försvarar uttryckligen detaljhandelsmonopolet.', source('https://www.riksdagen.se/sv/dokument-och-lagar/dokument/protokoll/protokoll-20252668-onsdagen-den-4-februari_hd0968/html/', 'S: Karin Sundin, anförande 141, 2026-02-04', 'Vi ska värna Systembolagets detaljhandelsmonopol och folkhälsouppdrag.')),
    unknown('s23', 'Stöd för 2025 års lag eller en enklare process visar inte om partiet vill ta bort även vårdintyget. Ett tillräckligt precist aktuellt belägg har inte hittats.'),
    answer('s49', 5, 'high', 'S vill behålla ett försörjningskrav och kan acceptera en viss höjning. Motstånd mot regeringens större höjning och krav vid förlängning motsäger inte huvudregeln i frågan.', source('https://www.riksdagen.se/sv/dokument-och-lagar/dokument/motion/med-anledning-av-prop-202526301-skarpta-villkor_hd024219/html/', 'S: kommittémotion 2025/26:4219, Ett proportionerligt försörjningskrav', 'Vi socialdemokrater anser att det även fortsättningsvis ska finnas ett försörjningskrav')),
    answer('s54', 5, 'medium', 'Det nationella hbtq-programmet vill förbättra samkönade pars faktiska möjligheter att adoptera. Säkerheten är medel eftersom det precisa programavsnittet är från 2018.', source('https://www.socialdemokraterna.se/download/18.12ce554f16be946d04633b05/1568881590633/hbtq-politiskt-program.pdf#page=9', 'S: Hbtq-politiskt program, uppdaterat 2018, s. 9', 'Sverige måste fortsätta arbetet för att påverka fler länder att tillåta samkönade par att adoptera.')),
  ],
  mp: [
    answer('s22', 1, 'high', 'Partiets eget svar i SVT:s valkompass är mycket dåligt förslag på vanlig butiksförsäljning. Motiveringen försvarar Systembolaget och försäljning utan privata vinstintressen.', source('https://valkompass.svt.se/2026/parti/miljopartiet/', 'MP: Eget svar i SVT:s valkompass 2026, alkohol i livsmedelsbutiker')),
    answer('s23', 5, 'high', 'Partiet vill uttryckligen ha självbestämmande utan kontakt med vården. Det omfattar de vuxna som frågan gäller.', source('https://www.mp.se/politik/hbtq/', 'MP: Hbtqi-personers rättigheter, uppdaterad 2026-06-23', 'juridiskt kön ska kunna ändras genom självbestämmande utan kontakt med vården')),
    answer('s49', 1, 'high', 'Kommittémotionen vill avskaffa försörjningskraven för alla, vilket är ett direkt nej till huvudregeln.', source('https://www.riksdagen.se/sv/dokument-och-lagar/dokument/motion/en-human-och-rattssaker-politik-for-manniskor-pa_hd023362/html/', 'MP: kommittémotion 2025/26:3362, Familjeåterförening', 'Vi vill i stället avskaffa försörjningskraven för familjeåterförening för alla.')),
    answer('s54', 5, 'medium', 'Partiets uttryckliga adoptionspolicy säger att samkönade par ska ha samma möjligheter. Säkerheten är medel eftersom det precisa adoptionsavsnittet är äldre; det är inte en slutsats från allmän tolerans.', source('https://www.mp.se/sites/default/files/rapport_all_karlek_ar_bra_karlek_2012.pdf', 'MP: All kärlek är bra kärlek, juli 2012, Ökad möjlighet till adoptioner', 'Att per automatik sorteras bort som sämre lämpade är en diskriminerande handling')),
    unknown('s48', 'Stöd för en bred utredning är inte ett beslut om införande vid obotligt lidande.', source('https://www.riksdagen.se/sv/webb-tv/video/debatt-om-forslag/prioriteringar-inom-halso-och-sjukvarden_hd01sou17/', 'MP: Nils Seye Larsen, anförande 116, 2026-04-16')),
  ],
  c: [
    answer('s22', 1, 'high', 'C försvarar uttryckligen monopolet. Mer generös gårdsförsäljning och fler Systembolagsombud är andra reformer än självständiga licensbutiker.', source('https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/vard-och-omsorg/alkoholpolitik', 'C: Alkoholpolitik', 'Vi står bakom Systembolagets monopol som ett verktyg för att hålla nere konsumtionen')),
    answer('s23', 5, 'high', 'Partiet skiljer det antagna intygssystemet från sitt eget mål: anmälan till Skatteverket och bekräftelse efter betänketid utan Socialstyrelsens prövning.', source('https://www.centerpartiet.se/download/18.4d3308b18fc724199f640/1718115943037/K%C3%B6nstillh%C3%B6righetslagen%20Q%26A.pdf', 'C: Om könstillhörighetslagen, frågor och svar 2024', 'en lagstiftning som bygger helt på individens självbestämmande')),
    answer('s49', 5, 'high', 'C stöder huvudregeln uttryckligen och vill samtidigt ha undantag för skyddsbehövande och utlandssvenskar. Frågan tillåter sådana undantag.', source('https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/integration-och-migration/anhoriginvandring', 'C: Anhöriginvandring', 'Ha ett försörjningskrav som huvudregel')),
    answer('s54', 5, 'high', 'Omsorgsförmåga, inte sexuell läggning, ska styra adoptionsprövningen.', source('https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/familj/adoption', 'C: Adoption', 'Föräldrarnas omsorgsförmåga är det som räknas, inte deras sexuella läggning eller familjeform.')),
    answer('s16', 5, 'high', 'Budgetmotionen anger en konkret ökning till 5 000, inte bara att kvotmottagning ska prioriteras framför spontan asylinvandring.', source('https://www.centerpartiet.se/download/18.3faeb63c19c2c67585c10ef3/1770652277509/Centerpartiets_budgetmotion_2026_webb%20%281%29.pdf', 'C: Budgetmotion 2026, utgiftsområde 13', 'Centerpartiet vill öka antalet kvotflyktingar till 5000 igen')),
  ],
  l: [
    answer('s22', 5, 'high', 'Licensbutiker för öl och vin är partiets uttryckliga förslag. Systembolaget ska samtidigt finnas kvar.', source('https://www.liberalerna.se/politik/alkohol', 'L: Alkohol, uppdaterad 2026-05-28', 'tillåta licensbutiker för öl och vin som ett komplement till Systembolaget')),
    unknown('s23', 'L:s aktuella reformredovisning stöder slopat diagnoskrav. Den tar inte ställning till att också slopa vårdintyg, vilket är vad den nya frågan gäller.', source('https://www.liberalerna.se/beslutade-reformer-i-regering/ny-konstillhorighetslag', 'L: Ny könstillhörighetslag – diagnos och intyg är olika krav')),
    answer('s49', 5, 'high', 'L:s utskottsföreträdare stöder uttryckligen egen och anhörigas försörjning samt skärpta krav. Källan ersätter den tidigare artikeln från 2015.', source(familyDebate, 'L: Patrik Karlson, anförande 91, 2026-08-13', 'Att kunna försörja sig själv och sina familjemedlemmar har en avgörande betydelse för integrationen')),
    answer('s54', 5, 'high', 'L nämner adoption uttryckligen som en möjlighet som ska vara öppen oavsett sexuell läggning.', source('https://www.liberalerna.se/politik/hbtqi', 'L: HBTQI, uppdaterad 2026-05-06', 'Alla familjer ska ha samma juridiska skydd.')),
    unknown('s48', 'L vill utreda ett regelverk med införande som mål, men endast för obotlig dödlig sjukdom med kort tid kvar att leva. Frågan är vidare och omfattar även obotligt lidande utan terminal sjukdom. Därför är det tidigare värdet 4 för oprecist.', source('https://www.liberalerna.se/politik/frivillig-dodshjalp', 'L: Frivillig dödshjälp, uppdaterad 2026-05-12 – avgränsat till livets slut')),
    unknown('s16', 'Fler lagliga vägar och fler kvotflyktingar i Europa anger inte entydigt att just Sveriges kvot ska öka från dagens nivå.', source('https://www.liberalerna.se/politik/invandring', 'L: Invandring – europeiskt sammanhang för kvotflyktingar')),
    answer('s17', 5, 'high', 'Partiets eget motiv säger uttryckligen att tillfälliga uppehållstillstånd ska vara huvudregel framåt. Motstånd mot att återkalla redan givna permanenta tillstånd gäller en annan fråga.', source('https://valkompass.svt.se/2026/parti/liberalerna/', 'L: Eget svar i SVT:s valkompass 2026, motiv om uppehållstillstånd')),
  ],
  m: [
    answer('s22', 4, 'high', 'Partiets eget svar är ganska bra förslag. Motiveringen vill behålla Systembolaget men är öppen för starköl och vin i matvarubutiker på sikt. Det är ett uttryckligt, försiktigt stöd för denna reform.', source('https://valkompass.svt.se/2026/parti/moderaterna/', 'M: Eget svar i SVT:s valkompass 2026, alkohol i livsmedelsbutiker')),
    unknown('s23', 'Stöd för 2025 års lag belägger inte att även vårdintyget ska avskaffas. Ingen tillräckligt precis partikälla har hittats.'),
    answer('s49', 5, 'high', 'M:s utskottsföreträdare stöder uttryckligen skärpta försörjningskrav för anhöriga. Huvudregeln är därför belagd utan slutsats från allmän restriktivitet.', source(familyDebate, 'M: Viktor Wärnick, anförande 42, 2026-08-13')),
    answer('s54', 5, 'medium', 'Partistyrelsen beskriver de praktiska hindren för samkönades adoptioner som problem och säger att partiet ska vara drivande för att förbättra situationen. Belägget är partistyrelsens eget yttrande, inte motionärernas förslag.', source('https://moderaterna.se/app/uploads/2023/09/Motionsbok-2.pdf#page=103', 'M: Partistyrelsens yttrande över motionerna 5:22–5:23, partistämman 2023, s. 102–103')),
    unknown('s16', 'Den aktuella migrationssidan eftersträvar minimal asylinvandring men anger inte om kvotflyktingmottagningen ska vara högre eller lägre än dagens nivå.', source('https://moderaterna.se/var-politik/migration/', 'M: Migration – kvotantal inte specificerat')),
  ],
  kd: [
    answer('s22', 1, 'high', 'Partiet försvarar försäljningsmonopolet uttryckligen, samtidigt som gårdsförsäljning tillåts som avgränsat undantag.', source('https://kristdemokraterna.se/var-politik/politik-a-till-o/andts', 'KD: ANDTS, uppdaterad 2026-07-03', 'Vi värnar Systembolagets försäljningsmonopol')),
    answer('s23', 1, 'high', 'KD kräver medicinsk utredning och diagnos och motsätter sig därmed en enbart administrativ ändring utan vårdintyg.', source('https://www.riksdagen.se/sv/webb-tv/video/debatt-om-forslag/prioriteringar-inom-halso-och-sjukvarden_hd01sou17/', 'KD: Christian Carlsson, anförande 98, 2026-04-16', 'det ska krävas medicinsk utredning, en diagnos om könsdysfori och ett godkännande från Socialstyrelsen')),
    answer('s49', 5, 'high', 'KD:s utskottsföreträdare stöder uttryckligen försörjning av sig själv och sin familj och skärpta försörjningskrav.', source(familyDebate, 'KD: Ingemar Kihlström, anförande 73, 2026-08-13')),
    unknown('s54', 'Principprogrammet beskriver en mamma och en pappa som eftersträvansvärt vid adoption. Det säger inte tillräckligt tydligt att samkönade par ska uteslutas från samma rätt till individuell prövning; ett familjeideal räcker inte för att koda ett förbud.', source('https://kristdemokraterna.se/download/18.7932b3db19c9887db6c221c/1773136182639/Principprogram%20hemsida.pdf#page=36', 'KD: Principprogram 2025, s. 36'), source('https://kristdemokraterna.se/var-politik/politik-a-till-o/adoption', 'KD: Adoption – barnets bästa, ingen uttrycklig könsavgränsning')),
    unknown('s16', 'KD vill prioritera ett kvotflyktingsystem men anger inte i den aktuella politiken att Sveriges antal ska öka. Ett systemval är inte ett besked om volymen.', source('https://kristdemokraterna.se/var-politik/politikomraden/migration-och-integration', 'KD: Migration och integration – prioritering av kvotsystem')),
  ],
  sd: [
    answer('s22', 2, 'high', 'Partiets eget svar är ganska dåligt förslag. Motiveringen försvarar monopolet men vill modernisera Systembolagets service. Värdet återger partiets egen styrkegrad, inte ett antagande från gårdsförsäljningspolitiken.', source('https://valkompass.svt.se/2026/parti/sverigedemokraterna/', 'SD: Eget svar i SVT:s valkompass 2026, alkohol i livsmedelsbutiker')),
    answer('s23', 1, 'high', 'SD vill riva upp den nya lagen och göra reglerna för juridiskt könsbyte mer restriktiva. Det är uttryckligt motstånd mot den föreslagna förenklingen.', source('https://www.sd.se/a-till-o/konstillhorighetslagen/', 'SD: Könstillhörighetslagen', 'Reglerna för juridiskt könsbyte ska bli mer restriktiva och rättssäkra.')),
    answer('s49', 5, 'high', 'SD:s migrationspolitiska företrädare stöder uttryckligen de skärpta försörjningskraven för anhöriga.', source(familyDebate, 'SD: Ludvig Aspling, anförande 60, 2026-08-13')),
    unknown('s54', 'Den aktuella sidan vill stoppa eller begränsa internationella adoptioner generellt. Den besvarar inte lika rätt till prövning för samkönade och olikkönade par, vilket också kan gälla nationell adoption.', source('https://www.sd.se/a-till-o/adoption/', 'SD: Adoption – generell begränsning, inte skillnad efter föräldrarnas kön')),
    unknown('s48', 'Partiet vill ha en förutsättningslös utredning. Det är inte ett ställningstagande för införande.', source('https://www.sd.se/a-till-o/dodshjalp/', 'SD: Dödshjälp', 'Sverigedemokraterna vill förutsättningslöst utreda dödshjälp och läkarassisterat självmord')),
    unknown('v11', 'Principprogrammets familjeideal och krav på kulturell gemenskap besvarar inte den generella frihetsprincipen för val som inte skadar andra. Det tidigare värdet 2 var en alltför bred inferens.'),
  ],
  fl: [
    unknown('s22', 'Folklistans arkiverade EU-prioriteringar ger inget besked om licensbutiker för alkohol.'),
    unknown('s23', 'Folklistans arkiverade EU-prioriteringar ger inget besked om administrativ ändring av juridiskt kön.'),
    unknown('s49', 'Att vilja avskaffa asylrätten besvarar inte ekonomiska villkor för anhöriginvandring.'),
    unknown('s54', 'Ingen tydlig nationell partikälla om samkönade pars adoptionsprövning har hittats.'),
  ],
  nyans: [
    answer('s22', 1, 'high', 'Den nationella A–Ö-sidan vill behålla monopolet och begränsa Systembolagets öppettider.', source(nyansPolicy, 'Partiet Nyans: Politik A–Ö, Alkohol och tobak', 'Partiet Nyans vill behålla Systembolagets monopol')),
    unknown('s23', 'De granskade nationella politiktexterna ger inget tillräckligt precist besked om vårdintyg vid juridiskt könsbyte.'),
    answer('s49', 5, 'high', 'Nyans vill underlätta familjeåterförening men vill uttryckligen villkora den med egen och anhörigs försörjning.', source(nyansPolicy, 'Partiet Nyans: Politik A–Ö, Familjeåterförening', 'under förutsättning att man kan försörja sig själv och personen i fråga')),
    unknown('s54', 'Stöd för familjebildning och adoption på A–Ö-sidan anger inte vilka par som ska ha rätt till prövning.', source(nyansPolicy, 'Partiet Nyans: Politik A–Ö, Familjebildning')),
    unknown('s16', 'Ett europeiskt fördelningssystem för asylsökande är inte samma sak som fler UNHCR-kvotflyktingar till Sverige. Den tidigare källan belägger inte antalet.', source('https://www.partietnyans.se/var-politik/', 'Partiet Nyans: Vår politik, Europeiska unionen')),
    unknown('v11', 'Partiet betonar individens livsval och religionsfrihet men vill samtidigt begränsa yttrandefriheten för hån av religion. Den tidigare entydiga femman byggde på ett urval av frihetsuttalanden. Källans olika avsnitt ger inte ett säkert svar på hela principen.', source(nyansPolicy, 'Partiet Nyans: Politik A–Ö, Demokrati, HBTQ och Yttrandefrihet')),
  ],
  afs: [
    unknown('s22', 'Ingen tydlig partikälla om privata licensbutiker för starköl och vin har hittats.'),
    unknown('s23', 'Familjepolitikens motstånd mot genuspedagogik och stöd för biologiska könsroller besvarar inte det specifika juridiska intygskravet. Den tidigare kodningen var indirekt.', source(afsFamily, 'AfS: Familjepolitik – inte en position om administrativ könsregistrering')),
    answer('s49', 5, 'high', 'Partiet anger uttryckligen att anknytningspersonen ska ha fullt ekonomiskt ansvar för den anhörige.', source(afsMigration, 'AfS: Återvandringspolitik, anhöriginvandring', 'Fullständigt försörjningsansvar för den anhörige tillkommer anknytningspersonen.')),
    answer('s54', 1, 'high', 'Partiet vill uttryckligen utesluta samkönade par från adoption. Det är inte en slutsats från ett allmänt familjeideal.', source(afsFamily, 'AfS: Familjepolitik, Familjebildning och barns rättigheter', 'Endast heterosexuella par som är gifta ska kunna adoptera barn')),
    unknown('s17', 'Ett generellt stopp för asylmottagning besvarar inte vilken tillståndstyp som ska vara huvudregel för dem som får asyl. Det tidigare värdet 5 blandade samman dessa frågor.', source(afsMigration, 'AfS: Återvandringspolitik – avskaffad asylmottagning är en annan fråga')),
    unknown('v11', 'Konkreta begränsningar av adoption eller skolans undervisning räcker inte för att bestämma partiets svar på hela frihetsprincipen med villkoret att ingen annan skadas.'),
  ],
  pp: [
    unknown('s22', 'En reglerad cannabismarknad eller eget bruk av alkohol belägger inte stöd för privata alkoholbutiker.', source(ppPolicy, 'PP: Sakpolitik 2024-04-24, publicerad som aktuell sakpolitik 2026')),
    answer('s23', 5, 'high', 'Sakpolitiken kräver uttryckligen en administrativ process utan medicinska krav eller läkarintyg, tills juridiskt kön avskaffas.', source(ppPolicy, 'PP: Sakpolitik, Sexualpolitik §3, PDF-sida 62', 'Ändring av juridiskt kön görs till en administrativ process utan krav på diagnos, könsidentitetsutredning, medicinska ingrepp eller läkarintyg')),
    unknown('s49', 'Programmet om migration ger inget precist besked om ett ekonomiskt försörjningskrav vid anhöriginvandring.', source(ppPolicy, 'PP: Sakpolitik, Migration')),
    answer('s54', 5, 'medium', 'Sakpolitiken vill göra föräldrabalken könsneutral och likställa familjekonstellationer. Det är ett konkret lagstiftningsmål, men adoptionsprövningen namnges inte separat i avsnittet.', source(ppPolicy, 'PP: Sakpolitik, Sexualpolitik §10, PDF-sidor 63–64')),
    answer('s46', 4, 'medium', 'Programöversikten vill reglera cannabismarknaden, men detaljförslagen vill först utreda skadeverkningar och regleringens form. Det motiverar ett villkorat stöd med medelhög säkerhet i stället för det tidigare reservationslösa värdet 5.', source(ppPolicy, 'PP: Sakpolitik, Drogpolitik §§6–9, PDF-sidor 17–20')),
  ],
  med: [
    unknown('s22', 'Den granskade aktuella nationella politiken ger inget precist besked om licensbutiker. En enskild bloggtext om Systembolaget och en allmän skattepolitik räcker inte för en partiposition.'),
    unknown('s23', 'Ingen tydlig aktuell nationell position om administrativt könsbyte utan vårdintyg har hittats.'),
    unknown('s49', 'Aktuell politik vill stoppa asyl- och anhöriginvandring från Mellanöstern och Nordafrika. Det besvarar inte ett generellt försörjningskrav för tillåten anhöriginvandring.', source(medMigration, 'MED: Migration och assimilation, brödtext hämtad via webbplatsens publika politik-API')),
    unknown('s54', 'Familjepolitiken betonar familjens frihet men ger inget precist besked om samkönades adoptionsprövning.', source('https://www.med.se/politik/familjen', 'MED: Familjen, brödtext hämtad via webbplatsens publika politik-API')),
    unknown('s16', 'Ett stopp för mottagning från en viss region är inte ett besked om Sveriges totala UNHCR-kvot. Det tidigare belägget var för indirekt.', source(medMigration, 'MED: Migration och assimilation')),
    unknown('s17', 'Ett stopp för viss asylinvandring säger inte vilken tillståndstyp som ska gälla för personer som får asyl.', source(medMigration, 'MED: Migration och assimilation')),
    unknown('s48', 'Ett enskilt debattinlägg får inte kodas som partipolitik. Sidans separata upplysning om MED:s hållning säger att partiet inte tar ställning i sak utan vill utreda.', source('https://blogg.med.se/2019/07/19/dodshjalp/', 'MED-bloggen: Dödshjälp, 2019-07-19, faktarutan MED tycker', 'MED tar för närvarande inte ställning i sak')),
    answer('v16', 5, 'high', 'Den aktuella politiken lägger uttryckligen ansvaret för anpassning till svenska värderingar på invandraren och förespråkar assimilation.', source(medMigration, 'MED: Migration och assimilation, publicerad nationell politik', 'Svenska värderingar ska gälla – det är invandrarens skyldighet att anpassa sig.')),
  ],
}
