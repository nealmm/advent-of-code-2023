const title = '--- Day 12: Hot Springs ---';

function part1(input) {
    let sum = 0;

    const data = input.split('\n').map(line => line.split(' '));

    for (row of data) {
        const springs = row[0];
        const groups = row[1].split(',').map(n => parseInt(n));

        const isValidArrangement = str => {
            let valid = true;

            const matches = str.match(/#+/g);

            if (matches == null || matches.length != groups.length) {
                return false;
            }

            for (let i = 0; i < matches.length; i++) {
                valid &&= matches[i].length == groups[i];
            }

            return valid;
        };

        const unknowns = springs.match(/\?+/g);
        const unknownLengths = unknowns.map(x => x.length);
        const unknownTotalLength = unknownLengths.reduce((a, b) => a + b);

        let arrangements = 0;

        for (let n = 0; n < 2 ** unknownTotalLength; n++) {
            let sub = '';

            for (let i = unknownTotalLength - 1; i >= 0; i--) {
                switch ((n >> i) & 0b1) {
                    case 0:
                        sub += '.';
                        break;

                    case 1:
                        sub += '#';
                        break;
                }
            }

            const substrs = [];
            let j = 0;

            for (len of unknownLengths) {
                substrs.push(sub.substring(j, j + len));
                j += len;
            }

            let string = springs;

            for (substr of substrs) {
                string = string.replace(/\?+/, substr);
            }

            if (isValidArrangement(string)) {
                arrangements++;
            }
        }

        sum += arrangements;
    }

    return sum;
}

function part2(input) {
    let sum = 0;

    // ...

    return sum;
}

module.exports = { title, part1, part2 };
