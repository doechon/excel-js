const CODES = {
    A: 65,
    Z: 90
}

function createCell(rowIdx, colIdx) {
    return `
       <div class="cell" data-row="${rowIdx}" data-col="${colIdx}" contenteditable></div>
    `
}

function toColumn(content) {
    return `
        <div class="column" data-type="resizable">
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div> 
    `
}

function createRow(idx = 0, content) {
    const resize = (idx) ? `<div class="row-resize" data-resize="row"></div>` : ''

    return `
    <div class="row" data-type="resizable">
        <div class="row-info" >${idx ? idx : ''} ${resize}</div>
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
            .map((x, idx) => createCell(i, toChar(null, idx)))
            .join('')

        rows.push(createRow(i, curCol))
    }

    return rows.join('')
}
