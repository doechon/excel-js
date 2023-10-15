import {CELL_TEXT, TABLE_RESIZE } from '@/redux/types';

export function rootReducer(state, action) {
    let colState;
    let rowState;
    let textState;
    switch (action.type) {
        case TABLE_RESIZE:
            if (action.data.type === 'col') {
                colState = state.colState || {}
                colState[action.data.id] = action.data.value
                return {...state, colState}
            } else {
                rowState = state.rowState || {}
                rowState[action.data.id] = action.data.value
                return {...state, rowState}
            }
        case CELL_TEXT:
            textState = state.textState || {}
            textState[action.data.id] = action.data.value
            return {...state, textState}
        default:
            return state;
    }
}
