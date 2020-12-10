const fs = require('fs');

const data  = fs.readFileSync('./input.txt', 'utf-8');
let adapters = data.split("\n");

adapters.forEach((a, i) => {
    adapters[i] = parseInt(a);
});

adapters.sort((a,b) => { return a > b ? 1 : -1});
findAdapterJumps(adapters);
calculateArrangements(adapters);

function findAdapterJumps(items) {
    let jump1 = 0;
    let jump3 = 1;
    let currentCharge = 0;
    
    items.forEach(i => {
        if (i - currentCharge === 1) jump1++;
        else if (i - currentCharge === 3) jump3++;
        currentCharge = i;
    });

    console.log(jump1, jump3, 'answer part 1: ', jump1 * jump3);
}

function calculateArrangements(items) {
    let sequenceLength = 1;
    let lastNum = 0;

    let multi = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    }

    items.forEach(item => {
        if (item - lastNum === 1) sequenceLength++;
        else {
            multi[sequenceLength]++;
            sequenceLength = 1;
        }
        lastNum = item;
    });
    multi[sequenceLength]++;

    // 2,4 & 7 are hardcoded. Calculation is on todo here
    let res = Math.pow(2,multi[3])*Math.pow(4,multi[4])*Math.pow(7,multi[5]);
    console.log('part 2', res);
}