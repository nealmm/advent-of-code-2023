const { title, part1, part2 } = require('./solutions');

const example =
`...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

describe(title, () => {
    test('--- Part One ---', () => {
        expect(part1(example)).toBe(374);
    });

    test('--- Part Two ---', () => {
        expect(part2(example)).toBe(-1);
    });
});
