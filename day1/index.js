export const part1 = ({ input }) => {
    let result = 0;

    const { list1, list2 } = parseInto2lists(input);
    list1.sort();
    list2.sort();

    list1.forEach((item, index) => {
        result += Math.abs(item - list2[index]);
    });

    return result;
};

export const part2 = ({ input }) => {
    let result = 0;

    const { list1, list2 } = parseInto2lists(input);

    list1.forEach((item) => {
        const count = list2.filter((matchItem) => matchItem == item).length;
        if (count > 0) {
            result += item * count;
        }
    });

    return result;
};

const parseInto2lists = (input) => {
    const list1 = [];
    const list2 = [];

    input.forEach((item) => {
        const split = item.split("   ");
        list1.push(parseInt(split[0]));
        list2.push(parseInt(split[1]));
    });

    return { list1, list2 };
};
