export const part1 = ({ input }) => {
    let result = 0;
    const times = input[0].match(/\d+/g).map((num) => parseInt(num));
    const records = input[1].match(/\d+/g).map((num) => parseInt(num));
    const waysToBeat = [];
    times.forEach((time, index) => {
        const distances = calculateDistances(time);
        waysToBeat.push(distances.filter((distance) => distance.distance > records[index]));
    });

    result = waysToBeat.reduce((result, array) => result * array.length, 1);
    return result;
};

const calculateDistances = (maxTime) => {
    const distances = [];
    let speed = 0;
    for (let i = 0; i < maxTime; i++) {
        speed = i;
        distances.push({ distance: speed * (maxTime - i), pushTime: i });
    }
    return distances;
};

export const part2 = ({ input }) => {
    let result = 0;
    return result;
};
