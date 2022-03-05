import { combineReducers } from "redux";
import stockDataReducer from "./stockData/stockDataReducer"

const rootReducer = combineReducers({
    stockData: stockDataReducer
})

export default rootReducer;