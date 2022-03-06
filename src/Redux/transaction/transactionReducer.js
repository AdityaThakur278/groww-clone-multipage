const initialState = {
    pendingTransaction: [],
    completeTransaction: []
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case "ADD_TO_PENDING_TRANSACTION":
            return {
                ...state,
                pendingTransaction: [action.payload, ...state.pendingTransaction],
            }
        default:
            return state;
    }
}

export default reducer;