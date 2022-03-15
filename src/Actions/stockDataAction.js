import axios from "axios"
import { StockDataActionTypes } from "../Types"

export const fetchStockDataStart = () => {
    return {
        type: StockDataActionTypes.FETCH_STOCK_DATA,
    }
}

export const fetchStockDataSuccess = (payload) => {
    return {
        type: StockDataActionTypes.FETCH_STOCK_DATA_SUCCESS,
        payload,
    }
}   

export const fetchStockDataError = (payload) => {
    return {
        type: StockDataActionTypes.FETCH_STOCK_DATA_ERROR,
        payload,
    }
}

export const toggleWatchlist = (payload) => {
    return {
        type: StockDataActionTypes.TOGGLE_WATCHLIST,
        payload,
    }
}

export const fetchStockData = () => {
    return function(dispatch) {
        dispatch(fetchStockDataStart());

        axios.get("mock/indiaStocks.json")
            .then(response => {
                const stocksData = response.data.data;

                stocksData.forEach(function(obj, index) {
                    // Adding new property for watchlistFunctionality
                    stocksData[index].watchlist = false
                });
                
                dispatch(fetchStockDataSuccess(stocksData))
            })
            .catch(error => {
                dispatch(fetchStockDataError(error.message))
            })
    }   
}

export const updateStockData = () => {
    return function(dispatch) {
        axios.get("mock/indiaStocks.json")
            .then(response => {
                const stocksData = response.data.data;
                dispatch(fetchStockDataSuccess(stocksData))
            });
    }
}