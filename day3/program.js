const fs = require('fs');
let items;

fs.readFile('./input.txt', 'utf-8', (e, data) => {
    items = data.split("\n");
    const result = progress(0, 0, 0);
    console.log('result!', result);
});

function progress(trees, currentRow, currentColumn) {
    const block = items[currentRow].substr(currentColumn, 1);
    if (block === '#') trees++;

    currentRow++;
    if (!items[currentRow]) return trees;
    
    currentColumn +=3;

    if (currentColumn > items[currentRow].length - 1) {
        currentColumn -= items[currentRow].length;
    }
    
    return progress(trees, currentRow, currentColumn);
}