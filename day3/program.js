const allChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function Day(data) {

    // part 1
    let score = 0;
    data.forEach((d) => {
        const first = d.substr(0, d.length / 2);
        const second = d.substr(d.length / 2);
        score += matchingChar(first, second);
    });

    console.log(`Part 1: ${score}`);

    // part 2
    let scorePart2 = 0;
    for (let i = 0; i < data.length; i += 3) {
        const backpackA = data[i];
        const backpackB = data[i + 1];
        const backpackC = data[i + 2];
        scorePart2 += compareBackpacks(backpackA, backpackB, backpackC);
    }

    console.log(`Part 2: ${scorePart2}`);
}

// part 1
function matchingChar(stringA, stringB) {
    const chars = stringA.split('');
    let match = '';

    chars.forEach((char) => {
        if (stringB.indexOf(char) !== -1) match = char;
    });

    return allChars.indexOf(match) + 1;
}

// part 2
function compareBackpacks(backpackA, backpackB, backpackC) {
    const chars = backpackA.split('');
    let match = '';
    chars.forEach((char) => {
        if (backpackB.indexOf(char) !== -1 && backpackC.indexOf(char) !== -1) match = char;
    });
    return allChars.indexOf(match) + 1;
}