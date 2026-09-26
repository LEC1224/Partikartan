# Open prompts

Partikartan ska vara öppen med både källkod och promptarbete. Den här filen fortsätter loggen efter Beta Release 1 och dokumenterar de användarprompter som styr den fortsatta utvecklingen i Codex. Hädanefter är GPT-5.6 Sol den primära modellen som använts.

Plattforms- och systeminstruktioner från Codex/OpenAI ingår inte här. Filen dokumenterar de prompts som projektägaren har gett Codex för just detta projekt, plus korta kontextnoteringar och en uttryckligen efterfrågad sammanfattning av Codex återrapportering när det behövs för spårbarhet.

## Efter Beta Release 1

Beta Release 1 publicerades som version 0.1.0. Prompterna nedan gäller arbetet efter den releasen.

## Prompt 1

> Valkompassen har varit ute i några dagar nu och jag har fått feedback från användare. Alla inskick finns i /feedback-data/. Jag vill att du analyserar all tillgänglig feedback, funderar på vad som är rättfärdigat och borde fixa. Ha i åtanke att användarbasen och feedback-basen kan vara politiskt vinklad, och jag vill att du hittar så neutrala sätt att åtgärda problemen de tar upp som möjligt.
>
> Innan du ändrar i kodbasen, skapa en plan och rapportera till mig vad dina upptäckter och slutsatser är. Jag vill också att du motiverar varför du format feedbacken som du gjort. Om du avfärdat någon feedback, berätta vad och varför.

## Komprimerad sammanfattning av Codex första återrapportering

Codex gick igenom samtliga tolv tidsstämplade feedbackfiler, varav en var ett uppenbart formulärtest, samt en teknisk persistensfil och försökte skilja verifierbara sakfel från politiska omdömen. Återrapporteringen formades som konkreta ändringsförslag med källläge, osäkerhet och neutralitetsmotiv, i stället för som en omröstning bland inskickarna. Skälet var att en politiskt sned användarbas kan upptäcka verkliga fel men inte i sig avgöra vilken rättelse som är korrekt.

Förslagen som projektägaren fick ta ställning till var, i samma ordning som i nästa prompt:

1. Ändra Socialdemokraternas svar på v21 från ”Vet ej” till 5 med hög säkerhet. Partiets stöd för stora försvars- och beredskapssatsningar samt beredskapsskatt bedömdes direkt stödja påståendet.
2. Ändra Miljöpartiets svar på s33 från 2 till 5 med hög säkerhet. Den första bedömningen utgick från att partiet accepterar medlemskapet och inte driver utträde. Efter projektägarens invändning nyanserades detta senare till 4: linjen stödjer fortsatt medlemskap i praktiken men är inte ett oreserverat normativt Nato-stöd.
3. Ändra Vänsterpartiets svar på s04 från ”Vet ej” till 1 med hög säkerhet, eftersom partiet uttryckligen motsätter sig marknadshyror.
4. Ta bort v22 som en nära dubblett av s35. Dubbletten gav samma konflikt extra vikt, samtidigt som frågornas axelvikter och vissa partisvar motsade varandra. Den kvarvarande s35 skulle källgranskas separat och snabbtestet fortsatt innehålla 25 frågor.
5. Göra v04 normativ genom att fråga hur makten *bör* fördelas mellan företag och fack. Den gamla formuleringen kunde läsas som en faktabeskrivning, vilket gjorde svarsskalan oklar.
6. Precisera s11 till den konkreta frågan om försäkringspatienters väg från privatfinansierad vård till offentligt finansierad vård. Feedbacken hade rätt i att den gamla texten kunde ge den missvisande bilden att privat försäkring i sig finansierar offentlig vård. Partisvaren skulle granskas mot den nya innebörden.
7. Lägga in det aktuella taket för RUT i frågans förklaring. Det ansågs vara neutral bakgrundsinformation som behövs för ett informerat svar.
8. Göra s01 och s15 mätbara genom att ange en faktisk inkomstgräns respektive en definierad grupp och nettoförmögenhet. Även här skulle partisvaren omprövas, eftersom vaga källor inte automatiskt belägger en mer exakt fråga.
9. Ett export- eller utskriftsläge för resultat bedömdes som ett rimligt förbättringsförslag men som en separat funktion, inte en rättelse av frågedata.
10. Synpunkten att MP och V inte ”känns frihetliga” avfärdades som underlag för kodändring. GAL–TAN-positionen räknas fram fråga för fråga och bör inte flyttas utifrån ett allmänt partiomdöme; ett konkret fel i en fråga eller vikt hade däremot varit granskningsbart.
11. Förslaget att lägga till Piratpartiet avfärdades för den här ändringsomgången. Ett nytt parti kräver samma heltäckande och källbelagda behandling som övriga partier och bör inte läggas till som en ofullständig särlösning.

