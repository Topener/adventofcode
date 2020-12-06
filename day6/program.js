const { group } = require('console');
const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (e, data) => {
    const answers = data.split("\n");
    const groups = findYesses(answers);
    
    let allSum = 0;
    let commonSum = 0;
    groups.forEach(group => {
        allSum += Object.keys(group).length - 1;
        const groupFilter = Object.entries(group).filter(key => key[1] === group.groupSize);
        commonSum += groupFilter.length - 1;
    });

    console.log('Unique yesses', allSum);
    console.log('Common answers', commonSum);

});

function findYesses(data) {
    const groups = [];
    let groupAnswers = {groupSize: 0};

    data.forEach(row => {
        if (!row){ 
            groups.push(groupAnswers);
            groupAnswers = {groupSize: 0};
            return;
        }

        groupAnswers.groupSize++;

        const answers = row.split("");
        answers.forEach(a => {
            if (groupAnswers.hasOwnProperty(a)) groupAnswers[a]++;
            else groupAnswers[a] = 1;
        });
    });
    groups.push(groupAnswers);
    return groups;
}