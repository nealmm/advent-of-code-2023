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
// 44631 (too high)
function part2(input) {
    let sum = 0;

    let patternCount = 0;
    for (pattern of input.split('\n\n')) {
        patternCount++;
        const tiles = pattern.split('\n').map(line => line.split(''));

        const flipTile = (row, col) => {
            switch (tiles[row][col]) {
                case '.':
                    tiles[row][col] = '#';
                    break;

                case '#':
                    tiles[row][col] = '.';
                    break;
            }
        };

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

        let horizLineOfRefl = undefined;
        let vertLineOfRefl = undefined;

        for (let i = 0; i < tiles.length - 1; i++) {
            if (rowsReflectAt(i)) {
                horizLineOfRefl = i;
                break;
            }
        }

        for (let i = 0; i < tiles[0].length - 1; i++) {
            if (colsReflectAt(i)) {
                vertLineOfRefl = i;
                break;
            }
        }

        // Now look for possible smudges

        let possibleSmudges = [];

        for (let i = 0; i < tiles.length - 1; i++) {
            const diffs = [];

            for (let j = 0; (0 <= i - j) && (i + j + 1 < tiles.length); j++) {
                const rowAbove = tiles[i - j];
                const rowBelow = tiles[i + j + 1];

                for (let k = 0; k < tiles[0].length; k++) {
                    if (rowAbove[k] !== rowBelow[k]) {
                        diffs.push({ row: i - j, col: k });
                        diffs.push({ row: i + j + 1, col: k });
                    }
                }
            }

            if (diffs.length == 2) {
                possibleSmudges = diffs;
            }
        }

        for (let i = 0; i < tiles[0].length - 1; i++) {
            const diffs = [];

            for (let j = 0; (0 <= i - j) && (i + j + 1 < tiles[0].length); j++) {
                const colLeft = tiles.map(row => row[i - j]);
                const colRight = tiles.map(row => row[i + j + 1]);

                for (let k = 0; k < tiles.length; k++) {
                    if (colLeft[k] !== colRight[k]) {
                        diffs.push({ row: k, col: i - j });
                        diffs.push({ row: k, col: i + j + 1 });
                    }
                }
            }

            if (diffs.length == 2) {
                possibleSmudges = diffs;
            }
        }

        let foundSmudge = false;

        for (point of possibleSmudges) {
            // console.log(`Testing tile (${point.row}, ${point.col})...`);

            flipTile(point.row, point.col);

            let newHorizLineOfRefl = undefined;

            for (let i = 0; i < tiles.length - 1; i++) {
                if (rowsReflectAt(i)) {
                    newHorizLineOfRefl = i;

                    if (i != horizLineOfRefl) {
                        break;
                    }
                }
            }

            let newVertLineOfRefl = undefined;

            for (let i = 0; i < tiles[0].length - 1; i++) {
                if (colsReflectAt(i)) {
                    newVertLineOfRefl = i;

                    if (i != vertLineOfRefl) {
                        break;
                    }
                }
            }

            // console.log(`\tOld horiz. line of refl. = ${horizLineOfRefl}`);
            // console.log(`\tNew horiz. line of refl. = ${newHorizLineOfRefl}`);
            // console.log(`\tOld vert. line of refl. = ${vertLineOfRefl}`);
            // console.log(`\tNew vert. line of refl. = ${newVertLineOfRefl}`);

            if (newHorizLineOfRefl != horizLineOfRefl || newVertLineOfRefl != vertLineOfRefl) {
                foundSmudge = true;
                // console.log(`Smudge found at tile (${point.row}, ${point.col})`)

                if (newHorizLineOfRefl != horizLineOfRefl) {
                    horizLineOfRefl = newHorizLineOfRefl;
                }
                else {
                    horizLineOfRefl = undefined;
                }

                if (newVertLineOfRefl != vertLineOfRefl) {
                    vertLineOfRefl = newVertLineOfRefl;
                }
                else {
                    vertLineOfRefl = undefined;
                }

                break;
            }
            else {
                flipTile(point.row, point.col);
            }
        }

        // if (!foundSmudge) {
        //     console.log(patternCount);
        // }
        if (patternCount == 14) {
            console.log(horizLineOfRefl);
            console.log(vertLineOfRefl);
            console.log(possibleSmudges);
        }

        if (vertLineOfRefl != undefined) {
            sum += vertLineOfRefl + 1;
        }

        if (horizLineOfRefl != undefined) {
            sum += 100 * (horizLineOfRefl + 1);
        }
    }

    return sum;
}

module.exports = { title, part1, part2 };