Ett uppenbart formulärtest med nonsensuppgifter och en teknisk persistensfil avfärdades också som produktfeedback. Motiveringen till hela sorteringen var symmetrisk källkritik: samma krav på aktuell primärkälla, fråga–källa-passning och försiktig kodning skulle gälla oavsett om ett förslag flyttade ett parti åt vänster, höger, GAL eller TAN.

## Prompt 2

> Följande granskning av dina förslag på feedback följer ordningen i den listan du gav ut i ditt senaste svar:
>
> 1) Godkänd
>
> 2) På källan du och feedback-skrivaren anger står det "Miljöpartiet röstade nej till Nato, men respekterar riksdagens beslut och driver inte frågan om ett utträde. I stället vill vi att Sverige samarbetar med likasinnade länder för att stärka demokrati, transparens och ansvarstagande inom Nato. Sverige ska samtidigt fortsätta att föra en självständig utrikespolitik." Är det att tolka som att de "Håller med helt" för påståendet: "**Sverige bör fortsätta som medlem i Nato.**" Kanske. Jag låter dig avgöra! Låt inte min egen bias här blanda in sig. Jag är svagt emot NATO och svagt Höger-GAL, så vet du om du behöver ta ställning till om jag blandar in bias i sättet jag ifrågasätter på.
>
> 3) Godkänd
>
> 4) Godkänd. Men se till att det snabba testet bevarar 25-frågor om du vill ta bort den ena av dem. Partiernas svar är dock inte identiska på de två frågorna, så gör en extra koll så att partiernas svar verkligen reflekterar den kvarvarande frågans innebörd.
>
> 5) Godkänd
>
> 6) Godkänd. Bra förtydligande. Dubbelkolla också att partiernas svar fortfarande stämmer till den nya formuleringen. Justera de annars.
>
> 7) Godkänd
>
> 8) Godkänd. Glöm inte att granska partisvaren här heller.
>
> 9) Håller med. Detta kan vi implementera senare i en annan tråd.
>
> 10) Håller med dig. Ändra inte kodbasen.
>
> 11) Håller med dig. Ändra inte kodbasen.
>
> Gör upp en ny plan givet mina reflektioner och rapportera planen till mig innan du börjar.

Kontextnotering: Codex reviderade Nato-bedömningen till 4 av 5 med hög säkerhet. Motivet var att Miljöpartiets aktuella linje tydligt innebär fortsatt medlemskap i praktiken, men inte ett oreserverat stöd som motiverar ”Håller helt med”. Den nya planen lovade också en full kontroll av den kvarvarande klimatfrågan, alla omformulerade frågors partisvar och snabbtestets längd, källtäckning och axelbalans. Exportfunktionen sköts upp och ingen kodändring planerades med anledning av de allmänna GAL–TAN- eller Piratpartiet-synpunkterna.

## Prompt 3

> Bra plan! Kör på!
>
> När du genomfört justeringarna vill jag att du för in den här dialogen i en ny fil PROMPTS/OPEN_PROMPTS_v2.md som ska vara på samma format som OPEN_PROMPTS_v1.md i samma undermapp och innehålla prompter från utvecklingen efter första beta-release. Jag vill också att du lägger in en komprimerad sammanfattning av ditt första svar i den här tråden, så att läsare förstår vad jag godkänner och inte, och vilka argument du lagt fram för mig att ta ställning till. Allt för transparensens skull!
>
> Avsluta med en commit.

Kontextnotering: Under genomförandet visade den exakta källkontrollen att s01 och s11 inte längre hade tillräckligt många partisvar för snabbtestet, eftersom flera gamla belägg gällde bredare frågor. De ersattes därför där av frågor med minst sju tydliga partisvar. Den dubblerade v22 togs bort, s35 behölls med partisvaren omprövade och utan GAL–TAN-vikt, och snabbtestet kontrollerades på nytt till 25 frågor, samtliga tolv ämnen och nära neutralt resultat vid raka svar.

## Prompt 4

