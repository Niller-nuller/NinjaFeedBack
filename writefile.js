const path = require('node:path');
const fs = require('node:fs');



async function writeToSpecificFile(data){
    try{

        fs.appendFileSync(path.join(__dirname, '/data/defaultwrite.txt'), `${data}\n`);

    } catch(err){
        throw err;
    }
}

module.exports = {
    writeToSpecificFile
}