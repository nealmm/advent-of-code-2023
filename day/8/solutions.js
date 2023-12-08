const { lcm } = require('mathjs');

const title = '--- Day 8: XXXXX ---';

function part1(input) {
    let sum = 0;

    const data = input.split('\n\n').map(x => x.split('\n'));

    const instructions = data[0][0].split('');

    const nodes = {};

    for (let i = 0; i < data[1].length; i++) {
        const matches = data[1][i].match(/(\w\w\w)/g);

        const id = matches[0];
        const left = matches[1];
        const right = matches[2];

        const node = { left, right };

        nodes[id] = node;
    }

    let id = 'AAA';
    let i = 0;
    while (id !== 'ZZZ') {
        if (instructions[i] === 'L') {
            id = nodes[id].left;
        }
        else if(instructions[i] === 'R') {
            id = nodes[id].right;
        }

        sum++;
        i = (i + 1) % instructions.length;
    }

    return sum;
}

function part2(input) {
    let sum = 0;

    const data = input.split('\n\n').map(x => x.split('\n'));

    const instructions = data[0][0].split('');

    const nodes = {};

    let roots = [];

    for (let i = 0; i < data[1].length; i++) {
        const matches = data[1][i].match(/(\w\w\w)/g);

        const id = matches[0];
        const left = matches[1];
        const right = matches[2];

        const node = { left, right };

        if (id.match(/\w\wA/) != null) {
            roots.push(id);
        }

        nodes[id] = node;
    }

    const lengths = [];

    for (let j = 0; j < roots.length; j++) {
        let current = roots[j];
        let i = 0;
        let steps = 0;

        while (current.match(/\w\wZ/) === null) {
            if (instructions[i] === 'L') {
                current = nodes[current].left;
            }
            else if(instructions[i] === 'R') {
                current = nodes[current].right;
            }

            i = (i + 1) % instructions.length;

            steps++;
        }

        lengths.push(steps);
    }

    return lcm(...lengths);

    // let i = 0;

    // while (roots.map(x => x.match(/\w\wZ/) === null).reduce((a, b) => a || b)) {
    //     for (let j = 0; j < roots.length; j++) {
    //         let id = roots[j];

    //         if (instructions[i] === 'L') {
    //             roots[j] = nodes[id].left;
    //         }
    //         else if(instructions[i] === 'R') {
    //             roots[j] = nodes[id].right;
    //         }
    //     }

    //     sum++;
    //     i = (i + 1) % instructions.length;
    // }

    return sum;
}

module.exports = { title, part1, part2 };
