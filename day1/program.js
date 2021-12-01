export default function Day(data) {
    let increases = 0;
    let lastValue = false;

    // prepare data
    data.forEach((row, i) => {
        data[i] = parseInt(row);
    });

    // part 1
    data.forEach((row) => {
        if (lastValue !== false && row > lastValue) {
            increases++;
        }

        lastValue = row;
    });

    console.log("Part 1:", increases);

    // part 2
    let rollingThrees = [];
    let lastSum = false;
    let increases2 = 0;

    data.forEach((row, i) => {
        rollingThrees.push(row);

        if (rollingThrees.length > 3) {
            rollingThrees.shift();
        }
        if (rollingThrees.length === 3) {
            const sum = rollingThrees.reduce((a, b) => a + b);

            if (lastSum !== false && sum > lastSum) {
                increases2++;
            }

            lastSum = sum;
        }
    });

    console.log("Part 2:", increases2);
}
