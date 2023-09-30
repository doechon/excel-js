export function shouldResize(event) {
    return event.target.dataset.resize;
}

export function isCell(event) {
    return event.target.dataset.id;
}

export function isGroupSelection(event) {
    return event.shiftKey;
}

