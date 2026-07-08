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
