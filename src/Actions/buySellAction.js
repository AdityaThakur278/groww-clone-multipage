import { BuySellActionTypes } from "../Types"

export const buySellCompanyChange = (payload) => {
    return {
        type: BuySellActionTypes.BUY_SELL_COMPANY_CHANGE,
        payload,
    }
}

export const buyTabChange = (payload) => {
    return {
        type: BuySellActionTypes.BUY_TAB_CHANGE,
        payload,
    }
}

export const marketPriceValueChange = (payload) => {
    return {
        type: BuySellActionTypes.MARKET_PRICE_CHANGE,
        payload,
    }
}

export const shareQuantityValueChange = (payload) => {
    return {
        type: BuySellActionTypes.SHARE_QUANTITY_CHANGE,
        payload,
    }
}

export const targetPriceChange = (payload) => {
    return {
        type: BuySellActionTypes.TARGET_PRICE_CHANGE,
        payload,
    }
}