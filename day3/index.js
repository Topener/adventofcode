export const part1 = ({ input }) => {
    let result = 0;
    const regex = /mul\(\d{1,3},\d{1,3}\)/g;
    const matches = [];
    input.forEach((row) => {
        matches.push(...row.match(regex));
    });

    const mulNumbersRegex = /mul\((\d{1,3}),(\d{1,3})\)/;
    matches.forEach((match) => {
        const [_, num1, num2] = match.match(mulNumbersRegex);
        // console.log({ num1, num2 });
        result += parseInt(num1) * parseInt(num2);
    });

    return result;
};

export const part2 = ({ input }) => {
    let result = 0;
    let currentDo = true;
    const regex = /mul\(\d{1,3},\d{1,3}\)/g;
    const mulNumbersRegex = /mul\((\d{1,3}),(\d{1,3})\)/;

    input.forEach((row) => {
        while (row.length) {
            const nextDo = row.indexOf("do()");
            const nextDont = row.indexOf("don't()");
            const nextMulValue = row.match(regex);
            if (!nextMulValue) {
                return;
            }
            const nextMul = row.indexOf(nextMulValue[0]);

            if ((nextDont === -1 || nextDo < nextDont) && nextDo < nextMul && nextDo > -1) {
                currentDo = true;
                row = row.slice(nextDo + 4);

                continue;
            }

            if ((nextDo === -1 || nextDont < nextDo) && nextDont < nextMul && nextDont > -1) {
                currentDo = false;
                row = row.slice(nextDont + 8);

                continue;
            }

            if (currentDo) {
                const [_, num1, num2] = nextMulValue[0].match(mulNumbersRegex);
                result += parseInt(num1) * parseInt(num2);
                row = row.slice(nextMul + nextMulValue[0].length);
            } else {
                row = row.slice(nextMul + nextMulValue[0].length);
            }

            if (nextDo === -1 && nextDont === -1 && nextMul === -1) {
                break;
            }
        }
    });
    return result;
};
