const EventEmitter = require('events');
const fs = require('fs');


class RequestLogger extends EventEmitter {}
const logger = new EventEmitter();

const Logging = fs.createWriteStream('requests.log', {flags: 'a'});

async function write(line) {
    const full = `${new Date().toISOString()}-${line}`;
    console.log(full);
    Logging.write(full + '\n');
}

logger.on('request', write);
logger.on('response', write);

module.exports = logger;