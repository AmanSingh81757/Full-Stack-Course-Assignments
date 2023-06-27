const fs = require('fs');

const directoryPath = __dirname;
const content = ' I trap until the bloody bottoms is underneath';


fs.appendFile(directoryPath+'/file.txt',content, 'utf8', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }

  console.log('File written');
});

