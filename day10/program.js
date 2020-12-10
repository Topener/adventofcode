const fs = require('fs');

const data  = fs.readFileSync('./input.txt', 'utf-8');
let adapters = data.split("\n");

adapters.forEach((a, i) => {
    adapters[i] = parseInt(a);
});

findAdapterJumps(adapters);


function findAdapterJumps(items) {
    items.sort((a,b) => { return a > b ? 1 : -1});
    
    let jump1 = 0;
    let jump3 = 1;
    let currentCharge = 0;
    
    items.forEach(i => {
        if (i - currentCharge === 1) jump1++;
        if (i - currentCharge === 3) jump3++;
        currentCharge = i;
    });

    console.log(jump1, jump3, 'answer part 1: ', jump1 * jump3);
}