const fs = require('fs');

const directoryPath = __dirname;




function reading(){
    fs.readFile(directoryPath+'/file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    else{
        let s = data;
        let n = s.length;
        let content = "";
        for(let i=0;i<n-1;i++){
            if(s[i]==' ' && s[i+1]==' '){
                continue;
            }
            else{
                content+=s[i];
            }
        }
        fs.writeFile(directoryPath+'/file.txt', content, 'utf8', (err) => {
            if (err) {
            console.error('Error writing file:', err);
            return;
            }

            console.log('File written');
        });
    }
    });
}

reading();