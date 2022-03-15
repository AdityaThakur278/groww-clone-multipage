import { WalletActionTypes } from "../Types"

export const addToWallet = (payload) => {
    return {
        type: WalletActionTypes.ADD_TO_WALLET,
        payload,
    }
}

export const withdrawFromWallet = (payload) => {
    return {
        type: WalletActionTypes.WITHDRAW_FROM_WALLET,
        payload,
    }
}