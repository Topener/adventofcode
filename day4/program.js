const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (e, data) => {
    const items = data.split("\n");
    const rawPassports = findPassports(items);
    const passports = splitPassportData(rawPassports);
    
    let validPassports = 0;
    passports.forEach(p => {
        if (validatePassport(p)) {
            validPassports++;
        }
    });

    console.log(`Found ${validPassports} valid passports`);

});

function findPassports(data) {
    const passports = [];
    let passportdata = [];
    data.forEach((row) => {
        if (row.length === 0 && passportdata.length > 0) {
            passports.push(passportdata);
            passportdata = [];
        } else {
            passportdata.push(row);
        }
    });

    return passports;
}

function splitPassportData(raw) {
    const passports = [];
    raw.forEach(p => {
        let passport = {};
        p.forEach(row => {
            const parts = row.split(' ');
            parts.forEach(part => {
                let split = part.split(':');
                passport[split[0]] = split[1]
            })
        });
        passports.push(passport);
    });
    return passports;
}

function validatePassport(passport) {
    if (Object.keys(passport).length === 8) {
        return true;
    }

    if (Object.keys(passport).length === 7 && !passport.hasOwnProperty('cid')) {
        return true;
    }

    return false;
} 