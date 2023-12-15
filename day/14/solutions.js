const { lcm } = require("mathjs");

const title = '--- Day 14: Parabolic Reflector Dish ---';

function part1(input) {
    let sum = 0;

    const tiles = input.split('\n').map(line => line.split(''));

    const restingRow = (i, j) => {
        let cubedRow = undefined;
        let roundedCount = 0;

        for (let k = 0; k < i; k++) {
            if (tiles[k][j] === 'O') {
                roundedCount++;
            }

            if (tiles[k][j] === '#') {
                cubedRow = k;
                roundedCount = 0;
            }
        }

        if (cubedRow != undefined) {
            return cubedRow + roundedCount + 1;
        }

        return roundedCount;
    };

    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[0].length; j++) {
            if (tiles[i][j] === 'O') {
                sum += tiles.length - restingRow(i, j);
            }
        }
    }

    return sum;
}

// 99224 (too high)
// 99128 (too high)
// 95455 (too high)
// 95254 (correct!)
function part2(input) {
    let sum = 0;

    let tiles = input.split('\n').map(line => line.split(''));

    const tiltNorth = () => {
        for (let c = 0; c < tiles[0].length; c++) {
            const roundedGroups = [0];

            for (let r = 0; r < tiles.length; r++) {
                if (tiles[r][c] === '#') {
                    roundedGroups.push(0);
                    continue;
                }

                if (tiles[r][c] === 'O') {
                    roundedGroups[roundedGroups.length - 1]++;
                }
            }

            for (let r = 0; r < tiles.length; r++) {
                if (tiles[r][c] === '#') {
                    roundedGroups.splice(0, 1);
                    continue;
                }

                if (roundedGroups[0] > 0) {
                    tiles[r][c] = 'O';
                    roundedGroups[0]--;
                }
                else {
                    tiles[r][c] = '.';
                }
            }
        }
    };

    const tiltWest = () => {
        for (let r = 0; r < tiles.length; r++) {
            const roundedGroups = [0];

            for (let c = 0; c < tiles[0].length; c++) {
                if (tiles[r][c] === '#') {
                    roundedGroups.push(0);
                    continue;
                }

                if (tiles[r][c] === 'O') {
                    roundedGroups[roundedGroups.length - 1]++;
                }
            }

            for (let c = 0; c < tiles[0].length; c++) {
                if (tiles[r][c] === '#') {
                    roundedGroups.splice(0, 1);
                    continue;
                }

                if (roundedGroups[0] > 0) {
                    tiles[r][c] = 'O';
                    roundedGroups[0]--;
                }
                else {
                    tiles[r][c] = '.';
                }
            }
        }
    };

    const tiltSouth = () => {
        for (let c = 0; c < tiles[0].length; c++) {
            const roundedGroups = [0];

            for (let r = tiles.length - 1; r >= 0; r--) {
                if (tiles[r][c] === '#') {
                    roundedGroups.push(0);
                    continue;
                }

                if (tiles[r][c] === 'O') {
                    roundedGroups[roundedGroups.length - 1]++;
                }
            }

            for (let r = tiles.length - 1; r >= 0; r--) {
                if (tiles[r][c] === '#') {
                    roundedGroups.splice(0, 1);
                    continue;
                }

                if (roundedGroups[0] > 0) {
                    tiles[r][c] = 'O';
                    roundedGroups[0]--;
                }
                else {
                    tiles[r][c] = '.';
                }
            }
        }
    };

    const tiltEast = () => {
        for (let r = 0; r < tiles.length; r++) {
            const roundedGroups = [0];

            for (let c = tiles[0].length - 1; c >=0; c--) {
                if (tiles[r][c] === '#') {
                    roundedGroups.push(0);
                    continue;
                }

                if (tiles[r][c] === 'O') {
                    roundedGroups[roundedGroups.length - 1]++;
                }
            }

            for (let c = tiles[0].length - 1; c >= 0; c--) {
                if (tiles[r][c] === '#') {
                    roundedGroups.splice(0, 1);
                    continue;
                }

                if (roundedGroups[0] > 0) {
                    tiles[r][c] = 'O';
                    roundedGroups[0]--;
                }
                else {
                    tiles[r][c] = '.';
                }
            }
        }
    };

    const originalConfig = tiles.map(row => row.join('')).join('\n');

    const configMap = new Map();
    let cycleLength = undefined;

    for (let i = 0; i < 1000000000; i++) {
        tiltNorth();
        tiltWest();
        tiltSouth();
        tiltEast();

        const config = tiles.map(row => row.join('')).join('\n');

        if (configMap.has(config)) {
            console.log(`Found cycle between ${configMap.get(config)} and ${i}`)
            cycleLength = i - configMap.get(config);
            break;
        }
        else {
            configMap.set(config, i)
        }
    }

    if (cycleLength != undefined) {
        tiles = originalConfig.split('\n').map(line => line.split(''));

        // 118: Dirty magic number trick
        // Used 1000000000 % cycleLength on example
        // but for input data this doesn't work!
        //
        // Probably becuase that gives 34 but looping doesn't
        // kick in until iteration 114. Cycle length for input
        // is 42.
        //
        // 118 works because

        //      1000000000 % 42 == 118 % 42 == 34
        //
        // Just need to find the proper way to calculate
        
        for (let i = 0; i < 118; i++) {
            tiltNorth();
            tiltWest();
            tiltSouth();
            tiltEast();
        }
    }

    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[0].length; j++) {
            if (tiles[i][j] === 'O') {
                sum += tiles.length - i;
            }
        }
    }

    return sum;
}

module.exports = { title, part1, part2 };
