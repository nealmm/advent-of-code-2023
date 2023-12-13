const title = '--- Day 13: Point of Incidence ---';

function part1(input) {
    let sum = 0;

    for (pattern of input.split('\n\n')) {
        const tiles = pattern.split('\n').map(line => line.split(''));

        const rowsReflectAt = (index) => {
            for (let i = 0; (0 <= index - i) && (index + i + 1 < tiles.length); i++) {
                const rowAbove = tiles[index - i].join('');
                const rowBelow = tiles[index + i + 1].join('');

                if (rowAbove !== rowBelow) {
                    return false;
                }
            }

            return true;
        };

        const colsReflectAt = (index) => {
            for (let i = 0; (0 <= index - i) && (index + i + 1 < tiles[0].length); i++) {
                const colLeft = tiles.map(row => row[index - i]).join('');
                const colRight = tiles.map(row => row[index + i + 1]).join('');

                if (colLeft !== colRight) {
                    return false;
                }
            }

            return true;
        };

        const horizLinesOfRefl = [];
        const vertLinesOfRefl = [];

        for (let i = 0; i < tiles.length - 1; i++) {
            if (rowsReflectAt(i)) {
                horizLinesOfRefl.push(i);
            }
        }

        for (let i = 0; i < tiles[0].length - 1; i++) {
            if (colsReflectAt(i)) {
                vertLinesOfRefl.push(i);
            }
        }

        for (vlr of vertLinesOfRefl) {
            sum += vlr + 1;
        }

        for (hlr of horizLinesOfRefl) {
            sum += 100 * (hlr + 1);
        }
    }

    return sum;
}

// 34155 (too low)
function part2(input) {
    let sum = 0;

    for (pattern of input.split('\n\n')) {
        const tiles = pattern.split('\n').map(line => line.split(''));

        let foundSmudge = false;

        const rowsReflectAt = (index) => {
            let diffs = [];

            for (let i = 0; (0 <= index - i) && (index + i + 1 < tiles.length); i++) {
                const rowAbove = tiles[index - i].join('');
                const rowBelow = tiles[index + i + 1].join('');

                for (let j = 0; j < tiles.length; j++) {
                    if (rowAbove[j] !== rowBelow[j]) {
                        diffs.push({ row: index - i, col: j });
                    }
                }
            }

            if (diffs.length == 1 && !foundSmudge) {
                foundSmudge = true;


            }

            if (diffs.length == 0 || diffs.length > 1) {
                return false;
            }

            return true;
        };

        const colsReflectAt = (index) => {
            let diffs = [];

            for (let i = 0; (0 <= index - i) && (index + i + 1 < tiles[0].length); i++) {
                const colLeft = tiles.map(row => row[index - i]).join('');
                const colRight = tiles.map(row => row[index + i + 1]).join('');

                for (let j = 0; j < tiles.length; j++) {
                    if (colLeft[j] !== colRight[j]) {
                        diffs.push({ row: j, col: index - i });
                    }
                }
            }

            if (diffs.length == 1 && !foundSmudge) {
                foundSmudge = true;
            }

            if (diffs.length == 0 || diffs.length > 1) {
                return false;
            }

            return true;
        };

        const horizLinesOfRefl = [];
        const vertLinesOfRefl = [];

        for (let i = 0; i < tiles.length - 1; i++) {
            if (rowsReflectAt(i)) {
                horizLinesOfRefl.push(i);
            }
        }

        for (let i = 0; i < tiles[0].length - 1; i++) {
            if (colsReflectAt(i)) {
                vertLinesOfRefl.push(i);
            }
        }

        for (vlr of vertLinesOfRefl) {
            sum += vlr + 1;
        }

        for (hlr of horizLinesOfRefl) {
            sum += 100 * (hlr + 1);
        }
    }

    return sum;
}

module.exports = { title, part1, part2 };
