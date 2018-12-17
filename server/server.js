const path = require('path');
const fs = require('fs');
const request = require('request');
const Chirp = require('./shared/chirp');

console.log("Hello World!!!");

let chirpJSONPath = path.join(__dirname, '../chirps.json');
let chirpObjectArray = [];


// Creating test chirp array
for (let i = 0; i < 5; i++) {
    let keyPrefix = "testchirp";
    let textPrefix = "Test Chirp #: "
    let chirpObject = new Chirp(
        (keyPrefix + String(i)),
        'Austin',
        'default',
        (textPrefix + String(i)),
        null,
        null,
        null
    )
    chirpObjectArray.push(chirpObject);
}

// Writing chirp array to the JSON file
chirpObjectArray.forEach(item => {
    fs.appendFileSync(chirpJSONPath, (JSON.stringify(item) + '\r\n'), 'utf8');
});

// Reading the chirp JSON file and console logging it
output = fs.readFileSync(chirpJSONPath, {encoding: 'utf8'});
console.log(output);

