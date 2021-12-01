import loadDay from "./helper.js";

if (process.argv[2]) {
    const dayName = `day${process.argv[2]}`;
    const data = loadDay(dayName);
    const { default: Day } = await import(`./${dayName}/program.js`);
    Day(data);
} else {
    console.log("Please specify a day as a number");
    process.exit(1);
}
