export default function Day(data) {
    let treeMap = convertTreesToMap(data);

    treeMap.forEach(row => {
        traverseRow(traverseRow(row), true);
    });

    let rotatedMap = rotateMap(treeMap);
    rotatedMap.forEach(row => {
        traverseRow(traverseRow(row), true);
    });

    // count number of visible trees
    let visibleTrees = 0;
    treeMap.forEach(row => {
        row.forEach(tree => {
            if (tree.visible) {
                visibleTrees++;
            }
        });
    });

    console.log({visibleTrees});
}

// function to rotate the grid of the map
function rotateMap(map) {
    return map[0].map((col, i) => map.map(row => row[i]));
}

function traverseRow(row, reverse = false) {
    let visibleTree = true;

    let from = reverse ? row.length - 1 : 0;
    let to  = reverse ? 0 : row.length - 1;
    let step = reverse ? -1 : 1;
    let tallestTree = 0;

    for (let i = from; i !== to; i += step) {
        
        if (row[i].height > tallestTree) {
            tallestTree = row[i].height;
        }

        if (row[i+step].height > tallestTree) {
            row[i+step].visible = true;
        }
    }

    return row;
}

function convertTreesToMap(trees) {
    let rows = [];

    trees.forEach((treeRow, rowNum) => {
        let row = [];

        let outsideRow = rowNum === 0 || rowNum === trees.length - 1;
        let rowLength = treeRow.length;

        for (let i = 0; i < treeRow.length; i++) {
            row.push({height: parseInt(treeRow[i]), visible: outsideRow || i === 0 || i === rowLength - 1 ? true : false});
        }
        rows.push(row);
    });

    return rows;
}