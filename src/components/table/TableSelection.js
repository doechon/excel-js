export class TableSelection {
    constructor() {
        this.group = []
        this.currentCell = null;
    }

    get selectedIds() {
        return this.group.map($el => $el.id())
    }
    reset() {
        if (this.group.length !== 0) {
            this.group.forEach(($el) => {
                $el.removeClass('selected')
            })
            this.group = []
        }
    }

    applyStyling(style) {
        this.group.forEach(x => {
            if (style) {
                x = x.css(style);
            }
            x.focus().addClass('selected')
        })
    }

    select($el) {
        this.reset()
        this.group.push($el)
        this.applyStyling()
        this.currentCell = $el;
    }

    selectGroup(groupList) {
        this.reset()
        this.group = groupList;
        this.applyStyling()
    }
}
