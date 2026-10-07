Hvad laver programmet? 

Beskriv kort serveren. 

Serveren fungerer som en simpel read/write server, den har meget få regler og checker kun for om brugeren har skrevet noget eller ej.

Serveren består af 3 GET endpoints og 1 POST endpoint.

Serveren logger ved brug af Event Emitter når dens endpoints bliver anvendt med et timestamp i filen requests.log.

Serveren kan kun skrive og læse fra den samme fil.

Serveren har en meget simpel fejlhåndtering som foregår i dens endpoints.

Endpoints 

programmer har 4 endpoints, hvilket henholdsvis er get(/), get(/readfile), get(/writefile) og post(/writefile). get(/) har kun til funktion at håndterer at nogen går ind på hjemmesiden uden at angive, hvor på hjemmesiden. get(/readfile) har til funktion at fremvise dataen fra filen til brugeren på hjemmesiden. get(/writefile) har til funktion at sende html koden til siden. post(/writefile) har til funktion at modtage nyt data fra brugeren, som så nedskrives på en txt fil.   


 

Asynkronitet 

Forklar med egne ord: 

Hvad sker der i Node.js, mens serveren venter på en filoperation? 

når man kalder en async funktion så sker der det at selve flowet fortsætter imens the async funktion læser filen og sender svaret tilbage til funktionen i et callback que. grunden til at man gør det på denne måde er fordi at det tillader at programmet kan stadig tage imod nye kald imens async funktion stadig læser i forhold til når man bruger en sync funktion hvor hele tråden bliver læst indtil funktionen har modtaget resultatet.


 

EventEmitter 

Forklar: 
Vores EventEmitter tjekker når der bliver sendt et request fra brugeren. Dette request bliver gemt med serverens dato samt tidspunkt, i tekstfilen requests.log.

Hvilket event bruger I, og hvornår bliver det udsendt? 

 vi benytter os af en request event, som bliver sendt ud når brugeren endten vil se noget i applicationen eller skrive noget til applicationen.

Test

Vi testet en ting ad gangen med at prøve at få projektet til at give et best case scenario, vi startede med server start, hvad sker der når et endpoint ikke eksisterer og hvad sker der sker når et gør.
Videre til “readfile”, hvor vi så har testet hvad der sker der når filen ikke kan findes og om den smider en ordentlig error og sender en besked til klienten, hvad sker der når en fil kan læses.
Vi anvendte en testmetode og en test .txt som er slettet fra programmet efter den ikke skulle bruges mere.

Vi har testet skrive både med hvad sker der når den ikke kan finde filen den skal skrive til, hvad sker der når en bruger ikke indsender noget, hvad sker der når brugeren sender noget og den kan finde filen.

Så sluttede vi af med Event Emitter, hvor vi testede alle de tidligere ting.


AI-brug 

Vi har anvendt AI til at reviewe vores projekt.

Agenten har pointeret et par steder i koden, hvor der var fejl og bad om rettelse på de punkter.

Vi har ikke ladet agenten kode og har været specifikke med hvad den ikke måtte med hver prompt.

Agenten har fået en plan.md fil som den måtte sætte kode eksempler og forklaringer i. 

Vi har indtil videre anvendt agenten fejlrettelser af koden.
Efter implementeringen har ændringerne medført, at vi nu logger dobblet, hvor vi ikke gjorde før.

Afslutning 

Den vigtigste forskel mellem den måde, vi håndterede samtidighed på i vores Java-server, og den måde Node.js-serveren arbejder på, er …  
I en Java-server brugte vi multithreading på serveren, så hver klient som kom på serveren havde deres eget Thread.

Hvor i en Node-js server kan vi kun anvende en tråd, man bruger async til at udføre funktioner som write/read mens vi stadig kan tage imod inputs så hele serveren ikke står stille og venter imellem opgaver.
