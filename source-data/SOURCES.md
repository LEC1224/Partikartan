# Source Data

Den här katalogen innehåller de partiprogram, principprogram, idéprogram och valmanifest som användes som huvudsakligt källmaterial vid kodningen av partiernas positioner.

Senaste granskningen finns i [översikten den 26 september 2026](reviews/2026-09-26-review.md), med länkar till delrapporter och daterade ersättningskodningar i `src/data/reviews/`. Listorna nedan bevarar också historiskt underlag; de innebär inte att alla gamla länkar eller partisvar har återverifierats.

## Arkiverade programfiler

| Parti | Lokal fil | Ursprunglig källa |
| --- | --- | --- |
| Centerpartiet | `centerpartiet-ideprogram-2022.pdf` | https://www.centerpartiet.se/download/18.3f55a43d19b2bd455d0a5da5/1768991589484/Centerpartiet_Id%C3%A9program_l%C3%A4ttl%C3%A4st_2022.pdf |
| Centerpartiet | `centerpartiet-valmanifest-2026.pdf` | https://val2026.centerpartiet.se/wp-content/uploads/2026/06/Valmanifest-2026.pdf |
| Kristdemokraterna | `kristdemokraterna-principprogram-2025.pdf` | https://kristdemokraterna.se/download/18.7932b3db19c9887db6c221c/1773136182639/Principprogram%20hemsida.pdf |
| Liberalerna | `liberalerna-valmanifest-2026.pdf` | https://www.liberalerna.se/wp-content/uploads/liberalernas-valmanifest-2026-40s-komprimerad.pdf |
| Miljöpartiet | `miljopartiet-partiprogram-2025.pdf` | https://www.mp.se/wp-content/uploads/2025/12/miljopartiets-partiprogram-2025.pdf |
| Moderaterna | `moderaterna-ideprogram-2020-talet.pdf` | https://moderaterna.se/app/uploads/2022/01/Ideprogram_digitalt_9dec.pdf |
| Socialdemokraterna | `socialdemokraterna-partiprogram-2025.pdf` | https://www.socialdemokraterna.se/download/18.66b0e5c8197581879ca15ce/1749742402637/Socialdemokraternas%20partiprogram%202025.pdf |
| Sverigedemokraterna | `sverigedemokraterna-principprogram-2023.pdf` | https://www.sd.se/wp-content/uploads/2024/01/sverigedemokraternas-principprogram-2023.pdf |
| Vänsterpartiet | `vansterpartiet-partiprogram-2024.pdf` | https://www.vansterpartiet.se/wp-content/uploads/2024/11/partiprogram_2024_skrivare.pdf |

## Småpartier – bevarat granskningsunderlag

Inför version 0.2.0 togs småpartivalet bort från den publika jämförelsen och exporterna. Inget av de fem partierna når nu underlagskraven. Källmaterial, kodningar och tester bevaras för granskning och eventuell återintroduktion med samma underlagskrav som för andra partier. De daterade rapporterna beskriver granskningsläget före detta senare visningsbeslut.

Alla fem partier nedan uppfyllde urvalskriteriet för småpartier: anmält deltagande i riksdagsvalet 2026 och högst röstandel i riksdagsvalet 2022 eller Europaparlamentsvalet 2024. När partiet saknade en nedladdningsbar program-PDF skapades en daterad, printvänlig PDF-kopia av partiets egen programsida. Texten är inte redaktionellt kompletterad.

| Parti | Lokal fil | Ursprunglig källa |
| --- | --- | --- |
| Folklistan | `folklistan-prioriteringar-2024.pdf` | https://web.archive.org/web/20240521141157/https://folklistan.se/prioriteringar/ |
| Partiet Nyans | `partiet-nyans-partiprogram-2026.pdf` | https://www.partietnyans.se/var-politik/ |
| Alternativ för Sverige | `alternativ-for-sverige-partiprogram-2026.pdf` | https://alternativforsverige.se/politik/ samt de elva programområden som länkas därifrån |
| Piratpartiet | `piratpartiet-principprogram-2021.pdf` | https://piratpartiet.se/principprogram/ |
| Piratpartiet | `piratpartiet-valmanifest-2022.pdf` | https://piratpartiet.se/valmanifest-2022/ |
| Medborgerlig Samling | `medborgerlig-samling-partiprogram-2026.pdf` | https://www.med.se/politik |
| Medborgerlig Samling | `medborgerlig-samling-ideprogram-2019.pdf` | https://med.se/wp-content/uploads/2021/03/Ideprogram-rev2-stamma-2019.pdf |

