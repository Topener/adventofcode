const points = {
    X: 1,
    Y: 2,
    Z: 3,
};

export default function Day(data) {
    const games = data.map((d) => d.split(" "));

    const part1 = games.reduce((acc, game) => acc + scoreGame(game[0], game[1]), 0);
    const part2 = games.reduce((acc, game) => acc + scoreGamePart2(game[0], game[1]), 0);
    console.log(`Part 1: ${part1}`);
    console.log(`Part 2: ${part2}`);
}

function scoreGame(oppenentMove, counterMove) {
    const move = oppenentMove + counterMove;

    if (move === "AX" || move === "BY" || move === "CZ") {
        return 3 + points[counterMove];
    }

    if (move === "AY" || move === "BZ" || move === "CX") {
        return 6 + points[counterMove];
    }

    return 0 + points[counterMove];
}

function scoreGamePart2(oppenentMove, outcome) {
    const oppmoves = ['A', 'B', 'C'];
    const mymoves = ['X', 'Y', 'Z'];
    const modulator = outcome === 'X' ? -1 : outcome === 'Y' ? 0 : 1;
    const counterMove = mymoves[(oppmoves.indexOf(oppenentMove) + modulator + 3) % 3];
    return scoreGame(oppenentMove, counterMove);
}
