const title = '--- Day 1: Trebuchet?! ---';

function part1(input) {
    let sum = 0;

    for (line of input.split('\n')) {
        const digits = line.match(/\d/g);

        if (digits !== null) {
            const first = digits[0];
            const last  = digits[digits.length - 1];

            sum += parseInt(`${first}${last}`);
        }
    }

    return sum;
}

function part2(input) {
    let sum = 0;

    const mapToDigit = {
        'one': '1', 'two': '2', 'three': '3',
        'four': '4', 'five': '5', 'six': '6',
        'seven': '7', 'eight': '8', 'nine': '9'
    };

    const pattern = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

    for (line of input.split('\n')) {
        const digits = Array.from(line.matchAll(pattern), x => x[1]);

        if (digits.length > 0) {
            let first = digits[0];
            let last  = digits[digits.length - 1];

            if (!first.match(/\d/)) {
                first = mapToDigit[first];
            }

            if (!last.match(/\d/)) {
                last = mapToDigit[last];
            }

            sum += parseInt(`${first}${last}`);
        }
    }

    return sum;
}

module.exports = { title, part1, part2 };
