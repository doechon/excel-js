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

function getText(store, colName, rowIdx) {
    return (store.textState ? store.textState[`${colName}${rowIdx}`] : '');
}

function toCell(colIdx, rowIdx, colWidth, text) {

    return `
       <div class="cell" 
       data-row="${rowIdx}" 
       data-col="${colIdx}" 
       data-id="${colIdx}${rowIdx}" 
       data-type="clickable"
       contenteditable
       style="width: ${colWidth}"
       >${text ? text : ''}</div>
    `
}

function toColumn(content, width) {
    return `
        <div class="column" data-col="${content}" data-type="resizable" style="width: ${width}">
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div> 
    `
}

function createRow(idx = 0, content, rowHeight) {
    const resize = (idx) ? `<div class="row-resize" data-resize="row"></div>` : ''
    const dataRow = (idx) ? `data-row="${idx}"` : ''
    return `
    <div class="row" data-type="resizable" ${dataRow} style="height: ${rowHeight}">
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

function toCellWithHeightAndText(store, rowIdx) {
    return function(_, idx) {
        const colName = toChar(null, idx)
        const colWidth = getColWidth(store, colName)
        const text = getText(store, colName, rowIdx)
        return toCell(colName, rowIdx, colWidth, text)
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
            .map(toCellWithHeightAndText(store, i))
            .join('')

        rows.push(createRow(i, curCol, rowHeight))
    }

    return rows.join('')
}
