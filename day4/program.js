export default function Day(data) {
    const pairs = data.map((d) => d.split(","));
    let containedPairs = 0;
    pairs.forEach((pair) => {
        if (containsPair(pair[0], pair[1])){ 
            containedPairs++;
        }
    });

    console.log(`Part 1: ${containedPairs}`);

    let overlappers = 0;
    pairs.forEach((pair) => {
        if (checkIfOverlap(convertRangeToString(pair[0]), convertRangeToNumbers(pair[1]))) {
            overlappers++;
        }
    });
    console.log(`Part 2: ${overlappers}`);
}

function checkIfOverlap(stringA, rangeB) {
    let hasMatch = false;
    // breakable loop
    for (let i = 0; i < rangeB.length; i++) {
        if (stringA.indexOf(`.${rangeB[i]}.`) > -1) {
            return true;
        }
    }
    return false;
}

function containsPair(first, second) {
    const stringA = convertRangeToString(first);
    const stringB = convertRangeToString(second);
    if (stringA.indexOf(stringB) !== -1 || stringB.indexOf(stringA) !== -1) {
        return true;
    }
    return false;
}

function convertRangeToNumbers(range) {
    const [min, max] = range.split("-");
    const numbers = [];
    for (let i = parseInt(min); i <= parseInt(max); i++) {
        numbers.push(i);
    }
    return numbers;
}

function convertRangeToString(range){ 
    const numbers = convertRangeToNumbers(range);
    return `.${numbers.join('.')}.`;

}
