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

function part2(input) {
    const strength = { 'J': 0, '2': 1, '3': 2, '4': 3,
                       '5': 4, '6': 5, '7': 6, '8': 7,
                       '9': 8, 'T': 9, 'Q': 10, 'K': 11,
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

        if (counts['J'] != undefined) {
            switch (counts['J']) {
                case 5:
                    return FIVE_OF_A_KIND;

                case 4:
                    return FIVE_OF_A_KIND;

                case 3:
                    for (id in counts) {
                        if (counts[id] == 2) {
                            return FIVE_OF_A_KIND;
                        }
                    }

                    return FOUR_OF_A_KIND;

                case 2:
                    for (id in counts) {
                        if (counts[id] == 3) {
                            return FIVE_OF_A_KIND;
                        }

                        if (id !== 'J' && counts[id] == 2) {
                            return FOUR_OF_A_KIND;
                        }
                    }

                    return THREE_OF_A_KIND;

                case 1:
                    let pairs = 0;

                    for (id in counts) {
                        if (counts[id] == 4) {
                            return FIVE_OF_A_KIND;
                        }

                        if (counts[id] == 3) {
                            return FOUR_OF_A_KIND;
                        }

                        if (counts[id] == 2) {
                            pairs++;
                        }
                    }

                    if (pairs == 2) {
                        return FULL_HOUSE;
                    }

                    if (pairs == 1) {
                        return THREE_OF_A_KIND;
                    }

                    return ONE_PAIR;
            }
        }
        else {
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

module.exports = { title, part1, part2 };
