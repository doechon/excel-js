import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, shouldResize} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {shouldSelect} from '@/components/table/table.select';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table';
    rowsCount = 20

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    init() {
        super.init();
        this.selection = new TableSelection();
        const $cell = this.$root.find(`[data-id="A1"]`)
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        this.$on('formula:input', text => {
            this.selection.currentCell.text(text)
        })
        this.$on('formula:done', () => this.selection.currentCell.focus())
    }

    toHTML() {
        return createTable(this.rowsCount)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            shouldSelect(this.$root, event, this.selection, this.$emit.bind(this))
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp'
        ]

        const {key} = event;

        if (keys.includes(key)) {
            event.preventDefault();
            const id = this.selection.currentCell.id()
            const $next = this.$root.find(this.nextSelector(key, id))
            this.selection.select($next)
            this.$emit('table:select', $next)
        }

    }

    onInput(event) {
        this.$emit('table:select', $(event.target))
    }

    nextSelector(key, id) {
        let [col, row] = id

        let colNubmber = col.charCodeAt(0)

        switch (key) {
            case 'Enter':
            case 'ArrowDown':
                row++
                break;
            case 'Tab':
            case 'ArrowRight':
                col = String.fromCharCode(++colNubmber)
                break;
            case 'ArrowLeft':
                col = String.fromCharCode(--colNubmber)
                break;
            case 'ArrowUp':
                row--
                break;
        }

        if (colNubmber >= 65 && colNubmber <= 90 && row >= 1 && row <= this.rowsCount) {
            return `[data-id="${col}${row}"]`
        }
        return `[data-id="${id.join('')}"]`
    }
}