De kompletterande primärkällorna för småpartiernas enskilda svar finns i `src/data/minorParties.ts` och de daterade granskningsmodulerna. Piratpartiets sakpolitiska översikt och Medborgerlig Samlings aktuella program används på samma sätt som riksdagspartiernas kompletterande webbkällor.

Matchning kräver belägg för minst 80 procent av snabbtestets 25 frågor (20 svar) eller 60 procent av hela testets 71 frågor (43 svar), avrundat uppåt. För en kartmarkör krävs dessutom minst 60 procents täckning av den absoluta frågevikten på vardera axeln. Samma krav gäller alla partier. Småpartiernas svar granskas nu i projektets data och rapporter, medan den publika matrisen visar riksdagspartierna. Gränserna är publiceringsregler och garanterar inte statistisk säkerhet.

### MED:s aktuella programåtkomst, 26 september 2026

Den nya React-webbplatsen visar program på `https://med.se/politik/partiprogram/{slug}`. Dess offentliga programlista länkar till officiella originalfiler i den publika lagringen `https://fuksyfcthmbxxwxpcguk.supabase.co/storage/v1/object/public/documents/partiprogram/{slug}/program.md` (även PDF finns för flera program). Exempel: [företagsprogrammet](https://med.se/politik/partiprogram/foretagspolitiskt-program) och [dess originaltext](https://fuksyfcthmbxxwxpcguk.supabase.co/storage/v1/object/public/documents/partiprogram/foretagspolitiskt-program/program.md). Detta användes när webbplatsens vanliga textutdrag var tomt. Programmens egna antagnings- och revisionsdatum gäller; åtkomsten 2026 gör inte äldre beslut till nya.

## Kompletterande källor

Följande historiska källförteckning avser partiernas egna sidor och dokument som användes i grundkodningen. Nyare granskningar kan ersätta eller ogiltigförklara dessa kodningar. För aktuellt belägg, motivering och säkerhetsnivå: följ den aktiva svarsposten och granskningsrapporten, inte enbart denna lista.

### Vänsterpartiet

- A-kassa: https://www.vansterpartiet.se/var-politik/politik-a-o/a-kassa/
- Gårdsförsäljning: https://www.vansterpartiet.se/var-politik/politik-a-o/gardsforsaljning/
- Motionssvar allmänpolitik 2026: https://www.vansterpartiet.se/wp-content/uploads/2026/02/K26-A-motionssvar.pdf
- Nato: https://www.vansterpartiet.se/var-politik/politik-a-o/nato/
- Religiösa friskolor: https://www.vansterpartiet.se/var-politik/politik-a-o/religiosa-friskolor/
- Skattepolitik: https://www.vansterpartiet.se/var-politik/politik-a-o/skattepolitik/
- Flyktingpolitik: https://www.vansterpartiet.se/var-politik/politik-a-o/flyktingpolitik/
- Kärnkraft: https://www.vansterpartiet.se/var-politik/politik-a-o/karnkraft/
- Dödshjälp: https://www.vansterpartiet.se/var-politik/politik-a-o/dodshjalp/

### Socialdemokraterna

- A-kassa: https://www.socialdemokraterna.se/var-politik/a-till-o/a-kassa
- Alkoholmonopolet: https://www.socialdemokraterna.se/nyheter/nyheter/2023-04-11-s-minimikrav-for-att-skydda-det-svenska-alkoholmonopolet
- Migration och flyktingpolitik: https://www.socialdemokraterna.se/var-politik/a-till-o/migration-och-flyktingpolitik
- Fastighetsskatt: https://www.socialdemokraterna.se/var-politik/a-till-o/skatter/fakta-om-socialdemokraternas-politik-kring-fastighetsskatt
- Kollektivavtal: https://www.socialdemokraterna.se/var-politik/a-till-o/kollektivavtal
- Nato: https://www.socialdemokraterna.se/var-politik/a-till-o/nato
- Politiska riktlinjer 2025: https://www.socialdemokraterna.se/download/18.66b0e5c8197581879cad79/1749654527283/A-E%20Politiska%20riktlinjer%202025_beslutat.pdf
- Religiösa skolor: https://www.socialdemokraterna.se/var-politik/a-till-o/religiosa-skolor
- Kärnkraft: https://www.socialdemokraterna.se/var-politik/a-till-o/karnkraft
- Det gjorde Socialdemokraterna 2014-2022: https://www.socialdemokraterna.se/var-politik/det-gjorde-socialdemokraterna-2014-2022
- Narkotika: https://www.socialdemokraterna.se/var-politik/a-till-o/narkotika

### Miljöpartiet

- Gårdsförsäljning av alkohol: https://www.mp.se/skane/just-nu/svar-pa-motion-om-gardsforsaljning/
- Valmanifest till EU-valet 2024: https://www.mp.se/valmanifest-till-eu-valet-2024/
- Politiskt handlingsprogram 2026-2030: https://www.mp.se/wp-content/uploads/2026/04/politiskt-handlingsprogram-2026-2030.pdf
- Demokrati och mänskliga rättigheter: https://www.mp.se/politik/demokrati-och-mr/
- Motion om Sveriges medlemskap i Nato: https://www.mp.se/politik/motion-om-sveriges-medlemskap-i-nato/
- Utbildningspolitiskt program: https://www.mp.se/wp-content/uploads/2024/05/utbildningspolitiskt-program.pdf
- Kulturpolitik: https://www.mp.se/politik/kultur/
- Migration och lika rätt: https://www.mp.se/politik/migration-och-lika-ratt/
- Bostäder: https://www.mp.se/politik/bostader/
- Vinster i välfärden: https://www.mp.se/politik/vinster-i-valfarden/

### Centerpartiet

- Alkoholpolitik: https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/vard-och-omsorg/alkoholpolitik
- A-kassa och omställningsförsäkring: https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/jobb/a-kassa-och-omstallningsforsakring
- Anhöriginvandring: https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/integration-och-migration/anhoriginvandring
- Bostadsskatter: https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/bostader/bostadsskatter
- Friskolor: https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/utbildning/friskolor
- Internationella försvarssamarbeten: https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/forsvar/internationella-forsvarssamarbeten
- Kriget i Ukraina: https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/utrikes--och-bistandsfragor/kriget-i-ukraina
- Kommitté 5 utbildning: https://www.centerpartiet.se/download/18.3f55a43d19b2bd455d0ce085/1769611278324/05_Motionsbeslut%202017_Utbildning_Kommitte%205.pdf
- Vårbudget 2025: https://www.centerpartiet.se/download/18.35b6d81319c986cebc41e926/1772704814456/Va%CC%8Arbudget%20Centerpartiet%202025.pdf
- Media och public service: https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/kultur-media-och-idrott/media-och-public-service
- Demokrati: https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/demokrati

### Liberalerna

- A-kassa: https://www.liberalerna.se/politik/a-kassa
- Alkohol: https://www.liberalerna.se/politik/alkohol
- Bostad: https://www.liberalerna.se/politik/bostad
- Försörjningskrav vid anhöriginvandring: https://www.liberalerna.se/nyheter/tydligare-arbetslinje-okar-integrationen
- Nato: https://www.liberalerna.se/politik/nato
- Religiösa friskolor: https://www.liberalerna.se/politik/religiosa-friskolor
- Skolvalet: https://www.liberalerna.se/politik/skolvalet
- RUT- och ROT-avdrag: https://www.liberalerna.se/politik/rut-och-rot-avdrag
- Vinstintresset i skolan: https://www.liberalerna.se/politik/vinstintresset-i-skolan
- Trygghet och studiero: https://www.liberalerna.se/politik/trygghet-och-studiero
- Narkotika: https://www.liberalerna.se/politik/narkotika
- Frivillig dödshjälp: https://www.liberalerna.se/politik/frivillig-dodshjalp

### Moderaterna

- A-kassa: https://moderaterna.se/var-politik/a-kassa-2/
- Bostadspolitik: https://moderaterna.se/var-politik/bostadspolitik/
- Integrationskommissionens slutrapport: https://moderaterna.se/app/uploads/2021/04/Integrationskommissionens-slutrapport.pdf
- Räntor och boendekostnader: https://moderaterna.se/var-politik/rantor/
- Arbetsstämma 2021: https://moderaterna.se/app/uploads/2021/09/Stammohandlingar-Arbetsstamman-2021.pdf
- Jobb och arbetsmarknad: https://moderaterna.se/var-politik/jobb-och-arbetsmarknad/
- Hälso- och sjukvård: https://moderaterna.se/var-politik/halso-och-sjukvard-2/
- Klimat, miljö och energi: https://moderaterna.se/var-politik/klimat-miljo-och-energi/
- Nato och försvar: https://moderaterna.se/var-politik/forsvar-och-krisberedskap/
- Systembolaget: https://moderaterna.se/nyhet/vallofte-18-aringar-ska-fa-handla-pa-systembolaget/
- Trafik och infrastruktur: https://moderaterna.se/var-politik/trafik-och-infrastruktur/
- Skola och utbildning: https://moderaterna.se/var-politik/skola-och-utbildning/
- Lag och ordning: https://moderaterna.se/var-politik/lag-och-ordning-2/
- Ekonomi och jobb: https://moderaterna.se/moderatkvinnorna/var-politik/ekonomi-och-jobb/
- Nytt företagarpaket i höstbudgeten: https://moderaterna.se/nyhet/nytt-foretagarpaket-i-hostbudgeten/
- Migration: https://moderaterna.se/var-politik/migration/
- Förebyggande insatser mot kriminalitet: https://moderaterna.se/vastragotaland/nyhet/forebyggande-insatser-mot-kriminalitet/
- RUT-avdraget: https://moderaterna.se/vasternorrland/var-politik/rut-avdraget/
- EU: https://moderaterna.se/ostergotland/var-politik/eu/
- Försvar och krisberedskap: https://moderaterna.se/var-politik/forsvar-och-krisberedskap/
- Ny kärnkraft vid Ringhals: https://moderaterna.se/nyhet/ny-karnkraft-ringhals/
- Sänkt skatt på bensin och diesel: https://moderaterna.se/nyhet/vanstersidan-kan-chockhoja-branslepriset-med-tio-kronor-per-liter/
- Propositionsbok 2023: https://moderaterna.se/app/uploads/2023/10/Propositionsbok.pdf

### Kristdemokraterna

- ANDTS: https://kristdemokraterna.se/var-politik/politik-a-till-o/andts
- Abort: https://kristdemokraterna.se/var-politik/politik-a-till-o/abort
- Friskolor: https://kristdemokraterna.se/var-politik/politik-a-till-o/friskolor
- Försvar: https://kristdemokraterna.se/var-politik/politikomraden/forsvar
- Konfessionella friskolor: https://wp.kristdemokraterna.se/varnamo/2017/05/13/konfessionella-friskolor/
- Public service: https://kristdemokraterna.se/var-politik/politik-a-till-o/public-service
- Förmögenhetsskatt: https://kristdemokraterna.se/var-politik/politik-a-till-o/formogenhetsskatt
- Inkomstskatter: https://kristdemokraterna.se/var-politik/politik-a-till-o/inkomstskatter
- Vindkraft: https://kristdemokraterna.se/var-politik/politik-a-till-o/vindkraft
- Drivmedelspriser: https://kristdemokraterna.se/var-politik/politik-a-till-o/drivmedelspriser
- Fastighetsskatt: https://kristdemokraterna.se/var-politik/politik-a-till-o/fastighetsskatt
- Hyresrätt: https://kristdemokraterna.se/var-politik/politik-a-till-o/hyresratt
- Kvotflyktingsystem: https://kristdemokraterna.se/var-politik/politik-a-till-o/kvotflyktingsystem
- Migration och integration: https://kristdemokraterna.se/var-politik/politikomraden/migration-och-integration
- Medborgarskap: https://kristdemokraterna.se/var-politik/politik-a-till-o/medborgarskap
- Kamerabevakning: https://kristdemokraterna.se/var-politik/politik-a-till-o/kamerabevakning
- Tandvård: https://kristdemokraterna.se/var-politik/politik-a-till-o/tandvard
- ROT- och RUT-avdrag: https://kristdemokraterna.se/var-politik/politik-a-till-o/rot--och-rut-avdrag
- Anonyma vittnen: https://kristdemokraterna.se/var-politik/politik-a-till-o/anonyma-vittnen
- Försvarspolitisk inriktning: https://kristdemokraterna.se/arkiv/nyheter/2022/2022-01-09-forsvarspolitisk-inriktning
- Samhällsbyggarkommittérapport: https://kristdemokraterna.se/download/18.226014ea19a154a9e25c81/1762937139823/Samha%CC%88llsbyggarkommitterapport%20251022.pdf
- Sänkt skatt på bensin och diesel: https://kristdemokraterna.se/arkiv/nyheter/2023/2023-09-27-en-stottande-budget-i-en-tuff-tid
- Statligt ansvar för sjukvården: https://wp.kristdemokraterna.se/vg/jamlik-sjukvard-omojligt-utan-statligt-ansvar/
- Narkotika: https://kristdemokraterna.se/var-politik/politik-a-till-o/narkotika
- Dödshjälp: https://kristdemokraterna.se/var-politik/politik-a-till-o/dodshjalp

### Sverigedemokraterna

- A-kassa: https://www.sd.se/a-till-o/a-kassa/
- Friskolor: https://www.sd.se/a-till-o/friskolor/
- Könstillhörighetslagen: https://www.sd.se/a-till-o/konstillhorighetslagen/
- Nato: https://www.sd.se/a-till-o/nato/
- Religiösa friskolor och alkoholpolitik i motionshandlingar 2025: https://event.sd.se/wp-content/uploads/2025/09/politiska-motioner-am-lo_final.pdf?251121090338=
- Sjukvård: https://www.sd.se/a-till-o/sjukvard/
- Ett paradigmskifte för Sverige: https://www.sd.se/astorp/ett-paradigmskifte-for-sverige/
- Medborgarskap: https://www.sd.se/astorp/medborgarskap/
- Anonyma vittnen: https://www.sd.se/astorp/anonyma-vittnen/
- Kamerabevakning: https://www.sd.se/tjorn/wp-content/uploads/sites/183/2025/02/kamerabevakning.pdf
- Valmanifest inför EU-valet 2024: https://www.sd.se/wp-content/uploads/2024/05/valmanifest2024.pdf
- Rättvis tandvård för bättre folkhälsa: https://www.sd.se/vasternorrland/wp-content/uploads/sites/107/2024/10/rattvis-tandvard-for-battre-folkhalsa-erica.pdf
- Sverige på väg: https://www.sd.se/vad-vi-vill/sverige-pa-vag/
- Motionshandlingar 2025: https://event.sd.se/wp-content/uploads/2025/09/politiska-motioner-am-lo_final.pdf?251121090338=
- Valplattform 2022: https://www.sd.se/wp-content/uploads/2022/07/sverigedemokraternas-valplattform-2022-april.pdf
- Vårbudget 2022: https://www.sd.se/wp-content/uploads/2022/07/varbudget-2022-formgiven.pdf
- Återkallelse av medborgarskap: https://www.sd.se/a-till-o/aterkallelse-av-medborgarskap/

## Åtkomstdatum

Källor till granskningarna [2026-09-25](reviews/2026-09-25-feedback.md) och [2026-09-26](reviews/2026-09-26-review.md), inklusive avgränsningar och osäkra besked, redovisas i respektive översikt och delrapporter. Daterade ersättningskodningar finns i `src/data/reviews/` och kan även återställa ett tidigare svar till okänt. Äldre källors åtkomstdatum skrivs inte om när en annan källa granskas. En hämtad programsida är inte heller bevis på att dess politiska innehåll nyligen beslutats.

De kompletterande källorna för riksdagspartierna användes vid kodningen den 2026-07-08 och 2026-07-09. Centerpartiets PDF-filer hämtades till den här katalogen den 2026-07-09. Småpartiernas källor hämtades och kodades den 2026-07-21.

## Kvarvarande luckor och Ej belagt

Den 2026-07-09 kompletterades datamodellen så att varje parti exporterar ett svar för varje fråga. Där tillräckligt tydligt belägg saknas kodas svaret som `value: null`, `confidence: unknown`. Det visas nu som `Ej belagt` för partier; användarens eget svarsalternativ heter fortfarande `Vet ej`.

`Ej belagt` betyder inte att partiet saknar åsikt. Det betyder att projektet inte har tillräckligt underlag för en offentlig 1–5-kodning. Okända svar får ingen mittenpoäng och utesluts ur matchningens jämförelseunderlag.

Frågerevisioner skyddar även partisvaren: en äldre bedömning används inte automatiskt efter en betydelseändring. Granskningsomgången måste avse den aktuella revisionen, annars blir svaret okänt. Endast aktiva fråge-ID:n exporteras; avvecklade ID:n finns kvar i historiken men påverkar inte resultatet.
