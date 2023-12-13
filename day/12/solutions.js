const title = '--- Day 12: Hot Springs ---';

function part1(input) {
    let sum = 0;

    const data = input.split('\n').map(line => line.split(' '));

    for (row of data) {
        const [springs, groups] = [row[0], row[1].split(',').map(n => parseInt(n))];

        const isValidArrangement = str => {
            const matches = str.match(/#+/g);

            if (matches == null || matches.length != groups.length) {
                return false;
            }

            for (let i = 0; i < matches.length; i++) {
                if (matches[i].length != groups[i]) {
                    return false;
                }
            }

            return true;
        };

        let unknownsTotalLength = 0;

        const unknowns = Array.from(springs.matchAll(/\?+/g), match => {
            const record = {
                index: unknownsTotalLength,
                length: match[0].length
            };

            unknownsTotalLength += record.length;

            return record;
        });

        let validArrangements = 0;

        for (let n = 0; n < 2 ** unknownsTotalLength; n++) {
            let sub = '';

            for (let i = unknownsTotalLength - 1; i >= 0; i--) {
                switch ((n >> i) & 0b1) {
                    case 0:
                        sub += '.';
                        break;

                    case 1:
                        sub += '#';
                        break;
                }
            }

            let str = springs;

            for (record of unknowns) {
                const start = record.index;
                const end = record.index + record.length;

                str = str.replace(/\?+/, sub.substring(start, end));
            }

            if (isValidArrangement(str)) {
                validArrangements++;
            }
        }

        sum += validArrangements;
    }

    return sum;
}

function part2(input) {
    let sum = 0;

    // ...

    return sum;
}

module.exports = { title, part1, part2 };
