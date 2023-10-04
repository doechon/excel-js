export function rootReducer(state, action) {
    let colState;
    let rowState;

    switch (action.type) {
        case 'TABLE_RESIZE':
            if (action.data.type === 'col') {
                colState = state.colState || {}
                colState[action.data.id] = action.data.value
                return {...state, colState}
            } else {
                rowState = state.rowState || {}
                rowState[action.data.id] = action.data.value
                return {...state, rowState}
            }
        default:
            return state;
    }
}
