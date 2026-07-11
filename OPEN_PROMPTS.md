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

## Prompt 17

> Kan du lägga till en funktion för att visa "argument för och emot" vid varje fråga, samt göra frågetexten lite mindre så att den inte tar upp så många rader på t.ex. mobilskärnar?

## Prompt 18

> Ytterligare justeringar: Kan du göra så att 1-5-knapparna alltid är på samma höjd, även om infotexten eller frågetexten tillfälligt är flera eller färre rader, så man kan hålla kvar musen/fingret på samma ställe mellan frågorna?

## Prompt 19

Kontext: prompten innehöll en bifogad screenshot av resultatkartan där flera partier låg nära ytterkanterna.

> Just nu är koordinatsystemet bara så expansivt att V, MP och SD hamnar i ytterkanterna. Vissa användare kanske kommer vara mer vänster än V eller mer TAN än SD, t.ex. Jag tycker att du ska lägga till 10 frågor som är mer radikala, för att tillåta användare att hamna utanför det svenska riksdagsspekturmet, och dessutom då "zooma ut" resultatkartan. Det lämnar också utrymme för att lägga till extrema småpartier i framtiden.

## Prompt 20

> Uppdatera Prompts, pusha och starta servern

## Prompt 21

Kontext: prompten innehöll en bifogad screenshot där argumentpanelen visade "För" till vänster nära "Håller inte alls med" och "Emot" till höger nära "Håller helt med".

> Nu står argument för precis intill "Håller inte alls med" och argument emot precis intill "Håller helt med". Vore det inte rimligare att de var i linje med knapparna de representerar, så att säga?

## Prompt 22

Kontext: prompten innehöll en bifogad screenshot från "Om Partikartan"-modalen där rubriken "Drift och ansvar" låg under ikonen i stället för bredvid den.

> Borde inte drift och ansvar hamna bredvid ikonen så som  nedre gör?

## Prompt 23

> Hur lagras oklara formulär nu? Det är väl i browser sessionen och inte på vår lokala server? Det kan vara nice att inkludera ett stycke om att vi inte lagrar svar och resultat, utan bara inskickade feedback-meddelanden

## Prompt 24

> Just nu hamnar jag på 99% Liberalerna, trots att jag inte håller med de i 99% av frågorna. Jag misstänker att procent-kalkylen görs enbart i hur man totalt sett hamnar på höger-vänster-gal-tan-kartan relativt partierna. Det har vi ju redan kartan för. Ens partijämförelser borde istället visa i hur många sak/värderingsfrågor man matchar eller nästan matchar partierna. Har du något bra förslag på hur man ska vikta t.ex. om jag svarar 4 på en fråga där ett parti svarar 5? Det borde ju anses som gynnande för partiets procentsats men inte helt. Jag har svårt att förstå hur man löser det exakt för att vara som mest rättvisande.
>
> I samband med den här ändringen behöver ju varje parti ha svar på varje fråga, så du kommer också behöva göra research för alla kvarvarande hål nu. Om svar från partierna är svåra eller opålitliga att hitta källa på, simulera det som att de valt "vet ej". Då kan vi skapa ett stort, skrollbart segment längst ner i resultatsidan där man kan se svar på alla enskilda frågor, där man både ser vad man själv svarade och vad alla partier svarade. Inklusive 1-5 och Vet ej. Symbolerna för partier och "Du" kan gott vara desamma som på 2D-kartan. Där flera partier svarat likadant ska deras ikoner staplat vertikalt över svars-alternativet (1-5 + vet ej).
>
> Detta är en stor uppgift så det är nog bäst att göra en plan! Om du förbrukar alla inkluderade tokenkrediter, pausa istället för att gå över på mina tillköpta reservkrediter. Avsluta med att uppdatera open prompts och commita

## Prompt 25

> Oj, va många frågor många partier står på vet ej på. Kan du försöka hitta lite mer information om vart partierna står. Det här känns som för svagt underlag för att skapa en bra bild av partiernas orientering

## Prompt 26

> Så funkar det-sidan behöver uppdateras för den stämmer inte helt längre. T.ex. står det fortfarande -100-+100 där det ska vara +-140. Kan du lägga till ett förtydligande på resultatsidan att "Vet ej"-svar för partier inte betyder att partiet är osäkra, utan att jag inte kunnat hitta källor till partiets stångpunkt. Avsluta med Open-prompt uppdatering och commit.

## Prompt 27

> Vänta lite... Om varje svar bara get +-1 som mest, och det är drygt 70 frågor, hur kan man hamna långt ut mot 140? Skalas svaren i efterhand?
>
> Men min avsikt är ju att om man är extrem, t.ex. mer auktoritär än SD, som ligger nära 100 på TAN, så ska man hamna utanför SD på GAL-TAN-skalan. Se till att om man svarar mer extremt än något parti åt något håll, att det faktiskt syns på resultatet.

## Prompt 28

> Men om SD hamnar långt ut ändå så är det ju skit samma. Poängen var ju att låta användare och framtida småpartier ha utrymme att röra sig utanför riksdagens kluster.
>
> Okej, vi gör såhär. Behåll alla frågor och alla partiers svar på frågor, men ta bort partiernas resulterande plats på koordinatsystemet.
>
> Sen återskalar du axlarna till +-100 eftersom det är ett mer jämnt tal, och då är man 100% höger om man hamnar längst åt höger på tavlan så att säga.
>
> Därefter återskapar du partiernas positioner på tavlan genom att simulera att varje parti kör kompassen genom att poängsätta deras svar mot frågorna, och sist skala/vikta till korrekt slutvärde med hänsyn till vet ej och slutpoäng.
>
> Bygg och starta om servern när du är klar och meddela mig.

## Prompt 29

