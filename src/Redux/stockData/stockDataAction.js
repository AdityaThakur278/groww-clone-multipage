import axios from "axios"

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

export const fetchStockData = () => {
    return function(dispatch) {
        dispatch(fetchStockDataStart());

        axios.get("mock/indiaStocks.json")
            .then(response => {
                const data = response.data;
                dispatch(fetchStockDataSuccess(data.data))
            })
            .catch(error => {
                dispatch(fetchStockDataError(error.message))
            })
    }   
}