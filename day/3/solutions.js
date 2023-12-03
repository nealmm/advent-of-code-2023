const title = '--- Day 3: Gear Ratios ---';

function part1(input) {
    let sum = 0;

    const lines = input.split('\n');
    const grid = lines.map(x => x.split(''));

    const isSymbol = char => char.match(/\d|\./) == null;

    const adjacentToSymbol = (row, col) => {
        let adjacent = false;

        const firstRow = row == 0;
        const lastRow = row == grid.length - 1;

        const firstCol = col == 0;
        const lastCol = col == grid[row].length - 1;

        // top-left corner
        if (!firstRow && !firstCol) {
            adjacent ||= isSymbol(grid[row - 1][col - 1]);
        }

        // directly above
        if (!firstRow) {
            adjacent ||= isSymbol(grid[row - 1][col]);
        }

        // top-right corner
        if (!firstRow && !lastCol) {
            adjacent ||= isSymbol(grid[row - 1][col + 1]);
        }

        // directly left
        if (!firstCol) {
            adjacent ||= isSymbol(grid[row][col - 1]);
        }

        // directly right
        if (!lastCol) {
            adjacent ||= isSymbol(grid[row][col + 1]);
        }

        // bottom-left corner
        if (!lastRow && !firstCol) {
            adjacent ||= isSymbol(grid[row + 1][col - 1]);
        }

        // directly below
        if (!lastRow) {
            adjacent ||= isSymbol(grid[row + 1][col]);
        }

        // bottom-right corner
        if (!lastRow && !lastCol) {
            adjacent ||= isSymbol(grid[row + 1][col + 1]);
        }

        return adjacent;
    }

    lines.forEach((ln, row) => {
        Array.from(ln.matchAll(/\d+/g), match => {
            const col = match.index;
            const len = match[0].length;
            const val = parseInt(match[0]);

            for (let i = col; i < col + len; i++) {
                if (adjacentToSymbol(row, i)) {
                    sum += val;
                    break;
                }
            }
        });
    });

    return sum;
}

function part2(input) {
    let sum = 0;

    const lines = input.split('\n');
    const grid = lines.map(x => x.split(''));

    const isStar = char => char === '*';

    const adjacentStar = (row, col) => {
        let star = undefined;

        const firstRow = row == 0;
        const lastRow = row == grid.length - 1;

        const firstCol = col == 0;
        const lastCol = col == grid[row].length - 1;

        // top-left corner
        if (!firstRow && !firstCol) {
            if (isStar(grid[row - 1][col - 1])) {
                star = {
                    row: row - 1,
                    col: col - 1
                };
            }
        }

        // directly above
        if (!firstRow) {
            if (isStar(grid[row - 1][col])) {
                star = {
                    row: row - 1,
                    col: col
                };
            }
        }

        // top-right corner
        if (!firstRow && !lastCol) {
            if (isStar(grid[row - 1][col + 1])) {
                star = {
                    row: row - 1,
                    col: col + 1
                };
            }
        }

        // directly left
        if (!firstCol) {
            if (isStar(grid[row][col - 1])) {
                star = {
                    row: row,
                    col: col - 1
                };
            }
        }

        // directly right
        if (!lastCol) {
            if (isStar(grid[row][col + 1])) {
                star = {
                    row: row,
                    col: col + 1
                };
            }
        }

        // bottom-left corner
        if (!lastRow && !firstCol) {
            if (isStar(grid[row + 1][col - 1])) {
                star = {
                    row: row + 1,
                    col: col - 1
                };
            }
        }

        // directly below
        if (!lastRow) {
            if (isStar(grid[row + 1][col])) {
                star = {
                    row: row + 1,
                    col: col
                };
            }
        }

        // bottom-right corner
        if (!lastRow && !lastCol) {
            if (isStar(grid[row + 1][col + 1])) {
                star = {
                    row: row + 1,
                    col: col + 1
                };
            }
        }

        return star;
    }

    const numsAdjacentToStars = [];

    lines.forEach((ln, row) => {
        Array.from(ln.matchAll(/\d+/g), match => {
            const col = match.index;
            const len = match[0].length;
            const val = parseInt(match[0]);

            for (let i = col; i < col + len; i++) {
                const star = adjacentStar(row, i);

                if (star != undefined) {
                    numsAdjacentToStars.push({ val, star });
                    break;
                }
            }
        });
    });

    for (let i = 0; i < numsAdjacentToStars.length; i++) {
        const first = numsAdjacentToStars[i];

        for (let j = i + 1; j < numsAdjacentToStars.length; j++) {
            const second = numsAdjacentToStars[j];

            if (first.star.row == second.star.row && first.star.col == second.star.col) {
                sum += first.val * second.val;
                break;
            }
        }
    }

    return sum;
}

module.exports = { title, part1, part2 };
