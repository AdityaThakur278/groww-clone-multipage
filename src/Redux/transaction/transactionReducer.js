const initialState = {
    pendingTransaction: [],
    completeTransaction: [],
    // New
    transactions: {},
    transactionID: [],
    pendingBlockedAmount: 0,
}

const reducer = (state=initialState, action) => {

    function getTransactionIDindex(id, transactionID) {
        for(let i=0; i<transactionID.length; i++) {
            if(transactionID[i] === id) return i;
        }
    }

    switch(action.type) {
        case "ADD_TO_PENDING_TRANSACTION":
            return {
                ...state,
                pendingTransaction: [action.payload, ...state.pendingTransaction],
            }
        case "ADD_TO_COMPLETE_TRANSACTION":
            return {
                ...state,
                completeTransaction: [action.payload, ...state.completeTransaction],
            }
        
        // New
        case "ADD_TO_TRANSACTIONS":
            return {
                ...state, 
                transactions: {
                    ...state.transactions,
                    [action.id] : action.transaction,
                },
                transactionID: [action.id, ...state.transactionID],
            }
        case "ADD_TO_PENDING_BLOCKED_AMOUNT":
            return {
                ...state,
                pendingBlockedAmount: parseFloat(state.pendingBlockedAmount) + parseFloat(action.payload), 
            }
        case "SUBSTRACT_FROM_PENDING_BLOCKED_AMOUNT":
            return {
                ...state,
                pendingBlockedAmount: parseFloat(state.pendingBlockedAmount) - parseFloat(action.payload),
            }
        case "DELETE_PENDING_TRANSACTION":
            const index = getTransactionIDindex(action.id, state.transactionID);
            const shallowCopyTransactionID = [...state.transactionID];
            const shallowCopyTransactions = {...state.transactions};
            shallowCopyTransactionID.splice(index, 1);
            delete shallowCopyTransactions[action.id];
            return {
                ...state,
                transactions: shallowCopyTransactions,
                transactionID: shallowCopyTransactionID,
            }
        default:
            return state;
    }
}

export default reducer;