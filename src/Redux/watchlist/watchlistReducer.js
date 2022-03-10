const initialState = {
    defaultWatchlist : []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_TO_WATCHLIST":
            return {
                ...state,
                defaultWatchlist: [action.payload, ...state.defaultWatchlist]
            }
        case "REMOVE_FROM_WATCHLIST":
            return {
                ...state,
                defaultWatchlist: state.defaultWatchlist.filter((company) => {
                    return company !== action.payload
                })
            }
        default:
            return state;
    }   
}

export default reducer;