export const part1 = ({ input }) => {
    let result = 0;
    const regex = /\d/g;

    input.forEach((row) => {
        const matches = row.match(regex);
        result += parseInt(matches[0] + matches[matches.length - 1]);
    });

    return result;
};

export const part2 = ({ input }) => {
    let result = 0;
    const regex = /(?:\d|one|two|three|four|five|six|seven|eight|nine)/g;

    const numberMap = {
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
    };

    input.forEach((row) => {
        const matches = row.match(regex);
        const firstNumber = matches[0];

        const first = numberMap[firstNumber] || firstNumber;

        let lastNumber = false;
        let count = -1;

        while (lastNumber === false) {
            const testString = row.slice(count);
            if (testString.match(regex)) {
                lastNumber = testString.match(regex)[0];
            }
            count--;
        }

        const last = numberMap[lastNumber] || lastNumber;
        const sum = parseInt(first + last);
        result += sum;
    });

    return result;
};
