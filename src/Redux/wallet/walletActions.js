export const addToWallet = (payload) => {
    return {
        type: "ADD_TO_WALLET",
        payload,
    }
}

export const withdrawFromWallet = (payload) => {
    return {
        type: "WITHDRAW_FROM_WALLET",
        payload,
    }
}