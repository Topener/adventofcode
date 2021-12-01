import fs from "fs";

export default async function loadData(day) {
    const data = await fs.readFileSync(`./${day}/input.txt`, "utf-8");
    return data.split("\n");
}
