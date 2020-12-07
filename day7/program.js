const fs = require('fs');

const data  = fs.readFileSync('./input.txt', 'utf-8');
const rules = data.split("\n");

const allBags = extractRules(rules);
let matches = 0;

for (color in allBags) {
    if(willContainColor(allBags[color], 'shiny gold', {})) {
        matches++;
    }
};

console.log('bags that eventually contain a shiny gold bag', matches);

const nestedBags = howManyNestedBags('shiny gold');
console.log(`We got ${nestedBags} bags nested in shiny gold`);

function extractRules(rules) {
    let bagtypes = {};
    rules.forEach(rule => {
        const parts = rule.split(' contain ');
        parts[1] = parts[1].replace('.','');
        parts[0] = parts[0].replace(' bags', '');

        const nestedBags = parts[1].split(', ');
        bagtypes[parts[0]] = {};
        nestedBags.forEach(bag => {
            let count = bag.substr(0,bag.indexOf(' '));
            if (count === 'no') count = 0;
            count = parseInt(count);
            const bagType = bag.substr(bag.indexOf(' ')+1);
            let subBagType = bagType.replace(' bags', '').replace(' bag', '');
            bagtypes[parts[0]][subBagType] = count;
            
        });
    });

    return bagtypes;
}

function willContainColor(bags, color, matched) {
    for (subColor in bags) {
        if (color === subColor) {   
            return true;
        }
        
        if (!matched.hasOwnProperty(subColor) && bags.hasOwnProperty(subColor)) {
            matched[subColor] = true;
            if (willContainColor(allBags[subColor], color, matched)) {
                return true;
            }
        }
        
    }
}

function howManyNestedBags(color) {
    let bagCount = 0;

    for (subColor in allBags[color]) {
        if (subColor !== 'other') {
            bagCount += allBags[color][subColor];
            const subColorCount = allBags[color][subColor];
            let subCount = howManyNestedBags(subColor);
            if (subCount > 0) {
                
                subCount = subCount * subColorCount;
                bagCount += subCount;
            }
        }
    }
    return bagCount;
}