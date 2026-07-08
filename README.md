# Partikartan

En Sverige-centrerad valkompass byggd som en Vite/React-app.

## Funktioner

- 30 sakfrågor och 20 värderingsfrågor.
- Svarsskala 1-5 plus `Vet ej`.
- Resultat på två axlar: ekonomisk vänster-höger och GAL-TAN.
- Upp till tre prioriterade ämnen som väger 1,75x i resultatet.
- Svenska riksdagspartier initieras i origo tills källbelagda partisvar finns.
- Partisvar kan lagras med källa, citat, datum och säkerhetsnivå i `src/data/parties.ts`.

## Kommandon

```bash
npm install
npm run dev
npm run build
npm test
```

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
