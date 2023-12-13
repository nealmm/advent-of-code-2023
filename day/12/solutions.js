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

    const memos = new Map();

    const count = (springs, groups) => {
        if (springs.length == 0) {
            if (groups.length == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }

        if (groups.length == 0) {
            if (springs.includes('#')) {
                return 0;
            }
            else {
                return 1;
            }
        }

        const key = springs + ' ' + groups.join(',');

        if (memos.has(key)) {
            return memos.get(key);
        }

        let result = 0;

        if (springs[0] === '.' || springs[0] === '?') {
            result += count(springs.substring(1), groups);
        }

        if (springs[0] === '#' || springs[0] === '?') {
            if (groups[0] <= springs.length && !springs.substring(0, groups[0]).includes('.') && (groups[0] == springs.length || springs[groups[0]] !== '#')) {
                result += count(springs.substring(groups[0] + 1), groups.slice(1));
            } 
        }

        memos.set(key, result);

        return result;
    };

    const data = input.split('\n').map(line => line.split(' '));

    for (row of data) {
        let [springs, groups] = [row[0], row[1]];

        for (let i = 0; i < 4; i++) {
            springs += '?' + row[0];
            groups += ',' + row[1];
        }

        groups = groups.split(',').map(n => parseInt(n));

        sum += count(springs, groups);
    }

    return sum;
}

module.exports = { title, part1, part2 };
