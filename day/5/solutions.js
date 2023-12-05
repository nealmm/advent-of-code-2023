const title = '--- Day 5: XXXXX ---';

function part1(input) {
    let min = undefined;

    const data = input.split('\n\n').map(x => x.split('\n'));

    const seeds = data[0][0].match(/\d+/g).map(x => parseInt(x));

    const maps = {};

    for (let i = 1; i < data.length; i++) {
        const id = data[i][0].match(/(\w+-to-\w+) map:/)[1];

        maps[id] = [];

        for (let j = 1; j < data[i].length; j++) {
            const [dest, src, len] = data[i][j].match(/\d+/g).map(x => parseInt(x));

            maps[id].push({ dest, src, len });
        }
    }

    for (seed of seeds) {
        let n = seed;

        for (id in maps) {
            for (entry of maps[id]) {
                if (entry.src <= n && n <= entry.src + entry.len - 1) {
                    n = entry.dest + (n - entry.src)
                    break;
                }
            }
        }

        if (min == undefined || n < min) {
            min = n;
        }
    }

    return min;
}

// 79004095 (too high)
function part2(input) {
    let min = undefined;

    const data = input.split('\n\n').map(x => x.split('\n'));

    const seedData = data[0][0].match(/\d+/g).map(x => parseInt(x));

    const maps = {};

    for (let i = 1; i < data.length; i++) {
        const id = data[i][0].match(/(\w+-to-\w+) map:/)[1];

        maps[id] = [];

        for (let j = 1; j < data[i].length; j++) {
            const [dest, src, len] = data[i][j].match(/\d+/g).map(x => parseInt(x));

            maps[id].push({ dest, src, len });
        }
    }

    for (let i = 0; i < seedData.length - 1; i += 2) {
        for (let seed = seedData[i]; seed < seedData[i] + seedData[i + 1]; seed++) {
            let n = seed;

            for (id in maps) {
                for (entry of maps[id]) {
                    if (entry.src <= n && n <= entry.src + entry.len - 1) {
                        n = entry.dest + (n - entry.src)
                        break;
                    }
                }
            }
    
            if (min == undefined || n < min) {
                min = n;
            }
        }
    }

    return min;
}

module.exports = { title, part1, part2 };
