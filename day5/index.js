export const part1 = ({ input }) => {
    const almanac = extractAlmanac({ input });
    let list = almanac.seeds;
    let result = processSeeds({ list, almanac });
    return result;
};

export const part2 = ({ input }) => {
    const almanac = extractAlmanac({ input });
    let listRanges = almanac.seeds;
    let list = [];
    for (let i = 0; i < listRanges.length; i += 2) {
        list.push(...Array.from({ length: listRanges[i + 1] }, (_, i) => i + listRanges[i]));
    }
    let result = processSeeds({ list, almanac });
    return result;
};

const processSeeds = ({ list, almanac }) => {
    let result = 0;
    let current = "seed";
    let newList = [];
    while (current !== "location") {
        const conversion = almanac.conversions.find((c) => c.from === current);
        conversion.ranges.forEach((range) => {
            let difference = range.destinationRange - range.sourceRange;
            let from = range.sourceRange;
            let to = range.sourceRange + range.length - 1;

            for (let i = list.length - 1; i >= 0; i--) {
                const item = list[i];
                if (item >= from && item <= to) {
                    newList.push(item + difference);
                    list.splice(i, 1);
                }
            }
        });
        list = [...list, ...newList];
        newList = [];
        current = conversion.to;
    }
    result = Math.min(...list);
    return result;
};

const extractAlmanac = ({ input }) => {
    let almanac = { conversions: [] };

    let conversion = {};
    input.forEach((line, i) => {
        if (i === 0) {
            almanac.seeds = line.split(": ")[1].split(" ").map(Number);
            return;
        }
        if (line === "") {
            if (conversion.from) {
                almanac.conversions.push(conversion);
                conversion = {};
            }
            return;
        }
        if (line.indexOf("-to-") > -1) {
            let [from, to] = line.split("-to-");
            to = to.split(" map")[0];
            conversion = {
                from: from,
                to: to,
                ranges: [],
            };
            return;
        }
        let [destinationRange, sourceRange, length] = line.split(" ");
        conversion.ranges.push({
            destinationRange: parseInt(destinationRange),
            sourceRange: parseInt(sourceRange),
            length: parseInt(length),
        });
    });
    if (conversion.from) {
        almanac.conversions.push(conversion);
    }
    return almanac;
};

const extractRanges = ({ input }) => {};
