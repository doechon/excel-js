import { APPLY_STYLE, CELL_TEXT, TABLE_RESIZE } from '@/redux/types';

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function cellText(data) {
    return {
        type: CELL_TEXT,
        data
    }
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}
