import axios from "axios"
import store from "../store"

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

export const toggleWatchlist = (payload) => {
    return {
        type: "TOGGLE_WATCHLIST",
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

                // Store previous watchlist status 
                const prevData = store.getState().stockData.stocksData;
                for(let i=0; i<stocksData.length; i++) {
                    const company = stocksData[i].company;
                    const index = getCompanyIndex(prevData, company);
                    const watchlist = prevData[index].watchlist;
                    stocksData[i].watchlist = watchlist;
                }

                dispatch(fetchStockDataSuccess(stocksData))
            });
    }
}

const getCompanyIndex = (stocksData, company) => {
    for(let i=0; i<stocksData.length; i++) {
        if(stocksData[i].company === company) {
            return i;
        }
    }
}