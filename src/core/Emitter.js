export class Emitter {

    constructor() {
        this.listeners = {}

    }

    // dispatch, fire, trigger
    // Уведомляем слушателей, если они есть
    // 'formula:done'
    emit(event, ...args) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach(listener => {
                listener(...args)
            })
            return true;
        }
        return false;
    }

    // on, listen
    // Подписываемся на уведомление
    // Добавляем нового слушателя
    // formula.subscribe('table:select', ()=>{})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
        }
    }
}
