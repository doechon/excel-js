import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter;
        this.store = options.store
        this.unsubs = []
        this.storeSub = null
    }

    toHTML() {
        return '';
    }

    init() {
        this.initDomListeners()
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubs.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    $subscribe(fn) {
        this.storeSub = this.store.subscribe(fn)
    }

    destroy() {
        this.removeDomListeners()
        this.unsubs.forEach(x => x())
        this.storeSub.unsubscribe()
    }

}
