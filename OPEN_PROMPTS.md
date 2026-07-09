# Open prompts

Partikartan ska vara öppen med både källkod och promptarbete. Den här filen loggar de användarprompter som hittills har styrt arbetet i Codex.

Plattforms- och systeminstruktioner från Codex/OpenAI ingår inte här. Filen dokumenterar de prompts som projektägaren har gett Codex för just detta projekt, plus korta kontextnoteringar när det behövs för spårbarhet.

## Före denna chatt

En tidigare Codex-chatt fick en prompt som enligt projektägaren var identisk med prompt 1 nedan. Den chatt-instansen kraschade och arbetet startades om här.

## Prompt 1

> Kan du göra en valkompass med ca 30 sakfrågor och 20 värderingsfrågor med knappar "Håller inte alls med" 1-5 "Håller helt med" och en "Vet ej", där man som resultat får sina politiska koordinater, på ett 2-dimensionellt plan med Höger-Vänster (ekonomsik) på x-axeln och GAL-TAN på y-axeln? Och där se hur man matchar gentemot partierna i sverige.
>
> Från början ska partierna bara ligga i mitten i origo, sen kommer jag genom Codex mata in partiprogram, så kan du automatiskt kolla upp partiernas svar på frågorna och placera in dem i planet?
>
> Tänk på att det ska vara Sverige-centrerat, så att inte alla partier hamnar långt till vänster i tavlan som de troligtvis skulle ha gjort på en amerikanskt viktad skala.
>
> Jag vill inte att vi blandar in någon bias i den här kompassen. Svaren måste vara genuina och sakliga.
>
> Man ska också kunna välja tre ämnen som betyder lite extra för en, och då ska ens svar på frågor i dessa ämnen väga tyngre till resultatet.
>
> Mitt råd skulle vara att göra detta till en webapp.

## Prompt 2

> Vad borde jag kalla den här applikationen?

## Prompt 3

