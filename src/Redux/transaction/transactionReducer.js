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
        case "DELETE_PENDING_TRANSACTION":
            return {
                ...state,
                pendingTransaction: state.pendingTransaction.filter((_, index) => {
                    return index !== action.payload
                })
            }
        case "ADD_TO_COMPLETE_TRANSACTION":
            return {
                ...state,
                completeTransaction: [action.payload, ...state.completeTransaction],
            }
        default:
            return state;
    }
}

export default reducer;