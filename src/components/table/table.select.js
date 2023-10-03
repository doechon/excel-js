import {isGroupSelection} from '@/components/table/table.functions';
import {$} from '@core/dom';

export function shouldSelect($root, event, selection, emit, selectCell) {
    if (isGroupSelection(event)) {
        const startCell = selection.currentCell.data.id;
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
                const $el = $root.find(`[data-id=${id}]`)
                groupList.push($el)
            })
        })

        selection.selectGroup(groupList)

    } else {
        const el = event.target;
        selectCell($(el))
    }
}
