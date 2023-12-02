const title = '--- Day 2: Cube Conundrum ---';

function part1(input) {
    let sum = 0;

    const games = input.split('\n')
                       .map(x => x.split(': ')[1]
                       .split('; ')
                       .map(y => y.split(', ')));

    const totalOf = {
        red: 12,
        green: 13,
        blue: 14
    };

    for (let i = 0; i < games.length; i++) {
        let possible = true;

        for (set of games[i]) {
            if (!possible) {
                break;
            }

            for (entry of set) {
                const matches = entry.match(/(\d+) (red|green|blue)/);

                const quantity = parseInt(matches[1]);
                const color = matches[2];

                if (quantity > totalOf[color]) {
                    possible = false;
                    break;
                }
            }
        }

        if (possible) {
            sum += i + 1;
        }
    }

    return sum;
}

function part2(input) {
    let sum = 0;

    const games = input.split('\n')
                       .map(x => x.split(': ')[1]
                       .split('; ')
                       .map(y => y.split(', ')));

    for (game of games) {
        const minimumOf = {
            red: 0,
            green: 0,
            blue: 0
        };

        for (set of game) {
            for (count of set) {
                const matches = count.match(/(\d+) (red|green|blue)/);

                const quantity = parseInt(matches[1]);
                const color = matches[2];

                if (quantity > minimumOf[color]) {
                    minimumOf[color] = quantity;
                }
            }
        }

        sum += minimumOf.red * minimumOf.green * minimumOf.blue;
    }

    return sum;
}

module.exports = { title, part1, part2 };
