const fs = require('fs');
const axios = require('axios');

function cat(path){
    if (determineURL(path)){
        webCat(path)
    }
    else{
        trueCat(path)
    }
}

function trueCat(val){
    fs.readFile(val, 'utf8', (err, data) => {
        if(err){
            console.log(`Error reading ${val}:`)
            console.log(err);
            process.kill(1)
        }
        console.log(data)
    })
}

function webCat(url){
    axios
        .get(url)
        .then((response) => {console.log(response)})
        .catch((err) => {
            console.log(`Error fetching ${url}`)
            console.log(err)
        })
}

function determineURL(arg){
    if (arg.includes('http') || arg.includes('.com')){
        return true
    }
    return false
}

cat(process.argv[2]);