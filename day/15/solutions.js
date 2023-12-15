const title = '--- Day 15: Lens Library ---';

function part1(input) {
    let sum = 0;

    const hash = (str) => {
        let current = 0;

        for (let i = 0; i < str.length; i++) {
            current += str.charCodeAt(i);
            current *= 17;
            current %= 256;
        }

        return current;
    };

    const initSeq = input.split(',');

    for (step of initSeq) {
        sum += hash(step);
    }

    return sum;
}

function part2(input) {
    let sum = 0;

    const hash = (str) => {
        let current = 0;

        for (let i = 0; i < str.length; i++) {
            current += str.charCodeAt(i);
            current *= 17;
            current %= 256;
        }

        return current;
    };

    const boxes = new Map();

    const initSeq = input.split(',');

    for (step of initSeq) {
        const matched = step.match(/(\w+)(=\d|-)/);

        const label = matched[1];
        const op    = matched[2];

        let box = boxes.get(hash(label));

        if (op === '-') {
            if (box != undefined) {
                let index = undefined;

                for (let i = 0; i < box.length; i++) {
                    if (box[i].label === label) {
                        index = i;
                        break;
                    }
                }

                if (index != undefined) {
                    box.splice(index, 1);
                }
            }
        }
        else {
            const focalLength = parseInt(op.match(/=(\d)/)[1]);

            const lens = { label, focalLength };

            if (box == undefined) {
                boxes.set(hash(label), [lens])
            }
            else {
                let foundSameLabel = false;

                for (let i = 0; i < box.length; i++) {
                    if (box[i].label === label) {
                        foundSameLabel = true;
                        box[i] = lens;
                        break;
                    }
                }

                if (!foundSameLabel) {
                    box.push(lens);
                }
            }
        }
    }

    for (box of boxes) {
        let boxNum = box[0];

        for (let i = 0; i < box[1].length; i++) {
            sum += (boxNum + 1) * (i + 1) * box[1][i].focalLength;
        }
    }

    return sum;
}

module.exports = { title, part1, part2 };
