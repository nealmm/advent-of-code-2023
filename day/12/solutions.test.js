const { title, part1, part2 } = require('./solutions');

const example =
`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

describe(title, () => {
    test('--- Part One ---', () => {
        expect(part1(example)).toBe(21);
    });

    test('--- Part Two ---', () => {
        expect(part2(example)).toBe(525152);
    });
});
