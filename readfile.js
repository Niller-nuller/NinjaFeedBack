const path = require('node:path');
const fs = require('node:fs');
const readFilePath = path.join(__dirname, '/data/defaultwrite.txt');
async function readFromFile() {
    let files = fs.readFileSync(readFilePath, 'utf8');
    return files;
}
module.exports =  {
    readFromFile
}