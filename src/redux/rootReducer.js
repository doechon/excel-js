export function rootReducer(state, action) {
    let colState;
    switch (action.type) {
        case 'TABLE_RESIZE':
            colState = state.colState || {}
            colState[action.data.id] = action.data.value
            return {...state, colState}
        default: return state;
    }
}
