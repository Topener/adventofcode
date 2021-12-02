export default function Day(data) {
    const instructions = data.map((instruction) => {
        const instructionSplit = instruction.split(" ");
        instructionSplit[1] = parseInt(instructionSplit[1]);
        return instructionSplit;
    });

    part1(instructions);
    part2(instructions);
}

const part1 = (instructions) => {
    let position = 0;
    let depth = 0;

    for (const instruction of instructions) {
        switch (instruction[0]) {
            case "up":
                depth -= instruction[1];
                break;
            case "down":
                depth += instruction[1];
                break;
            case "forward":
                position += instruction[1];
                break;
        }
    }
    console.log(`Part 1: position: ${position}, depth: ${depth}`, position * depth);
};

const part2 = (instructions) => {
    let position = 0;
    let depth = 0;
    let aim = 0;

    for (const instruction of instructions) {
        switch (instruction[0]) {
            case "up":
                aim -= instruction[1];
                break;
            case "down":
                aim += instruction[1];
                break;
            case "forward":
                position += instruction[1];
                depth += aim * instruction[1];
                break;
        }
    }
    console.log(`Part 2: position: ${position}, depth: ${depth}, aim: ${aim}`, position * depth);
};
