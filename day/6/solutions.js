const title = '--- Day 6: Wait For It ---';

function part1(input) {
    const lines = input.split('\n');

    const times = lines[0].match(/(\d+)/g).map(x => parseInt(x));
    const records = lines[1].match(/(\d+)/g).map(x => parseInt(x));

    let product = 1;

    for (let i = 0; i < times.length; i++) {
        let waysToBeat = 0;

        for (let hold = 0; hold <= times[i]; hold++) {
            let speed = hold;
            let distance = speed * (times[i] - hold);

            if (distance > records[i]) {
                waysToBeat++;
            }
        }

        product *= waysToBeat;
    }

    return product;
}

function part2(input) {
    const lines = input.split('\n');

    const time = parseInt(lines[0].match(/(\d+)/g).reduce((x, y) => `${x}${y}`));
    const record = parseInt(lines[1].match(/(\d+)/g).reduce((x, y) => `${x}${y}`));

    let waysToBeat = 0;

    for (let hold = 0; hold <= time; hold++) {
        let speed = hold;
        let distance = speed * (time - hold);

        if (distance > record) {
            waysToBeat++;
        }
    }

    return waysToBeat;
}

module.exports = { title, part1, part2 };
