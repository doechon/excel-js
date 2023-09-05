import {capitalize} from '@core/utils';

export class DomListener {

    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided to DomListener`)
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(`listener ${listener} doesn't have ${method} method`);
            }
            this.$root.on(listener, this[method].bind(this))
        })

    }

    removeDomListeners() {

    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}
