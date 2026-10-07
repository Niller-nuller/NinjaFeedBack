# Plan for rettelser

## Afgrænsning

Dette dokument beskriver de foreslåede kodeændringer. Selve programfilerne skal ikke ændres som en del af denne opgave.

## 1. Log afslutning af response

`index.js` udsender allerede `request` og `finish`. I `EventEmitter.js` skal loggeren lytte efter de samme event-navne. Skift `response`-listeneren til `finish`:

```js
logger.on('request', write);
logger.on('finish', write);
```

Dermed bliver både request-start og afslutningen af svaret skrevet i loggen. `index.js` behøver ingen ændring for dette.

## 2. Ret dagnummer og tidsstempel

I `EventEmitter.js` returnerer `getDay()` ugedagen (0-6), ikke datoen i måneden. Brug `getDate()`. For et entydigt og stabilt format kan tidsstemplet bygges sådan:

```js
const timestamp = date.toISOString();
const full = `${timestamp}-${line}`;
```

ISO-formatet indeholder dato og klokkeslæt i UTC. Hvis loggen i stedet skal bruge lokal tid, behold de lokale dato-/tidsmetoder, men brug `getDate()` til dagnummeret.

## 3. Brug ikke-blokerende filoperationer

I `readfile.js` bruges `fs.readFile`, men uden callback. Den funktion returnerer ikke en Promise, så den nuværende `await readFromFile()` giver ikke læseresultatet som forventet. Brug `node:fs/promises`:

```js
const path = require('node:path');
const fs = require('node:fs/promises');

const readFilePath = path.join(__dirname, 'data', 'defaultwrite.txt');

async function readFromFile() {
    return fs.readFile(readFilePath, 'utf8');
}
```

I `writefile.js` erstattes den synkrone `appendFileSync` med den asynkrone Promise-version:

```js
const path = require('node:path');
const fs = require('node:fs/promises');

async function writeToSpecificFile(data) {
    const filePath = path.join(__dirname, 'data', 'defaultwrite.txt');
    await fs.appendFile(filePath, `${data}\n`);
}
```

Fejl fra filoperationerne skal fortsat afvises, så de eksisterende `try/catch`-blokke i `index.js` kan returnere en fejlstatus. En ekstra `try/catch` der kun genkaster fejlen er ikke nødvendig.

## 4. Brug en fast placering til logfilen

I `EventEmitter.js` skal stien ikke afhænge af processens aktuelle arbejdsmappe. Opret streamen med en sti baseret på filens mappe:

```js
const Logging = fs.createWriteStream(path.join(__dirname, 'requests.log'), {
    flags: 'a'
});
```

Dette forudsætter, at `node:path` fortsat importeres i filen.

## 5. Fjern ubrugt loggerklasse, eller tag den i brug

Den enkleste løsning er at fjerne `RequestLogger`, da den ikke tilføjer funktionalitet, og beholde:

```js
const logger = new EventEmitter();
```

Alternativt kan `RequestLogger`-instansen bruges i stedet for `new EventEmitter()`. Vælg kun én af løsningerne for at undgå dead code.

## Foreslået rækkefølge

1. Opdatér `EventEmitter.js`: listeners, dato/tidsstempel, logfilsti og loggerklasse.
2. Opdatér `readfile.js` og `writefile.js` til `node:fs/promises`.
3. Kontrollér at `index.js` fortsat udsender de events, loggeren lytter efter (`request` og `finish`).
4. Test `/readfile` og `/writefile`, og kontrollér at begge logevents skrives til den forventede logfil.