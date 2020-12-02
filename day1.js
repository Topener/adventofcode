const fs = require('fs');

function findSum(nums) {
    nums.forEach(num => {
        nums.forEach(num2 => {
            if (num + num2 === 2020) {
                console.log('found match', num, num2, num*num2);
            }
        });
            
    });
}

fs.readFile('./day1input.txt', 'utf-8', (e, data) =>{
    const items = data.split("\n");
    items.forEach((num, i) => {
        items[i] = parseInt(num);
    })
    findSum(items);
})



