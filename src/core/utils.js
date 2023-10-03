export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.at(0).toUpperCase() + string.slice(1)
}

export function storage(key, data) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}