const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (e, data) => {
    const boardingPasses = data.split("\n");
    let maxSeatID = 0;
    const seatIDs = [];
    boardingPasses.forEach(boardingPassCode => {
        const [seat,row] = calculateSeatAndRow(boardingPassCode);
        const seatID = row * 8 + seat;
        if (seatID > maxSeatID) maxSeatID = seatID;
        seatIDs.push(seatID);
    });

    console.log('max seat ID', maxSeatID);

    seatIDs.sort((a,b) => {
        return a > b ? 1 : -1;
    });

    const mySeat = findMissingNumber(seatIDs);

    console.log('missing seat', mySeat);
});

function calculateSeatAndRow(boardingCode) {
    let seat = [0,7];
    let row = [0,127];
    const chars = boardingCode.split("");

    chars.forEach(c => {
        // console.log(c, row);
        if (c === 'F') {
            row[1] = row[1] - Math.ceil((row[1] - row[0]) / 2);
        } else if (c === 'B') {
            row[0] = row[0] + Math.ceil((row[1] - row[0]) / 2)
        }

        if (c === 'L') {
            seat[1] = seat[1] - Math.ceil((seat[1] - seat[0]) / 2);
        } else if (c === 'R') {
            seat[0] = seat[0] + Math.ceil((seat[1] - seat[0]) / 2)
        }
    });
    if (row[0] === row[1]) row = row[1];
    if (seat[0] === seat[1]) seat = seat[1];

    return [seat, row]
}

function findMissingNumber(seatIDs) {
    let curId = 0;
    let yourSeat = 0;
    seatIDs.forEach(id => {
        if (curId === 0) return curId = id;
        console.log(curId, id);
        if (id - curId > 1) yourSeat = id -1;
        curId = id;
    });
    return yourSeat;
}