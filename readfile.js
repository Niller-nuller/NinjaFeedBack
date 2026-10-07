const path = require('node:path');
const fs = require('node:fs/promises');
const readFilePath = path.join(__dirname, '/data/defaultwrite.txt');

async function readFromFile() {
    return fs.readFile(readFilePath, 'utf8');

}
module.exports =  {
    readFromFile
}