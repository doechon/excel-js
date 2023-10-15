import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import { defaultStyles } from '@/constants';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            ...options
        });
    }

    prepare() {
        this.initState(defaultStyles)
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return createToolbar()
    }

    onClick(event) {
        const $target = $(event.target);
        if ($target.data.type === 'button') {
            const pair = JSON.parse($target.data.value)
            this.$emit('toolbar:applyStyle', pair)

            const key = Object.keys(pair)[0];
            this.setState({[key]: pair[key]})
            // console.log(this.state)
        }
    }

}
