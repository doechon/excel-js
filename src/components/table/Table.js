import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, isGroupSelection, shouldResize} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        });
    }

    init() {
        super.init();
        this.selection = new TableSelection();
        this.selection.select(this.$root.find(`[data-id="A1"]`))
    }

    toHTML() {
        return createTable(20)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            if (isGroupSelection(event)) {
                const startCell = this.selection.currentCell.data.id;
                const finishCell = event.target.dataset.id;
                // get letters list
                const [letterStartBorder, letterFinishBorder] = [startCell[0], finishCell[0]]
                    .sort((a, b) => a.localeCompare(b)).map(x => x.charCodeAt(0));

                const letters = []

                for (let i = 0; i < letterFinishBorder - letterStartBorder + 1; i++) {
                    letters.push(String.fromCharCode(letterStartBorder + i))
                }

                // get numbers list

                const [numberStartBorder, numberFinishBorder] = [+startCell.slice(1), +finishCell.slice(1)]
                    .sort((a, b) => a - b)
                const numbers = []
                for (let i = numberStartBorder; i < numberFinishBorder + 1; i++) {
                    numbers.push(i)
                }

                // combine letters and numbers lists as else
                const groupList = []

                letters.forEach(letter => {
                    numbers.forEach(number => {
                        const id = letter + number
                        const $el = this.$root.find(`[data-id=${id}]`)
                        groupList.push($el)
                    })
                })

                this.selection.selectGroup(groupList)

            } else {
                this.selection.select($(event.target))
            }
        }
    }

}
