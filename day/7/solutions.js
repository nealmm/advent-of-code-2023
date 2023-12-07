const title = '--- Day 7: Camel Cards ---';

function part1(input) {
    const strength = { '2': 0, '3': 1, '4': 2, '5': 3,
                       '6': 4, '7': 5, '8': 6, '9': 7,
                       'T': 8, 'J': 9, 'Q': 10, 'K': 11,
                       'A': 12 };

    const FIVE_OF_A_KIND  = 6;
    const FOUR_OF_A_KIND  = 5;
    const FULL_HOUSE      = 4;
    const THREE_OF_A_KIND = 3;
    const TWO_PAIR        = 2;
    const ONE_PAIR        = 1;
    const HIGH_CARD       = 0;

    const typeOfHand = cards => {
        const counts = {};

        for (card of cards) {
            if (counts[card] != undefined) {
                counts[card]++;
            }
            else {
                counts[card] = 1;
            }
        }

        switch (Object.keys(counts).length) {
            case 1:
                return FIVE_OF_A_KIND;

            case 2:
                for (id in counts) {
                    if (counts[id] == 1 || counts[id] == 4) {
                        return FOUR_OF_A_KIND;
                    }
                    else {
                        return FULL_HOUSE;
                    }
                }
                
            case 3:
                for (id in counts) {
                    if (counts[id] == 3) {
                        return THREE_OF_A_KIND;
                    }

                    if (counts[id] == 2) {
                        return TWO_PAIR;
                    }
                }

            case 4:
                return ONE_PAIR;

            case 5:
                return HIGH_CARD;
        }
    };

    const byType = (a, b) => {
        if (a.type < b.type) {
            return -1;
        }

        if (a.type > b.type) {
            return 1;
        }

        for (let i = 0; i < 5; i++) {
            if (strength[a.cards[i]] < strength[b.cards[i]]) {
                return -1;
            }

            if (strength[a.cards[i]] > strength[b.cards[i]]) {
                return 1;
            }
        }
    };

    const data = input.split('\n').map(x => x.split(' '));

    const hands = [];

    for (let i = 0; i < data.length; i++) {
        const cards = data[i][0].match(/(A|K|Q|J|T|\d)/g);
        const bid = parseInt(data[i][1]);
        const type = typeOfHand(cards);

        hands.push({ cards, bid, type });
    }

    hands.sort(byType);

    let sum = 0;

    for (let i = 0; i < hands.length; i++) {
        const rank = i + 1;
        sum += rank * hands[i].bid;
    }

    return sum;
}

// 249560275 too high
// 249980637 too high
// 248781813 correct
function part2(input) {
    let sum = 0;

    let data = input.split('\n').map(x => x.split(' '));

    const hands = [];

    const strength = card => {
        return ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'].reverse().indexOf(card);
    };

    const typeOfHand = cards => {
        const counts = {};

        for (card of cards) {
            if (counts[card] != undefined) {
                counts[card]++;
            }
            else {
                counts[card] = 1;
            }
        }

        // if (counts['J'] != undefined) {
        //     let pairs = 0;

        //     for (card of cards) {
        //         if (card !== 'J' && counts[card] == 2) {
        //             pairs++;
        //         }
        //     }

        //     if (pairs == 2) {
        //         _2pairsWithJ++;
        //     }
        // }

        if (counts['J'] != undefined) {
            let jokers = counts['J'];

            if (jokers == 5 || jokers == 4) {
                return 7;
            }
            else if (jokers == 3) {
                for (id in counts) {
                    if (id !== 'J' && counts[id] == 2) {
                        return 7;
                    }
                }

                return 6;
            }
            else if (jokers == 2) {
                for (id in counts) {
                    if (id !== 'J' && counts[id] == 3) {
                        return 7;
                    }
                }

                for (id in counts) {
                    if (id !== 'J' && counts[id] == 2) {
                        return 6;
                    }
                }

                return 4;
            }
            else if (jokers == 1) {
                for (id in counts) {
                    if (id !== 'J' && counts[id] == 4) {
                        return 7;
                    }
                }

                for (id in counts) {
                    if (id !== 'J' && counts[id] == 3) {
                        return 6;
                    }
                }

                let pairs = 0;

                for (id in counts) {
                    if (id !== 'J' && counts[id] == 2) {
                        pairs++;
                    }
                }

                if (pairs == 2) {
                    return 5;
                }
                else if (pairs == 1) {
                    return 4;
                }

                return 2;
            }
        }

        switch (Object.keys(counts).length) {
            case 5:
                return 1;

            case 4:
                return 2;

            case 1:
                return 7;

            case 2:
                for (card of cards) {
                    if (counts[card] == 4) {
                        return 6;
                    }
                }

                return 5;

            case 3:
                for (card of cards) {
                    if (counts[card] == 3) {
                        return 4;
                    }
                }

                return 3;
        }
    };

    const byType = (a, b) => {
        if (a.type !== b.type) {
            if (a.type > b.type) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else {
            for (let i = 0; i < 5; i++) {
                if (strength(a.cards[i]) > strength(b.cards[i])) {
                    return 1;
                }

                if (strength(a.cards[i]) < strength(b.cards[i])) {
                    return -1;
                }
            }
        }
    };

    for (let i = 0; i < data.length; i++) {
        const cards = data[i][0].match(/(A|K|Q|J|T|\d)/g);
        const bid = parseInt(data[i][1]);
        const type = typeOfHand(cards);

        hands.push({ cards, bid, type });
    }

    hands.sort(byType);

    for (let i = 0; i < hands.length; i++) {
        sum += (i + 1) * hands[i].bid;
    }

    return sum;
}

module.exports = { title, part1, part2 };
