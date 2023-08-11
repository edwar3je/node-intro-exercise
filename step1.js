const fs = require('fs');

function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log(`Error reading ${path}:`)
            console.log(`Error: ENOENT: no such file or directory, open ${path}`);
            process.kill(1)
        }
        console.log(data)
    })
}

cat(process.argv[2]);