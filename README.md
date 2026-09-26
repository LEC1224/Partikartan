# Partikartan

En Sverige-centrerad valkompass byggd som en Vite/React-app.

Partikartan är avsedd att vara objektiv, oberoende och transparent. Det betyder inte att modellen automatiskt är perfekt eller fri från alla antaganden, men frågor, viktning, poängsättning, partibelägg och promptar är öppna för granskning.

## Funktioner

- 52 sakfrågor och 19 värderingsfrågor.
- Val mellan ett snabbtest med 25 fasta frågor och det fullständiga testet med 71 frågor.
- Svarsskala 1–5 plus `Vet ej` för användaren. Otillräckligt belagda partisvar visas som `Ej belagt`.
- Resultat på två axlar: ekonomisk vänster-höger och GAL-TAN.
- Partijämförelse fråga för fråga: samma svar eller samma riktning ger full poäng. 1 och 2 matchar varandra, liksom 4 och 5; 3 matchar bara 3. Övriga kombinationer ger noll poäng. Kartan skiljer fortfarande mellan svarens styrka.
- 14 frågor används enbart i partimatchningen, med noll vikt på båda kartaxlarna och en redovisad motivering.
- Upp till tre prioriterade ämnen som väger 1,75x i resultatet.
- Svenska riksdagspartier kan jämföras i en skrollbar svarsmatris; kartmarkörer kräver tillräckligt underlag.
- Den publika jämförelsen och exporterna omfattar de åtta riksdagspartierna. Småpartiernas källmaterial och bedömningar bevaras i projektet för granskning och eventuell framtida återintroduktion; underlaget räcker ännu inte för meningsfulla resultat.
- Matchning kräver belägg för minst 80 procent av snabbtestet (20 av 25) eller 60 procent av hela testet (43 av 71), avrundat uppåt. Kartmarkörer kräver dessutom belägg för minst 60 procent av den sammanlagda absoluta frågevikten på vardera axeln. Samma krav gäller alla partier; gränserna är publiceringsregler, inte statistiska säkerhetsmått.
- Resultatet kan exporteras som en fullständig PDF med samtliga svar och partiernas svar, eller som en kompakt PNG med kompassen och partimatchningen sida vid sida.
- Snabbtestets urval granskas för saklig bredd, svarsriktningar och källtäckning. En jämn fördelning av ja- och nej-riktningar är inte ensam ett bevis på neutralitet.
- Partisvar lagras med källa, åtkomstdatum, säkerhetsnivå och i tillämpliga fall motivering eller kort källutdrag i `src/data/parties.ts`, `src/data/minorParties.ts` och daterade granskningar i `src/data/reviews/`.
- Käll-PDF:er och kompletterande källförteckning finns i `source-data/`.
- Öppen källkod på GitHub.
- Versionsarkiverade open prompts i `PROMPTS/`.
- Feedbackformulär som kan spara inkommande synpunkter som textfiler i `feedback-data/`.

## Kommandon

Instruktioner för att hämta en release, bygga och starta om produktionen finns i [DEPLOYMENT.md](DEPLOYMENT.md).

```bash
npm install
npm run dev
npm run build
npm test
npm run app
```

`npm run app` bygger appen och startar den lilla Node-servern som behövs för att feedbackformuläret ska kunna skriva textfiler till `feedback-data/`.

Produktionsbygget förhandsrenderar startsidan till HTML så att sökmotorer och andra klienter kan läsa sidans huvudinnehåll utan att först köra JavaScript. Servern exponerar även `robots.txt` och `sitemap.xml`, gör canonical- och delningsadresser absoluta och cachelagrar versionsmärkta resurser.

Den inbyggda publika adressen är `https://partikarta.se`, så att Open Graph-fält, canonical-adress, `robots.txt` och sitemap aldrig råkar peka på en intern proxyadress. Sätt vid behov `SITE_URL` till ett annat publikt ursprung; servern använder annars vidarebefordrat protokoll och värdnamn när de inte är interna.

## Feedback

Feedback skickas till `POST /api/feedback` när appen körs via `npm run app` eller `npm run serve` efter build. Formuläret visar relevanta följdfrågor för den valda ärendetypen och varje inskick sparas som en separat, strukturerad `.txt`-fil i `feedback-data/`.

Git ignorerar genererade feedbackfiler så att privata eller personliga uppgifter inte råkar publiceras. Katalogen finns ändå med i repo:t via `feedback-data/.gitkeep`.

Tillåtna feedbackanledningar:

- `Jag tror att ett partis svar på en fråga är inkorrekt`
- `Jag tycker att en fråga är vinklat formulerad`
- `Jag tror att mitt resultat är fel`
- `Jag tror att ett partis position i koordinatsystemet är felaktig`
- `Jag har hittat ett tekniskt fel`
- `Jag har ett förslag på hur tjänsten kan förbättras`
- `Jag vill föreslå en ny fråga`
- `Jag saknar ett parti i sammanfattningen`
- `Jag hittade bias i koden`
- `Annat`

## Open prompts

Se [`PROMPTS/OPEN_PROMPTS_v2.md`](PROMPTS/OPEN_PROMPTS_v2.md). Där loggas Carl Månssons prompts till Codex så att även utvecklingsprocessen kan granskas. Tidigare utvecklingsstadier finns kvar som versionsarkiverade filer i samma katalog.

## Koda partisvar från partiprogram

Senaste fråge-, käll- och metodgranskningen: [26 september 2026](source-data/reviews/2026-09-26-review.md). Den tidigare [feedbackgranskningen den 25 september](source-data/reviews/2026-09-25-feedback.md) finns kvar som historik. Rapporterna redovisar beslut, motiveringar och begränsningar. Underlaget omfattar program, officiella besked, relevanta riksdagsunderlag och identifierade partisvar i förstahandsintervjuer och enkäter; det är inte en fullständig granskning av partiernas faktiska agerande.

När partiprogram eller andra primärkällor matas in ska varje partisvar läggas till som en `PartyResponse` i `responses` för rätt parti.

Principer:

- Koda endast ett svar när källan faktiskt tar ställning till frågan.
- Använd `value: 5` för tydligt stöd för påståendet och `value: 1` för tydligt motstånd.
- Använd `value: 3` när partiet uttryckligen intar en mellanposition.
- Använd `value: null` och `confidence: unknown` när belägget är oklart, motsägelsefullt eller bara indirekt.
- Sätt `confidence` till `high`, `medium` eller `low` efter hur direkt belägget är för källbelagda svar.
- Lägg alltid in minst en primärkälla i `evidence` för källbelagda svar.

Exporterade partier ska ha ett svar för varje aktiv fråga. Otillräckligt belägg kodas som `null` och visas som `Ej belagt`. Varken detta eller användarens `Vet ej` räknas som en politisk mittenposition. Matchningsprocenten beräknas bara på frågor där både användaren och partiet har ett känt svar.

Daterade rättelser i `src/data/reviews/index.ts` ersätter ursprungssvaret också när den nya kodningen är `null`. Vid ändrad frågeinnebörd ska alla berörda partier omprövas och frågans revision i `src/data/questionRevisions.ts` höjas. Versionskontrollen gäller både sparade användarsvar och partisvar: gamla partisvar blir okända tills de granskats för den nya revisionen. Varje granskningsomgång sparar vilka frågerevisioner som bedömdes. Avvecklade fråge-ID:n tas bort från aktiva svar och beräkningar, medan historiska granskningsfiler bevaras.
