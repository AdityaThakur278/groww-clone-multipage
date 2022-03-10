const initialState = {
    transactions: {},
    transactionID: [],
    pendingBlockedAmount: 0,
    pendingBlockedStocks: {},
}

const reducer = (state=initialState, action) => {

    function getTransactionIDindex(id, transactionID) {
        for(let i=0; i<transactionID.length; i++) {
            if(transactionID[i] === id) return i;
        }
    }

    switch(action.type) {
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
        case "ADD_TO_PENDING_BLOCKED_STOCKS":
            let prevBlocked = state.pendingBlockedStocks[action.company];
            prevBlocked = prevBlocked === undefined ? 0 : prevBlocked;
            return {
                ...state,
                pendingBlockedStocks: {
                    ...state.pendingBlockedStocks,
                    [action.company]: parseFloat(prevBlocked) + parseFloat(action.units),
                }
            }
        case "SUBSTRACT_FROM_PENDING_BLOCKED_STOCKS":
            const shallowCopyPendingBlockedStocks = {...state.pendingBlockedStocks};
            shallowCopyPendingBlockedStocks[action.company] -= parseFloat(action.units);
            if(shallowCopyPendingBlockedStocks[action.company] === 0) {
                delete shallowCopyPendingBlockedStocks[action.company];
            }

            return {
                ...state,
                pendingBlockedStocks: shallowCopyPendingBlockedStocks,
            }
        default:
            return state;
    }
}

export default reducer;