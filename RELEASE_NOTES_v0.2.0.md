# Beta Release 2 – v0.2.0

Partikartan har fått tydligare frågor, en omfattande källgranskning och en mer transparent beräkning. Den publika jämförelsen omfattar nu de åtta riksdagspartierna.

## Formulär och källor

- 71 frågor: 52 sakfrågor och 19 värderingsfrågor. Snabbtestet har 25 frågor med uppdaterat urval.
- 22 befintliga frågor har ny innebörd; fyra frågor om sommarbete, pälsdjursuppfödning, adoptionsprövning och euron har tillkommit. Sex frågor har pensionerats.
- 489 dokumenterade källbedömningar i granskningen den 26 september, inklusive omprövning för samtliga tretton granskade partier på nya och betydelseändrade frågor.
- Riksdagspartiernas underlag omfattar nu 447 belagda svar av 568 möjliga. Indragna kodningar och kvarvarande luckor redovisas öppet.
- Småpartivalet är borttaget eftersom inget av de fem granskade småpartierna når underlagskraven. Källor och kodningar bevaras i projektet.

## Beräkning och transparens

- Användare och partier beräknas med samma metod och ämnesprioriteringar. Saknade partisvar drar inte längre kartpositionerna mot mitten.
- Fjorton frågor påverkar enbart partimatchningen, med motivering för varje undantag från kartan.
- Kartan kräver tillräckligt underlag på båda axlarna. Saknade användarsvar visas inte som en mittenposition.
- Matrisen har sökning, ämnesfilter, källluckefilter och källrutor med bedömningsmotivering och säkerhetsnivå.
- Sparade svar på betydelseändrade frågor måste besvaras på nytt; övriga giltiga svar behålls.
- PDF- och PNG-exporterna följer det nya resultatunderlaget. Om-sidan och Open Prompts är uppdaterade.
- Säkerhetsrättningar inom befintliga huvudversioner för Vitest och indirekta beroenden, bland annat DOMPurify, PostCSS och Browserslist. Den uppdaterade låsfilen ger inga rapporterade sårbarheter vid `npm audit` vid releasekontrollen.

## Granskning och installation

[Fullständig granskningsrapport](https://github.com/LEC1224/Partikartan/blob/v0.2.0/source-data/reviews/2026-09-26-review.md) · [Exakt ändringsbilaga](https://github.com/LEC1224/Partikartan/blob/v0.2.0/source-data/reviews/2026-09-26-changes.md) · [Open Prompts](https://github.com/LEC1224/Partikartan/blob/v0.2.0/PROMPTS/OPEN_PROMPTS_v2.md) · [Bygg och driftsättning](https://github.com/LEC1224/Partikartan/blob/v0.2.0/DEPLOYMENT.md)

Ren installation från låsfilen, 43 tester, hela lintkörningen och produktionsbygget har verifierats på releasefilerna. Dator- och mobilvyer har granskats. Exportknapparnas körning har kontrollerats utan programfel; slutlig exportlayout har inte kunnat verifieras visuellt i denna omgång.

GitHub-publiceringen är separat från produktionslanseringen, som projektägaren utför.
