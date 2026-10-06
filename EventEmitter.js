const EventEmitter = require('events');
const fs = require('fs');


class RequestLogger extends EventEmitter {}
const logger = new EventEmitter();

const Logging = fs.createWriteStream('requests.log', {flags: 'a'});

async function write(line) {
    const date = new Date();
    const full = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}-${line}`;
    console.log(full);
    Logging.write(full + '\n');
}

logger.on('request', write);
logger.on('response', write);

module.exports = logger;