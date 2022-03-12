export const addToTransactions = (id, transaction) => {
    return {
        type: "ADD_TO_TRANSACTIONS",
        id,
        transaction,
    }
}

export const addToPendingBlockedAmount = (payload) => {
    return {
        type: "ADD_TO_PENDING_BLOCKED_AMOUNT",
        payload,
    }
}

export const substractFromPendingBlockedAmount = (payload) => {
    return {
        type: "SUBSTRACT_FROM_PENDING_BLOCKED_AMOUNT",
        payload,
    }
}

export const deletePendingTransaction = (id) => {
    return {
        type: "DELETE_PENDING_TRANSACTION",
        id
    }
}

export const addToPendingBlockedStocks = (company, units, id) => {
    return {
        type: "ADD_TO_PENDING_BLOCKED_STOCKS",
        company,
        units,
        id
    }
}

export const substractFromPendingBlockedStocks = (company, units, id) => {
    return {
        type: "SUBSTRACT_FROM_PENDING_BLOCKED_STOCKS",
        company,
        units,
        id
    }
}