> Försök ersätta frågor där mer än 6 partier står på "Vet ej" med frågor som de har lite mer insikt på. Några av dessa frågor borde också vara frågor där samtliga partier hamnar på en sida, såpass att användaren kan svara på frågor utanför sveriges riksdag. Ett exempel på en sån fråga som du redan har med är avkriminaliseringen och legaliseringen av cannabis.
>
> Sen får du ju därefter göra om partisvaren och deras simulering till att hamna rätt på tavlan

## Prompt 30

> Kan du omordna frågorna i testet så att alla 51 sakfrågor kommer först och sen kommer värderingsfrågorna?

## Prompt 31

> I resultatfliken hamnar man ofta ganska lågt i procentuell matchning med partier man borde ha ganska mycket gemensamt med. Jag tror detta beror på att om man väljer t.ex. 5 i en fråga där ett parti valt 4 så räknas inte det som en matchning, eller så räknas det för lite.
>
> Jag tror man skulle kunna lösa detta genom att ha en färgad stapel intill/under varje partiresultat, 0-100%, som matchar partiets färg, och som visar en ytterligare, lite avsaturerad stapel för "nästan match" i frågor där man svarat åt rätt håll men inte till samma grad som partiet, och att det övergripande procent-värdet utgår ifrån "exakt rätt+nästan rätt" och att man i stapeln istället kan se procentsatsen för exakt rätt om man hovrar/tappar stapeln.
>
> Medans vi ändå jobbar på UIt, kan du göra det tydligare att "Vet ej" är en knapp genom att ge den en liknande border som 1-5 har. Under användartester framgick det att en testare inte förstod att man kunde klicka på Vet Ej

## Prompt 32

> Uppdatera open prompts, commita och starta appen i developer läge!

## Prompt 33

> Den nuvarande kompassen innehåller 74 frågor, vilket ger en god helhetsbild av ens politiska läggning, men det kan vara jobbigt att svara på för stressade väljare.
>
> Implementera möjligheten att välja en snabbvariant av testet när man påbörjar det. Denna snabbvarianten ska inkludera enbart en bestämd delmängd av frågorna. Förslagsvis 25 stycken. När du sållar frågor, ska du prioritera att ta med frågorna som alla eller nästan alla partier har svarat på i sitt svarsunderlag, eftersom dessa frågor får anses vara extra viktiga för svensk politik och säkert även pivotala vattenbrytare i svensk politik som kan ge en effektivare bild av användarens partisympatier.
>
> Det är viktigt att vi även i det korta testet hamnar nära origo om vi väljer bara ettor eller bara femmor för att bevara frågornas samlade neutralitet. Du ska inte omformulera några frågor, utan revidera ditt urval eller lägga till extra frågor (det behöver inte vara exakt 25 frågor) för att väga upp till hyfsad balans.
>
> Avsluta med att starta om dev-servern och commita

## Prompt 34

> Grymt! Uppdatera open prompts, commita och pusha!

## Prompt 35

> Snabbtest borde inte vara rekommenderat. Håll alla val användaren ska göra så neutrala som möjligt. När du är klar, uppdatera open prompts och gör en commit

## Prompt 36

> Commita de också. Workloggen eller vad det nu heter ska vara tom

## Prompt 37

> "Frågor, vikter, scoring och framtida partibelägg ska kunna granskas i repo:t." Det här är ju lite utdaterat eftersom vi nu har partibelägg. Uppdatera sådana peketesser!

## Prompt 38

> Har vi inkluderat information om att ingen personlig data lagras på servern förutom inskickade feedback svar? om inte, inkludera ett stycke om det på Om-sidan

## Prompt 39

> I avsnittet om vem som driver sidan borde vi nämna att jag är partimedlem i Liberalerna, som en side note för transparensens skull

## Prompt 40

> I listan över anledningar i Feedback, lägg till "Jag tror att ett partis svar på en fråga är inkorrekt.
>
> Modifiera även fälten beroende på vad man väljer. Väljer man till exempel det jag bad dig lägga till ska det finnas ett fält för "Vilken fråga gäller det" som är en dropdown av alla frågor, "Vilket parti gäller det" också en dropdown, sen ett textfält för förklaring av felet, ett textfält för källa och ett textfält för övriga anmärkningar.
>
> Du kommer säkert själv på lämpliga fält för andra feedback-ämnen!
>
> Om du kommer på fler lämpliga anledningar att lägga till så gör det!
>
> Sortera även Anledningarna i en rimlig ordning. Jag tycket till exempel att "Jag hittade bias i koden" känns som fel att ha först, eftersom det är så sällan folk kommer rapportera det jämfört med andra.

## Prompt 41

> Commita detta, och granska även andra commits, fixa till Open Prompts och pusha när heal arbetsträdet är fritt

## Prompt 42

> Lägg en del tid och kraft på att sökmotor-optimisera den här hemsidan, så att folk som vill hitta en bra GAL-TAN kompass faktiskt kan hitta den här. Ge också lite krut till att förfina hemsidans metadata, såsom en flikikon, inbäddnings-thumbnail och sånt.

## Prompt 43

> Grymt! Gillar det mesta, men "Sveriges GAL-TAN-kompass" låter lite pompöst i thumbnailen. Gör den lite mer anonym, och ändra flikikonen till att matcha loggan som syns bredvid "Partikartan" på nav-fältet.

## Prompt 44

> Okej, vi skiter i någon fancy rubrik i thumbnailen. Gör istället "PARTIKARTAN" texten större, och ersätt "värderingar" med "GAL-TAN" i de små attributen

## Prompt 45

> The thumbnail doesn't seem to work when sharing the site on Facebook?

## Prompt 46

> Asså hemsidan är ju på partikarta.se, inte partikartan.se. men koden är i det här projektet så det går att kontrollera lokalt också
