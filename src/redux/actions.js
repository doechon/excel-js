import {CELL_TEXT, TABLE_RESIZE} from '@/redux/types';

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
