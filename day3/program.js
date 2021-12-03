export default function Day(data) {
    const bitCount = bitValues(data);
    part1(data, bitCount);
    part2(data, bitCount);
}

const part1 = (instructions, count) => {
    let gamma = "";
    let epsilon = "";

    for (const row in count) {
        gamma += count[row]["0"] > count[row]["1"] ? "0" : "1";
        epsilon += count[row]["0"] > count[row]["1"] ? "1" : "0";
    }

    console.log("part 1", gamma, epsilon, parseInt(gamma, 2) * parseInt(epsilon, 2));
};

const part2 = (instructions, count) => {
    function removeBasedOnBitPosition(rows, bitPosition, value) {
        return rows.filter((row) => row.substr(bitPosition, 1) !== value);
    }

    function removeFromArray(rows, invert) {
        let result;
        for (const bitRow in count) {
            count = bitValues(rows);

            const bit = count[bitRow];
            let check = bit["0"] > bit["1"];
            if (invert) check = !check;

            rows = removeBasedOnBitPosition(rows, parseInt(bitRow), check ? "0" : "1");

            if (rows.length === 1) {
                result = rows[0];
                break;
            }
        }
        return result;
    }

    const oxygen = removeFromArray(instructions, false);
    const co2 = removeFromArray(instructions, true);

    console.log("part 2", oxygen, co2, parseInt(oxygen, 2) * parseInt(co2, 2));
};

const bitValues = (instructions) => {
    let count = {};

    for (const binary of instructions) {
        const nums = binary.split("");

        nums.forEach((element, i) => {
            if (!count.hasOwnProperty(i)) {
                count[i] = { 0: 0, 1: 0 };
            }
            count[i][element]++;
        });
    }

    return count;
};
