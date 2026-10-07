const path = require('node:path');
const fs = require('node:fs/promises');



async function writeToSpecificFile(data){
    try{
        const filePath = path.join(__dirname, '/data/defaultwrite.txt');
        await fs.appendFile(filePath, `${data}\n`);

    } catch(err){
        throw err;
    }
}

module.exports = {
    writeToSpecificFile
}