const { title, part1, part2 } = require('./solutions');

const example =
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

describe(title, () => {
    test('--- Part One ---', () => {
        expect(part1(example)).toBe(4361);
    });

    test('--- Part Two ---', () => {
        expect(part2(example)).toBe(467835);
    });
});
