import axios from "axios"
import {buySellCompanyChange, marketPriceValueChange} from "../buySellForm/buySellAction"

export const fetchStockDataStart = () => {
    return {
        type: "FETCH_STOCK_DATA",
    }
}

export const fetchStockDataSuccess = (payload) => {
    return {
        type: "FETCH_STOCK_DATA_SUCCESS",
        payload,
    }
}   

export const fetchStockDataError = (payload) => {
    return {
        type: "FETCH_STOCK_DATA_ERROR",
        payload,
    }
}

export const mapCompanyToIndex = (payload) => {
    return {
        type: "MAP_COMPANY_TO_INDEX",
        payload
    }
}

export const fetchStockData = () => {
    return function(dispatch) {
        dispatch(fetchStockDataStart());

        axios.get("mock/indiaStocks.json")
            .then(response => {
                const data = response.data.data;
                dispatch(fetchStockDataSuccess(data))

                // MapCompanyToIndex
                const mapObject = {}
                data.forEach(function(obj, index) {
                    mapObject[obj.company] = index
                });
                dispatch(mapCompanyToIndex(mapObject))

                // Load BuySellForm on first render
                dispatch(buySellCompanyChange(data[0].company))
                dispatch(marketPriceValueChange(data[0].ltp))
            })
            .catch(error => {
                dispatch(fetchStockDataError(error.message))
            })
    }   
}