> Lägg till ett sett att exportera sitt resultat, antingen som en PDF med ens fullständiga svar, inklusive GAL-TAN-kompassen, partimatchningen och ens matchning mot partier i alla svar, eller som en ofullständig PNG som bara har GAL-TAN-kompassen och partimatchningen sida vid sida! Avsluta med att uppdatera open prompts och en commit

Kontextnotering: Resultatsidan fick två lokala exporter som inte skickar användarens svar till servern. Den fullständiga PDF-filen innehåller en sammanfattningssida med GAL–TAN-kompass och partimatchning samt en flersidig svarsbilaga där varje påstående, användarens fullständiga svar och samtliga partiers svar jämförs. Exakta svar och svar i samma riktning skiljs visuellt åt. Den kompakta PNG-filen innehåller endast kompassen och partimatchningen sida vid sida i ett delningsvänligt 16:9-format. Båda filerna genereras i webbläsaren, och PDF-layouten verifierades genom att rendera första sidan, en full svarssida och slutsidan till bilder.

## Prompt 5

> PNGen är bra! Förutom en liten detalj: Där det står "Nästan samma riktning" kanske det ska stå "Samma riktning" eftersom man av "Exakt" fattar vad skillnaden är. "Nästan samma riktning" kan låta som att man själv svarat 4 och partiet svarat 2, till exempel.
>
> PDFen är värre. Dels är partisvarlistan otydlig ut ett grafiskt design-perspektiv. Jag tror det vore bättre att köra på något mer likt det vi ser på resultatsidan, fast kompaktare. Dessutom är förstasidan skalad skevt, så att den ser utdragen ut.
>
> Här är ett exempel på resultatfilerna som genererades nu. Se om du kan åtgärda problemen och commita om du känner dig nöjd med ditt utfall!

Kontextnotering: Exportens begrepp ändrades från ”nästan” till ”samma riktning” i både exportfilerna och resultatsidan. PDF-sammanfattningen fick en separat A4-anpassad duk med korrekta proportioner i stället för att sträcka 16:9-bilden över sidan. Svarsbilagan ritades om efter webbvyn: sex kolumner för 1–5 och Vet ej, användarens markör ovanför en skiljelinje och partiernas kompakta markörer under. Den nya PNG-filen, PDF-sammanfattningen, en full svarssida och slutsidan renderades och granskades visuellt före commit.

## Prompt 6

> I about-sidan står det att Partikartan är icke-vinstdrivande. Just nu finns det inget sätt för mig att tjäna pengar på sidan, men den har blivit avsevärt mer populär än jag trodde den skulle bli och jag skulle vilja lägga till ett enkelt swish-nummer för donationer. Vad tror du om det, givet filosofin och principerna bakom sidan?

Kontextnotering: Codex bedömde att frivilliga bidrag är förenliga med Partikartans oberoende och transparens, men rekommenderade att det kategoriska ”icke-vinstdrivande” preciseras. Förslaget var att hålla stödet frivilligt och diskret, utan betalfunktioner eller inflytande över frågor och resultat, samt att öppet beskriva vad bidragen stödjer.

## Prompt 7

> Okej. Mitt swishnummer är 0723297762. Det är viktigt för mig att donationsfunktionen upplevs som en parantes snarare än något som besökarna bemöts av direkt. Kan du fundera lite på hur du skulle skriva om about-sidan för att göra den så konsekvent och korrekt som möjligt.

Kontextnotering: Codex föreslog att Swish-informationen endast skulle finnas som vanlig brödtext under informationen om drift, utan knapp, QR-kod, färgad ruta eller placering i sidfoten. Samtidigt föreslogs tydligare formuleringar om organisatoriskt oberoende, personlig politisk hemvist, AI-användning och vad testets kontroll med raka svar faktiskt kan visa.

## Prompt 8

