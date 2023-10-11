import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {

    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['textState'],
            ...options
        });
    }

    init() {
        super.init();
        this.$formula = this.$root.find('#formula')

        this.$on('table:select', $cell => {
            this.$formula.text($cell.text())
        })

    }

    toHTML() {
        return `
            <div class="info">
                fx
            </div>
            <div id="formula" class="input" contenteditable spellcheck="false">
            </div>
        `
    }

    storeChanged(changes) {
    }

    onInput(event) {
        const value = $(event.target).text()
        this.$emit('formula:input', value)
    }

    onKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            this.$emit('formula:done')
        }
    }
}
