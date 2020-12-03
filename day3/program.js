const fs = require('fs');
let items;

fs.readFile('./input.txt', 'utf-8', (e, data) => {
    items = data.split("\n");
    const resultPart1 = progress(0, 0, 0, [3,1]);
    const resultPart2 = checkPart2();

    console.log('result!', resultPart1, resultPart2);
});

function checkPart2() {
    const oneone = progress(0, 0, 0, [1,1]);
    const threeone = progress(0, 0, 0, [3,1]);
    const fiveone = progress(0, 0, 0, [5,1]);
    const sevenone = progress(0, 0, 0, [7,1]);
    const onetwo = progress(0, 0, 0, [1,2]);
    return oneone*threeone*fiveone*sevenone*onetwo;
}

function progress(trees, currentRow, currentColumn, nextStep) {
    const block = items[currentRow].substr(currentColumn, 1);
    if (block === '#') trees++;

    currentRow += nextStep[1];
    if (!items[currentRow]) return trees;
    
    currentColumn += nextStep[0];

    if (currentColumn > items[currentRow].length - 1) {
        currentColumn -= items[currentRow].length;
    }
    
    return progress(trees, currentRow, currentColumn, nextStep);
}