const fs = require('fs');

function isValid(item) {
    const parts = item.split(" ");
    if (parts.length < 2) return false;
    const minMax = parts[0].split('-');

    minMax[0] = parseInt(minMax[0]);
    minMax[1] = parseInt(minMax[1]);

    const char = parts[1].substr(0,1);
    const pw = parts[2];  
    const regex = new RegExp(char, 'g');
    const matches = pw.match(regex);
    if (matches && matches.length >= minMax[0] && matches.length <= minMax[1]) {
        return true;
    } else {
        return false;
    }
}

function parseItems(input) {
    let validItems = 0;
    
    input.forEach(item => {
        if (isValid(item)) {
            validItems++;
        }
    });

    console.log('found valid items: ', validItems);
}


fs.readFile('./day2input.txt', 'utf-8', (e, data) =>{
    const items = data.split("\n");

    const pws = parseItems(items);
})