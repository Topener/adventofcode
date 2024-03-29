import { isNumeric } from "../helper.js";

export const part1 = ({ input }) => {
    let result = 0;
    input.forEach((row) => {
        const { have, winning } = getNumbers({ row });
        const matches = winning.filter((n) => have.includes(n));
        result += matches.length > 0 ? Math.pow(2, matches.length - 1) : 0;
    });
    return result;
};

export const part2 = ({ input }) => {
    let result = 0;
    let cards = Array(input.length).fill(1);

    for (let i = 0; i < input.length; i++) {
        const { have, winning } = getNumbers({ row: input[i] });
        const matches = winning.filter((n) => have.includes(n));

        if (matches.length > 0) {
            for (let j = 1; j <= matches.length; j++) {
                if (cards[i + j]) cards[i + j] += cards[i];
            }
        }
    }
    result = cards.reduce((a, b) => a + b, 0);

    return result;
};

const getNumbers = ({ row }) => {
    const matches = row.match(/: (.+?) \| (.+)/);
    const winning = matches[1].match(/\d+/g);
    const have = matches[2].match(/\d+/g);
    return { winning, have };
};
