export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.at(0).toUpperCase() + string.slice(1)
}
