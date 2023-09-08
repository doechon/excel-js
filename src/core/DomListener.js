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
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
        this.listeners = [];
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}
