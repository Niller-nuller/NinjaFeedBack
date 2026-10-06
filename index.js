const express = require('express');
const path = require('node:path');
const app = express();
const logger = require('./EventEmitter.js');
const {readFromFile} = require("./readfile");
const {writeToSpecificFile} = require("./writefile");


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
        const dataToSend = await readFromFile();
        res.status(200).send(dataToSend);
    } catch (err) {
        res.status(500).send({error: 'Could not read file test'});
        console.log(err)
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

app.listen(3000, () => {
    console.log('serveren kører på http://localhost:3000');
});
