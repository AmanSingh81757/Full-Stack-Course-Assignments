const fs = require('fs');

const directoryPath = __dirname;

fs.readFile(directoryPath+'/file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  console.log('File contents:', data);
});

function calculateTime(n) {
    let start = new Date;
    let ans = 0;
    for(let i=0;i<=n;i++){
        ans+=i;
    }
    console.log(ans);
    let end = new Date;
    console.log((end-start)/1000);
}


calculateTime(10000000000); //====> 0.747
