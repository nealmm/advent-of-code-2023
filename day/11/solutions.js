const title = '--- Day 11: Cosmic Expansion ---';

function part1(input) {
    const tiles = input.split('\n').map(line => line.split(''));

    const emptyRows = [];
    const emptyCols = [];

    for (let row = 0; row < tiles.length; row++) {
        let rowIsEmpty = true;

        for (let col = 0; col < tiles[0].length; col++) {
            if (tiles[row][col] === '#') {
                rowIsEmpty = false;
                break;
            }
        }

        if (rowIsEmpty) {
            emptyRows.push(row);
        }
    }

    for (let col = 0; col < tiles[0].length; col++) {
        let colIsEmpty = true;

        for (let row = 0; row < tiles.length; row++) {
            if (tiles[row][col] === '#') {
                colIsEmpty = false;
                break;
            }
        }

        if (colIsEmpty) {
            emptyCols.push(col);
        }
    }

    for (let i = 0; i < emptyCols.length; i++) {
        for (row of tiles) {
            row.splice(emptyCols[i] + i, 0, '.');
        }
    }

    for (let i = 0; i < emptyRows.length; i++) {
        tiles.splice(emptyRows[i] + i, 0, tiles[emptyRows[i] + i]);
    }

    const galaxyCoords = [];

    for (let row = 0; row < tiles.length; row++) {
        for (let col = 0; col < tiles[0].length; col++) {
            if (tiles[row][col] === '#') {
                galaxyCoords.push({ row, col });
            }
        }
    }

    const distance = (a, b) => {
        const dx = Math.abs(b.col - a.col);
        const dy = Math.abs(b.row - a.row);

        return dx + dy;
    };

    let sum = 0;

    for (let i = 0; i < galaxyCoords.length; i++) {
        for (let j = 1; j < galaxyCoords.length - i; j++) {
            const a = galaxyCoords[i];
            const b = galaxyCoords[j + i];

            sum += distance(a, b);
        }
    }

    return sum;
}

function part2(input) {
    const tiles = input.split('\n').map(line => line.split(''));

    const emptyRows = [];
    const emptyCols = [];

    for (let row = 0; row < tiles.length; row++) {
        let rowIsEmpty = true;

        for (let col = 0; col < tiles[0].length; col++) {
            if (tiles[row][col] === '#') {
                rowIsEmpty = false;
                break;
            }
        }

        if (rowIsEmpty) {
            emptyRows.push(row);
        }
    }

    for (let col = 0; col < tiles[0].length; col++) {
        let colIsEmpty = true;

        for (let row = 0; row < tiles.length; row++) {
            if (tiles[row][col] === '#') {
                colIsEmpty = false;
                break;
            }
        }

        if (colIsEmpty) {
            emptyCols.push(col);
        }
    }

    const galaxyCoords = [];

    for (let row = 0; row < tiles.length; row++) {
        for (let col = 0; col < tiles[0].length; col++) {
            if (tiles[row][col] === '#') {
                galaxyCoords.push({ row, col });
            }
        }
    }

    const distance = (a, b) => {
        let emptyRowsBetween = 0;
        let emptyColsBetween = 0;

        for (index of emptyRows) {
            if (a.row < index && index < b.row || b.row < index && index < a.row) {
                emptyRowsBetween++;
            }
        }

        for (index of emptyCols) {
            if (a.col < index && index < b.col || b.col < index && index < a.col) {
                emptyColsBetween++;
            }
        }

        const dx = Math.abs(b.col - a.col) + 999999 * emptyColsBetween;
        const dy = Math.abs(b.row - a.row) + 999999 * emptyRowsBetween;

        return dx + dy;
    };

    let sum = 0;

    for (let i = 0; i < galaxyCoords.length; i++) {
        for (let j = 1; j < galaxyCoords.length - i; j++) {
            const a = galaxyCoords[i];
            const b = galaxyCoords[j + i];

            sum += distance(a, b);
        }
    }

    return sum;
}

module.exports = { title, part1, part2 };
