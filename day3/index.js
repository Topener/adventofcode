import { isNumeric } from "../helper.js";

export const part1 = ({ input }) => {
    let result = 0;
    const partNumbers = [];
    const positions = findSymbolPositions({ input });
    input.forEach((row, rowIndex) => {
        const numbers = findNumbersInRow({ row, rowIndex });

        numbers.forEach((number) => {
            const matches = findSymbolOnPosition({
                symbols: positions,
                rowIndex,
                startIndex: number.position - 1,
                endIndex: number.position + number.number.toString().length,
            });
            if (matches.length !== 0) {
                partNumbers.push(number.number);
            }
        });
    });

    result = partNumbers.reduce((a, b) => a + b, 0);
    return result;
};

export const part2 = ({ input }) => {
    let result = 0;
    let partNumbers = [];
    let gearValues = [];

    const symbols = findSymbolPositions({ input });
    input.forEach((row, rowIndex) => {
        partNumbers = [...findNumbersInRow({ row, rowIndex }), ...partNumbers];
    });

    symbols.forEach((symbol) => {
        if (symbol.item === "*") {
            const matches = findNumbersNextToSymbol({
                numbers: partNumbers,
                symbolRow: symbol.rowIndex,
                symbolPosition: symbol.index,
            });
            if (matches.length === 2) {
                gearValues.push(matches[0].number * matches[1].number);
            }
        }
    });
    result = gearValues.reduce((a, b) => a + b, 0);
    return result;
};

const findSymbolPositions = ({ input }) => {
    const positions = [];
    input.forEach((row, rowIndex) => {
        const items = row.split("");
        items.forEach((item, index) => {
            if (!isNumeric(item) && item !== ".") {
                positions.push({ rowIndex, index, item });
            }
        });
    });
    return positions;
};

const findNumbersInRow = ({ row, rowIndex }) => {
    const regex = /\d+/g;
    const matches = [];
    let match;

    while ((match = regex.exec(row)) !== null) {
        const number = match[0];
        const position = match.index;
        matches.push({ number: parseInt(number), position, row: rowIndex, endPosition: position + number.length - 1 });
    }

    return matches;
};

const findSymbolOnPosition = ({ symbols, rowIndex, startIndex, endIndex }) => {
    return symbols.filter(
        (item) => item.rowIndex >= rowIndex - 1 && item.rowIndex <= rowIndex + 1 && item.index >= startIndex && item.index <= endIndex
    );
};

const findNumbersNextToSymbol = ({ numbers, symbolRow, symbolPosition }) => {
    return numbers.filter(
        (item) =>
            item.row >= symbolRow - 1 &&
            item.row <= symbolRow + 1 &&
            ((item.position >= symbolPosition - 1 && item.position <= symbolPosition + 1) ||
                (item.endPosition >= symbolPosition - 1 && item.endPosition <= symbolPosition + 1))
    );
};
