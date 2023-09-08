const CODES = {
    A: 65,
    Z: 90
}

function createCell() {
    return `
       <div class="cell" contenteditable></div>
    `
}

function toColumn(content) {
    return `
        <div class="column">${content}</div> 
    `
}

function createRow(idx = 0, content) {
    return `
    <div class="row">
        <div class="row-info">${idx !== 0 ? idx: ''}</div>
        <div class="row-data">${content}</div>
    </div>
    `
}

function toChar(_, idx) {
    return String.fromCharCode(CODES.A + idx)

}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(0, cols))

    for (let i = 1; i < rowsCount + 1; i++) {
        const curCol = new Array(colsCount)
            .fill('')
            .map(createCell)
            .join('')

        rows.push(createRow(i, curCol))
    }

    return rows.join('')
}
