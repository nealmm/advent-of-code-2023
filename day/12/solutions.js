const title = '--- Day 12: Hot Springs ---';

function part1(input) {
    let sum = 0;

    const data = input.split('\n').map(line => line.split(' '));

    for (row of data) {
        const springs = row[0];
        const groups = row[1].split(',').map(n => parseInt(n));

        const substitutions = [];

        const unknowns = Array.from(springs.matchAll(/(\?+)/g), (match, index) => {
            const length = match[1].length;

            substitutions.push([]);

            for (let n = 0; n < 2 ** length; n++) {
                let sub = '';

                for (let i = length - 1; i >= 0; i--) {
                    switch ((n >> i) & 0b1) {
                        case 0:
                            sub += '.';
                            break;

                        case 1:
                            sub += '#';
                            break;
                    }
                }

                // console.log(springs.replace(/\?+/, sub));
                substitutions[index].push(sub)
            }
        });


    }

    return sum;
}

function part2(input) {
    let sum = 0;

    // ...

    return sum;
}

module.exports = { title, part1, part2 };
