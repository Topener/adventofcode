export default function Day(data) {
    const elfs = [];
    let elf = getBasicElfStats();
    data.forEach(c => {
        const calories = parseInt(c);

        if (isNaN(calories)) {
            elfs.push(elf);
            elf = getBasicElfStats();
            return;
        }

        elf.foodItems.push(calories);
        elf.calories += calories;
    });

    elfs.push(elf);

    const sortedElf = sortElfsByCalories(elfs);
    // part 1
    console.log('PART 1');
    console.log(`${sortedElf[0].foodItems.length} snacks containing ${sortedElf[0].calories} calories`);
    
    // part 2
    console.log('PART 2');
    const top3Elf = sortedElf.slice(0, 3);
    const totalCalories = top3Elf.reduce((acc, elf) => acc + elf.calories, 0);
    const totalFoodItems = top3Elf.reduce((acc, elf) => acc + elf.foodItems.length, 0);
    
    console.log(`${totalFoodItems} snacks containing ${totalCalories} calories`);
}

function sortElfsByCalories(elfs){
    return elfs.sort((a, b) => b.calories - a.calories);
}

function getBasicElfStats() {
    return {
        calories: 0,
        foodItems: [],
    }
}