const { title, part1, part2 } = require('./solutions');

const example =
`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

describe(title, () => {
    test('--- Part One ---', () => {
        expect(part1(example)).toBe(1320);
    });

    test('--- Part Two ---', () => {
        expect(part2(example)).toBe(145);
    });
});
