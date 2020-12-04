const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (e, data) => {
    const items = data.split("\n");
    const rawPassports = findPassports(items);
    const passportsCheck1 = splitPassportData(rawPassports);

    const toValidatePart2 = [];
    
    passportsCheck1.forEach((p, i) => {
        if (validatePassport(p)) {
            toValidatePart2.push(p);
        }
    });
    
    console.log(`Part1: Found ${toValidatePart2.length} valid passports`);
    
    let validPassports = 0;

    toValidatePart2.forEach((p, i) => {
        if (validatePassportProperties(p)){
            validPassports++;
        }
    });

    console.log(`Part2: Found ${validPassports} valid passports`);

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
                if (split[0] === 'byr' || split[0] === 'iyr' || split[0] === 'eyr' ) split[1] = parseInt(split[1]);

                passport[split[0]] = split[1];
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

function validatePassportProperties(passport) {
    if (passport.byr > 2002 || passport.byr < 1920) return false;
    if (passport.iyr > 2020 || passport.iyr < 2010) return false;
    if (passport.eyr > 2030 || passport.eyr < 2020) return false;
    if (!validateHeight(passport.hgt)) return false;
    if (!passport.hcl.match(/#[0-9a-f]{6}/)) return false;
    if (['amb','blu','brn','gry','grn','hzl','oth'].indexOf(passport.ecl) === -1) return false;
    if (passport.pid.length != 9 || !passport.pid.match(/[0-9]{9}/)) return false;
    return true;
}

function validateHeight(height) {
    let replace = height.indexOf('in') > -1 ? 'in' : 'cm';
    height.replace(replace,'');
    height = parseInt(height);
    if (replace === 'in' && (height > 76 || height < 59)) return false;
    if (replace === 'cm' && (height > 193 || height < 150)) return false;
    return true;
}