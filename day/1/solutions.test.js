const { title, part1, part2 } = require('./solutions');

const example1 =
`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const example2 =
`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

describe(title, () => {
    test('--- Part One ---', () => {
        expect(part1(example1)).toBe(142);
    });

    test('--- Part Two ---', () => {
        expect(part2(example2)).toBe(281);
    });
});
