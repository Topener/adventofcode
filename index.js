import { fileExists, argsChecker, loadData, partRunner } from "./helper.js";
const args = process.argv.slice(2);

const { dataType } = await argsChecker(args);

const dayFile = `day${args[0]}`;

if (!(await fileExists(`./${dayFile}/index.js`))) {
    console.log(`Day ${args[0]} does not exist`);
    process.exit(1);
}

const { part1, part2 } = await import(`./${dayFile}/index.js`);
const data = await loadData({ day: dayFile, dataType });

partRunner({ part: part1, input: data });
