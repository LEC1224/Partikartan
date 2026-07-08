# Partikartan

En Sverige-centrerad valkompass byggd som en Vite/React-app.

Partikartan är avsedd att vara objektiv, oberoende och transparent. Det betyder inte att modellen automatiskt är perfekt eller fri från alla antaganden, men att frågor, viktning, scoring, partibelägg och prompts ska kunna granskas öppet.

## Funktioner

- 30 sakfrågor och 20 värderingsfrågor.
- Svarsskala 1-5 plus `Vet ej`.
- Resultat på två axlar: ekonomisk vänster-höger och GAL-TAN.
- Upp till tre prioriterade ämnen som väger 1,75x i resultatet.
- Svenska riksdagspartier initieras i origo tills källbelagda partisvar finns.
- Partisvar kan lagras med källa, citat, datum och säkerhetsnivå i `src/data/parties.ts`.
- Käll-PDF:er och kompletterande källförteckning finns i `source-data/`.
- Öppen källkod på GitHub.
- Open prompts i `OPEN_PROMPTS.md`.
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

## Feedback

Feedback skickas till `POST /api/feedback` när appen körs via `npm run app` eller `npm run serve` efter build. Varje inskick sparas som en separat `.txt`-fil i `feedback-data/`.

Git ignorerar genererade feedbackfiler så att privata eller personliga uppgifter inte råkar publiceras. Katalogen finns ändå med i repo:t via `feedback-data/.gitkeep`.

Tillåtna feedbackanledningar:

- `Jag hittade bias i koden`
- `Jag tror att mitt resultat är fel`
- `Jag tror att ett partis position i koordinatsystemet är felaktigt`
- `Jag saknar ett parti i sammanfattningen`
- `Jag tycker att en fråga är vinklat formulerad`
- `Annat`

## Open prompts

Se `OPEN_PROMPTS.md`. Där loggas Carl Månssons prompts till Codex så att även utvecklingsprocessen kan granskas.

## Koda partisvar från partiprogram

När partiprogram eller andra primärkällor matas in ska varje partisvar läggas till som en `PartyResponse` i `responses` för rätt parti.

Principer:

- Koda endast ett svar när källan faktiskt tar ställning till frågan.
- Använd `value: 5` för tydligt stöd för påståendet och `value: 1` för tydligt motstånd.
- Använd `value: 3` när partiet uttryckligen intar en mellanposition.
- Lämna frågan okodad om belägget är oklart, motsägelsefullt eller bara indirekt.
- Sätt `confidence` till `high`, `medium` eller `low` efter hur direkt belägget är.
- Lägg alltid in minst en primärkälla i `evidence`.

Det är medvetet att partier utan analyserade svar ligger kvar i origo. Det undviker att appen låtsas veta mer än den gör.
