export const addToPendingTransaction = (payload) => {
    return {
        type: "ADD_TO_PENDING_TRANSACTION",
        payload,
    }
}

export const deletePendingTransaction = (payload) => {
    return {
        type: "DELETE_PENDING_TRANSACTION",
        payload
    }
}