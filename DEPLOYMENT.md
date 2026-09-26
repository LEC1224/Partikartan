# Bygga och lansera Partikartan

Version 0.2.0 publiceras som **Beta Release 2**. Produktionslanseringen görs av projektägaren. Följande beskriver projektets befintliga Node-server; ingen specifik tjänstehanterare eller serveradress förutsätts.

## Uppdatera till den publicerade versionen

Kör i projektkatalogen på servern. Kontrollera först att eventuella lokala kodändringar är omhändertagna. Använd inte tvingande återställning för att skriva över dem.

```sh
git status --short
git fetch origin --tags
git switch --detach v0.2.0
npm ci --include=dev
npm test
npm run build
```

Bygget behöver även utvecklingsberoendena. Använd en kompatibel Node-version (Vite kräver Node 20.19+ eller 22.12+; Node 24 används i den lokala verifieringen). `npm run build` kör TypeScript-kontroll, bygger klienten och förrenderar startsidan.

## Starta om den befintliga tjänsten

Om tjänsten hanteras av exempelvis systemd, PM2 eller en Windows-tjänst: starta om **den befintliga Partikartan-tjänsten** med dess vanliga kommando. Tjänstens arbetskatalog ska vara projektkatalogen och startkommandot ska motsvara:

```sh
npm run serve
```

Om servern körs manuellt i en terminal: stoppa den gamla processen med Ctrl+C och kör kommandot ovan. Starta inte en andra instans på samma port.

Servern lyssnar normalt på `127.0.0.1:4173` bakom en omvänd proxy. Behåll de befintliga värdena för `HOST`, `PORT` och eventuell `SITE_URL`. Den inbyggda publika adressen är `https://partikarta.se`. Frontendens förhandsvisningsserver är inte produktionsservern.

## Data som ska följa med

Feedback sparas i `feedback-data/` i serverns arbetskatalog. Behåll katalogen vid uppdatering och ta med den i ordinarie säkerhetskopiering. Den och dess underkataloger publiceras inte i Git. Behåll också lokala miljöinställningar.

Testbesökarnas enkätsvar lagras i deras egna webbläsare. Den nya versionen ber dem besvara betydelseändrade frågor på nytt och behåller övriga giltiga svar.

## Kontrollera efter omstart

- Öppna [partikarta.se](https://partikarta.se) och ladda om sidan.
- Startsidan ska ange **25 eller 71 frågor**.
- Resultatet ska visa de åtta riksdagspartierna och sakna småpartival.
- Kontrollera att sökning, källmotiveringar och feedbackformulär går att öppna.
- Kontrollera eventuella serverloggar och att den vanliga proxyn når tjänsten.

Om uppdateringen behöver återställas: använd den tidigare verifierade committen/taggen, kör `npm ci --include=dev` och `npm run build`, och starta om samma tjänst. Behåll feedbackkatalogen även vid återställning.
