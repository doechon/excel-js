class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }

    clear() {
        this.html('')
        return this;
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }
        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node)
        }
        return this;
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    css(obj) {
        Object.keys(obj).forEach(key => this.$el.style[key] = obj[key])
    }

    get data() {
        return this.$el.dataset
    }

    addClass(className) {
        this.$el.classList.add(className)
    }

    removeClass(className) {
        this.$el.classList.remove(className)
    }

    id() {
        const idPair = this.$el.dataset.id
        return [idPair[0], +idPair.slice(1)]
    }

    focus() {
        this.$el.focus();
        return this;
    }

    text(text) {
        if (typeof text === 'string') {
            this.$el.textContent = text;
            return this;
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim();
        }
        return this.$el.textContent.trim();
    }
}

// event.target
export function $(selector) {
    return new Dom(selector);
}

$.create = (tagname, classes = '') => {
    const el = document.createElement(tagname);
    if (classes) {
        el.classList.add(classes)
    }
    return $(el);
}
