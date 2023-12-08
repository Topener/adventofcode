import fs from "fs";
const cardOrder = "23456789TJQKA";
const handType = {
    HIGH_CARD: 0,
    ONE_PAIR: 1,
    TWO_PAIR: 2,
    THREE_OF_A_KIND: 3,
    FULL_HOUSE: 4,
    FOUR_OF_A_KIND: 5,
    FIVE_OF_A_KIND: 6,
};

export const part1 = ({ input }) => {
    let result = 0;
    const hands = splitHands({ input });
    hands.map(getHandType);
    hands.sort(sortHands);

    writeArrayToFile(hands, "hands.txt");
    hands.forEach((hand, i) => {
        result += hand.bid * (i + 1);
    });
    return result;
};

export const part2 = ({ input }) => {
    let result = 0;
    return result;
};

const splitHands = ({ input }) => {
    const hands = [];
    input.forEach((hand) => {
        const split = hand.split(" ");
        const details = {
            cards: split[0].split(""),
            bid: parseInt(split[1]),
            type: handType.HIGH_CARD,
        };
        hands.push(details);
    });
    return hands;
};

function getHandType(hand) {
    const mergedString = hand.cards.join("");
    const regexPair = /([A-Z0-9])(.*\1)/;
    const regexThreeOfAKind = /([A-Z0-9]).*\1.*\1/;
    const regexFourOfAKind = /([A-Z0-9]).*\1.*\1.*\1/;
    const regexFiveOfAKind = /([A-Z0-9]).*\1.*\1.*\1.*\1/;
    const regexTwoPair = /([A-Z0-9]).*\1.*([A-Z0-9]).*\2/;
    const regexFullHouse = /([A-Z0-9]).*\1.*\1.*([A-Z0-9]).*\2/;

    if (regexFiveOfAKind.test(mergedString)) {
        hand.type = handType.FIVE_OF_A_KIND;
    } else if (regexFourOfAKind.test(mergedString)) {
        hand.type = handType.FOUR_OF_A_KIND;
    } else if (regexFullHouse.test(mergedString)) {
        hand.type = handType.FULL_HOUSE;
    } else if (regexThreeOfAKind.test(mergedString)) {
        hand.type = handType.THREE_OF_A_KIND;
    } else if (regexTwoPair.test(mergedString)) {
        hand.type = handType.TWO_PAIR;
    } else if (regexPair.test(mergedString)) {
        hand.type = handType.ONE_PAIR;
    }

    return hand;
}

const sortHands = (handA, handB) => {
    if (handA.type > handB.type) {
        return 1;
    } else if (handA.type < handB.type) {
        return -1;
    }

    let i;
    for (i = 0; i < 5; i++) {
        if (handA.cards[i] === handB.cards[i]) {
            continue;
        }

        if (cardOrder.indexOf(handA.cards[i]) > cardOrder.indexOf(handB.cards[i])) {
            return 1;
        }

        if (cardOrder.indexOf(handA.cards[i]) < cardOrder.indexOf(handB.cards[i])) {
            return -1;
        }

        if (i > 4) {
            return 0;
        }
    }
};

function writeArrayToFile(array, filename) {
    const content = array.map(JSON.stringify).join("\n");

    fs.writeFile(filename, content, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Data written to file successfully.");
    });
}
