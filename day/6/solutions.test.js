const { title, part1, part2 } = require('./solutions');

const example1 =
`Time:      7  15   30
Distance:  9  40  200`;

const example2 =
`Time:      71530
Distance:  940200`;

describe(title, () => {
    test('--- Part One ---', () => {
        expect(part1(example1)).toBe(288);
    });

    test('--- Part Two ---', () => {
        expect(part2(example2)).toBe(71503);
    });
});
