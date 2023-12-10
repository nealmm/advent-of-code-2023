const title = '--- Day 1: XXXXX ---';

function part1(input) {
    let sum = 0;

    const grid = input.split('\n').map(x => x.split(''));

    let start;

    const nodes = [];
    const edges = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            nodes.push({ row: i, col: j });
        }
    }

    const pipesConnectingTo = ({ row, col }) => {
        const connecting = [];

        const up = grid[row - 1][col];
        const right = grid[row][col + 1];
        const down = grid[row + 1][col];
        const left = grid[row][col - 1];

        if (up === '|' || up === '7' || up === 'F') {
            connecting.push(nodes[(row - 1) * grid.length + col]);
        }

        if (right === '-' || right === '7' || right === 'J') {
            connecting.push(nodes[row * grid.length + (col + 1)]);
        }

        if (down === '|' || down === 'L' || down === 'J') {
            connecting.push(nodes[(row + 1) * grid.length + col]);
        }

        if (left === '-' || left === 'L' || left === 'F') {
            connecting.push(nodes[row * grid.length + (col - 1)]);
        }

        return connecting;
    };

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const node = nodes[i * grid.length + j];

            switch (grid[i][j]) {
                case '|':
                    edges.push(
                        { node1: node, node2: nodes[(i - 1) * grid.length + j] },
                        { node1: node, node2: nodes[(i + 1) * grid.length + j] }
                    );
                    break;

                case '-':
                    edges.push(
                        { node1: node, node2: nodes[i * grid.length + (j - 1)] },
                        { node1: node, node2: nodes[i * grid.length + (j + 1)] }
                    );
                    break;

                case 'L':
                    edges.push(
                        { node1: node, node2: nodes[(i - 1) * grid.length + j] },
                        { node1: node, node2: nodes[i * grid.length + (j + 1)] }
                    );
                    break;

                case 'J':
                    edges.push(
                        { node1: node, node2: nodes[(i - 1) * grid.length + j] },
                        { node1: node, node2: nodes[i * grid.length + (j - 1)] }
                    );
                    break;

                case '7':
                    edges.push(
                        { node1: node, node2: nodes[i * grid.length + (j - 1)] },
                        { node1: node, node2: nodes[(i + 1) * grid.length + j] }
                    );
                    break;

                case 'F':
                    edges.push(
                        { node1: node, node2: nodes[i * grid.length + (j + 1)] },
                        { node1: node, node2: nodes[(i + 1) * grid.length + j] }
                    );
                    break;

                case 'S':
                    start = node;

                    for (pipe of pipesConnectingTo(start)) {
                        edges.push({ node1: start, node2: pipe });
                    }

                    break;
            }
        }
    }

    const adjacentNodes = (node) => {
        return edges.filter(x => x.node1 == node).map(x => x.node2);
    };

    let current = [start];
    const visited = [start];
    const distances = [];
    let steps = 0;

    while (true) {
        const next = [];

        for (each of current) {
            const i = each.row * grid.length + each.col;

            if (distances[i] == undefined) {
                distances[i] = steps;
            }
            else {
                return distances[i];
            }

            next.push(...adjacentNodes(each).filter(x => !visited.includes(x)));
            visited.push(each);
        }

        current = next;
        steps++;
    }

    return sum;
}

function part2(input) {
    let sum = 0;

    // Let's go!

    return sum;
}

module.exports = { title, part1, part2 };
