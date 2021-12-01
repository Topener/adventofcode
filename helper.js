import fs from "fs";

export default async function loadData(day) {
    const data = await fs.readFileSync(`./${day}/input.txt`, "utf-8");
    return data.split("\n");
}

export async function fileExists(filename) {
    try {
        const result = await fs.existsSync(filename);
        return result;
    } catch (err) {
        return false;
    }
}
