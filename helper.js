import { readFile, access } from "fs/promises";

export async function loadData({ day, dataType = "sample" }) {
    const data = await readFile(`./${day}/${dataType}.txt`, "utf-8");
    return data.split("\n");
}

export async function fileExists(filename) {
    try {
        await access(filename);
        return true;
    } catch (err) {
        return false;
    }
}

export async function argsChecker(args) {
    if (args.length === 0) {
        console.log("Please provide a day number");
        process.exit(1);
    }

    let dataType = "input";
    if (args[1] === "sample") {
        dataType = "sample";
    }

    return { dataType };
}

export async function partRunner({ part, input }) {
    console.time(part.name);
    const result = await part({ input });
    console.timeEnd(part.name);
    console.log(result);
    return result;
}

export function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
