const { exec } = require('child_process');
const fs = require('fs');

const data  = fs.readFileSync('./input.txt', 'utf-8');
const readData = data.split("\n");
execute(readData, true);

readData.forEach((l, i) => {
    const copy = JSON.parse(JSON.stringify(readData));

    if (l.indexOf('nop') > -1) {
        copy[i] = l.replace('nop','jmp');
    } else if (l.indexOf('jmp') > -1) {
        copy[i] = l.replace('jmp','nop');
    }

    execute(copy);
});


function execute(instructions, outputDeadEnd) {
    const lines = [];
    let acc = 0;
    let line = 0;
    let executedLines = []; 

    instructions.forEach(i => {
        lines.push(splitInstruction(i));
    });

    run();

    function splitInstruction(instruction) {
        const parts = instruction.split(' ');
        const type = parts[0];
        const amount = parts[1].indexOf('+') > -1 ? parseInt(parts[1].substr(1)) : parseInt(parts[1]);
        return {type: type, amount: amount};
    }

    function run() {
        if (executedLines.indexOf(line) > -1) {
            if (outputDeadEnd) {
                console.log('Part 1', acc);
            }
            return;
        }

        const instrcution = lines[line];
        executedLines.push(line);

        if (instrcution.type === 'acc') {
            acc += instrcution.amount;
            line++;
        } else if (instrcution.type === 'nop') {
            line++;
        } else if (instrcution.type === 'jmp') {
            line += instrcution.amount;
        }

        if (instructions[line]) return run();
        console.log('Part 2: ', acc);
    }
}