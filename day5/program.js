export default function Day(data) {
    console.log(data);
    extractStacks(data);
}

function extractStacks(data) {
    let stacks = [];
    const numStacks = Math.ceil(data[0].length / 4);
    
    for (let i = 0; i < numStacks; i++) {
        stacks.push([]);
    }

    const containerRows = [];
    // use a while loop to loop through data until a row has a 1 on position 2 in the string
    let i = 0;
    while (i < data.length) {
        if (data[i][1] === '1') {
            break;
        }
        containerRows.push(data[i]);    
        i++;
    }

    containerRows.forEach(row => {
        const parts = row.split(' ');
        let pos = 0;
        parts.forEach((part, i) => {
            if (part === '') return pos++;
            if (part.substr(0,1) === '[') pos += 4;
            console.log(pos, part);
            const stackNum = pos/4-1;
            stacks[stackNum].unshift(part);
        });
    });
    console.log(stacks);
}