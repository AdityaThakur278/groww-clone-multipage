const initialState = {
    balance: 10000,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_TO_WALLET":
            return {
                ...state,
                balance: parseFloat(state.balance) + parseFloat(action.payload),
            }
        case "WITHDRAW_FROM_WALLET": 
            return {
                ...state,
                balance: parseFloat(state.balance) - parseFloat(action.payload),
            }
        default:
            return state;
    }
}

export default reducer;