> Ändra Vem Driver Sidan till
>
> Partikartan drivs av mig, Carl Månsson, mjukvaruutvecklare från Göteborg. Jag byggde sidan eftersom jag saknade en valkompass som kombinerar ekonomisk vänster–höger med GAL–TAN och samtidigt känns snabb, clean och möjlig att granska.
> Sidan drivs inte på uppdrag av och är inte knuten till något parti, företag, kampanj eller annan intresseorganisation. Ingen extern aktör bestämmer över frågor, viktning, partipositioner eller resultat, förutom genom er sakliga och källbegrundade feedback.
> För transparensens skull vill jag också upplysa om att jag är medlem i Liberalerna, men partiet har inte haft något att göra med att jag valt att skapa Partikartan.
> Målet är inte att hävda att kompassen är perfekt neutral. Jag tror för övrigt inte att människor kan skapa helt objektiva verk. Målet är snarare att göra antaganden, källor och möjliga fel synliga nog för att kunna granskas, kritiseras och förbättras.
>
> Ersätt "Ett bidrag ger ingen motprestation eller påverkan över sidans innehåll eller resultat." med "Skriv gärna "Tack för Partikartan" eller något i meddelandefältet så jag vet var pengarna kommer ifrån. Donationer med konkreta ändringsförslag i meddelande-fältet kommer tolkas som påverkansförsök och jag kommer i sådana fall återbetala beloppet och ignorera förslaget. Vill du påverka Partikartans innehåll, använd feedback-formuläret. Donationer är bara för visad uppskattning."

Kontextnotering: About-sidan uppdaterades med den angivna presentationen, en diskret Swish-rad under driftinformationen och den uttryckliga gränsen mellan uppskattningsbidrag och försök att påverka innehållet. Modellspecifika formuleringar gjordes versionsoberoende och balanskontrollens begränsningar beskrevs tydligare.

## Prompt 9

> "Som en grundläggande balanskontroll har testet genomförts med samma ytterlighetssvar på samtliga frågor. Att båda svarsmönstren hamnar förhållandevis nära origo säger något om testets samlade riktningsbalans, men bevisar inte att varje enskild fråga är neutralt formulerad. Därför hålls frågor och viktning öppna för granskning och feedback."
>
> Det här är lite otydligt. Kan du förtydliga att ytterlighetssvar innebär att svara 1 eller 5 på allt?

Kontextnotering: Texten ändrades så att den uttryckligen beskriver en testkörning med svaret 1 på samtliga frågor och en annan med svaret 5 på samtliga frågor.

## Prompt 10

> Jag tror vi ska dela upp Drift och Ansvar. Det känns som en lång div nu, och tar upp helt ortogonala saker

Kontextnotering: Prompten innehöll en skärmbild av den långa sektionen i about-dialogen. Sektionen delades upp i ”Ansvar och öppenhet”, som samlar den öppna utvecklingsprocessen och dataintegriteten, och ”Drift och frivilligt stöd”, som samlar finansiering och Swish-information. Donationstexten delades i två stycken men fick ingen särskild visuell framhävning.

## Prompt 11

> Nice! Uppdatera Open Prompts med den här chatten, commita och pusha till GitHub

## Prompt 12

> Jag har lagt till alla feedback-inskick som kommit in sedan vi senast gick igenom feedback och uppdaterade sidan. Din första uppgift blir att gå igenom de nya önskemålen och avgöra om de är rättfärdigade eller inte, och om deras förslag skulle vinkla Partikartan i någon politisk riktning. Återkom med din bedömning.

Kontextnotering: Codex bedömde att rättelsen av V:s RUT-svar, en precis granskning av straffbarhetsåldern, granskning av många saknade partisvar, klarspråk och tydligare information om vad partipositionerna mäter var berättigade. Frågorna om inkomstskatt, försvarsutgifter och teknik kontra konsumtion behövde förtydligas utan att styra mot en politisk uppfattning. Djurpolitik identifierades som en relevant lucka, men nya frågor behövde jämförbara källor och motiverad axelkodning. Manuella förflyttningar av partier utifrån samarbeten eller allmänna politiska intryck avvisades. Saknade belägg skulle inte ersättas med antagna åsikter eller mittenvärden.

## Prompt 13

> Jag tycker att du kan gå vidare med att fixa alla rättfärdigade förslag. Se till att dokumentera, motivera och källunderbygga där det behövs. För frågor du formulerar om såpass att de till viss graqd ändrar innebörd, se till att partiernas svar uppdateras med god källgrund som vanligt.
>
> Det är viktigare att Partikartan förblir korrekt, faktagrundad och neutral än att du implementerar alla ändringsförslag.

Kontextnotering: Omformuleringarna av s21, s35, v02 och v21 åtföljdes av omprövning för samtliga tretton partier. Tidigare obelagda riksdagspartisvar i de 30 mest källglesa frågorna granskades, med både nya belägg och återställning av överdrivet säkra tidigare svar till okänt. Djurfrågorna sköts upp eftersom källtäckning och axelkodning inte var tillräckligt beredda. Snabbtestets s35 ersattes med v21 för att behålla kravet på minst sju belagda riksdagspartisvar per fråga. Gamla användarsvar på de fyra ändrade frågorna återanvänds inte. Beslut, källor, kontrollresultat och kvarstående begränsningar dokumenteras i [feedbackgranskningen 25 september 2026](../source-data/reviews/2026-09-25-feedback.md).

