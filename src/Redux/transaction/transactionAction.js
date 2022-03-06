export const addToPendingTransaction = (payload) => {
    return {
        type: "ADD_TO_PENDING_TRANSACTION",
        payload,
    }
}