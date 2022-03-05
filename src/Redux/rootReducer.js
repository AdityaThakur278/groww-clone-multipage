import { combineReducers } from "redux";
import stockDataReducer from "./stockData/stockDataReducer"
import buySellReducer from "./buySellForm/buySellReducer"

const rootReducer = combineReducers({
    stockData: stockDataReducer,
    buySellForm: buySellReducer,
})

export default rootReducer;