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

        if (vertLineOfRefl != undefined) {
            sum += vertLineOfRefl + 1;
        }

        if (horizLineOfRefl != undefined) {
            sum += 100 * (horizLineOfRefl + 1);
        }
    }

    return sum;
}

function part2(input) {
    let sum = 0;

    for (pattern of input.split('\n\n')) {
        const tiles = pattern.split('\n').map(line => line.split(''));

        const differenceBetweenRows = (i, j) => {
            let difference = 0;

            for (let k = 0; k < tiles[0].length; k++) {
                if (tiles[i][k] !== tiles[j][k]) {
                    difference++;
                }
            }

            return difference;
        };

        const differenceBetweenCols = (i, j) => {
            let difference = 0;

            for (let k = 0; k < tiles.length; k++) {
                if (tiles[k][i] !== tiles[k][j]) {
                    difference++;
                }
            }

            return difference;
        };

        let horizLineOfRefl = undefined;
        let vertLineOfRefl = undefined;

        for (let i = 0; i < tiles.length - 1; i++) {
            let totalDifference = 0;

            for (let j = 0; (0 <= i - j) && (i + j + 1 < tiles.length); j++) {
                totalDifference += differenceBetweenRows(i - j, i + j + 1);
            }

            if (totalDifference == 1) {
                horizLineOfRefl = i;
            }
        }

        for (let i = 0; i < tiles[0].length - 1; i++) {
            let totalDifference = 0;

            for (let j = 0; (0 <= i - j) && (i + j + 1 < tiles[0].length); j++) {
                totalDifference += differenceBetweenCols(i - j, i + j + 1);
            }

            if (totalDifference == 1) {
                vertLineOfRefl = i;
            }
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
