const { title, part1, part2 } = require('./solutions');

const example =
`O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

describe(title, () => {
    test('--- Part One ---', () => {
        expect(part1(example)).toBe(136);
    });

    test('--- Part Two ---', () => {
        expect(part2(example)).toBe(64);
    });
});
