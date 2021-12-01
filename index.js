import loadData, { fileExists } from "./helper.js";

if (process.argv[2]) {
    try {
        const dayName = `day${process.argv[2]}`;
        const filename = `./${dayName}/program.js`;

        if (await fileExists(filename)) {
            console.log("found", filename);
            const data = await loadData(dayName);
            const { default: Day } = await import(filename);

            console.time("Day Execution");
            Day(data);
            console.timeEnd("Day Execution");
        } else {
            console.log("The provided day does not exist or is not yet implemented");
        }
    } catch (e) {
        console.log(e);
        error();
    }
} else {
    error();
    process.exit(1);
}

function error() {
    console.log('Please specify a day as a number like "node index.js 1"');
}
