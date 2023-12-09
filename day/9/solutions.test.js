const { title, part1, part2 } = require('./solutions');

const example =
`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

describe(title, () => {
    test('--- Part One ---', () => {
        expect(part1(example)).toBe(114);
    });

    test('--- Part Two ---', () => {
        expect(part2(example)).toBe(2);
    });
});
