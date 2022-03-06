export const addToWatchlist = (payload) => {
    return {
        type: "ADD_TO_WATCHLIST",
        payload,
    }
}

export const removeFromWatchlist = (payload) => {
    return {
        type: "REMOVE_FROM_WATCHLIST",
        payload,
    }
}