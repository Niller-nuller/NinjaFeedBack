const EventEmitter = require('events');
const fs = require('fs');
const path = require('node:path');

const logger = new EventEmitter();

const Logging = fs.createWriteStream(path.join(__dirname, 'request.log'), {flags: 'a'});

async function write(line) {
    const date = new Date();
    const full = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}-${line}`;
    console.log(full);
    Logging.write(full + '\n');
}

logger.on('request', write);
logger.on('finish', write);

module.exports = logger;