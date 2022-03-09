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

export const mapCompanyToIndex = (payload) => {
    return {
        type: "MAP_COMPANY_TO_INDEX",
        payload
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

                // MapCompanyToIndex
                const mapObject = {}
                stocksData.forEach(function(obj, index) {
                    mapObject[obj.company] = index

                    // Adding new property for watchlistFunctionality
                    stocksData[index].watchlist = false
                });
                
                dispatch(fetchStockDataSuccess(stocksData))
                dispatch(mapCompanyToIndex(mapObject))
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

                // Store previous watchlist status and MapCompanyToIndex
                const prevData = store.getState().stockData.stocksData;
                const prevMapCompanyToIndex = store.getState().stockData.mapCompanyToIndex;
                const mapObject = {};
                for(let i=0; i<stocksData.length; i++) {
                    const company = stocksData[i].company;
                    const index = prevMapCompanyToIndex[company];
                    const watchlist = prevData[index].watchlist;
                    stocksData[i].watchlist = watchlist;

                    // MapCompanyToIndex
                    mapObject[company] = i;
                }

                dispatch(fetchStockDataSuccess(stocksData))
                dispatch(mapCompanyToIndex(mapObject))
            });
    }
}