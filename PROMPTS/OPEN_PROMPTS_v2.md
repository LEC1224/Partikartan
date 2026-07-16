# Open prompts

Partikartan ska vara öppen med både källkod och promptarbete. Den här filen fortsätter loggen efter Beta Release 1 och dokumenterar de användarprompter som styr den fortsatta utvecklingen i Codex.

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
