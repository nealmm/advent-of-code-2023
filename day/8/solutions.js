const { lcm } = require('mathjs');

const title = '--- Day 8: Haunted Wasteland ---';

function part1(input) {
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

    let current = 'AAA';
    let steps = 0;
    let i = 0;

    while (current !== 'ZZZ') {
        switch (instructions[i]) {
            case 'L':
                current = nodes[current].left;
                break;

            case 'R':
                current = nodes[current].right;
                break;
        }

        steps++;
        i = (i + 1) % instructions.length;
    }

    return steps;
}

function part2(input) {
    const data = input.split('\n\n').map(x => x.split('\n'));

    const instructions = data[0][0].split('');

    const nodes = {};
    const starting = [];

    for (let i = 0; i < data[1].length; i++) {
        const matches = data[1][i].match(/(\w\w\w)/g);

        const id = matches[0];
        const left = matches[1];
        const right = matches[2];

        const node = { left, right };

        if (id.match(/\w\wA/) != null) {
            starting.push(id);
        }

        nodes[id] = node;
    }

    const pathLengths = [];

    for (let j = 0; j < starting.length; j++) {
        let current = starting[j];
        let steps = 0;
        let i = 0;

        while (current.match(/\w\wZ/) === null) {
            switch (instructions[i]) {
                case 'L':
                    current = nodes[current].left;
                    break;

                case 'R':
                    current = nodes[current].right;
                    break;
            }

            steps++;
            i = (i + 1) % instructions.length;
        }

        pathLengths.push(steps);
    }

    return lcm(...pathLengths);
}

module.exports = { title, part1, part2 };
