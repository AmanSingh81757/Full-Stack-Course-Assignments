const fs = require('fs');

const directoryPath = __dirname;

function reading(){
    fs.readFile(directoryPath+'/file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    return data;
    });
}


let s = reading();
console.log(s);