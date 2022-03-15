const initialState = {
    loading: true,
    stocksData: [],
    error: "",
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "FETCH_STOCK_DATA":
            return {
                ...state,
                loading: true,
            }
        case "FETCH_STOCK_DATA_SUCCESS": 
            return {
                ...state,
                loading: false,
                stocksData: action.payload,
                error: ""
            }
        case "FETCH_STOCK_DATA_ERROR":
            return {
                ...state,
                loading: false,
                stocksData: [],
                error: action.payload
            }
        case "TOGGLE_WATCHLIST":
            return {
                ...state,
                stocksData: action.payload,
            }
        default:
            return state;   
    }
}

export default reducer