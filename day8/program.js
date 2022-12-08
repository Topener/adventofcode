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

    console.log(`Part 1: ${visibleTrees}`);
    
    let scores = [];
    treeMap.forEach((row, i) => {
        row.forEach((tree, j) => {
            scores.push(calculateViewScore(treeMap, j, i));
        });
    });
    
    scores.sort((a, b) => b - a);
    
    console.log(`Part 2: ${scores[0]}`);
}

// function to rotate the grid of the map
function rotateMap(map) {
    return map[0].map((col, i) => map.map(row => row[i]));
}

function traverseRow(row, reverse = false) {
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
            row.push({
                height: parseInt(treeRow[i]), 
                visible: outsideRow || i === 0 || i === rowLength - 1 ? true : false,
                x: i,
                y: rowNum
            });
        }
        rows.push(row);
    });

    return rows;
}

function calculateViewScore(map, x, y) {
    let row = map[y];
    let col = map.map(row => row[x]);
    
    const score = [
        calculateVisibleInRow(row, x, 'right'),
        calculateVisibleInRow(row, x),
        calculateVisibleInRow(col, y, 'right'),
        calculateVisibleInRow(col, y)
    ]
    
    return score[0] * score[1] * score[2] * score[3];
}

function calculateVisibleInRow(row, from, direction = 'left') {
    let score = 0;
    
    if (direction === 'left') {
        row = row.reverse();
        from = row.length - from - 1;
    }
    
    const fromTree = row[from];
    
    const testTrees = row.slice(from+1);

    let blocked = false;
    testTrees.forEach(tree => {
        if (blocked) return;
        score ++;
        if (tree.height >= fromTree.height) {
            blocked = true;
        }
    });

    return score;
}