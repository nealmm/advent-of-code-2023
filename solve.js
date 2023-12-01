const util = require('node:util');
const fs   = require('node:fs');

const options = {
    day: {
        type: 'string',
        short: 'd'
    },

    part: {
        type: 'string',
        short: 'p'
    }
};

const { values: { day, part } } = util.parseArgs({ options });

const { title, part1, part2 } = require(`./day/${day}/solutions`);

const input = fs.readFileSync(`./day/${day}/input.txt`, 'utf-8');

console.log(title);

switch (part) {
    case '1':
        console.log('--- Part One ---');
        console.log(part1(input));
        break;

    case '2':
        console.log('--- Part Two ---');
        console.log(part2(input));
        break;
}
