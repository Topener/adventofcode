export default function Day(data) {
    const {stacks, instructions} = extractStacks(data);
    console.log(stacks);
}

function extractStacks(data) {
    let stacks = [];
    const numStacks = Math.ceil(data[0].length / 4);
    
    for (let i = 0; i < numStacks; i++) {
        stacks.push([]);
    }

    const containerRows = [];
    const instructions = [];
    let status = 'containers';
    for (let i = 0; i < data.length; i++) {
        if (data[i][1] === '1') {
            status = 'split';
        }
        if (data[i][0] === 'm') {
            status = 'instructions'
        }
        if (status === 'containers') {
            containerRows.push(data[i]);
        } else if (status === 'instructions') {
            instructions.push(data[i]);
        }
    };

    containerRows.forEach(row => {
        const parts = row.split(' ');
        let pos = 0;
        parts.forEach((part, i) => {
            if (part === '') return pos++;
            if (part.substr(0,1) === '[') pos += 4;
            const stackNum = pos/4-1;
            stacks[stackNum].unshift(part);
        });
    });
    return {stacks, instructions};
}