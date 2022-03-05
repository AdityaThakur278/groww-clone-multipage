const initialState = {
    loading: true,
    data: [],
    error: "",
    mapCompanyToIndex: {}
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
                data: action.payload,
                error: ""
            }
        case "FETCH_STOCK_DATA_ERROR":
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        case "MAP_COMPANY_TO_INDEX":
            return {
                ...state,
                mapCompanyToIndex: action.payload,
            }
        default:
            return state;   
    }
}

export default reducer