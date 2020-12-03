const fs = require('fs');

function findSumPart2(nums) {
    nums.forEach(num => {
        nums.forEach(num2 => {
            nums.forEach(num3 => {
                if (num + num2 + num3 === 2020) {
                    console.log('2: found match', num, num2, num3, num*num2*num3);
                }
            });
        });
            
    });
}

function findSumPart1(nums) {
    nums.forEach(num => {
        nums.forEach(num2 => {
            if (num + num2 === 2020) {
                console.log('1: found match', num, num2, num*num2);
            }
        });
            
    });
}

fs.readFile('./input.txt', 'utf-8', (e, data) =>{
    const items = data.split("\n");
    items.forEach((num, i) => {
        items[i] = parseInt(num);
    })
    findSumPart1(items);
    findSumPart2(items);
})



