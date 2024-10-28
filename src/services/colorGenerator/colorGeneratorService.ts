const colors = [
    '#FFBF00',
    '#FF7F50',
    '#DE3163',
    '#9FE2BF',
    '#40E0D0',
    '#6495ED',
    '#CCCCFF'
]

const generateColor = function* () {
    let i = 0
    while (true) {
        yield colors[i]
        i = (i + 1) % colors.length
    }
}

export {generateColor}
