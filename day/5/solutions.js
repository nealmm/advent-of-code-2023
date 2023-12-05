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
    const data = input.split('\n\n').map(x => x.split('\n'));

    const seedNums = data[0][0].match(/\d+/g).map(x => parseInt(x));

    const seedToSoilMap = [];

    for (let i = 1; i < data[1].length; i++) {
        const [dest, src, len] = data[1][i].match(/\d+/g).map(x => parseInt(x));

        seedToSoilMap.push({ dest, src, len });
    }

    const soilToFertMap = [];

    for (let i = 1; i < data[2].length; i++) {
        const [dest, src, len] = data[2][i].match(/\d+/g).map(x => parseInt(x));

        soilToFertMap.push({ dest, src, len });
    }

    const fertToWaterMap = [];

    for (let i = 1; i < data[3].length; i++) {
        const [dest, src, len] = data[3][i].match(/\d+/g).map(x => parseInt(x));

        fertToWaterMap.push({ dest, src, len });
    }

    const waterToLightMap = [];

    for (let i = 1; i < data[4].length; i++) {
        const [dest, src, len] = data[4][i].match(/\d+/g).map(x => parseInt(x));

        waterToLightMap.push({ dest, src, len });
    }

    const lightToTempMap = [];

    for (let i = 1; i < data[5].length; i++) {
        const [dest, src, len] = data[5][i].match(/\d+/g).map(x => parseInt(x));

        lightToTempMap.push({ dest, src, len });
    }

    const tempToHumidMap = [];

    for (let i = 1; i < data[6].length; i++) {
        const [dest, src, len] = data[6][i].match(/\d+/g).map(x => parseInt(x));

        tempToHumidMap.push({ dest, src, len });
    }

    const humidToLocMap = [];

    for (let i = 1; i < data[7].length; i++) {
        const [dest, src, len] = data[7][i].match(/\d+/g).map(x => parseInt(x));

        humidToLocMap.push({ dest, src, len });
    }

    const mapFrom = (category, num) => {
        for (entry of category) {
            if (entry.src <= num && num <= entry.src + entry.len - 1) {  // Added decrement on entry.len
                return entry.dest + (num - entry.src)
            }
        }

        return num;
    };

    let min = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < seedNums.length - 1; i += 2) {
        for (let n = seedNums[i]; n < seedNums[i] + seedNums[i + 1]; n++) {
            const loc = mapFrom(humidToLocMap, mapFrom(tempToHumidMap, mapFrom(lightToTempMap, mapFrom(waterToLightMap, mapFrom(fertToWaterMap, mapFrom(soilToFertMap, mapFrom(seedToSoilMap, n)))))));

            if (loc < min) {
                min = loc;
            }
        }
    }

    return min;
}

module.exports = { title, part1, part2 };