> Vi kör på Partikartan. Kan du pusha detta till [LEC1224/Partikartan.git](https://github.com/LEC1224/Partikartan.git)

## Prompt 4

> Jag vill att vi trycker på att den här valkompassen är avsedd att vara objektiv, och att vi har öppen källkod på Github, och att vi dessutom ska ha "open prompts", alltså dela alla prompts använda i Codex i en .md fil på Github. Gör förresten den filen nu, och inkludera det vi skrivit hittills. Den enda prompten som jag gav innan den här chatt-instansen var en identisk prompt till den första i denna instansen, men den kraschade. Därav omstarten här.
>
> Hemsidan behöver inkludera en länk till vår github, och dessutom måste man kunna skicka feedback. Feedbacken kan bli en textfil på /feedback-data/ och man ska kunna välja feedback-anledning mellan "Jag hittade bias i koden", "Jag tror att mitt resultat är fel", "Jag tycker att en fråga är vinklat formulerad" och "Annat", samt ett textfält där man får utveckla.

## Prompt 5

Kontext: prompten innehöll en bifogad screenshot med två markerade sektioner, där den övre gröna sektionen skulle behållas som format och den nedre ljusa sektionens innehåll skulle flyttas dit.

> Ta bort den översta raden av grejer som är lite clicheigt, och ersätt med den nedre, fortfarande i ett grönt horisontellt fält, det var snyggt tycker jag. Alltså kommer det vita fältet och innehållet som just nu är i det gröna fältet försvinna

## Prompt 6

> Uppdatera prompt-filen och pusha

## Prompt 7

Kontext: prompten kom tillsammans med lokala PDF-filer för Vänsterpartiet, Socialdemokraterna, Miljöpartiet, Liberalerna, Kristdemokraterna, Moderaterna och Sverigedemokraterna. Projektägaren uppgav att någon nedladdningsbar PDF från Centerpartiet inte fanns i materialet och bad därför uttryckligen om webbsök för Centerpartiet och för eventuella kompletterande frågor där svar saknades i PDF:erna.

> Här kommer sen salig blandning av princip/ide/partiprogram som du kan ha som källmaterial för att tillskriva responses till partierna i listan för valkompassen. Jag hittade inte en nedladdnignsbar pdf från Centerpartiet. Du får använda sök för det. Använd även sök för andra frågor du inte hittar svar på.
>
> Jag tilldelar dig Extra Hög arbetsförmåga i denna prompten för att du ska kunna ta din tid. Avsluta med att uppdatera Prompts-markdown filen också, och commita.

## Prompt 8

> Kan du lägga till en flik på hemsidan där det beskrivs vem som driver sidan, jag, och hur jag gått till väga för att hålla den fri från min egen bias (Använda partiernas egna partiprogram som grund, låta GPT 5.5 generera algoritmerna och rapportera in partiernas svar utifrån partiprogram (vilket vi också borde nämna kan medföra bias från OpenAI), kontrollerat testet genom att "Svara 1 på alla frågor" eller "Svara 5 på alla frågor" resulterar i hyfsat origo-nära svar, vilket indikerar att frågorna inte är formulerat på ett vinklat sett.
>
> När du ändå jobbar på det, lägg till nya anledningar i feedback-formuläret: "Jag tror att ett partis position i koordinatsystemet är felaktigt" och "Jag saknar ett parti i sammanfattningen"

## Prompt 9

> På framsidan står det "Utforska dina värderingar på en karta anpassad efter svensk politik. Partikartan är avsedd att vara objektiv, källkritisk och möjlig att granska öppet.". Kan vi byta ut slutet måt "vara objektiv, oberoende och transparent", samt lägga till ett stycke på den nya About-sidan där vi beskriver att sidan är helt oberoende, reklamfri och icke-vinstdrivande som ytterligare underlag till att den är pålitlig, samt att jag heter Carl Månsson, är en mjukvaruutvecklare från Göteborg, bryr mig om hederlig dialog och demokratisk process, samt att sidan är nästan helt utvecklad genom prompting i Codex. Allt detta ska såklart inte stå i samma stycke, utan där det passar. För att det ska se konsistent ut borde vi också ersätta allt som antyder att det är ett team bakom sidan med text som antyder att det är en ensam utvecklare. T.ex. i feedback-rutan står det "Hjälp oss granska". Det kanske borde stå "Hjälp mig utforma tjänsten"

## Prompt 10

> Nu står det bara "Fortsätt där du slutade" för mig. Man kanske skulle lägga till en "Börja om" knapp för folk som är mitt i att svara eller redan gjort testet. Du borde också ta bort "Om sidan" knappen bredvid gör testet knappen, och göra om "Om sidan" fliken till en popup ruta såsom "Så fungerar det" och "Feedback" är! Ändra också feedback-textfältsrutans hint-text till något simplare och mindre ledande.

## Prompt 11

> Kan du lägga till en /source-data/ folder på git med partiprogramen och en underfil SOURCES.md som inkluderar källor du hittat där partiprogrammen inte räckte till?

## Prompt 12

> Analysera de 50 frågor vi inkluderat i det här politiska testet, och fundera om vi har några blinda fläckar sakpolitiskt och värderingsmässigt. Rapportera de till mig här sen

## Prompt 13

> Gör upp en plan för hur du ska justera/lägga till/ta bort frågor för att tackla de brister du funnit. Det behöver inte vara 50 totalt. Blir det fler så blir det bara ett noggrannare test. Men du måste vara noga med att frågorna formulering och frågornas ämnesdistribution bevarar en neutral vinkling. En bra måttstock för det kan vara att om man svarar bara 1 eller bara 5 på alla frågor så ska man hamna hyfsat nära origo.
>
> Uppdatera även partiernas svar till de frågor du ändrar, lägger till och eventuellt tar bort.

## Prompt 14

> Implement the proposed plan.

## Prompt 15

> Csn you quickly make the site reachable from devices on the same network or tsilscale?

## Prompt 16

> Uppdatera prompt-md, commita och pusha detta
