export const buySellCompanyChange = (payload) => {
    return {
        type: "BUY_SELL_COMPANY_CHANGE",
        payload,
    }
}

export const buyTabChange = (payload) => {
    return {
        type: "BUY_TAB_CHANGE",
        payload,
    }
}

export const marketPriceValueChange = (payload) => {
    return {
        type: "MARKET_PRICE_CHANGE",
        payload,
    }
}

export const shareQuantityValueChange = (payload) => {
    return {
        type: "SHARE_QUANTITY_CHANGE",
        payload,
    }
}

export const targetPriceChange = (payload) => {
    return {
        type: "TARGET_PRICE_CHANGE",
        payload,
    }
}