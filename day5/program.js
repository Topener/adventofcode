export default function Day(data) {
    runPart1(data);
    runPart2(data);
}

function runPart1(data) {
    const { stacks, instructions } = extractStacks(data);
    executeInstructions(stacks, instructions);
    console.log(`part 1: ${topOfStacks(stacks)}`);
}

function runPart2(data) {
    // part 2
    const { stacks, instructions } = extractStacks(data);
    executeTrueInstructions(stacks, instructions);
    console.log(`part 2: ${topOfStacks(stacks)}`);
}

function topOfStacks(stacks) {
    let solutionString = "";
    stacks.forEach((stack) => {
        solutionString += stack[stack.length - 1].substr(1, 1);
    });

    return solutionString;
}

function extractInstruction(row) {
    const instruction = row.split(" ");
    const amount = parseInt(instruction[1]);
    const fromStack = parseInt(instruction[3]) - 1;
    const toStack = parseInt(instruction[5]) - 1;

    return { amount, fromStack, toStack };
}

function executeInstructions(stacks, instructions) {
    instructions.forEach((row) => {
        const { amount, fromStack, toStack } = extractInstruction(row);
        for (let i = 0; i < amount; i++) {
            stacks[toStack].push(stacks[fromStack].pop());
        }
    });
}

function executeTrueInstructions(stacks, instructions) {
    instructions.forEach((row) => {
        const { amount, fromStack, toStack } = extractInstruction(row);
        const remove = stacks[fromStack].splice(stacks[fromStack].length - amount, amount);
        stacks[toStack] = stacks[toStack].concat(remove);
    });
}

function extractStacks(data) {
    let stacks = [];
    const numStacks = Math.ceil(data[0].length / 4);

    for (let i = 0; i < numStacks; i++) {
        stacks.push([]);
    }

    const containerRows = [];
    const instructions = [];
    let status = "containers";
    for (let i = 0; i < data.length; i++) {
        if (data[i][1] === "1") {
            status = "split";
        }
        if (data[i][0] === "m") {
            status = "instructions";
        }
        if (status === "containers") {
            containerRows.push(data[i]);
        } else if (status === "instructions") {
            instructions.push(data[i]);
        }
    }

    containerRows.forEach((row) => {
        const parts = row.split(" ");
        let pos = 0;
        parts.forEach((part, i) => {
            if (part === "") return pos++;
            if (part.substr(0, 1) === "[") pos += 4;
            const stackNum = pos / 4 - 1;
            stacks[stackNum].unshift(part);
        });
    });
    return { stacks, instructions };
}
