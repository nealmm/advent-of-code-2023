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
    let sum = 0;

    // ...

    return sum;
}

module.exports = { title, part1, part2 };
