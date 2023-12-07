const { title, part1, part2 } = require('./solutions');

const example =
`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

describe(title, () => {
    test('--- Part One ---', () => {
        expect(part1(example)).toBe(6440);
    });

    test('--- Part Two ---', () => {
        expect(part2(example)).toBe(5905);
    });
});
