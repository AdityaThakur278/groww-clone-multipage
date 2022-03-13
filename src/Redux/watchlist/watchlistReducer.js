const initialState = {
    watchlists: {},
    watchlistID: [],
}

/*
state = {
    watchlists : {
        id1: {
            watchlistName:
            companies: []
        }
    },
    watchlistID: [id1, id2],
}
*/

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
        
        // New
        case "CREATE_WATCHLIST":
            return {
                watchlists: {
                    ...state.watchlists,
                    [action.id] : {
                        watchlistName: action.watchlistName,
                        companies: [],
                    }
                },
                watchlistID: [action.id, ...state.watchlistID],
            }
        case "DELETE_WATCHLIST":
            const shallowCopyWatchlists = {...state.watchlists};
            delete shallowCopyWatchlists[action.id];

            const newWatchlistID = state.watchlistID.filter(id => id !== action.id);
            return {
                watchlists: shallowCopyWatchlists,
                watchlistID: newWatchlistID,
            }
        case "RENAME_WATCHLIST":
            return {
                ...state,
                watchlists: {
                    ...state.watchlists,
                    [action.id]: {
                        watchlistName: action.watchlistName,
                        companies: state.watchlists[action.id].companies,
                    }
                }
            }
        default:
            return state;
    }   
}

export default reducer;