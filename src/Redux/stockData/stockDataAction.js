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
                const data = response.data.data;

                // MapCompanyToIndex
                const mapObject = {}
                data.forEach(function(obj, index) {
                    mapObject[obj.company] = index

                    // Adding new property for watchlistFunctionality
                    data[index].watchlist = false
                });
                
                dispatch(fetchStockDataSuccess(data))
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
                const data = response.data.data;

                // Store previous watchlist status and MapCompanyToIndex
                const prevData = store.getState().stockData.data;
                const prevMapCompanyToIndex = store.getState().stockData.mapCompanyToIndex;
                const mapObject = {};
                for(let i=0; i<data.length; i++) {
                    const company = data[i].company;
                    const index = prevMapCompanyToIndex[company];
                    const watchlist = prevData[index].watchlist;
                    data[i].watchlist = watchlist;

                    // MapCompanyToIndex
                    mapObject[company] = i;
                }

                dispatch(fetchStockDataSuccess(data))
                dispatch(mapCompanyToIndex(mapObject))
            });
    }
}