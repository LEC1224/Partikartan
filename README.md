# Partikartan

En Sverige-centrerad valkompass byggd som en Vite/React-app.

Partikartan är avsedd att vara objektiv, oberoende och transparent. Det betyder inte att modellen automatiskt är perfekt eller fri från alla antaganden, men frågor, viktning, poängsättning, partibelägg och promptar är öppna för granskning.

## Funktioner

- 51 sakfrågor och 22 värderingsfrågor.
- Val mellan ett snabbtest med 25 fasta frågor och det fullständiga testet med 73 frågor.
- Svarsskala 1-5 plus `Vet ej`.
- Resultat på två axlar: ekonomisk vänster-höger och GAL-TAN.
- Partijämförelse som räknas fråga för fråga, där nära svar ger delpoäng.
- Upp till tre prioriterade ämnen som väger 1,75x i resultatet.
- Svenska riksdagspartier visas både på kartan och i en skrollbar svarsmatris.
- Snabbtestets frågor har källbelagda svar från minst sju av åtta partier och är balanserade mellan kompassens riktningar.
- Partisvar lagras med källa, citat, datum och säkerhetsnivå i `src/data/parties.ts`; saknade eller oklara belägg visas som `Vet ej`.
- Käll-PDF:er och kompletterande källförteckning finns i `source-data/`.
- Öppen källkod på GitHub.
- Versionsarkiverade open prompts i `PROMPTS/`.
- Feedbackformulär som kan spara inkommande synpunkter som textfiler i `feedback-data/`.

## Kommandon

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

Se [`PROMPTS/OPEN_PROMPTS_v1.md`](PROMPTS/OPEN_PROMPTS_v1.md). Där loggas Carl Månssons prompts till Codex så att även utvecklingsprocessen kan granskas. Framtida utvecklingsstadier sparas i nya filer i samma katalog.

## Koda partisvar från partiprogram

När partiprogram eller andra primärkällor matas in ska varje partisvar läggas till som en `PartyResponse` i `responses` för rätt parti.

Principer:

- Koda endast ett svar när källan faktiskt tar ställning till frågan.
- Använd `value: 5` för tydligt stöd för påståendet och `value: 1` för tydligt motstånd.
- Använd `value: 3` när partiet uttryckligen intar en mellanposition.
- Använd `value: null` och `confidence: unknown` när belägget är oklart, motsägelsefullt eller bara indirekt.
- Sätt `confidence` till `high`, `medium` eller `low` efter hur direkt belägget är för källbelagda svar.
- Lägg alltid in minst en primärkälla i `evidence` för källbelagda svar.

Exporterade partier ska ha ett svar för varje fråga. Frågor utan tillräckligt belägg fylls därför som `Vet ej`, vilket gör svarsmatrisen komplett utan att appen låtsas veta mer än den gör.
