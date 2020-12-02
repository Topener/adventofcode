const fs = require('fs');

function split(item) {
    let parts = item.split(" ");
    if (parts.length < 2) return false;
    parts[0] = parts[0].split('-');

    parts[0][0] = parseInt(parts[0][0]);
    parts[0][1] = parseInt(parts[0][1]);
    return parts;
}

function isValidPart1(item) {
    const parts = split(item);
    if (!parts) return;
    
    const char = parts[1].substr(0,1);
    const regex = new RegExp(char, 'g');
    const matches = parts[2].match(regex);

    if (matches && matches.length >= parts[0][0] && matches.length <= parts[0][1]) {
        return true;
    } else {
        return false;
    }
}

function parseItems(input) {
    let validItems1 = 0;
    
    input.forEach(item => {
        if (isValidPart1(item)) {
            validItems1++;
        }
    });

    console.log('part 1: found valid items: ', validItems1);
}


fs.readFile('./day2input.txt', 'utf-8', (e, data) =>{
    const items = data.split("\n");

    const pws = parseItems(items);
})