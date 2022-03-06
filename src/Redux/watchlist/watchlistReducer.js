const initialState = {
    watchlistCompany : []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_TO_WATCHLIST":
            return {
                ...state,
                watchlistCompany: [action.payload, ...state.watchlistCompany]
            }
        case "REMOVE_FROM_WATCHLIST":
            return {
                ...state,
                watchlistCompany: state.watchlistCompany.filter((company) => {
                    return company !== action.payload
                })
            }
        default:
            return state;
    }   
}

export default reducer;