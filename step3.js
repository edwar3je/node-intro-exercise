const fs = require('fs');
const axios = require('axios');

// Full "cat" function
function cat(path){
    if (determineExtraArg(path)){
        if (determineURL(process.argv[4])){
            webCatWrite(process.argv[3], process.argv[4])
        }
        else{
            catWrite(process.argv[3], process.argv[4])
        }
    }
    else {
        if (determineURL(path)){
            webCat(path)
        }
        else{
            trueCat(path)
        }
    } 
}

// Uses function of cat but with a different name (only reads files)
function trueCat(val){
    fs.readFile(val, 'utf8', (err, data) => {
        if(err){
            console.log(`Error reading ${val}:`);
            console.log(err);
            process.kill(1)
        }
        console.log(data)
    })
}

function catWrite(path, data){
    fs.readFile(data, 'utf8', (err, step) => {
        if (err){
            console.log(`Error reading ${val}:`);
            console.log(err);
            process.kill(1)
        }
        writeTheRest(path, step, data);
    })
}

function writeTheRest(path, data, name){
    fs.writeFile(path, data, 'utf8', function(err){
        if (err){
            console.log(`Couldn't write ${path}:`)
            console.error(err);
            process.exit(1);
        }
        console.log(`no output, but ${path} contains contents of ${name}`)
    })
}

// Only reads HTML from url links
function webCat(url){
    axios
        .get(url)
        .then((response) => {console.log(response)})
        .catch((err) => {
            console.log(`Error fetching ${url}`)
            console.log(err)
        })
}

// Writes the HTML for a webpage on a file (if the relative path is correct)
async function webCatWrite(path, url){
    let response = await axios.get(url);
    let data = response.data;
    fs.writeFile(path, data, 'utf8', async function(err){
        if (err){
            console.log(`Couldn't write ${path}:`);
            console.error(err);
            process.exit(1);
        }
        console.log(`no output, but ${path} contains contents of ${url}'s HTML`)
    })
}

// Boolean that determines if a given string is a url
function determineURL(arg){
    if (arg.includes('http') || arg.includes('.com')){
        return true
    }
    return false
}

// Boolean that determines if the user is attempting to use "write" functions
function determineExtraArg(arg){
    if (arg == "--out"){
        return true
    }
    return false
}

// function that executes upon starting the file with Node.js
cat(process.argv[2]);