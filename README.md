Hvad laver programmet? 

Beskriv kort serveren. 

 

Endpoints 

Metode 

Endpoint 

Funktion 

GET 

/read-file 

Læser fil 

POST 

/write-file 

Skriver til fil 

 

Asynkronitet 

Forklar med egne ord: 

Hvad sker der i Node.js, mens serveren venter på en filoperation? 

 

EventEmitter 

Forklar: 

Hvilket event bruger I, og hvornår bliver det udsendt? 

 

Test

Vi tested en ting afgangen med at prøve at få projektet til at give en best case secnario, vi startede med server start, hvad sker der når et endpoint ikke eskistere og hvad sker der når et gør.
Også videre til readfile, hvor vi så har tested hvad sker der når filen ikke kan findes og om den smider en ordenligt error og sender en besked til klienten, hvad sker der når en fil kan læses.
Vi anvdente en test metode og en test txt som er slettet fra programmet efter den ikke skulle bruges mere.

Vi har tested write både med hvad sker der når den ikke kan finde filen den skal write til, hvad sker der når en bruger ikke indsender noget, hvad sker der når brugeren sender noget og den kan finde filen.

Så sluttede vi af med Event Emitter, hvor vi testede alle de tidligere ting.


AI-brug 

Beskriv ét konkret eksempel: 

Hvad bad I agenten om?

Hvad foreslog eller ændrede agenten?

Hvad kontrollerede I?

Accepterede, ændrede eller afviste I forslaget?

I behøver ikke dokumentere alle prompts. 

 

Individuelt checkpoint 

Alle gruppemedlemmer skal kunne forklare: 

Hvor anvendes async/await?

Hvad sker der ved await?

Hvor håndteres fejl?

Hvordan fungerer jeres EventEmitter?

Hvad sker der, når flere requests kommer tæt efter hinanden?

Hvad har AI-agenten bidraget med?

Hvordan kontrollerede I agentens ændringer?

Et tilfældigt gruppemedlem skal kunne demonstrere både et succes- og et fejlforløb. 

Udvidelser 

Når minimumskravene virker, kan I fx tilføje: 

timestamp til loggen

persistent logging til en fil

statistik over antal requests

flere filer

flere endpoints

validering af input

Udvidelser kommer efter, at kernekravene er testet. 

 

Afslutning 

Afslut jeres README med sætningen: 

Den vigtigste forskel mellem den måde, vi håndterede samtidighed på i vores Java-server, og den måde Node.js-serveren arbejder på, er … 
