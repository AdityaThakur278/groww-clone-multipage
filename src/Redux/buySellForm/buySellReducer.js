const initialState = {
    buySellCompany: "Select Company",
    buyTab: true,
    marketPriceValue: null,
    shareQuantityValue: 0,
    targetPrice: "0.0",
    sharesOwned: 0, //Asset List Required
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "BUY_SELL_COMPANY_CHANGE":
            return {
                ...state,
                buySellCompany: action.payload,
            }
        case "BUY_TAB_CHANGE":
            return {
                ...state,
                buyTab: action.payload,
            }
        case "MARKET_PRICE_CHANGE":
            return {
                ...state,
                marketPriceValue: action.payload,
            }
        case "SHARE_QUANTITY_CHANGE":
            return {
                ...state,
                shareQuantityValue: action.payload,
            }
        case "TARGET_PRICE_CHANGE":
            return {
                ...state,
                targetPrice: action.payload,
            }
        case "SHARE_OWNED_CHANGE":
            return {
                ...state,
                sharesOwned: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;