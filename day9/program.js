const fs = require('fs');

const data  = fs.readFileSync('./input.txt', 'utf-8');
const itemsToCheck = 25;

loopData(data.split("\n"));

function loopData(rows) {
    let last25 = [];

    rows.forEach((row, i) => {
        if (last25.length === itemsToCheck+1) last25.splice(0,1);
        if (last25.length === itemsToCheck) {
            if (!hasSum(parseInt(row), last25)) {
                console.log(i, 'part 1 FAIL', row);

                findSum(rows, parseInt(row));
            }
        }
        last25.push(parseInt(row));
    });
}

function hasSum(num, nums) {
    for (let i = 0; i < nums.length; i++) {
        const n1 = nums[i];
        for (let j = 0; j < nums.length; j++) {
            const n2 = nums[j];
            const sum = parseInt(n1+n2);
            if (num === sum) {
                return true;
            }
        }
    }
    return false;
}

function findSum(nums, sumToFind) {
    let uses = [];
    let found = false;

    nums.forEach(n => {
        if (found) return;
        if (sumOfArray(uses) > sumToFind && uses.length > 1) uses = stripToBelow(sumToFind, uses);

        if (sumOfArray(uses) === sumToFind) {
            found = true;
            uses.sort((a,b) => { return a > b ? 1 : -1});
            console.log('part 2 gotcha!', uses[0] + uses[uses.length - 1] , uses);
        }
        uses.push(parseInt(n));
    });
}

function stripToBelow(sumToFind, items) {
    
    items.splice(0, 1);
    if (sumOfArray(items) > sumToFind && items.length > 1) {
        return stripToBelow(sumToFind, items);
    }
    return items;
}

function sumOfArray(items) {
    let sum = 0;
    items.forEach(i => {
        sum += i;
    })
    return sum;
}