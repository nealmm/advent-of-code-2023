const title = '--- Day 4: Scratchcards ---';

function part1(input) {
    let sum = 0;

    for (card of input.split('\n').map(x => x.split(': ')[1])) {
        const [winningNums, myNums] = card.split(' | ').map(y => y.match(/\d+/g));

        let score = 0;
        let foundFirst = false;

        for (n of myNums) {
            if (winningNums.includes(n)) {
                if (!foundFirst) {
                    score++;
                    foundFirst = true;
                }
                else {
                    score *= 2;
                }
            }
        }

        sum += score;
    }

    return sum;
}

function part2(input) {
    let sum = 0;

    const cards = input.split('\n').map(x => x.split(': ')[1]);

    const counts = {};

    for (let i = 0; i < cards.length; i++) {
        const [winningNums, myNums] = cards[i].split(' | ').map(y => y.match(/\d+/g));

        let matching = 0;

        for (n of myNums) {
            if (winningNums.includes(n)) {
                matching++;
            }
        }

        if (counts[i] == undefined) {
            counts[i] = 1;
        }

        for (let j = 0; j < matching; j++) {
            const key = i + j + 1;

            if (key < cards.length) {
                if (counts[key] != undefined) {
                    counts[key] += counts[i];
                }
                else {
                    counts[key] = counts[i] + 1;
                }
            }
        }

        sum += counts[i];
    }

    return sum;
}

module.exports = { title, part1, part2 };
