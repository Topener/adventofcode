export const part1 = ({ input }) => {
    let result = 0;
    const constraints = { red: 12, green: 13, blue: 14 };

    input.forEach((row) => {
        let success = true;
        const { hands, gameNumber } = splitInput({ row });

        hands.forEach((hand) => {
            ["red", "green", "blue"].forEach((color) => {
                if (hand.hasOwnProperty(color) && hand[color] > constraints[color]) {
                    success = false;
                }
            });
        });

        if (success) {
            result += gameNumber;
        }
    });

    return result;
};

export const part2 = ({ input }) => {
    const result = 0;
    return result;
};

const splitInput = ({ row }) => {
    const game = row.split(": ")[0];
    const gameNumber = parseInt(game.split(" ")[1]);
    let hands = row.substring(game.length + 2).split("; ");
    hands = hands.map((hand) => {
        let splitHands = hand.split(", ");
        return splitHands.reduce((acc, nums) => {
            const [count, color] = nums.split(" ");
            acc[color] = Number(count);
            return acc;
        }, {});
    });
    return { gameNumber, hands };
};
