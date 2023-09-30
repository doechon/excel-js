export class TableSelection {
    constructor() {
        this.group = []
        this.currentCell = null;
    }

    reset() {
        if (this.group.length !== 0) {
            this.group.forEach(($el) => {
                $el.removeClass('selected')
            })
            this.group = []
        }
    }

    applyStyling() {
        this.group.forEach(x => x.focus().addClass('selected'))
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
