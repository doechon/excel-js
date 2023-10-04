const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_HEIGHT = 25;
const DEFAULT_WIDTH = 120;


function getColWidth(store, char) {
    return (store.colState ? store.colState[char] : DEFAULT_WIDTH) + 'px'
}

function getRowHeight(store, idx) {
    return (store.rowState ? store.rowState[idx] : DEFAULT_HEIGHT) + 'px';
}


function createCell(rowIdx, colIdx, colWidth) {

    return `
       <div class="cell" 
       data-row="${rowIdx}" 
       data-col="${colIdx}" 
       data-id="${colIdx}${rowIdx}" 
       data-type="clickable"
       contenteditable
       style="width: ${colWidth}"
       ></div>
    `
}

function toColumn(content, width) {
    return `
        <div class="column" data-type="resizable" style="width: ${width}">
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div> 
    `
}

function createRow(idx = 0, content, rowHeight) {
    const resize = (idx) ? `<div class="row-resize" data-resize="row"></div>` : ''

    return `
    <div class="row" data-type="resizable" style="height: ${rowHeight}">
        <div class="row-info" >${idx ? idx : ''} ${resize}</div>
        <div class="row-data">${content}</div>
    </div>
    `
}

function toChar(_, idx) {
    return String.fromCharCode(CODES.A + idx)
}

function toColumnWithWidth(store) {
    return function(char) {
        const width = getColWidth(store, char)
        return toColumn(char, width)
    }
}

function toRowWithHeght(store, i) {
    return function(_, idx) {
        const char = toChar(null, idx)
        const colWidth = getColWidth(store, char)
        return createCell(i, char, colWidth)
    }
}

export function createTable(rowsCount = 15, store = {}) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumnWithWidth(store))
        .join('')

    rows.push(createRow(0, cols))

    for (let i = 1; i < rowsCount + 1; i++) {
        const rowHeight = getRowHeight(store, i)
        const curCol = new Array(colsCount)
            .fill('')
            .map(toRowWithHeght(store, i))
            .join('')

        rows.push(createRow(i, curCol, rowHeight))
    }

    return rows.join('')
}
