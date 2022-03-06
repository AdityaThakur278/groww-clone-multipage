import { combineReducers } from "redux";
import stockDataReducer from "./stockData/stockDataReducer"
import buySellReducer from "./buySellForm/buySellReducer"
import walletReducer from "./wallet/walletReducer"
import transactionReducer from "./transaction/transactionReducer"
import watchlistReducer from "./watchlist/watchlistReducer"

const rootReducer = combineReducers({
    stockData: stockDataReducer,
    buySellForm: buySellReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
    watchlist: watchlistReducer,
})

export default rootReducer;