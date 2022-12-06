// Today's input is only 1 line, but my program still accepts multi-line
// as that is what the runner does. This means the sample input is actually bigger, line-wise
// than the actual input. This means I'm writing the code to handle sample input, thus making
// the code more complex than it needs to be, though only by a loop
export default function Day(data) {
    data.forEach(line => parseLine({line: line, part: 1, amountOfChars: 4}));
    data.forEach(line => parseLine({line: line, part: 2, amountOfChars: 14}));
}

function parseLine({line, part, amountOfChars}) {
    let chars = [];
    for (let i = 0; i < line.length; i++) {
        chars.push(line.charAt(i));
        if (chars.length > amountOfChars) {
            chars.shift();
        }

        if (chars.length === amountOfChars && (new Set(chars)).size === chars.length) {
            return console.log(`Part ${part}: Unique after ${i+1} chars`);
        }
        
    }
}