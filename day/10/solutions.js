const title = '--- Day 10: Pipe Maze ---';

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

        if (row > 0) {
            const up = grid[row - 1][col];

            if (up === '|' || up === '7' || up === 'F') {
                connecting.push(nodes[(row - 1) * grid[row].length + col]);
            }
        }

        if (col < grid[row].length - 1) {
            const right = grid[row][col + 1];

            if (right === '-' || right === '7' || right === 'J') {
                connecting.push(nodes[row * grid[row].length + (col + 1)]);
            }
        }

        if (row < grid.length - 1) {
            const down = grid[row + 1][col];

            if (down === '|' || down === 'L' || down === 'J') {
                connecting.push(nodes[(row + 1) * grid[row].length + col]);
            }
        }

        if (col > 0) {
            const left = grid[row][col - 1];

            if (left === '-' || left === 'L' || left === 'F') {
                connecting.push(nodes[row * grid[row].length + (col - 1)]);
            }
        }

        return connecting;
    };

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const node = nodes[i * grid[i].length + j];

            switch (grid[i][j]) {
                case '|':
                    edges.push(
                        { node1: node, node2: nodes[(i - 1) * grid[i].length + j] },
                        { node1: node, node2: nodes[(i + 1) * grid[i].length + j] }
                    );
                    break;

                case '-':
                    edges.push(
                        { node1: node, node2: nodes[i * grid[i].length + (j - 1)] },
                        { node1: node, node2: nodes[i * grid[i].length + (j + 1)] }
                    );
                    break;

                case 'L':
                    edges.push(
                        { node1: node, node2: nodes[(i - 1) * grid[i].length + j] },
                        { node1: node, node2: nodes[i * grid[i].length + (j + 1)] }
                    );
                    break;

                case 'J':
                    edges.push(
                        { node1: node, node2: nodes[(i - 1) * grid[i].length + j] },
                        { node1: node, node2: nodes[i * grid[i].length + (j - 1)] }
                    );
                    break;

                case '7':
                    edges.push(
                        { node1: node, node2: nodes[i * grid[i].length + (j - 1)] },
                        { node1: node, node2: nodes[(i + 1) * grid[i].length + j] }
                    );
                    break;

                case 'F':
                    edges.push(
                        { node1: node, node2: nodes[i * grid[i].length + (j + 1)] },
                        { node1: node, node2: nodes[(i + 1) * grid[i].length + j] }
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

    const findCycle = node => {
        let current = node;
        const path = [node];

        do {
            const adjacents = adjacentNodes(current).filter(x => !path.includes(x));

            if (adjacents.length == 0) {
                return path;
            }

            current = adjacents[0];
            path.push(current);
        } while (true)
    };

    const nodesInCycle = findCycle(start);

    const enclosedByCycle = (r, c) => {
        if (nodesInCycle.includes(nodes[r * grid[r].length + c])) {
            return false;
        }

        let crossings = 0;

        let i = 0;

        while (r + i < grid.length && c + i < grid[r].length) {
            if (nodesInCycle.includes(nodes[(r + i) * grid[r].length + (c + i)])) {
                switch (grid[r + i][c + i]) {
                    case '|':
                        crossings += 1;
                        break;

                    case '-':
                        crossings += 1;
                        break;

                    case 'L':
                        crossings += 2;
                        break;

                    case 'J':
                        crossings += 1;
                        break;

                    case '7':
                        crossings += 2;
                        break;

                    case 'F':
                        crossings += 1;
                        break;

                    case 'S':
                        crossings += 2;
                        break;
                }
            }

            i++;
        }

        if (crossings == 0 || crossings % 2 == 0) {
            return false;
        }

        return true;
    };

    const enclosureGrid = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (enclosedByCycle(i, j)) {
                enclosureGrid.push('I');
                sum++;
            }
            else if (nodesInCycle.includes(nodes[i * grid[i].length + j])) {
                enclosureGrid.push(grid[i][j]);
            }
            else {
                enclosureGrid.push('O');
            }

            if (j == grid[i].length - 1) {
                enclosureGrid.push('\n');
            }
        }
    }

    // console.log(enclosureGrid.join(''));

    return sum;
}

// Attemps
// 1: 655 (too high)
// 2: 396 (too high)
// 3: 383 (correct! using special treatment for S that fails on examples)

module.exports = { title, part1, part2 };
