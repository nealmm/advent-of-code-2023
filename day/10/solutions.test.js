const { title, part1, part2 } = require('./solutions');

const example1 =
`.....
.S-7.
.|.|.
.L-J.
.....`;

const example2 =
`FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

describe(title, () => {
    test('--- Part One ---', () => {
        expect(part1(example1)).toBe(4);
    });

    test('--- Part Two ---', () => {
        expect(part2(example2)).toBe(10);
    });
});