## Prompt 14

> Vad menar du med "19 otillräckligt underbyggda svar har återställts till ”Vet ej”."

Kontextnotering: De nitton avsåg enskilda kombinationer av parti och fråga i föregående granskning, inte nitton frågor. ”Ändrats till ej belagt” är tydligare än ”återställts”: kodningen säger att projektets belägg inte räcker, inte att partiet självt har svarat att det inte vet.

## Prompt 15

> Jag tror vi kan förtydliga/förenkla forumleringen på fler frågor, och om jag låter dig söka internet längre och noggrannare efter goda belägg för partisvar som fortfarande står på "Vet ej", kan vi skapa en mer pålitlig kompass. Kompassen byggdes i stort av GPT 5.5, så nu när du kör GPT-6 Astra borde du kunna förbättra den avsevärt. Jag sätter dig på Ultra och låter dig jobba hur länge du vill för att förbättra formuläret. Du får även lägga till fler frågor till det stora testet och byta ut frågor till snabbtestet om du gör det noggrant och uppdaterar alla beroende delar av programvaran i enhet med ändringarna. Du måste såklart hela tiden värna de höga kraven på källbegrundning, neutralitet och transparens. Återkom med en lista/rapport av allt du ändrat.
>
> Om du tycker att sidan behöver snyggas till eller ges ett bättre UX så så får du även justera kosmetiska aspekter.

Kontextnotering: Granskningen den 26 september omprövade 22 frågeinnebörder för alla tretton partier, lade till fyra frågor och tog bort sex överlappande eller alltför oprecisa frågor. Fulltestet omfattar nu 71 frågor och snabbtestet 25. Källunderlaget prövades mot frågornas exakta avgränsningar; både nya belägg och tillbakadragna gamla kodningar redovisas. Modellen fick gemensam beräkningsmetod för användare och partier, separata krav på axeltäckning och frågor som enbart påverkar partimatchningen. Källmotiveringar, sökning, källluckefilter, versionsskydd och exportlogik uppdaterades. Detaljer och före–efter-underlag finns i [granskningen 26 september 2026](../source-data/reviews/2026-09-26-review.md). Modellen i sig behandlas inte som bevis för korrekthet eller neutralitet. Denna begäran resulterade i lokala ändringar; ingen publicering ingick.

## Prompt 16

> Vi kanske borde ta bort småpartierna om de inte kan tillföra något till siten ändå.

Kontextnotering: Codex rekommenderade att ta bort småpartivalet från den publika sidan tills underlaget räcker för meningsfulla jämförelser. Enskilda sakpositioner finns belagda, men inget av de fem partierna når underlagskraven för matchning eller kartplacering. Källmaterialet och granskningshistoriken bör behållas för eventuell återintroduktion. Samma underlagskrav ska gälla alla partier; beslutet grundas på bristande belägg, inte partiernas storlek eller åsikter.

## Prompt 17

> Kör på det, sen kan du uppdatera Open Prompts med vad vi snackar om här, publicera en ny release på GitHub och lansera den nya versionen på prodservern.

Kontextnotering: Användaren godkände borttagningen och GitHub-publiceringen. Småpartierna tas bort från startsidans beskrivning, resultatväljaren, svarsmatrisen och de publika exporternas underlag. Källmaterial, kodningar och granskningskontroller bevaras. Nästa release benämns Beta Release 2, version 0.2.0, och omfattar även de tidigare genomförda formulär- och källförbättringarna. Feedbackkatalogens underkataloger undantas från Git så att arkiverade privata inskick inte publiceras.

## Prompt 18

> Jag kan faktiskt bygga den själv, skit i att lösa launchen, men berätta hur jag gör

Kontextnotering: Detta var användarens svar på frågan om produktionsserver och driftsättningsflöde. Instruktionen ersätter begäran att Codex ska genomföra produktionslanseringen; GitHub-releasen är fortfarande godkänd. Bygg- och omstartsinstruktioner finns i [DEPLOYMENT.md](../DEPLOYMENT.md). Ingen produktionsserver ska ändras av Codex i denna omgång.
