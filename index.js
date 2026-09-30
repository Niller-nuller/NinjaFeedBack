const fs = require('node:fs');

const express = require('express');
const path = require('node:path');
const app = express();
const logger = require('./EventEmitter.js');

const readFilePath = path.join(__dirname, '/data/defaultwrite.txt');

app.use(express.urlencoded({extended: true}));

app.use((req,res,next)=>{
    logger.emit('request', `${req.method} ${req.url}`);

    res.on('finish', () => {
        logger.emit('finish', `${req.method} ${req.url}`);
    });
    next();
});

app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

app.get('/readfile', async (req, res) => {
    try {
        const indhold = await fs.readFile('/data/default.json', "utf-8")
        res.status(200).type('text/plain: charset=utf=8').send(indhold)
    } catch (err) {
        console.err('failed to read file', err);
        res.status(500).type('text/plain: charset=utf=8').send('serverfejl');
    }
});
app.get('/writefile', async (req, res) => {
    try {

        res.status(200).sendFile(path.join(__dirname, './http/writefile.html'));

    } catch (error) {
        console.error(error);
        res.status(500).send({error: 'Could not reach webpage'});
    }
});
app.post('/writefile/:filename', (req, res) => {
    const jsonInput = req.body.jsonInput;
    console.log(jsonInput);
    //try {
       // writeToFile(req.params.filename).then(r =>
          //  res.status(200).send('written to file')
       // );


    //} catch(err) {
        //error handeling
   // }

});

app.post('/writefile', async (req, res) => {
    try{
        const jsonInput = req.body.jsonInput;
        if(!jsonInput){
            res.status(200).send('You cannot send nothing');
        }
        await writeToSpecificFile(jsonInput);
        res.status(200).send('Message saved');

    } catch (err) {
        res.status(500).send({error: 'Could not read user input'});
    }

});

app.get('/readfiletest', async (req, res) => {
    try{
        res.status(200).sendFile(readFilePath);
    } catch(err) {
        res.status(500).send({error: 'Could not read file test'});
        console.log(err)
    }
});
async function writeToSpecificFile(data){
    try{

        fs.appendFileSync(path.join(__dirname, '/data/defaultwrite.txt'), `${data}\n`);

    } catch(err){
        throw err;
    }
}
async function writeToFile(filename) {
    fs.readFile('./' + filename, 'utf8', (err, data) => {
        if (err) {
            return console.error('error 500 file not found');
        }
    });
    await fs.writeFile('/' + filename, thingsToWrite, 'utf8', (err) => {
        if (err) {
            return console.error('error 500 file not found');
        }
    });
}
app.listen(3000, () => {
    console.log('serveren kører på http://localhost:3000');
});
