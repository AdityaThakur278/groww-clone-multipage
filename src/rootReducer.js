import { combineReducers } from "redux";
import stockDataReducer from "./Reducers/stockDataReducer"
import buySellReducer from "./Reducers/buySellReducer"
import walletReducer from "./Reducers/walletReducer"
import transactionReducer from "./Reducers/transactionReducer"
import watchlistReducer from "./Reducers/watchlistReducer"
import assetsReducer from "./Reducers/assetsReducer"

const rootReducer = combineReducers({
    stockData: stockDataReducer,
    buySellForm: buySellReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
    watchlist: watchlistReducer,
    assets: assetsReducer,
})

export default rootReducer;