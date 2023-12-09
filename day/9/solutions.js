const title = '--- Day 9: Mirage Maintenance ---';

function part1(input) {
    let sum = 0;

    const allZeros = nums => nums.map(n => n == 0).reduce((a, b) => a && b);

    for (line of input.split('\n')) {
        const sequences = [line.split(' ').map(x => parseInt(x))];

        let i = 0;

        while (!allZeros(sequences[i])) {
            const next = [];

            for (let j = 0; j < sequences[i].length - 1; j++) {
                next.push(sequences[i][j + 1] - sequences[i][j]);
            }

            sequences.push(next);
            i++;
        }

        for (let k = sequences.length - 2; k >= 0; k--) {
            const current = sequences[k];
            const below = sequences[k + 1];

            const extra = current[current.length - 1] + below[below.length - 1];

            current.push(extra);

            if (k == 0) {
                sum += extra;
            }
        }
    }

    return sum;
}

function part2(input) {
    let sum = 0;

    const allZeros = nums => nums.map(n => n == 0).reduce((a, b) => a && b);

    const data = input.split('\n').map(x => x.split(' ').map(y => parseInt(y)));

    for (let i = 0; i < data.length; i++) {
        const sequences = [data[i]];

        let j = 0;

        while (!allZeros(sequences[j])) {
            const next = [];

            for (let k = 0; k < sequences[j].length - 1; k++) {
                next.push(sequences[j][k + 1] - sequences[j][k]);
            }

            sequences.push(next);
            j++;
        }

        for (let k = sequences.length - 2; k >= 0; k--) {
            const seq = sequences[k];
            const below = sequences[k + 1];

            const extra = seq[0] - below[0];

            seq.splice(0, 0, extra);

            if (k == 0) {
                sum += extra;
            }
        }
    }

    return sum;
}

module.exports = { title, part1, part2 };
