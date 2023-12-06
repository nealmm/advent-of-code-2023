const title = '--- Day 1: Wait For It ---';

function part1(input) {
    const lines = input.split('\n');

    const times = lines[0].match(/(\d+)/g);
    const records = lines[1].match(/(\d+)/g);

    let nums = [];

    for (let i = 0; i < times.length; i++) {
        let ways = 0;

        for (let hold = 0; hold <= times[i]; hold++) {
            let speed = hold;
            let distance = speed * (times[i] - hold);

            if (distance > records[i]) {
                ways++;
            }
        }

        nums.push(ways);
    }

    return nums.reduce((x, y) => x * y);
}

function part2(input) {
    const lines = input.split('\n');

    const time = lines[0].match(/(\d+)/g).reduce((x, y) => `${x}${y}`);
    const record = lines[1].match(/(\d+)/g).reduce((x, y) => `${x}${y}`);

    let ways = 0;

    for (let hold = 0; hold <= time; hold++) {
        let speed = hold;
        let distance = speed * (time - hold);

        if (distance > record) {
            ways++;
        }
    }

    return ways;
}

module.exports = { title, part1, part2 };
